import React from 'react';
import { BrowserRouter, Link, Route, Redirect, Switch } from 'react-router-dom';

// 列表-详情-后退
// 管理-新增/搜索

const ProductList = () => {
    return (
        <div>
          <h3>ProductList</h3>
          <Link to="/detail/web">web全栈</Link>
        </div>
    )
}

const ProductDetail = ({match, history, location}) => {
    console.log(match, history, location)
    return (
        <div>
          <h3>ProductDetail</h3>
          {match.params.name}
          <button onClick={history.goBack}>后退</button>
        </div>
    )
}

const ProductManage = () => {
    return (
        <div>
            <h3>ProductManage</h3>
            {/* to:可以传一个对象,state可以传复一些杂的参数 */}
            <Link to="add">新增 | </Link>
            <Link to="search">搜索</Link>
            <Route path="/manage/add" component={() => (<div>新增</div>)}></Route>
            <Route path="/manage/search" component={() => (<div>搜索</div>)}></Route>
            <Redirect to="/manage/add"></Redirect>
            <Route component={() => <h3>页面不存在</h3>} />
        </div>
    )
}

// 路由守卫:利用render属性,增加逻辑扩展用户检查功能
// render和component有竞争关系，component优先于render
const PrivateRoute = ({component: Component, isLogin, ...rest}) => {
    return (
        <Route 
            {...rest}
            render={
                // props === {match, history, location}
                props => 
                    // 判断是否登录
                    isLogin ? (
                        // 登录直接渲染组件
                        <Component/>
                    ) : (
                        // 未登录重定向登陆页面,传入当前页面路径,方便登陆后跳转
                        <Redirect to={{
                            pathname: "/login",
                            state: {redirect: props.location.pathname}
                        }}></Redirect>
                    )
            }
        ></Route>
    )
}

export default class RouterTest extends React.Component {
    render() {
        return (
            <BrowserRouter>
                {/* 路由跳转 */}
                <nav>
                    <Link to="/">商品列表 | </Link>
                    <Link to="/manage">商品管理</Link>
                </nav>
                {/* 路由配置 */}
                {/* react-router匹配不是独占的 */}
                {/* Switch:独占 */}
                <Switch>
                    {/* exact:精确匹配 */}
                    <Route exact path="/" component={ProductList}></Route>
                    <Route path="/detail/:name" component={ProductDetail}></Route>
                    <PrivateRoute path="/manage" component={ProductManage}></PrivateRoute>
                    <Route path="/login" component={() => (<div>login page</div>)}></Route>
                </Switch>
            </BrowserRouter>
        )
    }
}