type BaseProperties = {
  id: string;
  isDroppable: boolean;
  isDraggable: boolean;
  coordinates: {
    x: number;
    y: number;
  };
  size: {
    width: number;
    height: number;
  };
  parent?: GameElement;
  children?: GameElement[];
};

type GameElement = Card | DummyCard | Deck | Place | Board;

type CardState = 'head' | 'tail' | 'sideHead' | 'sideTail';

type Card = BaseProperties & {
  title: string;
  image?: string;
  description?: string;
  state: CardState;
};

type DummyCard = Omit<Card, 'description'>;

type Deck = BaseProperties & {
  image?: string;
};

type Place = BaseProperties & {
  color?: string;
};

type Board = BaseProperties & {};

export type { Card, Deck, DummyCard, Place, Board };
