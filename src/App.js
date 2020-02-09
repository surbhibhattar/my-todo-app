import React from 'react';
import { HomeScreen } from './HomeScreen';
import Error from './Error';
import { Route, Switch } from 'react-router-dom';

export default function App() {
    return (
        <main>
            <Switch>
                <Route path="/" component={HomeScreen} exact />
                <Route component={Error} />
            </Switch>
        </main>
    )
}