import {Component} from 'react';

import styles from './MapPage.module.css';


class MapPage extends Component {
  render() {
    return (
      <div id={styles.container}>
        <SplitScreenSlidingPane>
          <ResultList
            ref={(instance) => {
              this.resultListItem = instance;
            }}
            cardClick={this.cardClick}
            currentPos={this.props.currentPosition}
            fullWidth={true}
          />
        </SplitScreenSlidingPane>
        <div className={styles.staticPane}>
          <OrganizationMap/>
        </div>
      </div>
    );
  }
}

export default MapPage;
