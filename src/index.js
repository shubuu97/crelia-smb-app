import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
/* Redux Imports*/
import { createStore, applyMiddleware } from 'redux';
import axiosMiddleWare from './Redux/axiosMiddleware';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './Redux/RootReducer';
import { Provider } from 'react-redux';
/* Stylesheet */
import './Assets/stylesheets/main.less'
/* Boilerplate Imports*/
import xForms from './xBoilerplate/Forms.jsx';
/*Material Ui settings Imports*/
import theme from './MaterialUiSettings/theme';
import { MuiThemeProvider } from '@material-ui/core/styles';
/*Layout imports*/
import MainLayout from './layout/MainLayout';
import RouteWithLayout from './layout/RouteWithLayout';
import UiSetting from './Global/uiSettings';
import MDC from './xBoilerplate/MaterialDesignTemplate';
import SignInLayout from './layout/signInLayout';

/* Container Imports*/
import CompanyOnBoardingContainer from './CompanyOnBoarding/CompanyOnBoardingContainer';
import SignIn from './Authorization/AuthorizationContainer'
import signInRejected from './Authorization/components/signInRejected' // to be removed
import RoutesConfig from './CompanyProfile/components/RoutesConfig';
import Reset from './Authorization/components/resetPassword'
import RegistrationSuccess from './Authorization/components/Registration/RegistrationSuccess';
import Registration from './Authorization/components/Registration/Register';
import PasswordSent from './Authorization/components/passwordSent';
import SetPassword from './Authorization/components/setPassword'

/*Redux persist import */
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';
import { PersistGate } from 'redux-persist/integration/react';

import JssProvider from 'react-jss/lib/JssProvider';
import { createGenerateClassName } from '@material-ui/core/styles';
const generateClassName = createGenerateClassName({
  dangerouslyUseGlobalCSS: true,
  productionPrefix: 'c',
});


const middleware = [thunk, axiosMiddleWare];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
};
const persistConfig = {
  key: 'SMEInvestorRoot',
  storage,
  stateReconciler: hardSet,
  blacklist: ['form']
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

let store = createStore(persistedReducer, applyMiddleware(...middleware));
const persistor = persistStore(store)



ReactDOM.render(
  <div>
   <JssProvider generateClassName={generateClassName}>
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Switch>
            <div>
              {/* Boilerplate routes */}
              <Route exact path="/boilerplate/form" component={xForms} />
              <Route exact path="/UiSetting" component={UiSetting} />
              <Route exact path='/boilerplate/mdc' component={MDC} />

              {/* Main Routes */}
              <RouteWithLayout Layout={MainLayout} exact path="/onboard" Component={CompanyOnBoardingContainer} />
              <RouteWithLayout  Layout={SignInLayout} exact path="/" Component={SignIn} />
              <RouteWithLayout Layout={SignInLayout} exact path="/register" Component={Registration} />
              <RouteWithLayout  Layout={SignInLayout} exact path="/registerSuccess" Component={RegistrationSuccess} />
              
              <RouteWithLayout  Layout={SignInLayout} exact path="/passwordSent" Component={PasswordSent} />
              <RouteWithLayout  Layout={SignInLayout} exact path="/reset" Component={Reset} />
              <RouteWithLayout  Layout={SignInLayout} exact path="/setPassword" Component={SetPassword} />
              <RouteWithLayout Layout={SignInLayout} exact path="/signInRejected" Component={signInRejected} />
              {RoutesConfig.map(rconfig=><RouteWithLayout Layout={MainLayout} exact path={rconfig.path} Component={rconfig.Component} />)}
              </div>
          </Switch>
        </Router>
        </PersistGate>
      </Provider>

    </MuiThemeProvider>
    </JssProvider>
  </div>,
  document.getElementById('root')
)