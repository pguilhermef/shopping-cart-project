const fetchProducts = async (parâmetro) => {
  if (!parâmetro) throw new Error('You must provide an url');
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${parâmetro}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
