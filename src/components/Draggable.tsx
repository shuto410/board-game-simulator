import React, { CSSProperties } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { useRecoilState } from 'recoil';
import { drawerVisibilityState } from '../recoil/atoms/ui';

type Props = React.PropsWithChildren & {
  id: string;
};

const resetButtonStyles: CSSProperties = {
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
  outline: 'none',
  padding: '0',
  appearance: 'none',
};

function Draggable(props: Props) {
  const [isDrawerVisible, setIsDrawerVisible] = useRecoilState(
    drawerVisibilityState
  );
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
  });

  const style: CSSProperties = {
    ...resetButtonStyles,
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
  };

  const handleOnClick = () => {
    setIsDrawerVisible(!isDrawerVisible);
    console.log('handleOnClick');
  };

  return (
    <button
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onClick={handleOnClick}
    >
      {props.children}
    </button>
  );
}

export default Draggable;
