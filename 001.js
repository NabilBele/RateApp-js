//open modal button
let adReviewBtn = document.querySelector(".add-review");
//modal div
let modal = document.querySelector(".modal");
//cancel button
let cancleBtn = document.querySelector(".cancel-btn");
let closeBtn = document.querySelector(".btn-close");
//open modal event
adReviewBtn.addEventListener("click", () => {
  modal.style.display = "block";
});

/////////this is count Of votes Area
let StBar5 = document.querySelector(".s5");
let StBar4 = document.querySelector(".s4");
let StBar3 = document.querySelector(".s3");
let StBar2 = document.querySelector(".s2");
let StBar1 = document.querySelector(".s1");
let StBar = [StBar1, StBar2, StBar3, StBar4, StBar5];
//////////////
//cancel modal
function CloseModal() {
  modal.style.display = "none";
}
cancleBtn.addEventListener("click", () => {
  CloseModal();
  Reset();
  checkStar = true;
});
closeBtn.addEventListener("click", () => {
  CloseModal();
  Reset();
  checkStar = true;
});
////////reset function
function Reset() {
  starCount.forEach((e) => {
    e.classList.remove("bi-star-fill");
    e.classList.add("bi-star");
    fname.value = "";
  });
}
////////rating stars hover

const starCount = [...document.getElementsByClassName("rs")];

//hover function
var checkStar = true; //thia paramiter to stop hovering onclick
///select stars bar
let selectedBar = 0;
starCount.map((e) => {
  e.addEventListener("click", () => {
    selectedBar = starCount.indexOf(e);
    checkStar = false;
  });
  e.addEventListener("mouseover", () => {
    for (var x = 0; x <= starCount.indexOf(e); x++) {
      if (checkStar) {
        starCount[x].classList.remove("bi-star");
        starCount[x].classList.add("bi-star-fill");
      }
    }
  });
  e.addEventListener("mouseout", () => {
    for (var x = 0; x <= starCount.indexOf(e); x++) {
      if (checkStar) {
        starCount[x].classList.remove("bi-star-fill");
        starCount[x].classList.add("bi-star");
      }
    }
  });
});

/////////add vote
//regex name
var regName = /^[a-zA-Z]+/;
let fname = document.getElementById("name");
////

let subBtn = document.querySelector("#submitBtn");
subBtn.addEventListener("click", () => {
  if (regName.test(fname.value)) {
    StBar[selectedBar].textContent =
      parseInt(StBar[selectedBar].textContent) + 1;
    checkStar = true;
    CloseModal();
    Reset();
    ////////total stars calculate
    let tStarCount =
      StBar5.textContent * 5 +
      StBar4.textContent * 4 +
      StBar3.textContent * 3 +
      StBar2.textContent * 2 +
      StBar1.textContent * 1;

    /////number of voters
    let numOfVotes =
      +StBar5.textContent +
      +StBar4.textContent +
      +StBar3.textContent +
      +StBar2.textContent +
      +StBar1.textContent;
    //print number of votes
    document.querySelector(".votes").textContent = numOfVotes;
    ////calculate overall rating
    let overall = tStarCount / numOfVotes;

    overallPrint.textContent = overall.toFixed(1);
  } else {
    fname.value = "Please Insert your name";
    fname.style.color = "red";
  }
  FillStars();
  ValHandler();
});
///////Main rating
let overallPrint = document.querySelector(".overall");
///////fill stars function
function FillStars() {
  let stLength = Math.round(overallPrint.textContent);
  let mainBar = [...document.getElementsByClassName("mr")];
  mainBar.forEach((e) => {
    e.classList.remove("bi-star-fill");
    e.classList.add("bi-star");
  });
  for (var x = 0; x < stLength; x++) {
    mainBar[x].classList.remove("bi-star");
    mainBar[x].classList.add("bi-star-fill");
  }
  selectedBar = 0;
}
///////////
//progress bars handler
function ValHandler() {
  let proBar = StBar.map((e) => {
    return parseInt(e.textContent);
  }).reverse();

  let maxVotes = Math.max(...proBar);
  ///
  const progressBars = [...document.getElementsByClassName("progress-bar")];
  ////
  for (var x = 0; x < progressBars.length; x++) {
    if (proBar.indexOf(maxVotes) == x) {
      progressBars[x].style.width = "100%";
    } else {
      let perCentWidth = (proBar[x] / maxVotes) * 100;
      progressBars[x].style.width = `${perCentWidth}%`;
    }
  }
}
