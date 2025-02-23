document.addEventListener("DOMContentLoaded", function () {
    let dropdown = document.querySelector(".dropdown");
    let dropdownIcon = dropdown.querySelector(".fa-angle-down"); // Отримуємо стрілку
    let dropdownMenu = dropdown.querySelector(".dropdown-menu"); // Отримуємо меню

    dropdownIcon.addEventListener("click", function (event) {
        event.stopPropagation(); // Запобігає закриттю при кліку на саму іконку
        dropdownMenu.classList.toggle("show"); // Перемикаємо відображення меню
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
