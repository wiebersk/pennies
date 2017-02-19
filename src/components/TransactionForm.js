import { Form, Input, Button, DatePicker, Select, } from "antd";
import React from "react";
import _ from "lodash";

const FormItem = Form.Item;
const Option = Select.Option;

const TransactionForm = Form.create()(React.createClass({
  handleSubmit (ev) {
    ev.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  },

  render () {
    const { getFieldDecorator, } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="transaction-form">
        <FormItem>
          <DatePicker placeholder='Transaction Date' />
        </FormItem>
        <FormItem>
          <Select placeholder="Select a budget category">
            <Option value="test">Test Category</Option>
          </Select>
        </FormItem>
        <FormItem>
          <Input placeholder="Description" />
        </FormItem>
        <FormItem>
          <Input placeholder="amount" />
        </FormItem>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Submit
        </Button>
      </Form>
    );
  },

})
);

export default TransactionForm;
