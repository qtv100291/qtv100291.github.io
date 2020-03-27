//This section is written by using Jquery. 
//In this project, some pages are written by using pure Javascript and the others pages are written by using Jquery.
//I have done that just for practicing both Javascript and Jquery(a very popular library).

//Part 1 : Function for Sticky Menu bar and Animation
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
                output += `<a onclick="sendData(this)" href="productitem.html" class="search-bar-item" data-id="${array[i]['id']}" data-group="${array[i]['group']}">${arrayName}</a>`
            }
        }        
    }
    function searchNameAccessories(array){
        for (let i = 0; i < array.length; i++){
            if (array[i]['name'].toLowerCase().includes(input)){
                let indexArray = array[i]['name'].toLowerCase().indexOf(input);
                let textColored = array[i]['name'].slice(indexArray,indexArray + input.length);
                let arrayName = array[i]['name'].slice(0,indexArray)  + `<span class="text-mark-search">${textColored}</span>` + array[i]['name'].slice(indexArray + input.length)
                output += `<a onclick="sendDataAccesories(this)" href="accessories.html" class="search-bar-item" data-id="${array[i]['id']}" data-group="${array[i]['group']}">${arrayName}</a>`
            }
        }   
    }
    function searchNameGuitarShow(array){
        for (let i = 0; i < array.length; i++){
            if (array[i]['name'].toLowerCase().includes(input)){
                let indexArray = array[i]['name'].toLowerCase().indexOf(input);
                let textColored = array[i]['name'].slice(indexArray,indexArray + input.length);
                let arrayName = array[i]['name'].slice(0,indexArray)  + `<span class="text-mark-search">${textColored}</span>` + array[i]['name'].slice(indexArray + input.length)
                output += `<a href="guitarshow${i+1}.html" class="search-bar-item" data-id="${array[i]['id']}" data-group="${array[i]['group']}">${arrayName}</a>`
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

//Part 2 : Function for Scale Seat Map Photo
$('.seat-map').click(scalePhoto);
function scalePhoto(){    
    $('.modal-seat-map').css('display','block');
    $('body').css('height','100vh');
    $('body').css('overflow','hidden');
    $('.scrolling-button').css('display','none');
    $('.order-ticket-part').css('display','none');
}
$('.close-icon').click(closeModal);
function closeModal(){
    $('.modal-seat-map').css('display','none');
    $('body').css('height','auto');
    $('body').css('overflow','auto');
    $('.scrolling-button').css('display','block');
    $('.order-ticket-part').css('display','block');
}


//Part 3: Function for Ticket Option
let ticketPrice1 = ['999.000','1.199.000','1.599.000']
let ticketPrice2 = ['800.000','1.500.000','2.200.000','2.500.000']
let ticketPrice3 =['500.000']
let ticketPrice4 =['300.000','400.000','500.000','1.000.000']
$('select.item1').change(selectTicket); //Choose Ticket Class Show 1
function selectTicket(){
    let indexPrice = $('.item1 > option').index($('.item1 > option').filter(':selected'));
    $('.price-value').text(ticketPrice1[indexPrice]);    
    $('#ticket-quantity').val(1);
}

$('select.item2').change(selectTicket); //Choose Ticket Class Show 2
function selectTicket(){
    let indexPrice = $('.item2 > option').index($('.item2 > option').filter(':selected'));
    $('.price-value').text(ticketPrice2[indexPrice]);    
    $('#ticket-quantity').val(1);
}

$('select.item3').change(selectTicket); //Choose Ticket Class Show 3
function selectTicket(){
    let indexPrice = $('.item3 > option').index($('.item3 > option').filter(':selected'));
    $('.price-value').text(ticketPrice3[indexPrice]);    
    $('#ticket-quantity').val(1);
}

$('select.item4').change(selectTicket); //Choose Ticket Class Show 4
function selectTicket(){
    let indexPrice = $('.item4 > option').index($('.item4 > option').filter(':selected'));
    $('.price-value').text(ticketPrice4[indexPrice]);    
    $('#ticket-quantity').val(1);
}

$('#ticket-quantity').on('input',function(){
    elt = $(this);
    checkIsOnlyNumber(elt);
}); 
$('#ticket-quantity').on('change',function(){
    if ($(this).val().length == 0) $(this).val(1);
}); 

function checkIsOnlyNumber(elt){
    let str = elt.val();
    let check = /\d$/.test(str);
    if (check) return true
    else{
        str = str.substring(0,str.length - 1);
        elt.val(str);
    }
}

$('.minus-item').click(minusItem);// Minus Number Ticket
function minusItem(){
    if ($('#ticket-quantity').val() > 1){
        let currentValue = $('#ticket-quantity').val();
        currentValue -= 1;
        $('#ticket-quantity').val(currentValue); 
    }
    else return; 
}

$('.plus-item').click(plusItem);// Plus Number Ticket
function plusItem(){
    let currentValue = parseInt($('#ticket-quantity').val());
    currentValue += 1;
    $('#ticket-quantity').val(currentValue); 
}

//Part : Function for Shopping Cart
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
$('.add-to-cart-button').click(function(){
    addToCart();
    popupAddToCart();
})
   
function addToCart(){
    let group = $('.order-ticket-part').data('group');
    let id = $('.order-ticket-part').data('id');
    let name = $('.title-ticket-part').text() + " - Vé " + $('#ticket-option').val();
    let price = $('.price-value').text();
    let image = $('.order-ticket-part').data('photo');
    let count = parseInt($('#ticket-quantity').val());
    for (let i = 0; i < shoppingCart.length; i++){
        if (shoppingCart[i].id == id && shoppingCart[i].name == name){
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
    $('.popup-messenger').addClass('add-to-cart');
    setTimeout(function(){
        $('.popup-messenger').removeClass('add-to-cart');
    },1000)
}

//Part 4: Funtion for Scrolling Button
$('.scrolling-button').click(scrollToTop);
function scrollToTop(){
    $(window).scrollTop(0); 
}