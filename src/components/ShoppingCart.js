import React from 'react';
import PropTypes from 'prop-types';
import {
  Card, 
  CardBody, 
  CardHeader,
} from 'reactstrap';
import styles from './ShoppingCart.module.css';
import SavedResources from './SavedResources/SavedResources';

class ShoppingCart extends React.Component {
  constructor(props){
    super(props);    
  }

  render() {
    return (
      <div>
        <Card>
          <CardHeader>Saved Resources</CardHeader>
          <CardBody className={styles['shopping-cart-card']}>
            <SavedResources 
              fullWidth={true} 
              // ref={instance => { this.resultListItem = this.props.instance }} 
              data={this.props.orgs}
              // addItem={this.props.addItem}
              removeItem={this.props.removeItem}
            />
          </CardBody>
        </Card>
      </div>
      )
  }
}

ShoppingCart.propTypes = {
  orgs: PropTypes.array.isRequired,
  removeItem: PropTypes.func.isRequired,
}

export default ShoppingCart;