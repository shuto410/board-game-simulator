import { CardProperties } from '../../type';
import Draggable from '../Draggable';
import CardVisual from './CardVisual';
import { Props as CardVisualProps } from './CardVisual';

type Props = CardVisualProps;

function Card(props: Props) {
  const handleDragEnd = (event: any) => {
    // TODO: impl
  };

  return (
    <Draggable id={props.id}>
      <CardVisual {...props} />
    </Draggable>
  );
}

export default Card;
