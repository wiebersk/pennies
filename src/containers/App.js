import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button, Layout } from 'antd';
const { Content } = Layout;
import {RETRIEVE_BUDGETS_REQUESTED, CREATE_BUDGET_REQUESTED} from '../actions/budget.js'
import {connect} from 'react-redux';

class App extends React.Component {
  componentDidMount() {
    this.props.loadBudgets();
  }

  render() {
    return (
      <Layout>
        <Header />
        <Content style={{ padding: '0 50px' }}>
          <div style={{ background: '#fff', padding: 24, minHeight: 280, marginTop: 20 }}>
            {this.props.children}
          </div>
        </Content>
        <Footer />
      </Layout>
    );
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadBudgets: () => {
      dispatch({type: RETRIEVE_BUDGETS_REQUESTED})
    }
  }
}


export default connect(
  undefined,
  mapDispatchToProps
)(App);
