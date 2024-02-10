import React from 'react'

const WebContext = React.createContext({
  inCart: [],
  addCartItem: () => {},
  decrementCartItemQuantity: () => {},
  incrementCartItemQuantity: () => {},
  removeAllCartItems: () => {},
})

export default WebContext
