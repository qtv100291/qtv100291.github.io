//This section is written by using Javascript. 
//In this project, some pages are written by using pure Javascript and the others pages are written by using Jquery.
//I have done that just for practicing both Javascript and Jquery(a very popular library).

//Part 1 : Function for Province - District - Commune Option
$('#input-user-city-province').change(selectProvince); //Choose City/Provin and render District
function selectProvince(){
    let outputDistrict = "<option value='0'>&nbspChọn Quận/Huyện...</option>";
    let outputCommune = "<option value='0'>&nbspChọn Phường/Xã...</option>";
    let idProvince = $('#input-user-city-province > option').filter(':selected').val();
    for (let i = 0; i < listDistrict.length; i ++){
        if (listDistrict[i].idProvince == idProvince){
            outputDistrict += `<option value='${listDistrict[i].idDistrict}'>&nbsp${listDistrict[i].name}</option>`;
        }
    }
    $('#input-user-commune').html(outputCommune);
    $('#input-user-district').html(outputDistrict);
}

$('#input-user-district').change(selectDistrict);//Choose District and render Commune
function selectDistrict(){
    let outputCommune = "<option value='0'>&nbspChọn Phường/Xã...</option>";
    let idDistrict = $('#input-user-district > option').filter(':selected').val();
    for (let i = 0; i < listCommune.length; i ++){
        if (listCommune[i].idDistrict == idDistrict){
            outputCommune += `<option>&nbsp${listCommune[i].name}</option>`;
        }
    }
    $('#input-user-commune').html(outputCommune);
}
//Part 2 : Function for Lmit Number of Character in Input Field
let limitNumberArray = [10, 12 , 3 ,7];
$('#card-id').on('input',function(){
    elt = $(this);
    checkIsOnlyNumber(elt);
    limitCharacter(elt,limitNumberArray[1])
});
$('#card-password').on('input',function(){
    elt = $(this);
    checkIsOnlyNumber(elt)
    limitCharacter(elt,limitNumberArray[2])
});
$('#input-user-phone').on('input',function(){
    elt = $(this);
    checkIsOnlyNumber(elt);
    limitCharacter(elt,limitNumberArray[0]);
});
$('#card-expiry-month').on('input',function(){
    elt = $(this);
    checkIsOnlyNumberForMonth(elt);
    limitCharacter(elt,2);
});
$('#card-expiry-year').on('input',function(){
    elt = $(this);
    checkIsOnlyNumber(elt);
    limitCharacter(elt,4);
});
$('#input-user-name').on('input',function(){
    elt = $(this);
    checkIsOnlyText(elt);
})
$('#card-owner').on('input',function(){
    elt = $(this);
    checkIsOnlyText(elt);
})
function checkIsOnlyText(elt){
    let str = elt.val();
    let check = /\d/.test(str);
    if (!check) return
    else{
        str = str.replace(/\d/g,"");
        elt.val(str);
    }
}

function checkIsOnlyNumber(elt){
    let str = elt.val();
    let check = /\D/.test(str);
    if (!check) return 
    else{
        str = str.replace(/\D/g,"");
        elt.val(str);
    }
}

function checkIsOnlyNumberForMonth(elt){
    let str = elt.val();
    let check = /\D/.test(str);
    if (!check) return 
    else{
        str = str.replace(/\D/g,"");
        elt.val(str);
    }
}

function limitCharacter(elt,limitNumber){
    if (elt.val().length <= limitNumber) {
    }
    else {
        let str = elt.val();
        str = str.substring(0,str.length - 1);
        elt.val(str);
    }
}

//Part : Function for Rendering Item
let shoppingCart=[];
let discount = 0;
if (localStorage.getItem('shoppingcartguitar') != null){
    loadCart();
    displayShoppingCart();
}
else displayShoppingCart()
if (shoppingCart.length ==0) window.location.href = "index.html";
function saveCart(){//Save Cart
    localStorage.setItem('shoppingcartguitar',JSON.stringify(shoppingCart))
}


function loadCart(){//Load Cart
    shoppingCart = JSON.parse(localStorage.getItem('shoppingcartguitar'));
}

