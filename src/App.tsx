import { useRecoilState } from 'recoil';

import { counterState } from './recoil/atoms/count';
import { boardState } from './recoil/atoms/board';

import { DndContext } from '@dnd-kit/core';
import { createSnapModifier } from '@dnd-kit/modifiers';
import Board from './components/Board';
import Card from './components/Card';
import Place from './components/Place';
import {
  drawerVisibilityState,
  selectedElementIdState,
} from './recoil/atoms/ui';

import { PlaceProperties, CardProperties } from './type';
import RenderGameElement from './components/RenderGameElement';
import { BOARD_ID } from './constants';
import useHandleDradEnd from './hooks/useHandleDradEnd';
import { PropertyEditor } from './components/PropertyEditor';
import { Drawer, Menu, Textarea } from 'react-daisyui';
import { Button } from 'semantic-ui-react';
import './App.css';

function App() {
  const [counter, setCounter] = useRecoilState(counterState);
  const [board, setBoard] = useRecoilState(boardState);
  const [isDrawerVisible, setIsDrawerVisible] = useRecoilState(
    drawerVisibilityState
  );
  const [selectedElementId, setSelectedElementId] = useRecoilState(
    selectedElementIdState
  );
  const { handleDragEnd } = useHandleDradEnd();

  // test function for adding items to state and displaying
  const setNewItem = () => {
    const id = `testPlace${counter}`;
    const newBoard = { ...board };
    newBoard.childElements = [
      ...(board?.childElements ?? []),
      {
        id,
        coordinates: { x: counter * 100, y: counter * 100 },
        size: { width: 100, height: 100 },
        title: `test place ${counter}`,
        parentId: BOARD_ID,
        // and children cards
        childElements: [
          {
            id: `testCard${counter + 1}`,
            coordinates: { x: counter * 100, y: counter * 100 },
            size: { width: 100, height: 100 },
            title: `test card ${counter}`,
            state: 'head',
            parentId: id,
            Component: Card,
          } as CardProperties,
        ],
        Component: Place,
      } as PlaceProperties,
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
          <Board>
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
