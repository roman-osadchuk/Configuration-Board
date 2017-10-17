import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import Greetings from './components/Greetings';
import LoginPage from './components/login/LoginPage';
import MainGroups from './components/MainGroups';
import NotFoundPage from './components/groupsComponents/NotFoundPage';

import requireAuth from './utils/requireAuth';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={Greetings} />
        <Route path="login" component={LoginPage} />
        <Route path="groups" component={requireAuth(MainGroups)} />
        <Route path="*" exact={true} component={NotFoundPage} />
    </Route>
)
