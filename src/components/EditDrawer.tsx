import { CSSProperties } from 'react';
import { useRecoilState } from 'recoil';
import { drawerVisibilityState } from '../recoil/atoms/ui';

function EditDrawer() {
  const [isDrawerVisible, setIsDrawerVisible] = useRecoilState(
    drawerVisibilityState
  );

  if (!isDrawerVisible) return null;

  return (
    <nav style={styles}>
      <h1>メインメニュー</h1>
      <ul>
        <li>
          <a href="/">ブログ</a>
        </li>
        <li>
          <a href="/menu">メニュー</a>
        </li>
        <li>
          <a href="/about/"> 店舗情報</a>
        </li>
        <li>
          <a href="/contact/">お問い合わせ</a>
        </li>
      </ul>
    </nav>
  );
}

const styles: CSSProperties = {
  position: 'absolute',
  height: '100%',
  background: '#DDDDDD',
  // https://codepen.io/hato0317/pen/GRZmZVV
};

export default EditDrawer;
