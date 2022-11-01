import { useRecoilState } from 'recoil';

import { counterState } from './recoil/atoms/count';
import { boardState } from './recoil/atoms/board';

import { DndContext } from '@dnd-kit/core';
import { createSnapModifier } from '@dnd-kit/modifiers';
import Board from './components/Board';
import Card from './components/Card';
import Place from './components/Place';
import Drawer from './components/Drawer';
import { drawerVisibilityState } from './recoil/atoms/ui';

import { PlaceProperties, CardProperties } from './type';
import RenderGameElement from './components/RenderGameElement';
import { BOARD_ID } from './constants';
import useHandleDradEnd from './hooks/useHandleDradEnd';

function App() {
  const [counter, setCounter] = useRecoilState(counterState);
  const [board, setBoard] = useRecoilState(boardState);
  const [isDrawerVisible, setIsDrawerVisible] = useRecoilState(
    drawerVisibilityState
  );
  const { handleDragEnd } = useHandleDradEnd();

  // test function for adding items to state and displaying
  const setNewItem = () => {
    const newBoard = { ...board };
    newBoard.childElements = [
      ...(board?.childElements ?? []),
      {
        id: `testPlace${counter}`,
        coordinates: { x: counter * 100, y: counter * 100 },
        size: { width: 100, height: 100 },
        title: `test place ${counter}`,
        parentId: BOARD_ID,
        // and children cards
        childElements: [
          {
            id: `testCard${counter}`,
            coordinates: { x: counter * 100, y: counter * 100 },
            size: { width: 100, height: 100 },
            title: `test card ${counter}`,
            state: 'head',
            parentId: `testPlace${counter}`,
            Component: Card,
          } as CardProperties,
        ],
        Component: Place,
      } as PlaceProperties,
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
        <Board>
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
