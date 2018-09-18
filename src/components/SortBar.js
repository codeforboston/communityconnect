import React from 'react';
import {ButtonGroup, Button} from 'reactstrap';
import styles from './SortBar.module.css';

class SortBar extends React.Component {

  constructor(props) {
    super(props);


  }


  handleClick = (e) => {
    if(e.target.value === '1'){
      this.props.sortByDistance();
    } else if(e.target.value === '0'){
      this.props.sortByAlphabet();
    } else {
      this.props.sortByAlphabet();
    }

  }

  render(){
    let option;

    if(this.props.haveCoords === false){
     option = <option value="1" disabled onClick={this.handleClick}>Distance</option>
   } else if(this.props.haveCoords === true){
     option = <option value='1' onClick={this.handleClick}>Distance</option>
   }
    return (
        <div align="right">
          <div  className={styles.result}>
              <p>Sort By:</p>
          </div>
          <div  className={styles.result}>
              <ButtonGroup>
                <select onChange={this.handleClick}>
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
