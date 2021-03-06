//This section is written by using Jquery. 
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

// Part 3: Function for Loading information
if (localStorage.getItem('signInSituation') === "false"){
    window.location.href = "index.html";
}

function saveUserList(){
    localStorage.setItem('userListGuitar', JSON.stringify(userList));
}
//loading information 
$('.member-name').text(`${currentUser.info.name}`);
$('#input-user-name').val(`${currentUser.info.name}`);
$('#input-user-phone').val(`${currentUser.info.phoneNumber}`);
$('#input-user-email').val(`${currentUser.email}`);
$('#input-user-password').val(`${currentUser.password}`);

if (currentUser.address.province != ""){
    $('#input-user-city-province').val(currentUser.address.province);
    selectProvince();
    if (currentUser.address.district != ""){
        $('#input-user-district').val(currentUser.address.district);
        selectDistrict()
        if (currentUser.address.commune != ""){
            $('#input-user-commune').val(currentUser.address.commune);
        }
    }
}

$('#input-user-address').val(currentUser.address.street);

$('#card-brand').val(currentUser.payment.cardType);
$('#card-id').val(currentUser.payment.cardID);
$('#card-owner').val(currentUser.payment.cardName);
$('#card-password').val(currentUser.payment.cardCGV);
$('#card-expiry-month').val(currentUser.payment.cardExpiryMonth);
$('#card-expiry-year').val(currentUser.payment.cardExpiryYear);

//updating information
$('.save-button').on('click', saveInformation);

function saveInformation(){
    currentUser.info.name = $('#input-user-name').val();
    currentUser.info.phoneNumber = $('#input-user-phone').val();
    currentUser.email = $('#input-user-email').val();
    currentUser.password = $('#input-user-password').val();

    currentUser.address.province = $('#input-user-city-province').val();
    currentUser.address.district = $('#input-user-district').val();
    currentUser.address.commune = $('#input-user-commune').val();
    currentUser.address.street = $('#input-user-address').val();

    currentUser.payment.cardType = $('#card-brand').val();
    currentUser.payment.cardID = $('#card-id').val();
    currentUser.payment.cardName = $('#card-owner').val();
    currentUser.payment.cardCGV = $('#card-password').val();
    currentUser.payment.cardExpiryMonth = $('#card-expiry-month').val();
    currentUser.payment.cardExpiryYear = $('#card-expiry-year').val();

    for (let i = 0; i < userList.length; i++){
        if (currentID == userList[i].id){
        userList.splice(i, 1 , currentUser);
        break;
        }
    }
    console.log(currentUser,userList);
    saveUserList();
    // show pop-up 
    $('.pop-up-modal').css('display','block');
    setTimeout(function(){$('.pop-up-modal').css('opacity','1');},100) 
    $('body').addClass('start');
    $('body').css('padding-right',`${scrollBarWidth}px`)
}

$('.close-popup-button').click(closePopup);//Close Pop-up
function closePopup(){
    $('.pop-up-modal').css('opacity','0');
    setTimeout(function(){$('.pop-up-modal').css('display','none');},500); 
    $('body').removeClass('pop-up');
    window.location.reload();
}
// Part 4: Function for Changing tab

$('.account-menu-info').on('click',function(){//changing tab to "Thông Tin Tài Khoản"
    $('.account-menu-info').addClass('active-menu');
    $('.menu-info-main-content').css('display','block');
    setTimeout(function(){
        $('.menu-info-main-content').css('opacity','1');
    },50)
    $('.account-menu-history-trade').removeClass('active-menu');
    $('.trade-history-main-content').css('display','none');
    $('.trade-history-main-content').css('opacity','0');
    $('footer').removeClass('empty');
});

$('.account-menu-history-trade').on('click',function(){//changing tab to "Lịch Sử Giao Dịch"
    $('.account-menu-info').removeClass('active-menu');
    $('.menu-info-main-content').css('display','none');
    $('.menu-info-main-content').css('opacity','0');
    $('.account-menu-history-trade').addClass('active-menu');
    $('.trade-history-main-content').css('display','block');
    setTimeout(function(){
        $('.trade-history-main-content').css('opacity','1');
    },50)

    let output = "";
    let outputItem = "";
    if (currentUser.tradeHistory.length != 0){
        if (window.innerWidth < 577){
            for (let i = 0; i < currentUser.tradeHistory.length; i++){
                let moneyItem = currentUser.tradeHistory[i].price.replace(/\D/g,'') * currentUser.tradeHistory[i].count
                output += 
                        `<div class = "history-trade-item">
                            <div class = "history-trade-item-name">${currentUser.tradeHistory[i].count} x ${currentUser.tradeHistory[i].name}</div>
                            <div class = "history-trade-item-name-date">Ngày đặt hàng : ${currentUser.tradeHistory[i].time}</div>
                            <div class = "history-trade-item-name-money">Tổng Tiền : ${separator1000(moneyItem)} VND</div>
                        </div>`
            }
            outputItem = 
                            `<div class="account-main-content-title-main">LỊCH SỬ GIAO DỊCH</div>
                            <div class ="history-trade-content">
                                ${output}
                            </div>
                            `
        }
        else {
            for (let i = 0; i < currentUser.tradeHistory.length; i++){
                let moneyItem = currentUser.tradeHistory[i].price.replace(/\D/g,'') * currentUser.tradeHistory[i].count
                output += 
                        `<tr>
                            <td>${currentUser.tradeHistory[i].time}</td>
                            <td>${currentUser.tradeHistory[i].count} x ${currentUser.tradeHistory[i].name}</td>
                            <td>${separator1000(moneyItem)} VND</td>
                        </tr>`
            }
            outputItem = 
                            `<div class="account-main-content-title-main">LỊCH SỬ GIAO DỊCH</div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Ngày Mua</th>
                                        <th>Sản Phẩm</th>
                                        <th>Tổng Tiền</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${output}
                                </tbody>
                            </table>
                            `
        }
        
    }
    else outputItem = `<div class="account-main-content-title-main">LỊCH SỬ GIAO DỊCH</div>
                        <div class="account-main-content-trade-history">Chưa Có Giao Dịch</div>`
    $('.trade-history-main-content').html(outputItem)
    if (document.body.clientHeight < window.innerHeight){
        $('footer').addClass('empty');
    }
});

function separator1000(num){ // 1000 separator 
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g,".");
}

// Part 5: Function for Log out
$('.log-out-button').on('click',function(){
    localStorage.setItem('signInSituation', false);
    window.location.href = "index.html"
})
