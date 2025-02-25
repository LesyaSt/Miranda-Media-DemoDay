document.addEventListener("DOMContentLoaded", function () {
  const productsContainer = document.querySelector(".products-content");
  const filterLinks = document.querySelectorAll(".filter-link");
  const cartCount = document.getElementById("cart-count");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function updateCartCount() {
    cartCount.textContent = cart.length;
  }

  async function loadProducts(filter = "all") {
    try {
      const response = await fetch("products.json");
      if (!response.ok) throw new Error("Не вдалося завантажити продукти");

      const products = await response.json();
      productsContainer.innerHTML = "";

      const filteredProducts =
        filter === "all"
          ? products
          : products.filter((product) => {
              if (filter === "novinky") return product.status === "Skladem";
              if (filter === "nejprodavanejsi")
                return product.status === "Na objednávku";
              if (filter === "doporucene")
                return product.status === "Momentálně nedostupné";
            });

      filteredProducts.forEach((product) => {
        const productElement = document.createElement("div");
        productElement.classList.add("product");

        let statusClass = "span-stock";
        if (product.status === "Na objednávku") statusClass = "span-order";
        if (product.status === "Momentálně nedostupné")
          statusClass = "span-unavailable";

        productElement.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <h2>${product.name}</h2>
                    <span class="${statusClass}">${product.status}</span>
                    <data value="${product.price}">${product.price}</data>
                    <button class="hidden-button add-to-cart" data-id="${product.id}">
                        <i class="fa-solid fa-cart-shopping"></i>
                    </button>
                `;
        productsContainer.appendChild(productElement);
      });

      document.querySelectorAll(".add-to-cart").forEach((button) => {
        button.addEventListener("click", function () {
          const productId = this.getAttribute("data-id");
          addToCart(productId, products);
        });
      });
    } catch (error) {
      console.error("Помилка:", error);
    }
  }

  function addToCart(productId, products) {
    const product = products.find((item) => item.id == productId);
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
      loadProducts(filter);
    });
  });

  updateCartCount();
  loadProducts();
});
