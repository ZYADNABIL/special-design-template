//! open settings box
let icon = document.querySelector(".settings-icon")
let settings = document.querySelector(".settings")
icon.addEventListener("click",function () {
    settings.classList.toggle("opened")
})
//! colors change option & random backgrounds
let mainColor = localStorage.getItem("color-option")
let colorslis = document.querySelectorAll(".color-list li")
let backgroundoption = true;
let counter;
let localBackground = localStorage.getItem("background_option")
if (localBackground !== null) {
    document.querySelectorAll(".randombcg span").forEach(element => {
        element.classList.remove("active")
    });
    if (localBackground == true) {
        document.querySelector(".randombcg .yes").classList.add("active")
    }else{
        document.querySelector(".randombcg .no").classList.add("active")
    }
}
if(mainColor!==null){
    document.documentElement.style.setProperty("--main-color", mainColor)
    colorslis.forEach(e=>{
        e.classList.remove("active")
    })
    document.querySelector(`[data-color = "${mainColor}"]`).classList.add("active")
}
colorslis.forEach(li => {
    li.addEventListener("click",(e)=>{
        document.documentElement.style.setProperty("--main-color",(e.target.dataset.color))
        localStorage.setItem("color-option",e.target.dataset.color)
        e.target.parentElement.querySelectorAll(".active").forEach( el=>{
            el.classList.remove("active")
        })
        e.currentTarget.classList.add("active")
    })
});
//! random Backgrounds Option
let randomBcg = document.querySelectorAll(".randombcg span")
randomBcg.forEach(span => {
    span.addEventListener("click", (e) => {
        e.target.parentElement.querySelectorAll(".active").forEach(el => {
            el.classList.remove("active")
        })
        e.currentTarget.classList.add("active")
        if (e.target.dataset.background == "yes") {
            localStorage.setItem("background_option",true) 
            backgroundoption = true
            randomize()
        } else {
            localStorage.setItem("background_option",false) 
            backgroundoption = false
            clearInterval(counter)
        }
    })
});
//! changing photos on landing page
let landing = document.getElementById("land")
let imgs = ["01.jpg", "02.jpg", "03.jpg", "04.jpg","05.jpg"]
function randomize() {
    if (backgroundoption == true) {
        counter = setInterval(() => {
            let randomNum = Math.floor(Math.random() * imgs.length);
            landing.style.backgroundImage = "url('imgs/" + imgs[randomNum] + "')";
        }, 5000);
    }
}

//!  changing skills progress bar
let spans = document.querySelectorAll(".skill-box .skill-progress span")
window.onscroll = function () {
    if(window.scrollY >= 740 ){
        spans.forEach(span =>{
            span.style.width = span.dataset.prog
        })
    }
    
}


//! create popup img

let galleryImgs = document.querySelectorAll(".gallery img")
galleryImgs.forEach(img =>{
    img.addEventListener("click",function () {
        let overlay = document.createElement("div")
        overlay.className = "popup-overlay"
        document.body.appendChild(overlay)
        let popup = document.createElement("div")
        popup.className = "popup"
        //! Add heading and closing btn to popup
        if (img.alt !== null) {
            let imgHeading = document.createElement("h2")
            let headingText = document.createTextNode(img.alt)
            imgHeading.appendChild(headingText)
            popup.appendChild(imgHeading)
            let closeBtn = document.createElement("span")
            let closeBtnText = document.createTextNode("X")
            closeBtn.className = "close-btn"
            closeBtn.appendChild(closeBtnText)
            popup.appendChild(closeBtn)
            closeBtn.addEventListener("click",function () {
                popup.remove()
                overlay.remove()
            })
        }
        let popupImg = document.createElement("img")
        popupImg.src = img.src
        popup.appendChild(popupImg)
        document.body.appendChild(popup)
    })
})

//!  bullets sections functionality

let bullets = document.querySelectorAll(".bullet")
let links = document.querySelectorAll(".header .list")

function scrollToSec(elements) {
    elements.forEach(ele => {
        ele.addEventListener("click", (e) => {
            e.preventDefault()
            document.querySelector(e.target.dataset.sec).scrollIntoView({
                behavior: "smooth"
            })
        })
    })
}

scrollToSec(bullets)
scrollToSec(links)

//! function to handle active class

function handleActive(ev) {
    ev.target.parentElement.querySelectorAll(".active").forEach(e =>{
        e.classList.remove("active")
    })
    e.classList.add("active")
}

//!  reset options

document.querySelector(".reset-btn").onclick = function () {
    localStorage.clear();
    window.location.reload();
}

//!  toggle menu 


let menuBtn = document.querySelector(".toggle-menu")
let menuLinks = document.querySelector(".list")

menuBtn.onclick = function (e) {
    menuBtn.classList.toggle("menu-active")
    menuLinks.classList.toggle("open")
    e.stopPropagation();
}

//!  click any where to close the button

document.addEventListener("click",(e)=>{
    if (e.target !== menuBtn && e.target !== menuLinks){
        if(menuLinks.classList.contains("open")){
            menuBtn.classList.toggle("menu-active")
            menuLinks.classList.toggle("open")
        }
    }
})

menuLinks.onclick = function (e) {
    e.stopPropagation();
}
