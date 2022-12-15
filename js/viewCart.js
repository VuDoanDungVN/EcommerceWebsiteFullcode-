//Show giỏ hàng lên 1 trang khác 
function showViewCart() {
  var dataCart = sessionStorage.getItem("cartView");
  var cartViews = JSON.parse(dataCart); // Cố ý để trùng tên biến để show cho nhanh
  var infoProduct = "";
  var sumTotal = 0;
  if (cartViews != null) {
    for (let i = 0; i < cartViews.length; i++) {
      var price = cartViews[i][2] * cartViews[i][3];
      var number = i + 1;
      sumTotal += price;
      infoProduct += '<tr>' +
        '<td>' + number + '</td>' +
        '<td><img src="' + cartViews[i][0] + '" style="margin: 0px auto;"></img></td>' +
        '<td style="text-align: left;margin: 0 10px;color:#111;">' + cartViews[i][1] + '</td>' +
        // '<td>'+cartView[i][2].toLocaleString('en-US') +'</td>'+
        '<td>' + cartViews[i][3] + '</td>' +
        '<td>' + price.toLocaleString('ja-JP') + '</td>' +
        // '<td><button class="deleteBtn" onclick="deleteProduct(this)"><i class="fa-solid fa-trash"></i></button></td>' +
        '</tr>';
    }
    infoProduct += '<tr style="background-color: #dadada;">' +
      '<td colspan="4" style="font-size: 15px;text-align: right;padding: 10px 30px;">Totals : </td>' +
      '<td colspan="2" style="font-size: 15px;text-align: left;padding: 10px 10px;">' + sumTotal.toLocaleString('ja-JP') + '</td>' +  //.toLocaleString('en-US') dùng để them dấu phẩy ngăn cách trong Javascripts
      '</tr>';

  } else {
    infoProduct += '<div class="empty-cart"><img src="img/empty-cart.svg" class="img-empty"><span>商品をご注意ください</span></div>';
  }
  document.getElementById("showView").innerHTML = infoProduct;
  document.getElementById("count").innerHTML = cartView.length;
}

showViewCart();
var checkinfo = new Array();
function confirmBtn() {
  var confirmData = document.getElementById("formCheck").children;
  var confirmName = confirmData[2].value;
  var confirmDepartment = confirmData[4].value;
  var confirmID = confirmData[6].value;
  var confirmMail = confirmData[8].value;
  //alert(confirmMail);

  var customer = new Array(confirmName, confirmDepartment, confirmID, confirmMail);
  checkinfo.push(customer);
  if (confirmID == "") {
    alert('お客様の情報を記入してください！');
  } else {
    sessionStorage.setItem("customer", JSON.stringify(customer));
    // Đoạn code này để chuyển trang sang 1 tab mới
    window.location.assign("oderProduct.html");
  }
  //console.log(customer);
}

// Đoạn này hàm Function để show thông tin khách hàng
function showDataCustomer() {
  //Cách lấy thông tin khách hàng từ SessionStorge
  var customer = sessionStorage.getItem("customer");
  var data = JSON.parse(customer);
  var dataJson = '<h3>ご注意完了</h3>' +
    '<label style="margin:10px 0px;" for="fname"><i class="fa fa-user"></i> お名前 :</label>' +
    data[0] +
    '<label style="margin:10px 0px;" for="email"><i class="fa fa-institution"></i> 所属会社 :</label>' +
    data[1] +
    '<label style="margin:10px 0px;" for="adr"><i class="fa fa-address-card-o"></i> 社員ID :</label>' +
    data[2] +
    '<label style="margin:10px 0px;" for="city"><i class="fa fa-envelope"></i> メール :</label>' +
    data[3];
  document.getElementById("mainForm").innerHTML = dataJson;
}

