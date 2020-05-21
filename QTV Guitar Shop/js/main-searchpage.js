//This section is written by using pure Javascript. 
//In this project, some pages are written by using pure Javascript and the others pages are written by using Jquery.
//I have done that just for practicing both Javascript and Jquery(a very popular library).


window.onhashchange = function(){
        window.location.reload();
};
// Part 1 : Function for Rendering Item
let inputSearch = window.location.href.split('#')[1].toLowerCase();
let arrayInitial = []
let arrayExecuted = [];

document.querySelector('.keyword').textContent = window.location.href.split('#')[1];

searchName(guitarClassicalData);
searchName(guitarElectricalData);
searchName(guitarAcousticData);
searchName(guitarUkuleleData);
searchNameAccessories(accessoriesData);

function searchName(array){
    for (let i = 0; i < array.length; i++){
        if (array[i]['name'].toLowerCase().includes(inputSearch)){
            arrayInitial.push(array[i]);
        }
    }        
}
function searchNameAccessories(array){
    for (let i = 0; i < array.length; i++){
        if (array[i]['name'].toLowerCase().includes(inputSearch)){
            arrayInitial.push(array[i]);
        }
    }   
}

document.querySelector('.number-result').textContent = `( ${arrayInitial.length} kết quả )`;

arrayExecuted = arrayInitial.slice(0);
sortByNameAToZ(arrayExecuted);
renderItem(arrayExecuted);//render product part
renderFilterPart(arrayExecuted);//render filter part

