//This section is written by using Javascript. 
//In this project, some pages are written by using pure Javascript and the others pages are written by using Jquery.
//I have done that just for practicing both Javascript and Jquery(a very popular framework).

//Part 1 : Function for Sticky Menu bar and Animation
window.onscroll = function(){
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
    document.querySelector('.total-count-item').textContent = itemCount;
}

function displayCartSub(){ //Display Sub Shopping Cart
    let output= "";
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
    output +=   `<div class="sub-shopping-cart-total">
                    <div class="total-money">Tổng : &nbsp;<span class="total-money-number">${totalMoneyConvert}</span>&nbsp;&nbsp;Đồng</div>
                    <a class="button-access-shopping-cart" href="shoppingcart.html">Thanh Toán</a>
                 </div>`
    }
    document.querySelector('.sub-shopping-cart-container').innerHTML = output;
}

function separator1000(num){ // 1000 separator 
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// Part 3: Function for Search Bar
document.querySelector('.input-search-bar').addEventListener('focus',(function(){
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
    searchName(accessoriesData);
    searchName(guitarShowData);
    function searchName(array){
        for (let i = 0; i < array.length; i++){
            if (array[i]['name'].toLowerCase().includes(input)){
                let indexArray = array[i]['name'].toLowerCase().indexOf(input);
                let textColored = array[i]['name'].slice(indexArray,indexArray + input.length);
                let arrayName = array[i]['name'].slice(0,indexArray)  + `<span class="text-mark-search">${textColored}</span>` + array[i]['name'].slice(indexArray + input.length)
                output += `<a onclick="sendData(this)"  href="productitem.html" class="search-bar-item" data-id="${array[i]['id']}" data-group="${array[i]['group']}">${arrayName}</a>`
        }
    }
    if (output.length ==0){
        output = `<div class="search-bar-notification">Không có sản phẩm phù hợp</div>`
    }
    document.querySelector('.suggestion-guitar').innerHTML = output;
    console.log(output)
    }
}

function sendData(elt){
    let itemData = new Object;
    itemData.group = elt.dataset.group;
    itemData.id = elt.dataset.id;
    localStorage.setItem('dataguitaritem',JSON.stringify(itemData));
}

document.querySelector('.x-mark-search-bar').addEventListener('click',deleteContent)
function deleteContent(){
    document.querySelector('.input-search-bar').value = "";
    document.querySelector('.x-mark-search-bar').style.display = "none";
}
//Part 4 : Function for button "Nổi bật" and "Sản Phẩm Mới"
let pagination = document.querySelectorAll('.pagination');
for(let i =0; i< pagination.length;i++){
    pagination[i].addEventListener('click',changePagination);
}
let hotItems = document.querySelectorAll('.container-1');
let newItems = document.querySelectorAll('.container-2');
function changePagination(){
    changeBackgroundColor();
    this.style.backgroundColor = "#A47C44";
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
function changeBackgroundColor(){
    for(let i =0; i< pagination.length; i++){
        pagination[i].style.backgroundColor = "#F2F0F0";
    }
}
//Part 3 : Function for Sub banner
var x = document.getElementById("my-audio");
x.autoplay = true;
//Part 4 : Function for Shopping Cart

//Part 5 : Function for Blog Slide
let slideIndex = 0; 
let slideItem = document.querySelector('.blog-slide-inner');
document.querySelector('.blog-slide-prev').addEventListener('click',prevButton);
document.querySelector('.blog-slide-next').addEventListener('click',nextButton);

function prevButton(){
    document.querySelector('.blog-slide-inner').style.transform = "translateX(0%)";
    document.querySelector('.blog-slide-prev').style.display = "none";
    document.querySelector('.blog-slide-next').style.display = "block";
}

function nextButton(){
    document.querySelector('.blog-slide-inner').style.transform = "translateX(-50%)";
    document.querySelector('.blog-slide-prev').style.display = "block";
    document.querySelector('.blog-slide-next').style.display = "none";
}
//Part 6 : Funtion for Scrolling Button
document.querySelector('.scrolling-button').addEventListener('click',scrollToTop);
function scrollToTop(){
    document.body.scrollTop = 0; 
    document.documentElement.scrollTop = 0;
}