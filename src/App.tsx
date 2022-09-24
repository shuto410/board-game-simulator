import { useState } from "react";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";

import { counterState } from "./recoil/atoms/count";

import Droppable from "./components/Droppable";
import Draggable from "./components/Draggable";
import { DndContext } from "@dnd-kit/core";

function App() {
  const [counter, setCounter] = useRecoilState(counterState);
  const [isDropped, setIsDropped] = useState(false);

  const DragMarkup = () => {
    return <Draggable>Drag me</Draggable>;
  };

  const handleDragEnd = (event: any) => {
    if (event.over && event.over.id === "droppable") {
      setIsDropped(true);
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="App">
        <h1>Vite + React + Recoil</h1>
        {!isDropped && <DragMarkup />}
        <Droppable>{isDropped ? <DragMarkup /> : "Drop here"}</Droppable>
      </div>
    </DndContext>
  );
}

export default App;
