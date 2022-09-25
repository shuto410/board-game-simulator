type Elements = {
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
  parent?: GameElements;
  children?: GameElements[];
};

type GameElements = Card | DummyCard | Deck | Place | Board;

type CardState = 'head' | 'tail' | 'sideHead' | 'sideTail';

type Card = Elements & {
  title: string;
  image?: string;
  description?: string;
  state: CardState;
};

type DummyCard = Omit<Card, 'description'>;

type Deck = Elements & {
  image?: string;
};

type Place = Elements & {
  color?: string;
};

type Board = Elements & {};

export type { Card, Deck, DummyCard, Place, Board };
