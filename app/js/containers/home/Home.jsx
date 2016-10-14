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

import ReactEcharts from 'echarts-for-react';

// actions
import {
  getCurrentDayTask,
} from '../../actions/users/currentDayTask';

// 文件资源
import '../../../imgs/home/bg-no-text.jpg';
import '../../../imgs/home/female-user-icon.png';
import '../../../imgs/home/default-user-header.png';
import './home.scss';

/* eslint react/prefer-stateless-function: [0] */
class Home extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getCurrentDayTask());
    this.onChartClick = this.onChartClick.bind(this);
  }

  onChartClick(param, echart) {
    console.log(param);
  }

  getOption() {
    const options = {
      title: {
        textStyle: {
          color: '#656565',
          /* eslint max-len: [0] */
          fontFamily: '-apple-system,BlinkMacSystemFont, "PingFang SC", "Hiragino Sans GB", "Segoe UI", "Microsoft YaHei", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "wenquanyi micro hei", "Helvetica Neue", Helvetica, Arial, sans-serif',
          fontSize: 24,
        },
        subtextStyle: {
          color: '#656565',
          /* eslint max-len: [0] */
          fontFamily: '-apple-system,BlinkMacSystemFont, "PingFang SC", "Hiragino Sans GB", "Segoe UI", "Microsoft YaHei", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "wenquanyi micro hei", "Helvetica Neue", Helvetica, Arial, sans-serif',
          fontSize: 12,
        },
        show: true,
        text: '53%',
        subtext: '当前销售额\n1000元',
        x: 'center',
        y: '25%',
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: ['90%', '80%'],
          avoidLabelOverlap: false,
          data: [
              { value: 53,
                name: '当前销售额',
                itemStyle: {
                  normal: {
                    color: '#ff6978',
                  },
                },
              },
              { value: 47,
                name: '',
                itemStyle: {
                  normal: {
                    borderColor: '#FDD1D8',
                    color: '#E9F1F3',
                  },
                },
              },
          ],
          label: {
            normal: {
              show: false,
            },
            emphasis: {
              show: false,
            },
          },
          labelLine: {
            normal: {
              show: false,
            },
          },
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    };
    return options;
  }

  render() {
    const onEvents = {
      click: this.onChartClick,
    };
    return (
      <View>
        <Container scrollable className="ks-grid">
          <header className="hm-home-header">
            <Grid>
              <Col cols={4}>
                <Grid className="hm-home-header-user-profile">
                  <Col>
                    <img src="../../../imgs/home/default-user-header.png" alt="" />
                    <span className="text">李亮</span>
                  </Col>
                </Grid>
              </Col>
              <Col cols={2} className="hm-home-header-qcode">
                <span className="icon-hemiao iconfont icon-erweima" />
                <span className="text">二维码</span>
              </Col>
            </Grid>
            <Grid>
              <Col cols={3} className="hm-home-task">
                <Button className="hm-home-btn-task" amStyle="warning">今日任务</Button>
                <Badge
                  amStyle="warning"
                  key="3"
                  rounded
                >
                3
                </Badge>
              </Col>
              <Col cols={3} className="hm-home-task">
                <Button className="hm-home-btn-task" amStyle="warning">未完成任务</Button>
                <Badge
                  amStyle="warning"
                  key="3"
                  rounded
                >
                5
                </Badge>
              </Col>
            </Grid>
          </header>
          <div className="hm-home-section-shop-notify">
            <Grid>
              <Col cols={6}>
                <Group header="门店通知">
                  <Notification
                    visible
                    static
                    amStyle="alert"
                    closeBtn={false}
                  >
                    1. 这是一个通知 :)
                  </Notification>
                  <Notification
                    visible
                    static
                    amStyle="alert"
                    closeBtn={false}
                  >
                    2. 这是一个通知 :)
                  </Notification>
                  <Notification
                    visible
                    static
                    amStyle="alert"
                    closeBtn={false}
                  >
                    3. 这是一个通知 :)
                  </Notification>
                </Group>
              </Col>
            </Grid>
          </div>
          <div className="hm-home-section-sales-percent">
            <Grid>
              <Col cols={6}>
                <Group>
                  <Grid>
                    <Col cols={3}>
                      <span className="text">本月销售完成进度</span>
                      <ReactEcharts
                        option={this.getOption()}
                        style={{ height: 130 }}
                        onEvents={onEvents}
                      />
                    </Col>
                    <Col cols={3}>
                      <span className="text">本月客户成交率</span>
                      <ReactEcharts
                        option={this.getOption()}
                        style={{ height: 130 }}
                        onEvents={onEvents}
                      />
                    </Col>
                  </Grid>
                </Group>
              </Col>
            </Grid>
          </div>
        </Container>
      </View>
    );
  }
}

Home.propTypes = {
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

export default connect(mapStateToProps)(Home);
