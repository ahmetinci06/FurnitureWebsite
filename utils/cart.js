/**
 * Shopping Cart Utility Functions
 * Manages cart state using localStorage
 */

const CART_STORAGE_KEY = 'mobilya_cart';

/**
 * Gets cart items from localStorage
 * @returns {Array} Cart items
 */
export function getCart() {
  if (typeof window === 'undefined') return [];
  
  try {
    const cart = localStorage.getItem(CART_STORAGE_KEY);
    return cart ? JSON.parse(cart) : [];
  } catch (error) {
    console.error('Error reading cart from localStorage:', error);
    return [];
  }
}

/**
 * Saves cart items to localStorage
 * @param {Array} cart - Cart items to save
 */
export function saveCart(cart) {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
  }
}

/**
 * Adds a product to the cart
 * @param {Object} product - Product to add
 * @returns {Array} Updated cart
 */
export function addToCart(product) {
  const cart = getCart();
  const existingItem = cart.find(item => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart(cart);
  return cart;
}

/**
 * Removes a product from the cart
 * @param {number} productId - Product ID to remove
 * @returns {Array} Updated cart
 */
export function removeFromCart(productId) {
  const cart = getCart();
  const updatedCart = cart.filter(item => item.id !== productId);
  saveCart(updatedCart);
  return updatedCart;
}

/**
 * Updates the quantity of a cart item
 * @param {number} productId - Product ID
 * @param {number} quantity - New quantity
 * @returns {Array} Updated cart
 */
export function updateQuantity(productId, quantity) {
  const cart = getCart();
  const item = cart.find(item => item.id === productId);

  if (item) {
    if (quantity <= 0) {
      return removeFromCart(productId);
    }
    item.quantity = quantity;
    saveCart(cart);
  }

  return cart;
}

/**
 * Clears all items from the cart
 * @returns {Array} Empty cart
 */
export function clearCart() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(CART_STORAGE_KEY);
  }
  return [];
}

/**
 * Calculates the total price of cart items
 * @param {Array} cart - Cart items
 * @returns {number} Total price
 */
export function calculateTotal(cart) {
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

/**
 * Gets the total number of items in the cart
 * @param {Array} cart - Cart items
 * @returns {number} Total item count
 */
export function getCartItemCount(cart) {
  return cart.reduce((count, item) => count + item.quantity, 0);
}
