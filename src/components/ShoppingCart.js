import React from 'react';
import {
  Card, 
  CardBody, 
  CardText, 
  CardHeader,
  CardSubtitle
} from 'reactstrap';
import styles from './ShoppingCart.module.css';
import SavedResources from './SavedResources/SavedResources';

export class ShoppingCart extends React.Component {

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

export default ShoppingCart;