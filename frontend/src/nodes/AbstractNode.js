import { Handle, Position } from 'reactflow';
import './nodestyles.css';

export const createAbstractNode = (config) => {
  const { title, inputs = [], outputs = [], renderContent } = config;

  return function AbstractNodeComponent({ id, data }) {
    const getHandlePosition = (index, total) => {
      if (total === 1) return '50%';
      return `${((index + 1) / (total + 1)) * 100}%`;
    };

    return (
      <div className="abstract-node">
        {inputs.map((inputName, index) => (
          <Handle
            key={`${id}-input-${inputName}`}
            type="target"
            position={Position.Left}
            id={`${id}-${inputName}`}
            style={{ top: getHandlePosition(index, inputs.length) }}
          />
        ))}

        {outputs.map((outputName, index) => (
          <Handle
            key={`${id}-output-${outputName}`}
            type="source"
            position={Position.Right}
            id={`${id}-${outputName}`}
            style={{ top: getHandlePosition(index, outputs.length) }}
          />
        ))}

        {title && (
          <div className="abstract-node__title">
            {title}
          </div>
        )}

        <div className="abstract-node__content">
          {renderContent ? renderContent({ id, data }) : null}
        </div>
      </div>
    );
  };
};
