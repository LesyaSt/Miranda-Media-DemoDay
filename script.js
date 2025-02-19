
document.addEventListener("DOMContentLoaded", function () {
    let dropdown = document.querySelector(".dropdown"); // Отримуємо <li> з класом "dropdown"
    let dropdownMenu = document.querySelector(".dropdown-menu"); // Отримуємо <ul> меню

    dropdown.addEventListener("click", function (event) {
        event.preventDefault(); // Запобігає стандартній дії <a>
        dropdownMenu.classList.toggle("show"); // Додає/забирає клас для відображення меню
    });

    // Закриваємо меню, якщо клікнули поза ним
    document.addEventListener("click", function (event) {
        if (!dropdown.contains(event.target)) {
            dropdownMenu.classList.remove("show");
        }
    });
});

// currency
document.addEventListener("DOMContentLoaded", function () {
    let currencySelect = document.getElementById("currency-select");
    let currencyLabel = document.getElementById("currency-label");

    currencySelect.addEventListener("change", function () {
        let selectedCurrency = currencySelect.value;
        currencyLabel.innerHTML = selectedCurrency + ' <i class="fa-solid fa-angle-down"></i>';
    });
});
