import styles from './App.css';
import { useState } from 'react';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';

import { counterState } from './recoil/atoms/count';

import Droppable from './components/Droppable';
import Draggable from './components/Draggable';
import { DndContext } from '@dnd-kit/core';
import { createSnapModifier } from '@dnd-kit/modifiers';
import Board from './components/Board';

function App() {
  const [counter, setCounter] = useRecoilState(counterState);
  const [isDropped, setIsDropped] = useState(false);

  const DragMarkup = () => {
    return <Draggable>Drag me</Draggable>;
  };

  const handleDragEnd = (event: any) => {
    console.log(event);
    if (event.over && event.over.id === 'board') {
      setIsDropped(true);
    }
  };

  const gridSize = 20; // pixels
  const snapToGridModifier = createSnapModifier(gridSize);

  return (
    <div className="App">
      <DndContext onDragEnd={handleDragEnd} modifiers={[snapToGridModifier]}>
        <Board>
          <DragMarkup />
        </Board>
      </DndContext>
    </div>
  );
}

export default App;
