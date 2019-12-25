//Hidden menu mobile: on
function addHiddenMenu(){
    var mobileMenu=$('.menu-mobile-hidden');
    mobileMenu.css('display','block')
}
//Hidden menu mobile: off
function removeHiddenMenu(){
    var mobileMenu_1=$('.menu-mobile-hidden');
    mobileMenu_1.css('display','none')
}
//Search button mobile:on and off
function addSearchButton(){
    var mobileSearchButton=$('.search-page-mobile');
    var iconSeacrchButton=$('.search-button-mobile-icon');
    if ($(mobileSearchButton[0]).css('display')==='none'){
        $(mobileSearchButton[0]).css('display','block');
        $(iconSeacrchButton[0]).html('<i class="fas fa-times"></i>');
    }
    else {
        $(mobileSearchButton[0]).css('display','none');
        $(iconSeacrchButton[0]).html('<i class="fas fa-search"></i>');
    }
}

//Slideshow-desktop
let slideIndex = 1;
showItem(1);
function itemHover(){
    var slideItem=$('.carousel-indicator');
    slideItem.css({'animation-name':'moveup-indicator','animation-duration':'2s','animation-fill-mode':'forwards'})
}
function indicatorHover(item){
    var indicator = $(item).attr('data-indicator');
    showItem(indicator);
}
function showItem(slideIndex){
    var x = $('.carousel-item');
    for (i=0; i< x.length; i++){
        if (i == slideIndex-1){
            $(x[i]).css('display','block');
        }
        else {  
            $(x[i]).css('display','none');
        }
    }
}
