//sticky-navbar
$(window).scroll(function(){
    if ($('.top-information').css('display') == 'none'){
        if ($(window).scrollTop() >= 0) {
            $('.navbar-and-something').addClass('fixed-navbar');
            $('.container').css('margin-top','82px');
        }
        else {
            $('.navbar-and-something').removeClass('fixed-navbar');
            $('.container').css('margin-top','0px');
        }
    }
    else{
        if ($(window).scrollTop() >= 54) {
            $('.navbar-and-something').addClass('fixed-navbar');
            $('.container').css('margin-top','82px');
        }
        else {
            $('.navbar-and-something').removeClass('fixed-navbar');
            $('.container').css('margin-top','0px');
        }
    }
});


//Hidden menu mobile: on
function addHiddenMenu(){
    var $mobileMenu=$('.navbar-mobile-hidden');
    $mobileMenu.css('display','block')
    $('body').css('height','100vh');
    $('body').css('overflow','hidden');
    $('body').css('padding-right','18px');
}
//Hidden menu mobile: off
function removeHiddenMenu(){
    var $mobileMenu_1=$('.navbar-mobile-hidden');
    $mobileMenu_1.css('display','none');
    $('body').css('height','auto');
    $('body').css('overflow','auto');
    $('body').css('padding-right','0px');
}