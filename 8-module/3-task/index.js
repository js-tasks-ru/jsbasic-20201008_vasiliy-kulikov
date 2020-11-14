export default class Cart {
  cartItems = [ ]; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {

    if (this.cartItems.length === 0) {
      this.cartItem = { product, count: 1 };
      this.cartItems.push(this.cartItem);
    } else { 
      this.cartItems.forEach(item => {
        if (item.product.id === product.id) {
          item.count++;
          this.cartItem = item;
        } else {
          this.cartItem = { product, count: 1 };
          this.cartItems.push(this.cartItem);
        }
      });
    }

    this.onProductUpdate(this.cartItem);    
    
  }

  updateProductCount(productId, amount) {
    let cartItem = this.cartItems.find(item => item.product.id === productId);
    cartItem.count += amount;

    if (cartItem.count === 0) { 
      let cartIndex = this.cartItems.findIndex(item => item.product.id === productId);
      this.cartItems.splice(cartIndex, 1);
    }

    this.onProductUpdate(cartItem); 
  }

  isEmpty() {
    return this.cartItems.length === 0 ? true : false;
  }

  getTotalCount() {
    let result = 0;
    this.cartItems.forEach(item => result += item.count);
    return result;
  }

  getTotalPrice() {
    let result = 0;
    this.cartItems.forEach(item => result += item.count * item.product.price);
    return result;
  }

  onProductUpdate() {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

