const StartGameDiv=document.getElementById("StartGameDiv");
const startGameBtn=document.getElementById("startGameBtn");
const timer=document.getElementById("timer");
const flip_container=document.querySelector(".flip_container");
let boxes=document.querySelectorAll(".flip-card")
let flipinner=document.querySelectorAll(".flip-card-inner")
let flipfrontImage = document.querySelectorAll(".flip-card-front img");
let flipback = document.querySelectorAll(".flip-card-back");


let imageStore = [];
let counter = 0;
let openImage = 0;
let clickCount = 0;
let timers = 60;
startGameBtn.addEventListener("click",()=>{
    StartGameDiv.style.display="none"
    flip_container.style.display="flex"
})

flipfrontImage.forEach((frontImage) =>{
    frontImage.addEventListener("click",()=>{
        clickCount++;

    })

} )
    

