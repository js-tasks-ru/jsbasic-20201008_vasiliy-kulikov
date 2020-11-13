import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = { };
    this.filterProducts();
    this.render();
  }

  filterProducts() {

    let filterKeys = Object.keys(this.filters);

    if (filterKeys.length > 0) {
      this.targetProducts = this.products.filter(product => filterKeys.every(key => this.filters[key] === product[key]));
    } else { 
      this.targetProducts = this.products;
    }
  }

  render() { 

    this.elem = document.createElement('div');
    this.elem.classList.add('products-grid');
    this.elem.innerHTML = `<div class="products-grid__inner"></div>`;

    this.gridInner = this.elem.querySelector('.products-grid__inner');

    for (let i = 0; i < this.targetProducts.length; i++) { 
      let card = new ProductCard(this.targetProducts[i]);
      this.gridInner.append(card.elem);
    }
  }

  updateFilter(filters) { 
    
    this.gridInner.remove();
    this.filters = {};

    for (let filter in filters) { 
      if (filter === "noNuts" && filters[filter] === true) this.filters["nuts"] = undefined;
      if (filter === "vegeterianOnly") this.filters["vegeterian"] = filters[filter];
      if (filter === "maxSpiciness") this.filters["spiciness"] = filters[filter];
      if (filter === "category") this.filters["category"] = filters[filter];
    }

    console.log(this.filters);
    this.filterProducts();
    this.render();
    document.querySelector('.products-grid').append(this.gridInner);
  }
}
