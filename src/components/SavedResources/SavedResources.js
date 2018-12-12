import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import SortBar from '../SortBar.js';
import { getDistance } from '../../utils/distance.js';
import styles from './SavedResources.module.css';
import SavedResource from '../SavedResource/SavedResource';

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

class SavedResources extends Component {
  constructor(props) {
    super(props);

    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    this.props.reOrder(
      result.source.index,
      result.destination.index
    );
  }

  render() {

    // const sortOptions = [
    //     { 
    //       key: 'Alphabetically', 
    //       sort: this.sortByAlphabet, 
    //       disabled: false
    //     }
    //    ,{
    //       key: 'Distance', 
    //       sort: this.sortByDistance, 
    //       disabled: !this.props.haveCoords
    //     }
    // ];

    // Render will be called every time this.props.data is updated, and every time handleSortChange
    // updates the this.state.dataSort variable.
    // this.state.dataSort() sorts data to feed into the OrganizationCards without modifying the
    // source of data
    
    const orderedItems = this.props.data;

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
                {orderedItems.map((item, index) => (
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

SavedResources.propTypes = {
  fullWidth: PropTypes.bool,
  data: PropTypes.array.isRequired,
  reOrder: PropTypes.func.isRequired,
  addItem: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired,
}

export default SavedResources;
