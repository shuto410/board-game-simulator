import Draggable from '../Draggable';
import Droppable from '../Droppable';
import PlaceVisual from './PlaceVisual';

import { PlaceProperties } from '../../type';

function Place(props: PlaceProperties) {
  return (
    <Draggable id={props.id}>
      <Droppable id={`place${props.id}`}>
        <PlaceVisual {...props} />
      </Droppable>
    </Draggable>
  );
}

export default Place;
