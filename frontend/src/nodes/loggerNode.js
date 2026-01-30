
import { useState } from 'react';
import { createAbstractNode } from './AbstractNode';
export const LoggerNode = ({ id, data }) => {
  const [prefix, setPrefix] = useState(data?.prefix || '[LOG]');
  const [showTimestamp, setShowTimestamp] = useState(data?.showTimestamp !== false);
  const renderContent = () => (
    <div>
      <label style={{ display: 'block', marginBottom: '6px', fontSize: '12px' }}>
        Prefix:
        <input 
          type="text" 
          value={prefix} 
          onChange={(e) => setPrefix(e.target.value)}
          style={{ marginLeft: '6px', padding: '4px', width: '100%', boxSizing: 'border-box' }}
          placeholder="[LOG]"
        />
      </label>
      <label style={{ display: 'flex', alignItems: 'center', fontSize: '12px' }}>
        <input 
          type="checkbox" 
          checked={showTimestamp} 
          onChange={(e) => setShowTimestamp(e.target.checked)}
          style={{ marginRight: '6px' }}
        />
        Show Timestamp
      </label>
    </div>
  );
  const LoggerNodeComponent = createAbstractNode({
    title: 'Logger',
    inputs: ['data'],
    outputs: ['data'],
    renderContent: renderContent
  });
  return <LoggerNodeComponent id={id} data={data} />;
}
