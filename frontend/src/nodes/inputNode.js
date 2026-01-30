import { useState } from 'react';
import { createAbstractNode } from './AbstractNode';

function InputNodeContent({ data }) {
  const [name, setName] = useState(data?.inputName || 'input');
  const [type, setType] = useState(data?.inputType || 'Text');

  return (
    <>
      <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px' }}>
        <span>Name:</span>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onMouseDown={(e) => e.stopPropagation()}
          className="nodrag"
          style={{ marginLeft: '6px', padding: '4px', width: '100%' }}
        />
      </label>

      <label style={{ display: 'block', fontSize: '12px' }}>
        <span>Type:</span>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          onMouseDown={(e) => e.stopPropagation()}
          className="nodrag"
          style={{ marginLeft: '6px', padding: '4px', width: '100%' }}
        >
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </label>
    </>
  );
}

export const InputNode = createAbstractNode({
  title: 'Input',
  inputs: [],
  outputs: ['value'],
  renderContent: (props) => <InputNodeContent {...props} />,
});
