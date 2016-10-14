import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  Container,
  Group,
  Grid,
  Col,
  Button,
  Badge,
  Notification,
  View,
} from 'amazeui-touch';

import ReactEcharts from 'echarts-for-react';

// actions
import { getCurrentDayTask } from '../../actions/users/currentDayTask';
import { getMonthSale } from '../../actions/users/monthSale';
import { getStoreNote } from '../../actions/users/storeNote';
import { getUndoDayTask } from '../../actions/users/undoDayTask';

// 文件资源
import '../../../imgs/home/bg-no-text.jpg';
import '../../../imgs/home/female-user-icon.png';
import '../../../imgs/home/default-user-header.png';
import './home.scss';

/* eslint react/prefer-stateless-function: [0] */
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isErrorHappend: false,
    };
    this.onChartClick = this.onChartClick.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getCurrentDayTask());
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.error) {
      this.setState({
        isErrorHappend: true,
      });
    }
  }

  onChartClick(param, echart) {}

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
    const { user } = this.props;
    const onEvents = {
      click: this.onChartClick,
    };
    return (
      <View>
        <Container scrollable className="ks-grid">
          <Notification
            title="登陆出错了!"
            amStyle="alert"
            visible={this.state.isErrorHappend}
            animated
            onDismiss={this.closeNotification}
          >
            {user.error && user.error.message}.
          </Notification>
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
  user: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  const { user } = state;
  if (!user) {
    // todo: 需要在此处应用应用程序缓存, 在后台数据无法获取的时候, 我们使用保存在应用缓存的数据.
    return {
      currentDayTaskSize: 0,
      currentDayTaskList: [],
      undoTaskSize: 0,
      undoTaskList: [],
    };
  }
  return {
    user,
  };
}

export default connect(mapStateToProps)(Home);
