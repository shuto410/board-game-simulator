import { useRecoilState } from 'recoil';
import { boardState } from '../recoil/atoms/board';
import { selectedElementIdState } from '../recoil/atoms/ui';
import { EditableProperties } from '../type';
import { ChangeEvent } from 'react';
import { Input, Menu, Select } from 'react-daisyui';
import { findGameElementById } from '../hooks/boardEditUtils';

export function PropertyEditor() {
  const [board, setBoard] = useRecoilState(boardState);
  const [selectedElementId, setSelectedElementId] = useRecoilState(
    selectedElementIdState
  );

  if (!selectedElementId) return null;

  const selectedElement = findGameElementById(
    board,
    selectedElementId
  ) as unknown as EditableProperties;

  if (!selectedElement) {
    return null;
  }

  const { title, color, image, description, face, rotation } = selectedElement;
  const set = (id: string, properties: EditableProperties) => {
    console.log('id: ', id);
    console.log('properties: ', properties);
  };
  const getHandleOnChange =
    (propertyKey: keyof EditableProperties) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      set(selectedElementId, {
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
      set(selectedElementId, {
        ...selectedElement,
        ...{
          [propertyKey]: e.target
            .value as EditableProperties[typeof propertyKey],
        },
      });
    };

  const titleForm = title ? (
    <div className="flex w-full component-preview p-4 items-center justify-center gap-2 font-sans">
      <Input
        placeholder="Title"
        value={title}
        onChange={getHandleOnChange('title')}
      />
    </div>
  ) : null;

  const imageForm = image ? (
    <div className="flex w-full component-preview p-4 items-center justify-center gap-2 font-sans">
      <Input
        placeholder="Image URL"
        value={image}
        onChange={getHandleOnChange('image')}
      />
    </div>
  ) : null;

  const colorForm = color ? (
    <div className="flex w-full component-preview p-4 items-center justify-center gap-2 font-sans">
      <Input
        placeholder="color"
        value={color}
        onChange={getHandleOnChange('color')}
      />
    </div>
  ) : null;

  const descriptionForm = description ? (
    <div className="flex w-full component-preview p-4 items-center justify-center gap-2 font-sans">
      <Input
        placeholder="description"
        value={description}
        onChange={getHandleOnChange('description')}
      />
    </div>
  ) : null;

  const cardFaceSelection = face ? (
    <div className="flex w-full component-preview p-4 gap-2 font-sans">
      <Select value={face} onChange={getHandleDropdownChange('face')}>
        <option value="default" disabled>
          Select card face
        </option>
        <option value="up">UP</option>
        <option value="down">DOWN</option>
      </Select>
    </div>
  ) : null;

  const cardRotationSelection = rotation ? (
    <div className="flex w-full component-preview p-4 gap-2 font-sans">
      <Select value={rotation} onChange={getHandleDropdownChange('rotation')}>
        <option value="default" disabled>
          Select card rotation
        </option>
        <option value="vertical">VERTICAL</option>
        <option value="vertical">HORIZONTAL</option>
      </Select>
    </div>
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
      <Menu.Title className="text-xl">Properties</Menu.Title>
      {items.map(({ header, content }) => {
        if (!content) return null;
        return (
          <>
            <label className="text-lg">{header}</label>
            {content}
          </>
        );
      })}
    </Menu>
  );
}
