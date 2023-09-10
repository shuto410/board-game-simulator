import { DragStartEvent } from '@dnd-kit/core';
import { useRecoilState } from 'recoil';
import { selectedElementIdState } from '../recoil/atoms/ui';

function useHandleDragStart() {
  const [_, setSelectedElementId] = useRecoilState(selectedElementIdState);

  const handleDragStart = (event: DragStartEvent) => {
    const draggedId = event.active.id as string;
    if (draggedId) {
      setSelectedElementId(draggedId);
    }
  };

  return {
    handleDragStart,
  };
}

export default useHandleDragStart;
