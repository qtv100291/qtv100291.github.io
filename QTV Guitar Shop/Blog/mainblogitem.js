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
//Part 2 : Function for Responsive Photo


//Part 3: Funtion for Scrolling Button
$('.scrolling-button').click(scrollToTop);
function scrollToTop(){
    $(window).scrollTop(0); 
}