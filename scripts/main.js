

//  const formObj={
//     name: "John Doe",
//     email: "EMAIL@hello.com",
//     phone: "+380987654321"
//  }

// localStorage.setItem("formData", JSON.stringify(formObj));
// const info=JSON.parse(localStorage.getItem("formData"));
// console.log(info.name);

const products = [
  {
    name: "Ball",
    category: "Sport",
    img: "./assets/ball.jpeg",
    price: 100,
    description: "Just the simple ball",
  },
  {
    name: "Gloves",
    category: "Sport",
    img: "./assets/gloves.jpg",
    price: 140,
    description: "Tactical gloves",
  },
  {
    name: "Sport shoes",
    category: "Sport",
    discount: true,
    img: "./assets/shoes.png",
    price: 320,
    description: "Sport shoes. The best choice for running",
  },
  {
    name: "Hammer",
    category: "Tools",
    img: "./assets/hammer.jpeg",
    price: 40,
    description: "The best way to convince somebody that you are right.",
  },
  {
    name: "Saw",
    category: "Tools",
    discount: true,
    img: "./assets/saw.jpeg",
    price: 75,
    description:
      "This will help you in case the hammer could not convince your companion",
  },
  {
    name: "Shark toy",
    category: "Other",
    img: "./assets/shark.jpeg",
    price: 45,
    description: "From IKEA with love",
  },
  {
    name: "Truck",
    category: "Other",
    img: "./assets/truck.jpeg",
    price: 80,
    description: "Truck. Nothing more.",
  },
];

// let mapNames = products.map((product) => product.name);
// console.log(mapNames);

// let reduceCategories = products.reduce((acc, current) => {
//   if (!acc.includes(current.category)) {
//     acc.push(current.category);
//   }
//   return acc;
// }, []);
// console.log(reduceCategories);

// let filtredByCategorieOther=products.filter(product => product.category === "Other");
// console.log(filtredByCategorieOther);

const productsContainer = document.querySelector(".productsContainer");

function renderProduct(product) {
  const productCard = document.createElement("div");
  productCard.classList.add("productCard");

  const productTitle = document.createElement("h3");
  productTitle.textContent = product.name;
  productTitle.classList.add("productTitle");

  const productPrice = document.createElement("p");
  productPrice.textContent = product.price;
  productPrice.classList.add("productPrice");

  const productCategory = document.createElement("p");
  productCategory.textContent = product.category;
  productCategory.classList.add("productCategory");

  const productImg = document.createElement("img");
  productImg.src = !!product.img ? product.img : "";
  productImg.classList.add("productImg");

  const productDescription = document.createElement("p");
  productDescription.textContent = product.description;
  productDescription.classList.add("productDescription");

  productCard.append(
    productImg,
    productTitle,
    productPrice,
    productCategory,
    productDescription
  );

  return productCard;
}

function renderProductList(products) {
  productsContainer.innerHTML = ""; // Очистка productsContainer перед добавлением новых элементов чтобы не было дубликатов
  products.forEach((product) => {
    const renderedProduct = renderProduct(product);
    productsContainer.append(renderedProduct);
  });
}
renderProductList(products);

//1. 
const select = document.createElement("select");
select.classList.add("select");

const optionSport = document.createElement("option");
optionSport.textContent = "Sport";
optionSport.setAttribute("value", "Sport");

const optionTools = document.createElement("option");
optionTools.textContent = "Tools";
optionTools.setAttribute("value", "Tools");

const optionOther = document.createElement("option");
optionOther.textContent = "Other";
optionOther.setAttribute("value", "Other");

const optionNone = document.createElement("option");
optionNone.textContent = "None";
optionNone.setAttribute("value", "None");
select.append(optionNone, optionSport, optionTools, optionOther);
const mainContainer = document.querySelector(".mainContainer");
mainContainer.appendChild(select);

//2 + 4 пункты задания
function getFilteredProducts(category, name) {
  let filteredProducts = products; //позволяет нам работать с копией исходного массива, сохраняя при этом неизменность products

  if (category) {
    filteredProducts = filteredProducts.filter(
      (product) => product.category === category
    );
  }

  if (name) {
    filteredProducts = filteredProducts.filter((product) =>
      product.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  return filteredProducts;
}

const inputProductName = document.createElement("input");
inputProductName.type = "text";
inputProductName.placeholder = "Enter product name";
mainContainer.appendChild(inputProductName);

//3, 5 обработчик события для селекта - фильтр по категории товара + названию товара

select.addEventListener("change", function (event) {
  const category = event.target.value;
  const productNameValue = inputProductName.value;
  const filteredProducts = getFilteredProducts(category, productNameValue);

  if (category === "None") {
    renderProductList(products);
  } else {
    renderProductList(filteredProducts);
  }

  //создаем объект с данными поиска, если этот объект уже есть в ЛС, достаем оттуда, если еще нет - инициализируем пустым объектом
  // в обработчике селекта добавляем в ЛС только значение категории, инпут либо пустой либо старый
  const storedSearchInput =
    JSON.parse(localStorage.getItem("searchInput")) || {};
  storedSearchInput.category = category;
  localStorage.setItem("searchInput", JSON.stringify(storedSearchInput));
});

//4 - 5 обработчик события для поля ввода (инпут) - фильтр по категории товара + названию товара
inputProductName.addEventListener("change", function (event) {
  const productNameValue = event.target.value;
  const category = select.value;
  const filteredProducts = getFilteredProducts(category, productNameValue);
  renderProductList(filteredProducts);

  // поторяем шаг с обработчиком событий как и в селекте. вытаскиваем объект из ЛС или создаем новый, добавляем ключ инпута
  const storedSearchInput =
    JSON.parse(localStorage.getItem("searchInput")) || {};
  storedSearchInput.name = productNameValue;
  localStorage.setItem("searchInput", JSON.stringify(storedSearchInput));
});

// // 6

// при загрузке страницы достаем объект из ЛС, если он не null то парсим данные и подставляем в инпуты, вызываем фильтр и рендерим продукты согласно отфильтрованному массиву
document.addEventListener("DOMContentLoaded", function () {
  const storedSearchInput = localStorage.getItem("searchInput");
  if (storedSearchInput !== null) {
    const parsedSearchInput = JSON.parse(storedSearchInput);
    inputProductName.value = parsedSearchInput.name;
    select.value = parsedSearchInput.category;
    let productsToRender = getFilteredProducts(
      select.value,
      inputProductName.value
    );
    renderProductList(productsToRender);
  }
});

const clearFilterBtn = document.createElement("button");
clearFilterBtn.classList.add("clearFilterBtn");
clearFilterBtn.innerText = "Clear";
mainContainer.append(clearFilterBtn);

// очищаем ЛС, инпуты, рендерим все продукты
clearFilterBtn.addEventListener("click", function () {
  localStorage.removeItem("searchInput");
  inputProductName.value = ""; 
  select.value = "None"; 
  renderProductList(products); 
});


// a: first load
// 1. Page loads
//   input text is empty
// 2. User changes input text

// b: second load
// 1. Page loads
//   we take stuff from local storage and put it into input text
//   input text is not empty
// 2. User changes input text
