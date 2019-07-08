import React, {Component} from 'react'
import axios from 'axios'

class Comp extends Component {
    constructor(...args) {
        super(...args)
        this.state = {
            users: []
        }
    }

    async componentDidMount() {
        try {
            // let res = await fetch('/data/data.json')
            // let data = await res.json()
            let {data} = await axios('/data/data.json')
            // console.log(data)
            this.setState({
                users: data
            })
        } catch (error) {
            console.log(error)
        }
    }
    
    render() {
        return (
            <div>
                <ul>
                    {this.state.users.map((u, i) => (
                        <li key={i}>{u.user}, {u.password}</li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default Comp