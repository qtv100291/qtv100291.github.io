//This section is written by using Javascript. 
//In this project, some pages are written by using pure Javascript and the others pages are written by using Jquery.
//I have done that just for practicing both Javascript and Jquery(a very popular library).

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
    searchNameAccessories(accessoriesData);
    searchNameGuitarShow(guitarShowData);
    function searchName(array){
        for (let i = 0; i < array.length; i++){
            if (array[i]['name'].toLowerCase().includes(input)){
                let indexArray = array[i]['name'].toLowerCase().indexOf(input);
                let textColored = array[i]['name'].slice(indexArray,indexArray + input.length);
                let arrayName = array[i]['name'].slice(0,indexArray)  + `<span class="text-mark-search">${textColored}</span>` + array[i]['name'].slice(indexArray + input.length)
                output += `<a onclick="sendData(this);deleteContent()" href="productitem.html" class="search-bar-item" data-id="${array[i]['id']}" data-group="${array[i]['group']}">${arrayName}</a>`
            }
        }        
    }
    function searchNameAccessories(array){
        for (let i = 0; i < array.length; i++){
            if (array[i]['name'].toLowerCase().includes(input)){
                let indexArray = array[i]['name'].toLowerCase().indexOf(input);
                let textColored = array[i]['name'].slice(indexArray,indexArray + input.length);
                let arrayName = array[i]['name'].slice(0,indexArray)  + `<span class="text-mark-search">${textColored}</span>` + array[i]['name'].slice(indexArray + input.length)
                output += `<a onclick="sendDataAccesories(this);deleteContent()" href="accessories.html" class="search-bar-item" data-id="${array[i]['id']}" data-group="${array[i]['group']}">${arrayName}</a>`
            }
        }   
    }
    function searchNameGuitarShow(array){
        for (let i = 0; i < array.length; i++){
            if (array[i]['name'].toLowerCase().includes(input)){
                let indexArray = array[i]['name'].toLowerCase().indexOf(input);
                let textColored = array[i]['name'].slice(indexArray,indexArray + input.length);
                let arrayName = array[i]['name'].slice(0,indexArray)  + `<span class="text-mark-search">${textColored}</span>` + array[i]['name'].slice(indexArray + input.length)
                output += `<a href="guitarshow${i+1}.html" onclick="deleteContent()" class="search-bar-item" data-id="${array[i]['id']}" data-group="${array[i]['group']}">${arrayName}</a>`
            }
        }    
    }
    if (output.length == 0){
        output = `<div class="search-bar-notification">Không có sản phẩm phù hợp</div>`
    } 
    document.querySelector('.suggestion-guitar').innerHTML = output;
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

document.querySelector('.x-mark-search-bar').addEventListener('click',deleteContent)
function deleteContent(){
    document.querySelector('.input-search-bar').value = "";
    document.querySelector('.x-mark-search-bar').style.display = "none";
}

//Part 4 : Function for Showing Filter Part
let filterContent = document.querySelectorAll('.filter-content');
for (let i = 0; i < filterContent.length; i++){ //Set a definite Number for max-height
    filterContent[i].style.maxHeight = filterContent[i].scrollHeight + "px";
}

let filterTitle = document.querySelectorAll('.filter-title');
for(let i = 0; i < filterTitle.length; i++){
    filterTitle[i].addEventListener('click',showFilterContent);
}

function showFilterContent(){
    this.parentNode.childNodes.forEach(elm => elm.nodeType != 1 && elm.parentNode.removeChild(elm));//remove text node
    if ( this.childNodes[1].style.display != "block"){
        this.parentNode.childNodes[1].style.maxHeight = "0px";
        this.style.borderBottom = "none";
        this.childNodes[1].style.display = "block";  
        this.childNodes[2].style.display = "none";     
    }
    else {
        this.parentNode.childNodes[1].style.maxHeight = this.parentNode.childNodes[1].scrollHeight + "px";
        this.style.borderBottom = "1px solid #BDB4B4";
        this.childNodes[1].style.display = "none";  
        this.childNodes[2].style.display = "block";  
    }
}

