//This section is written by using Jquery. 
//In this project, some pages are written by using pure Javascript and the others pages are written by using Jquery.
//I have done that just for practicing both Javascript and Jquery(a very popular library).

// Part 1 : Function for determinating scroll bar width
let scrollBarWidth;
if ($('body').innerHeight() > $(window).height()){
    scrollBarWidth = $(window).outerWidth() - $('body').innerWidth();
}
else scrollBarWidth = 0;
if ($(window).outerWidth() < 351) {
    $('.input-search-bar').attr("placeholder", "Tìm Kiếm...");
}
// Part 2 : Function for Sticky Menu bar and Animation
$(window).scroll(function(){
        if ($(window).scrollTop() > 62 ) {
            $('.header-desktop, .search-bar, .input-search-bar, .line-1, .avatar, .avatar-sub, .container, .suggestion-item, .x-mark-search-bar').addClass('scroll');
            $('.scrolling-button').css('display','block');
        }
        else {
            $('.header-desktop, .search-bar, .input-search-bar, .line-1, .avatar, .avatar-sub, .container, .suggestion-item, .x-mark-search-bar').removeClass('scroll');
            $('.scrolling-button').css('display','none');
        }
});

// Part 3 : Function for Opening mobile menu
$('.menu-icon-mobile').on('click',openMenuMobile);
function openMenuMobile(){
    $('.menu-mobile').addClass('active-mobile');
    $('body').addClass('start');
    $('body').css('padding-right', `${scrollBarWidth}px`);
    $('.top-navbar-mobile').css('padding-right', `${scrollBarWidth}px`);
    $('.menu-icon-mobile').css('margin-left',`${10 + scrollBarWidth}px`);
}
$('.menu-mobile').on('click',closeMenuMobile)
function closeMenuMobile(){
    $('.menu-mobile').removeClass('active-mobile');
    $('body').removeClass('start');
    $('body').css('padding-right', `0px`);
    $('.top-navbar-mobile').css('padding-right',`0px`);
    $('.menu-icon-mobile').css('margin-left',`10px`);
}

