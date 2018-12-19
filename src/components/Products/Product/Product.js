import React from 'react'

import classes from './Product.css'

export default function Product({ product }) {
  return (
    <div className={classes.Box} key={product.id}>
      <span>{product.face}</span>
      <hr />
      <p>
        Price: $<i>{product.price}</i>
      </p>
      <p>
        Added: <i>{product.date}</i>
      </p>
    </div>
  )
}
