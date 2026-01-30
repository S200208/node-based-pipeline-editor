
import { Handle, Position } from 'reactflow';
export const LLMNode = ({ id, data }) => {
  return (
    <div className="abstract-node">
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-system`}
        style={{ top: '33%' }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-prompt`}
        style={{ top: '66%' }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-response`}
      />
      <div className="abstract-node__title">LLM</div>
      <div className="abstract-node__content">
        <span style={{ fontSize: '12px' }}>
          OpenAI Model
        </span>
      </div>
    </div>
  );
};
