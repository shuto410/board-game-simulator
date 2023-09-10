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

export type GameElement =
  | CardProperties
  | DummyCardProperties
  | DeckProperties
  | PlaceProperties
  | BoardProperties;

export type CardFace = 'up' | 'down';
export type CardRotation = 'vertical' | 'horizontal';

// TODO: sync the types below with the props of each component

export type CardProperties = BaseProperties & {
  type: 'CARD';
  title: string;
  face: CardFace;
  rotation: CardRotation;
  imageUrl?: string;
  description?: string;
};

export type DummyCardProperties = BaseProperties & {
  type: 'DUMMY_CARD';
  title: string;
  face: CardFace;
  rotation: CardRotation;
  imageUrl?: string;
};

export type DeckProperties = BaseProperties & {
  type: 'DECK';
  imageUrl?: string;
};

export type PlaceProperties = BaseProperties & {
  type: 'PLACE';
  title?: string;
  color?: string;
};

export type BoardProperties = BaseProperties & {
  type: 'BOARD';
};

export type EditableProperties = Omit<CardProperties, 'type'> &
  Omit<PlaceProperties, 'type'>;
