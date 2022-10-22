import { useRecoilState } from "recoil";
import { boardState } from "../recoil/atoms/board";
import { selectedElementIdState } from "../recoil/atoms/ui";
import {
  GameElement,
  CardProperties,
  PlaceProperties,
  CardFace,
  CardRotation,
} from "../type";
import {
  Button,
  Checkbox,
  Dropdown,
  DropdownProps,
  Form,
} from "semantic-ui-react";
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
      face: "up",
      rotation: "vertical",
    } as Properties;
  };
  const selectedElement = find(selectedElementId);

  if (!selectedElement) {
    return null;
  }

  type Properties = CardProperties & PlaceProperties;

  const { title, color, image, description, face, rotation } = selectedElement;
  const set = (id: string, properties: Properties) => undefined;
  const handleCardFaceChange = (e: any, { value }: DropdownProps) => {
    set(selectedElementId, {
      ...selectedElement,
      ...{ face: value as CardFace },
    });
  };
  const handleCardRotationChange = (e: any, { value }: DropdownProps) => {
    set(selectedElementId, {
      ...selectedElement,
      ...{ rotation: value as CardRotation },
    });
  };

  const titleForm = title ? <input placeholder="Title" value={title} /> : null;

  const imageForm = image ? (
    <input placeholder="Image URL" value={image} />
  ) : null;

  const colorForm = color ? <input placeholder="color" value={color} /> : null;

  const descriptionForm = description ? (
    <input placeholder="description" value={description} />
  ) : null;

  const cardFaceSelection = face ? (
    <Dropdown
      fluid
      selection
      onChange={handleCardFaceChange}
      value={face}
      options={[
        { key: "up", text: "UP", value: "up" },
        { key: "down", text: "DOWN", value: "down" },
      ]}
    />
  ) : null;

  const cardRotationSelection = face ? (
    <Dropdown
      fluid
      selection
      onChange={handleCardRotationChange}
      value={rotation}
      options={[
        { key: "vertical", text: "VERTICAL", value: "vertical" },
        { key: "horizontal", text: "HORIZONTAL", value: "horizontal" },
      ]}
    />
  ) : null;

  const items = [
    { header: "Title", content: titleForm },
    { header: "Image URL", content: imageForm },
    { header: "Color", content: colorForm },
    { header: "Description", content: descriptionForm },
    { header: "Card Face", content: cardFaceSelection },
    { header: "Card Rotation", content: cardRotationSelection },
  ];
  // const forms = [titleForm, imageForm, colorForm, descriptionForm];

  return (
    <>
      <div
        style={{ paddingBottom: "20px", fontSize: "18px", fontWeight: "bold" }}
      >
        Properties
      </div>
      {items.map((item) => {
        return (
          <Form>
            <Form.Field style={{ paddingBottom: "15px" }}>
              <label>{item.header}</label>
              {item.content}
            </Form.Field>
          </Form>
        );
      })}
    </>
  );
}
