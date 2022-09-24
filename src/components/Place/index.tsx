import { DndContext } from '@dnd-kit/core';
import Draggable from '../Draggable';
import Droppable from '../Droppable';
import PlaceVisual from './PlaceVisual';

type Props = React.PropsWithChildren & {
  id: string;
  attachedCards?: React.ReactNode;
};

function Place(props: Props) {
  const handleDragEnd = (event: any) => {
    // TODO: impl
  };

  return (
    <Draggable id={props.id}>
      <DndContext onDragEnd={handleDragEnd}>
        <PlaceVisual>
          <Droppable id={`place${props.id}`}>{props.attachedCards}</Droppable>
        </PlaceVisual>
      </DndContext>
    </Draggable>
  );
}

export default Place;
