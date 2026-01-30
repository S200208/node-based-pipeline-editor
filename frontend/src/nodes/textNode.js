import { useState, useRef, useEffect } from 'react';
import { Handle, Position } from 'reactflow';
import { createAbstractNode } from './AbstractNode';


const parseVariables = (text) => {
  const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
  const variables = new Set();
  let match;

  while ((match = regex.exec(text)) !== null) {
    variables.add(match[1]);
  }

  return Array.from(variables);
};

const getVariableHandlePosition = (index, total) => {
  if (total <= 1) return '50%';
  return `${((index + 1) / (total + 1)) * 100}%`;
};


function TextNodeContent({ id, data }) {
  const [text, setText] = useState(data?.text || '{{input}}');
  const textareaRef = useRef(null);
  const [variables, setVariables] = useState([]);

 
  useEffect(() => {
    const parsed = parseVariables(text);
    setVariables(parsed);
   
    if (data?.onChange) {
      data.onChange({ ...data, variables: parsed, text });
    }
  }, [text, data]);

 
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 300) + 'px';
    }
  }, [text]);

  return (
    <>
     
      {variables.length > 0 ? (
        variables.map((varName, index) => (
          <Handle
            key={`${id}-var-${varName}`}
            type="target"
            position={Position.Left}
            id={`${id}-var-${varName}`}
            style={{
              top: getVariableHandlePosition(index, variables.length),
              pointerEvents: 'auto',
            }}
            data-variable={varName}
          />
        ))
      ) : (
       
        <Handle
          key={`${id}-default-input`}
          type="target"
          position={Position.Left}
          id={`${id}-input`}
          style={{ top: '50%', pointerEvents: 'auto' }}
        />
      )}

     
      <textarea
        ref={textareaRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onMouseDown={(e) => e.stopPropagation()}
        className="text-node-textarea nodrag"
        placeholder="Enter text... Use {{ variable }}"
      />
    </>
  );
}


export const TextNode = createAbstractNode({
  title: 'Text',
  inputs: [],    
  outputs: ['output'],  
  renderContent: (props) => <TextNodeContent {...props} />,
});
