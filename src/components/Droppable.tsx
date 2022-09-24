import React from 'react';
import { useDroppable } from '@dnd-kit/core';

type Props = React.PropsWithChildren & {
  id: string;
};

function Droppable(props: Props) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });

  const style = {
    color: isOver ? 'green' : undefined,
  };

  return (
    <>
      <div ref={setNodeRef} style={style}>
        {props.children}
      </div>
    </>
  );
}

export default Droppable;
