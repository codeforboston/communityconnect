import React from 'react';
import qs from 'qs-lite';
import { Link, Route } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  Button
} from 'reactstrap';
import styles from './SavedResourcePanel.module.css';
import shareIcon from '../../share-symbol.svg';
import SavedResources from './SavedResourcesContainer';

/*
const ToHomeButton = () => {
  return (
    <Button tag={Link} to="/" type="Map">To Home</Button>
  )
}*/

let buttonStyle = {
  float: 'right',
  backgroundColor: 'rgba(0,0,0,.001)',
  border: 'none',
  padding: '0'
};

//Commenting this part for now
//Duplicate functionality || Gives the same result as toShareButton function
/*
const ToMapButton = () => {
  return (
    <Button tag={Link} to="/" type="Map">To Map</Button>
  )
}*/

const ToShareButton = () => {
  const query = qs.parse(window.location.search.replace('?', ''));
  let resources = [];
  let tempUrl = "";
  if (query.resources) {
    resources = query.resources.split(',');
    tempUrl = `/?resources=${resources.join(',')}`
  }

  return (
    <Button
      style={buttonStyle} tag={Link} type="Map" to={tempUrl} target="_blank">
        <img className={styles['share-button']} src={shareIcon} alt=""/>           
    </Button>    
  )
}
const SavedResourcePanel = () => {

    return (
      <div>
        <Card>
          <CardHeader>Saved Resources
          <span> 
            <Route exact path='/admin' component={ToShareButton} />  
          </span>
          </CardHeader>
          <CardBody className={styles['shopping-cart-card']}>
            <SavedResources />
          </CardBody>
        </Card>
      </div>
    )
}

export default SavedResourcePanel;
