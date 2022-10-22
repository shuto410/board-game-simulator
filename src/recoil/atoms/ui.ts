import { atom } from 'recoil';

export const drawerVisibilityState = atom({
  key: 'drawerVisibilityState',
  default: false,
});

export const selectedElementIdState = atom<string | undefiened>({
  key: 'selectedElementIdState',
  default: undefined
})