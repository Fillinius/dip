import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import AboutCompany from './layouts/aboutCompany'
import Contact from './layouts/contact'
import Login from './layouts/login'
import Basket from './layouts/basket'
import Navbar from './components/ui/navBar'
import NotFound from './components/common/notFound'
import Furniturs from './layouts/furniturs'
import OrderForm from './components/ui/orderForm'
import { ToastContainer } from 'react-toastify'
import { TypeProvider } from './hooks/useType'
import { SizeProvider } from './hooks/useSize'
import User from './layouts/user'
import ProtectedRoute from './components/common/protectedRoute'
import LogOut from './layouts/logOut'
import AppLoader from './components/ui/hoc/appLoader'

function App() {
  return (
    <div>
      <AppLoader>
        <Navbar />
        <TypeProvider>
          <SizeProvider>
            <Switch>
              <Route exact path="/" component={AboutCompany} />
              <ProtectedRoute path="/users/:userId?/:edit?" component={User} />
              <Route path="/furniturs/:furnitureId?" component={Furniturs} />
              <Route path="/contact" component={Contact} />
              <Route path="/login/:type?" component={Login} />
              <Route path="/logout" component={LogOut} />
              <Route exact path="/basket" component={Basket} />
              <ProtectedRoute path="/basket/order" component={OrderForm} />
              <Route path="/404" component={NotFound} />
              <Redirect from="*" to="/404" />
            </Switch>
          </SizeProvider>
        </TypeProvider>
      </AppLoader>
      <ToastContainer />
    </div>
  )
}

export default App
