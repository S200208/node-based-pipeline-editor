
import { useState } from 'react';
import { createAbstractNode } from './AbstractNode';

export const DelayNode = ({ id, data }) => {
  const [delayMs, setDelayMs] = useState(data?.delayMs || 1000);

  const renderContent = () => (
    <div>
      <label style={{ display: 'block' }}>
        Delay (ms):
        <input 
          type="number" 
          value={delayMs} 
          onChange={(e) => setDelayMs(parseInt(e.target.value) || 0)}
          min="0"
          step="100"
          style={{ marginLeft: '6px', padding: '4px', width: '100%', boxSizing: 'border-box' }}
        />
      </label>
    </div>
  );

  const DelayNodeComponent = createAbstractNode({
    title: 'Delay',
    inputs: ['trigger'],
    outputs: ['delayed'],
    renderContent: renderContent
  });

  return <DelayNodeComponent id={id} data={data} />;
}
