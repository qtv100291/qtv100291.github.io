//This section is written by using Jquery. 
//In this project, some pages are written by using pure Javascript and the others pages are written by using Jquery.
//I have done that just for practicing both Javascript and Jquery(a very popular library).

//Youtube API
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('video-review', {
  });
}

//Part 1 : Function for Rendering productitem.html
let itemData = {
    group: "",
    id: ""
};
itemData.id = window.location.href.split("#")[1].split("+")[0];
itemData.group = window.location.href.split("#")[1].split("+")[1];
renderProductItem(itemData);
function renderProductItem(objectData){
    let arrayExecuted =[];
    let bannerAddress;
    let outputDescription = "";
    let outputSpecification = "";
    switch (objectData.group){
        case "classical":
            $('.main-section-name').text('Guitar Cổ Điển');
            $('.main-section-name').attr('href','classicalguitar.html');
            arrayExecuted = guitarClassicalData;
            bannerAddress = `Product/Classical Guitar/banner - 2.jpg`
            break;
        case "acoustic":
            $('.main-section-name').text('Guitar Acoustic');
            $('.main-section-name').attr('href','acousticguitar.html');
            arrayExecuted = guitarAcousticData;
            bannerAddress = `Product/Acoustic Guitar/banner - 2.jpg`
            break;
        case "electrical":
            $('.main-section-name').text('Guitar Điện');
            $('.main-section-name').attr('href','electricguitar.html');
            arrayExecuted = guitarElectricalData;
            bannerAddress = `Product/Electrical Guitar/banner - 2.jpg`
            break;
        case "ukulele":
            $('.main-section-name').text('Ukulele');
            $('.main-section-name').attr('href','ukulele.html');
            arrayExecuted = guitarUkuleleData;
            bannerAddress = `Product/Ukulele/banner - 2.jpg`
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
    for (let i = 1; i < 6 ; i++){
        $(`.item-photo-${i}-indicator`).attr('src',`${objectProductItem.photo}/${i} - Indicator.jpg`)
    }
    $('title').text(objectProductItem.name);
    $('.banner > img').attr('src',bannerAddress);
    $('.item-detail').attr('data-group',objectProductItem.group);
    $('.item-detail').attr('data-id',objectProductItem.id);
    $('.item-name').text(objectProductItem.name);
    $('.item-price').text(objectProductItem.price);
    $('#video-review').attr('src',`${objectProductItem.video}?enablejsapi=1`);
    console.log(objectProductItem.content)
    for (let i = 0; i < objectProductItem['content'].length; i++){
        outputDescription +=`<p>${objectProductItem['content'][i]}</p>`;
    }
    $('.brief-presentation').html(outputDescription);
    for (let i = 0; i < objectProductItem['specification'].length; i++){
        outputSpecification +=`<p>- ${objectProductItem['specification'][i]}</p>`;
    }
    $('.specification-description').html(outputSpecification);
}

function getRandomValue(max,min){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Part 2 : Function for Scaling Photo
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

// Part 3: Function for Choosing Indicator 
$('.indicator-item').click(chooseIndicator);
function chooseIndicator(){
    let currentPhoto = $('.active-photo');
    currentPhoto.removeClass('active-photo');
    let currentIndicator = $('.active-indicator');
    currentIndicator.removeClass('active-indicator');
    $(this).addClass('active-indicator');
    let indicator = $(this).data('indicator');
    $(`.item-photo-${indicator}`).addClass('active-photo');
    photoZoom(`.item-photo-${indicator}`);
}

//Part 4: Function for Moving Indicator Slide
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

//Part 5: Function for Number Item
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

//Part 6: Function for Changing Tab Specification 
$('.item-description').height(function(){
    return $('.description-active').outerHeight(true);
})
$('.tab-item').click(changeTab)
function changeTab(){
    let currentTab = $('.tab-active');
    currentTab.removeClass('tab-active');
    let currentPage = $(`.description-active`);
    currentPage.removeClass('description-active');

    $(this).addClass('tab-active');
    let pageIndex = $(this).data('item');
    $(`.description-${pageIndex}`).addClass('description-active');
    //Change height of specfication
    $('.item-description').height(function(){
        return $('.description-active').outerHeight(true);
    })
    //Stopping video when changing tab. 
    if (!$('.description-2').hasClass('description-active')){
        player.pauseVideo();
    }
}

//Part 8: Function for Shopping Cart
function Item(group, id, name, price, count, image){ //Item Constructor
    this.group = group;
    this.id = id;
    this.name = name;
    this.price = price;
    this.count = count;
    this.image = image;
}

$('.submit-button').click(function(){
    if (localStorage.getItem('shoppingcartguitar') != null) loadCart()
    else shoppingCart=[];
    addToCart();
    popupAddToCart();
})
   
function addToCart(){
    let group = $('.item-detail').attr('data-group');
    let id = $('.item-detail').attr('data-id');
    let name = $('.item-name').text();
    let price = $('.item-price').text();
    let image = $('.item-photo-1-indicator').attr('src');
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




