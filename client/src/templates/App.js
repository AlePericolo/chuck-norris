import React from 'react';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route } from 'react-router-dom';

import { history, store, persistor } from '@/store/store';

import Nav from '@/components/Nav'
import Home from '@/pages/Home'
import Categories from '@/pages/Categories'
import Random from '@/pages/Random'

export default function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
                <ConnectedRouter history={history}>
                    <div className="container mx-auto my-2">
                        <Nav />
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route exact path="/categories" component={Categories} />
                            <Route exact path="/random" component={Random} />
                        </Switch>
                    </div>
                </ConnectedRouter>
            </PersistGate>
        </Provider>
    )
}