function displayShoppingCart(){ //Display Shopping Cart
    let output= "";
    let totalMoney = 0;
    if (shoppingCart.length == 0){
        output = '<div class="shopping-cart-note">Chưa Có Sản Phẩm</div>';
    }
    else{
        for (let i = 0; i < shoppingCart.length; i++){
            let provisionalMoney = shoppingCart[i].price.replace(/\D/g,'') * shoppingCart[i].count;
            let realMoney = provisionalMoney - provisionalMoney*discount;
            let provisionalMoneyConvert = separator1000(provisionalMoney);
            let realMoneyConvert = separator1000(realMoney);
            totalMoney += realMoney;
            output +=   `<div class="shopping-cart-item">
                            <div class="item-detail"><span class="number-item">${shoppingCart[i].count}</span> x <span class="item-name">${shoppingCart[i].name}</span></div>
                            <div class="item-money-value">= <span class="money-value">${realMoneyConvert}</span> VND</div>
                        </div>`
    }
    let totalMoneyConvert = separator1000(totalMoney);
    output +=   `<div class="total-money">
                    <div class="total-money-title">
                        <div>Thành Tiền:</div>
                        <div><span class="total-money-value">${totalMoneyConvert}</span> VND</div>
                    </div>
                    <div class="total-money-note">( Đã Bao Gồm Thuế VAT )</div>
                </div>`
    
    }
    $('.shopping-cart-item-container').html(output);
}

