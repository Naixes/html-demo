import React from 'react'
import ReactDom from 'react-dom'
import {Provider} from 'react-redux'

import App from './pages/App'
import {createClientStore} from './store'

ReactDom.render(<Provider store={createClientStore()}><App/></Provider>, document.getElementById('app'))