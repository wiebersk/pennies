import { InputNumber, } from "antd";
import React from "react";
import _ from "lodash";

class AmountInput extends React.Component {
  constructor (props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);


    this.state = {
      amount: props.value || 100,
    };
  }

  handleChange (amt) {
    this.setState({ amount: amt, });
    // Should provide an event to pass value to Form.
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(amt);
    }
  }

  render () {
    return (
        <InputNumber value={this.state.amount} formatter={value => `$ ${value}`} onChange={this.handleChange} style={{ width: "60%", marginRight: 8, }}/>
    );
  }
}

export default AmountInput;
