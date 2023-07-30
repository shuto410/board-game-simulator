import { CSSProperties } from 'react';
import { PlaceProperties } from '../../type';
import RenderGameElement from '../RenderGameElement';

const CARD_WIDTH = 59;
const CARD_HEIGHT = 91;
const RATIO = 1.5;
const PADDING = 10;

export type Props = Omit<PlaceProperties, 'type'>;

function PlaceVisual(props: Props) {
  const {
    title,
    coordinates: { x, y },
  } = props;
  const topChildren = props.childElements?.[0];

  const style: CSSProperties = {
    width: `${CARD_WIDTH * RATIO + 2 * PADDING}px`,
    height: `${CARD_HEIGHT * RATIO + 2 * PADDING}px`,
    border: '1px solid',
    borderRadius: '10px',
    transform: `translate3d(${x}px, ${y}px, 0)`,
  };

  return (
    <div style={style}>
      <div>{title}</div>
      {topChildren && <RenderGameElement gameElement={topChildren} />}
    </div>
  );
}

export default PlaceVisual;