//Part 5 : Function for Filtering Item
let filterBrand = document.querySelectorAll('.filter-brand > ul > li > label > input');
let filterBodySize = document.querySelectorAll('.filter-body-size > ul > li > label > input');
let filterPrice = document.querySelectorAll('.filter-price > ul > li > label > input');
document.querySelector('.filter-button').addEventListener('click',filterButton)
function filterButton(){
    arrayExecuted = guitarAcousticData.slice(0);
    //Filter for Brand
    let brandFilterCondtion = [] ;
    for (let i = 0; i < filterBrand.length; i++){    
        if (filterBrand[i].checked) {
            brandFilterCondtion.push(filterBrand[i].dataset.brand)
        }
    }
    if (brandFilterCondtion.length != 0){
        arrayExecuted = arrayExecuted.filter(x => brandFilterCondtion.includes(x.brand));
    }
    //Filter for Body Size
    let bodySizeCondtion = [] ;
    for (let i = 0; i < filterBodySize.length; i++){    
        if (filterBodySize[i].checked) {
            bodySizeCondtion.push(filterBodySize[i].dataset.bodySize);
        }
    }
    console.log()
    if (bodySizeCondtion.length != 0){
        arrayExecuted = arrayExecuted.filter(x => bodySizeCondtion.includes(x.body));
    }
    //Filter for Price
    let priceCondtion = [];
    for (let i = 0; i < filterPrice.length; i++){    
        if (filterPrice[i].checked) {
            priceCondtion.push(
                {
                    min : filterPrice[i].dataset.priceMin,
                    max : filterPrice[i].dataset.priceMax
                }
            );
        }
    }
    console.log(priceCondtion)
    if (priceCondtion.length != 0){
        arrayExecuted = arrayExecuted.filter(function (x) {
            let priceItem = parseInt(x.price.replace(/\D/g,''))
            for (let i = 0; i < priceCondtion.length; i++){

                if (priceItem >= priceCondtion[i].min && priceItem < priceCondtion[i].max)
                return true
            }
            return false
        });
    }
    document.querySelector('.arrangement-executed').textContent = "Tên Từ A - Z";
    renderItem(arrayExecuted);
}

document.querySelector('.remove-item-button').addEventListener('click',removeFilter);
function removeFilter(){//remove filter condition 
    arrayExecuted = guitarAcousticData.slice(0);
    renderItem(arrayExecuted);
    let uncheckItems = document.querySelectorAll('input:checked')
    uncheckItems.forEach(x => x.checked = false)
}

//Part 6 : Function for Arrangement Option
let arrangementPart = document.querySelector('.arrangement-part');
window.onclick = function(){ // Click anywhere outside Arrangement Part to close it
    if (document.querySelector('.menu-arrangement').style.display == "block"){
        document.querySelector('.menu-arrangement').style.display = "none";
    }
}

document.querySelector('.arrangement-title').addEventListener('click',showArrangementOption,false);
function showArrangementOption(){
    event.stopPropagation();
    if (document.querySelector('.menu-arrangement').style.display != "block"){
        document.querySelector('.menu-arrangement').style.display = "block";
    }
    else document.querySelector('.menu-arrangement').style.display = "none";
}

document.querySelector('.option-1').addEventListener('click',function(){
    let elt = this;
    chooseArrangementOption(elt);
    sortByNameAToZ(arrayExecuted);
    pagination1();
} 
);
document.querySelector('.option-2').addEventListener('click',function(){
    let elt = this;
    chooseArrangementOption(elt);
    sortByPriceUp(arrayExecuted);
    pagination1();
} 
);
document.querySelector('.option-3').addEventListener('click',function(){
    let elt = this;
    chooseArrangementOption(elt);
    sortByPriceDown(arrayExecuted);
    pagination1();
} 
);

