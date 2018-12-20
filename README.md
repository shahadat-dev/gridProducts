# Products Grid

This is an ecommerce site, where you can buy all sorts of ascii faces like `(ノ・∀・)ノ` and `¯_(ツ)_/¯`, in a wide variety of font sizes. The homepage should display a list of products for people to browse.

## How To Run

`npm install` to install dependencies
`npm start` to run the `josn-server`
`npm run dev` to run react app and browse to _http://localhost:8080/_

## Tools used

- `React.js` _(installed from scratch)_
- `json-server`
- `webpack`
- `babel`
  _No plugin used for scrolling and showing datetime_

## Features

- products are displayed in a grid.
- Can sort by "size", "price" or "id".
- the product grid automatically load more items as you scroll down.
- display an animated "loading..." message while the user waits for the data to load.
- to improve the user's experience, next bunch of data loaded automatically after 5 seconds of each loading
- when the user reaches the end and there are no more products to display, message "~ end of catalogue ~" is displayed.
- after 20 products an ad is displayed

## Products API

- The basic query looks like this: `/api/products`
- The response format is JSON.
- To paginate results use the `_page` parameter, eg: `/api/products?_page=10&_limit=15` (returns 15 results starting from the 10th page).
- To sort results use the `_sort` parameter, eg: `/api/products?_sort=price`. Valid sort values are `price`, `size` and `id`.
