import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadUserProfile } from '../../utils/apiUtils';

class RestrictPage extends Component {
  componentWillMount() {
    let { user } = this.props;
    const { router } = this.context;

    // 如果当前的状态机没有值, 表明页面已经被刷新, 从localstorage或sessionstore获取.
    if (!user) { user = loadUserProfile(); }

    // If this page is restricted, go to loginPage first.
    // (But pass on this page's path in order to redirect back upon login)
    if (!user) {
      const path = this.props.location.pathname;
      router.push(`/login?redirect=${path}`);
    } else {
      this.user = user;
    }
  }

  render() {
    if (this.user) {
      return this.props.children;
    }
    return null;
  }
}

RestrictPage.contextTypes = {
  router: PropTypes.object.isRequired,
};
RestrictPage.propTypes = {
  user: PropTypes.object,
  children: PropTypes.object,
  location: PropTypes.object,
};

function mapStateToProps(state) {
  return { user: state.auth.user };
}

export default connect(mapStateToProps)(RestrictPage);
