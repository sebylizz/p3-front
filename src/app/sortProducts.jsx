

function sortProducts (products, sortOption){
    return products.slice().sort((a, b) => {
      switch (sortOption) {
        case 'price low to high':
          return a.price - b.price;
        case 'price high to low':
          return b.price - a.price;
        case 'quantity high to low':
          return b.quantity - a.quantity;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'quantity low to high':
          return a.quantity - b.quantity;
        default:
          return 0; 
      }
    });
  };

  export default sortProducts;
  