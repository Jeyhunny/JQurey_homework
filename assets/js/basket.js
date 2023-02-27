"use strict";

let table = document.querySelector("table")
let tableBody = document.querySelector("tbody");
let alertInfo = document.querySelector(".alert-info");
let clearBtn = document.querySelector(".clear-cart");
let total = document.querySelector(".total span");
let products = JSON.parse(localStorage.getItem("basket"));
let setProductsToStorage = () => localStorage.setItem("basket", JSON.stringify(products));

getBasketDatas();
function getBasketDatas() {
    if (products != null) {

        for (const product of products) {
            //add products to table
            table.classList.remove("d-none");
            alertInfo.classList.add("d-none");
            clearBtn.classList.remove("d-none");
            document.querySelector(".total").classList.remove("d-none")
            tableBody.innerHTML +=
                `
                <tr class="item">
                    <td class="d-none">${product.id}</td>
                    <td>
                        <div class="img"><img src="${product.img}" alt=""></div>
                    </td>
                    <td>${product.name}</td>
                    <td class="w-50">${product.desc}</td>
                    <td>${product.price} </td>
                    <td><div class="count"><span class="reduce">-</span><span class="quantity">${product.count}</span><span class="increase">+</span></div></td>
                    <td><i class="fa-solid fa-trash-can text-danger del"></i></td>
                </tr>
            `
        }
    }
    else {
        showAlert();
    }
}
function showAlert() {
    table.classList.add("d-none");
    alertInfo.classList.remove("d-none");
    clearBtn.classList.add("d-none");
    document.querySelector(".total").classList.add("d-none")
}
//get count
function getProductCount(arr) {
    if (arr != null) {
        document.querySelector(".shopping-cart span").innerText = arr.length;
    }
}
getProductCount(products);
//delete products
function delProducts(arr) {
    for (const item of arr) {
        item.addEventListener("click", function () {
            for (let i = 0; i < products.length; i++) {
                if (products[i].id == item.parentNode.parentNode.firstElementChild.innerText) {
                    products.splice(i, 1);
                    item.parentNode.parentNode.remove();

                    if (products.length == 0) {
                        localStorage.clear();
                        showAlert();
                    }
                    totalPrice(products);
                    setProductsToStorage();
                }
            }
        })
    }
}
//delete product
delProducts(document.querySelectorAll(".del"));

//clear cart 
function clearCart() {
    clearBtn.onclick = () => {
        localStorage.clear();
        window.location.reload();
    }
}
clearCart()
//total price
function totalPrice(products) {
    let totalPrice = 0;
    for (let i = 0; i < products.length; i++) {
        totalPrice += parseInt(products[i].price);
        total.innerText = `${totalPrice} ₼`;
    }
}
//total price
totalPrice(products);


//decrease count
function reduceCount(arr) {
    arr.forEach(btn => {
        btn.addEventListener("click", function () {
            let quantity = btn.nextElementSibling;
            for (let i = 0; i < products.length; i++) {
                if (products[i].id == btn.parentNode.parentNode.parentNode.firstElementChild.innerText) {
                    if (quantity.innerText == 1) {
                        return
                    }
                    let nativePrice = products[i].price / products[i].count;
                    quantity.innerText--;
                    products[i].count--;
                    products[i].price = nativePrice * products[i].count;
                    btn.parentNode.parentNode.previousElementSibling.innerText = products[i].price;
                    totalPrice(products);
                    setProductsToStorage();
                }
            }
        })
    });
}
//increase count
function increaseCount(arr) {
    arr.forEach(btn => {
        btn.addEventListener("click", function () {
            for (let i = 0; i < products.length; i++) {
                if (products[i].id == this.parentNode.parentNode.parentNode.firstElementChild.innerText) {
                    btn.previousElementSibling.innerText++;
                    let nativePrice = parseInt(products[i].price / products[i].count);
                    products[i].count++;
                    products[i].price = nativePrice * products[i].count;
                    btn.parentNode.parentNode.previousElementSibling.innerText = products[i].price;
                    totalPrice(products);
                    setProductsToStorage();
                }
            }
        })
    });
}

//increase decrease count
reduceCount(document.querySelectorAll(".reduce"))
increaseCount(document.querySelectorAll(".increase"));