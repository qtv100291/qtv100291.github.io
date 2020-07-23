const API = "http://localhost:3000/users";

const HOME = "http://localhost:3000/";
// request api "GET"
function getUserApi(renderFunction) {
  $.ajax({
    method: "GET",
    url: API,
  }).done(function (dataUsers) {
    if (renderFunction) renderFunction(dataUsers);
  });
}



// dump data to table
function renderContent(dataUsers) {
  let htmlContent = "";
  for (let i = 0; i < dataUsers.length; i++) {
    htmlContent += "<tr>";
    htmlContent += "<th>" + (dataUsers[i].id || "chưa biết") + "</th>";
    htmlContent += "<th>" + (dataUsers[i].name || "chưa biết") + "</th>";
    htmlContent += "<th>" + (dataUsers[i].age || "chưa biết") + "</th>";
    htmlContent += "<th>" + (dataUsers[i].email || "chưa biết") + "</th>";
    htmlContent += "<th>" + (dataUsers[i].phone || "chưa biết") + "</th>";
    htmlContent +=
      "<th>" +
      '<a href="javascript:void(0)" onclick="renderInfoUser(' +
      dataUsers[i].id +
      ')">' +
      '<button type="button" class="btn btn-outline-primary" data-toggle="modal" data-target="#form-update">Update</button>' +
      "</a>" +
      "</th>";
    htmlContent +=
      "<th>" +
      '<a href="javascript:void(0)" onclick="renderInfoUser(' +
      dataUsers[i].id +
      ')">' +
      ' <button type="button"   class="btn btn-outline-info" data-toggle="modal" data-target="#form-delete">Remove</button>' +
      "</a>" +
      "</th>";
    htmlContent += "</tr>";
  }
  $("table tbody").html(htmlContent);
}



// post infomation of user to server
function postUserApi() {
  $.ajax({
    method: "POST",
    url: API,
    contentType: "application/json",
    data: JSON.stringify({
      name: $("#name").val(),
      age: $("#age").val(),
      email: $("#email").val(),
      phone: $("#phone").val(),
    }),
  }).done(function () {
   window.location.href = HOME;
  });
}



// request api to info user
function renderInfoUser(id) {
  $.ajax({
    method: "GET",
    url: API + "/" + id,
  }).done(function (item) {
    if (renderContentDelete) {
      // if function params is renderContentDelete => call function renderContentDelete
      renderContentDelete(item);
    }
    if (renderContentUpdate) {
      // if function params is renderContentUpdate => call function renderContentUpdate
      renderContentUpdate(item);
    }
  });
}



// render info user cho user thấy và accept delete info user
function renderContentDelete(item) {
  $("#exampleModalLongTitle").html(
    "Do you want delete user have id " + item.id + " ?"
  );
  $("ul .name1").html(item.name);
  $("ul .age1").html(item.age);
  $("ul .email1").html(item.email);
  $("ul .phone1").html(item.phone);
  let btn_delete = "";
  btn_delete +=
    '<button type="button" onclick="deleteUserApi(' +item.id +  ')" class="btn btn-primary" id="delete-user">Accept</button>';
  $(".btn-delete").html(btn_delete);
}



// delete user
function deleteUserApi(id,link) {
  $.ajax({
    method: "DELETE",
    url: API + "/" + id,
    dataType: "json",
  }).done(function () {
    window.location.href = HOME;
  });
}



//render infomation user to input
function renderContentUpdate(item) {
  $("#updatename").val(item.name);
  $("#updateage").val(item.age);
  $("#updateemail").val(item.email);
  $("#updatephone").val(item.phone);
  let btn_update = "";
  btn_update +=
    ' <button type="button" onclick="updateInfoUserApi(' +
    item.id +
    ')"  class="btn btn-primary">Save info</button>';
  $(".btn-update-user").html(btn_update);
}



//create function request update api
function updateInfoUserApi(id) {
  $.ajax({
    method: "PUT",
    url: API + "/" + id,
    contentType: "application/json",
    data: JSON.stringify({
      name: $("#updatename").val(),
      age: $("#updateage").val(),
      email: $("#updateemail").val(),
      phone: $("#updatephone").val(),
    }),
  }).done(function () {
   window.location.href = HOME;
  });
}



//after loadding all function,run it
$(function () {
  getUserApi(renderContent);
});
