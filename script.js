const searchBtn=document.querySelector("#search");
const searchInput=document.querySelector("input");
searchBtn.addEventListener("click", async function(){
     const location=searchInput.value;
    if(location != ""){

        const data= await fetchWeather(location);

          if(data!=null){
             updateDOM(data);
           }
     
     searchInput.value="";
        }
})

    const tempratureElem=document.querySelector(".temperture");
    const locationElem=document.querySelector(".location");
    const emojiImg=document.querySelector(".emoji");
    const timeElem=document.querySelector(".time");
    const dateElem=document.querySelector(".date");
    const dayElem=document.querySelector(".day");
    const conditionElem=document.querySelector(".condition");

function updateDOM(data){
    // filter required data
  console.log("I will update the dom",data);
  const temp=data.current.temp_c;
  const location=data.location.name;
  const timedata=data.location.localtime;
  const [date,time]=timedata.split(" ");
  const iconlink=data.current.condition.icon;
  const condition=data.current.condition.text;
    //   console.log("temp",temp,"location",location,"date",date,"time",time);
   //   console.log("icon",iconlink,"condition",condition);


    // update the dom


tempratureElem.textContent = temp + "°C";
locationElem.textContent=location;
emojiImg.src=iconlink;
timeElem.innerText=time;
dateElem.innerText=date;
conditionElem.innerText = condition;
}

async function fetchWeather(location){
    const url=`http://api.weatherapi.com/v1/current.json?key=d46b8bec072e4aebbfb111002241912&q=${location}&aqi=no`
    const response=await fetch(url);
    if(response.status==400){
        alert("location is invalid");
        return null;
    }
    else if(response.status==200){
        const json=await response.json();
        return json;
    }
}