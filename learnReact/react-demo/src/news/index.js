import React, {Component} from 'react'

import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

import inter from './Inter'
import society from './Society'

class News extends Component {
    constructor(...args) {
        super(...args)
        this.state = {

        }
    }
    render() {
        const path = this.props.match.path

        return (
            <Router>
                <div>
                    <div className="nav-bar">
                        {/* 嵌套路由 */}
                        {/* 参数传递 */}
                        <Link to={`${path}/inter/1`}>国际</Link>
                        <Link to={`${path}/society`}>社会</Link>
                    </div>

                    <Route path={`${path}/inter/:i`} component={inter}></Route>
                    <Route path={`${path}/society`} component={society}></Route>
                </div>
            </Router>
        )
    }
}

export default News
