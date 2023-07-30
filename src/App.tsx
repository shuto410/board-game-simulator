import { useRecoilState } from 'recoil';

import { counterState } from './recoil/atoms/count';
import { boardState } from './recoil/atoms/board';

import { DndContext } from '@dnd-kit/core';
import { createSnapModifier } from '@dnd-kit/modifiers';
import Board from './components/Board';
import Drawer from './components/Drawer';
import { drawerVisibilityState } from './recoil/atoms/ui';

import RenderGameElement from './components/RenderGameElement';
import { BOARD_ID } from './constants';
import useHandleDragEnd from './hooks/useHandleDragEnd';

function App() {
  const [counter, setCounter] = useRecoilState(counterState);
  const [board, setBoard] = useRecoilState(boardState);
  const [isDrawerVisible, setIsDrawerVisible] = useRecoilState(
    drawerVisibilityState
  );
  const { handleDragEnd } = useHandleDragEnd();

  // test function for adding items to state and displaying
  const setNewItem = () => {
    const newBoard = { ...board };
    newBoard.childElements = [
      ...(board?.childElements ?? []),
      {
        type: 'PLACE',
        id: `testPlace${counter}`,
        coordinates: { x: counter * 100, y: counter * 100 },
        size: { width: 100, height: 100 },
        title: `test place ${counter}`,
        parentId: BOARD_ID,
        // and children cards
        childElements: [
          {
            type: 'CARD',
            id: `testCard${counter}`,
            coordinates: { x: counter * 100, y: counter * 100 },
            size: { width: 100, height: 100 },
            title: `test card ${counter}`,
            imageUrl: 'https://picsum.photos/60/90',
            state: 'head',
            parentId: `testPlace${counter}`,
          },
        ],
      },
    ];

    setBoard(newBoard);
    setCounter(counter + 1);
  };

  const gridSize = 20; // pixels
  // TODO: this needs to be applied to all droppable elements
  const snapToGridModifier = createSnapModifier(gridSize);

  const handleOnClick = () => {
    setIsDrawerVisible(!isDrawerVisible);
  };

  return (
    <div className="App">
      <Drawer>
        <button onClick={setNewItem}>add new item</button>
      </Drawer>
      <DndContext onDragEnd={handleDragEnd} modifiers={[snapToGridModifier]}>
        <Board size={board.size}>
          {board?.childElements?.map((gameElement) => {
            return <RenderGameElement gameElement={gameElement} />;
          })}
        </Board>
      </DndContext>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button onClick={handleOnClick}>+</button>
      </div>
    </div>
  );
}

export default App;
