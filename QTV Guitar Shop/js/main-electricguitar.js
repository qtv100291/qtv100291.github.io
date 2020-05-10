//This section is written by using pure Javascript. 
//In this project, some pages are written by using pure Javascript and the others pages are written by using Jquery.
//I have done that just for practicing both Javascript and Jquery(a very popular library).

// Part 1 : Function for Showing Filter Part
if (window.innerWidth > 1024){
    let filterContent = document.querySelectorAll('.filter-content');
    for (let i = 0; i < filterContent.length; i++){ //Set a definite Number for max-height
    filterContent[i].style.maxHeight = filterContent[i].scrollHeight + "px";
    }
}
let filterTitle = document.querySelectorAll('.filter-title');
for(let i = 0; i < filterTitle.length; i++){
    filterTitle[i].addEventListener('click',showFilterContent);
}

function showFilterContent(){
    this.parentNode.childNodes.forEach(elm => elm.nodeType != 1 && elm.parentNode.removeChild(elm));//remove text node
    if (window.innerWidth > 1024){  
        if ( this.childNodes[1].style.display != "block"){
            this.parentNode.childNodes[1].style.maxHeight = "0px";
            this.style.borderBottom = "none";
            this.childNodes[1].style.display = "block";  
            this.childNodes[2].style.display = "none";     
         }
        else {
            this.parentNode.childNodes[1].style.maxHeight = this.parentNode.childNodes[1].scrollHeight + "px";
            this.style.borderBottom = "1px solid #BDB4B4";
            this.childNodes[1].style.display = "none";  
            this.childNodes[2].style.display = "block";  
        }
    }
    else {
        if ( this.childNodes[2].style.display != "block"){
            this.parentNode.childNodes[1].style.maxHeight = this.parentNode.childNodes[1].scrollHeight + "px";
            this.style.borderBottom = "1px solid #BDB4B4";
            this.childNodes[1].style.display = "none";  
            this.childNodes[2].style.display = "block";  
        }
        else {
            this.parentNode.childNodes[1].style.maxHeight = "0px";
            this.style.borderBottom = "none";
            this.childNodes[1].style.display = "block";  
            this.childNodes[2].style.display = "none";  
        }
    }
}

// Part 2 : Function for Filtering Item
let filterBrand = document.querySelectorAll('.filter-brand > ul > li > label > input');
let filterBodySize = document.querySelectorAll('.filter-body-size > ul > li > label > input');
let filterPrice = document.querySelectorAll('.filter-price > ul > li > label > input');
document.querySelector('.filter-button').addEventListener('click',filterButton)
function filterButton(){
    arrayExecuted = guitarElectricalData.slice(0);
    //Filter for Brand
    let brandFilterCondtion = [] ;
    for (let i = 0; i < filterBrand.length; i++){    
        if (filterBrand[i].checked) {
            brandFilterCondtion.push(filterBrand[i].dataset.brand)
        }
    }
    if (brandFilterCondtion.length != 0){
        arrayExecuted = arrayExecuted.filter(x => brandFilterCondtion.includes(x.brand));
    }
    //Filter for Body Size
    let bodySizeCondtion = [] ;
    for (let i = 0; i < filterBodySize.length; i++){    
        if (filterBodySize[i].checked) {
            bodySizeCondtion.push(filterBodySize[i].dataset.bodySize);
        }
    }
    console.log()
    if (bodySizeCondtion.length != 0){
        arrayExecuted = arrayExecuted.filter(x => bodySizeCondtion.includes(x.body));
    }
    //Filter for Price
    let priceCondtion = [];
    for (let i = 0; i < filterPrice.length; i++){    
        if (filterPrice[i].checked) {
            priceCondtion.push(
                {
                    min : filterPrice[i].dataset.priceMin,
                    max : filterPrice[i].dataset.priceMax
                }
            );
        }
    }
    console.log(priceCondtion)
    if (priceCondtion.length != 0){
        arrayExecuted = arrayExecuted.filter(function (x) {
            let priceItem = parseInt(x.price.replace(/\D/g,''))
            for (let i = 0; i < priceCondtion.length; i++){

                if (priceItem >= priceCondtion[i].min && priceItem < priceCondtion[i].max)
                return true
            }
            return false
        });
    }
    document.querySelector('.arrangement-executed').textContent = "Tên Từ A - Z";
    renderItem(arrayExecuted);
}

