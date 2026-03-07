const menu = document.getElementById("menu");
const cartBtn = document.getElementById("cart-btn");
const cartModal = document.getElementById("cart-modal");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout-btn");
const closeModalBtn = document.getElementById("close-modal-btn");
const cartCount = document.getElementById("cart-count");
const nameInput = document.getElementById("name");
const nameWarn = document.getElementById("name-warn");
const adressInput = document.getElementById("address");
const adressWarn = document.getElementById("address-warn");
const bairroInput = document.getElementById("neighborhood");
const bairroWarn = document.getElementById("address-warn");
const cityInput = document.getElementById("city");
const cityWarn = document.getElementById("city-warn");
const numberHouseInput = document.getElementById("house-number");
const numberHouseWarn = document.getElementById("numberhouse-warn");
const referenceInput = document.getElementById("point-reference");
const phoneInput = document.getElementById("number-phone");
const phoneWarn = document.getElementById("phone-warn");
const btnRemove = document.getElementById("remove-btn");
const redBtn = document.getElementById("red-btn");

let cart = [];

// Abrir Modal
cartBtn.addEventListener("click", function () {
  updateCartModal();
  cartModal.style.display = "flex";
  cartBtn.style.display = "none";
  redBtn.style.display = "none";
});

cartModal.addEventListener("click", function (event) {
  if (event.target === cartModal) {
    cartModal.style.display = "none";
    cartBtn.style.display = "flex";
    redBtn.style.display = "flex";
  }
});

closeModalBtn.addEventListener("click", function () {
  cartModal.style.display = "none";
  cartBtn.style.display = "flex";
  redBtn.style.display = "flex";
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

  cartCount.innerHTML = cart.reduce((acc, item) => acc + item.quantity, 0);
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
nameInput.addEventListener("input", function (event) {
  let inputValue = event.target.value;

  if (inputValue !== "") {
    nameInput.classList.remove("border-red-500");
    nameWarn.classList.add("hidden");
  }
});
bairroInput.addEventListener("input", function (event) {
  let inputValue = event.target.value;

  if (inputValue !== "") {
    bairroInput.classList.remove("border-red-500");
    bairroWarn.classList.add("hidden");
  }
});
cityInput.addEventListener("input", function (event) {
  let inputValue = event.target.value;

  if (inputValue !== "") {
    cityInput.classList.remove("border-red-500");
    cityWarn.classList.add("hidden");
  }
});

numberHouseInput.addEventListener("input", function (event) {
  let inputValue = event.target.value;

  if (inputValue !== "") {
    numberHouseInput.classList.remove("border-red-500");
    numberHouseWarn.classList.add("hidden");
  }
});

phoneInput.addEventListener("input", function (event) {
  let inputValue = event.target.value;

  if (inputValue !== "") {
    phoneInput.classList.remove("border-red-500");
    phoneWarn.classList.add("hidden");
  }
});

checkoutBtn.addEventListener("click", function () {
  // const isOpen = checkOpen();
  // if (!isOpen) {
  //   alert("RESTAURANTE FECHADO NO MOMENTO");
  //   return;
  // }

  let orderNumber = localStorage.getItem("orderNumber");

  if (!orderNumber) {
    orderNumber = 1;
  } else {
    orderNumber = parseInt(orderNumber) + 1;
  }

  orderNumber = String(orderNumber).padStart(3, "0");

  localStorage.setItem("orderNumber", orderNumber);

  if (cart.length === 0) return;
  if (
    adressInput.value |
    nameInput.value |
    bairroInput.value |
    cityInput.value |
    numberHouseInput.value |
    (phoneInput.value === "")
  ) {
    adressWarn.classList.remove("hidden");
    adressInput.classList.add("border-red-500");
    nameWarn.classList.remove("hidden");
    nameInput.classList.add("border-red-500");
    bairroWarn.classList.remove("hidden");
    bairroInput.classList.add("border-red-500");
    cityWarn.classList.remove("hidden");
    cityInput.classList.add("border-red-500");
    numberHouseWarn.classList.remove("hidden");
    numberHouseInput.classList.add("border-red-500");
    phoneWarn.classList.remove("hidden");
    phoneInput.classList.add("border-red-500");
    return;
  }

  let total = 0;
  cart.forEach((item) => {
    total += item.price * item.quantity;
  });

  const cartItems = cart
    .map((item, index) => {
      return `${index + 1}️⃣ ${item.name}
Qtd: ${item.quantity}
Preço: R$ ${item.price}`;
    })
    .join("\n\n");

  const message = `
🧾 *NOVO PEDIDO ${orderNumber}*

Cliente : ${nameInput.value}

━━━━━━━━━━━━━━━
🍔 *ITENS DO PEDIDO*

${cartItems}

━━━━━━━━━━━━━━━
💰 *TOTAL*
R$ ${total.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  })}

━━━━━━━━━━━━━━━
📍 *ENDEREÇO*
*Rua:* ${adressInput.value}
*Bairro:* ${bairroInput.value}
*Cidade:* ${cityInput.value}
*Número da Casa:* ${numberHouseInput.value}
*Ponto de Referência:* ${referenceInput.value}
*Contato:* ${phoneInput.value}

━━━━━━━━━━━━━━━
💳 *PAGAMENTO*
 PIX

━━━━━━━━━━━━━━━
📝 *DESCRIÇÃO*

`;

  // const cartItems = cart
  //   .map((item) => {
  //     return `${item.name}\n Quantidade: (${item.quantity})\nPreço: R$${item.price}\n`;
  //   })
  //   .join("\n");

  // const message = encodeURIComponent(cartItems);
  const encodedMessage = encodeURIComponent(message);
  const phone = "5522998553582";

  window.open(`https://wa.me/${phone}?text=${encodedMessage}`, "_blank");
});

// function checkOpen() {
//   const data = new Date();
//   const hora = data.getHours();
//   return hora >= 18 && hora < 22;
// }

// const spanItem = document.getElementById("date-span");
// const isOpen = checkOpen();

// if (isOpen) {
//   spanItem.classList.remove("bg-red-500");
//   spanItem.classList.add("bg-green-600");
// } else {
//   spanItem.classList.remove("bg-green-600");
//   spanItem.classList.add("bg-red-500");
// }
