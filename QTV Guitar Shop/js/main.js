//This section is written by using Javascript. 
//In this project, some pages are written by using pure Javascript and the others pages are written by using Jquery.
//I have done that just for practicing both Javascript and Jquery(a very popular library).

//Part 1 : Function for Welcome Pop Up
if (document.body.offsetHeight > window.innerHeight){
    var scrollBarWidth = window.innerWidth - document.body.clientWidth;
}
else scrollBarWidth = 0;
if (localStorage.getItem('popup')){
    playVideo();
}
else {
    document.body.classList.add('start');
    document.body.style.paddingRight = `${scrollBarWidth}px`;
    document.querySelector('.welcome-popup').style.display = "block";
}
document.querySelector('.access-button').addEventListener('click',accessWebsite) // click to close Welcome Pop up
function accessWebsite(){
    document.body.classList.remove('start');
    document.querySelector('.welcome-popup').classList.add('gone');
    document.body.style.paddingRight = `0px`;
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
    if (window.innerwidth < 1025) return
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
//Part 2 : Function for Sticky Menu bar and Animation
window.onscroll = function(){
    animationMenuBar();
    subBannerMove();
    myProductAnimation();
    guitarShowAnimation();
}
function animationMenuBar(){
    if (document.body.scrollTop > 62 || document.documentElement.scrollTop > 62){
        let addScroll = document.querySelectorAll('.header-desktop, .search-bar, .input-search-bar, .line-1, .avatar, .avatar-sub, .container, .suggestion-item, .x-mark-search-bar');
        for (let i = 0; i < addScroll.length; i++){
            addScroll[i].classList.add('scroll');
        }
        document.querySelector('.scrolling-button').style.display = "block";
    }
    else {
        let removeScroll = document.querySelectorAll('.header-desktop, .search-bar, .input-search-bar, .line-1, .avatar, .avatar-sub, .container, .suggestion-item, .x-mark-search-bar');
        for (let i = 0; i < removeScroll.length; i++){
            removeScroll[i].classList.remove('scroll');
        }  
        document.querySelector('.scrolling-button').style.display = "none";
    }
}

// Part 2 : Function for Shopping Cart
let shoppingCart=[];
if (localStorage.getItem('shoppingcartguitar') != null){
    loadCart();
    displayCartSub()
    countItem()
}
else displayCartSub();
function Item(group, id, name, price, count, image){ //Item Constructor
    this.group = group;
    this.id = id;
    this.name = name;
    this.price = price;
    this.count = count;
    this.image = image;
}

function saveCart (){//Save Cart
    localStorage.setItem('shoppingcartguitar',JSON.stringify(shoppingCart))
}

function loadCart(){//Load Cart
    shoppingCart = JSON.parse(localStorage.getItem('shoppingcartguitar'));
}

function countItem(){  //Count Item 
    let itemCount = 0;
    for (let i = 0; i < shoppingCart.length; i++){
        itemCount += shoppingCart[i].count;
    }
    document.querySelectorAll('.total-count-item').forEach( x => x.textContent = itemCount);
}

function displayCartSub(){ //Display Sub Shopping Cart
    let output= "";
    let outputTotalMoney="";
    let totalMoney = 0;
    if (shoppingCart.length == 0){
        output = '<div class="shopping-cart-note">Chưa Có Sản Phẩm</div>';
    }
    else{
        for (let i = 0; i < shoppingCart.length; i++){
            totalMoney += shoppingCart[i].price.replace(/\D/g,'') * shoppingCart[i].count
            output +=   `<div class="sub-shopping-cart-item">
                            <div class="image-item-shopping"><img src="${shoppingCart[i].image}" alt="item"></div>
                            <div class="info-item-shopping">
                                <div class="name-item-shopping">${shoppingCart[i].name}</div>
                                <div class="price-item"><span class="count-item-shopping">${shoppingCart[i].count}</span>&nbsp;&nbsp;x&nbsp;&nbsp;<span class="price-item-shopping">${shoppingCart[i].price}</span> Đồng</div>
                            </div>
                         </div>`
    }
    let totalMoneyConvert = separator1000(totalMoney);
    outputTotalMoney +=  `<div class="total-money">Tổng : &nbsp;<span class="total-money-number">${totalMoneyConvert}</span>&nbsp;&nbsp;Đồng</div>
                        <a class="button-access-shopping-cart" href="shoppingcart.html">Thanh Toán</a>`
    }
    document.querySelector('.sub-shopping-cart-container-item').innerHTML = output;
    document.querySelector('.sub-shopping-cart-total').innerHTML = outputTotalMoney;
}

function separator1000(num){ // 1000 separator 
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// Part 3: Function for Search Bar

document.querySelector('.input-search-bar').addEventListener('focus',(function(){//for Mobile
    document.querySelector('.suggestion-item').classList.add('being-focus');
}))
document.querySelector('.input-search-bar').addEventListener('blur',(function(){
    setTimeout (function (){document.querySelector('.suggestion-item').classList.remove('being-focus')},150);
}))
document.querySelector('.input-search-bar').addEventListener('input',searchItem)
function searchItem(){
    let input = document.querySelector('.input-search-bar').value.toLowerCase();
    let output="";
    if (input.length == 0) {
        document.querySelector('.suggestion-guitar').innerHTML = output;
        document.querySelector('.x-mark-search-bar').style.display = "none";
        return;
    }
    else document.querySelector('.x-mark-search-bar').style.display = "block";
    searchName(guitarClassicalData);
    searchName(guitarElectricalData);
    searchName(guitarAcousticData);
    searchName(guitarUkuleleData);
    searchNameAccessories(accessoriesData);
    searchNameGuitarShow(guitarShowData);
    function searchName(array){
        for (let i = 0; i < array.length; i++){
            if (array[i]['name'].toLowerCase().includes(input)){
                let indexArray = array[i]['name'].toLowerCase().indexOf(input);
                let textColored = array[i]['name'].slice(indexArray,indexArray + input.length);
                let arrayName = array[i]['name'].slice(0,indexArray)  + `<span class="text-mark-search">${textColored}</span>` + array[i]['name'].slice(indexArray + input.length)
                output += `<a onclick="sendData(this);deleteContentClick(this)" href="productitem.html" class="search-bar-item" data-id="${array[i]['id']}" data-group="${array[i]['group']}">${arrayName}</a>`
            }
        }        
    }
    function searchNameAccessories(array){
        for (let i = 0; i < array.length; i++){
            if (array[i]['name'].toLowerCase().includes(input)){
                let indexArray = array[i]['name'].toLowerCase().indexOf(input);
                let textColored = array[i]['name'].slice(indexArray,indexArray + input.length);
                let arrayName = array[i]['name'].slice(0,indexArray)  + `<span class="text-mark-search">${textColored}</span>` + array[i]['name'].slice(indexArray + input.length)
                output += `<a onclick="sendDataAccesories(this);deleteContentClick(this)" href="accessories.html" class="search-bar-item" data-id="${array[i]['id']}" data-group="${array[i]['group']}">${arrayName}</a>`
            }
        }   
    }
    function searchNameGuitarShow(array){
        for (let i = 0; i < array.length; i++){
            if (array[i]['name'].toLowerCase().includes(input)){
                let indexArray = array[i]['name'].toLowerCase().indexOf(input);
                let textColored = array[i]['name'].slice(indexArray,indexArray + input.length);
                let arrayName = array[i]['name'].slice(0,indexArray)  + `<span class="text-mark-search">${textColored}</span>` + array[i]['name'].slice(indexArray + input.length)
                output += `<a href="guitarshow${i+1}.html" onclick="deleteContentClick(this)" class="search-bar-item" data-id="${array[i]['id']}" data-group="${array[i]['group']}">${arrayName}</a>`
            }
        }    
    }
    if (output.length == 0){
        output = `<div class="search-bar-notification">Không có sản phẩm phù hợp</div>`
    } 
    document.querySelector('.suggestion-guitar').innerHTML = output;
}


document.querySelector('.top-navbar-container > .search-bar > .input-search-bar').addEventListener('focus',(function(){//for Desktop
    document.querySelector('.top-navbar-container > .search-bar > .suggestion-item').classList.add('being-focus');
}))
document.querySelector('.top-navbar-container > .search-bar > .input-search-bar').addEventListener('blur',(function(){
    setTimeout (function (){document.querySelector('.top-navbar-container > .search-bar > .suggestion-item').classList.remove('being-focus')},150);
}))
document.querySelector('.top-navbar-container > .search-bar > .input-search-bar').addEventListener('input',searchItemDesktop)
function searchItemDesktop(){
    let input = document.querySelector('.top-navbar-container > .search-bar > .input-search-bar').value.toLowerCase();
    let output="";
    if (input.length == 0) {
        document.querySelector('.top-navbar-container > .search-bar > .suggestion-item >.suggestion-guitar').innerHTML = output;
        document.querySelector('.top-navbar-container > .search-bar > .x-mark-search-bar').style.display = "none";
        return;
    }
    else document.querySelector('.top-navbar-container > .search-bar > .x-mark-search-bar').style.display = "block";
    searchName(guitarClassicalData);
    searchName(guitarElectricalData);
    searchName(guitarAcousticData);
    searchName(guitarUkuleleData);
    searchNameAccessories(accessoriesData);
    searchNameGuitarShow(guitarShowData);
    function searchName(array){
        for (let i = 0; i < array.length; i++){
            if (array[i]['name'].toLowerCase().includes(input)){
                let indexArray = array[i]['name'].toLowerCase().indexOf(input);
                let textColored = array[i]['name'].slice(indexArray,indexArray + input.length);
                let arrayName = array[i]['name'].slice(0,indexArray)  + `<span class="text-mark-search">${textColored}</span>` + array[i]['name'].slice(indexArray + input.length)
                output += `<a onclick="sendData(this);deleteContentClick(this)" href="productitem.html" class="search-bar-item" data-id="${array[i]['id']}" data-group="${array[i]['group']}">${arrayName}</a>`
            }
        }        
    }
    function searchNameAccessories(array){
        for (let i = 0; i < array.length; i++){
            if (array[i]['name'].toLowerCase().includes(input)){
                let indexArray = array[i]['name'].toLowerCase().indexOf(input);
                let textColored = array[i]['name'].slice(indexArray,indexArray + input.length);
                let arrayName = array[i]['name'].slice(0,indexArray)  + `<span class="text-mark-search">${textColored}</span>` + array[i]['name'].slice(indexArray + input.length)
                output += `<a onclick="sendDataAccesories(this);deleteContentClick(this)" href="accessories.html" class="search-bar-item" data-id="${array[i]['id']}" data-group="${array[i]['group']}">${arrayName}</a>`
            }
        }   
    }
    function searchNameGuitarShow(array){
        for (let i = 0; i < array.length; i++){
            if (array[i]['name'].toLowerCase().includes(input)){
                let indexArray = array[i]['name'].toLowerCase().indexOf(input);
                let textColored = array[i]['name'].slice(indexArray,indexArray + input.length);
                let arrayName = array[i]['name'].slice(0,indexArray)  + `<span class="text-mark-search">${textColored}</span>` + array[i]['name'].slice(indexArray + input.length)
                output += `<a href="guitarshow${i+1}.html" onclick="deleteContentClick(this)" class="search-bar-item" data-id="${array[i]['id']}" data-group="${array[i]['group']}">${arrayName}</a>`
            }
        }    
    }
    if (output.length == 0){
        output = `<div class="search-bar-notification">Không có sản phẩm phù hợp</div>`
    } 
    document.querySelector('.top-navbar-container > .search-bar > .suggestion-item > .suggestion-guitar').innerHTML = output;
}




function sendData(elt){
    let itemData = new Object;
    itemData.group = elt.dataset.group;
    itemData.id = elt.dataset.id;
    localStorage.setItem('dataguitaritem',JSON.stringify(itemData));
}
function sendDataAccesories(elt){
    let itemData = new Object;
    itemData.group = elt.dataset.group;
    itemData.id = elt.dataset.id;
    localStorage.setItem('dataaccessoryitem',JSON.stringify(itemData));
}

document.querySelectorAll('.x-mark-search-bar').forEach(x => x.addEventListener('click',function(){
    let elt = this;
    deleteContent(elt)
}))
function deleteContent(elt){
    elt.parentNode.childNodes.forEach(elm => elm.nodeType != 1 && elm.parentNode.removeChild(elm)); //remove text node
    elt.parentNode.childNodes[1].value = "";
    elt.style.display = "none";
    elt.parentNode.childNodes[3].childNodes.forEach(elm => elm.nodeType != 1 && elm.parentNode.removeChild(elm)); //remove text node
    setTimeout (function (){
        elt.parentNode.childNodes[3].childNodes[0].innerHTML = "";
    },350)
}
function deleteContentClick(elt){
    elt.parentNode.parentNode.parentNode.childNodes.forEach(elm => elm.nodeType != 1 && elm.parentNode.removeChild(elm)); //remove text node
    elt.parentNode.parentNode.parentNode.childNodes[1].value = "";
    elt.style.display = "none";
    elt.parentNode.innerHTML = "";
}

//Part 4 : Function for button "Nổi bật" and "Sản Phẩm Mới"
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
function subBannerMove(){
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
    else document.querySelector('.sub-banner').style.backgroundPosition = `80% ${100-y}%`;
    
    
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

// if (document.querySelector('#part2-item1').getBoundingClientRect().top < (windowHeight - heightItem)){
//     document.querySelector('#part2-item1').classList.add('loaded-guitar-show');
// }
// if (document.querySelector('#part2-item2').getBoundingClientRect().top < (windowHeight - heightItem)){
//     document.querySelector('#part2-item2').classList.add('loaded-guitar-show')
// }
// if (document.querySelector('#part2-item3').getBoundingClientRect().top < (windowHeight - heightItem)){
//     document.querySelector('#part2-item3').classList.add('loaded-guitar-show');
// }

//Part 5 : Function for Blog Slide
document.querySelector('.blog-slide-prev').addEventListener('click',prevButton);
document.querySelector('.blog-slide-next').addEventListener('click',nextButton);
let blog = document.querySelector('.blog-slide-content');
let interval;
interval = setInterval(nextButton,4000);
document.querySelector('.blog-slide').addEventListener('mouseover',function(){
    clearInterval(interval);
})
document.querySelector('.blog-slide').addEventListener('mouseout',function(){
    interval = setInterval(nextButton,4000);
})

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

//Part : Function for Subscription email and About This Website button - Footer

document.querySelector('.name-footer').addEventListener('input',function(){
    let elt = this;
    checkIsOnlyText(elt); 
})

document.querySelector('.subscription-button').addEventListener('click',sendSubscriptionEmail)
function sendSubscriptionEmail(){
    if (!checkEmpty('name-footer')) return;
    if (!checkEmpty('email-footer')) return;
    if (!checkEmailName('email-footer')) return;
    document.querySelector('.subscription-announcement-container').style.display = "block";
    document.body.classList.add('start');
    document.body.style.paddingRight = `${scrollBarWidth}px`;
    document.querySelector('.header-desktop').style.paddingRight = `${scrollBarWidth}px`;
    setTimeout(function(){
        document.querySelector('.subscription-announcement-container').style.visibility = "visible";
        document.querySelector('.subscription-announcement-container').style.opacity = 1;
        
    },100);
    setTimeout(function(){
        document.querySelector('.subscription-announcement-container').style.opacity = 0;
    },3000)
    setTimeout(function(){
        document.body.classList.remove('start');
        document.body.style.paddingRight = `0px`;
        document.querySelector('.header-desktop').style.paddingRight = `0px`;
        document.querySelector('.subscription-announcement-container').style.display = "none";
    },3500)
    
    document.querySelector('.name-footer').value = "";
    document.querySelector('.email-footer').value = "";
}

function checkIsOnlyText(elt){
    let str = elt.value;
    let check = /\d/.test(str);
    if (!check) return
    else{
        str = str.replace(/\d/g,"");
        elt.value = str;
    }
}

function checkEmpty(id){ // check whether a input field is empty
    let inputCheck = document.querySelector(`.${id}`).value;
    if (inputCheck.length == 0){
        document.querySelector(`.${id} + .empty-check`).style.zIndex = 3;
        setTimeout(function(){
            document.querySelector(`.${id} + .empty-check`).style.opacity = 1;
        },100)
        setTimeout(function(){
            document.querySelector(`.${id} + .empty-check`).style.opacity = 0;
        },2500)
        setTimeout(function(){
            document.querySelector(`.${id} + .empty-check`).style.zIndex = -1;
        },2600)
        return false
    }
    else return true
}

function checkEmailName(id){ // check email name form
    let inputCheck = document.querySelector(`.${id}`).value;
    if (!inputCheck.includes('@') || !inputCheck.includes('.')){
        document.querySelector(`.${id} ~ .email-name-check`).style.zIndex = 3;
        setTimeout(function(){
            document.querySelector(`.${id} ~ .email-name-check`).style.opacity = 1;
        },100)
        setTimeout(function(){
            document.querySelector(`.${id} ~ .email-name-check`).style.opacity = 0;
        },2500)
        setTimeout(function(){
            document.querySelector(`.${id} ~ .email-name-check`).style.zIndex = -1;
        },2600)   
        return false
    }
    let indexAtSign = inputCheck.indexOf('@');
    let check = inputCheck.slice(indexAtSign).match(/\./g).length;
    let indexPoint = inputCheck.slice(indexAtSign).indexOf('.');
    if (indexPoint < 2 || check > 1){
        document.querySelector(`.${id} ~ .email-name-check`).style.zIndex = 3;
        setTimeout(function(){
            document.querySelector(`.${id} ~ .email-name-check`).style.opacity = 1;
        },100)
        setTimeout(function(){
            document.querySelector(`.${id} ~ .email-name-check`).style.opacity = 0;
        },2500)
        setTimeout(function(){
            document.querySelector(`.${id} ~ .email-name-check`).style.zIndex = -1;
        },2600)    
        return false
    }
    return true
}

document.querySelector('.about-website-button').addEventListener('click',openAboutWebsite);
function openAboutWebsite(){
    document.querySelector('.about-website-container').style.display = "block";
    setTimeout(function(){
        document.querySelector('.about-website-container').style.opacity = "1";
    },100)
    document.body.classList.add('start');
    document.body.style.paddingRight = `${scrollBarWidth}px`;
    document.querySelector('.header-desktop').style.paddingRight = `${scrollBarWidth}px`;
}
document.querySelector('.close-about-website').addEventListener('click',closeAboutWebsite);
function closeAboutWebsite(){
    document.querySelector('.about-website-container').style.opacity = "0";
    setTimeout(function(){
        document.querySelector('.about-website-container').style.display = "none";
        document.body.classList.remove('start');
        document.body.style.paddingRight = `0px`;
        document.querySelector('.header-desktop').style.paddingRight = `0px`;
    },600)
}
//Part 6 : Funtion for Scrolling Button
document.querySelector('.scrolling-button').addEventListener('click',scrollToTop);
function scrollToTop(){
    document.body.scrollTop = 0; 
    document.documentElement.scrollTop = 0;
}






