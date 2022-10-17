import { DndContext } from '@dnd-kit/core';
import Draggable from '../Draggable';
import Droppable from '../Droppable';
import PlaceVisual from './PlaceVisual';

type Props = React.PropsWithChildren & {
  id: string;
  title?: string;
  attachedCards?: React.ReactNode;
};

function Place(props: Props) {
  const { id, ...rest } = props;

  const handleDragEnd = (event: any) => {
    // TODO: impl
  };

  return (
    <Draggable id={id}>
      <DndContext onDragEnd={handleDragEnd}>
        <PlaceVisual {...rest}>
          <Droppable id={`place${id}`} />
        </PlaceVisual>
      </DndContext>
    </Draggable>
  );
}

export default Place;
