import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = { };
    this.targetProducts = this.products;
    this.render();
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
    
    this.gridInner.innerHTML = '';

    Object.assign(this.filters, filters);

    this.targetProducts = this.products;

    if (this.filters['noNuts'] === true) { 
      this.targetProducts = this.targetProducts.filter(product => product["nuts"] !== true);
    } 

    if (this.filters['vegeterianOnly'] === true) { 
      this.targetProducts = this.targetProducts.filter(product => product["vegeterian"] === true);
    }

    if (this.filters['maxSpiciness'] >= 0) { 
      this.targetProducts = this.targetProducts.filter(product => product["spiciness"] <= this.filters['maxSpiciness']);
    }

    if ( this.filters['category'] )  {
      this.targetProducts = this.targetProducts.filter(product => product["category"] === this.filters['category']);
    }    
    
    for (let i = 0; i < this.targetProducts.length; i++) { 
      let card = new ProductCard(this.targetProducts[i]);
      this.gridInner.append(card.elem);
    }
  }
}
