/* NICO — native Shopify forms remain functional without JavaScript. */
(() => {
  const menuButtons = () => document.querySelectorAll('[data-menu-toggle]');
  const setMenu = (button, open) => {
    const menu = document.getElementById(button.getAttribute('aria-controls'));
    if (!menu) return;
    button.setAttribute('aria-expanded', String(open));
    button.setAttribute('aria-label', open ? button.dataset.labelOpen || 'Zamknij menu' : button.dataset.labelClosed || 'Otwórz menu');
    menu.hidden = !open;
  };

  document.addEventListener('click', (event) => {
    const target = event.target instanceof Element ? event.target : null;
    if (!target) return;
    const toggle = target.closest('[data-menu-toggle]');
    if (toggle) {
      setMenu(toggle, toggle.getAttribute('aria-expanded') !== 'true');
      return;
    }
    if (target.closest('[data-mobile-menu] a')) {
      menuButtons().forEach((button) => setMenu(button, false));
    } else if (!target.closest('.site-header')) {
      menuButtons().forEach((button) => setMenu(button, false));
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    menuButtons().forEach((button) => {
      if (button.getAttribute('aria-expanded') === 'true') {
        setMenu(button, false);
        button.focus();
      }
    });
  });
  const desktop = window.matchMedia('(min-width: 761px)');
  desktop.addEventListener('change', () => {
    if (desktop.matches) menuButtons().forEach((button) => setMenu(button, false));
  });

  function updateVariant(form, updateUrl = false) {
    const select = form.querySelector('[data-variant-select]');
    const script = form.querySelector('[data-variant-data]') || form.closest('.shopify-section')?.querySelector('[data-variant-data]');
    if (!select || !script) return;
    let variants;
    try { variants = JSON.parse(script.textContent); } catch { return; }
    const variant = variants.find((item) => String(item.id) === select.value);
    const scope = form.closest('[data-product-root]') || form.closest('.shopify-section') || form;
    const price = scope.querySelector('[data-product-price]');
    const comparePrice = scope.querySelector('[data-product-compare-price]');
    const button = form.querySelector('[data-add-to-cart]');
    const status = scope.querySelector('[data-product-status]');
    const planSelect = form.querySelector('[data-selling-plan-select]');
    if (planSelect && variant) {
      const allowed = (variant.sellingPlanIds || []).map(String);
      Array.from(planSelect.options).forEach((option) => {
        option.disabled = !!option.value && !allowed.includes(option.value);
      });
      if (planSelect.selectedOptions[0]?.disabled) {
        const fallback = Array.from(planSelect.options).find((option) => !option.disabled);
        planSelect.value = fallback?.value || '';
      }
    }
    const planValid = !planSelect || (!!planSelect.selectedOptions[0] && !planSelect.selectedOptions[0].disabled);
    const available = !!variant?.available && planValid;
    const selectedPlan = variant?.sellingPlans?.find((plan) => String(plan.id) === planSelect?.value);
    const displayedPrice = selectedPlan || variant;
    if (displayedPrice && price) price.textContent = displayedPrice.priceFormatted;
    if (comparePrice) {
      comparePrice.textContent = displayedPrice?.compareAtFormatted ? `Cena regularna: ${displayedPrice.compareAtFormatted}` : '';
      comparePrice.hidden = !displayedPrice?.compareAtFormatted;
    }
    const quantity = form.querySelector('input[name="quantity"]');
    if (quantity && variant) {
      const minimum = Math.max(1, Number(variant.minimum) || 1);
      const increment = Math.max(1, Number(variant.increment) || 1);
      const maximum = Number(variant.maximum) || null;
      quantity.min = String(minimum);
      quantity.step = String(increment);
      if (maximum !== null) quantity.max = String(maximum);
      else quantity.removeAttribute('max');
      let value = Math.max(minimum, Number(quantity.value) || minimum);
      value = minimum + Math.ceil((value - minimum) / increment) * increment;
      if (maximum !== null) value = Math.min(value, minimum + Math.floor((maximum - minimum) / increment) * increment);
      quantity.value = String(value);
    }
    if (button) {
      button.disabled = !available;
      const label = button.querySelector('[data-add-label]');
      const text = available ? button.dataset.availableLabel || 'Dodaj do koszyka' : variant && !variant.available ? button.dataset.soldOutLabel || 'Wyprzedane' : button.dataset.unavailableLabel || 'Niedostępne';
      if (label) label.textContent = text;
      else button.textContent = text;
    }
    if (status) status.textContent = available ? 'Dostępny' : variant && !variant.available ? 'Wyprzedane' : 'Niedostępne';
    if (variant && updateUrl) {
      const url = new URL(window.location.href);
      url.searchParams.set('variant', String(variant.id));
      window.history.replaceState({}, '', url);
    }
  }

  function initProducts(scope = document) {
    scope.querySelectorAll('[data-product-form]').forEach((form) => updateVariant(form));
  }
  document.addEventListener('change', (event) => {
    const target = event.target;
    if (!(target instanceof Element) || !target.matches('[data-variant-select], [data-selling-plan-select]')) return;
    const form = target.closest('[data-product-form]');
    if (form) updateVariant(form, target.matches('[data-variant-select]'));
  });
  document.addEventListener('shopify:section:load', (event) => initProducts(event.target));
  initProducts();
})();
