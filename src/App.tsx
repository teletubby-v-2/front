import React from 'react'
import Login from './pages/Login'
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom'
import Register from './pages/Register'
import Success from './pages/Success'
import ForgotPassword from './pages/ForgotPassword'
import LinkAccount from './pages/LinkAccount'
import { useThemeSwitcher } from 'react-css-theme-switcher'
import { DarkModeSwitch } from 'react-toggle-dark-mode'

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = React.useState<boolean>()
  const { switcher, currentTheme, status, themes } = useThemeSwitcher()

  const toggleTheme = (isChecked: boolean) => {
    setIsDarkMode(isChecked)
    switcher({ theme: isChecked ? themes.dark : themes.light })
  }

  return (
    <div className="main fade-in">
      <DarkModeSwitch checked={isDarkMode || false} onChange={toggleTheme} />
      <div>
        <HashRouter>
          <Switch>
            <Route exact path="/">
              <Redirect to="/login" />
            </Route>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/success" component={Success} />
            <Route exact path="/forgotpassword" component={ForgotPassword} />
            <Route exact path="/linkAccount" component={LinkAccount} />
          </Switch>
        </HashRouter>
      </div>
    </div>
  )
}

export default App
