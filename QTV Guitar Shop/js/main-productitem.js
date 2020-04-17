//This section is written by using Jquery. 
//In this project, some pages are written by using pure Javascript and the others pages are written by using Jquery.
//I have done that just for practicing both Javascript and Jquery(a very popular library).

//Part 1 : Function for Sticky Menu bar and Animation
let scrollBarWidth;
if ($('body').innerHeight() > $(window).height()){
    scrollBarWidth = $(window).outerWidth() - $('body').innerWidth();
}
else scrollBarWidth = 0;
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

//Part 2 : Function for Rendering productitem.html
let itemData = new Object;
itemData = JSON.parse(localStorage.getItem('dataguitaritem'));
renderProductItem(itemData);
function renderProductItem(objectData){
    let arrayExecuted =[];
    switch (objectData.group){
        case "classical":
            $('.main-section-name').text('Guitar Cổ Điển');
            $('.main-section-name').attr('href','classicalguitar.html');
            arrayExecuted = guitarClassicalData;
            break;
        case "acoustic":
            $('.main-section-name').text('Guitar Acoustic');
            $('.main-section-name').attr('href','acousticguitar.html');
            arrayExecuted = guitarAcousticData;
            break;
        case "electrical":
            $('.main-section-name').text('Guitar Điện');
            $('.main-section-name').attr('href','electricguitar.html');
            arrayExecuted = guitarElectricalData;
            break;
        case "ukulele":
            $('.main-section-name').text('Ukulele');
            $('.main-section-name').attr('href','ukulele.html');
            arrayExecuted = guitarUkuleleData;
            break;
    }
    let objectProductItem;
    for (let i = 0; i < arrayExecuted.length; i++){
        if (arrayExecuted[i].id === itemData.id){
            objectProductItem = Object.assign({},arrayExecuted[i]);
            break;
        }
    }
    $('.product-item-name').text(objectProductItem.name);
    for (let i = 1; i < 6 ; i++){
        $(`.item-photo-${i}`).attr('src',`${objectProductItem.photo}/${i}.jpg`)
    }
    $('.item-detail').data('group',objectProductItem.group);
    $('.item-detail').data('id',objectProductItem.id);
    $('.item-name').text(objectProductItem.name);
    $('.item-price').text(objectProductItem.price);
}


// Part 3: Function for Search Bar
$('.input-search-bar').focus(function(){
    $('.suggestion-item').addClass('being-focus');
})
$('.input-search-bar').blur(function(){
    setTimeout (function (){$('.suggestion-item').removeClass('being-focus')},150);
})
$('.input-search-bar').on('input',searchItem)
function searchItem(){
    let input = $('.input-search-bar').val().toLowerCase();
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
}

//Part 3 : Function for Scaling Display Photo
photoZoom('.item-photo-1');
function photoZoom(photo){
    let img = $(photo);
    let scaleUpImg = $('.scale-up-image');
    let zoomLens = $('.item-zoom-lens');
    const ratioX = scaleUpImg.width() / zoomLens.width();
    const ratioY = scaleUpImg.height() / zoomLens.height();
    $('.zoom-image-frame').width(function(){
        return ratioX*($('.item-picture').width())
    })
    $('.zoom-image-frame').height(function(){
        return ratioY*($('.item-picture').height())
    })
    $('.zoom-image').attr('src',function(){
        return img.attr('src');
    })
    $('.zoom-image').height(function(){
        return ratioY*(img.height())
    })
    $('.item-picture').mousemove(moveLens);
    function moveLens(e){
        let pos, x, y;
        pos = getCursorPos(e);
        x = pos.x - (zoomLens.width() / 2);
        y = pos.y - (zoomLens.width() / 2);
        if (x > $('.item-picture').width() - zoomLens.width()) {x = $('.item-picture').width() - zoomLens.width();}
        if (x < 0) {x = 0}
        if (y > $('.item-picture').height() - zoomLens.height()) {y = $('.item-picture').height() - zoomLens.height();}
        if (y < 0) {y = 0}
        zoomLens.css('left', `${x}px`);
        zoomLens.css('top', `${y}px`);
        $('.zoom-image-frame').css('left',`-${x * ratioX}px`)
        $('.zoom-image-frame').css('top',`-${y * ratioY}px`)
    }
    function getCursorPos(e) {
        let a, x = 0, y = 0;
        a = $('.item-picture').offset();
        x = e.pageX - a.left;
        y = e.pageY - a.top;
        return {x , y};
      }
}
// Part 4: Function for Choosing Indicator 
$('.indicator-item').click(chooseIndicator);
function chooseIndicator(){
    let currentPhoto = $('.active-photo');
    currentPhoto.removeClass('active-photo');
    let currentIndicator = $('.active-indicator');
    currentIndicator.removeClass('active-indicator');
    $(this).addClass('active-indicator');;
    let indicator = $(this).data('indicator');
    $(`.item-photo-${indicator}`).addClass('active-photo');
    photoZoom(`.item-photo-${indicator}`);
}

//Part 5: Function for Moving Indicator Slide
$('.arrow-left').click(moveLeft);
$('.arrow-right').click(moveRight);
let slideItemWidth = $('.indicator-item').outerWidth(true);

function moveLeft(){
    $('.slider-container-inner > div:last-child').prependTo('.slider-container-inner');
    $('.slider-container-inner').css('left',`calc(50% - ${slideItemWidth}px)`);
    $('.slider-container-inner').animate({left:'50%'},400); 
}

