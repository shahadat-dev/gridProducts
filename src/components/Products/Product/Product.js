import React from 'react'

import classes from './Product.css'
import { showAddedTime } from '../../common/util'

export default function Product({ product }) {
  return (
    <div className={classes.Box} key={product.id}>
      <div className={classes.BoxTop}>
        <span style={{ fontSize: `${product.size}px` }}>{product.face}</span>
      </div>
      <div className={classes.BoxBottom}>
        <p>
          Price: $<i>{product.price.toFixed(2)}</i>
        </p>
        <p>
          Added at <br />
          <i>{showAddedTime(new Date(product.date))}</i>
        </p>
      </div>
    </div>
  )
}
