import { atom } from 'recoil';
import { GameElement } from '../../type';

export const boardState = atom<GameElement[]>({
  key: 'boardState',
  default: [],
});