function separator1000(num){ // 1000 separator 
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
//Part 3: Function for Submit Order
if ($('body').height() > $(window).outerHeight()){
    scrollBarWidth = $(window).outerWidth() - $('body').innerWidth();
}
else scrollBarWidth = 0;

$('.order-button').click(sendOrder);
function sendOrder(){
    // check shopping cart is empty 
    loadCart();
    if (shoppingCart.length ==0) window.location.href = "index.html";
    // check whether input field takes a valid value
    if (!checkEmpty('input-user-name')) {$(window).scrollTop(0); return};
    if (!checkEmpty('input-user-phone')) {$(window).scrollTop(0); return};
    if (!checkLimitedNumber('input-user-phone',10)) {$(window).scrollTop(0); return};
    if (!checkSelectInput('input-user-city-province')) {$(window).scrollTop(0); return};
    if (!checkSelectInput('input-user-district')) {$(window).scrollTop(0); return};
    if (!checkSelectInput('input-user-commune')) {$(window).scrollTop(0); return};
    if (!checkEmpty('input-user-address')) {$(window).scrollTop(0); return};
    if ($('#pay-by-card').is(':checked')){
        if (!checkSelectInput('card-brand'))  return;
        if (!checkEmpty('card-id')) return;
        if (!checkLimitedNumber('card-id',12)) return;
        if (!checkEmpty('card-owner')) return;
        if (!checkEmpty('card-expiry-month')) return;
        if (!checkLimitedNumber('card-expiry-month',2)) return;
        if (!checkMonth('card-expiry-month')) return;
        if (!checkEmpty('card-expiry-year')) return;
        if (!checkLimitedNumber('card-expiry-year',4)) return;
        if (!checkExpiryDate('card-expiry-year')) return;
        if (!checkEmpty('card-password')) return;
        if (!checkLimitedNumber('card-password',3)) return;
    }
    // show pop-up 
    $('.pop-up-modal').css('display','block');
    setTimeout(function(){$('.pop-up-modal').css('opacity','1');},100) 
    $('body').addClass('pop-up');
    $('body').css('padding-right',`${scrollBarWidth}px`)
    
}
function checkEmpty(id){ // check whether a input field is empty
    let inputCheck = $(`#${id}`).val();
    if (inputCheck.length == 0){
        $(`#${id}`).next().css('z-index','3');
        setTimeout(function(){
            $(`#${id}`).next().css('opacity','1');
        },100)
        setTimeout(function(){
            $(`#${id}`).next().css('opacity','0');
        },2500)
        setTimeout(function(){
            $(`#${id}`).next().css('z-index','-1');
        },2600)
        return false
    }
    else return true
}

function checkLimitedNumber(id,number){ // check number of digits 
    let inputCheck = $(`#${id}`).val();
    if (inputCheck.length !== number){
        $(`#${id}`).next().next().css('z-index','3');
        setTimeout(function(){
            $(`#${id}`).next().next().css('opacity','1');
        },100)
        setTimeout(function(){
            $(`#${id}`).next().next().css('opacity','0');
        },2500)
        setTimeout(function(){
            $(`#${id}`).next().next().css('z-index','-1');
        },2600)    
        return false;
    }
    return true;
}

function checkSelectInput(id){// check whether a valid option is selected
    let inputCheck = $(`#${id}`).val();
    if (inputCheck == 0){
        $(`#${id}`).next().css('z-index','3');
        setTimeout(function(){
            $(`#${id}`).next().css('opacity','1');
        },100)
        setTimeout(function(){
            $(`#${id}`).next().css('opacity','0');
        },2500)
        setTimeout(function(){
            $(`#${id}`).next().css('z-index','-1');
        },2600)
        return false
    }
    else return true;
}

function checkMonth(id){
    let inputCheck = $(`#${id}`).val();
    if (inputCheck > 12 ){
        $(`#${id}`).next().next().css('z-index','3');
        setTimeout(function(){
            $(`#${id}`).next().next().css('opacity','1');
        },100)
        setTimeout(function(){
            $(`#${id}`).next().next().css('opacity','0');
        },2500)
        setTimeout(function(){
            $(`#${id}`).next().next().css('z-index','-1');
        },2600)    
        return false;
    }
    else return true;
}

function checkExpiryDate(id){
    let inputCheckYear = $(`#${id}`).val();
    let inputCheckMonth = $('#card-expiry-month').val();
    let monthNow = new Date().getMonth();
    let yearNow = new Date().getFullYear();
    if (yearNow > inputCheckYear){
        $(`#${id}`).parent().children().last().css('z-index','3');
        setTimeout(function(){
            $(`#${id}`).parent().children().last().css('opacity','1');
        },100)
        setTimeout(function(){
            $(`#${id}`).parent().children().last().css('opacity','0');
        },2500)
        setTimeout(function(){
            $(`#${id}`).parent().children().last().css('z-index','-1');
        },2600)    
        return false;
    }
    else if (monthNow + 1 > inputCheckMonth){
        $(`#${id}`).parent().children().last().css('z-index','3');
        setTimeout(function(){
            $(`#${id}`).parent().children().last().css('opacity','1');
        },100)
        setTimeout(function(){
            $(`#${id}`).parent().children().last().css('opacity','0');
        },2500)
        setTimeout(function(){
            $(`#${id}`).parent().children().last().css('z-index','-1');
        },2600)    
        return false;
    }
    return true
}


$('.close-popup-button').click(closePopup);//Close Pop-up
function closePopup(){
    $('.pop-up-modal').css('opacity','0');
    setTimeout(function(){$('.pop-up-modal').css('display','none');},500); 
    $('body').removeClass('pop-up');
    $('#email-sender').val('');
    $('#feed-back-content').val('');
    $('body').css('padding-right','0px')
    // remove value in input field
    $('input').val('');
    $('textarea').val('');
    $('select').val('0');
    shoppingCart = [];
    saveCart();
    window.location.href = "index.html";
}

//Part : Showing Pay by Card Option
let heightPayByCardInitial = $('.user-payout-infor').innerHeight();
$('.user-payout-infor').innerHeight(heightPayByCardInitial);
$('#pay-by-card').on('change',showPayByCard);
function showPayByCard(){
    if ($('#pay-by-card').is(':checked')){
        $('.user-card-input').css('display','block')
        setTimeout(function(){
            let heightUserCardInput = $('.user-card-input').outerHeight(true);
            $('.user-payout-infor').innerHeight(heightPayByCardInitial + heightUserCardInput);
        },50)
        setTimeout(function(){
            $('.user-card-input').css('opacity','1');
        },550)
    }
}
$('#pay-by-cash').on('change',hidePayByCard);
function hidePayByCard(){
    if ($('#pay-by-cash').is(':checked')){
        $('.user-card-input').css('opacity','0');
        setTimeout(function(){
            $('.user-payout-infor').innerHeight(heightPayByCardInitial);
        },20)
        $('.user-card-input').css('display','none')
    }
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
    $('.header-desktop').css('padding-right',`${scrollBarWidth}px`);
}
$('.close-about-website').on('click',closeAboutWebsite);
function closeAboutWebsite(){
    $('.about-website-container').css('opacity','0');
    setTimeout(function(){
        $('.about-website-container').css('display','none');
        $('body').removeClass('start');
        $('body').css('paddingRight','0px');
        $('.header-desktop').css('paddingRight','0px');
    },600)
}

//Part 3: Funtion for Scrolling Button
$('.scrolling-button').click(scrollToTop);
function scrollToTop(){
    $(window).scrollTop(0); 
}