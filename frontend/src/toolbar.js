import { DraggableNode } from './draggableNode';
import './styles/toolbarstyles.css';
export const PipelineToolbar = () => {
    return (
        <div className="toolbar">
            <div className="toolbar-header">
                <h1>Pipeline Builder</h1>
                <p>Drag nodes below to the canvas to create your pipeline</p>
            </div>
            <div className="toolbar-nodes">
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='math' label='Math' />
                <DraggableNode type='condition' label='Condition' />
                <DraggableNode type='delay' label='Delay' />
                <DraggableNode type='logger' label='Logger' />
                <DraggableNode type='apiInput' label='API Input' />
            </div>
        </div>
    );
};
