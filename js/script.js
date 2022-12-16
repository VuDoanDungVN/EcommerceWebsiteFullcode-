const header = document.querySelector("header");

window.addEventListener("scroll", function () {
	header.classList.toggle("sticky", window.scrollY > 0);
});

let menu = document.querySelector('#menu-icon');
let navlist = document.querySelector('.navlist');

menu.onclick = () => {
	menu.classList.toggle('bx-x');
	navlist.classList.toggle('open');
};

window.onscroll = () => {
	menu.classList.remove('bx-x');
	navlist.classList.remove('open');
};

const sr = ScrollReveal({
	distance: '30px',
	duration: 2600,
	reset: true
})

sr.reveal('.home-text', { delay: 280, origin: 'bottom' })

sr.reveal('.featured,.cta,.new,.brand,.contact', { delay: 200, origin: 'bottom' })


//Truy xuất đối tượng
document.getElementById("box-table").style.display = "none";

var cartView = new Array();
var msg = document.querySelector('#toast');
msg.innerHTML = '';
if (sessionStorage.getItem("cartView")) {
	document.getElementById("count").innerHTML = cartView.length;
	cartView = JSON.parse(sessionStorage.getItem("cartView"));
}
function addCart(x) {
	var product = x.parentElement.children;
	var productImg = product[0].src;
	var productName = product[1].innerHTML;
	var productPrice = product[2].children[0].innerHTML;
	var productQuantity = 1;
	var item = new Array(productImg, productName, productPrice, productQuantity);
	// Lấy dữ liệu xuống để bổ sung vào 
	//(cách để không bị ghi đè sản phẩm khi đặt hàng quay qua trang khác ấn đặt hàng lại bị mất hàng đã đặt)
	if (sessionStorage.getItem("cartView")) {
		cartView = JSON.parse(sessionStorage.getItem("cartView"));
	}

	//Kiểm tra số lượng trong giỏ hàng nếu trùng sẽ hiển thị đúng số lượng
	var checkQuantity = 0;
	for (let i = 0; i < cartView.length; i++) {
		if (cartView[i][1] == productName) {
			checkQuantity = 1;
			cartView[i][3] = productQuantity;
			msg.innerHTML = '<div class="toast toast--error"><div class="toast__icon"><i class="fa-solid fa-triangle-exclamation"></i></div><div class="toast__body"><h3 class="toast__title__error">Error</h3><p class="toast_msg__error">同じカートで購入できる商品は 1つだけです</p></div><div class="toast__close"><i class="fa-solid fa-xmark"></i></div></div>';
			break;
		}

	}
	if (checkQuantity == 0) {
		cartView.push(item);
		document.getElementById("count").innerHTML = cartView.length;
		msg.innerHTML = '<div class="toast toast--success"><div class="toast__icon"><i class="fa-solid fa-cart-plus"></i></div><div class="toast__body"><h3 class="toast__title">Added</h3><p class="toast_msg">カールに追加しました。</p></div><div class="toast__close"><i class="fa-solid fa-xmark"></i></div></div>';
	}
	//alert(productPrice);

	showCart();
	sessionStorage.setItem("cartView", JSON.stringify(cartView));
	//Lưu thông tin lên Storage (đi đến bất cứ đâu vẫn lưu đc giá  trị đã chọn)

}

// Xóa sản phẩm
function deleteProduct(x) {
	//Xóa tr trong bảng
	var tr = x.parentElement.parentElement;
	var nameProduct = tr.children[2].innerHTML;
	//alert(nameProduct);
	tr.remove();
	//Xóa mảng Array
	for (let i = 0; i < cartView.length; i++) {
		if (cartView[i][1] == nameProduct) {
			cartView.splice(i, 1);   //Để xóa phần tử trong mảng sử dụng hàm splice
		}
	}
	//console.log(cartView);
	showCart();  // Xóa xong phải cập nhật lại giỏ hàng bằng lệnh này
	sessionStorage.setItem("cartView", JSON.stringify(cartView));
	document.getElementById("count").innerHTML = cartView.length;
}

//Xóa tất cả sản phẩm trong giỏ hàng
function deleteAllProduct() {
	// alert("Bạn có chắc chắn muốn xóa hết không?");                                             
	cartView = [];
	showCart();
	sessionStorage.setItem("cartView", JSON.stringify(cartView));
	document.getElementById("count").innerHTML = cartView.length;
	msg.innerHTML = '<div class="toast toast--danger"><div class="toast__icon"><i class="fa-solid fa-triangle-exclamation"></i></div><div class="toast__body"><h3 class="toast__title__danger">注意　：</h3><p class="toast_msg__danger">削除しました。</p></div><div class="toast__close"><i class="fa-solid fa-xmark"></i></div></div>';
}

// Hiển thị Cart khi bấm vào biểu tượng giỏ hàng
function showcartbtn() {
	var x = document.getElementById("box-table");
	if (x.style.display == "block") {
		x.style.display = "none";
	} else {
		x.style.display = "block";
	}

}
//Hiển thị Product
function showCart() {
	var infoProduct = "";
	var sumTotal = 0;
	for (let i = 0; i < cartView.length; i++) {
		var price = cartView[i][2] * cartView[i][3];
		var number = i + 1;
		sumTotal += price;
		infoProduct += '<tr>' +
			'<td>' + number + '</td>' +
			'<td><img src="' + cartView[i][0] + '"></img></td>' +
			'<td style="overflow:hidden;height:15px;color:#111;">' + cartView[i][1] + '</td>' +
			// '<td>'+cartView[i][2]+'</td>'+
			'<td>' + cartView[i][3] + '</td>' +
			'<td>' + price.toLocaleString('en-US') + '</td>' +
			'<td><button class="deleteBtn" onclick="deleteProduct(this)"><i class="fa-solid fa-trash"></i></button></td>' +
			'</tr>';
	}
	infoProduct += '<tr>' +
		'<td colspan="3" style="font-size: 15px;text-align: right;padding: 10px 30px;">合計</td>' +
		'<td colspan="1" style="font-size: 15px;text-align: left;padding: 10px 10px;">' + sumTotal.toLocaleString('en-US') + '</td>' +
		'</tr>';
	document.getElementById("showView").innerHTML = infoProduct;

}