function moveRight(){
    $('.slider-container-inner > div:first-child').appendTo('.slider-container-inner');
    $('.slider-container-inner').css('left',`calc(50% + ${slideItemWidth}px)`);
    $('.slider-container-inner').animate({left:'50%'},400); 
}

//Part 6: Function for Number Item

$('#item-quantity').on('input',function(){
    elt = $(this);
    checkIsOnlyNumber(elt);
}); 
$('#item-quantity').on('change',function(){
    if ($(this).val().length == 0) $(this).val(1);
    if ($(this).val() == 0) $(this).val(1);
}); 

function checkIsOnlyNumber(elt){
    if ($(elt).val().charAt(0) == 0) {
        let strTest = $(elt).val().slice(1);
        $(elt).val(strTest);
    }
    let str = elt.val();
    let check = /\D/.test(str);
    if (!check) return 
    else{
        str = str.replace(/\D/g,"");
        elt.val(str);
    }
}

$('.minus-item').click(minusItem);// Minus Number item
function minusItem(){
    if ($('#item-quantity').val() > 1){
        let currentValue = $('#item-quantity').val();
        currentValue -= 1;
        $('#item-quantity').val(`${currentValue}`); 
    }
    else return; 
}

$('.plus-item').click(plusItem);// Plus Number item
function plusItem(){
    let currentValue = parseInt($('#item-quantity').val());
    currentValue += 1;
    $('#item-quantity').val(`${currentValue}`); 
}
//Part 7: Function for Changing Tab Specification 
$('.item-description').height(function(){
    return $('.description-active').outerHeight(true)
})
$('.tab-item').click(changeTab)
function changeTab(){
    let currentTab = $('.tab-active');
    currentTab.removeClass('tab-active')
    let currentPage = $(`.description-active`);
    currentPage.removeClass('description-active');

    $(this).addClass('tab-active')
    let pageIndex = $(this).data('item')
    $(`.description-${pageIndex}`).addClass('description-active')
    //Change height of specfication
    $('.item-description').height(function(){
        return $('.description-active').outerHeight(true)
    })
    // //Stopping video when changing tab. I have used Youtube Player API . This API help me stop video YouTube. Can see in more detail at: https://developers.google.com/youtube/iframe_api_reference
    // if ($('.description-2').css('opacity') == 0){
    //     document.getElementById('player').pauseVideo();
    // }
    
} 

//Part 8: Function for Shopping Cart

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
$('.submit-button').click(function(){
    if (localStorage.getItem('shoppingcartguitar') != null) loadCart()
    else shoppingCart=[];
    addToCart();
    popupAddToCart();
})
   
function addToCart(){
    let group = $('.item-detail').data('group');
    let id = $('.item-detail').data('id');
    let name = $('.item-name').text();
    let price = $('.item-price').text();
    let image = $('.item-photo-1').attr('src');
    let count = parseInt($('#item-quantity').val());
    for (let i = 0; i < shoppingCart.length; i++){
        if (shoppingCart[i].id == id){
            shoppingCart[i].count += count;
            saveCart();
            displayCartSub()
            countItem()
            return;
        }
    }
    let item = new Item(group, id, name, price, count, image)
    shoppingCart.push(item);
    saveCart()
    displayCartSub()
    countItem()
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
    $('.sub-shopping-cart-container').html(output);
}

function separator1000(num){ // 1000 separator 
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function popupAddToCart(){
    $('.popup-container').css('display','block')
    $('body').addClass('start')
    $('body').css('padding-right',`${scrollBarWidth}px`);
    if ($(window).scrollTop() > 62 ){
        $('.header-desktop').css('padding-right',`${scrollBarWidth}px`);
    }
    setTimeout(function(){
        $('.popup-container').addClass('add-to-cart');
        $('.circle-left-rotate, .circle-right-rotate, .check-mark-line-1 span, .check-mark-line-2 span ').addClass('show');
    },50)   
    setTimeout(function(){
        $('.popup-container').removeClass('add-to-cart');
        $('body').removeClass('start');
        $('body').css('padding-right',`0px`);
        if ($(window).scrollTop() > 62 ){
            $('.header-desktop').css('padding-right',`0px`);
        }
    },1500)
    setTimeout(function(){
        $('.circle-left-rotate, .circle-right-rotate, .check-mark-line-1 span, .check-mark-line-2 span ').removeClass('show');
        $('.popup-container').css('display','none')
    },1600)
}

//Part : Function for Subscription email and About This Website button - Footer

$('.name-footer').on('input',function(){
    let elt = $(this);
    checkIsOnlyText(elt); 
})


$('.subscription-button').on('click',sendSubscriptionEmail)
function sendSubscriptionEmail(){
    if (!checkEmptyFooter('name-footer')) return;
    if (!checkEmptyFooter('email-footer')) return;
    if (!checkEmailNameFooter('email-footer')) return;
    $('.subscription-announcement').css('visibility','visible');
    $('.subscription-announcement').css('z-index','15');
    setTimeout(function(){
        $('.subscription-announcement').css('opacity','1');
    },100);
    setTimeout(function(){
        $('.subscription-announcement').css('opacity','0') ;
    },2000)
    setTimeout(function(){
        $('.subscription-announcement').css('visibility','hidden');
        $('.subscription-announcement').css('z-index','-1');
    },2100)
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

//Part 9: Funtion for Scrolling Button
$('.scrolling-button').click(scrollToTop);
function scrollToTop(){
    $(window).scrollTop(0); 
}


