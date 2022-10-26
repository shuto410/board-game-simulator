import { useRecoilState } from 'recoil';
import { boardState } from '../recoil/atoms/board';
import { selectedElementIdState } from '../recoil/atoms/ui';
import { EditableProperties } from '../type';
import { Dropdown, DropdownProps, Form } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { ChangeEvent } from 'react';

export function PropertyEditor() {
  const [board, setBoard] = useRecoilState(boardState);
  const [selectedElementId, setSelectedElementId] = useRecoilState(
    selectedElementIdState
  );

  const find = (id: string) => {
    return {
      title: 'Merchant',
      image: 'https://image.png',
      color: '#123456',
      description: 'Something written',
      face: 'up',
      rotation: 'vertical',
    } as EditableProperties;
  };
  const selectedElement = find(selectedElementId);

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
        ...{ [propertyKey]: e.target.value },
      });
    };

  const getHandleDropdownChange =
    (propertyKey: keyof EditableProperties) =>
    (e: React.SyntheticEvent<HTMLElement>, { value }: DropdownProps) => {
      set(selectedElementId, {
        ...selectedElement,
        ...{ [propertyKey]: value as EditableProperties[typeof propertyKey] },
      });
    };

  const titleForm = title ? (
    <input
      placeholder="Title"
      value={title}
      onChange={getHandleOnChange('title')}
    />
  ) : null;

  const imageForm = image ? (
    <input
      placeholder="Image URL"
      value={image}
      onChange={getHandleOnChange('image')}
    />
  ) : null;

  const colorForm = color ? (
    <input
      placeholder="color"
      value={color}
      onChange={getHandleOnChange('color')}
    />
  ) : null;

  const descriptionForm = description ? (
    <input
      placeholder="description"
      value={description}
      onChange={getHandleOnChange('description')}
    />
  ) : null;

  const cardFaceSelection = face ? (
    <Dropdown
      fluid
      selection
      onChange={getHandleDropdownChange('face')}
      value={face}
      options={[
        { key: 'up', text: 'UP', value: 'up' },
        { key: 'down', text: 'DOWN', value: 'down' },
      ]}
    />
  ) : null;

  const cardRotationSelection = rotation ? (
    <Dropdown
      fluid
      selection
      onChange={getHandleDropdownChange('rotation')}
      value={rotation}
      options={[
        { key: 'vertical', text: 'VERTICAL', value: 'vertical' },
        { key: 'horizontal', text: 'HORIZONTAL', value: 'horizontal' },
      ]}
    />
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
    <>
      <div
        style={{ paddingBottom: '20px', fontSize: '18px', fontWeight: 'bold' }}
      >
        Properties
      </div>
      {items.map(({ header, content }) => {
        if (!content) return null;
        return (
          <Form>
            <Form.Field style={{ paddingBottom: '15px' }}>
              <label>{header}</label>
              {content}
            </Form.Field>
          </Form>
        );
      })}
    </>
  );
}
