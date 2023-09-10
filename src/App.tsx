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
import { Button, Drawer } from 'react-daisyui';
import './App.css';
import useHandleDragEnd from './hooks/useHandleDragEnd';
import useHandleDragStart from './hooks/useHandleDragStart';

function App() {
  const [counter, setCounter] = useRecoilState(counterState);
  const [board, setBoard] = useRecoilState(boardState);
  const [isDrawerVisible, setIsDrawerVisible] = useRecoilState(
    drawerVisibilityState
  );
  const [_, setSelectedElementId] = useRecoilState(selectedElementIdState);
  const { handleDragEnd } = useHandleDragEnd();
  const { handleDragStart } = useHandleDragStart();

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
            face: 'down',
            rotation: 'horizontal',
            parentId: `testPlace${counter}`,
          },
        ],
      },
    ];

    setSelectedElementId(`testCard${counter}`);
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
        overlayClassName=""
        onClickOverlay={handleOnClick}
        side={<PropertyEditor />}
      >
        <DndContext
          onDragEnd={handleDragEnd}
          onDragStart={handleDragStart}
          modifiers={[snapToGridModifier]}
        >
          <Board size={board.size}>
            {board?.childElements?.map((gameElement) => {
              return <RenderGameElement gameElement={gameElement} />;
            })}
          </Board>
        </DndContext>
        <div className="flex justify-end mr-9">
          <Button onClick={handleOnClick} color="accent" className="mr-5">
            {'>>'}
          </Button>
          <Button onClick={setNewItem} color="accent">
            +
          </Button>
        </div>
      </Drawer>
    </div>
  );
}

export default App;
