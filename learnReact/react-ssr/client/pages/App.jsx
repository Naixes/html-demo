import React from 'react'
import {BrowseRouter} from 'react-router-dom'

import {Routes} from '../router'

const App = () => {
    return <BrowseRouter basename="/">{Routes()}</BrowseRouter>
}

export default App