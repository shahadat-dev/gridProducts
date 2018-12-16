import React, { Component } from 'react'

class Products extends Component {
  constructor() {
    super()
    this.state = {
      products: []
    }
  }

  componentDidMount() {
    fetch('http://localhost:3000/api/products')
      .then(res => res.json())
      .then(json => {
        console.log(json)
        this.setState({ products: json })
      })
      .catch(err => console.log(err))
  }
  render() {
    const { products } = this.state
    const productList = products.map(product => (
      <li key={product.id}>{product.face}</li>
    ))
    return <ul>{productList}</ul>
  }
}

export default Products
