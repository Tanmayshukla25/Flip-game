const StartGameDiv = document.getElementById("StartGameDiv");
const startGameBtn = document.getElementById("startGameBtn");
const timer = document.getElementById("timer");
const clicks = document.getElementById("clicks");
const Scores = document.getElementById("Scores");
let Inputbox = document.querySelector("#Inputbox");
const GameOver = document.getElementById("GameOver");
const flip_container = document.querySelector(".flip_container");
let boxes = document.querySelectorAll(".flip-card")
let flipinner = document.querySelectorAll(".flip-card-inner")
let flipfrontImage = document.querySelectorAll(".flip-card-front img");
let flipback = document.querySelectorAll(".flip-card-back");
const input = document.querySelector("input");

const images = [
  "images/image1.webp",
  "images/image2.jpg",
  "images/image3.webp",
  "images/image4.webp",
  "images/image5.jpg",
  "images/image6.webp",
];
const localArr = []



let ActualImg = [...images, ...images];
let imageStore = [];
let noRepeatImage = [];
let score = 0;
let openImage = 0;
let clickCount = 0;
let timers = 60;
let isProcessing = false;
// let newRandomImages=RandomImage()

timer.innerText = timers
clicks.innerText = clickCount;
Scores.innerText = score;



creatBackImages()
startGameBtn.addEventListener("click", () => {
  const value = input.value.trim();
  obj = { name: value, date: new Date().toLocaleString(), score: 0,Time:0};
  localArr.push(obj)
  localStorage.setItem("localArr",JSON.stringify(localArr))
  console.log(localArr);
  


  StartGameDiv.style.display = "none"
  flip_container.style.display = "flex"
})

function creatBackImages() {
  for (let i = 0; i < ActualImg.length; i++) {
    const backImage = document.createElement("img");
    backImage.src = ActualImg[RandomImage()];
    flipback[i].append(backImage);

  }
}

function RandomImage() {
  let RandomIndex = Math.floor(Math.random() * ActualImg.length);
 

  if (noRepeatImage.includes(RandomIndex))
    return RandomImage();
  else {
    noRepeatImage.push(RandomIndex);
    return RandomIndex;
  }
}

flipinner.forEach((cardInner, index) => {
  const frontImage = flipfrontImage[index];

  frontImage.addEventListener("click", () => {

    if (isProcessing) return;
    // cardInner.style.transform = "rotateY(180deg)";
    frontImage.parentElement.parentElement.classList.add("backSide");

    clickCount++;

    // clicks.innerText = clickCount;
   let getARR=JSON.parse(localStorage.getItem("localArr"))
   getARR[getARR.length-1].click=clickCount
   localStorage.setItem("localArr",JSON.stringify(getARR))
   console.log(localArr);
   
    openImage++;



    let backImage = frontImage.parentElement.nextElementSibling.children[0];
    imageStore.push(backImage);
   

    if (openImage > 1)
      isProcessing = true;
    if (imageStore[0].src === imageStore[1].src) {
      openImage = 0,
        imageStore.length = 0;
      score++;
      Scores.innerText = score;
      isProcessing = false;
    }
    else {
      setTimeout(() => {
        imageStore.forEach((items) => {
          items.parentElement.parentElement.classList.remove("backSide");

        })
        openImage = 0;
        imageStore.length = 0;
        isProcessing = false;
      }, 2000);
    }
  });
});


timeCounting()
function timeCounting() {
  let time = setInterval(() => {
    timer.innerText = timers

    if (timers == 0 || score == 6) {
      flip_container.style.display = "none"
      GameOver.style.display = "block";
      GameOver.innerText = `Clicked ${clickCount} Times ${timers} And Your Score is ${score}`;


      clearInterval(time);
    }
    else {
      timers--;
    }
  }, 1000);

}

window.addEventListener("load",()=>{
  localStorage.clear()
})
