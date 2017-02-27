import { Form, Input, Button, DatePicker, Select, Modal, Steps, } from "antd";
import React from "react";
import _ from "lodash";

const FormItem = Form.Item;
const Option = Select.Option;
const Step = Steps.Step;

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

const steps = [{
  title: "Budget Details",
  content: "Content 1",
}, {
  title: "Budget Plan",
  content: "Content 2",
}, {
  title: "Review",
  content: "Content 3",
},
];


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
  render () {
    const { current, } = this.state;
    const { budgetCats, visible, onCreate, onCancel, ref, } = this.props;
    return (
      <Modal title="New Transaction" visible={visible} onOk={onCreate} onCancel={onCancel}>
        <Steps current={current}>
          {steps.map(item => <Step key={item.title} title={item.title} />)}
        </Steps>
        <div className="steps-content">{steps[this.state.current].content}</div>
        <div className="steps-action">
          {
            this.state.current < steps.length - 1
            &&
            <Button type="primary" onClick={() => {this.nextStep();}}>Next</Button>
          }
          {
            this.state.current === steps.length - 1
            &&
            <Button type="primary">Done</Button>
          }
          {
            this.state.current > 0
            &&
            <Button style={{ marginLeft: 8, }} onClick={() => {this.prevStep();}}>
              Previous
            </Button>
          }
        </div>
      </Modal>
    );
  }

}


export default BudgetStepsForm;
