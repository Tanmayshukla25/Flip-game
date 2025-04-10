const StartGameDiv=document.getElementById("StartGameDiv");
const startGameBtn=document.getElementById("startGameBtn");
const timer=document.getElementById("timer");
const clicks=document.getElementById("clicks");
const Scores=document.getElementById("Scores");
const flip_container=document.querySelector(".flip_container");
let boxes=document.querySelectorAll(".flip-card")
let flipinner=document.querySelectorAll(".flip-card-inner")
let flipfrontImage = document.querySelectorAll(".flip-card-front img");
let flipback = document.querySelectorAll(".flip-card-back");

const images = [
 "images/image1.webp",
 "images/image2.jpg",
 "images/image3.webp",
 "images/image4.webp",
 "images/image5.jpg",
 "images/image6.webp",
  ];
  console.log(images);

  let ActualImg = [...images, ...images];
let imageStore = [];
let noRepeatImage = [];
let counter = 0;
let openImage = 0;
let clickCount = 0;
let timers = 60;
// let newRandomImages=RandomImage()

timer.innerText=timers
clicks.innerText= clickCount;
Scores.innerText= counter;



creatBackImages()
startGameBtn.addEventListener("click",()=>{
    StartGameDiv.style.display="none"
    flip_container.style.display="flex"
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
  console.log(RandomIndex);
  
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
      // cardInner.style.transform = "rotateY(180deg)";
      frontImage.parentElement.parentElement.classList.add("backSide");
      
      clickCount++;
      clicks.innerText= clickCount;
      openImage++;

  
    
      let backImage = frontImage.parentElement.nextElementSibling.children[0];
      imageStore.push(backImage);
      console.log(imageStore);

      if(openImage>1)
        if(imageStore[0].src===imageStore[1].src){
          openImage=0,
          imageStore.length=0;
          counter++;
          Scores.innerText= counter;
        }
        else{
        setTimeout(() => {
          imageStore.forEach((items)=>{
            items.parentElement.parentElement.classList.remove("backSide");
          
          })
          openImage=0;
          imageStore.length=0;
        }, 1000);
        }
    });
  });
  
  timeCounting()
  function timeCounting(){
 setInterval(() => {
  timer--;
  timer.innerText=timers
  if(timers==0||counter==6){
    
  }
 }, 1000);
  }


