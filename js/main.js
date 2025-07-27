var productNameInput = document.getElementById("productNameInput");
var productPriceInput = document.getElementById("productPriceInput");
var ProductCategoryInput = document.getElementById("ProductCategoryInput");
var productDescInput = document.getElementById("productDescInput");
var addBtn = document.getElementById("addBtn");
var updateBtn = document.getElementById("updateBtn");

var productsContainer = [];
var currentIndex = null;

if (localStorage.getItem("myProducts") != null) {
    productsContainer = JSON.parse(localStorage.getItem("myProducts"));
    displayProducts(productsContainer);
}

function addProduct() {
    if (validateProductName() && validatePrice() && validateCategory()) {
        var product = {
            name: productNameInput.value,
            price: productPriceInput.value,
            category: ProductCategoryInput.value,
            desc: productDescInput.value,
        };
        productsContainer.push(product);
        localStorage.setItem("myProducts", JSON.stringify(productsContainer));
        displayProducts(productsContainer);
        clearForm();
    } else {
        alert("Please enter valid inputs.");
    }
}

function clearForm() {
    productNameInput.value = "";
    productPriceInput.value = "";
    ProductCategoryInput.value = "";
    productDescInput.value = "";

    productNameInput.classList.remove("is-valid", "is-invalid");
    productPriceInput.classList.remove("is-valid", "is-invalid");
    ProductCategoryInput.classList.remove("is-valid", "is-invalid");
}

function displayProducts(productList) {
    var cartoona = "";
    for (var i = 0; i < productList.length; i++) {
        cartoona += `
            <tr>
                <td>${i}</td>
                <td>${productList[i].name}</td>
                <td>${productList[i].price}</td>
                <td>${productList[i].category}</td>
                <td>${productList[i].desc}</td>
                <td><button onclick="setFormForUpdate(${i});" class="btn btn-outline-warning btn-sm">Update</button></td>
                <td><button onclick="deleteProducts(${i});" class="btn btn-outline-danger btn-sm">Delete</button></td>
            </tr>
        `;
    }
    document.getElementById("tableBody").innerHTML = cartoona;
}

function deleteProducts(index) {
    productsContainer.splice(index, 1);
    localStorage.setItem("myProducts", JSON.stringify(productsContainer));
    displayProducts(productsContainer);
}

function setFormForUpdate(index) {
    var product = productsContainer[index];
    productNameInput.value = product.name;
    productPriceInput.value = product.price;
    ProductCategoryInput.value = product.category;
    productDescInput.value = product.desc;

    currentIndex = index;
    updateBtn.classList.replace("d-none", "d-inline-block");
    addBtn.classList.add("d-none");
}

function updateProduct() {
    if (validateProductName() && validatePrice() && validateCategory()) {
        productsContainer[currentIndex] = {
            name: productNameInput.value,
            price: productPriceInput.value,
            category: ProductCategoryInput.value,
            desc: productDescInput.value,
        };
        localStorage.setItem("myProducts", JSON.stringify(productsContainer));
        displayProducts(productsContainer);
        clearForm();
        updateBtn.classList.replace("d-inline-block", "d-none");
        addBtn.classList.remove("d-none");
    } else {
        alert("Please correct the fields before updating.");
    }
}

function searchProduct(term) {
    var result = productsContainer.filter((p) => p.name.toLowerCase().includes(term.toLowerCase()));
    displayProducts(result);
}

function validateProductName() {
    var regex = /^[A-Z][a-z]{3,8}$/;
    if (regex.test(productNameInput.value.trim())) {
        setValid(productNameInput);
        return true;
    } else {
        setInvalid(productNameInput);
        return false;
    }
}

function validatePrice() {
    var price = parseFloat(productPriceInput.value);
    if (!isNaN(price) && price > 0) {
        setValid(productPriceInput);
        return true;
    } else {
        setInvalid(productPriceInput);
        return false;
    }
}

function validateCategory() {
    var regex = /^[A-Za-z\s]{3,15}$/;
    if (regex.test(ProductCategoryInput.value.trim())) {
        setValid(ProductCategoryInput);
        return true;
    } else {
        setInvalid(ProductCategoryInput);
        return false;
    }
}

function setValid(input) {
    input.classList.add("is-valid");
    input.classList.remove("is-invalid");
}

function setInvalid(input) {
    input.classList.add("is-invalid");
    input.classList.remove("is-valid");
}
