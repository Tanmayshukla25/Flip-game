const StartGameDiv = document.getElementById("StartGameDiv");
const startGameBtn = document.getElementById("startGameBtn");
const timer = document.getElementById("timer");
const clicks = document.getElementById("clicks");
const Scores = document.getElementById("Scores");
let Inputbox = document.querySelector("#Inputbox");
const GameOver = document.getElementById("GameOver");
let copyData = document.querySelector("#copyData");
let btnboard = document.querySelector("#btnboard");
const flip_container = document.querySelector(".flip_container");
let boxes = document.querySelectorAll(".flip-card")
let flipinner = document.querySelectorAll(".flip-card-inner");
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


timer.innerText = timers
clicks.innerText = clickCount;
Scores.innerText = score;



creatBackImages()
startGameBtn.addEventListener("click", () => {
  const value = input.value.trim();
  if (value === "") {
    alert("Please Enter Your Name")
  }

  let savedData = JSON.parse(localStorage.getItem("localArr")) || [];

  const newPlayer = {
    name: value,
    date: new Date().toLocaleString(),
    score: 0,
    time: 60,
    clicks: 0,
  };

  savedData.push(newPlayer);
  localStorage.setItem("localArr", JSON.stringify(savedData));

 
  clickCount = 0;
  score = 0;
  timers = 60;
  openImage = 0;
  imageStore = [];
  noRepeatImage = [];
  isProcessing = false;

  clicks.innerText = clickCount;
  Scores.innerText = score;
  timer.innerText = timers;
  input.value = ""; 

 
  flipback.forEach(back => (back.innerHTML = ""));
  flipinner.forEach(card => {
    card.classList.remove("backSide");
  });
  
  creatBackImages(); 

  StartGameDiv.style.display = "none";
  flip_container.style.display = "flex";

  timeCounting();
});





function creatBackImages() {
  noRepeatImage = [];

  for (let i = 0; i < flipback.length; i++) {
    flipback[i].innerHTML = ""; 
    const backImage = document.createElement("img");
    backImage.src = ActualImg[RandomImage()];
    flipback[i].appendChild(backImage);
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

    frontImage.parentElement.parentElement.classList.add("backSide");

    clickCount++;
    clicks.innerText = clickCount;

    let getARR = JSON.parse(localStorage.getItem("localArr"));
    getARR[getARR.length - 1].clicks = clickCount;
    localStorage.setItem("localArr", JSON.stringify(getARR));



    openImage++;



    let backImage = frontImage.parentElement.nextElementSibling.children[0];
    imageStore.push(backImage);


    if (openImage > 1)
      isProcessing = true;
    if (imageStore[0].src === imageStore[1].src) {
      openImage = 0;
      imageStore.length = 0;
      score++;
      Scores.innerText = score;
      isProcessing = false;
    
      let getARR = JSON.parse(localStorage.getItem("localArr"));
      getARR[getARR.length - 1].score = score;
      localStorage.setItem("localArr", JSON.stringify(getARR));
      
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




function timeCounting() {
  let time = setInterval(() => {
    timer.innerText = timers;

    let getARR = JSON.parse(localStorage.getItem("localArr"));
    getARR[getARR.length - 1].time = timers;
    localStorage.setItem("localArr", JSON.stringify(getARR));
    


    if (timers == 0 || score == 6) {
      
      flip_container.style.display = "none"
      GameOver.style.display = "block";
      GameOver.innerText = `       Congratulations!!
      Clicked :${clickCount} , Times :${timers} And Your Score is ${score}`;

      clearInterval(time);
      setTimeout(() => {
        GameOver.style.display = "none";
      StartGameDiv.style.display = "block";
      

       
    }, 5000);
    }
    else {
      timers--;
    }
  }, 1000);

}


btnboard.addEventListener("click", () => {
  let CopyLocalDATA = JSON.parse(localStorage.getItem("localArr"));
  copyData.innerHTML = "";
  
  if (CopyLocalDATA && CopyLocalDATA.length > 0) {
    copyData.style.display = "block";
    CopyLocalDATA.sort((a, b) => b.score - a.score);
   
  } else {
    copyData.style.display = "block";
    copyData.innerText = "NO DATA TO SHOW YET !!!";
    copyData.classList.add("NoDATA");
  }
  
 

  let table = document.createElement("table");
  table.classList.add("tables")
 
 

  let thead = document.createElement("thead");
  let headerRow = document.createElement("tr");
  headerRow.classList.add("headerRow")
  let headers = ["Name", "Date", "Score","Time","Clicks"];
  headers.forEach(text => {
    let th = document.createElement("th");
    th.innerText = text;
    th.style.border = "1px solid white";
    th.style.padding = "8px";
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);

  let tbody = document.createElement("tbody");
  tbody.style.color="white"
  tbody.style.fontSize="20px"
  CopyLocalDATA.forEach(val => {
    let dataRow = document.createElement("tr");

    let cell1 = document.createElement("td");
    cell1.innerText = val.name;
    cell1.style.border = "1px solid white";
    cell1.style.padding = "8px";
    cell1.classList.add("lead")

    let cell2 = document.createElement("td");
    cell2.innerText = val.date;
    cell2.classList.add("lead")
    cell2.style.border = "1px solid white";
    cell2.style.padding = "8px";

    let cell3 = document.createElement("td");
    cell3.innerText = val.score;
    cell3.classList.add("lead")
    cell3.style.border = "1px solid white";
    cell3.style.padding = "8px";

    let cell4 = document.createElement("td");
    cell4.innerText = val.time;
    cell4.classList.add("lead")
    cell4.style.border = "1px solid white";
    cell4.style.padding = "8px";

    let cell5 = document.createElement("td");
    cell5.innerText = val.clicks;
    cell5.classList.add("lead")
    cell5.style.border = "1px solid white";
    cell5.style.padding = "8px";

    dataRow.append(cell1, cell2, cell3,cell4,cell5);
    tbody.appendChild(dataRow);
  });

  table.append(thead, tbody);
  copyData.appendChild(table);
});



