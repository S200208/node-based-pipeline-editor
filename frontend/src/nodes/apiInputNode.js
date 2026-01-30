
import { useState } from 'react';
import { createAbstractNode } from './AbstractNode';

export const APIInputNode = ({ id, data }) => {
  const [endpoint, setEndpoint] = useState(data?.endpoint || 'https://api.example.com');
  const [method, setMethod] = useState(data?.method || 'GET');

  const renderContent = () => (
    <div>
      <label style={{ display: 'block', marginBottom: '6px' }}>
        Method:
        <select 
          value={method} 
          onChange={(e) => setMethod(e.target.value)}
          style={{ marginLeft: '6px', padding: '4px' }}
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </select>
      </label>
      <label style={{ display: 'block', fontSize: '12px' }}>
        Endpoint:
        <input 
          type="text" 
          value={endpoint} 
          onChange={(e) => setEndpoint(e.target.value)}
          style={{ marginLeft: '6px', padding: '4px', width: '100%', boxSizing: 'border-box', fontSize: '11px' }}
          placeholder="https://api.example.com"
        />
      </label>
    </div>
  );

  const APIInputNodeComponent = createAbstractNode({
    title: 'API Input',
    inputs: [],
    outputs: ['response'],
    renderContent: renderContent
  });

  return <APIInputNodeComponent id={id} data={data} />;
}
