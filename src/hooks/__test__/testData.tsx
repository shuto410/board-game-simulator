import { BoardProperties, GameElement, PlaceProperties } from '../../type';

const testCoordinate: GameElement['coordinates'] = { x: 0, y: 0 };
const testSize: GameElement['size'] = { width: 0, height: 0 };

export const boardTestData: BoardProperties = {
  id: 'board',
  coordinates: testCoordinate,
  size: testSize,
  type: 'BOARD',
  childElements: [
    {
      id: 'place',
      type: 'PLACE',
      coordinates: testCoordinate,
      size: testSize,
      parentId: 'board',
    } as PlaceProperties,
  ],
};
