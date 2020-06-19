import { Effect, Subscription, Reducer, request } from 'umi';

export interface HeroProps {
    ename: number;
    cname: string;
    title: string;
    new_type: number;
    hero_type: number;
    skin_name: string;
  }

export interface HeroModelState {
  name: string;
  heros: HeroProps[];
  freeheros: HeroProps[];
  filterKey: number;
  itemHover: number;
}

export interface HeroModelType {
  namespace: 'hero';
  state: HeroModelState;
  effects: {
    query: Effect;
    fetch: Effect;
  };
  reducers: {
    save: Reducer<HeroModelState>;
  };
  subscriptions: { setup: Subscription };
}

const HeroModel: HeroModelType = {
    namespace: 'hero',

    state: {
        name: 'hero',
        heros: [],
        freeheros: [],
        filterKey: 0,
        itemHover: 0
    },

    effects: {
        *query({ payload }, { call, put }) {
    
        },
        // 这里的 put 方法和 dispatch 方法可以理解为同一个方法，只是在不同的地方，用不同的方法名表示而已。这里我们写了一个静态数据，然后又发起了 save 的事件。
        *fetch({ type, payload }, { put, call, select }) {
            const data = yield request('/web201605/js/herolist.json');
            // 传参获取单条数据
            // const data = yield request('/herodetails.json', {
            //     method: 'POST',
            //     headers: {
            //       Accept: 'application/json',
            //       'Content-Type': 'application/json; charset=utf-8',
            //     },
            //     body: JSON.stringify({
            //       ename: 110,
            //     }),
            // });
            const freeheros = yield request('mock/freeheros.json', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json; charset=utf-8',
              },
              body: JSON.stringify({
                number: 10,
              }),
            });
            const localData = [
                {
                    ename: 105,
                    cname: '廉颇',
                    title: '正义爆轰',
                    new_type: 0,
                    hero_type: 3,
                    skin_name: '正义爆轰|地狱岩魂',
                },
                {
                    ename: 106,
                    cname: '小乔',
                    title: '恋之微风',
                    new_type: 0,
                    hero_type: 2,
                    skin_name: '恋之微风|万圣前夜|天鹅之梦|纯白花嫁|缤纷独角兽',
                },
            ];
            yield put({
                type: 'save',
                payload: {
                    heros: data||localData,
                    freeheros
                },
            });
        },
    },
    reducers: {
        save(state, action) {
            return {
                ...state,
                ...action.payload,
            };
        },
    },
    // 监听路由事件取得静态数据，修改页面 state ，触发页面重绘
    // subscriptions 是一个全局的监听，就是说，当设定触发条件满足时，所有的 subscriptions 都会响应，所以这里判断了路由为当前路由时，发起一个 effects 事件
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/hero') {
                    dispatch({
                        type: 'fetch'
                    })
                }
            });
        }
    },
};

export default HeroModel;