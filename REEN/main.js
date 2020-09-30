//displaying sub navbar when scrolling
window.onscroll = () => {
    if (document.body.scrollTop > 152 || document.documentElement.scrollTop > 152){
        document.querySelector('.header-desktop-scrolling').classList.add('is-displaying')
        document.querySelector('.button-back-to-top').classList.add('is-displaying')
    }
    else{
        document.querySelector('.header-desktop-scrolling, .button-back-to-top').classList.remove('is-displaying')
        document.querySelector('.button-back-to-top').classList.remove('is-displaying')
    }
}
//scrolling to Top
document.querySelector('.button-back-to-top').addEventListener('click', () => {
    window.scrollTo(0, 0)
})
document.querySelectorAll('.navbar-menu > li')

//Banner slide

let currentIndex = 1;
const bannerItems = document.querySelectorAll('.banner-item')
const maxIndex = bannerItems.length;
bannerItems.forEach((item, index) => item.classList.add(`banner-item-${index + 1}`))
let outputBannerIndex = "";
for (let i = 0; i < bannerItems.length; i++){
    outputBannerIndex+= `<li class="banner-index-item banner-index-item-${i + 1}" onclick="showSlide(${i + 1})"></li>`
}
document.querySelector('.banner-index').innerHTML = outputBannerIndex;
document.querySelector('.banner-index-item').classList.add('active')
function showSlide(index){
    if (index === currentIndex) return;
    document.querySelector('.banner-item.active').classList.remove('active');
    document.querySelector('.banner-index-item.active').classList.remove('active');
    document.querySelector(`.banner-item-${index}`).classList.add('active');
    document.querySelector(`.banner-index-item-${index}`).classList.add('active');
    currentIndex = index;
}
document.querySelector('.prev-arrow').addEventListener('click',() => {
    if (currentIndex === 1) showSlide(maxIndex)
    else showSlide(currentIndex - 1)
})
document.querySelector('.next-arrow').addEventListener('click',() => {
    if (currentIndex === maxIndex) showSlide(1)
    else showSlide(currentIndex + 1)
})

let myBannerSlide = setInterval(() => {
    if (currentIndex === maxIndex) showSlide(1)
    else showSlide(currentIndex + 1)
},5000)

document.querySelector('.banner').addEventListener('mouseover', () => {
    clearInterval(myBannerSlide);
})

document.querySelector('.banner').addEventListener('mouseout', () => {
    myBannerSlide = setInterval(() => {
        if (currentIndex === maxIndex) showSlide(1)
        else showSlide(currentIndex + 1)
    },5000)
})

//Latest works slide

let currentSlideIndex = 1;
const maxSlideIndex = document.querySelectorAll('.carousel-item').length;
const slideContainer = document.querySelector('.latest-works-carousel-container');
const slideItem = document.querySelector('.carousel-item')
const marginSlideItem = parseInt(window.getComputedStyle(slideItem).marginRight)

document.querySelector('.carousel-next-button').addEventListener('click', () => {
    if ( currentSlideIndex === (maxSlideIndex - 3) ) return
    else {
        currentSlideIndex++;
        slideContainer.style.transform = `translateX(${-(currentSlideIndex - 1)*(270 + marginSlideItem)}px)`
    }
    if ( currentSlideIndex%4 === 1){
        document.querySelector('.carousel-index-item.active').classList.remove('active');
        const groupIndex = Math.ceil(currentSlideIndex/4);
        console.log(groupIndex)
        document.querySelector(`.carousel-index-item-${groupIndex}`).classList.add('active');
    }
})
document.querySelector('.carousel-prev-button').addEventListener('click', () => {
    if ( currentSlideIndex === 1 ) return
    else {
        currentSlideIndex--;
        slideContainer.style.transform = `translateX(${-(currentSlideIndex - 1)*(270 + marginSlideItem)}px)`
    }
    if ( currentSlideIndex%4 === 1){
        document.querySelector('.carousel-index-item.active').classList.remove('active');
        const groupIndex = Math.ceil(currentSlideIndex/4);
        console.log(groupIndex)
        document.querySelector(`.carousel-index-item-${groupIndex}`).classList.add('active');
    }
})

function changeGroupSlide(elt, groupIndex){
    if (currentSlideIndex === (groupIndex - 1)*4 + 1) return;
    currentSlideIndex = (groupIndex - 1)*4 + 1;
    slideContainer.style.transform = `translateX(${-(currentSlideIndex - 1)*(270 + marginSlideItem)}px)`;
    if (elt.classList.contains('active')) return
    else {
        document.querySelector('.carousel-index-item.active').classList.remove('active');
        elt.classList.add('active')
    }
}