document.querySelector('.remove-item-button').addEventListener('click',removeFilter);
function removeFilter(){//remove filter condition 
    arrayExecuted = guitarElectricalData.slice(0);
    renderItem(arrayExecuted);
    let uncheckItems = document.querySelectorAll('input:checked');
    uncheckItems.forEach(x => x.checked = false)
}

//Part 3 : Function for Arrangement Option
let arrangementPart = document.querySelector('.arrangement-part');
window.onclick = function(){ // Click anywhere outside Arrangement Part to close it
    if (document.querySelector('.menu-arrangement').style.display == "block"){
        document.querySelector('.menu-arrangement').style.display = "none";
    }
}

document.querySelector('.arrangement-title').addEventListener('click',showArrangementOption,false);
function showArrangementOption(){
    event.stopPropagation();
    if (document.querySelector('.menu-arrangement').style.display != "block"){
        document.querySelector('.menu-arrangement').style.display = "block";
    }
    else document.querySelector('.menu-arrangement').style.display = "none";
}

document.querySelector('.option-1').addEventListener('click',function(){
    let elt = this;
    chooseArrangementOption(elt);
    sortByNameAToZ(arrayExecuted);
    pagination1();
} 
);
document.querySelector('.option-2').addEventListener('click',function(){
    let elt = this;
    chooseArrangementOption(elt);
    sortByPriceUp(arrayExecuted);
    pagination1();
} 
);
document.querySelector('.option-3').addEventListener('click',function(){
    let elt = this;
    chooseArrangementOption(elt);
    sortByPriceDown(arrayExecuted);
    pagination1();
} 
);

function chooseArrangementOption(elt){
    document.querySelector('.arrangement-executed').textContent = elt.textContent; 
}

// Part 4 : Function for Rendering Item
let arrayExecuted = guitarElectricalData.slice(0);
renderItem(arrayExecuted);
function renderItem(array){
    if (array.length != 0){
        let output = "";
        let outputPagination = `<div class="pagination-button prev-button "><img src="Blog/arrow_back_ios_24px_outlined.svg" alt=""></div>
                                <div class="pagination-button button-number button-1 active">1</div>`;
        //Add page for Pagination (Apply 9 item for 1 page) 
        let itemInOnePage;
        switch (true) {
            case window.innerWidth > 768:
                itemInOnePage = 9;
                break;
            default:
                itemInOnePage = 8;
                break;
        }
        numberOfPage = Math.ceil(array.length/itemInOnePage);
        for (let i = 0; i < array.length; i++){
            let index = Math.floor(i/itemInOnePage);
            output += 
                `<a class="item page-${index + 1}" href="productitem.html#${array[i].id}+${array[i].group}">
                    <div class="item-image">
                        <img class="front-image" src="${array[i].photo}/1 - banner.jpg" alt="${array[i].name}">
                        <img class="back-image" src="${array[i].photo}/2 - banner.jpg" alt="${array[i].name}">
                    </div>
                    <div class="item-name">${array[i].name}</div>
                    <div class="price-before-reduction"></div>
                    <div class="price-after-reduction">${array[i].price} Đồng</div>
                    <div class="line-item"></div>
                    <div class="detail-item">CHI TIẾT</div>
                </a>`
        }
        document.querySelector('.product-item').innerHTML = output;
        //Render Pagination
        for (let i = 1; i < numberOfPage; i++){
            outputPagination += `<div class="pagination-button button-number button-${i+1}">${i+1}</div>`;
        }
        outputPagination += `<div class="pagination-button next-button"><img src="Blog/arrow_forward_ios_24px_outlined.svg" alt=""></div>`;
        document.querySelector('.pagination').innerHTML = outputPagination;
        document.querySelector('.prev-button').addEventListener('click',prevButton);
        document.querySelector('.next-button').addEventListener('click',nextButton);
        let buttonNumber = document.querySelectorAll('.button-number');
        for (let i = 0; i < buttonNumber.length; i++){
        buttonNumber[i].addEventListener('click',numberButton);
        }
        for (let i = 2 ; i <= numberOfPage; i++){
            document.querySelectorAll(`.page-${i}`).forEach( item => item.style.display = "none")
        }
    }
    else {
        let output = `<div class="notification-empty">Không Có Sản Phẩm Phù Hợp</div>`;
        document.querySelector('.product-item').innerHTML = output;
        document.querySelector('.pagination').innerHTML = "";
    }
    setTimeout(function(){document.querySelectorAll('.item.page-1').forEach(x => x.classList.add('show'))},50);

}

