import React, { Component } from 'react'

import classes from './Products.css'

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
      <div className={classes.box} key={product.id}>
        {product.face}
      </div>
    ))
    return <div className={classes.wrapper}>{productList}</div>
  }
}

export default Products
