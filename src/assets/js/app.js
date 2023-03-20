// DATA:
const products = [
	{"id" : 1, "name" : "Soko Maizemeal", "desc" : "1kg packet", "price": 200.00, "min" : 1, "max" : 20},
	{"id" : 2, "name" : "Mumias Sugar", "desc" : "1/2kg packet", "price": 350.55, "min" : 1, "max" : 20},
	{"id" : 3, "name" : "Uchumi Sandwich", "desc" : "Beef flavour", "price": 225.31, "min" : 1, "max" : 20},
	{"id" : 4, "name" : "Nivea Men Deodorant", "desc" : "100ml", "price": 455.00, "min" : 1, "max" : 20},
	{"id" : 5, "name" : "Pampers Diapers", "desc" : "Pack of 12 diapers", "price": 2250.01, "min" : 1, "max" : 20},
	{"id" : 6, "name" : "Haco Ruler", "desc" : "30 cm ruler", "price": 50.00, "min" : 1, "max" : 20},
	{"id" : 7, "name" : "Ketepa Tea Bags", "desc" : "Pack of 30 tea bags", "price": 55.03, "min" : 1, "max" : 20},
	{"id" : 8, "name" : "Omo Detergent", "desc" : "250g pack", "price": 175.07, "min" : 1, "max" : 20},
	{"id" : 9, "name" : "Persil Detergent", "desc" : "250g pack", "price": 185.99, "min" : 1, "max" : 20},
	{"id" : 10, "name" : "Ariel Detergent", "desc" : "250g pack", "price": 175.50, "min" : 1, "max" : 20},
	{"id" : 11, "name" : "Panadol Paracetemol", "desc" : "Pack of 8 tablets", "price": 25.00, "min" : 1, "max" : 20},
	{"id" : 12, "name" : "Total Cooking Gas", "desc" : "13kg cylinder", "price": 2550.00, "min" : 1, "max" : 20},
	{"id" : 13, "name" : "Colgate Toothpaste", "desc" : "200ml pack", "price": 205.00, "min" : 1, "max" : 20},
	{"id" : 14, "name" : "Haco Pencil", "desc" : "Staedler brand", "price": 5.00, "min" : 1, "max" : 20},
	{"id" : 15, "name" : "Blueband Margarine", "desc" : "500ml pack", "price": 255.50, "min" : 1, "max" : 20},
	{"id" : 16, "name" : "Cadbury's Drinking Chocolate", "desc" : "100g pack", "price": 210.00, "min" : 1, "max" : 20},
	{"id" : 17, "name" : "Eveready Batteries", "desc" : "Set of 4 batteries", "price": 355.00, "min" : 1, "max" : 20},
	{"id" : 18, "name" : "Duracel Batteries", "desc" : "Set of 4 batteries", "price": 575.00, "min" : 1, "max" : 20},
	{"id" : 19, "name" : "Energiser Batteries", "desc" : "Set of 4 batteries", "price": 585.00, "min" : 1, "max" : 20},
	{"id" : 20, "name" : "Haco Sharpener", "desc" : "Staedler brand", "price": 215.00, "min" : 1, "max" : 20},
	{"id" : 21, "name" : "Kasuku Exercise Book", "desc" : "A4 size, 200 pages", "price": 25.00, "min" : 1, "max" : 20},
];

// Variables & targets
const productsContainer = document.querySelector('#products_container');
const shoppingCartTable = document.querySelector('#shopping-cart-table');
const cartContainer = document.querySelector('#cart_container');
const alertDiv = document.querySelector('.alert');
const deleteModalContentContainer = document.querySelector('#delete-modal-content-container');
const shoppingCartBtn = document.querySelector('#btn-shopping-cart');

const localStorageKey = 'shopping_cart';

// FUNCTIONS:

