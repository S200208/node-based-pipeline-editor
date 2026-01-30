
import { useState } from 'react';
import { createAbstractNode } from './AbstractNode';

export const ConditionNode = ({ id, data }) => {
  const [operator, setOperator] = useState(data?.operator || 'equals');

  const renderContent = () => (
    <div>
      <label style={{ display: 'block', fontSize: '12px' }}>
        Condition:
        <select 
          value={operator} 
          onChange={(e) => setOperator(e.target.value)}
          style={{ marginLeft: '6px', padding: '4px', width: '100%', boxSizing: 'border-box' }}
        >
          <option value="equals">Equals (==)</option>
          <option value="notEquals">Not Equals (!=)</option>
          <option value="greaterThan">Greater Than (&gt;)</option>
          <option value="lessThan">Less Than (&lt;)</option>
          <option value="contains">Contains</option>
        </select>
      </label>
    </div>
  );

  const ConditionNodeComponent = createAbstractNode({
    title: 'Condition',
    inputs: ['value', 'compare'],
    outputs: ['true', 'false'],
    renderContent: renderContent
  });

  return <ConditionNodeComponent id={id} data={data} />;
}
