import React, { Component } from "react";
import { connect } from "react-redux";

import PropTypes from "prop-types";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import styles from './SavedResourcesContainer.module.css';
import SavedResource from "./SavedResource";

const getItemStyle = (_, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",

  // change background colour if dragging

  // styles we need to apply on draggables
  ...draggableStyle
});

class SavedResourcesContainer extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    currentPos: PropTypes.object,
    removeItem: PropTypes.func
  };

  static defaultProps = {
    currentPos: null,
    removeItem: null
  };

  constructor(props) {
    super(props);
    this.state = {
      data: Object.assign([], this.props.data)
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  // Using deprecated function necessary to update data with store's data
  componentWillReceiveProps(nextProps) {
    this.setState({ data: Object.assign([], nextProps.data) });
  }

  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    this.orderResources(result.source.index, result.destination.index);
  }

  orderResources = (sourceIndex, destinationIndex) => {
    const newSavedResources = this.props.data.slice();
    const movedResource = newSavedResources[sourceIndex];
    newSavedResources.splice(sourceIndex, 1);
    newSavedResources.splice(destinationIndex, 0, movedResource);

    this.setState({
      data: newSavedResources
    });
  };

  render() {
    // Render will be called every time this.props.data is updated, and every time handleSortChange
    // updates the this.state.dataSort variable.
    // this.state.dataSort() sorts data to feed into the OrganizationCards without modifying the
    // source of data

    const { data } = this.state;

    return (
      <div>
        <div className="saved-resources-container">
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable droppableId="droppable">
              {provided => (
                <div ref={provided.innerRef}>
                  {data.length ? (
                    data.map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                      >
                        {(provided2, snapshot) => (
                          <div
                            ref={provided2.innerRef}
                            {...provided2.draggableProps}
                            {...provided2.dragHandleProps}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided2.draggableProps.style
                            )}
                          >
                            <SavedResource
                              key={item.id}
                              organization={item}
                              currentPos={this.props.currentPos}
                              removeItem={() => this.props.removeItem(item)}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))
                  ) : (
                    <span className="text-light">
                      There are no resources added to the cart
                    </span>
                  )}
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

function mapStateToProps(state) {
  return {
    data: state.savedResource
  };
}

export default connect(mapStateToProps)(SavedResourcesContainer);