// 1. Render products
function renderProducts() {

	if(products.length > 0) {

		products.forEach(function(item) {

			let activity = ifInCart(item.id) ? 'inactive' : 'active';

			let tr = document.createElement('tr');
				tr.classList.add('tr-product');
				tr.classList.add(activity);
				tr.setAttribute('data-id', item.id);
				tr.setAttribute('data-name', item.name);
				tr.setAttribute('data-desc', item.desc);
				tr.setAttribute('data-price', item.price);
				tr.setAttribute('data-min', item.min);
				tr.setAttribute('data-max', item.max);
				
				let td1 = document.createElement('td');
				td1.classList.add('particulars');
				let h1 = document.createElement('h6');
				h1.classList.add('text-primary');
				h1.textContent = item.name;
				td1.appendChild(h1);
				let p1 = document.createElement('p');
				p1.textContent = item.desc;
				td1.appendChild(p1);
				tr.appendChild(td1);

				let td2 = document.createElement('td');
				td2.classList.add('price');
				let span1 = document.createElement('span');
				span1.textContent = item.price;
				td2.appendChild(span1);
				tr.appendChild(td2);

				let td3 = document.createElement('td');
				let input1 = document.createElement('input');
				input1.classList.add('form-control');
				input1.setAttribute('type', 'number');
				input1.setAttribute('name', 'quantity');
				input1.setAttribute('value', 1);
				input1.setAttribute('min', item.min);
				input1.setAttribute('max', item.max);
				td3.appendChild(input1);
				tr.appendChild(td3);

				let td4 = document.createElement('td');
				let button1 = document.createElement('button');
				button1.classList.add('btn');
				button1.classList.add('btn-sm');
				button1.classList.add('btn-primary');
				button1.classList.add('btn-add');
				button1.setAttribute('type', 'button');
				button1.setAttribute('id', 'add-' + item.id);
				let i1 = document.createElement('i');
				i1.classList.add('fas');
				i1.classList.add('fa-plus');
				i1.classList.add('on-target');
				button1.appendChild(i1);
				td4.appendChild(button1);
				tr.appendChild(td4);

			productsContainer.appendChild(tr);

		});
	}
}

// 2. Alert
function alert(message, type) {

	alertDiv.classList.add('alert-' + type);
	alertDiv.classList.add('show');
	alertDiv.innerHTML = message;

	setTimeout(function() {

		alertDiv.classList.remove('alert-' + type);
		alertDiv.classList.remove('show');

	}, 5000);
}

// 2. Check if product is in shopping cart
function ifInCart(id) {

	if(getFromLocalStorage(id).length > 0) {

		return true;

	} else {
		
		return false;
	}
}

// 3. Render Cart Item
function renderCartItem(id, name, desc, price, min, max, quantity) {

	const cartContainer = document.querySelector('#cart_container');
	const trCartItems = document.querySelectorAll('.tr-cart-item');

	let tr = document.createElement('tr');
	tr.classList.add('tr-cart-item');
	tr.setAttribute('data-id', id);
	tr.setAttribute('data-name', name);
	tr.setAttribute('data-desc', desc);
	tr.setAttribute('data-price', price);

		let td1 = document.createElement('td');
		td1.classList.add('close');
		let button1 = document.createElement('button');
		button1.setAttribute('type', 'button');
		button1.setAttribute('id', 'delete-' + id);
		button1.classList.add('btn');
		button1.classList.add('btn-delete');
		button1.classList.add('btn-outline-secondary');
		let i1 = document.createElement('i');
		i1.classList.add('fas');
		i1.classList.add('fa-close');
		button1.appendChild(i1);
		td1.appendChild(button1);
		tr.appendChild(td1);

		let td2 = document.createElement('td');
		td2.classList.add('name');
		let h1 = document.createElement('h6');
		h1.textContent = name;
		let p1 = document.createElement('p');
		p1.classList.add('description');
		p1.textContent = desc;
		td2.appendChild(h1);
		td2.appendChild(p1);
		tr.appendChild(td2);

		let td3 = document.createElement('td');
		td3.classList.add('amount');
		td3.textContent = price;
		tr.appendChild(td3);

		let td4 = document.createElement('td');
		td4.classList.add('quantity');
		let div1 = document.createElement('div');
		div1.classList.add('input-group');
		let input1 = document.createElement('input');
		input1.classList.add('form-control');
		input1.setAttribute('type', 'number');
		input1.setAttribute('value', quantity);
		input1.setAttribute('max', max);
		input1.setAttribute('min', min);
		input1.setAttribute('id', 'value-' + id);
		let button2 = document.createElement('button');
		button2.classList.add('btn');
		button2.classList.add('btn-outline-secondary');
		button2.setAttribute('type', 'button');
		button2.setAttribute('id', 'update-' + id);
		button2.textContent = 'update';
		div1.appendChild(input1);
		div1.appendChild(button2);
		td4.appendChild(div1);
		tr.appendChild(td4);

		let td5 = document.createElement('td');
		td5.classList.add('total');
		let span1 = document.createElement('span');
		span1.textContent = quantity * price;
		td5.appendChild(span1);
		tr.appendChild(td5);

	cartContainer.insertBefore(tr, cartContainer.firstChild);

	// Event listeners:

	// 1. Update
	const updateSingle = document.querySelector('#update-' + id);
	const updatedQuantity = document.querySelector('#value-' + id);

	updateSingle.addEventListener('click', function(e) {

		quantity = updatedQuantity.value;
		span1.textContent = quantity * price;

		// Update localstorage
		editLocalStorage(id, name, desc, price, quantity);

		alert('<strong>' + name + '</strong> updated successfully', 'success');

	});

	// 2. Delete
	const deleteBtn = document.querySelector('#delete-' + id);

	deleteBtn.addEventListener('click', function(e) {

		const deleteElement = deleteModalContentContainer;

		deleteElement.children[0].dataset.id = id;
		deleteElement.children[0].dataset.name = name;
		deleteElement.children[0].children[1].children[0].childNodes[1].textContent = name;

		deleteElement.classList.add('open');

	});
}

