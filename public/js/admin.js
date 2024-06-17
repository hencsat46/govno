function newType() {
    document.querySelector('.wrapper').style.filter = 'blur(5px)'
    document.querySelector('.add-type').style.display = 'flex'
}
        
function closeModal(element) {        
    element.parentElement.parentElement.style.display = 'none'
    console.log(element.parentElement.parentElement)
    document.querySelector('.wrapper').style.filter = 'blur(0px)'
}

function newBrand() {
    document.querySelector('.wrapper').style.filter = 'blur(5px)'
    document.querySelector('.add-brand').style.display = 'flex'
}

function newDevice() {
    document.querySelector('.wrapper').style.filter = 'blur(5px)'
    document.querySelector('.add-device').style.display = 'flex'
}

async function addBrand(element) {
    const text = element.parentElement.parentElement.querySelector('.info-wrapper input').value
    console.log(text)

    const data = {
        name: text,
    }

    const request = new Request('http://localhost:3000/api/brand', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })

    const response = await fetch(request)

    if (response.status == 200) {
        window.location.reload()
    }

    console.log(response)
}
async function addType(element) {
    const text = element.parentElement.parentElement.querySelector('.info-wrapper input').value
    console.log(text)

    const data = {
        name: text,
    }

    const request = new Request('http://localhost:3000/api/type', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })

    const response = await fetch(request)

    if (response.status == 200) {
        window.location.reload()
    }

}
async function addDevice(element) {
    const mWindow = element.parentElement.parentElement

    const name = mWindow.querySelector('.name-text').value
    const cost = mWindow.querySelector('.cost-text').value
    const brandId = mWindow.querySelector('.brand-select').value
    const typeId = mWindow.querySelector('.type-select').value
    const description = mWindow.querySelector('.des-text').value

    const image = mWindow.querySelector('.input-file').files[0]

    const ram = mWindow.querySelector('.ram-text').value
    const camera = mWindow.querySelector('.camera-text').value
    const cpu = mWindow.querySelector('.cpu-text').value
    const ssd = mWindow.querySelector('.ssd-text').value
    const info = [
        {
            title: 'Оперативная память',
            description: ram,
        },
        {
            title: 'Камера',
            description: camera,
        },
        {
            title: 'Процессор',
            description: cpu,
        },
        {
            title: 'Объём памяти',
            description: ssd,
        },
    ]

    
    const formData = new FormData()

    formData.append('name', name)
    formData.append('price', cost)
    formData.append('brandId', brandId)
    formData.append('typeId', typeId)
    formData.append('description', description)
    formData.append('info', JSON.stringify(info))
    formData.append('img', image)

    const request = new Request('http://localhost:3000/api/device', {
        method: 'POST',
        mode: 'cors',
        body: formData,
    })

    const response = await fetch(request)

    
    window.location.reload()
    
}