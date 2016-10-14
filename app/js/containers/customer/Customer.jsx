import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  Container,
  Group,
  TabBar,
  Grid,
  Col,
  Button,
  Badge,
  Notification,
  View,
} from 'amazeui-touch';

import './customer.scss';

/* eslint react/prefer-stateless-function: [0] */
class Customer extends React.Component {
  render() {
    return (
      <View>
        <Container scrollable className="ks-grid">
          <header className="hm-customer-header">
            <Grid>
              <Col cols={6}>
                <span className="text">累计客户</span>
                <span className="text">500</span>
              </Col>
            </Grid>
          </header>
          <Grid className="hm-customer-menu">
            <Col cols={2}>
              <span className="icon-hemiao iconfont icon-kehutezheng" />
              <span className="text">客户特征</span>
            </Col>
            <Col cols={2}>
              <span className="icon-hemiao iconfont icon-shaixuan" />
              <span className="text">客户筛选</span>
            </Col>
            <Col cols={2}>
              <span className="icon-hemiao iconfont icon-kehuliebiao" />
              <span className="text">客户列表</span>
            </Col>
          </Grid>
          <Grid className="hm-customer-list">
            <Col cols={6}>
              <ul className="list">
                <li className="item item-linked">
                  <a href="#/">
                    <div className="item-before">
                      <span className="icon-hemiao iconfont icon-xinzeng" />
                    </div>
                    <h3 className="item-title">本月新增客户</h3>
                    <div className="item-after">
                      <span className="badge badge-alert badge-rounded">0</span>
                    </div>
                  </a>
                </li>
                <li className="item item-linked">
                  <a href="#/">
                    <div className="item-before">
                      <span className="icon-hemiao iconfont icon-chengjiao" />
                    </div>
                    <h3 className="item-title">本月成交客户</h3>
                    <div className="item-after">
                      <span className="badge badge-alert badge-rounded">132</span>
                    </div>
                  </a>
                </li>
                <li className="item item-linked">
                  <a href="#/">
                    <div className="item-before">
                      <span className="icon-hemiao iconfont icon-shuimian" />
                    </div>
                    <h3 className="item-title">本月沉睡客户</h3>
                    <div className="item-after">
                      <span className="badge badge-alert badge-rounded">10</span>
                    </div>
                  </a>
                </li>
                <li className="item item-linked">
                  <a href="#/">
                    <div className="item-before">
                      <span className="icon-hemiao iconfont icon-liushi" />
                    </div>
                    <h3 className="item-title">本月流失客户</h3>
                    <div className="item-after">
                      <span className="badge badge-alert badge-rounded">32</span>
                    </div>
                  </a>
                </li>
                <li className="item item-linked">
                  <a href="#/">
                    <div className="item-before">
                      <span className="icon-hemiao iconfont icon-liulan" />
                    </div>
                    <h3 className="item-title">本月浏览商城客户数</h3>
                    <div className="item-after">
                      <span className="badge badge-alert badge-rounded">1039</span>
                    </div>
                  </a>
                </li>
                <li className="item item-linked">
                  <a href="#/">
                    <div className="item-before">
                      <span className="icon-hemiao iconfont icon-zhanbi2" />
                    </div>
                    <h3 className="item-title">客户消费占比</h3>
                    <div className="item-after">
                      <span className="badge badge-alert badge-rounded">60%</span>
                    </div>
                  </a>
                </li>
              </ul>
            </Col>
          </Grid>
        </Container>
      </View>
    );
  }
}

Customer.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const { currentDayTaskSize } = state;
  if (!currentDayTaskSize) {
    return {
      currentDayTaskSize: 0,
    };
  }
  return {
    currentDayTaskSize,
  };
}

export default connect(mapStateToProps)(Customer);
