//Products
const products = [

    //Bebidas
    {
        id: 0,
        title: "Coca-Cola",
        image: "../img/bebidas/coca-cola.jpg",
        category: {
            id: 0,
            categoryName: "Bebidas"
        },
        price: 650,
    },
    {
        id: 1,
        title: "Fanta",
        image: "../img/bebidas/fanta.jpg",
        category: {
            id: 0,
            categoryName: "Bebidas"
        },
        price: 525,
    },
    {
        id: 2,
        title: "Sprite",
        image: "../img/bebidas/sprite.jpg",
        category: {
            id: 0,
            categoryName: "Bebidas"
        },
        price: 430

    },
    //Combos
    {
        id: 3,
        title: "Combo 1",
        image: "../img/combos/combo-01.jpg",
        category: {
            id: 1,
            categoryName: "Combos"
        },
        price: 950.99,
    },
    {
        id: 4,
        title: "Combo 2",
        image: "../img/combos/combo-02.jpg",
        category: {
            id: 1,
            categoryName: "Combos"
        },
        price: 1200,
    },
    {
        id: 5,
        title: "Combo 3",
        image: "../img/combos/combo-03.jpg",
        category: {
            id: 1,
            categoryName: "Combos"
        },
        price: 1550,
    },
    {
        id: 6,
        title: "Combo 4",
        image: "../img/combos/combo-04.jpg",
        category: {
            id: 1,
            categoryName: "Combos"
        },
        price: 2300,
    },
    //Pastas
    {
        id: 7,
        title: "Penne",
        image: "../img/pastas/pasta-01.jpg",
        category: {
            id: 2,
            categoryName: "Pastas"
        },
        price: 2100,
    },
    {
        id: 8,
        title: "Spaghetti",
        image: "../img/pastas/pasta-02.jpg",
        category: {
            id: 2,
            categoryName: "Pastas"
        },
        price: 1450,
    },
    {
        id: 9,
        title: "Nocci",
        image: "../img/pastas/pasta-03.jpg",
        category: {
            id: 2,
            categoryName: "Pastas"
        },
        price: 2300,
    },
    
]

//Importing elementos from the DOM
const productContainer = document.querySelector("#product-container")
const categoryButtons = document.querySelectorAll(".category-button")
const mainTitle = document.querySelector("#main-title")
const number = document.querySelector("#number")
let addButtons, numberReduce
let productsInTheCart = [ ]


//Event listener 
categoryButtons.forEach( button =>{
    button.addEventListener("click", (event)=>{

        categoryButtons.forEach( button => button.classList.remove("active"))
        event.currentTarget.classList.add("active")

        productContainer.innerHTML = ""

        if (event.currentTarget.id === "Todo") {
            mainTitle.innerText = "Todos los productos"
            loadProducts(products)
        } else{
            mainTitle.innerText = event.currentTarget.id
            loadProducts(products.filter( porduct => porduct.category.categoryName === event.currentTarget.id))
        }
    })
})

//Function 1
const loadProducts = (chosenProducts)=>{

    chosenProducts.forEach( product => {
        const div = document.createElement("div")
        div.classList.add("product")
        div.innerHTML = `
        <div class="product-image">
            <img src="${product.image}">
        </div>

        <div class="product-text">
            <h4 class="product-title">${product.title}</h4>
            <small class="product-price">$ ${product.price}</small>
            <button class="add-button" id=${product.id}>Agregar</button>
        </div>
        `
        productContainer.append(div)
    });

    updateAddButtons()
}

//Function 2
const updateAddButtons = ()=>{
    addButtons = document.querySelectorAll(".add-button")
    addButtons.forEach( button => {
        button.addEventListener("click", addProductToCart)
    })
}

//Function 3
const addProductToCart = (event)=>{

     const idButton = parseInt(event.currentTarget.id)
     const productToBeAdded =  products.find( product => product.id === idButton)

    if (productsInTheCart.some( product => product.id === idButton)) {
        productToBeAdded.amount++
    } else{
        productToBeAdded.amount = 1
        productsInTheCart.push(productToBeAdded)
    }

    updateNumber()
    localStorage.setItem("Productos en el carrito:", JSON.stringify(productsInTheCart))
}

//Function 4
const updateNumber = ()=>{ 
    numberReduce = productsInTheCart.reduce((acc,product)=> acc + product.amount, 0)
    number.innerHTML = numberReduce
    localStorage.setItem("Cantidad de productos en el carrito:", numberReduce)
}

//Local Storage
const ls = JSON.parse(localStorage.getItem("Productos en el carrito:"))
if (ls) {
    productsInTheCart = ls
    number.innerHTML = localStorage.getItem("Cantidad de productos en el carrito:")
} else{
    loadProducts(products)
}

//Loading the products right after the page refreshes or is loaded for the first time
loadProducts(products)
mainTitle.innerText = "Todos los productos"
