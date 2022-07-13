const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const cartItemClickListener = ({ target }) => {
  target.remove();
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const createMenuItems = async (product) => {
  const apiInformation = await fetchProducts(product);
  const { results } = apiInformation;
  const itemsClass = document.querySelector('.items');

  results
    .forEach(({ id, title, thumbnail }) => {
      const objectFormatation = {
        sku: id,
        name: title,
        image: thumbnail,
      };

      itemsClass.appendChild(createProductItemElement(objectFormatation));
    });
};

const addItemToCart = async ({ target }) => {
  const product = target.parentNode;
  const idOfProduct = getSkuFromProductItem(product);
  const apiInformation = await fetchItem(idOfProduct);
  const { id, title, price } = apiInformation;

  const cartItems = document.querySelector('.cart__items');

  const objectFormatation = {
    sku: id, 
    name: title, 
    salePrice: price,
  };

  cartItems.appendChild(createCartItemElement(objectFormatation));
};

const addToCartButton = () => {
  const button = document.querySelectorAll('.item__add');

  button
  .forEach((product) => {
    product.addEventListener('click', addItemToCart);
  });
};

const removeAllItems = () => {
  const itemsOnCart = document.querySelectorAll('.cart__item');

  itemsOnCart
  .forEach((product) => product.remove());
};

const buttonToErase = document.querySelector('.empty-cart');
buttonToErase.addEventListener('click', removeAllItems);

window.onload = async () => {
  await createMenuItems('computador');
  addToCartButton();
};