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
import Card from './components/Card';
import Place from './components/Place';
import EditDrawer from './components/EditDrawer';
import { drawerVisibilityState } from './recoil/atoms/ui';

function App() {
  const [counter, setCounter] = useRecoilState(counterState);
  const [isDropped, setIsDropped] = useState(false);
  const [isDrawerVisible, setIsDrawerVisible] = useRecoilState(
    drawerVisibilityState
  );

  const handleDragEnd = (event: any) => {
    if (event.over && event.over.id === 'board') {
      setIsDropped(true);
    }
  };

  const gridSize = 20; // pixels
  const snapToGridModifier = createSnapModifier(gridSize);

  const handleOnClick = () => {
    setIsDrawerVisible(!isDrawerVisible);
  };

  return (
    <div className="App">
      <EditDrawer />
      <DndContext onDragEnd={handleDragEnd} modifiers={[snapToGridModifier]}>
        <Board>
          <Card
            id="draggable"
            url="https://picsum.photos/50/40"
            title={'test card'}
            description={'this is description of description'}
          />
          <Place id={'place'} title={'test place'} />
        </Board>
      </DndContext>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button onClick={handleOnClick}>+</button>
      </div>
    </div>
  );
}

export default App;
