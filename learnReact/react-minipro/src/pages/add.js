import React, {Component} from 'react'

import Table from '../components/Table';
import Panel from '../components/Panel';

class Home extends Component {
    constructor(...args) {
        super(...args)
        this.state = {

        }
    }
    render() {
        return (
            <div>
                <Table/>
                <Panel/>
            </div>
        )
    }
}

export default Home
