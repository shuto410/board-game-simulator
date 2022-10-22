import { useRecoilState } from "recoil";
import { boardState } from "../recoil/atoms/board";
import { selectedElementIdState } from "../recoil/atoms/ui";
import { GameElement, CardProperties, PlaceProperties } from "../type";
import { Button, Checkbox, Form } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

export function PropertyEditor() {
  const [board, setBoard] = useRecoilState(boardState);
  const [selectedElementId, setSelectedElementId] = useRecoilState(
    selectedElementIdState
  );

  const find = (id: string) => {
    return {
      title: "Merchant",
      image: "https://image.png",
      color: "#123456",
      description: "Something written",
    } as Properties;
  };
  const selectedElement = find(selectedElementId);

  if (!selectedElement) {
    return null;
  }

  type Properties = CardProperties & PlaceProperties;

  const { title, color, image, description } = selectedElement;

  const titleForm: JSX.Element = (
    <Form>
      <Form.Field>
        <label>Title</label>
        <input placeholder="Title" value={title} />
      </Form.Field>
      {/* <Button type="submit">Submit</Button> */}
    </Form>
  );

  const imageForm: JSX.Element = (
    <Form>
      <Form.Field>
        <label>Image URL</label>
        <input placeholder="Image URL" value={image} />
      </Form.Field>
      {/* <Button type="submit">Submit</Button> */}
    </Form>
  );

  const colorForm: JSX.Element = (
    <Form>
      <Form.Field>
        <label>Color</label>
        <input placeholder="color" value={color} />
      </Form.Field>
      {/* <Button type="submit">Submit</Button> */}
    </Form>
  );

  const descriptionForm: JSX.Element = (
    <Form>
      <Form.Field>
        <label>Description</label>
        <input placeholder="description" value={description} />
      </Form.Field>
      {/* <Button type="submit">Submit</Button> */}
    </Form>
  );

  const forms = [titleForm, imageForm, colorForm, descriptionForm];

  return (
    <>
      <div>Properties</div>
      {forms.map((form) => {
        return <div style={{ paddingTop: "20px" }}>{form}</div>;
      })}
    </>
  );
}
