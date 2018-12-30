import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Tag, Row, Col ,Input, Button} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './BasicProfile.less';
import TagSelect from 'components/TagSelect';
import { message } from 'antd';

@connect(({ profile, loading }) => ({
  profile,
  loading: loading.effects['profile/fetchBasic'],
}))
export default class TagElem extends Component {
  state = {
    tags: ['Tag 1', 'Tag 2', 'Tag 3'],
    alltags: ['Tag 1', 'Tag 2', 'Tag 3', 'Tag 4', 'Tag 5', 'Tag 6', 'Tag 7'],
    inputValue:''
  };
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'profile/fetchBasic',
    });
  }
  handleClose = removedTag => {
    const tags = this.state.tags.filter(tag => tag !== removedTag);
    this.setState({ tags });
  };
  handleChange = checkedValue => {
    if (this.state.tags.length < 5) {
      this.setState({
        tags: checkedValue,
      });
    } else {
      message.warning('最多选中5个标签!');
    }
  };
  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
  }
  handleInputConfirm = () => {
    const state = this.state;
    const inputValue = state.inputValue;
    let alltags = state.alltags;
    if (inputValue && alltags.indexOf(inputValue) === -1 && alltags.length <= 20 && inputValue.length <= 8) {
      alltags = [...alltags, inputValue];
      this.setState({
        alltags,
        inputValue: ''
      });
    } else if (alltags.indexOf(inputValue) !== -1) {
      message.warning('标签重复不能添加!');
    } else if (alltags.length > 20) {
      message.warning('最多添加20个标签!');
    } else if (inputValue.length > 8) {
      message.warning('只能输入8个字符!');
    }
    console.log(alltags);
  }
  // saveInputRef = input => this.input = input
  render() {
    const { tags } = this.state;
    return (
      <PageHeaderLayout title="基础详情页">
        <div className={styles.tagCls}>
          <Card bordered={false}>
            <Row>
              <Col md={24}>
                {tags.map((tag, index) => {
                  const tagElem = (
                    <Tag key={tag} closable={true} afterClose={() => this.handleClose(tag)} color="volcano">
                      {tag}
                    </Tag>
                  );
                  return tagElem;
                })}
              </Col>
            </Row>
          </Card>
          <Card bordered={false}>
            <Row>
              <Col  md={24}>
                <TagSelect onChange={this.handleChange} expandable value={this.state.tags}>
                  {this.state.alltags.map((tag, index) => {
                    const alltagElem = (
                      <TagSelect.Option key={tag} value={tag}>
                        {tag}
                      </TagSelect.Option>
                    );
                    return alltagElem;
                  })}
                </TagSelect>
              </Col>
            </Row>
            </Card>
            <Card bordered={false}>
            <Row>
              <Col  md={18}>
                <Input  type="text" value={this.state.inputValue} onChange={this.handleInputChange}/>
              </Col>
              <Col  md={6}>
                <Button icon="plus" type="dashed" style={{marginLeft:'5px'}} onClick={this.handleInputConfirm}>
                    添加标签
                </Button>
              </Col>
            </Row>
          </Card>
        </div>
      </PageHeaderLayout>
    );
  }
}
