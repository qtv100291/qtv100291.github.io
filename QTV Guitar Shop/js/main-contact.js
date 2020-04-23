//This section is written by using Jquery. 
//In this project, some pages are written by using pure Javascript and the others pages are written by using Jquery.
//I have done that just for practicing both Javascript and Jquery(a very popular library).

// Part 1: Function for Submit Feed-back
if ($('body').height() > $(window).innerHeight()){
    scrollBarWidth = $(window).outerWidth() - $('body').innerWidth();
}
else scrollBarWidth = 0;

$('.submit-feed-back').click(sendFeedback);
function sendFeedback(){
    if (!checkEmpty('email-sender')) return;
    if (!checkEmailName('email-sender')) return;
    if (!checkEmpty('feed-back-content')) return;
    $('.pop-up-modal').css('display','block');
    setTimeout(function(){$('.pop-up-modal').css('opacity','1');},100) 
    $('body').addClass('start');
    $('body').css('padding-right',`${scrollBarWidth}px`)
    $('.header-desktop').css('padding-right',`${scrollBarWidth}px`)
}
function checkEmpty(id){ // check input field is empty
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
function checkEmailName(id){ // check email name form
    let inputCheck = $(`#${id}`).val();
    if (!inputCheck.includes('@') || !inputCheck.includes('.')){
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
        return false
    }
    let indexAtSign = inputCheck.indexOf('@');
    let check = inputCheck.slice(indexAtSign).match(/\./g).length;
    let indexPoint = inputCheck.slice(indexAtSign).indexOf('.');
    if (indexPoint < 2 || check > 1){
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
        return false
    }
    return true
}

$('.close-popup-button').click(closePopup);
function closePopup(){
    $('.pop-up-modal').css('opacity','0');
    setTimeout(function(){$('.pop-up-modal').css('display','none');},500); 
    $('body').removeClass('start');
    $('#email-sender').val('');
    $('#feed-back-content').val('');
    $('body').css('padding-right','0px');
    $('.header-desktop').css('padding-right',`0px`);
}

