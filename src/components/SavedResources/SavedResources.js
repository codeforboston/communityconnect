import React, { Component } from 'react';
import SavedResource from '../SavedResource/SavedResource';
import styles from './SavedResources.module.css';
import SortBar from '../SortBar.js';
import { getDistance } from '../../utils/distance.js';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// fake data generator
// const getItems = count =>
//   Array.from({ length: count }, (v, k) => k).map(k => ({
//     id: `item-${k}`,
//     content: `item ${k}`,
//   }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  debugger;
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

// const grid = 8;

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

export class SavedResources extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: this.props.data,
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );

    this.setState({
      items,
    });
  }

  // constructor(props){
  //   super(props)

  //   // this.state = {
  //   //   dataSort: this.sortByAlphabet,
  //   // }

  //   // this.sortByAlphabet = this.sortByAlphabet.bind(this);
  //   // this.sortByDistance = this.sortByDistance.bind(this);
  //   // this.getCloserName = this.getCloserName.bind(this);
  //   // this.getCloserResource = this.getCloserResource.bind(this);
  //   // this.listRef = React.createRef()
  // }

  // scrollToElement = (id) => {
  //   this.refs[id].getRef()
  // }

  // getCloserResource = (a , b) => {
  //   if(getDistance(a,this.props.currentPos)
  //   > getDistance(b,this.props.currentPos)){
  //     return 1;
  //   }

  //   return -1;
  // }

  // getCloserName = (a, b) => {
  //   if(a.organizationname > b.organizationname) return 1
  //   else if(a.organizationname < b.organizationname ) return -1
  //   else return 0
  // }

  // sortByAlphabet = () => {
  //   return this.props.data.sort(this.getCloserName);
  // }

  // sortByDistance = () => {
  //   return this.props.data.sort(this.getCloserResource);
  // }

  // handleSortChange = (newSort) => {
  //   if(this.state.dataSort != newSort)
  //     this.setState({
  //       // Set the dataSort variable to whichever sort function is chosen
  //       dataSort: newSort,
  //     })
  // }

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
    
    const sortedData = this.props.data; //this.state.dataSort();

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
                {sortedData.map((item, index) => (
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





        {/*sortedData.map((item, i) => 
          <SavedResource 
            key={item.id} 
            ref={item.id} 
            // cardClick={this.props.cardClick} 
            organization={item} 
            currentPos={this.props.currentPos}
            removeItem={() => this.props.removeItem(item)}
          />
        )*/}
        </div>
      </div>
    );

  }
}

export default SavedResources;
