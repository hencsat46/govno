function toCart() {
    const id = localStorage.getItem('user_id')

    window.location.replace('http://localhost:3000/cart/' + id)
}

async function addToCart() {
    const deviceId = window.location.toString().split('/').pop()
    const userId = localStorage.getItem('user_id')

    const data = {
        deviceId: deviceId,
        userId: userId,
    }

    const request = new Request('http://localhost:3000/cart', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })

    const response = await fetch(request)
    console.log(response)
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

function admin() {
    if (localStorage.getItem('role') != 'ADMIN') 
        alert('not a admin')
    else
        window.location.replace('http://localhost:3000/admin')
}