function chooseArrangementOption(elt){
    document.querySelector('.arrangement-executed').textContent = elt.textContent; 
}

//Part 7 : Function for Rendering Item
let arrayExecuted = guitarAcousticData.slice(0);
renderItem(arrayExecuted);
function renderItem(array){
    if (array.length != 0){
        let output = "";
        let outputPagination = `<div class="pagination-button prev-button "><img src="Blog/arrow_back_ios_24px_outlined.svg" alt=""></div>
                                <div class="pagination-button button-number button-1 active">1</div>`;
        //Add page for Pagination (Apply 9 item for 1 page) 
        let itemInOnePage = 9;
        numberOfPage = Math.ceil(array.length/itemInOnePage);
        for (let i = 0; i < array.length; i++){
            let index = Math.floor(i/itemInOnePage);
            output += 
                `<a class="item page-${index + 1}" href="productitem.html" data-id="${array[i].id}" data-group="${array[i].group}" onmousedown="sendData(this)" >
                    <div class="item-image">
                        <img class="front-image" src="${array[i].photo}/1.jpg" alt="${array[i].name}">
                        <img class="back-image" src="${array[i].photo}/2.jpg" alt="${array[i].name}">
                    </div>
                    <div class="item-name">${array[i].name}</div>
                    <div class="price-before-reduction"></div>
                    <div class="price-after-reduction">${array[i].price} Đồng</div>
                    <div class="line-item"></div>
                    <div class="detail-item">CHI TIẾT</div>
                </a>`
        }
        document.querySelector('.product-item').innerHTML = output;
        //Render Pagination
        for (let i = 1; i < numberOfPage; i++){
            outputPagination += `<div class="pagination-button button-number button-${i+1}">${i+1}</div>`;
        }
        outputPagination += `<div class="pagination-button next-button"><img src="Blog/arrow_forward_ios_24px_outlined.svg" alt=""></div>`;
        document.querySelector('.pagination').innerHTML = outputPagination;
        document.querySelector('.prev-button').addEventListener('click',prevButton);
        document.querySelector('.next-button').addEventListener('click',nextButton);
        let buttonNumber = document.querySelectorAll('.button-number');
        for (let i = 0; i < buttonNumber.length; i++){
        buttonNumber[i].addEventListener('click',numberButton);
        }
        for (let i = 2 ; i <= numberOfPage; i++){
            document.querySelectorAll(`.page-${i}`).forEach( item => item.style.display = "none")
        }
    }
    else {
        let output = `<div class="notification-empty">Không Có Sản Phẩm Phù Hợp</div>`;
        document.querySelector('.product-item').innerHTML = output;
        document.querySelector('.pagination').innerHTML = "";
    }
    setTimeout(function(){document.querySelectorAll('.item.page-1').forEach(x => x.classList.add('show'))},50);

}

//Part 8: Function for Sorting Item

function sortByPriceUp(array){
    renderItem(array.sort(function(a,b){
        return parseInt(a.price.replace(/\D/g,"")) - parseInt(b.price.replace(/\D/g,""));
    }));
}

function sortByPriceDown(array){
    renderItem(array.sort(function(a,b){
        return -(parseInt(a.price.replace(/\D/g,"")) - parseInt(b.price.replace(/\D/g,"")));
    }));
}

function sortByNameAToZ(array){
    renderItem(array.sort(function(a,b){
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        if (a.name = b.name) return 0;
    }));
}

//Part 9: Function for Pagination

