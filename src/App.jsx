import React, { useState, useMemo } from 'react';

const productsData = [
  { id: 1, name: 'เสื้อสีดำลายควัน', price: 2999, image: 'wt1.jpg' },
  { id: 2, name: 'เสื้อสีขาวขาดลายคน', price: 1999, image: 'wt2.jpg' },
  { id: 3, name: 'เสื้อสีเทาลายมิจฉาชีพ', price: 799, image: 'wt3.jpg' },
  { id: 4, name: 'เสื้อสีขาวลายเดอะล็อค', price: 1500, image: 'wt4.jpg' },
  { id: 5, name: 'เสื้อสีดำลายเหยี่ยว', price: 1599, image: 'wt5.jpg' },
  { id: 6, name: 'เสื้อสีดำลายควันกระโหลก', price: 5599, image: 'wt6.jpg' },
  { id: 7, name: 'เสื้อสีดำลายนักดนตรี', price: 2990, image: 'wt7.jpg' },
  { id: 8, name: 'เสื้อสีดำขาดลายคน', price: 1790, image: 'wt8.jpg' },
  { id: 9, name: 'เสื้อสีดำขาดลายนักดนตรี', price: 1590, image: 'wt9.jpg' },
  { id: 10, name: 'เสื้อสีดำลายนกแสก', price: 2500, image: 'wt10.jpg' },
  { id: 11, name: 'เสื้อสีดำลายนกอินทรี', price: 1999, image: 'wt11.jpg' },
  { id: 12, name: 'เสื้อสีดำลายปีศาจ', price: 5990, image: 'wt12.jpg' },
  { id: 13, name: 'เสื้อสีขาวลายมัมมี่', price: 4999, image: 'wt13.jpg' },
  { id: 14, name: 'เสื้อสีดำลายพูดปีศาจ', price: 1999, image: 'wt14.jpg' },
  { id: 15, name: 'เสื้อสีขาวลายดอกไมีผี', price: 3999, image: 'wt15.jpg' },
  { id: 16, name: 'เสื้อสีดำลายกระต่าย', price: 3500, image: 'wt16.jpg' },
  { id: 17, name: 'เสื้อสีดำลายหัวกระโหลก', price: 1500, image: 'wt17.jpg' },
  { id: 18, name: 'เสื้อสีดำลายวงดนตรีkiss', price: 500, image: 'wt18.jpg' },
  { id: 19, name: 'เสื้อสีเทาฟ้าลายหัวมนุษย์', price: 750, image: 'wt19.jpg' },
  { id: 20, name: 'เสื้อสีเทาลายควันวงกลมไฟ', price: 500, image: 'wt20.jpg' },
];

function App() {
  const [cart, setCart] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [discountError, setDiscountError] = useState('');

  const addToCart = (product) => {
    const productInCart = cart.find((item) => item.id === product.id);
    if (productInCart) {
      setCart(cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(cart.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const handleApplyDiscount = (coupon) => {
    if (coupon === 'DISCOUNT10') {
      setDiscount(0.1);
      setDiscountError('');
    } else {
      setDiscountError('Invalid coupon code.');
    }
  };

  const total = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cart]);

  const totalWithShipping = useMemo(() => {
    return total > 0 ? total + 100 - total * discount : 0;
  }, [total, discount]);

  return (
    <div className="App bg-blue-100 min-h-screen p-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">NAYHOY vintage shirt</h1>

      {/* Product grid in 4 columns */}
      <div className="product-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 p-8">
        {productsData.map((product) => (
          <div key={product.id} className="product-card border p-6 bg-blue-500 hover:shadow-lg transition-shadow flex flex-col items-center rounded-lg">
            <img
              src={product.image}
              alt={product.name}
              className="mb-2 w-36 h-36 object-cover rounded-lg"
            />
            <h2 className="text-xl font-semibold text-black">{product.name}</h2>
            <p className="text-lg text-black">Price: {product.price}฿</p>
            <button
              onClick={() => addToCart(product)}
              className="bg-blue-700 text-white px-4 py-2 mt-4 rounded hover:bg-blue-800 transition w-3/4"
              aria-label={`Add ${product.name} to cart`}
            >
              เพิ่มลงในตะกร้า
            </button>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold text-center mt-12 text-gray-800">ตะกร้าสินค้า</h2>
      <div className="cart p-4 border-t mt-6 bg-white rounded-lg shadow-lg">
        {cart.length > 0 ? (
          cart.map((item) => (
            <div key={item.id} 
            className="flex justify-between items-center border p-2 my-2 bg-gray-50 rounded">
              <span className="font-medium text-gray-800">{item.name}</span>
              <div className="flex items-center">
                <label htmlFor={`quantity-${item.id}`} className="mr-2 text-gray-600">
                  จำนวน : 
                  </label>
                <input
                  id={`quantity-${item.id}`}
                  type="number"
                  value={item.quantity}
                  min="1"
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                  className="border w-12 p-1 text-center"
                />
              </div>
              <span className="text-gray-600">{item.price * item.quantity}฿</span>
              <button
                onClick={() => removeFromCart(item.id)}
                className="bg-red-500 text-white px-3 py-1 ml-2 rounded hover:bg-red-600 transition"
                aria-label={`Remove ${item.name}`}
              >
                Remove
              </button>
            </div>
          ))
        ) : (
          
          <p className ="text-gray-600">รถเข็นของคุณ</p>
        )}
        <div className="mt-4 p-4 bg-gray-100 rounded shadow-md">
          <p>รวม: {total}฿</p>
          <p>ค่าจัดส่ง: 100฿</p>
          <p text-center>ส่วนลด: {discount * 50}%</p>
          <p className="font-bold">รวมค่าจัดส่ง: {totalWithShipping}฿</p>

    
        </div>
      </div>
    </div>
  );
}

export default App;