// Part 5: Function for Sorting Item
function sortByPriceUp(array){
    renderItem(array.sort(function(a,b){
        return parseInt(a.price.replace(/\D/g,"")) - parseInt(b.price.replace(/\D/g,""));
    }));
}

function sortByPriceDown(array){
    renderItem(array.sort(function(a,b){
        return -(parseInt(a.price.replace(/\D/g,"")) - parseInt(b.price.replace(/\D/g,"")));
    }));
}

function sortByNameAToZ(array){
    renderItem(array.sort(function(a,b){
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        if (a.name = b.name) return 0;
    }));
}

//Part 6: Function for Pagination
let numberReturn, bodyYPosition, productYPosition;
function prevButton(){
    bodyYPosition = document.body.getBoundingClientRect();
    productYPosition = document.querySelector('.arrangement-part').getBoundingClientRect();
    numberReturn = productYPosition.top - bodyYPosition.top; //scrollbar backs to top of the product part 
    document.body.scrollTop = numberReturn; 
    document.documentElement.scrollTop = numberReturn;
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
        pageGone[i].classList.remove('show');
    }
    let pageArrived = document.querySelectorAll(`.page-${currentPage.previousSibling.textContent}`);
    for (let i = 0; i < pageArrived.length; i++){
        pageArrived[i].style.display = "block";
        setTimeout(function(){
            pageArrived[i].classList.add('show')
        },50)
    }
}

function nextButton(){
    bodyYPosition = document.body.getBoundingClientRect();
    productYPosition = document.querySelector('.arrangement-part').getBoundingClientRect();
    numberReturn = productYPosition.top - bodyYPosition.top; //scrollbar backs to top of the product part 
    document.body.scrollTop = numberReturn; 
    document.documentElement.scrollTop = numberReturn;
    let currentPage = document.querySelector('.active');
    currentPage.parentNode.childNodes.forEach(elm => elm.nodeType != 1 && elm.parentNode.removeChild(elm)); //remove text node
    if (currentPage.textContent == numberOfPage) return
    else {
        currentPage.nextSibling.classList.add('active');
        currentPage.classList.remove('active'); 
    }
    let pageGone = document.querySelectorAll(`.page-${currentPage.textContent}`);
    for (let i = 0; i < pageGone.length; i++){
        pageGone[i].style.display = "none";
        pageGone[i].classList.remove('show');
    }
    let pageArrived = document.querySelectorAll(`.page-${currentPage.nextSibling.textContent}`);
    for (let i = 0; i < pageArrived.length; i++){
        pageArrived[i].style.display = "block";
        setTimeout(function(){
            pageArrived[i].classList.add('show')
        },50)
    }
}

function numberButton(){
    bodyYPosition = document.body.getBoundingClientRect();
    productYPosition = document.querySelector('.arrangement-part').getBoundingClientRect();
    numberReturn = productYPosition.top - bodyYPosition.top; //scrollbar backs to top of the product part 
    document.body.scrollTop = numberReturn; 
    document.documentElement.scrollTop = numberReturn;
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
        pageGone[i].classList.remove('show');
    }
    let pageArrived = document.querySelectorAll(`.page-${this.textContent}`);
    for (let i = 0; i < pageArrived.length; i++){
        pageArrived[i].style.display = "block";
        setTimeout(function(){
            pageArrived[i].classList.add('show')
        },50)
    }
}

function pagination1(){//When clicking on Arrangement Button Page back to 1st Page
    let currentPage = document.querySelector('.active');
    currentPage.parentNode.childNodes.forEach(elm => elm.nodeType != 1 && elm.parentNode.removeChild(elm)); //remove text node
    if (currentPage.textContent == 1) return
    else{
        document.querySelector('.button-1').classList.add('active');
        currentPage.classList.remove('active');
    }
} 




