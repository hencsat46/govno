function registration() {
    document.querySelector('.login-title').innerText = 'Регистрация'
    document.querySelector('.login-signup').innerHTML = `

        Есть аккаунт? <a class="signup-link" onclick='login()'>Войти</a>
    
    `
    document.querySelector('.login-button').setAttribute('onclick', 'signup()')
    document.querySelector('.login-button').innerText = 'Регистрация'
}

function login() {
    document.querySelector('.login-title').innerText = 'Авторизация'
    document.querySelector('.login-signup').innerHTML = `

        Нет аккаунта? <a class="signup-link" onclick='registration()'>Зарегистрироваться</a>
    
    `
    document.querySelector('.login-button').setAttribute('onclick', 'signin()')
    document.querySelector('.login-button').innerText = 'Войти'

}

async function signin() {
    const email = document.querySelector('.login-email input').value
    const password = document.querySelector('.login-password input').value

    const data = {
        email: email,
        password: password,
    }

    const request = new Request('http://localhost:3000/api/user/login/', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })

    const response = (await fetch(request))
    if (response.status == 200) {
        const responseJson = await response.json()
        console.log(responseJson)
        localStorage.setItem('role', responseJson.role)
        localStorage.setItem('token', responseJson.token)
        localStorage.setItem('user_id', responseJson.user_id)
        window.location.replace('http://localhost:3000/')
    }

    console.log(email)
}

async function signup() {
    const email = document.querySelector('.login-email input').value
    const password = document.querySelector('.login-password input').value

    const data = {
        email: email,
        password: password,
    }

    const request = new Request('http://localhost:3000/api/user/registration/', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })

    const response = await fetch(request)

    if (response.status == 200) {
        const responseJson = await response.json()
        localStorage.setItem('role', responseJson.role)
        localStorage.setItem('token', responseJson.token)
        localStorage.setItem('user_id', responseJson.user_id)
        window.location.replace('http://localhost:3000/')
    }
    

    console.log(email)
}
