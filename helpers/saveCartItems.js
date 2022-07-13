const saveCartItems = (parâmetro) => {
  localStorage.setItem('cartItems', parâmetro);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
