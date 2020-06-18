//This section is written by using pure Javascript. 
//In this project, some pages are written by using pure Javascript and the others pages are written by using Jquery.
//I have done that just for practicing both Javascript and Jquery(a very popular library).

//Part 1 : Function for Welcome Pop Up
if (window.innerWidth < 450) document.querySelector('.line3-text-sub-banner').textContent = "Cho các bạn nữ đến mua guitar";
if (localStorage.getItem('popup')){
    playVideo();
}
else {
    document.body.classList.add('start');
    document.body.style.paddingRight = `${scrollBarWidth}px`;
    document.querySelector('.welcome-popup').style.display = "block";
    document.querySelector('.top-navbar-mobile').style.paddingRight = `${scrollBarWidth}px`;
    document.querySelector('.menu-icon-mobile').style.marginLeft = `${10 + scrollBarWidth}px`;
}
document.querySelector('.access-button').addEventListener('click',accessWebsite) // click to close Welcome Pop up
function accessWebsite(){
    document.body.classList.remove('start');
    document.querySelector('.welcome-popup').classList.add('gone');
    document.body.style.paddingRight = `0px`;
    document.querySelector('.top-navbar-mobile').style.paddingRight = `0px`;
    document.querySelector('.menu-icon-mobile').style.marginLeft = `10px`;
    setTimeout(function(){
        playVideo();
        playButton();
        changeContent();
    },1000) 
    let firstTime = true; 
    localStorage.setItem('popup',firstTime)
}
document.querySelector('.my-audio').volume = 0.5;
document.querySelector('.audio-button').addEventListener('click',function(){
    playButton();
    changeContent();
} );
function playButton(){
    if (window.innerWidth < 1025) return
    if(document.querySelector('.my-audio').paused) {
        playMusic();
        document.querySelectorAll('.column').forEach( (x,index) => x.classList.add(`playing-${index+1}`));
    }
    else {
        pauseMusic();
        document.querySelectorAll('.column').forEach( (x,index) => x.classList.remove(`playing-${index+1}`));
    }
}
function playVideo(){
    document.querySelector('.video-store').play();
}
function playMusic(){
    document.querySelector('.my-audio').play();
}

function pauseMusic(){
    document.querySelector('.my-audio').pause();
}

function changeContent(){
    let current = document.querySelector('.active-tooltip');
    let change = document.querySelector('.tooltip-title:not(.active-tooltip)');
    current.classList.remove('active-tooltip');
    change.classList.add('active-tooltip');
}

document.querySelector('.video-store').addEventListener('canplay',activeVideo);
function activeVideo(){
    document.querySelector('.overlay-video').style.display = "none";
}
//Part 2 : Function for button "Nổi bật" and "Sản Phẩm Mới"
let pagination = document.querySelectorAll('.pagination');
for(let i =0; i< pagination.length;i++){
    pagination[i].addEventListener('click',changePagination);
}
let hotItems = document.querySelectorAll('.container-1');
let newItems = document.querySelectorAll('.container-2');
function changePagination(){
    if (this.classList.contains('active-pagination')) return
    document.querySelector('.active-pagination').classList.remove('active-pagination')
    this.classList.add('active-pagination');
    if (this.dataset.type == 1){
        hotItems.forEach(x => x.style.opacity = "1")
        newItems.forEach(x => x.style.opacity = "0")
        hotItems.forEach(x => x.style.visibility = "visible") 
        newItems.forEach(x => x.style.visibility = "hidden") 
    }
    else{
        hotItems.forEach(x => x.style.opacity = "0")
        newItems.forEach(x => x.style.opacity = "1")
        hotItems.forEach(x => x.style.visibility = "hidden") 
        newItems.forEach(x => x.style.visibility = "visible") 
    }
}

// Part 3 : Function for Sub banner and Animation
window.onscroll = function(){
    animationMenuBar();
    subBannerMove();
    myProductAnimation();
    guitarShowAnimation();
}
function subBannerMove(){
    if (window.innerWidth < 1023) return
    let windowHeight = window.innerHeight;
    let subBannerHeight = document.querySelector('.sub-banner').offsetHeight;
    if (document.querySelector('.sub-banner').getBoundingClientRect().bottom < windowHeight
        && document.querySelector('.sub-banner').getBoundingClientRect().bottom > subBannerHeight){
            var x = windowHeight - document.querySelector('.sub-banner').getBoundingClientRect().bottom;
            var y = 42*x/(windowHeight - subBannerHeight);
    }
    if (document.body.innerWidth > 1366){
            document.querySelector('.sub-banner').style.backgroundPosition = `50% ${100-y}%`;
        }
    else document.querySelector('.sub-banner').style.backgroundPosition = `50% ${100-y}%`;
    
    
}

function myProductAnimation(){
    let windowHeight = window.innerHeight;
    let heightItem = document.querySelector('.item').clientHeight;
    if (document.querySelector('.row1-part1').getBoundingClientRect().top < (windowHeight - heightItem)){
        document.querySelector('.row1-part1').classList.add('loaded');
    }
    if (document.querySelector('.row2-part1').getBoundingClientRect().top < (windowHeight - heightItem)){
        document.querySelector('.row2-part1').classList.add('loaded');
    }
}

function guitarShowAnimation(){
    let windowHeight = window.innerHeight;
    let heightItem = document.querySelector('.part2-guitar-show-item').clientHeight;
    if (document.querySelector('#part2-item2').getBoundingClientRect().top < (windowHeight - heightItem)){
        document.querySelector('#part2-item1').classList.add('loaded-guitar-show');
        setTimeout(function(){
            document.querySelector('#part2-item2').classList.add('loaded-guitar-show');
        },600)
        setTimeout(function(){
            document.querySelector('#part2-item3').classList.add('loaded-guitar-show');
        },1200)  
    }
}

//Part 4 : Function for Blog Slide
document.querySelector('.blog-slide-prev').addEventListener('click',prevButton);
document.querySelector('.blog-slide-next').addEventListener('click',nextButton);
let blog = document.querySelector('.blog-slide-content');
let interval;
if (window.innerWidth > 1024){
    interval = setInterval(nextButton,4000);
document.querySelector('.blog-slide').addEventListener('mouseover',function(){
    clearInterval(interval);
})
document.querySelector('.blog-slide').addEventListener('mouseout',function(){
    interval = setInterval(nextButton,4000);
})
}
function prevButton(){
    let lastChild = document.querySelector('.last-child');
    let firstChild = document.querySelector('.first-child')
    firstChild.classList.remove('first-child');
    lastChild.classList.remove('last-child');
    lastChild.classList.add('first-child');
    blog.insertBefore(lastChild,blog.childNodes[0]);
    let itemsBlog = document.querySelectorAll('.blog-item');
    itemsBlog[itemsBlog.length - 1].classList.add('last-child');
    document.querySelector('.blog-slide-content').style.animation = "move-right 0.5s forwards";
    setTimeout(function(){
        document.querySelector('.blog-slide-content').style.animation = ""
    },530)
}

function nextButton(){
    let lastChild = document.querySelector('.last-child');
    let firstChild = document.querySelector('.first-child');
    lastChild.classList.remove('last-child');
    firstChild.classList.remove('first-child');
    firstChild.classList.add('last-child');
    blog.append(firstChild);
    let itemsBlog = document.querySelectorAll('.blog-item');
    itemsBlog[0].classList.add('first-child');
    document.querySelector('.blog-slide-content').style.animation = "move-left 0.5s forwards";
    setTimeout(function(){
        document.querySelector('.blog-slide-content').style.animation = ""
    },530)
}







