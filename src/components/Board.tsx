import React, { CSSProperties } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { BOARD_ID } from '../constants';

type Props = React.PropsWithChildren;

function Board(props: Props) {
  const { setNodeRef } = useDroppable({
    id: BOARD_ID,
    data: {
      type: 'board',
    },
  });

  return (
    <div ref={setNodeRef} style={styles}>
      {props.children}
    </div>
  );
}

const styles: CSSProperties = {
  minHeight: '90vh',
  height: '100%',
  boxShadow: '1px 1px 5px gray',
  backgroundImage:
    'repeating-linear-gradient(180deg,transparent,transparent calc(20px - 1px),#ddd calc(20px - 1px),#ddd 20px),repeating-linear-gradient(90deg,transparent,transparent calc(20px - 1px),#ddd calc(20px - 1px),#ddd 20px)',
};

export default Board;