// Part 4: Function for Search Bar
$('.input-search-bar').on('focus',function(){
    $('.suggestion-item').addClass('being-focus');
})
$('.input-search-bar').on('blur',function(){
    setTimeout (function (){$('.suggestion-item').removeClass('being-focus')},150);
})
$('.input-search-bar').on('input',searchItem)
function searchItem(){
    let input = $('.input-search-bar:focus').val().toLowerCase();
    let output="";
    if (input.length == 0) {
        $('.suggestion-guitar').html(output);
        $('.x-mark-search-bar').css('display','none')
        return;
    }
    else $('.x-mark-search-bar').css('display','block')
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
                output += `<a onclick="deleteContent();reloadPage()" href="productitem.html#${array[i].id}+${array[i].group}" class="search-bar-item" data-id="${array[i]['id']}" data-group="${array[i]['group']}">${arrayName}</a>`
            }
        }       
    }
    function searchNameAccessories(array){
        for (let i = 0; i < array.length; i++){
            if (array[i]['name'].toLowerCase().includes(input)){
                let indexArray = array[i]['name'].toLowerCase().indexOf(input);
                let textColored = array[i]['name'].slice(indexArray,indexArray + input.length);
                let arrayName = array[i]['name'].slice(0,indexArray)  + `<span class="text-mark-search">${textColored}</span>` + array[i]['name'].slice(indexArray + input.length)
                output += `<a onclick="deleteContent()" href="accessoriesitem.html#${array[i].id}+${array[i].group}" class="search-bar-item" data-id="${array[i]['id']}" data-group="${array[i]['group']}">${arrayName}</a>`
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
    $('.suggestion-guitar').html(output);
}

function sendData(elt){
    let itemData = new Object;
    itemData.group = $(elt).data('group');
    itemData.id = $(elt).data('id');
    localStorage.setItem('dataguitaritem',JSON.stringify(itemData));
}

function sendDataAccesories(elt){
    let itemData = new Object;
    itemData.group = $(elt).data('group');
    itemData.id = $(elt).data('id');
    localStorage.setItem('dataaccessoryitem',JSON.stringify(itemData));
}

$('.x-mark-search-bar').on('click',deleteContent)

function deleteContent(){
    $('.input-search-bar').val('');
    $('.x-mark-search-bar').css('display','none');
    $('.suggestion-guitar').html("");
}

function reloadPage(){
    setTimeout(function(){
        location.reload();
    },50)
}
// Part 5 : Function for Displaying shopping cart
let shoppingCart=[];
if (localStorage.getItem('shoppingcartguitar') != null){
    loadCart();
    displayCartSub()
    countItem()
}
else displayCartSub();
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
    $('.total-count-item').text(itemCount);
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
                                <div class="name-item-shopping" title="${shoppingCart[i].name}">${shoppingCart[i].name}</div>
                                <div class="price-item"><span class="count-item-shopping">${shoppingCart[i].count}</span>&nbsp;&nbsp;x&nbsp;&nbsp;<span class="price-item-shopping">${shoppingCart[i].price}</span> VND</div>
                            </div>
                         </div>`
    }
    let totalMoneyConvert = separator1000(totalMoney);
    outputTotalMoney +=   `<div class="total-money">Tổng : &nbsp;<span class="total-money-number">${totalMoneyConvert}</span>&nbsp;&nbsp;VND</div>
                <a class="button-access-shopping-cart" href="shoppingcart.html">Thanh Toán</a>`
    }
    $('.sub-shopping-cart-container-item').html(output);
    $('.sub-shopping-cart-total').html(outputTotalMoney)
}

function separator1000(num){ // 1000 separator 
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

//Part 6: Function for Subscription email and About This Website button - Footer

$('.name-footer').on('input',function(){
    let elt = $(this);
    checkIsOnlyText(elt); 
})

$('.subscription-button').on('click',sendSubscriptionEmail)
function sendSubscriptionEmail(){
    if (!checkEmptyFooter('name-footer')) return;
    if (!checkEmptyFooter('email-footer')) return;
    if (!checkEmailNameFooter('email-footer')) return;
    $('.subscription-announcement-container').css('display','block');
    $('body').addClass('start');
    $('body').css('padding-right',`${scrollBarWidth}px`);
    $('.header-desktop').css('padding-right',`${scrollBarWidth}px`);
    setTimeout(function(){
        $('.subscription-announcement-container').css('visibility','visible');
        $('.subscription-announcement-container').css('opacity','1');
    },100);
    setTimeout(function(){
        $('.subscription-announcement-container').css('opacity','0') ;
    },2000)
    setTimeout(function(){
        $('body').removeClass('start');
        $('body').css('padding-right',`0px`);
        $('.header-desktop').css('padding-right',`0px`);
        $('.subscription-announcement-container').css('display','none');
    },2500)
    $('.name-footer').val();
    $('.email-footer').val();
}

function checkIsOnlyText(elt){
    let str = elt.val();
    let check = /\d/.test(str);
    if (!check) return
    else{
        str = str.replace(/\d/g,"");
        elt.val(str);
    }
}

function checkEmptyFooter(id){ // check whether a input field is empty
    let inputCheck = $(`.${id}`).val();
    if (inputCheck.length == 0){
        $(`.${id}`).next().css('z-index','3');
        setTimeout(function(){
            $(`.${id}`).next().css('opacity','1');
        },100)
        setTimeout(function(){
            $(`.${id}`).next().css('opacity','0');
        },2500)
        setTimeout(function(){
            $(`.${id}`).next().css('z-index','-1');
        },2600)
        return false
    }
    else return true
}

function checkEmailNameFooter(id){ // check email name form
    let inputCheck = $(`.${id}`).val();
    if (!inputCheck.includes('@') || !inputCheck.includes('.')){
        $(`.${id}`).next().next().css('z-index','3');
        setTimeout(function(){
            $(`.${id}`).next().next().css('opacity','1');
        },100)
        setTimeout(function(){
            $(`.${id}`).next().next().css('opacity','0');
        },2500)
        setTimeout(function(){
            $(`.${id}`).next().next().css('z-index','-1');
        },2600)   
        return false
    }
    let indexAtSign = inputCheck.indexOf('@');
    let check = inputCheck.slice(indexAtSign).match(/\./g).length;
    let indexPoint = inputCheck.slice(indexAtSign).indexOf('.');
    if (indexPoint < 2 || check > 1){
        $(`.${id}`).next().next().css('z-index','3');
        setTimeout(function(){
            $(`.${id}`).next().next().css('opacity','1');
        },100)
        setTimeout(function(){
            $(`.${id}`).next().next().css('opacity','0');
        },2500)
        setTimeout(function(){
            $(`.${id}`).next().next().css('z-index','-1');
        },2600)   
        return false
    }
    return true
}

$('.about-website-button').on('click',openAboutWebsite);
function openAboutWebsite(){
    $('.about-website-container').css('display','block') ;
    setTimeout(function(){
        $('.about-website-container').css('opacity','1');
    },100)
    $('body').addClass('start');
    $('body').css('padding-right',`${scrollBarWidth}px`);
    if ($(window).scrollTop() > 62 ){
        $('.header-desktop').css('padding-right',`${scrollBarWidth}px`);
    }
}
$('.close-about-website').on('click',closeAboutWebsite);
function closeAboutWebsite(){
    $('.about-website-container').css('opacity','0');
    setTimeout(function(){
        $('.about-website-container').css('display','none');
        $('body').removeClass('start');
        $('body').css('paddingRight','0px');
        if ($(window).scrollTop() > 62 ){
            $('.header-desktop').css('padding-right',`0px`);
        }
    },600)
}

// Part 7: Funtion for Scrolling Button
$('.scrolling-button').click(scrollToTop);
function scrollToTop(){
    $(window).scrollTop(0); 
}


