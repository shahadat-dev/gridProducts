import React from 'react'

import classes from './Ad.css'

export default function Ad({ ad }) {
  return (
    <div className={classes.Box} key={name}>
      <img class="ad" src={`http://localhost:3000/ads/?r=${ad.id}`} />
    </div>
  )
}
