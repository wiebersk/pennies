import { Form, Input, Icon, InputNumber, Button, DatePicker, AutoComplete, Modal, } from "antd";
import BudgetCategoryPicker from "components/BudgetCategoryPicker";
import React from "react";
import _ from "lodash";

const FormItem = Form.Item;
const InputGroup = Input.Group;
let uuid = 0;

class BudgetForm extends React.Component {


  render () {
    const { getFieldDecorator, getFieldValue, } = this.props.form;
    getFieldDecorator("budget_categories", { initialValue: [], });
    getFieldDecorator("amounts", { initialValue: [], });
    const keys = getFieldValue("budget_categories");
    const formItems = keys.map((k, index) => {
      return (
        <div key={k}>
          <FormItem
            required={false}
          >
            {getFieldDecorator(`budget_categories${k}`, {
              validateTrigger: ["onChange", "onBlur",],
              rules: [{
                type: "object",
                required: true,
                whitespace: true,
                message: "Budget Category is requred",
              },],
            })(
              <BudgetCategoryPicker />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator(`amounts${k}`, {
              initialValue: 100,
            })(
              <InputNumber formatter={value => `$ ${value}`} />
            )}
          </FormItem>
        </div>
      );
    });

    const add = () => {
      uuid += 1;
      // can use data-binding to get
      const keys = this.props.form.getFieldValue("budget_categories");
      const amts = this.props.form.getFieldValue("amounts");
      const nextKeys = keys.concat(uuid);
      const amtKeys = amts.concat(uuid);
      // can use data-binding to set
      // important! notify form to detect changes
      this.props.form.setFieldsValue({
        budget_categories: nextKeys,
        amounts: amtKeys,
      });
    };

    return (
      <Modal title="New Budget" visible={this.props.visible} onOk={this.props.onCreate} onCancel={this.props.onCancel}>
        <div>
          <FormItem>
            { getFieldDecorator("name", { rules: [
              { required: true, message: "Please enter a budget name", },
            ], })(
              <Input placeholder="name" />
            )
            }
          </FormItem>
          <FormItem>
            { getFieldDecorator("budget_start_date",{ rules: [
                { type: "object",
                  required: true, message: "Please select a budget date!",
                },
              ], }
            )(<DatePicker placeholder='Budget Start Date' />)}
          </FormItem>
          <FormItem>
            { getFieldDecorator("budget_end_date",{ rules: [
                { type: "object",
                  required: true, message: "Please select a budget end date!",
                },
              ], }
            )(<DatePicker placeholder='Budget End Date' />)}
          </FormItem>
          <FormItem>
            { getFieldDecorator("description", {})(
              <Input placeholder="Description" />
            )}
          </FormItem>
          <Button type="dashed" onClick={add}>
            <Icon type="plus" /> Add field
          </Button>
          {formItems}
        </div>
      </Modal>
    );
  }

}

const WrappedBudgetForm = Form.create()(BudgetForm);
export default WrappedBudgetForm;
