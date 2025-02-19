 # DEMODay MirandaMedia
### Ahoj!

Právě jsem téměř dokončila práci na tomto projektu v rámci testovacího úkolu pro MirandaMedia. Níže popisuji, jak jsem na něm pracovala a co bylo realizováno.
**URL:** [Live-site](https://lesyast.github.io/Miranda-Media-DemoDay/)
## Grafický návrh
Projekt vychází ze staršího návrhu hlavní stránky jednoduchého e-shopu s investičními kovy. Návrh byl poskytnut ve Figmě.

## Použité technologie
V souladu s požadavky jsem pracovala pouze s čistým HTML, CSS a JavaScriptem, bez použití frameworků nebo knihoven jako jQuery či Bootstrap. K usnadnění práce se styly jsem využila CSS preprocesor (SCSS).

## Co jsem implementovala:
✅ Responzivní design

Stránka je plně responzivní a přizpůsobena různým velikostem obrazovek.
Návrh obsahoval pouze mobilní a desktopovou verzi, takže jsem sama optimalizovala zobrazení pro mezilehlé velikosti.

✅ Dynamické načítání produktů pomocí JavaScriptu

Produkty jsou načítány ze souboru products.json pomocí fetch.
Soubor obsahoval chyby, které jsem opravila pomocí validátoru JSON.
Pro vytvoření produktů a jejich vkládání na stránku jsem využila createElement a appendChild.

✅ Filtrování produktů podle kategorií

Produkty jsou rozděleny do 3 kategorií, mezi kterými lze přepínat pomocí JavaScriptu (addEventListener).
Ve výchozím stavu se zobrazují 4 produkty, zbývající se načtou po kliknutí na tlačítko "Zobrazit více".

✅ Hover efekty

Přidala jsem :hover efekty pro aktivní prvky stránky (tlačítka, odkazy).
Pokud efekt nebyl specifikován v návrhu, vytvořila jsem vlastní variantu.

✅ Formuláře

Zajistila jsem správnou sémantiku a strukturu formulářů (label, input).

✅ Carousel (karusel)

Hlavní funkcionalita stránky funguje i bez něj, ale přidala jsem jej pro lepší uživatelský zážitek.
Použila jsem knihovnu Swiper.js, jak bylo doporučeno.

✅ Fonty

Použila jsem Google Fonts CDN, ale také jsem otestovala lokální načtení fontů.

# Závěr
Projekt je téměř hotový a splňuje všechny požadavky. Kód je čistý, přehledný a psaný dle principu DRY.

Jsem ráda, že jsem měla možnost na tomto úkolu pracovat a těším se na zpětnou vazbu! 🚀
