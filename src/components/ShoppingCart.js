import React from 'react';
import {
  Card, 
  CardTitle, 
  CardBody, 
  CardText, 
  CardSubtitle, 
  CardHeader,
} from 'reactstrap';
import ResultList from './ResultList'

// import styles from './ResultList.module.css';


export class ShoppingCart extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      savedItems: [],
    }
    
  }

  render() {
    return (
      <div>
        <Card>
          <CardHeader> Saved Resources </CardHeader>
          <CardBody>
            <CardSubtitle>Save, organize and re-order your resources here</CardSubtitle>
            <ResultList 
              fullWidth={true} 
              ref={instance => { this.resultListItem = this.props.instance }} 
              data={this.props.orgs}
              addItem={this.props.addItem}
              removeItem={this.props.removeItem}/>
          </CardBody>
        </Card>
      </div>
      )
  }

  // constructor(props){
  //   super(props)


  //   // this.listRef = React.createRef()
  // }

  // scrollToElement = (id) => {
  //   this.refs[id].getRef()


  // }

}

export default ShoppingCart;