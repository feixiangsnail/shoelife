import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {Row, Col, Badge} from 'antd';
import classes from './HomeView.less'
class Home extends Component {

  render() {
    const context = this;
    const {item} = context.props;
    return (
      <div>
        <section style={{marginRight: '20px'}}>
          <Row>
            {
              item.map((i,index) => {
                return <Col span="6" key={index}>
                  <div className={classes.subItem}>
                    <Link to={i.links}>
                      <p>{i.num}</p>
                      <h3>{i.title}</h3>
                    </Link>
                  </div>
                </Col>
              })
            }
          </Row>
        </section>
      </div>
    )
  }
}

Home.propTypes = {
  loading: React.PropTypes.bool,
  params: React.PropTypes.object
}

export default Home;




