import React from 'react';
import PropTypes from 'prop-types';
import {
  Card, 
  CardBody, 
  CardHeader,
} from 'reactstrap';
import { downloadObjectAsJson } from '../utils/DownloadHelper.js';
import FileUpload from './FileUpload/FileUpload.js';
import styles from './ShoppingCart.module.css';
import SavedResources from './SavedResources/SavedResources';

class ShoppingCart extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      showUpload: false,
    };

    this.toggleUpload = this.toggleUpload.bind(this);
  }
  toggleUpload = () => {
    this.setState({showUpload: !this.state.showUpload});
  };

  render() {
    return (
      <div>
        <Card>
          <CardHeader>Saved Resources 
            <span>
              <button 
                title='Upload Resources' 
                className={styles['upload-download-buttons']} 
                onClick={() => this.toggleUpload()} role={'img'} aria-label={'Upload Resources'}
              > 
                ⬆ // eslint-disable-line jsx-a11y/accessible-emoji️
              </button>
              <button 
                title='Download Resources' 
                className={styles['upload-download-buttons']} 
                onClick={() => {downloadObjectAsJson(this.props.data, 'YourFile');}}
              > 
                ⬇ // eslint-disable-line jsx-a11y/accessible-emoji
              </button>
            </span>
          </CardHeader>
          <CardBody className={styles['shopping-cart-card']}>
            { this.state.showUpload ? <FileUpload handleData={this.props.uploadItems} toggleUpload={this.toggleUpload}/> : null }
            <SavedResources 
              fullWidth={true} 
              data={this.props.data}
              reOrder={this.props.reOrder}
              addItem={this.props.addItem}
              removeItem={this.props.removeItem}
            />
          </CardBody>
        </Card>
      </div>
    )
  }
}

ShoppingCart.propTypes = {
  data: PropTypes.array.isRequired,
  reOrder: PropTypes.func.isRequired,
  addItem: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired,
  uploadItems: PropTypes.func.isRequired,
};

export default ShoppingCart;
