# Node-Based Pipeline Editor

This project is a **pipeline editor** where users can create workflows using nodes and connections.

## Features

- **Add nodes** and connect them
- **Use variables** inside text nodes (`{{variable}}`)
- **Send the pipeline** to the backend for validation
- **Get validation results**:
  - Total nodes
  - Total connections (edges)
  - Check if pipeline forms a DAG (Directed Acyclic Graph)

## Technologies Used

- **Frontend**: React, React Flow, JavaScript
- **Backend**: FastAPI, Python
- **Styling**: CSS / Tailwind / Styled Components

## Main Features

### Node System
- Common logic is reused using a **base node**
- Easily **add new nodes**
- Includes **extra custom nodes**

### UI Styling
- Consistent **design for all nodes**
- **Clean layout** for readability

### Text Node
- Auto-adjusting **text area**
- Variables create **connection handles automatically**

### Backend Validation
- Pipeline data is sent to backend
- Backend returns:
  - Total nodes
  - Total connections
  - DAG check result
- Results are shown as an **alert**

## How to Run the Project

### Frontend
```bash
cd frontend
npm install
npm start
