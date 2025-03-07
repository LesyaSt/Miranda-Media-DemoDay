document.addEventListener("DOMContentLoaded", function () {
  const productsContainer = document.querySelector(".products-content");
  const filterLinks = document.querySelectorAll(".filter-link");
  const cartCount = document.getElementById("cart-count");
  const burger = document.querySelector(".burger-btn");
  const mobileNav = document.querySelector(".mobile-nav");
  const body = document.body;
  const loadMoreBtn = document.querySelector(".product-btn");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let currentFilter = "Novinky";
  let allProducts = [];
  let displayedProducts = 4;

  function updateCartCount() {
    cartCount.textContent = cart.length;
  }
  const dropdowns = document.querySelectorAll(".dropdown");

  dropdowns.forEach((dropdown) => {
    const dropdownToggle = dropdown.querySelector(".fa-angle-down");
    const dropdownMenu = dropdown.querySelector(".dropdown-menu");

    if (dropdownToggle && dropdownMenu) {
      dropdownToggle.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();

        document.querySelectorAll(".dropdown-menu").forEach((menu) => {
          if (menu !== dropdownMenu) {
            menu.style.display = "none";
          }
        });

        dropdownMenu.style.display =
          dropdownMenu.style.display === "block" ? "none" : "block";
      });

      document.addEventListener("click", function (event) {
        if (!dropdown.contains(event.target)) {
          dropdownMenu.style.display = "none";
        }
      });
    }
  });

  async function loadProducts(filter = "Novinky") {
    try {
      const response = await fetch("./assets/src/products.json");
      if (!response.ok) throw new Error("Не вдалося завантажити продукти");

      allProducts = await response.json();
      filterAndRenderProducts(filter);
    } catch (error) {
      console.error("Помилка:", error);
    }
  }

  function filterAndRenderProducts(filter) {
    currentFilter = filter;
    productsContainer.innerHTML = "";

    const filterMap = {
      novinky: "Novinky",
      nejprodavanejsi: "Nejprodávanější",
      doporucene: "Doporučené",
    };

    const category = filterMap[filter] || "Novinky";

    const filteredProducts = allProducts.filter((product) => {
      return product.category === category;
    });

    renderProducts(filteredProducts.slice(0, displayedProducts));

    loadMoreBtn.style.display =
      filteredProducts.length > displayedProducts ? "block" : "none";
  }

  function renderProducts(products) {
    products.forEach((product) => {
      const productElement = document.createElement("div");
      productElement.classList.add("product");

      let statusClass = "span-stock";
      if (product.availability === "Na objednávku") statusClass = "span-order";
      if (product.availability === "Momentálně nedostupné")
        statusClass = "span-unavailable";

      const labels = product.flags.length
        ? product.flags
            .map((flag) => {
              if (flag === "Novinka")
                return `<span class="label-new">${flag}</span>`;
              if (flag === "Výprodej")
                return `<span class="label-sale">${flag}</span>`;
              return `<span class="label-other">${flag}</span>`;
            })
            .join("")
        : "";

      const productImage = product.imgSrc || "./assets/img/default.jpg";

      productElement.innerHTML = `
                <div class="product-img">
                    <div class="label-container">
                        ${labels}
                    </div>
                    <img src="${productImage}" alt="${product.title}">
                </div>
                <h2>${product.title}</h2>
                <span class="${statusClass}">${product.availability}</span>
                <data value="${product.price}">${product.price} CZK</data>
                <button class="hidden-button add-to-cart" data-id="${product.id}">
                    <i class="fa-solid fa-cart-shopping"></i>
                </button>
            `;

      productsContainer.appendChild(productElement);
    });
  }

  function addToCart(productId) {
    const product = allProducts.find((item) => item.id == productId);
    if (!product) return;

    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
  }

  filterLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      filterLinks.forEach((l) => l.classList.remove("active"));
      this.classList.add("active");

      const filter = this.getAttribute("data-filter");
      displayedProducts = 4;
      filterAndRenderProducts(filter);
    });
  });

  loadMoreBtn.addEventListener("click", function () {
    displayedProducts += 4;
    filterAndRenderProducts(currentFilter);
  });

  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("add-to-cart")) {
      const productId = event.target.getAttribute("data-id");
      addToCart(productId);
    }
  });

  updateCartCount();
  loadProducts();

  if (burger && mobileNav) {
    burger.addEventListener("click", function () {
      const isOpen = mobileNav.style.display === "flex";

      if (isOpen) {
        mobileNav.style.display = "none";
        body.classList.remove("no-scroll");
      } else {
        mobileNav.style.display = "flex";
        body.classList.add("no-scroll");
      }
    });

    document.addEventListener("click", function (event) {
      if (!burger.contains(event.target) && !mobileNav.contains(event.target)) {
        mobileNav.style.display = "none";
        body.classList.remove("no-scroll");
      }
    });
  }
});
