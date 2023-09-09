import { CSSProperties } from "react";
import { useRecoilState } from "recoil";
import { List } from "semantic-ui-react";
import { drawerVisibilityState } from "../recoil/atoms/ui";
import { Drawer as DaisyDrawer } from 'react-daisyui';

export type Props = React.PropsWithChildren;

const MOCK_DATA = (
  <List>
    <List.Item>test 1</List.Item>
    <List.Item>test 2</List.Item>
  </List>
); // will be removed

function Drawer({ children = MOCK_DATA }: Props) {
  const [isDrawerVisible, setIsDrawerVisible] = useRecoilState(
    drawerVisibilityState
  );

  return (
    
    <DaisyDrawer open={isDrawerVisible} side={children}>
    </DaisyDrawer>
  );
}

const container: CSSProperties = {
  position: "absolute",
  height: "100%",
  background: "#DDDDDD",
  transform: "translateX(-10vw)",
  transitionDuration: "0.3s",
  padding: "20px",
};

const active: CSSProperties = {
  transform: "translateX(0%)",
};

export default Drawer;
