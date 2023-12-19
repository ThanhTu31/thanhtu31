// Swiper
var swiper = new Swiper(".home", {
    spaceBetween: 30,
    centeredSlides: true,
    
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
});

let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
  menu.classList.toggle('bx-x');
  navbar.classList.toggle('active');
}

window.onscroll = () => {
  menu.classList.remove('bx-x');
  navbar.classList.remove('active');
}

/* Thêm comment */
function addComment() {
  var name = document.getElementById('comment-name').value;
  var commentText = document.getElementById('comment-text').value;

  var commentElement = document.createElement('div');
  commentElement.classList.add('comment-box');
  commentElement.innerHTML = '<strong>' + name + ':</strong> ' + commentText;

  document.getElementById('comments-container').appendChild(commentElement);

  document.getElementById('comment-name').value = '';
  document.getElementById('comment-text').value = '';
}

// main.js

// Dữ liệu giỏ hàng mẫu (thay thế bằng dữ liệu động của bạn)
const cartItems = [
  { id: 'Peach', name: 'Farm fresh organic Fruits 250g - Peach', price: 7.99, quantity: 2 },
  // Thêm nhiều mục khác nếu cần
];

// Hàm cập nhật tổng giá cho một mục cụ thể
function updateTotal(itemId) {
  const quantityInput = document.getElementById(`quantity-${itemId}`);
  const totalSpan = document.getElementById(`total-${itemId}`);
  const item = cartItems.find(item => item.id === itemId);

  if (item && quantityInput && totalSpan) {
      const newQuantity = parseInt(quantityInput.value);
      const newTotal = (newQuantity * item.price).toFixed(2);
      totalSpan.textContent = `${newTotal}$`;

      // Cập nhật số lượng trong mảng cartItems
      item.quantity = newQuantity;

      // Cập nhật tổng kết giỏ hàng
      updateCartSummary();
  }
}

// Hàm cập nhật tổng kết giỏ hàng (tổng số mục và tổng giá)
function updateCartSummary() {
  const totalItemsSpan = document.getElementById('total-items');
  const totalPriceSpan = document.getElementById('total-price');

  if (totalItemsSpan && totalPriceSpan) {
      const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = cartItems.reduce((sum, item) => sum + item.quantity * item.price, 0).toFixed(2);

      totalItemsSpan.textContent = totalItems.toString();
      totalPriceSpan.textContent = `${totalPrice}$`;
  }
}

// Hàm cập nhật số lượng trong mảng cartItems
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

// Cập nhật ban đầu cho tổng kết giỏ hàng
updateCartSummary();
