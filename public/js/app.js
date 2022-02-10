const weatherForm=document.querySelector('form');
const search=document.querySelector('input');
const message_1=document.querySelector('#message_1');
const message_2=document.querySelector('#message_2');



weatherForm.addEventListener('submit',(e)=>{
e.preventDefault();
message_1.textContent='Loading...';
message_2.textContent='';
const location1=search.value;
console.log('searching weather for location : ',location1);
    fetch(`/weather?address=${location1}`).then((response)=>{
        response.json().then((data)=>{

            if(data.error){
                message_1.textContent=data.error;
            }else{
                message_1.textContent=data.location;
                message_2.textContent=data.forecastData;
            }
        })
    })
})