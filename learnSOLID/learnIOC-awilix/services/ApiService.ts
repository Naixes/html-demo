import { IData } from './../interfaces/IData';
import { IApi } from './../interfaces/IApi';

class ApiService implements IApi {
    getInfo(): Promise<IData> {
        return new Promise<IData>((resolve, reject) => {
            resolve({
                item: 'back data',
                result: ['sin']
            })
        })
    }
}

export default ApiService