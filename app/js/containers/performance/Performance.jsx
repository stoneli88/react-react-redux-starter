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
  Tabs,
} from 'amazeui-touch';

import './performance.scss';

/* eslint react/prefer-stateless-function: [0] */
class Performance extends React.Component {
  render() {
    return (
      <View className="hm-performance">
        <Container scrollable className="ks-grid">
          <Tabs inset>
            <Tabs.Item
              title="实时动态"
              key="activity"
              navStyle="alert"
            >
              <Grid className="hm-performance-menu">
                <Col cols={3}>
                  <span className="icon-hemiao iconfont icon-jine" />
                  <span className="text small">客户特征</span>
                  <span className="text">1609</span>
                </Col>
                <Col cols={3}>
                  <span className="icon-hemiao iconfont icon-shaixuan" />
                  <span className="text small">今日特征</span>
                  <span className="text">26</span>
                </Col>
              </Grid>
              <Group header="昨日动态">
                <Grid className="hm-performance-list">
                  <Col cols={6} className="noPadding">
                    <ul className="list">
                      <li className="item item-linked">
                        <a href="#/">
                          <div className="item-before">
                            <span className="icon-hemiao iconfont icon-shangpin" />
                          </div>
                          <h3 className="item-title">售出商品件数</h3>
                          <div className="item-after">
                            <span className="badge badge-alert badge-rounded">117</span>
                          </div>
                        </a>
                      </li>
                      <li className="item item-linked">
                        <a href="#/">
                          <div className="item-before">
                            <span className="icon-hemiao iconfont icon-lianjie" />
                          </div>
                          <h3 className="item-title">连带产品数量</h3>
                          <div className="item-after">
                            <span className="badge badge-alert badge-rounded">6</span>
                          </div>
                        </a>
                      </li>
                      <li className="item item-linked">
                        <a href="#/">
                          <div className="item-before">
                            <span className="icon-hemiao iconfont icon-dongtai" />
                          </div>
                          <h3 className="item-title">新增客户</h3>
                          <div className="item-after">
                            <span className="badge badge-alert badge-rounded">19</span>
                          </div>
                        </a>
                      </li>
                      <li className="item item-linked">
                        <a href="#/">
                          <div className="item-before">
                            <span className="icon-hemiao iconfont icon-chengjiao" />
                          </div>
                          <h3 className="item-title">成交客户</h3>
                          <div className="item-after">
                            <span className="badge badge-alert badge-rounded">40</span>
                          </div>
                        </a>
                      </li>
                      <li className="item item-linked">
                        <a href="#/">
                          <div className="item-before">
                            <span className="icon-hemiao iconfont icon-kedanjia" />
                          </div>
                          <h3 className="item-title">客单价</h3>
                          <div className="item-after">
                            <span className="badge badge-alert badge-rounded">100</span>
                          </div>
                        </a>
                      </li>
                    </ul>
                  </Col>
                </Grid>
              </Group>
            </Tabs.Item>
            <Tabs.Item
              title="绩效考核"
              key="performance"
              navStyle="alert"
            >
              <header className="hm-performance-header">
                <Grid>
                  <Col cols={6}>
                    <span className="text">本月绩效考核</span>
                    <span className="text">50000</span>
                  </Col>
                </Grid>
              </header>
              <Grid className="hm-performance-list">
                <Col cols={6} className="noPadding">
                  <ul className="list">
                    <li className="item item-linked">
                      <a href="#/">
                        <div className="item-before">
                          <span className="icon-hemiao iconfont icon-jine" />
                        </div>
                        <h3 className="item-title">销售目标</h3>
                        <div className="item-after">
                          <span className="badge badge-alert badge-rounded">0</span>
                        </div>
                      </a>
                    </li>
                    <li className="item item-linked">
                      <a href="#/">
                        <div className="item-before">
                          <span className="icon-hemiao iconfont icon-xinzeng" />
                        </div>
                        <h3 className="item-title">新客目标</h3>
                        <div className="item-after">
                          <span className="badge badge-alert badge-rounded">132</span>
                        </div>
                      </a>
                    </li>
                    <li className="item item-linked">
                      <a href="#/">
                        <div className="item-before">
                          <span className="icon-hemiao iconfont icon-dongtai" />
                        </div>
                        <h3 className="item-title">本月销售额</h3>
                        <div className="item-after">
                          <span className="badge badge-alert badge-rounded">1000</span>
                        </div>
                      </a>
                    </li>
                    <li className="item item-linked">
                      <a href="#/">
                        <div className="item-before">
                          <span className="icon-hemiao iconfont icon-kehuguanli" />
                        </div>
                        <h3 className="item-title">新客数</h3>
                        <div className="item-after">
                          <span className="badge badge-alert badge-rounded">32</span>
                        </div>
                      </a>
                    </li>
                    <li className="item item-linked">
                      <a href="#/">
                        <div className="item-before">
                          <span className="icon-hemiao iconfont icon-kedanjia" />
                        </div>
                        <h3 className="item-title">客单价</h3>
                        <div className="item-after">
                          <span className="badge badge-alert badge-rounded">139</span>
                        </div>
                      </a>
                    </li>
                    <li className="item item-linked">
                      <a href="#/">
                        <div className="item-before">
                          <span className="icon-hemiao iconfont icon-dankexiaofei" />
                        </div>
                        <h3 className="item-title">单客消费</h3>
                        <div className="item-after">
                          <span className="badge badge-alert badge-rounded">1039</span>
                        </div>
                      </a>
                    </li>
                  </ul>
                </Col>
              </Grid>
            </Tabs.Item>
            <Tabs.Item
              title="项目任务"
              key="task"
              navStyle="alert"
              disabled
            >
              绩效考核
            </Tabs.Item>
          </Tabs>
        </Container>
      </View>
    );
  }
}

Performance.propTypes = {
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

export default connect(mapStateToProps)(Performance);
