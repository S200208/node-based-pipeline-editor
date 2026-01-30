from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any
from collections import defaultdict, deque

app = FastAPI()

# Enable CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request/Response Models
class Node(BaseModel):
    id: str
    type: str
    position: Dict[str, Any]
    data: Dict[str, Any]

class Edge(BaseModel):
    source: str
    target: str
    id: str = None
    type: str = None
    animated: bool = None
    markerEnd: Dict[str, Any] = None

class PipelinePayload(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

class ParseResponse(BaseModel):
    num_nodes: int
    num_edges: int
    is_dag: bool

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

def is_dag(nodes: List[Node], edges: List[Edge]) -> bool:

    if not nodes or not edges:
      
        return True
    
   
    node_ids = {node.id for node in nodes}
    in_degree = {node.id: 0 for node in nodes}
    adjacency_list = defaultdict(list)
    
   
    for edge in edges:
      
        if edge.source in node_ids and edge.target in node_ids:
            adjacency_list[edge.source].append(edge.target)
            in_degree[edge.target] += 1
    
   
    queue = deque([node_id for node_id in node_ids if in_degree[node_id] == 0])
    processed_count = 0
    
    while queue:
        node_id = queue.popleft()
        processed_count += 1
        
       
        for neighbor in adjacency_list[node_id]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)
    
    return processed_count == len(node_ids)

@app.post('/pipelines/parse', response_model=ParseResponse)
def parse_pipeline(payload: PipelinePayload):
  
    num_nodes = len(payload.nodes)
    num_edges = len(payload.edges)
    dag_status = is_dag(payload.nodes, payload.edges)
    
    return ParseResponse(
        num_nodes=num_nodes,
        num_edges=num_edges,
        is_dag=dag_status
    )

