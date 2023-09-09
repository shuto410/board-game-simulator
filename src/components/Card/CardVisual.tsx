import { CSSProperties } from 'react';
import { CardProperties } from '../../type';

export type Props = Omit<CardProperties, 'type'>;

function CardVisual(props: Props) {
  const { imageUrl, title, description, size } = props;

  const style: CSSProperties = {
    width: `${size.width}px`,
    height: `${size.height}px`,
    border: '1px solid',
    borderRadius: '10px',
  };

  return (
    <div style={style}>
      <div>{title}</div>
      <img src={imageUrl} />
      <div>{description}</div>
    </div>
  );
}

export default CardVisual;
