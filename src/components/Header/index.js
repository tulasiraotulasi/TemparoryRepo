import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import WebContext from '../../context/WebContext'

import './index.css'
// <Link to="/cart" style={{textDecoration: 'none'}}>
// </Link>

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <WebContext.Consumer>
      {value => {
        const {inCart} = value
        const name = 'UNI Resto Cafe'

        const onCartRoute = () => {
          const {history} = props
          history.push('/cart')
        }

        return (
          <div className="header">
            <h1>{name}</h1>
            <div className="headerInner">
              <button type="button" className="orderBtn" onClick={onCartRoute}>
                My Orders
                <AiOutlineShoppingCart className="icons" />
              </button>
              <h1>{inCart.length}</h1>
            </div>
            <button
              type="button"
              className="logout-desktop-btn"
              onClick={onClickLogout}
            >
              Logout
            </button>
          </div>
        )
      }}
    </WebContext.Consumer>
  )
}

export default withRouter(Header)
