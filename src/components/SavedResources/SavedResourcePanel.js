import React from 'react';
import { Link, Route } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  Button
} from 'reactstrap';
import styles from './SavedResourcePanel.module.css';
import SavedResources from './SavedResourcesContainer';

/*const ToHomeButton = () => {
  return (
    <Button tag={Link} to="/" type="Map">To Home</Button>
  )
}*/

const ToMapButton = () => {
  return (
    <Button tag={Link} to="/" type="Admin">To Map</Button>
  )
}
const SavedResourcePanel = () => {

    return (
      <div>
        <Card>
          <CardHeader>Saved Resources
            <span>
              <button
                title='Upload Resources'
                className={styles['upload-download-buttons']}
                //onClick={() => this.toggleUpload()}
              >
                <span role="img" aria-label="upload"> ⬆️ </span>
              </button>
              <button
                title='Download Resources'
                className={styles['upload-download-buttons']}
                //onClick={() => { downloadObjectAsJson(this.props.data, 'YourFile'); }}
              >
                <span role="img" aria-label="download">⬇️ </span>
              </button>
            </span>
          </CardHeader>
          <CardBody className={styles['shopping-cart-card']}>
            <SavedResources />
            <Route exact path='/admin' component={ToMapButton} />
          </CardBody>
        </Card>
      </div>
    )
}

export default SavedResourcePanel;
