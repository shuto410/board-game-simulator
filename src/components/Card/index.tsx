import Draggable from '../Draggable';
import CardVisual from './CardVisual';

type Props = React.PropsWithChildren & {
  id: string;
  url?: string;
  title?: string;
  description?: string;
};

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
