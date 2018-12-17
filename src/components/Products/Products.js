import React, { Component } from 'react'

import classes from './Products.css'

const scroll = that => {
  // Scroll
  window.onscroll = function() {
    var d = document.documentElement
    var offset = d.scrollTop + window.innerHeight
    var height = d.offsetHeight

    // console.log('offset = ' + Math.ceil(offset))
    // console.log('height = ' + height)

    if (Math.ceil(offset) === height) {
      console.log('At the bottom')
      // console.log(that.state)
      that.fetchDataNextPage()
    }
  }
}

class Products extends Component {
  constructor() {
    super()
    this.state = {
      products: [],
      page: 1,
      limit: 15
    }
    this.fetchDataNextPage.bind(this)
  }

  componentDidMount() {
    fetch(
      `http://localhost:3000/api/products?_page=${this.state.page}&_limit=${
        this.state.limit
      }`
    )
      .then(res => res.json())
      .then(json => {
        console.log(json)
        this.setState({ products: json })
      })
      .catch(err => console.log(err))

    scroll(this)
  }

  fetchDataNextPage() {
    fetch(
      `http://localhost:3000/api/products?_page=${this.state.page + 1}&_limit=${
        this.state.limit
      }`
    )
      .then(res => res.json())
      .then(json => {
        const { products } = this.state
        const newProducts = [...products, ...json]
        this.setState({ products: newProducts, page: this.state.page + 1 })
      })
      .catch(err => console.log(err))
  }

  render() {
    const { products } = this.state
    console.log(products)
    const productList = products.map(product => (
      <div className={classes.box} key={product.id}>
        {product.face}
      </div>
    ))
    return <div className={classes.wrapper}>{productList}</div>
  }
}

export default Products
