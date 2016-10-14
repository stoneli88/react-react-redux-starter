// 类库
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, IndexRedirect, hashHistory, withRouter } from 'react-router';
import { Provider } from 'react-redux';
import { Container, TabBar } from 'amazeui-touch';

// 数据源
import configureStore from './store/configureStore';

// 模块
import Login from './containers/login/Login.jsx';
import Home from './containers/home/Home.jsx';
import Customer from './containers/customer/Customer.jsx';
import Performance from './containers/performance/Performance.jsx';
import NotFound from './containers/misc/NotFound.jsx';
import RestrictPage from './containers/misc/RestrictPage.jsx';

// 程序入口.
/* eslint react/prefer-stateless-function: [0] */
class App extends React.Component {
  render() {
    const {
      location,
      params,
      children,
      history,
      route,
    } = this.props;

    const { router } = this.context;
    const transition = children.props.transition || 'sfr';

    return (
      <Container direction="column" id="sk-container">
        <Container transition={transition}>
          {React.cloneElement(children, { key: location.key })}
        </Container>
        <nav className="tabbar">
          <Link
            title="首页"
            to="/home"
            className="tabbar-item"
            activeClassName={router.isActive('/home', true) ? 'active' : ''}
          >
            <span className="icon-hemiao iconfont icon-shouye" />
            <span className="tabbar-label">首页</span>
          </Link>
          <Link
            title="数据统计"
            className="tabbar-item"
            to="/statistical"
            activeClassName={router.isActive('/statistical', true) ? 'active' : ''}
          >
            <span className="icon-hemiao iconfont icon-dongtai" />
            <span className="tabbar-label">数据统计</span>
          </Link>
          <Link
            title="客户管理"
            className="tabbar-item"
            to="/customer"
            activeClassName={router.isActive('/customer', true) ? 'active' : ''}
          >
            <span className="icon-hemiao iconfont icon-kehuguanli" />
            <span className="tabbar-label">客户管理</span>
          </Link>
          <Link
            title="绩效任务"
            className="tabbar-item"
            to="/performance"
            activeClassName={router.isActive('/performance', true) ? 'active' : ''}
          >
            <span className="icon-hemiao iconfont icon-jixiaopinggu" />
            <span className="tabbar-label">绩效任务</span>
          </Link>
          <Link
            title="门店协同"
            className="tabbar-item"
            to="/shopCooperate"
            activeClassName={router.isActive('/shopCooperate', true) ? 'active' : ''}
          >
            <span className="icon-hemiao iconfont icon-mendian" />
            <span className="tabbar-label">门店协同</span>
          </Link>
        </nav>
      </Container>
    );
  }
}
// 定义context静态变量
// @see https://facebook.github.io/react/docs/context.html
App.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

// 定义propTypes静态变量
App.propTypes = {
  location: React.PropTypes.object.isRequired,
  history: React.PropTypes.object.isRequired,
  route: React.PropTypes.object.isRequired,
};

// 初始化批量生产Store.
const store = configureStore();

// withRouter HoC
// @see https://github.com/reactjs/react-router/blob/0616f6e14337f68d3ce9f758aa73f83a255d6db3/upgrade-guides/v2.4.0.md#v240-upgrade-guide
const routes = (
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/login" component={Login} />
      <Route path="/" component={App}>
        <IndexRedirect to="/home" />
        <Route component={RestrictPage}>
          <Route path="/home" component={Home} />
          <Route path="/customer" component={Customer} />
          <Route path="/performance" component={Performance} />
        </Route>
        <Route path="*" component={NotFound} />
      </Route>
    </Router>
  </Provider>
);

document.addEventListener('DOMContentLoaded', () => {
  render(routes, document.getElementById('root'));
});
