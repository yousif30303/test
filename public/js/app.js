
console.log('it is work')



const ourBut = document.querySelector('form')

const messageOne = document.getElementById('message-1')
const messageTwo = document.getElementById('message-2')


ourBut.addEventListener('submit',(e)=>{
    e.preventDefault();
    messageOne.textContent = 'loading...'
    messageTwo.textContent = ''
    const location = document.querySelector('input').value
    fetch('http://localhost:3000/weather?address='+location+'').then((response)=>{
    response.json().then((data)=>{
        if(data.error) {
            messageOne.textContent=data.error
        }
        else{
            messageOne.textContent=data.forecast
            messageTwo.textContent=data.location
        }
    })
})
})
