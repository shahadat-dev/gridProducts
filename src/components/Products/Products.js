import React, { Component } from 'react'

import classes from './Products.css'
import Product from './Product/Product'
import Loading from '../common/Loading/Loading'

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
      limit: 15,
      isLoading: false
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
    this.setState({ isLoading: true })
    fetch(
      `http://localhost:3000/api/products?_page=${this.state.page + 1}&_limit=${
        this.state.limit
      }`
    )
      .then(res => res.json())
      .then(json => {
        const { products } = this.state
        const newProducts = [...products, ...json]
        this.setState({
          products: newProducts,
          page: this.state.page + 1,
          isLoading: false
        })
      })
      .catch(err => console.log(err))
  }

  render() {
    const { products, isLoading } = this.state
    const productList = products.map(product => (
      <Product key={product.id} product={product} />
    ))
    let productsContent = isLoading ? (
      <Loading />
    ) : (
      <div className={classes.Wrapper}>{productList}</div>
    )
    return productsContent
  }
}

export default Products
