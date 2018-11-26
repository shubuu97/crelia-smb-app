import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import JssProvider from 'react-jss/lib/JssProvider';
/* Redux Imports*/
import { createStore, applyMiddleware, compose } from 'redux';
import axiosMiddleWare from './Redux/axiosMiddleware';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './Redux/RootReducer';
import { Provider } from 'react-redux';
/* Stylesheet */
import './Assets/stylesheets/main.less'
/* Boilerplate Imports*/
import xForms from './xBoilerplate/Forms.jsx';
import MDC from './xBoilerplate/MaterialDesignTemplate';
/*Material UI Imports*/
import { createGenerateClassName } from '@material-ui/core/styles';
import theme from './Global/MaterialUiSettings/theme';
import { MuiThemeProvider } from '@material-ui/core/styles';
/*Redux Persist Import */
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';
import { PersistGate } from 'redux-persist/integration/react';
/*Layout imports*/
import MainLayout from './Global/layout/MainLayout';
import RouteWithLayout from './Global/layout/RouteWithLayout';
import UiSetting from './Global/uiSettings/uiSettings';
import SignInLayout from './Global/layout/signInLayout';



/* Investor Container Imports*/
import AccountInvestor from './INVESTOR/MyAccount/MyAccountContainer'
import RoutesConfigInvestor from './INVESTOR/CompanyProfile/components/RoutesConfig';



/* SMB Container Imports*/
import CompanyOnBoardingContainer from './SMB/CompanyOnBoarding/CompanyOnBoardingContainer';
import ReviewCOBInfoContainer from './SMB/CompanyOnBoarding/components/ReviewCOBInfo/ReviewCOBInfoContainer.jsx'
import OnBoardingAcknowlege from './SMB/Acknowledge/OnBoradingAckowledge'
import AccountSMB from './SMB/MyAccount/MyAccountContainer'
import RoutesConfigSMB from './SMB/CompanyProfile/components/RoutesConfig';



/* Common Container Imports*/
import SignIn from './COMMON/Authorization/AuthorizationContainer'
import Reset from './COMMON/Authorization/components/ResetPassword/resetPassword';
import PasswordSent from './COMMON/Authorization/components/ResetPassword/passwordSent';
import ChangePassword from './COMMON/Authorization/components/ResetPassword/changePassword';
import RegistrationSuccess from './COMMON/Authorization/components/Registration/RegistrationSuccess';
import Registration from './COMMON/Authorization/components/Registration/Register';
import SetPassword from './COMMON/Authorization/components/SetPassword/setPassword';
import signInRejected from './COMMON/Authorization/components/signInRejected' // to be removed
import RoutesConfig from './COMMON/CompanyProfile/components/RoutesConfig';


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
  //blacklist: ['form','ShowToast']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

let store;

if (process.env.NODE_ENV !== 'production') {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  store = createStore(persistedReducer,
    composeEnhancers(applyMiddleware(...middleware))
  );
}
else {
  store = createStore(persistedReducer, applyMiddleware(...middleware));
}

const persistor = persistStore(store);


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



                  {/* Common Routes */}
                  <RouteWithLayout Layout={SignInLayout} exact path="/" Component={SignIn} />
                  <RouteWithLayout Layout={SignInLayout} exact path="/register" Component={Registration} />
                  <RouteWithLayout Layout={SignInLayout} exact path="/registerSuccess" Component={RegistrationSuccess} />
                  <RouteWithLayout Layout={SignInLayout} exact path="/changePassword" Component={ChangePassword} />
                  <RouteWithLayout Layout={SignInLayout} exact path="/passwordSent" Component={PasswordSent} />
                  <RouteWithLayout Layout={SignInLayout} exact path="/reset" Component={Reset} />
                  <RouteWithLayout Layout={SignInLayout} exact path="/setPassword" Component={SetPassword} />
                  <RouteWithLayout Layout={SignInLayout} exact path="/signInRejected" Component={signInRejected} />
                  {RoutesConfig.map(rconfig => <RouteWithLayout Layout={MainLayout} exact path={rconfig.path} Component={rconfig.Component} />)}

                  {/* Main Routes */}



                  {
                    localStorage.getItem("role") == 'InvestorUser' ?
                      <div>
                        <RouteWithLayout Layout={MainLayout} exact path="/account" Component={AccountInvestor} />
                        {/* {RoutesConfigInvestor.map(rconfig => <RouteWithLayout Layout={MainLayout} exact path={rconfig.path} Component={rconfig.Component} />)} */}
                      </div>
                      :
                      null
                  }

                  {
                    localStorage.getItem("role") == 'SMBUser' ?
                      <div>
                        <RouteWithLayout Layout={MainLayout} exact path="/onboard" Component={CompanyOnBoardingContainer} />
                        <RouteWithLayout Layout={MainLayout} exact path="/onboard/review" Component={ReviewCOBInfoContainer} />
                        <RouteWithLayout Layout={MainLayout} exact path="/OnBoardingAcknowlege" Component={OnBoardingAcknowlege} />
                        {/* {RoutesConfigSMB.map(rconfig => <RouteWithLayout Layout={MainLayout} exact path={rconfig.path} Component={rconfig.Component} />)} */}
                        <RouteWithLayout Layout={MainLayout} exact path="/account" Component={AccountSMB} />
                      </div>
                      :
                      null
                  }



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