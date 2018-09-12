import React, { Component } from 'react';
import './edit-tag.scss';
import { Popover, Input, Button, Form } from 'antd';
import Api from '../../utils/api';

const FormItem = Form.Item;

class EditTag extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    
    this.state = {};
  }

  componentDidMount() {
    console.log(this.props.form);
    this.props.form.setFieldsValue({tag: this.props.item.tag})
  }

  /**
   * 处理确认
   */
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.onClickSave();
        this.updateTag2Web(values);
      }
    });
  };

  /**
   * 更新tags
   */
  updateTag2Web(values) {
    Api.updateTag({
      name: values.tag,
      id: this.props.item._id
    }).then(() => {
      this.props.onSaveSuccess(values.tag, this.props.item._id);
    })
  }
  
  render() {
    console.log(this.props);
    const { getFieldDecorator } = this.props.form;

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem>
          {getFieldDecorator('tag', {
            rules: [{ required: true, message: '标签不能为空' }]
          })(
            <Input
              placeholder="请输入标签"
            />
          )}
        </FormItem>
        <Button className="btn-save" htmlType="submit">
            Save
        </Button>
      </Form>
    );
  }
}

export default Form.create()(EditTag);
