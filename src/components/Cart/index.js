import WebContext from '../../context/WebContext'
import CartItems from '../CartItems'
import Header from '../Header'
import './index.css'

const Cart = () => (
  <WebContext.Consumer>
    {value => {
      const {inCart, removeAllCartItems} = value

      const removeCartItems = () => {
        removeAllCartItems()
      }

      console.log(inCart)
      return (
        <>
          <Header />
          <div className="cart-empty-view-container">
            {inCart.length === 0 && (
              <>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
                  className="cart-empty-img"
                  alt="cart empty"
                />
                <h1 className="cart-empty-heading">Your Cart Is Empty</h1>
              </>
            )}
            {inCart.length > 0 && (
              <>
                <div className="removeBtn">
                  <button type="button" onClick={removeCartItems}>
                    Remove All
                  </button>
                </div>
                <ul className="cartDiv">
                  {inCart.map(items => (
                    <CartItems items={items} key={items.id} />
                  ))}
                </ul>
              </>
            )}
          </div>
        </>
      )
    }}
  </WebContext.Consumer>
)
export default Cart
