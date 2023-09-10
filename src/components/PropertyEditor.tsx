import { useRecoilState } from 'recoil';
import { boardState } from '../recoil/atoms/board';
import { selectedElementIdState } from '../recoil/atoms/ui';
import { EditableProperties } from '../type';
import { ChangeEvent } from 'react';
import { Input, Menu, Select } from 'react-daisyui';
import {
  findGameElementById,
  updateGameElementById,
} from '../hooks/boardEditUtils';

export function PropertyEditor() {
  const [board, setBoard] = useRecoilState(boardState);
  const [selectedElementId, _] = useRecoilState(selectedElementIdState);

  if (!selectedElementId) return null;

  const selectedElement = findGameElementById(
    board,
    selectedElementId
  ) as EditableProperties;

  const { title, color, imageUrl, description, face, rotation } =
    selectedElement;

  const setProperties = (properties: EditableProperties) => {
    const newBoard = updateGameElementById(
      board,
      { ...properties, type: 'CARD', id: selectedElementId },
      selectedElementId
    );
    setBoard(newBoard);
  };

  const getHandleOnChange =
    (propertyKey: keyof EditableProperties) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      setProperties({
        ...selectedElement,
        ...{
          [propertyKey]: e.target
            .value as EditableProperties[typeof propertyKey],
        },
      });
    };

  const getHandleDropdownChange =
    (propertyKey: keyof EditableProperties) =>
    (e: ChangeEvent<HTMLSelectElement>) => {
      setProperties({
        ...selectedElement,
        ...{
          [propertyKey]: e.target
            .value as EditableProperties[typeof propertyKey],
        },
      });
    };

  const titleForm = title ? (
    <Input
      placeholder="Title"
      value={title}
      onChange={getHandleOnChange('title')}
    />
  ) : null;

  const imageForm = imageUrl ? (
    <Input
      placeholder="Image URL"
      value={imageUrl}
      onChange={getHandleOnChange('imageUrl')}
    />
  ) : null;

  const colorForm = color ? (
    <Input
      placeholder="Color"
      value={color}
      onChange={getHandleOnChange('color')}
    />
  ) : null;

  const descriptionForm = description ? (
    <Input
      placeholder="Description"
      value={description}
      onChange={getHandleOnChange('description')}
    />
  ) : null;

  const cardFaceSelection = face ? (
    <Select value={face} onChange={getHandleDropdownChange('face')}>
      <option value="default" disabled>
        Select card face
      </option>
      <option value="up">UP</option>
      <option value="down">DOWN</option>
    </Select>
  ) : null;

  const cardRotationSelection = rotation ? (
    <Select value={rotation} onChange={getHandleDropdownChange('rotation')}>
      <option value="default" disabled>
        Select card rotation
      </option>
      <option value="vertical">VERTICAL</option>
      <option value="vertical">HORIZONTAL</option>
    </Select>
  ) : null;

  const items = [
    { header: 'Title', content: titleForm },
    { header: 'Image URL', content: imageForm },
    { header: 'Color', content: colorForm },
    { header: 'Description', content: descriptionForm },
    { header: 'Card Face', content: cardFaceSelection },
    { header: 'Card Rotation', content: cardRotationSelection },
  ];

  return (
    <Menu className="p-4 w-80 h-full bg-base-200 text-base-content">
      <Menu.Title className="text-xl mb-4">Properties</Menu.Title>
      {items.map(({ header, content }) => {
        if (!content) return null;
        return (
          <>
            <label className="text-lg ml-4">{header}</label>
            <div className="p-4">{content}</div>
          </>
        );
      })}
    </Menu>
  );
}
