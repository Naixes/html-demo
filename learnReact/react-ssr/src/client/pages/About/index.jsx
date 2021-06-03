import React from 'react'
import { NavLink } from "react-router-dom";
import {useSelector} from 'react-redux'
import axios from 'axios'

import './about.css'

export const getUserInfo = () => {
    return axios.get("http://localhost:3000/api/getUserInfo");
};

const About = () => {
    const name = useSelector(state => {
        return state.name
    })
    return (
        <div className='about'>
            <h2>About</h2>
            <h2>名字{name}</h2>
            <NavLink to='/'>home页面</NavLink>
        </div>
    )
}

export default About