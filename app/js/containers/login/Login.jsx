/* eslint arrow-body-style: [0] */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import {
  Container,
  View,
  Grid,
  Col,
  Group,
  Icon,
  Field,
  Button,
  Notification,
  Loader,
} from 'amazeui-touch';

import { login } from '../../actions/auth';

import '../../../imgs/login/page-login-logo.png';
import '../../../imgs/login/bg-border-button.png';
import '../../../imgs/login/bg-bottom.png';
import '../../../imgs/login/icon-header.png';
import '../../../imgs/login/icon-lock.png';
import './login.scss';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      isDisabled: false,
      logging: false,
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.closeNotification = this.closeNotification.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user) {
      // logged in, let's show redirect if any, or show home
      try {
        const redirect = this.props.location.query.redirect;
        this.context.router.replace(redirect);
      } catch (err) {
        this.context.router.replace('/home');
      }
    }
    // 显示登陆出错信息
    if (!nextProps.user && nextProps.loginError) {
      this.setState({
        visible: true,
        isDisabled: false,
        logging: false,
      });
    }
  }

  handleLogin(e) {
    e.preventDefault();
    this.setState({ isDisabled: true, logging: true });
    this.props.dispatch(login(this.accountRef.value, this.passwordRef.value));
    return false;
  }

  closeNotification(e) {
    this.setState({
      visible: false,
    });
  }

  render() {
    const { user, loginError } = this.props;
    return (
      <View>
        <Container>
          <header className="hm-login-header">
            <img src="../imgs/login/page-login-logo.png" alt="" />
          </header>
          <form action="post" className="hm-login-form" onSubmit={this.handleLogin}>
            <div className="field-group hm-login-form-text">
              <span className="field-group-label">
                <img src="../imgs/login/icon-header.png" alt="用户名" />
              </span>
              <input
                type="text"
                name="account"
                ref={(c) => { this.accountRef = c; }}
                placeholder="请输入用户名"
                className="field"
              />
            </div>
            <div className="field-group hm-login-form-text">
              <span className="field-group-label">
                <img src="../imgs/login/icon-lock.png" alt="密码" />
              </span>
              <input
                type="password"
                name="password"
                ref={(c) => { this.passwordRef = c; }}
                placeholder="请输入密码"
                className="field"
              />
            </div>
            <Button
              amSize="xl"
              amStyle="warning"
              type="submit"
              disabled={this.state.isDisabled}
              hollow
            >登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;陆
              <Loader className={this.state.logging ? '' : 'hide'} amStyle="warning" rounded />
            </Button>
          </form>
          <footer className="hm-login-footer">
            <img src="../imgs/login/bg-bottom.png" alt="" />
          </footer>
          <Notification
            title="登陆出错了!"
            amStyle="alert"
            visible={this.state.visible}
            animated
            onDismiss={this.closeNotification}
          >
            {loginError && loginError.message}.
          </Notification>
        </Container>
      </View>
    );
  }
}

Login.contextTypes = {
  router: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
};

Login.propTypes = {
  user: PropTypes.object,
  loginError: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object,
};

function mapStateToProps(state) {
  const { auth } = state;
  if (auth) {
    return { user: auth.user, loginError: auth.loginError };
  }

  return { user: null };
}

export default connect(mapStateToProps)(Login);
