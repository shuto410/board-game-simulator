import React, { CSSProperties } from 'react';

const CARD_WIDTH = 59;
const CARD_HEIGHT = 91;
const RATIO = 1.5;

type Props = React.PropsWithChildren & {
  url?: string;
  title?: string;
  description?: string;
};

function CardVisual(props: Props) {
  const { url, title, description } = props;
  return (
    <div style={style}>
      <div>{title}</div>
      <img src={url} />
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
