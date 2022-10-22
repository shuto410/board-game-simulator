import { GameElement } from './type';

function RenderGameElement(props: { gameElement: GameElement }) {
  const { Component, ...rest } = props.gameElement;
  return <Component {...rest} />;
}
export default RenderGameElement;
