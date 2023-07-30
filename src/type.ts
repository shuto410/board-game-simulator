type BaseProperties = {
  id: string;
  isDroppable?: boolean;
  isDraggable?: boolean;
  coordinates: {
    x: number;
    y: number;
  };
  size: {
    width: number;
    height: number;
  };
  parentId?: string;
  childElements?: GameElement[];
};

type GameElement =
  | CardProperties
  | DummyCardProperties
  | DeckProperties
  | PlaceProperties
  | BoardProperties;

type CardState = 'head' | 'tail' | 'sideHead' | 'sideTail';

// TODO: sync the types below with the props of each component

type CardProperties = BaseProperties & {
  type: 'CARD';
  title: string;
  state: CardState;
  imageUrl?: string;
  description?: string;
};

type DummyCardProperties = BaseProperties & {
  type: 'DUMMY_CARD'
  title: string;
  state: CardState;
  imageUrl?: string;
};

type DeckProperties = BaseProperties & {
  type: 'DECK'
  image?: string;
};

type PlaceProperties = BaseProperties & {
  type: 'PLACE'
  title?: string;
  color?: string;
};

type BoardProperties = BaseProperties & {
  type: 'BOARD'
};

export type {
  CardProperties,
  DeckProperties,
  DummyCardProperties,
  PlaceProperties,
  BoardProperties,
  GameElement,
};
