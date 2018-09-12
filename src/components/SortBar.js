import React from 'react';
import {ButtonGroup, Button} from 'reactstrap';
import styles from './SortBar.module.css';

class SortBar extends React.Component {

  constructor(props) {
    super(props);
  }


  render(){
    let option;

    if(this.props.haveCoords === false){
     option = <option value="1" disabled onClick={this.props.sortByDistance}>Distance</option>
   } else if(this.props.haveCoords === true){
     option = <option value="1" onClick={this.props.sortByDistance}>Distance</option>
   }
    return (
        <div align="right">
          <div  className={styles.result}>
              <p>Sort By:</p>
          </div>
          <div  className={styles.result}>
              <ButtonGroup>
                <select>
                  <option value="0">Alphabeticqally</option>
                  {option}
                </select>
              </ButtonGroup>
            </div>
        </div>
    );
  }
}

export default SortBar;
