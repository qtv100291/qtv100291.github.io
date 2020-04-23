//This section is written by using pure Javascript. 
//In this project, some pages are written by using pure Javascript and the others pages are written by using Jquery.
//I have done that just for practicing both Javascript and Jquery(a very popular library).

// Part 1 : Function for Pagination Button
document.querySelector('.prev-button').addEventListener('click',prevButton);
document.querySelector('.next-button').addEventListener('click',nextButton);
let buttonNumber = document.querySelectorAll('.button-number');
for (let i=0; i < buttonNumber.length; i++){
    buttonNumber[i].addEventListener('click',numberButton)
}
function prevButton(){
    document.body.scrollTop = 0; 
    document.documentElement.scrollTop = 0;
    let currentPage = document.querySelector('.active');
    currentPage.parentNode.childNodes.forEach(elm => elm.nodeType != 1 && elm.parentNode.removeChild(elm));//remove text node
    if (currentPage.textContent == 1) return
    else {
        currentPage.previousSibling.classList.add('active');
        currentPage.classList.remove('active');       
    }
    let pageGone = document.querySelectorAll(`.page-${currentPage.textContent}`);
    for (let i = 0; i < pageGone.length; i++){
        pageGone[i].style.display = "none";
    }
    let pageArrived = document.querySelectorAll(`.page-${currentPage.previousSibling.textContent}`);
    for (let i = 0; i < pageArrived.length; i++){
        pageArrived[i].style.display = "block";
    }
}
function nextButton(){
    document.body.scrollTop = 0; 
    document.documentElement.scrollTop = 0;
    let currentPage = document.querySelector('.active');
    currentPage.parentNode.childNodes.forEach(elm => elm.nodeType != 1 && elm.parentNode.removeChild(elm)); //remove text node
    if (currentPage.textContent == 2) return
    else {
        currentPage.nextSibling.classList.add('active');
        currentPage.classList.remove('active'); 
    }
    let pageGone = document.querySelectorAll(`.page-${currentPage.textContent}`);
    for (let i = 0; i < pageGone.length; i++){
        pageGone[i].style.display = "none";
    }
    let pageArrived = document.querySelectorAll(`.page-${currentPage.nextSibling.textContent}`);
    for (let i = 0; i < pageArrived.length; i++){
        pageArrived[i].style.display = "block";
    }
}
function numberButton(){
    document.body.scrollTop = 0; 
    document.documentElement.scrollTop = 0;
    let currentPage = document.querySelector('.active');
    currentPage.parentNode.childNodes.forEach(elm => elm.nodeType != 1 && elm.parentNode.removeChild(elm)); //remove text node
    if (currentPage.textContent == this.textContent) return
    else {
        this.classList.add('active');
        currentPage.classList.remove('active');
    }
    let pageGone = document.querySelectorAll(`.page-${currentPage.textContent}`);
    for (let i = 0; i < pageGone.length; i++){
        pageGone[i].style.display = "none";
    }
    let pageArrived = document.querySelectorAll(`.page-${this.textContent}`);
    for (let i = 0; i < pageArrived.length; i++){
        pageArrived[i].style.display = "block";
    }
}