const numberReturn = 400;
function prevButton(){
    document.body.scrollTop = numberReturn; 
    document.documentElement.scrollTop = numberReturn;
    let currentPage = document.querySelector('.active');
    currentPage.parentNode.childNodes.forEach(elm => elm.nodeType != 1 && elm.parentNode.removeChild(elm));//remove text node
    if (currentPage.textContent == 1) return
    else {
        currentPage.previousSibling.classList.add('active');
        currentPage.classList.remove('active');       
    }
    let pageGone = document.querySelectorAll(`.page-${currentPage.textContent}`);
    for (let i = 0; i < pageGone.length; i++){
        pageGone[i].style.display = "none";
        pageGone[i].classList.remove('show');
    }
    let pageArrived = document.querySelectorAll(`.page-${currentPage.previousSibling.textContent}`);
    for (let i = 0; i < pageArrived.length; i++){
        pageArrived[i].style.display = "block";
        setTimeout(function(){
            pageArrived[i].classList.add('show')
        },50)
    }
}

function nextButton(){
    document.body.scrollTop = numberReturn; 
    document.documentElement.scrollTop = numberReturn;
    let currentPage = document.querySelector('.active');
    currentPage.parentNode.childNodes.forEach(elm => elm.nodeType != 1 && elm.parentNode.removeChild(elm)); //remove text node
    if (currentPage.textContent == numberOfPage) return
    else {
        currentPage.nextSibling.classList.add('active');
        currentPage.classList.remove('active'); 
    }
    let pageGone = document.querySelectorAll(`.page-${currentPage.textContent}`);
    for (let i = 0; i < pageGone.length; i++){
        pageGone[i].style.display = "none";
        pageGone[i].classList.remove('show');
    }
    let pageArrived = document.querySelectorAll(`.page-${currentPage.nextSibling.textContent}`);
    for (let i = 0; i < pageArrived.length; i++){
        pageArrived[i].style.display = "block";
        setTimeout(function(){
            pageArrived[i].classList.add('show')
        },50)
    }
}

function numberButton(){
    document.body.scrollTop = numberReturn; 
    document.documentElement.scrollTop = numberReturn;
    let currentPage = document.querySelector('.active');
    currentPage.parentNode.childNodes.forEach(elm => elm.nodeType != 1 && elm.parentNode.removeChild(elm)); //remove text node
    if (currentPage.textContent == this.textContent) return
    else {
        this.classList.add('active');
        currentPage.classList.remove('active');
    }
    let pageGone = document.querySelectorAll(`.page-${currentPage.textContent}`);
    for (let i = 0; i < pageGone.length; i++){
        pageGone[i].style.display = "none";
        pageGone[i].classList.remove('show');
    }
    let pageArrived = document.querySelectorAll(`.page-${this.textContent}`);
    for (let i = 0; i < pageArrived.length; i++){
        pageArrived[i].style.display = "block";
        setTimeout(function(){
            pageArrived[i].classList.add('show')
        },50)
    }
}
//Part 10: Function for Subscription email and About This Website button - Footer

document.querySelector('.name-footer').addEventListener('input',function(){
    let elt = this;
    checkIsOnlyText(elt); 
})


document.querySelector('.subscription-button').addEventListener('click',sendSubscriptionEmail)
function sendSubscriptionEmail(){
    if (!checkEmpty('name-footer')) return;
    if (!checkEmpty('email-footer')) return;
    if (!checkEmailName('email-footer')) return;
    document.querySelector('.subscription-announcement').style.zIndex = 15;
    setTimeout(function(){
        document.querySelector('.subscription-announcement').style.visibility = "visible";
        document.querySelector('.subscription-announcement').style.opacity = 1;
    },100);
    setTimeout(function(){
        document.querySelector('.subscription-announcement').style.opacity = 0;
    },2000)
    setTimeout(function(){
        document.querySelector('.subscription-announcement').style.visibility = "hidden";
        document.querySelector('.subscription-announcement').style.zIndex = -1;
    },2100)
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

if (document.body.offsetHeight > window.innerHeight){
    var scrollBarWidth = window.innerWidth - document.body.clientWidth;
}
else scrollBarWidth = 0;
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
//Part 11 : Funtion for Scrolling Button
document.querySelector('.scrolling-button').addEventListener('click',scrollToTop);
function scrollToTop(){
    document.body.scrollTop = 0; 
    document.documentElement.scrollTop = 0;
}



