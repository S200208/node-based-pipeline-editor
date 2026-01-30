import { useState } from 'react';
import { createAbstractNode } from './AbstractNode';

export const MathNode = ({ id, data }) => {
  const [operation, setOperation] = useState(data?.operation || 'add');

  const renderContent = () => (
    <div>
      <label style={{ display: 'block' }}>
        Operation:
        <select 
          value={operation} 
          onChange={(e) => setOperation(e.target.value)}
          style={{ marginLeft: '6px', padding: '4px', width: '100%', boxSizing: 'border-box' }}
        >
          <option value="add">Add (+)</option>
          <option value="subtract">Subtract (-)</option>
          <option value="multiply">Multiply (*)</option>
          <option value="divide">Divide (/)</option>
        </select>
      </label>
    </div>
  );

  const MathNodeComponent = createAbstractNode({
    title: 'Math',
    inputs: ['a', 'b'],
    outputs: ['result'],
    renderContent: renderContent
  });

  return <MathNodeComponent id={id} data={data} />;
}
