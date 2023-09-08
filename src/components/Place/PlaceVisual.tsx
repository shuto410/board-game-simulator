import { CSSProperties } from 'react';
import { PlaceProperties } from '../../type';
import RenderGameElement from '../RenderGameElement';

export type Props = Omit<PlaceProperties, 'type'>;

function PlaceVisual(props: Props) {
  const {
    title,
    coordinates: { x, y },
    size,
  } = props;
  const topChildren = props.childElements?.[0];

  const style: CSSProperties = {
    width: `${size.width}px`,
    height: `${size.height}px`,
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
