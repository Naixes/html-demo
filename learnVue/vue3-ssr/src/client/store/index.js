import {createStore} from 'vuex'
import demoModule from './modules/demo'

export default () => createStore({
    modules:  {
        demo: demoModule()
    }
})