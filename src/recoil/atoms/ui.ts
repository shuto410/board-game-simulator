import { atom } from 'recoil';

export const drawerVisibilityState = atom({
  key: 'drawerVisibilityState',
  default: false,
});

export const selectedElementIdState = atom<string | undefined>({
  key: 'selectedElementIdState',
  default: undefined,
});
