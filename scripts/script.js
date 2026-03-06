const menu = document.getElementById("menu");
const cartBtn = document.getElementById("cart-btn");
const cartModal = document.getElementById("cart-modal");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout-btn");
const closeModalBtn = document.getElementById("close-modal-btn");
const cartCount = document.getElementById("cart-count");
const adressInput = document.getElementById("address");
const adressWarn = document.getElementById("address-warn");
const btnRemove = document.getElementById("remove-btn");

let cart = [];

// Abrir Modal
cartBtn.addEventListener("click", function () {
  updateCartModal();
  cartModal.style.display = "flex";
});

cartModal.addEventListener("click", function (event) {
  if (event.target === cartModal) {
    cartModal.style.display = "none";
  }
});

closeModalBtn.addEventListener("click", function () {
  cartModal.style.display = "none";
});

menu.addEventListener("click", function (event) {
  let parentButton = event.target.closest(".add-to-cart-btn");

  if (parentButton) {
    const name = parentButton.getAttribute("data-name");
    const price = parseFloat(parentButton.getAttribute("data-price"));
    addToCart(name, price);
  }
});

function addToCart(name, price) {
  const nameExisting = cart.find((item) => item.name === name);

  if (nameExisting) {
    nameExisting.quantity += 1;
  } else {
    cart.push({
      name,
      price,
      quantity: 1,
    });
  }

  updateCartModal();
}

// Atualiza o Carrinho

function updateCartModal() {
  cartItemsContainer.innerHTML = "";
  let total = 0;

  cart.forEach((item) => {
    const cartItemElemnt = document.createElement("div");
    cartItemElemnt.classList.add("flex", "justify-between", "mb-4", "flex-col");

    cartItemElemnt.innerHTML = `
    <div class="flex items-center justify-between">
    
      <div>
        <p class="font-medium">${item.name}</p>
        <p>Quantidade: ${item.quantity}</p>
        <p class="font-medium mt-2">R$ ${item.price.toFixed(2)}</p>      
      </div>

    
        <button class="remove-btn" data-name="${item.name}">Remover</button>
      
    </div>


    
    
    `;
    total += item.price * item.quantity;

    cartItemsContainer.appendChild(cartItemElemnt);
  });

  cartTotal.textContent = total.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  cartCount.innerHTML = cart.length;
}

// Deleção item Carrinho
cartItemsContainer.addEventListener("click", function (event) {
  if (event.target.classList.contains("remove-btn")) {
    const name = event.target.getAttribute("data-name");

    removeItemCart(name);
  }
});

function removeItemCart(name) {
  const index = cart.findIndex((item) => item.name === name);

  if (index !== -1) {
    const item = cart[index];

    if (item.quantity > 1) {
      item.quantity -= 1;
      updateCartModal();
      return;
    }

    cart.splice(index, 1);
    updateCartModal();
  }
}

adressInput.addEventListener("input", function (event) {
  let inputValue = event.target.value;

  if (inputValue !== "") {
    adressInput.classList.remove("border-red-500");
    adressWarn.classList.add("hidden");
  }
});

checkoutBtn.addEventListener("click", function () {
  // const isOpen = checkOpen();
  // if (!isOpen) {
  //   alert("RESTAURANTE FECHADO NO MOMENTO");
  //   return;
  // }

  if (cart.length === 0) return;
  if (adressInput.value === "") {
    adressWarn.classList.remove("hidden");
    adressInput.classList.add("border-red-500");
    return;
  }

  const cartItems = cart
    .map((item) => {
      return `${item.name} Quantidade: (${item.quantity}) Preço: R$${item.price} |`;
    })
    .join("");

  const message = encodeURIComponent(cartItems);
  const phone = "22998553582";

  window.open(
    `https://wa.me/${phone}?text=${message} Endereço: ${adressInput.value}`,
    "_blank",
  );
});

function checkOpen() {
  const data = new Date();
  const hora = data.getHours();
  return hora >= 18 && hora < 22;
}

const spanItem = document.getElementById("date-span");
const isOpen = checkOpen();

if (isOpen) {
  spanItem.classList.remove("bg-red-500");
  spanItem.classList.add("bg-green-600");
} else {
  spanItem.classList.remove("bg-green-600");
  spanItem.classList.add("bg-red-500");
}
