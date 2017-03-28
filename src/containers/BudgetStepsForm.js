import { Form, Input, InputNumber, Button, DatePicker, Select, Modal, Steps, } from "antd";
import React from "react";
import _ from "lodash";

const FormItem = Form.Item;
const Option = Select.Option;
const Step = Steps.Step;
const InputGroup = Input.Group;

const catOptions = (cats) => {
  let catList = [];
  if (_.isEmpty(cats)) {
    catList = "";
  } else {
    _.forEach(cats, (cat, id) => {
      catList.push(<Option key={cat.name} value={cat.name}>{cat.name}</Option>);
    });
  }
  return catList;
};


class BudgetStepsForm extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      current: 0,
    };
  }
  nextStep () {
    const current = this.state.current + 1;
    this.setState({ current, });
  }
  prevStep () {
    const current = this.state.current - 1;
    this.setState({ current, });
  }

  content (fieldDecorator) {
    switch (this.state.current) {
      case 0:
        return (<div><FormItem>
          { fieldDecorator("name", { rules: [
            { required: true, message: "Please enter a budget name", },
          ], })(
            <Input placeholder="name" />
          )
        }
      </FormItem>
      <FormItem>
        { fieldDecorator("budget_start_date",{ rules: [
            { type: "object",
              required: true, message: "Please select a budget date!",
            },
          ], }
        )(<DatePicker placeholder='Budget Start Date' />)}
      </FormItem>
      <FormItem>
        { fieldDecorator("budget_end_date",{ rules: [
            { type: "object",
              required: true, message: "Please select a budget end date!",
            },
          ], }
        )(<DatePicker placeholder='Budget End Date' />)}
      </FormItem>
      <FormItem>
        { fieldDecorator("description", {})(
          <Input placeholder="Description" />
        )}
      </FormItem></div>);
      case 1:
        return (
          <FormItem>
            { fieldDecorator("budget_plan", {}
            )(
              <InputGroup size="large">
                <Select placeholder="Select a budget category">
                  {catOptions(this.props.budgetCats)}
                </Select>
                <InputNumber formatter={value => `$ ${value}`} />
              </InputGroup>
            )
            }
          </FormItem>
        );
      default:
        return "";
    }
  }

  buttons () {
    switch (this.state.current) {
      case 0:
        return (
          <Button type="primary" onClick={() => {this.nextStep();}}>Next</Button>
        );
      case 1:
        return (
          <div>
            <Button style={{ marginLeft: 8, }} onClick={() => {this.prevStep();}}>Previous</Button>
            <Button type="primary" onClick={() => {this.nextStep();}}>Next</Button>
          </div>
        );
      case 2:
        return (
          <div>
            <Button style={{ marginLeft: 8, }} onClick={() => {this.prevStep();}}>Previous</Button>
            <Button type="primary" onClick={(this.props.onCreate)}>Done</Button>
          </div>
        );
    }
  }
  render () {
    const { current, } = this.state;
    const { budgetCats, visible, onCreate, onCancel, form, } = this.props;
    const { getFieldDecorator, } = form;

    return (
      <Modal title="New Transaction" visible={visible} onOk={onCreate} onCancel={onCancel} footer={this.buttons()}>
        <BudgetForm current={current} content={this.content(getFieldDecorator)} />

      </Modal>
    );
  }

}

const BudgetForm = Form.create()(
  (props) => {
    const { current, form, content, } = props;
    const { getFieldDecorator, } = form;

    return (
      <Form className="transaction-form">
        <Steps current={current}>
          <Step key="budget-details" title="Budget Details" />
          <Step key="budget-plan" title="Budget Plan" />
          <Step key="budget-summary" title="Review Budget" />
        </Steps>
        <div className="steps-content">
          { content }
        </div>
      </Form>
    );}
);

export default Form.create({})(BudgetStepsForm);
