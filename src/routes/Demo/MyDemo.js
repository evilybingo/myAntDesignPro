import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Tag, Row, Col } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './BasicProfile.less';
import TagSelect from 'components/TagSelect';

@connect(({ profile, loading }) => ({
  profile,
  loading: loading.effects['profile/fetchBasic'],
}))
export default class TagElem extends Component {
  state = {
    tags: ['Tag 1', 'Tag 2', 'Tag 3'],
    alltags: ['Tag 1', 'Tag 2', 'Tag 3', 'Tag 4', 'Tag 5', 'Tag 6', 'Tag 7'],
  };
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'profile/fetchBasic',
    });
  }
  handleClose = removedTag => {
    const tags = this.state.tags.filter(tag => tag !== removedTag);
    console.log(tags);
    this.setState({ tags });
  };
  handleChange = checkedValue => {
    this.setState({
      tags: checkedValue,
    });
  };

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
                    <Tag key={tag} closable={true} afterClose={() => this.handleClose(tag)}>
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
              <Col>
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
        </div>
      </PageHeaderLayout>
    );
  }
}
