import { DndContext } from '@dnd-kit/core';
import Draggable from '../Draggable';
import Droppable from '../Droppable';
import PlaceVisual from './PlaceVisual';

import { PlaceProperties } from '../../type';

function Place(props: PlaceProperties) {
  const handleDragEnd = (event: any) => {
    // TODO: impl
  };

  return (
    <Draggable id={props.id}>
      <DndContext onDragEnd={handleDragEnd}>
        <PlaceVisual {...props}>
          <Droppable id={`place${props.id}`} />
        </PlaceVisual>
      </DndContext>
    </Draggable>
  );
}

export default Place;
