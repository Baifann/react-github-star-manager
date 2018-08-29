import React, { Component } from 'react';
import { Input, List } from 'antd';
import './controlList.css';
import StarFilter from '../star-filter/star-filter';

class ControlList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tagTableData: [],
      inputValue: ''
    };

    this.onClickRefresh = this.onClickRefresh.bind(this);
  }

  componentWillUpdate(nextProps) {}

  componentDidMount() {}

  onKeyEnter(e) {
    const input = this.refs.myInput.input.value;

    const tagTableData = this.state.tagTableData;
    tagTableData.push(input);

    this.setState({
      tagTableData
    });

    this.setState({
      inputValue: ''
    })

    this.refs.myInput.input.value = '';
  }

  onClickRefresh(e) {
    console.log('onClickRefresh');

    this.props.onClickRefresh();
  }

  /**
   * 刷新
   */
  onRefreshStart() {
    console.log('onRefreshStart', 'controlList');
    this.refs.starFilter.onRefreshStart();
  }
  
  /**
   * 刷新结束回调
   */
  onRefreshEnd() {
    this.refs.starFilter.onRefreshEnd();
  }

  render() {
    return (
      <div className="control-list">
        <StarFilter ref="starFilter" onClickRefresh={this.onClickRefresh}/>
        <Input ref="myInput"  placeholder="请输入标签" onPressEnter={this.onKeyEnter.bind(this)}/>
        <List
          dataSource={this.state.tagTableData}
          renderItem={item => <List.Item>{item}</List.Item>}
        />
      </div>
    );
  }
}

export default ControlList;
