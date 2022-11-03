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
  Component: React.FC<Omit<BaseProperties, "Component">>;
};

export type GameElement =
  | CardProperties
  | DummyCardProperties
  | DeckProperties
  | PlaceProperties
  | BoardProperties;

export type CardFace = "up" | "down";
export type CardRotation = "vertical" | "horizontal";

// TODO: sync the types below with the props of each component

export type CardProperties = BaseProperties & {
  title: string;
  image?: string;
  description?: string;
  face: CardFace;
  rotation: CardRotation;
  isFrontsideDown: boolean;
  isUpsideRight: boolean;
};

export type DummyCardProperties = Omit<CardProperties, "description">;

export type DeckProperties = BaseProperties & {
  image?: string;
};

export type PlaceProperties = BaseProperties & {
  title?: string;
  color?: string;
};

export type BoardProperties = BaseProperties;

export type EditableProperties = Omit<
    CardProperties & PlaceProperties,
    keyof BaseProperties
  >;
