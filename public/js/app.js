console.log("Client side javascript")

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })

// fetch('http://localhost:3000/weather?address=!').then((response) => {
//     response.json().then((data) => {
//         if(data.error)
//             console.log(data.error)
//         else
//         {
//             console.log(data.location)
//             console.log(data.forecast)
//         }
//     })

// })

const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const message1 = document.querySelector("#msgBox1")
const message2 = document.querySelector('#msgBox2')

message1.textContent = "Loading..."
message2.textContent = ""
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = searchElement.value
    // let url = "http://localhost:3000/weather?address=" + location

    //for heroku  adapt
    let url = "/weather?address=" + location

    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error)
            {
                message1.textContent = data.error
                message2.textContent = ""
            }
            else {
                message1.textContent = data.location
                message2.textContent = data.forecast
            }
        })

    })
})