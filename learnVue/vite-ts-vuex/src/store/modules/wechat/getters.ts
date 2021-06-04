import { userState } from "./store";

const moduleGetters = {
    isTest: (state: userState): string => {
        return `${state.loading}`
    }
}

export default moduleGetters