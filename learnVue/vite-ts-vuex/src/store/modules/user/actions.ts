import { ActionContext } from "vuex";
import { userState } from "./store";
import { GET_DATA } from "./constant";

export default {
    [GET_DATA]({commit}: ActionContext<userState, unknown>) {
        setTimeout(function() {
            const payload = false
            commit(GET_DATA, payload)
        }, 2000)
    }
}