import React, { Component } from 'react'
import Products from './components/Products/Products'

import classes from './App.css'

class App extends Component {
  render() {
    return (
      <div className={classes.App}>
        <Products />
      </div>
    )
  }
}

export default App
