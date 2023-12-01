let content= document.querySelector(".content");
let quantity = document.querySelector(".quantity");
let totaCart = document.querySelector(".totalCart");
let total =document.querySelector(".total");
let cartList =document.querySelector(".cartList");
let list = document.querySelector(".list");


let product = [
    {
        id:1,
        image:"img 1.jpg",
        name: "cold Berw",
        price: "10"

    },
    {
        id:2,
        image:"img 2.jpg",
        name: "Latte Frape",
        price: "12"

    },
    {
        id:3,
        image:"img 3.jpg",
        name: "Ice Latte",
        price: "11"

    },
    {
        id:4,
        image:"img 4.jpg",
        name: "Macchiato",
        price: "10"

    },
    {
        id:5,
        image:"img 5.jpg",
        name: "Hot Latte",
        price: "9"

    },
    {
        id:6,
        image:"img 6.jpg",
        name: "Cappuccino",
        price: "9"

    },
    {
        id:7,
        image:"img 7.jpg",
        name: "Cafe Mocha",
        price: "11"

    },
    {
        id:8,
        image:"img 8.jpg",
        name: "Espresso",
        price: "8"

    },
    
   
    {
        id:9,
        image:"img 9.png",
        name: "Hot Chocolate",
        price: "8"

    }

]
let listCart= [];
if(localStorage.myProduct !=null){
    listCart = JSON.parse(localStorage.myProduct)
}
getLocalStorage();


function initApp(){
    product.forEach((value)=>{
        let newDiv = document.createElement("div")
        newDiv.classList.add("product-box")
        newDiv.innerHTML = `
        <img src="img/${value.image}">
        <div class="details"><h2 class="title">${value.name}</h2>
        <span class="price">${value.price}</span>
        <button class="btn" onclick="addToCard (${value.id})">Add To Cart</button></div>
        `
        content.appendChild(newDiv)
    })
   
}
initApp()

let cartIcon = document.getElementById("my-Cart");
let cart = document.querySelector(".cart")
let closed = document.getElementById("close");

    cartIcon.addEventListener("click",()=>{
        cart.classList.add("active")
    })


    closed.addEventListener("click",()=>{
        cart.classList.remove("active")
    })
    

    function addToCard(id){
        let products = product.find(p=>p.id === id);
        let productIndex = listCart.findIndex(p=>p.id === id);
        
 if(productIndex > -1){
    listCart[productIndex].quantity +=1;
}
else{
    listCart.push({...products,quantity:1})
}
 reloadCard()
}
 function reloadCard(){
cartList.innerHTML = "";
 let count = 0;
let totalPrice= 0;
 
listCart.forEach((value)=>{
    totalPrice += value.price * value.quantity;
 count += value.quantity
        
        let newDiv = document.createElement("li");
        newDiv.classList.add("box");
        newDiv.innerHTML= `
        <img src="img/${value.image}">
        <span class="price">${value.price.toLocaleString()}</span>
        <div class= "add">
        <button onclick="addQuntatity(${value.id},${value.quantity - 1})">-</button>
        <div class="count">${value.quantity}</div>
        <button onclick="addQuntatity(${value.id},${value.quantity + 1})">+</button>
        </div>
        `
        cartList.appendChild(newDiv)
    })
    total.innerHTML = totalPrice.toLocaleString() + "$"
    quantity.innerHTML = count
    addToLocalStorage(listCart)

}
function addToLocalStorage(listCart){
    localStorage.setItem("myProduct", JSON.stringify(listCart))
}
function getLocalStorage(){
    let myData = localStorage.getItem("myProduct")
    if(myData){
        let product = JSON.parse(myData)
        reloadCard(product)
    }
}
function addQuntatity(id, newQuantity){
    let productIndex = listCart.findIndex((p)=>p.id ===id)
    if(newQuantity === 0){
        listCart.splice(productIndex,1)  
    }
    else{
        listCart[productIndex].quantity =newQuantity
    }
    reloadCard()
}