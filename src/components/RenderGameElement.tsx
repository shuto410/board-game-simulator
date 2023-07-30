import { GameElement } from '../type';
import Board from './Board';
import Card from './Card';
import Place from './Place';

function RenderGameElement(props: { gameElement: GameElement }) {
  const { gameElement } = props;
  switch (gameElement.type) {
    case 'BOARD':
      return <Board {...gameElement} />;
    case 'PLACE':
      return <Place {...gameElement} />;
    case 'CARD':
      return <Card {...gameElement} />;
    case 'DECK':
      return <div>TBD</div>;
    case 'DUMMY_CARD':
      return <div>TBD</div>;
  }
}
export default RenderGameElement;
