import React from "react";
import Header from "components/Header";
import Footer from "components/Footer";
import MenuBar from "containers/Menu";
import { Button, Layout, LocaleProvider, } from "antd";
import enUS from "antd/lib/locale-provider/en_US";
import { RETRIEVE_BUDGETS_REQUESTED, CREATE_BUDGET_REQUESTED, } from "actions/budget.js";
import { connect, } from "react-redux";

const { Content, } = Layout;

class App extends React.Component {
  componentDidMount () {
    this.props.loadBudgets();
  }

  render () {
    return (
      <LocaleProvider locale={enUS}>
        <Layout>
          <Header />
          <Content style={{ padding: "0 50px", }}>
            <MenuBar />
            <div style={{ background: "#fff", padding: 24, minHeight: 280, marginTop: 20, }}>
              {this.props.children}
            </div>
          </Content>
          <Footer />
        </Layout>
      </LocaleProvider>
    );
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadBudgets: () => {
      dispatch({ type: RETRIEVE_BUDGETS_REQUESTED, });
    },
  };
};


export default connect(
  undefined,
  mapDispatchToProps
)(App);
