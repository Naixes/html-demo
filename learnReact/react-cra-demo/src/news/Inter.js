import React, {Component} from 'react'

class Inter extends Component {
    constructor(...args) {
        super(...args)
        this.state = {

        }
    }
    render() {
        return (
            <div>国际新闻{this.props.match.params.i}</div>
        )
    }
}

export default Inter
