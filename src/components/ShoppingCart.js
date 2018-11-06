import React from 'react';
import {
  Card, 
  CardBody, 
  CardText, 
  CardHeader,
  CardSubtitle
} from 'reactstrap';
import SavedResources from './SavedResources/SavedResources'

export class ShoppingCart extends React.Component {

  constructor(props){
    super(props);    
  }

  render() {
    return (
      <div>
        <Card>
          <CardHeader>Saved Resources</CardHeader>
          <CardBody>
            <CardSubtitle>Save, organize and re-order your resources here</CardSubtitle>
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