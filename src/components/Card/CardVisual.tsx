import { CSSProperties } from 'react';
import { CardProperties } from '../../type';

const CARD_WIDTH = 59;
const CARD_HEIGHT = 91;
const RATIO = 1.5;

export type Props = Omit<CardProperties, 'type'>;

function CardVisual(props: Props) {
  const { imageUrl, title, description } = props;
  return (
    <div style={style}>
      <div>{title}</div>
      <img src={imageUrl} />
      <div>{description}</div>
    </div>
  );
}

const style: CSSProperties = {
  width: `${CARD_WIDTH * RATIO}px`,
  height: `${CARD_HEIGHT * RATIO}px`,
  border: '1px solid',
  borderRadius: '10px',
};

export default CardVisual;
