import React, { Component } from "react";

class Button extends Component {
  constructor(props){
    super(props);
  }
  

   
  render() {
    const  { goToResources } = this.props; 
    return <button onClick={goToResources}> Go to Resources </button>;
  }
}

export default Button;
