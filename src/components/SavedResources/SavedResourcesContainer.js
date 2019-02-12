import React, { Component } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import styles from './SavedResourcesContainer.module.css';
import SavedResource from './SavedResource';

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  // padding: grid * 2,
  // margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  // background: isDragging ? 'lightgrey' : 'white',

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = isDraggingOver => ({
  // background: isDraggingOver ? 'lightblue' : 'white',
  // padding: grid,
  // width: 250,
});

class SavedResourcesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: Object.assign([], this.props.data)
    }
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  //Using deprecated function necessary to update data with store's data
  componentWillReceiveProps(nextProps) {
      this.setState({data: Object.assign([], nextProps.data)});
  }
  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    this.orderResources(
      result.source.index,
      result.destination.index
    );
  }

  orderResources = (sourceIndex, destinationIndex) => {
    let newSavedResources = this.props.data.slice();

    let movedResource = newSavedResources[sourceIndex];
    newSavedResources.splice(sourceIndex, 1);
    newSavedResources.splice(destinationIndex, 0, movedResource);

    this.setState({
      data: newSavedResources,
    })
  }
  render() {
    // Render will be called every time this.props.data is updated, and every time handleSortChange
    // updates the this.state.dataSort variable.
    // this.state.dataSort() sorts data to feed into the OrganizationCards without modifying the
    // source of data

    const {data} = this.state;
    return(
      <div>
        <div
          className={[
            styles['saved-resources'],
            styles['saved-resources-full-width']].join(' ')}
        >

        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {data.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                      >
                        <SavedResource
                          key={item.id}
                          ref={item.id}
                          // cardClick={this.props.cardClick}
                          organization={item}
                          currentPos={this.props.currentPos}
                          removeItem={() => this.props.removeItem(item)}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        </div>
      </div>
    );
  }
}

SavedResourcesContainer.propTypes = {
  data: PropTypes.array.isRequired
}

function mapStateToProps(state, ownProps) {
  return {
      data: state.savedResource
  }
}

export default connect(mapStateToProps)(SavedResourcesContainer);