// 4. Render Cart Coupon
function renderCartCoupon() {

	let tr = document.createElement('tr');
		tr.classList.add('coupon');

		let td1 = document.createElement('td');
		td1.setAttribute('colspan', '5');
		td1.classList.add('text-end');
		let div1 = document.createElement('div');
		div1.classList.add('input-group');
		div1.classList.add('input-coupon');
		let input1 = document.createElement('input');
		input1.classList.add('form-control');
		input1.setAttribute('type', 'text');
		input1.setAttribute('placeholder', 'Coupon Code');
		let div2 = document.createElement('div');
		div2.classList.add('input-group-append');
		div2.setAttribute('id', 'coupon-addon');
		let btn1 = document.createElement('button');
		btn1.setAttribute('type', 'submit');
		btn1.setAttribute('name', 'coupon');
		btn1.classList.add('btn');
		btn1.classList.add('btn-outline-primary');
		btn1.textContent = 'apply coupon';
		div2.appendChild(btn1);
		div1.appendChild(input1);
		div1.appendChild(div2);
		td1.appendChild(div1);
		tr.appendChild(td1);

	cart_container.appendChild(tr);
}

// 4. Render Cart Totals
function renderCartTotals() {

	let tr = document.createElement('tr');
		tr.classList.add('grand_total');
		
		let td1 = document.createElement('td');
		td1.setAttribute('colspan', '4');
		let h1 = document.createElement('h4');
		h1.textContent = 'Grand Total (Ksh.)';
		td1.appendChild(h1);
		tr.appendChild(td1);

		let td2 = document.createElement('td');
		td2.classList.add('total');
		let h2 = document.createElement('h4');
		h2.textContent = getGrandTotal();
		td2.appendChild(h2);
		tr.appendChild(td2);

	cartContainer.appendChild(tr);
}

// 4. Get grand totals
function getGrandTotal() {

	const items = getAllFromLocalStorage();
	let total = 0;

	if(items.length > 0) {

		total = items.map(function(item) {

			let total =+ item.price * item.quantity;

			return total;
		});

		return total;
	
	} else {

		return "0.00";
	}	
}

// 5. Render shopping cart button
function renderShoppingCartBtn() {

	const items = getAllFromLocalStorage();
	
	if(items.length > 0) {

		shoppingCartBtn.children[0].textContent = items.length;
	
	} else {

		shoppingCartBtn.children[0].textContent = "";
	}
}

// 6. Check cart table once a cart record has been altered in any way eg. added or deleted
function checkCartTable() {

	const items = getAllFromLocalStorage();

	// If shopping cart has items
	if(items.length > 0) {

		// show grand total & coupon form
		let elements = shoppingCartTable.children[1].children;

		for(i=0; i < elements.length; i++) {

			if(elements[i].classList.contains('coupon') || elements[i].classList.contains('grand_total')) {

				elements[i].classList.add('show')
			}
		}

	// else if shopping cart has NO items
	} else {
		
		// hide grand total & coupon form
		let elements = shoppingCartTable.children[1].children;

		for(i=0; i < elements.length; i++) {

			if(elements[i].classList.contains('coupon') || elements[i].classList.contains('grand_total')) {

				elements[i].classList.remove('show')
			}
		}

		// show "No Items" message

		const tr = `<tr>
						<td colspan="5">
							<h4 class="my-5 py-5 text-center">There are currently no items in your Shopping Cart.</h4>
						</td>
					</tr>`;

		// cartContainer.innerHTML = tr;
	}
}

// 4. Close modal
function closeModal() {

	deleteModalContentContainer.classList.remove('open');
}

// EVENT LISTENERS:

