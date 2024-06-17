function showProduct(element) {
    const id = element.getAttribute('id')

    window.location.replace('http://localhost:3000/product/' + id)
}

function checkUser() {
    console.log(Number.isInteger('3'))
    if (!isNaN(Number(localStorage.getItem('user_id')))) {
        const basket = document.createElement('div')
        basket.classList.add('shopping-cart')
        basket.innerText = 'Корзина'
        basket.setAttribute('onclick', 'toCart()')
        document.querySelector('.navbar-sub').prepend(basket)
    }
}

checkUser()

function toCart() {
    const id = localStorage.getItem('user_id')

    window.location.replace('http://localhost:3000/cart/' + id)
}

function admin() {
    if (localStorage.getItem('role') != 'ADMIN') 
        alert('not a admin')
    else
        window.location.replace('http://localhost:3000/admin')
}

var filtered = false
var elements;

function filterBrand(element) {
    if (!filtered) {
        elements = document.querySelectorAll('.product')
        console.log(elements)
    }
}