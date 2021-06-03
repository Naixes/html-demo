import React from 'react'
import { NavLink } from "react-router-dom";

import './home.css'

const Home = () => {
    return (
        <div className="home">
            <h2>Home</h2>
            <NavLink to="/about">about页面</NavLink>
        </div>
    )
}

export default Home