// 1. If `Add To Cart` button has been clicked
productsContainer.addEventListener('click', function(e) {

	e.preventDefault(); // prevent page refresh upon click

	if(e.target.classList.contains('on-target')) { // if on target

		const element = e.target.parentElement.parentElement.parentElement;
		const id = element.dataset.id;
		const name = element.dataset.name;
		const desc = element.dataset.desc;
		const price = element.dataset.price;
		const min = element.dataset.min;
		const max = element.dataset.max;
		const quantity = element.children[2].children[0].value;

		// Check if already in localstorage
		if(getFromLocalStorage(id).length == 0) {

			// Add to local storage
			addToLocalStorage(id, name, desc, price, min, max, quantity);

			// Add to DOM
			renderCartItem(id, name, desc, price, min, max, quantity);

			// Update shopping cart btn
			renderShoppingCartBtn();

			// check table
			checkCartTable();

			// mark product as inactive
			element.classList.replace('active', 'inactive');

			// Alert
			alert('<strong>' + name + '</strong> added to your cart successfully', 'success');

		} else {

			alert('<strong>'+name+'</strong> has already been added to your shopping cart', 'danger');
		}		
	}
});

// 2. If DELETE button on the modal has been clicked
deleteModalContentContainer.addEventListener('submit', function(e) {

	e.preventDefault();

	const id = e.currentTarget.children[0].dataset.id;
	const name = e.currentTarget.children[0].dataset.name;

	// delete from local storage
	deleteFromLocalStorage(id);

	// delete from DOM
	let items = document.querySelectorAll('.tr-cart-item');
	items.forEach(function(item) {

		if(item.dataset.id == id) {

			item.parentElement.removeChild(item);
		}
	});

	// re-activate the corresponding ADD button on the product table
	const trProducts = document.querySelectorAll('.tr-product');
	
	if(trProducts.length > 0) {

		trProducts.forEach(function(item) {

			if(item.dataset.id == id) {

				item.classList.replace('inactive', 'active');
			}
		});
	}
	
	// Update shopping cart btn
	renderShoppingCartBtn();

	// check table
	checkCartTable();

	closeModal();

	alert('<strong>'+name+'</strong> deleted from your cart successfully', 'success');
});

// LOCAL STORAGE:

// 1. Add to local storage
function addToLocalStorage(id, name, desc, price, min, max, quantity) {

	const array = getAllFromLocalStorage();

	const date_time_created = '2022-12-25 20:45:58';
	const date_time_modified = '2022-12-25 20:45:58';

	array.push({id:id, name:name, desc:desc, price:price, min:min, max:max, quantity:quantity, date_time_created:date_time_created, date_time_modified:date_time_modified});

	localStorage.setItem(localStorageKey, JSON.stringify(array));
}

// 2. Get single record from local storage
function getFromLocalStorage(id) {

	let array = getAllFromLocalStorage();

	return array.filter(function(item) {

		if(item.id == id) {
			
			return item;
		}
	});
}

// 3. Edit single record in localstorage
function editLocalStorage(id, name, desc, price, quantity) {

	let array = getAllFromLocalStorage();

	const date_time = '2023-01-01 20:00:01';

	array.map(function(item) {

		if(item.id == id) {

			item.quantity = quantity;
			item.date_time_modified = date_time;			
		}

		return item;
	});

	localStorage.setItem(localStorageKey, JSON.stringify(array));
}

// 4. Delete single record from local storage
function deleteFromLocalStorage(id) {

	let oldArray = getAllFromLocalStorage();

	let array = oldArray.filter(function(item) {

		if(item.id !== id) {

			return item;
		}
	});

	localStorage.setItem(localStorageKey, JSON.stringify(array));
}

// 5. Get All from local storage
function getAllFromLocalStorage() {

	return localStorage.getItem(localStorageKey) ? JSON.parse(localStorage.getItem(localStorageKey)) : [];
}

// 6. Get shopping cart records from local storage & render on page
function getCartRecordsFromLocalStorage() {

	const cartRecords = getAllFromLocalStorage();

	// render cart items
	if(cartRecords.length > 0) {

		// render cart items
		cartRecords.forEach(function(item) {

			renderCartItem(item.id, item.name, item.desc, item.price, item.min, item.max, item.quantity);

		});

	} else {

		alert('Please add products to your shopping cart', 'info');
	}

	// render cart coupon
	renderCartCoupon();

	// render cart totals
	renderCartTotals();
}

// RUN: DOM content loaded
window.addEventListener('DOMContentLoaded', function() {

	// 1. Render products
	renderProducts();

	// 2. Render shopping cart
	getCartRecordsFromLocalStorage();

	// 3. Check shopping cart table
	checkCartTable();

	// 4. Render shopping cart button
	renderShoppingCartBtn();

});

