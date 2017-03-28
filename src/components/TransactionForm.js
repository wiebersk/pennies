import { Form, Input, Button, DatePicker, Select, Modal, } from "antd";
import React from "react";
import _ from "lodash";
import BudgetCategoryPicker from "components/BudgetCategoryPicker";

const FormItem = Form.Item;

const TransactionForm = Form.create()(
  (props) => {
    const { visible, onCancel, onCreate, form, budgetCats, } = props;
    const { getFieldDecorator, } = form;

    return (
      <Modal title="New Transaction" visible={visible} onOk={onCreate} onCancel={onCancel}>
        <Form className="transaction-form">
          <FormItem>
            { getFieldDecorator("transaction_date",{ rules: [
                { type: "object",
                  required: true, message: "Please select a transaction date!",
                },
              ], }
            )(<DatePicker placeholder='Transaction Date' />)}
          </FormItem>
          <FormItem>
            { getFieldDecorator("budget_category", { rules: [
              { required: true, message: "Please select a budget category", },
            ], })(
              <BudgetCategoryPicker />
            )}
          </FormItem>
          <FormItem>
            { getFieldDecorator("description", {})(
              <Input placeholder="Description" />
            )}
          </FormItem>
          <FormItem>
            { getFieldDecorator("transaction_amount", { rules: [
              { required: true, message: "Please enter a transaction amount", },
            ], })(
              <Input placeholder="amount" />
            )
          }
          </FormItem>
        </Form>
      </Modal>
  );}
);


export default TransactionForm;
