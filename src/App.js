import {Component} from 'react'
import {Route, Switch, Redirect, BrowserRouter} from 'react-router-dom'
import WebContext from './context/WebContext'

import LoginForm from './components/LoginForm'
import WebPage from './components/WebPage'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

class App extends Component {
  state = {
    inCart: [],
  }
  // cartList: [],
  // isActive: 0,
  // menuList: [],
  // dataFeteched: false,

  // componentDidMount() {
  //   this.getDataFromServer()
  // }

  addCartItem = food => {
    const {inCart} = this.state
    const {id, foodQuantity} = food
    const productFound = inCart.find(item => item.id === id)

    if (productFound) {
      const updatedcartList = inCart.map(item => {
        if (item.id === id) {
          return {...item, foodQuantity: item.foodQuantity + foodQuantity}
        }
        return item
      })
      this.setState({inCart: updatedcartList})
    } else {
      this.setState(prevState => ({inCart: [...prevState.inCart, food]}))
    }
  }

  decrementCartItemQuantity = id => {
    const {inCart} = this.state
    let flag = 0
    let updatedInCart = inCart.map(items => {
      if (items.id === id) {
        if (items.foodQuantity > 1) {
          return {...items, foodQuantity: items.foodQuantity - 1}
        }
        flag = 1
      }
      return items
    })

    if (flag === 1) {
      updatedInCart = inCart.filter(items => items.id !== id)
    }
    this.setState({inCart: updatedInCart})
  }

  incrementCartItemQuantity = id => {
    const {inCart} = this.state
    const updatedInCart = inCart.map(items => {
      if (items.id === id) {
        return {...items, foodQuantity: items.foodQuantity + 1}
      }
      return items
    })
    this.setState({inCart: updatedInCart})
  }

  removeAllCartItems = () => {
    this.setState({inCart: []})
  }

  // changeCategoryId = id => {
  //   this.setState({isActive: id})
  // }

  // getDataFromServer = async () => {
  //   const apiUrl =
  //     'https://run.mocky.io/v3/77a7e71b-804a-4fbd-822c-3e365d3482cc'

  //   const response = await fetch(apiUrl)
  //   const data = await response.json()
  //   const updatedMenuList = data[0].table_menu_list.map(list => ({
  //     menuCategory: list.menu_category,
  //     menuCategoryId: list.menu_category_id,
  //   }))
  //   this.setState({
  //     cartList: data[0],
  //     menuList: updatedMenuList,
  //     isActive: updatedMenuList[0].menuCategoryId,
  //     dataFeteched: true,
  //   })
  // }

  render() {
    const {inCart} = this.state
    // const {cartList, isActive, menuList, dataFeteched} = this.state
    // cartList,
    // isActive,
    // menuList,
    // dataFeteched,
    // changeCategoryId: this.changeCategoryId,
    return (
      <WebContext.Provider
        value={{
          inCart,
          addCartItem: this.addCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <BrowserRouter>
          <Switch>
            <Route exact path="/login" component={LoginForm} />
            <ProtectedRoute exact path="/" component={WebPage} />
            <ProtectedRoute exact path="/cart" component={Cart} />
            <Route path="/not-found" component={NotFound} />
            <Redirect to="not-found" />
          </Switch>
        </BrowserRouter>
      </WebContext.Provider>
    )
  }
}

export default App
