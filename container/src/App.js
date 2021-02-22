import React, { lazy, Suspense, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {
  StylesProvider,
  createGenerateClassName,
} from '@material-ui/core/styles';

import Header from './components/Header';

const MarketingLazy = lazy(() => import('./components/MarketingApp'));
const AuthLazy = lazy(() => import('./components/AuthApp'));

const generateClassName = createGenerateClassName({ productionFrefix: 'co' });

export default () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  return (
    <BrowserRouter>
      <StylesProvider generateClassName={generateClassName}>
        <Header
          onSignOut={() => setIsSignedIn(false)}
          isSignedIn={isSignedIn}
        />
        <Suspense fallback={<div>...loading</div>}>
          <Switch>
            <Route path='/auth'>
              <AuthLazy onSignIn={() => setIsSignedIn(true)} />
            </Route>
            <Route path='/' component={MarketingLazy} />
          </Switch>
        </Suspense>
      </StylesProvider>
    </BrowserRouter>
  );
};
