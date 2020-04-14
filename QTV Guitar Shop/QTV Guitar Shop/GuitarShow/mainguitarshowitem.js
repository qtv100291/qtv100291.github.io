//This section is written by using Jquery. 
//In this project, some pages are written by using pure Javascript and the others pages are written by using Jquery.
//I have done that just for practicing both Javascript and Jquery(a very popular framework).

//Part 1 : Function for Sticky Menu bar and Animation
$(window).scroll(function(){
        if ($(window).scrollTop() > 62 ) {
            $('.header-desktop, .search-bar, .input-search-bar, .line-1, .avatar, .avatar-sub, .container').addClass('scroll');
            $('.scrolling-button').css('display','block');
        }
        else {
            $('.header-desktop, .search-bar, .input-search-bar, .line-1, .avatar, .avatar-sub, .container').removeClass('scroll');
            $('.scrolling-button').css('display','none');
        }
});

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
$('select.item1').change(selectTicket); //Choose Ticket Class
function selectTicket(){
    let indexPrice = $('.item1 > option').index($('.item1 > option').filter(':selected'));
    console.log(indexPrice);
    $('.price-value').text(ticketPrice1[indexPrice]);    
    $('#ticket-quantity').val(1);
}

$('#ticket-quantity').on('input',function(){// Make Number Ticket is allway greater than 0 
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



//Part 4: Funtion for Scrolling Button
$('.scrolling-button').click(scrollToTop);
function scrollToTop(){
    $(window).scrollTop(0); 
}