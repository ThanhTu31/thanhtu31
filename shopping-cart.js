// shopping-cart.js

// Mảng chứa các mục trong giỏ hàng (cập nhật với dữ liệu thực của bạn)
const cartItems = [
    { id: 'Peach', name: 'Farm fresh organic Fruits 250g - Peach', price: 7.99, quantity: 2 },
    // Thêm các mục khác nếu cần
];

// Hàm hiển thị giỏ hàng
function displayCart() {
    const cartContainer = document.getElementById('cart-items');

    // Xóa mọi thứ trong giỏ hàng trước khi hiển thị lại
    cartContainer.innerHTML = '';

    // Hiển thị từng mục trong giỏ hàng
    cartItems.forEach(item => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.classList.add('cart-item');

        cartItemDiv.innerHTML = `
            <div class="item-info">
                <h3>${item.name}</h3>
                <p>Price: ${item.price}$</p>
            </div>
            <div class="item-quantity">
                <label for="quantity-${item.id}">Quantity:</label>
                <input type="number" id="quantity-${item.id}" value="${item.quantity}" min="1" onchange="updateQuantity('${item.id}')">
            </div>
            <div class="item-total">
                <p>Total: <span id="total-${item.id}">${(item.quantity * item.price).toFixed(2)}$</span></p>
            </div>
            <button onclick="removeFromCart('${item.id}')">Remove</button>
        `;

        cartContainer.appendChild(cartItemDiv);
    });
}

// Hàm cập nhật số lượng trong giỏ hàng
function updateQuantity(itemId) {
    const quantityInput = document.getElementById(`quantity-${itemId}`);
    const item = cartItems.find(item => item.id === itemId);

    if (item && quantityInput) {
        const newQuantity = parseInt(quantityInput.value);
        item.quantity = newQuantity;

        // Cập nhật tổng kết giỏ hàng
        updateCartSummary();
    }
}

// Hàm xóa một mục khỏi giỏ hàng
function removeFromCart(itemId) {
    const itemIndex = cartItems.findIndex(item => item.id === itemId);

    if (itemIndex !== -1) {
        cartItems.splice(itemIndex, 1);

        // Cập nhật tổng kết giỏ hàng
        updateCartSummary();
    }
}

// Hàm cập nhật tổng kết giỏ hàng (tổng số mục và tổng giá)
function updateCartSummary() {
    // Cập nhật giỏ hàng trên giao diện
    displayCart();

    const totalItemsSpan = document.getElementById('total-items');
    const totalPriceSpan = document.getElementById('total-price');

    if (totalItemsSpan && totalPriceSpan) {
        const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = cartItems.reduce((sum, item) => sum + item.quantity * item.price, 0).toFixed(2);

        totalItemsSpan.textContent = totalItems.toString();
        totalPriceSpan.textContent = `${totalPrice}$`;
    }
}

// Cập nhật ban đầu cho tổng kết giỏ hàng
updateCartSummary();
