import { useRecoilState } from 'recoil';

import { counterState } from './recoil/atoms/count';
import { boardState } from './recoil/atoms/board';

import { DndContext } from '@dnd-kit/core';
import { createSnapModifier } from '@dnd-kit/modifiers';
import Board from './components/Board';
import {
  drawerVisibilityState,
  selectedElementIdState,
} from './recoil/atoms/ui';

import RenderGameElement from './components/RenderGameElement';
import { BOARD_ID } from './constants';
import { PropertyEditor } from './components/PropertyEditor';
import { Drawer, Menu, Textarea } from 'react-daisyui';
import { Button } from 'semantic-ui-react';
import './App.css';
import useHandleDragEnd from './hooks/useHandleDragEnd';

function App() {
  const [counter, setCounter] = useRecoilState(counterState);
  const [board, setBoard] = useRecoilState(boardState);
  const [isDrawerVisible, setIsDrawerVisible] = useRecoilState(
    drawerVisibilityState
  );
  const [selectedElementId, setSelectedElementId] = useRecoilState(
    selectedElementIdState
  );
  const { handleDragEnd } = useHandleDragEnd();

  // test function for adding items to state and displaying
  const setNewItem = () => {
    const id = `testPlace${counter}`;
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
            face: 'down',
            rotation: 'horizontal',
            parentId: `testPlace${counter}`,
          },
        ],
      },
    ];

    setSelectedElementId(id);
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
      <Drawer
        open={isDrawerVisible}
        onClickOverlay={handleOnClick}
        side={<PropertyEditor />}
      >
        <DndContext onDragEnd={handleDragEnd} modifiers={[snapToGridModifier]}>
          <Board size={board.size}>
            {board?.childElements?.map((gameElement) => {
              return <RenderGameElement gameElement={gameElement} />;
            })}
          </Board>
        </DndContext>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={handleOnClick}>+</Button>
          <Button onClick={setNewItem}>add new item</Button>
        </div>
      </Drawer>
    </div>
  );
}

export default App;
