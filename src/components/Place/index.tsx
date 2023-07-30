import Draggable from '../Draggable';
import Droppable from '../Droppable';
import PlaceVisual from './PlaceVisual';

import {Props as PlaceVisualProps} from './PlaceVisual';

type Props = PlaceVisualProps;

function Place(props: Props) {
  return (
    <Draggable id={props.id}>
      <Droppable id={`place${props.id}`}>
        <PlaceVisual {...props} />
      </Droppable>
    </Draggable>
  );
}

export default Place;
