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

// Part : Function for Loading information
if (localStorage.getItem('signInSituation') === "false"){
    window.location.href = "index.html";
}

function saveUserList(){
    localStorage.setItem('userListGuitar', JSON.stringify(userList));
} 

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
    console.log(currentUser,userList)
    saveUserList();
}

// Part : Function for Log out
$('.log-out-button').on('click',function(){
    localStorage.setItem('signInSituation', false);
    window.location.href = "index.html"
})
