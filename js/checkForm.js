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
                '<td><button class="deleteBtn" onclick="deleteProduct(this)"><i class="fa-solid fa-trash"></i></button></td>' +
                '</tr>';
        }
        infoProduct += '<tr style="background-color: #dadada;">' +
            '<td colspan="4" style="font-size: 15px;text-align: right;padding: 10px 30px;">Totals : </td>' +
            '<td colspan="2" style="font-size: 15px;text-align: left;padding: 10px 10px;">' + sumTotal.toLocaleString('ja-JP') + '</td>' +  //.toLocaleString('en-US') dùng để them dấu phẩy ngăn cách trong Javascripts
            '</tr>';

    } else {
        infoProduct += "  商品をご注意ください";
    }
    document.getElementById("showView").innerHTML = infoProduct;
}
function validateForm() {

    // Truy cập vào msdForm
    var msgForm = document.querySelector('.msg');
    //Reset thông báo kiểm tra dữ liệu
    msgForm.innerHTML = '';
    // Truy cập vào thành phần HTML tương ứng
    let fullnameForm = document.forms["myForm"]["fname"];
    let departmentForm = document.forms["myForm"]["department"];
    let idForm = document.forms["myForm"]["id"];
    let mailForm = document.forms["myForm"]["mail"];

    //Lấy giá trị người dùng nhập vào
    let fullName = fullnameForm.value;
    let department = departmentForm.value;
    let id = idForm.value;
    let mail = mailForm.value;

    //Reset thông báo
    var requiredForm = document.querySelectorAll('.required');
    if (requiredForm.length > 0) {
        requiredForm.forEach(function (item) {
            item.innerHTML = '';
        });
    }
    let gokei = "";
    let errors = {};
    if (fullName.trim() == '') {
        errors['fullname'] = '姓と名を空白にすることはできません!';
        msgForm.innerHTML = '<div class="messageForm"><i class="fa-solid fa-triangle-exclamation"></i>データをチェックしてください!</div>';
        fullnameForm.parentElement.querySelector('.required').innerHTML = errors['fullname'];
        return false;
    }

    if (department.trim() == '') {
        errors['department'] = '所属会社を空白にすることはできません!';
        msgForm.innerHTML = '<div class="messageForm"><i class="fa-solid fa-triangle-exclamation"></i>データをチェックしてください!</div>';
        departmentForm.parentElement.querySelector('.required').innerHTML = errors['department'];
        return false;
    }

    if (id.trim() == '') {
        errors['id'] = '社員IDを空白にすることはできません!';
        msgForm.innerHTML = '<div class="messageForm"><i class="fa-solid fa-triangle-exclamation"></i>データをチェックしてください!</div>';
        idForm.parentElement.querySelector('.required').innerHTML = errors['id'];
        return false;
    }

    if (mail.trim() == '') {
        errors['mail'] = 'メールを空白にすることはできません!';
        msgForm.innerHTML = '<div class="messageForm"><i class="fa-solid fa-triangle-exclamation"></i>データをチェックしてください!</div>';
        mailForm.parentElement.querySelector('.required').innerHTML = errors['mail'];
        return false;
    }

    if (Object.keys(errors).length == 0) {
        var data = {
            'entry.889287737': fullName,
            'entry.449175572': department,
            'entry.753131604': id,
            'entry.2135952350': mail

        }
        let queryString = new URLSearchParams(data);
        queryString = queryString.toString();

        msgForm.innerHTML = '<div class="messageFormSusscess">Loading...</div>';
        sessionStorage.setItem("cartView", JSON.stringify(cartView));
        cartView = [];
        showCart();
        let xhr = new XMLHttpRequest();
        xhr.open("POST", 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSfZceN9ttzLZeimQyiFJN5DCjDLnu-YvEqxxD6LgotCqImxpQ/formResponse', true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        msgForm.innerHTML = '<div class="messageFormSusscess"><i class="fa-solid fa-envelope-circle-check"></i>商品が購入されました</div>';
        //Reset biểu mẫu sau khi gửi.
        fullnameForm.value = '';
        departmentForm.value = '';
        idForm.value = '';
        mailForm.value = '';
        //Gửi lên biểu mẫu
        xhr.send(queryString);

        //Trường hợp = 0 sẽ không có lỗi gì


    } else {
        msgForm.innerHTML = '<div class="messageForm"><i class="fa-solid fa-triangle-exclamation"></i>データをチェックしてください!</div>';
    }
}
