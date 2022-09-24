import React, { CSSProperties } from 'react';

const CARD_WIDTH = 59;
const CARD_HEIGHT = 91;
const RATIO = 1.5;
const PADDING = 10;

function PlaceVisual(props: React.PropsWithChildren) {
  return (
    <div style={style}>
      <div>title</div>
      <div>{props.children}</div>
    </div>
  );
}

const style: CSSProperties = {
  width: `${CARD_WIDTH * RATIO + 2 * PADDING}px`,
  height: `${CARD_HEIGHT * RATIO + 2 * PADDING}px`,
  border: '1px solid',
  borderRadius: '10px',
};

export default PlaceVisual;
