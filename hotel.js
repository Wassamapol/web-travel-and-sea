let cart = []; // ตัวแปรเก็บข้อมูลสินค้าในตะกร้า

// ฟังก์ชันเพิ่มสินค้าลงในตะกร้า
function addToCart(button) {
    // ดึงข้อมูลจากปุ่มที่คลิก
    var productName = button.previousElementSibling.previousElementSibling.textContent; // ชื่อสินค้า
    var productPrice = parseFloat(button.previousElementSibling.textContent.replace('$', '').trim()); // ราคา

    // ตรวจสอบว่ามีสินค้านี้ในตะกร้าหรือยัง
    const existingItem = cart.find(item => item.name === productName);
    if (existingItem) {
        // ถ้ามีสินค้าแล้ว เพิ่มจำนวน
        existingItem.quantity++;
    } else {
        // ถ้ายังไม่มีสินค้าในตะกร้า เพิ่มสินค้าลงไป
        cart.push({ name: productName, price: productPrice, quantity: 1 });
    }

    // อัปเดต UI ของตะกร้า
    updateCartUI();
}

// ฟังก์ชันอัปเดต UI ของตะกร้า
function updateCartUI() {
    const cartList = document.getElementById('cart-list');
    const totalPriceElement = document.getElementById('total-price');
    cartList.innerHTML = ''; // เคลียร์รายการเก่า

    // สร้างรายการสินค้าในตะกร้าใหม่
    cart.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name} - ${item.price} บาท x ${item.quantity} = ${(item.price * item.quantity) . toFixed(2)}`

        // ปุ่มเพิ่มจำนวนสินค้า
        const increaseButton = document.createElement('button');
        increaseButton.textContent = '+';
        increaseButton.onclick = () => updateQuantity(index, 1); // เพิ่มจำนวน
        listItem.appendChild(increaseButton);

        // ปุ่มลดจำนวนสินค้า
        const decreaseButton = document.createElement('button');
        decreaseButton.textContent = '-';
        decreaseButton.onclick = () => updateQuantity(index, -1); // ลดจำนวน
        listItem.appendChild(decreaseButton);

        // ปุ่มลบสินค้า
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.onclick = () => removeFromCart(index); // ลบสินค้า
        listItem.appendChild(removeButton);

        // เพิ่มรายการใน UI
        cartList.appendChild(listItem);
    });

    // คำนวณราคารวมและอัปเดต UI
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    totalPriceElement.textContent = totalPrice.toFixed(2); // แสดงราคาทั้งหมด
}

// ฟังก์ชันอัปเดตจำนวนสินค้า
function updateQuantity(index, amount) {
    const item = cart[index];
    if (item.quantity + amount <= 0) {
        // ถ้าจำนวนสินค้าจะเป็นลบหรือศูนย์ ให้ลบสินค้า
        removeFromCart(index);
    } else {
        item.quantity += amount;
        updateCartUI(); // อัปเดต UI
    }
}

// ฟังก์ชันลบสินค้าออกจากตะกร้า
function removeFromCart(index) {
    cart.splice(index, 1); // ลบสินค้าออกจากตะกร้าตาม index
    updateCartUI(); // อัปเดตหน้าจอตะกร้าสินค้า
}

// ฟังก์ชัน checkout
function checkout() {
    if (cart.length === 0) {
        alert("กดซื้อสินค้าก่อน!");
        return;
    }
    alert(`ขอบคุณที่สำหนับสนุนชาวบ้าน:) ราคาทั้งหมด: ${cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}บาท`);
    cart = []; // ล้างข้อมูลสินค้าในตะกร้า
    updateCartUI(); // อัปเดตหน้าจอ
}

// ฟังก์ชันเปิด/ปิดตะกร้า
function toggleCart() {
    const cartContainer = document.getElementById('cart-container');
    if (cartContainer.style.display === 'none') {
        cartContainer.style.display = 'block'; // แสดงตะกร้า
    } else {
        cartContainer.style.display = 'none'; // ซ่อนตะกร้า
    }
}
