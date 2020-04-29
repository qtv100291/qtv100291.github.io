//This section is written by using Jquery. 
//In this project, some pages are written by using pure Javascript and the others pages are written by using Jquery.
//I have done that just for practicing both Javascript and Jquery(a very popular library).

//Part 1 : Function for Scale Seat Map Photo
$('.seat-map').click(scalePhoto);
function scalePhoto(){    
    $('.modal-seat-map').css('display','block');
    $('body').css('height','100vh');
    $('body').addClass('start');
    $('body').css('padding-right',`${scrollBarWidth}px`);
    $('.scrolling-button').css('display','none');
    $('.order-ticket-part').css('display','none');
    $('.header-desktop').css('padding-right',`${scrollBarWidth}px`);
}
$('.close-icon').click(closeModal);
function closeModal(){
    $('.modal-seat-map').css('display','none');
    $('body').css('height','auto');
    $('body').removeClass('start');
    $('body').css('padding-right',`0px`);
    $('.scrolling-button').css('display','block');
    $('.order-ticket-part').css('display','block');
    $('.header-desktop').css('paddingRight','0px');
}


//Part 2: Function for Ticket Option
let ticketPrice1 = ['999.000','1.199.000','1.599.000']
let ticketPrice2 = ['800.000','1.500.000','2.200.000','2.500.000']
let ticketPrice3 =['500.000']
let ticketPrice4 =['300.000','400.000','500.000','1.000.000']
$('select.item1').change(selectTicket1); //Choose Ticket Class Show 1
function selectTicket1(){
    let indexPrice = $('.item1 > option').index($('.item1 > option').filter(':selected'));
    $('.price-value.value-1').text(ticketPrice1[indexPrice]);    
    $('#ticket-quantity').val(1);
}

$('select.item2').change(selectTicket2); //Choose Ticket Class Show 2
function selectTicket2(){
    let indexPrice = $('.item2 > option').index($('.item2 > option').filter(':selected'));
    $('.price-value.value-2').text(ticketPrice2[indexPrice]);    
    $('#ticket-quantity').val(1);
}

$('select.item3').change(selectTicket3); //Choose Ticket Class Show 3
function selectTicket3(){
    let indexPrice = $('.item3 > option').index($('.item3 > option').filter(':selected'));
    $('.price-value.value-3').text(ticketPrice3[indexPrice]);    
    $('#ticket-quantity').val(1);
}

$('select.item4').change(selectTicket4); //Choose Ticket Class Show 4
function selectTicket4(){
    let indexPrice = $('.item4 > option').index($('.item4 > option').filter(':selected'));
    $('.price-value.value-4').text(ticketPrice4[indexPrice]);    
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

$('.minus-item').click(function(){
    elt = $(this);
    minusItem(elt);
});
function minusItem(elt){// Minus Number Ticket
    if (elt.next().val() > 1){
        let currentValue = elt.next().val();
        currentValue -= 1;
        elt.next().val(currentValue); 
    }
    else return; 
}

$('.plus-item').click(function(){
    elt = $(this);
    plusItem(elt);
});
function plusItem(elt){
    let currentValue = parseInt(elt.prev().val());
    currentValue += 1;
    elt.prev().val(currentValue); 
}

//Part 3: Function for Shopping Cart
$('.add-to-cart-button').click(function(){
    if (localStorage.getItem('shoppingcartguitar') != null) loadCart()
    else shoppingCart=[];
    addToCart();
    popupAddToCart();
})
  
function addToCart(){
    let group = $('.order-ticket-part').attr('data-group');
    let id = $('.order-ticket-part').attr('data-id');
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
