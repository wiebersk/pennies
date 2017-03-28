import { AutoComplete, } from "antd";
import React from "react";
import _ from "lodash";
import { connect, } from "react-redux";
import { getUniqueBudgetCats, } from "selectors/currentBudget";

class BudgetCategoryPicker extends React.Component {
  constructor (props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);


    this.state = {
      budget_category: props.value || 'Salary',
    };
  }

  handleChange (e) {
    this.setState({ budget_category: e, });
    // Should provide an event to pass value to Form.
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(e);
    }
  }

  render () {
    const budgetCats = this.props.budgetCats;

    return (
        <AutoComplete dataSource={_.map(budgetCats, "name")} value={this.state.budget_category} onChange={this.handleChange} style={{ width: "60%", marginRight: 8, }} />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    budgetCats: getUniqueBudgetCats(state),
  };
};

export default connect(
  mapStateToProps,
  undefined
)(BudgetCategoryPicker);
