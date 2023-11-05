import React, { Component } from 'react';

class ProductList extends Component {
  constructor() {
    super();
    this.state = {
      products: [
        { id: 1, name: 'HP Pavilion 15-eg2085TU ', description: 'Core i5 1240P/ 8GB/ 256GB SSD/ Intel Iris Xe Graphics/ 15.6inch Full HD', isBookmarked: false },
        { id: 2, name: 'Lenovo Ideapad Gaming 3', description: 'Sẵn sàng cho mọi tựa game, đồ họa đỉnh', isBookmarked: false },
        { id: 3, name: 'Asus Zenbook', description: 'Laptop mỏng nhẹ cao cấp thế hệ Zenbook thân thiện với môi trường. Laptop OLED Siêu mỏng, siêu nhẹ thiết kế để đảm bảo tính di động và trải nghiệm tối ưu nhất', isBookmarked: false },
        { id: 4, name: 'Intel Core I9', description: ' Bộ vi xử lý Intel Core i9 14900K / Turbo up to 6.0GHz / 24 Nhân 32 Luồng / 36MB / LGA 1700', isBookmarked: false },
        // Add more products
      ],
      searchText: '',
    };
  }

  handleBookmarkToggle = (productId) => {
    this.setState((prevState) => ({
      products: prevState.products.map((product) =>
        product.id === productId
          ? { ...product, isBookmarked: !product.isBookmarked }
          : product
      ),
    }));
  };

  handleSearchChange = (e) => {
    this.setState({ searchText: e.target.value });
  };

  render() {
    const { products, searchText } = this.state;
    const filteredProducts = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchText.toLowerCase()) ||
        product.description.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
      <div>
        <input
          type="text"
          placeholder="Search products..."
          value={searchText}
          onChange={this.handleSearchChange}
        />
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className={`product ${product.isBookmarked ? 'bookmarked' : ''}`}
          >
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <button
              onClick={() => this.handleBookmarkToggle(product.id)}
            >
              {product.isBookmarked ? 'Remove bookmark' : 'Set bookmark'}
            </button>
          </div>
        ))}
      </div>
    );
  }
}

export default ProductList;