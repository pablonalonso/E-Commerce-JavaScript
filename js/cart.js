const number = document.querySelector("#number")
const cartContainer = document.querySelector("#cart-container")
const cartActions  = document.querySelector("#cart-actions")
const totalNumber = document.querySelector("#total-number")
const emptyCartMessage = document.querySelector("#empty-cart-message")
const emptyButton = document.querySelector("#empty-button")
const buyNowButton =  document.querySelector("#buy-now-button")
const thankYou = document.querySelector("#thank-you")
thankYou.style.display=  "none"

const text = document.querySelector(".text")
let deleteButtons


const l1 = JSON.parse(localStorage.getItem("Cantidad de productos en el carrito:"))
if (l1) {
    number.innerHTML = l1 
}

const productsInTheCart = JSON.parse(localStorage.getItem("Productos en el carrito:"))

//Function 1
const loadProducts = ()=>{
    let len =  productsInTheCart.length
    if (productsInTheCart) {
    cartContainer.classList.remove("disable")
    cartActions.classList.remove("disable")

    let acc = 0
    productsInTheCart.forEach( product => {
        const div = document.createElement("div")
        div.classList.add("item")
        div.innerHTML = `
        <div class="item-image">
            <img src="${product.image}" alt="">
        </div>
        <div class="item-text">
            <div class="item-name">
                <h4>Nombre</h4>
                <small>${product.title}</small>
            </div>
            <div class="item-price">
                <h4>Precio</h4>
                <small>${product.price}</small>
            </div>
            <div class="item-amount">
                <h4>Cantidad</h4>
                <small>${product.amount}</small>
            </div>
            <div class="item-subtotal">
                <h4>Subtotal</h4>
                <small>$ ${(product.price*product.amount).toFixed(2)}</small>
            </div>
            <div class="item-delete">
                <button class="delete-button" id="${product.id}"><i class="bi bi-trash3-fill"></i></button>
            </div>
        </div>
        `
        cartContainer.append(div)
        acc +=  Math.round((product.price*product.amount))
        totalNumber.innerHTML = `$ ${acc},00`
    });
} else{
    emptyCartMessage.classList.remove("disable")
}
    updateDeleteButtons()
    if (len === 0) {
        cartContainer.classList.add("disable")
        cartActions.classList.add("disable")
        emptyCartMessage.classList.remove("disable")
    }
}

//Function 2
const updateDeleteButtons = ()=>{
    deleteButtons = document.querySelectorAll(".delete-button")
    deleteButtons.forEach( button => {
        button.addEventListener("click", deleteProductFromTheCart)
    })
}

//Function 3
const deleteProductFromTheCart = (event)=>{
    const idButton = JSON.parse(event.currentTarget.id)
    const index  = productsInTheCart.findIndex( product => product.id === idButton)
    productsInTheCart.splice(index, 1)
    number.innerHTML = productsInTheCart.length
    localStorage.setItem("Cantidad de productos en el carrito:", JSON.stringify(productsInTheCart.length))
    localStorage.setItem("Productos en el carrito:", JSON.stringify(productsInTheCart))
    cartContainer.innerHTML = ""
    loadProducts()
}

//Function 4
const emptyCart = ()=>{
        number.innerHTML = 0
        localStorage.setItem("Cantidad de productos en el carrito:", JSON.stringify(0))
        localStorage.setItem("Productos en el carrito:", JSON.stringify([]))
        cartContainer.classList.add("disable")
        cartActions.classList.add("disable")
        emptyCartMessage.classList.remove("disable")
}

const doneShoppingItems = ()=>{
    number.innerHTML = 0
    cartContainer.classList.add("disable")
    cartActions.classList.add("disable")
    emptyCartMessage.classList.add("disable")
    thankYou.style.display = "block"
    text.classList.add("disable")
}

emptyButton.addEventListener("click", emptyCart)
buyNowButton.addEventListener("click", doneShoppingItems)

//Execution of the functions
loadProducts()

let hola
console.log(hola())





