import React, { Component } from 'react'

import classes from './Products.css'
import Product from './Product/Product'
import Loading from '../common/Loading/Loading'

// Scroll
const scroll = that => {
  window.onscroll = function() {
    // Check if all products already being fetched
    if (that.state.products.length >= 500) {
      return
    }

    const d = document.documentElement
    const offset = d.scrollTop + window.innerHeight
    const height = d.offsetHeight

    // When scroller reaches at bottom of the page
    if (Math.ceil(offset) === height) {
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
      limit: 5,
      sort: -1,
      isLoading: false,
      nextChunkLoaded: false
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
        this.setState({ products: json })
      })
      .catch(err => console.log(err))

    // Invoke the scroll function
    scroll(this)
  }

  fetchDataNextPage() {
    // Set loading to true
    this.setState({ isLoading: true })

    // Set fetch URL depending on sort option
    const fetch_url =
      this.state.sort != -1
        ? `http://localhost:3000/api/products?_page=${this.state.page +
            1}&_limit=${this.state.limit}&_sort=${this.state.sort}`
        : `http://localhost:3000/api/products?_page=${this.state.page +
            1}&_limit=${this.state.limit}`

    fetch(fetch_url)
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

  selectChangeHandler(e) {
    const sort = e.target.value

    // Set fetch URL depending on sort option
    const fetch_url =
      sort != -1
        ? `http://localhost:3000/api/products?_page=1&_limit=${
            this.state.limit
          }&_sort=${sort}`
        : `http://localhost:3000/api/products?_page=1&_limit=${
            this.state.limit
          }`

    fetch(fetch_url)
      .then(res => res.json())
      .then(json => {
        this.setState({ products: json, sort, page: 1 })
      })
      .catch(err => console.log(err))
  }

  render() {
    const options = ['Id', 'Price', 'Size']
    const { products, isLoading } = this.state

    const productList = products.map(product => (
      <Product key={product.id} product={product} />
    ))
    let productsContent = isLoading ? (
      <Loading />
    ) : (
      <div>
        <div className={classes.Sort}>
          <select onChange={this.selectChangeHandler.bind(this)}>
            <option value="-1">--Sort By--</option>
            {options.map(opt => (
              <option
                key={opt}
                selected={
                  this.state.sort === opt.toLocaleLowerCase() && 'selected'
                }
                value={opt.toLowerCase()}
              >
                {opt}
              </option>
            ))}
          </select>
        </div>
        <div className={classes.ProductsGrid}>{productList}</div>
        {products.length >= 500 && '~	end	of	catalogue	~'}
      </div>
    )
    return productsContent
  }
}

export default Products
