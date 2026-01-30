# Node-Based Pipeline Editor

This project is a pipeline editor where users can create workflows using nodes and connections.

Frontend is built using React (JavaScript)

Backend is built using FastAPI (Python)

# Users can:

Add nodes

Connect nodes

Use variables inside text nodes

Send the pipeline to the backend

Get validation results (nodes, edges, DAG check)

# Technologies Used

Frontend: React, React Flow, JavaScript

Backend: FastAPI, Python

Styling: CSS / Tailwind / Styled Components 

---
# Main Features
Node System

Common logic is reused using a base node.

New nodes can be added easily.

Extra custom nodes are included.

# UI Styling

All nodes follow the same design.

Clean layout and better readability.

Text Node

Text area auto-adjusts to content.

Variables written as {{variable}}

Each variable creates a connection handle automatically.

Backend Validation

Pipeline data is sent to backend.

Backend returns:

Total nodes

Total connections (edges)

Whether pipeline is a DAG

Results are shown as an alert.

---


## **How to Run the Project**

### **Frontend**
```bash
cd frontend
npm install
npm start
Runs on: http://localhost:3000
```
### **Backend**
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
Runs on: http://localhost:8000
```
## How to Use

Drag nodes into the workspace.

Connect nodes to build a pipeline.

Use {{variable_name}} in TextNode.

Click Submit Pipeline.

View results in alert:

Node count

Edge count

DAG status

### Notes

node_modules and virtual environment folders are not included.

Install dependencies using npm install and pip install.

