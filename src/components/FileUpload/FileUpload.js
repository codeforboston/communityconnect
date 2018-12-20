import React from 'react';
import PropTypes from 'prop-types';

class FileUpload extends React.Component {

  constructor(props) {
    super(props);
      this.state = {
        uploadStatus: false
      }
    this.handleUpload = this.handleUpload.bind(this);
  }

  handleUpload(event) {
    event.preventDefault();

    let fileReader = new FileReader();
    fileReader.onloadend = (event) => {
      let data = JSON.parse(fileReader.result);
      this.props.handleData(data);
    }

    fileReader.readAsText(this.uploadInput.files[0]);

    if(this.props.toggleUpload)
      this.props.toggleUpload();
  }
  
  render() {
    return(
      <div className="container">
        <form onSubmit={this.handleUpload}>
          <div className="form-group">
            <input className="form-control" ref={(ref) => { this.uploadInput = ref; }} type="file" />
          </div>

          {/*
            <div className="form-group">
            <input 
              className="form-control" 
              ref={(ref) => { this.fileName = ref; }} 
              type="text" 
              placeholder="Optional name for the file" />
          </div>
          */}

          <button className="btn btn-primary" type="true">Upload</button>

        </form>
      </div>
    )
  }
}

FileUpload.propTypes = {
  toggleUpload: PropTypes.func,
  handleData: PropTypes.func.isRequired,
}

export default FileUpload;