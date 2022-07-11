const fetchProducts = async (parâmetro) => {
  try {
    const URL = `https://api.mercadolibre.com/sites/MLB/search?q=${parâmetro}`;
    const response = await fetch(URL);
    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error('You must provide an url')
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
