import React from 'react'
import {Route, Switch} from 'react-router-dom'

import Home from '../pages/Home'
import About, { getUserInfo } from '../pages/About'

export const routes = [
    {
        path: '/',
        exact: true,
        component: Home
    }, 
    {
        path: '/about',
        exact: true,
        component: About,
        loadData: getUserInfo,
    }
]

export const Routes = () => (
    <Switch>
        {
            routes.map((r, index) => {
                const {path, exact, component} = r
                return (
                    <Route key={index} path={path} exact={exact} component={component}></Route>
                )
            })
        }
        {/* 404 */}
    </Switch>
)