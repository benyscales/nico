# NICO — motyw Shopify

Natywny motyw Online Store 2.0, przeniesiony z przygotowanej strony Next.js. Ciemny wygląd, niebieskie akcenty i czcionka systemowa Apple na iOS/macOS. Nie wymaga Node.js ani serwera poza Shopify.

## Wgranie na Windowsie

1. Pobierz **nico-shopify.zip**. Nie rozpakowuj go przed wgraniem.
2. Zaloguj się do panelu Shopify.
3. Otwórz **Sklep online → Motywy** (Online Store → Themes).
4. W bibliotece motywów wybierz **Dodaj motyw → Prześlij plik ZIP** (Add theme → Upload zip file). Nazwa przycisku może zależeć od języka panelu.
5. Wybierz `nico-shopify.zip` i zaczekaj na zakończenie importu.
6. Przy nowym motywie otwórz **Dostosuj / Edytuj motyw**. Wgranie do biblioteki nie publikuje motywu.

Jeżeli korzystasz z połączenia Shopify z GitHubem, katalog główny podłączonej gałęzi musi zawierać katalogi `assets`, `config`, `layout`, `locales`, `sections`, `snippets` i `templates`. W głównym projekcie Next.js motyw znajduje się w podkatalogu `shopify-theme` — do integracji GitHub użyj przygotowanej osobnej gałęzi z samym motywem, jeśli została udostępniona.

## Przypisanie produktów

Motyw nie tworzy produktów, nie zmienia cen w sklepie i nie konfiguruje płatności.

1. W panelu **Produkty** dodaj trzy rzeczywiste produkty: **Community — 99 zł**, **Kurs — 99 zł**, **Full Access — 150 zł**. To ceny z briefu; ustaw PLN jako walutę sklepu, jeżeli w niej sprzedajesz.
2. Uzupełnij opisy, warunki dostępu i rzeczywiste materiały. Produkty cyfrowe oznacz jako niewymagające fizycznej wysyłki. Udostępnij je w kanale **Sklep online**.
3. W edytorze motywu otwórz **Strona główna → Produkty i oferta**.
4. W każdym z trzech bloków wybierz właściwy **Produkt Shopify**. W razie potrzeby zmień nazwę na karcie, opis, korzyści i tekst przycisku.
5. Zapisz. Ceny, waluta i dostępność będą pobierane z przypisanych produktów. Nieprzypisane oferty nie pokazują wymyślonej ceny i mają wyłączony przycisk zakupu.

Przyciski prowadzą do prawdziwej strony produktu. Dodanie do koszyka i przejście do kasy obsługuje Shopify. Dostawę plików skonfiguruj np. w aplikacji Shopify Digital Downloads. Lekcje kursu, postęp nauki oraz nadawanie dostępu do zamkniętej społeczności wymagają odpowiednich aplikacji lub usługi — sam motyw ich nie tworzy.

## Kontakt i konsultacje

1. W **Sklep online → Strony** utwórz stronę **Kontakt** i wybierz szablon **contact**. Jeśli panel pokazuje szablony tylko opublikowanego motywu, wybierz go po opublikowaniu NICO; do tego czasu sprawdź szablon w edytorze motywu.
2. Ustaw uchwyt/adres strony na **kontakt** (`/pages/kontakt`). Alternatywnie wybierz utworzoną stronę w **Ustawienia motywu → Kontakt i konsultacje → Strona kontaktowa**.
3. Sprawdź adres odbiorcy wiadomości w ustawieniach powiadomień/kontaktu Shopify. Formularz korzysta z natywnej obsługi kontaktu Shopify; potwierdzenie jest pokazywane dopiero po odpowiedzi platformy.
4. Jeśli masz działający kalendarz konsultacji, wpisz jego adres w **Ustawienia motywu → Kontakt i konsultacje → Kalendarz konsultacji**. Bez kalendarza przyciski prowadzą do kontaktu. Wysłanie formularza nie rezerwuje terminu.

## Wygląd i pozostałe ustawienia

- Sekcje strony głównej można przestawiać, usuwać i edytować. Wyniki, odbiorcy, proces, FAQ i oferty mają edytowalne bloki.
- Nazwę marki, logo, ikonę i kolory ustawisz w **Ustawienia motywu**. NICO jest roboczą nazwą marki.
- W sekcji **O mnie** dodaj własne zdjęcie. Bez zdjęcia widoczne jest abstrakcyjne miejsce na portret.
- Stopka pokazuje rzeczywiste polityki uzupełnione w **Ustawienia → Zasady / Polityki**. Uzupełnij dokumenty i dane sprzedawcy odpowiednie do swojej działalności.
- Menu nagłówka i stopki można zastąpić menu z panelu Shopify. Domyślne linki prowadzą do sekcji strony głównej.
- Dodatkowe aplikacje można umieszczać w sekcji **Aplikacje**; szablon produktu obsługuje bloki aplikacji.
- Strony produktu, kolekcji, listy kolekcji, koszyka, wyszukiwania, kontaktu, zwykłej strony, błędu 404 i hasła sklepu są dołączone. Kasa i nowe konta klientów są obsługiwane przez Shopify.

## Podgląd i publikacja

1. W bibliotece motywów otwórz **Podgląd** nowego motywu. Jeżeli Shopify udostępnia opcję udostępnienia podglądu, użyj wygenerowanego przez Shopify adresu na telefonie.
2. Sprawdź telefon i komputer, przypisane produkty, warianty, koszyk i kontakt.
3. Skonfiguruj rzeczywiste płatności w **Ustawienia → Płatności**. Wykonaj zamówienie w trybie testowym operatora oraz sprawdź dostawę plików i dostępów.
4. Kiedy sklep jest gotowy, opublikuj motyw. Dostępność publicznej witryny zależy też od planu Shopify i ustawienia hasła sklepu.
5. Adres sklepu znajdziesz w **Ustawienia → Domeny**. Shopify obsługuje hosting i certyfikat HTTPS.

Shopify i wybrane aplikacje mogą wymagać abonamentu. Motyw nie zawiera kluczy API ani danych logowania. Natywne zabezpieczenia Shopify i aplikacje sklepu są ładowane przez wymagany `content_for_header`.

## Zakres sprawdzenia

Motyw sprawdzono lokalnie oficjalnym Shopify Theme Check (reguły i schematy Shopify), kontrolą składni JavaScript i symulacją LiquidJS w przeglądarce. Symulacja obejmowała responsywność, menu, FAQ i warianty na danych testowych. Bez dostępu do rzeczywistego sklepu nie potwierdzono importu na serwerze Shopify, dostarczenia wiadomości, rzeczywistych płatności ani automatycznej dostawy produktów.

Ikony Lucide/Feather: pełne licencje ISC i MIT są zachowane w `assets/nico.css`.
