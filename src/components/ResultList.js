
    return this.props.data.sort(this.getCloserResource);
  }

  handleSortChange = (newSort) => {
    if(this.state.dataSort != newSort)
      this.setState({
        // Set the dataSort variable to whichever sort function is chosen
        dataSort: newSort,
      })
  }

  render() {

    const sortOptions = [
      {key: 'Alphabetically', sort: this.sortByAlphabet, disabled: false}
      ,{key: 'Distance', sort: this.sortByDistance, disabled: !this.props.haveCoords}
    ];

    // Render will be called every time this.props.data is updated, and every time handleSortChange
    // updates the this.state.dataSort variable.
    // this.state.dataSort() sorts data to feed into the OrganizationCards without modifying the
    // source of data
    const sortedData = this.state.dataSort();

    return(
      <div >
        <div 
          className={[
            styles.results, (this.props.fullWidth ? styles.resultsFullWidth : styles.resultsPartialWidth)].join(' ')}  
          ref={this.listRef}>

          { this.props.data.map((org, i) => 
            <OrganizationCard 
              key={org.id} 
              ref={org.id} 
              cardClick={this.props.cardClick} 
              organization={org} 
              haveCoords={this.props.haveCoords} 
              currentPos={this.props.currentPos}
            /> ) }
        </div>
      </div>
    );

  }
}

export default ResultList;

    return this.props.data.sort(this.getCloserResource);
  }

  handleSortChange = (newSort) => {
    if(this.state.dataSort != newSort)
      this.setState({
        // Set the dataSort variable to whichever sort function is chosen
        dataSort: newSort,
      })
  }

  render() {

    const sortOptions = [
      {key: 'Alphabetically', sort: this.sortByAlphabet, disabled: false}
      ,{key: 'Distance', sort: this.sortByDistance, disabled: !this.props.haveCoords}
    ];

    // Render will be called every time this.props.data is updated, and every time handleSortChange
    // updates the this.state.dataSort variable.
    // this.state.dataSort() sorts data to feed into the OrganizationCards without modifying the
    // source of data
    const sortedData = this.state.dataSort();

    return(
      <div >
        <div 
          className={[
            styles.results, (this.props.fullWidth ? styles.resultsFullWidth : styles.resultsPartialWidth)].join(' ')}  
          ref={this.listRef}>

          { this.props.data.map((org, i) => 
            <OrganizationCard 
              key={org.id} 
              ref={org.id} 
              cardClick={this.props.cardClick} 
              organization={org} 
              haveCoords={this.props.haveCoords} 
              currentPos={this.props.currentPos}
            /> ) }
        <SortBar 
          onSortChange={this.handleSortChange}
          sortOptions={sortOptions}
          haveCoords={this.props.haveCoords}
        />
        {sortedData.map((org, i) => 
          <OrganizationCard 
            key={org.id} 
            ref={org.id} 
            cardClick={this.props.cardClick} 
            organization={org} 
            haveCoords={this.props.haveCoords} 
            currentPos={this.props.currentPos}
            addItem={() => this.props.addItem(org)}
            removeItem={() => this.props.removeItem(org)}
          /> 
        )}
        </div>
      </div>
    );

  }
}

export default ResultList;
