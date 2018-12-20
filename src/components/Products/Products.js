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
      that.fetchNextPageChunk()
    }
  }
}

// Fetch next chunk of data after a while, for better user experience
const loadNextChunk = that => {
  setTimeout(
    function(that) {
      alert('next chunk')

      if (that.state.nextChunkOfProducts.length == 0) {
        that.fetchNextChunk()
      }
    },
    5000,
    that
  )
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
      nextChunkOfProducts: []
    }
    this.fetchNextPageChunk.bind(this)
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

        // Fetch next chunk of data
        loadNextChunk(this)
      })
      .catch(err => console.log(err))

    // Invoke the scroll function
    scroll(this)
  }

  fetchNextPageChunk() {
    // Check if next chunk already loaded
    if (this.state.nextChunkOfProducts.length > 0) {
      const { products, nextChunkOfProducts } = this.state
      const newProducts = [...products, ...nextChunkOfProducts]
      this.setState({
        products: newProducts,
        nextChunkOfProducts: [],
        page: this.state.page + 1
      })
      // Fetch next chunk of data
      loadNextChunk(this)
      return
    }

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

        // Fetch next chunk of data
        loadNextChunk(this)
      })
      .catch(err => console.log(err))
  }

  fetchNextChunk() {
    const fetch_url =
      this.state.sort != -1
        ? `http://localhost:3000/api/products?_page=${this.state.page +
            1}&_limit=${this.state.limit}&_sort=${this.state.sort}`
        : `http://localhost:3000/api/products?_page=${this.state.page +
            1}&_limit=${this.state.limit}`

    fetch(fetch_url)
      .then(res => res.json())
      .then(json => {
        this.setState({
          nextChunkOfProducts: json
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
        this.setState({
          products: json,
          sort,
          page: 1,
          nextChunkOfProducts: []
        })

        // Fetch next chunk of data
        loadNextChunk(this)
      })
      .catch(err => console.log(err))
  }

  render() {
    const options = ['Id', 'Price', 'Size']
    const { products, isLoading } = this.state

    const productList = products.map((product, index) => (
      <Product key={index} product={product} />
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