function renderItem(array){//function for rendering product part
    if (array.length != 0){
        let output = "";
        let outputPagination = `<div class="pagination-button prev-button "><img src="Blog/arrow_back_ios_24px_outlined.svg" alt=""></div>
                                <div class="pagination-button button-number button-1 active first-button">1</div>
                                <div class="pagination-button-special first-special">...</div>`;
        //Add page for Pagination (Apply 9 item for 1 page)
        let itemInOnePage
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
            if (array[i].group === "accessory")
            output += 
            `<a class="item page-${index + 1}" href="accessoriesitem.html#${array[i].id}+${array[i].group}">
                <div class="item-image">
                    <img class="front-image" src="${array[i].photo}/1 - banner.jpg" alt="${array[i].name}">
                </div>
                <div class="item-name">${array[i].name}</div>
                <div class="price-before-reduction"></div>
                <div class="price-after-reduction">${array[i].price} Đồng</div>
                <div class="line-item"></div>
                <div class="detail-item">CHI TIẾT</div>
            </a>`
            else output +=
            `<a class="item page-${index + 1}" href="productitem.html#${array[i].id}+${array[i].group}">
                <div class="item-image">
                    <img class="front-image" src="${array[i].photo}/1 - banner.jpg" alt="${array[i].name}">
                    <img class="back-image" src="${array[i].photo}/2 - banner.jpg" alt="${array[i].name}">
                </div>
                <h4 class="item-name">${array[i].name}</h4>
                <div class="price-before-reduction"></div>
                <div class="price-after-reduction">${array[i].price} VND</div>
                <div class="line-item"></div>
                <div class="detail-item">CHI TIẾT</div>
            </a>`
        }
        document.querySelector('.product-item').innerHTML = output;
        //Render Pagination
        if (numberOfPage < 7){
            for (let i = 1; i < numberOfPage; i++){
                outputPagination += `<div class="pagination-button button-number button-${i+1}">${i+1}</div>`;
            }
            outputPagination += `<div class="pagination-button next-button"><img src="Blog/arrow_forward_ios_24px_outlined.svg" alt=""></div>`;
        }
        else {
            for (let i = 1; i < numberOfPage - 1; i++){
                outputPagination += `<div class="pagination-button button-number button-${i+1}">${i+1}</div>`;
            }
            outputPagination += 
                    `<div class="pagination-button-special last-special">...</div>
                    <div class="pagination-button button-number button-${numberOfPage} last-button">${numberOfPage}</div>
                    <div class="pagination-button next-button"><img src="Blog/arrow_forward_ios_24px_outlined.svg" alt=""></div>`;    
        }
        document.querySelector('.pagination').innerHTML = outputPagination;
        for (let i = 3; i < numberOfPage - 1; i ++){
            document.querySelectorAll('.button-number')[i].style.display = "none";
        }
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

function renderFilterPart(array){//function for rendering filter part
    let outputProductCategory = "";
    let outputBrand = "";
    //rendering filter product category
    let productCategoryName = "";
    let productCategory = [];
    for (let i = 0; i < array.length; i++){
        productCategory.push(array[i].group)
    }
    productCategory = productCategory.filter((x,i,a) => a.indexOf(x) === i)
    productCategory = productCategory.sort(function(a,b){
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        if (a.name = b.name) return 0;
    })
    for (let i = 0; i < productCategory.length; i++){
        switch (productCategory[i]){
            case "classical":
                productCategoryName  = "GUITAR CỔ ĐIỂN"
                break;
            case "acoustic":
                productCategoryName  = "GUITAR ACOUSTIC"
                break;
            case "electrical":
                productCategoryName  = "GUITAR ĐIỆN"
                break;
            case "ukulele":
                productCategoryName  = "UKULELE"
                break;
            case "accessory":
                productCategoryName  = "PHỤ KIỆN"
                break;
        }
        outputProductCategory += 
            `<li>
                <label for="${productCategory[i]}">${productCategoryName}
                    <input type="checkbox" id="${productCategory[i]}" data-product-category="${productCategory[i]}">
                    <span class="checkmark"><img src="HomePage/tick.svg" alt=""></span>
                </label>
            </li>`
    }
    document.querySelector('.filter-product-category > .filter-content').innerHTML = outputProductCategory;
    //rendering filter brand
    let productBrand = [];
    for (let i = 0; i < array.length; i++){
        productBrand.push(array[i].brand.toLowerCase())
    }
    productBrand = [...new Set(productBrand)]
    productBrand = productBrand.sort(function(a,b){
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        if (a.name = b.name) return 0;
    })
    for (let i = 0; i < productBrand.length; i++){
        outputBrand += 
        `<li>
            <label for="${productBrand[i]}">${productBrand[i].toUpperCase()}
                <input type="checkbox" id="${productBrand[i]}" data-brand="${productBrand[i]}">
                <span class="checkmark"><img src="HomePage/tick.svg" alt=""></span>
            </label>
        </li>`
    }
    document.querySelector('.filter-brand > .filter-content').innerHTML = outputBrand;
}
// Part 2 : Function for Showing Filter Part
if (window.innerWidth > 1024){
    let filterContent = document.querySelectorAll('.filter-content');
    for (let i = 0; i < filterContent.length; i++){ //Set a definite number for max-height
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

// Part 3 : Function for Filtering Item
let filterBrand = document.querySelectorAll('.filter-brand > ul > li > label > input');
let filterProductCategory = document.querySelectorAll('.filter-product-category > ul > li > label > input');
document.querySelector('.filter-button').addEventListener('click',filterButton)
function filterButton(){
    arrayExecuted = arrayInitial.slice(0);
    //Filter for Product Category
    let productCategoryCondtion = [];
    for (let i = 0; i < filterProductCategory.length; i++){    
        if (filterProductCategory[i].checked) {
            productCategoryCondtion.push(filterProductCategory[i].dataset.productCategory);
        }
    }
    console.log()
    if (productCategoryCondtion.length != 0){
        arrayExecuted = arrayExecuted.filter(x => productCategoryCondtion.includes(x.group));
    }
    //Filter for Brand
    let brandFilterCondtion = [];
    for (let i = 0; i < filterBrand.length; i++){    
        if (filterBrand[i].checked) {
            brandFilterCondtion.push(filterBrand[i].dataset.brand)
        }
    }
    if (brandFilterCondtion.length != 0){
        arrayExecuted = arrayExecuted.filter(x => brandFilterCondtion.includes(x.brand.toLowerCase()));
    }
    document.querySelector('.arrangement-executed').textContent = "Tên Từ A - Z";
    renderItem(arrayExecuted);
}

document.querySelector('.remove-item-button').addEventListener('click',removeFilter);
function removeFilter(){//remove filter condition 
    arrayExecuted = arrayInitial.slice(0);
    renderItem(arrayExecuted);
    let uncheckItems = document.querySelectorAll('input:checked')
    uncheckItems.forEach(x => x.checked = false)
}


// Part 4 : Function for Arrangement Option
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

// Part 6: Function for Pagination
let numberReturn, bodyYPosition, productYPosition;
function prevButton(){
    let currentPage = document.querySelector('.active');
    currentPage.parentNode.childNodes.forEach(elm => elm.nodeType != 1 && elm.parentNode.removeChild(elm));//remove text node
    if (currentPage.textContent == 1) return
    else {
        document.querySelector(`.button-${parseInt(currentPage.textContent) - 1}`).classList.add('active');
        currentPage.classList.remove('active');       
    }
    bodyYPosition = document.body.getBoundingClientRect();
    productYPosition = document.querySelector('.arrangement-part').getBoundingClientRect();
    numberReturn = productYPosition.top - bodyYPosition.top; //scrollbar backs to top of the product part 
    document.body.scrollTop = numberReturn; 
    document.documentElement.scrollTop = numberReturn;
    let pageGone = document.querySelectorAll(`.page-${currentPage.textContent}`);
    for (let i = 0; i < pageGone.length; i++){
        pageGone[i].style.display = "none";
        pageGone[i].classList.remove('show');
    }
    let pageArrived = document.querySelectorAll(`.page-${parseInt(currentPage.textContent) - 1}`);
    let numberPageArrived = parseInt(currentPage.textContent) - 1;
    for (let i = 0; i < pageArrived.length; i++){
        pageArrived[i].style.display = "block";
        setTimeout(function(){
            pageArrived[i].classList.add('show')
        },50)
    }
    changePagination(numberPageArrived);
}

function nextButton(){
    let currentPage = document.querySelector('.active');
    currentPage.parentNode.childNodes.forEach(elm => elm.nodeType != 1 && elm.parentNode.removeChild(elm)); //remove text node
    if (currentPage.textContent == numberOfPage) return
    else {
        document.querySelector(`.button-${parseInt(currentPage.textContent) + 1}`).classList.add('active');
        currentPage.classList.remove('active'); 
    }
    bodyYPosition = document.body.getBoundingClientRect();
    productYPosition = document.querySelector('.arrangement-part').getBoundingClientRect();
    numberReturn = productYPosition.top - bodyYPosition.top; //scrollbar backs to top of the product part 
    document.body.scrollTop = numberReturn; 
    document.documentElement.scrollTop = numberReturn;
    let pageGone = document.querySelectorAll(`.page-${currentPage.textContent}`);
    for (let i = 0; i < pageGone.length; i++){
        pageGone[i].style.display = "none";
        pageGone[i].classList.remove('show');
    }
    let pageArrived = document.querySelectorAll(`.page-${parseInt(currentPage.textContent) + 1}`);
    let numberPageArrived = parseInt(currentPage.textContent) + 1;
    for (let i = 0; i < pageArrived.length; i++){
        pageArrived[i].style.display = "block";
        setTimeout(function(){
            pageArrived[i].classList.add('show')
        },50)
    }
    changePagination(numberPageArrived);
}

function numberButton(){
    let currentPage = document.querySelector('.active');
    currentPage.parentNode.childNodes.forEach(elm => elm.nodeType != 1 && elm.parentNode.removeChild(elm)); //remove text node
    if (currentPage.textContent == this.textContent) return
    else {
        this.classList.add('active');
        currentPage.classList.remove('active');
    }
    bodyYPosition = document.body.getBoundingClientRect();
    productYPosition = document.querySelector('.arrangement-part').getBoundingClientRect();
    numberReturn = productYPosition.top - bodyYPosition.top; //scrollbar backs to top of the product part 
    document.body.scrollTop = numberReturn; 
    document.documentElement.scrollTop = numberReturn;
    let pageGone = document.querySelectorAll(`.page-${currentPage.textContent}`);
    for (let i = 0; i < pageGone.length; i++){
        pageGone[i].style.display = "none";
        pageGone[i].classList.remove('show');
    }
    let pageArrived = document.querySelectorAll(`.page-${this.textContent}`);
    let numberPageArrived = parseInt(this.textContent)
    for (let i = 0; i < pageArrived.length; i++){
        pageArrived[i].style.display = "block";
        setTimeout(function(){
            pageArrived[i].classList.add('show')
        },50)
    }
    changePagination(numberPageArrived);
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

function changePagination(numberPage){
    if (numberPage == 1){
        document.querySelectorAll(`.button-${numberPage + 1}, .button-${numberPage + 2}`).forEach(x => x.style.display = "flex");
        for (i = numberPage + 3; i < numberOfPage; i++){
            document.querySelector(`.button-${i}`).style.display = "none";
        }
        document.querySelector('.first-special').style.display = "none";
        document.querySelector('.last-special').style.display = "flex";
    }
    else if (numberPage == numberOfPage){
        document.querySelectorAll(`.button-${numberPage - 1}, .button-${numberPage - 2}`).forEach(x => x.style.display = "flex");
        for (i = 2; i < numberPage - 2; i++){
            document.querySelector(`.button-${i}`).style.display = "none";
        }
        document.querySelector('.first-special').style.display = "flex";
        document.querySelector('.last-special').style.display = "none";
    }
        else {
            document.querySelectorAll(`.button-${numberPage - 1}, .button-${numberPage + 1}`).forEach(x => x.style.display = "flex");
            if (numberPage - 1 > 2){
                document.querySelector('.first-special').style.display = "flex";
                for (i = 2; i < numberPage - 1; i++){
                    document.querySelector(`.button-${i}`).style.display = "none";
                }
            }
            else document.querySelector('.first-special').style.display = "none";
            if (numberOfPage - numberPage > 2){
                document.querySelector('.last-special').style.display = "flex";
                for (i = numberPage + 2; i < numberOfPage; i++){
                    document.querySelector(`.button-${i}`).style.display = "none";
                }
            }
            else document.querySelector('.last-special').style.display = "none";
    }
}



