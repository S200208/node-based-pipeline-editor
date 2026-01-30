import pytest
from fastapi.testclient import TestClient
from main import app, is_dag, Node, Edge

client = TestClient(app)
class TestDAGDetection:
   
    def test_empty_graph(self):

        nodes = []
        edges = []
        assert is_dag(nodes, edges) == True
    
    def test_single_node_no_edges(self):
      
        nodes = [Node(id="A", type="input", position={}, data={})]
        edges = []
        assert is_dag(nodes, edges) == True
    
    def test_simple_chain_dag(self):
    
        nodes = [
            Node(id="A", type="input", position={}, data={}),
            Node(id="B", type="text", position={}, data={}),
            Node(id="C", type="output", position={}, data={}),
        ]
        edges = [
            Edge(source="A", target="B"),
            Edge(source="B", target="C"),
        ]
        assert is_dag(nodes, edges) == True
    
    def test_two_node_cycle(self):
        """A → B → A should NOT be a DAG"""
        nodes = [
            Node(id="A", type="input", position={}, data={}),
            Node(id="B", type="text", position={}, data={}),
        ]
        edges = [
            Edge(source="A", target="B"),
            Edge(source="B", target="A"),
        ]
        assert is_dag(nodes, edges) == False
    
    def test_self_loop(self):
    
        nodes = [Node(id="A", type="input", position={}, data={})]
        edges = [Edge(source="A", target="A")]
        assert is_dag(nodes, edges) == False
    
    def test_three_node_cycle(self):
       
        nodes = [
            Node(id="A", type="input", position={}, data={}),
            Node(id="B", type="text", position={}, data={}),
            Node(id="C", type="output", position={}, data={}),
        ]
        edges = [
            Edge(source="A", target="B"),
            Edge(source="B", target="C"),
            Edge(source="C", target="A"),
        ]
        assert is_dag(nodes, edges) == False
    
    def test_diamond_graph(self):
     
        nodes = [
            Node(id="A", type="input", position={}, data={}),
            Node(id="B", type="text", position={}, data={}),
            Node(id="C", type="text", position={}, data={}),
            Node(id="D", type="output", position={}, data={}),
        ]
        edges = [
            Edge(source="A", target="B"),
            Edge(source="A", target="C"),
            Edge(source="B", target="D"),
            Edge(source="C", target="D"),
        ]
        assert is_dag(nodes, edges) == True
    
    def test_disconnected_graph(self):

        nodes = [
            Node(id="A", type="input", position={}, data={}),
            Node(id="B", type="text", position={}, data={}),
            Node(id="C", type="input", position={}, data={}),
            Node(id="D", type="output", position={}, data={}),
        ]
        edges = [
            Edge(source="A", target="B"),
            Edge(source="C", target="D"),
        ]
        assert is_dag(nodes, edges) == True
    
    def test_edge_to_nonexistent_node(self):
      
        nodes = [
            Node(id="A", type="input", position={}, data={}),
            Node(id="B", type="output", position={}, data={}),
        ]
        edges = [
            Edge(source="A", target="B"),
            Edge(source="A", target="X"), 
        ]
      
        assert is_dag(nodes, edges) == True
    
    def test_complex_dag(self):
     
        nodes = [
            Node(id="1", type="input", position={}, data={}),
            Node(id="2", type="text", position={}, data={}),
            Node(id="3", type="text", position={}, data={}),
            Node(id="4", type="text", position={}, data={}),
            Node(id="5", type="output", position={}, data={}),
        ]
        edges = [
            Edge(source="1", target="2"),
            Edge(source="1", target="3"),
            Edge(source="2", target="4"),
            Edge(source="3", target="4"),
            Edge(source="4", target="5"),
        ]
        assert is_dag(nodes, edges) == True

class TestParseEndpoint:
   
    
    def test_parse_simple_pipeline(self):
        
        payload = {
            "nodes": [
                {"id": "input-1", "type": "customInput", "position": {"x": 0, "y": 0}, "data": {}},
                {"id": "text-1", "type": "text", "position": {"x": 200, "y": 0}, "data": {}},
                {"id": "output-1", "type": "customOutput", "position": {"x": 400, "y": 0}, "data": {}},
            ],
            "edges": [
                {"source": "input-1", "target": "text-1"},
                {"source": "text-1", "target": "output-1"},
            ]
        }
        
        response = client.post("/pipelines/parse", json=payload)
        assert response.status_code == 200
        data = response.json()
        
        assert data["num_nodes"] == 3
        assert data["num_edges"] == 2
        assert data["is_dag"] == True
    
    def test_parse_cyclic_pipeline(self):
       
        payload = {
            "nodes": [
                {"id": "node-1", "type": "text", "position": {"x": 0, "y": 0}, "data": {}},
                {"id": "node-2", "type": "text", "position": {"x": 200, "y": 0}, "data": {}},
            ],
            "edges": [
                {"source": "node-1", "target": "node-2"},
                {"source": "node-2", "target": "node-1"},
            ]
        }
        
        response = client.post("/pipelines/parse", json=payload)
        assert response.status_code == 200
        data = response.json()
        
        assert data["num_nodes"] == 2
        assert data["num_edges"] == 2
        assert data["is_dag"] == False
    
    def test_parse_single_node(self):
       
        payload = {
            "nodes": [
                {"id": "input-1", "type": "customInput", "position": {"x": 0, "y": 0}, "data": {}},
            ],
            "edges": []
        }
        
        response = client.post("/pipelines/parse", json=payload)
        assert response.status_code == 200
        data = response.json()
        
        assert data["num_nodes"] == 1
        assert data["num_edges"] == 0
        assert data["is_dag"] == True
    
    def test_parse_empty_pipeline(self):
       
        payload = {
            "nodes": [],
            "edges": []
        }
        
        response = client.post("/pipelines/parse", json=payload)
        assert response.status_code == 200
        data = response.json()
        
        assert data["num_nodes"] == 0
        assert data["num_edges"] == 0
        assert data["is_dag"] == True
    
    def test_parse_diamond_graph(self):
       
        payload = {
            "nodes": [
                {"id": "a", "type": "input", "position": {"x": 0, "y": 0}, "data": {}},
                {"id": "b", "type": "text", "position": {"x": 100, "y": -100}, "data": {}},
                {"id": "c", "type": "text", "position": {"x": 100, "y": 100}, "data": {}},
                {"id": "d", "type": "output", "position": {"x": 200, "y": 0}, "data": {}},
            ],
            "edges": [
                {"source": "a", "target": "b"},
                {"source": "a", "target": "c"},
                {"source": "b", "target": "d"},
                {"source": "c", "target": "d"},
            ]
        }
        
        response = client.post("/pipelines/parse", json=payload)
        assert response.status_code == 200
        data = response.json()
        
        assert data["num_nodes"] == 4
        assert data["num_edges"] == 4
        assert data["is_dag"] == True
    
    def test_parse_with_cycle_in_subgraph(self):
      
        payload = {
            "nodes": [
                {"id": "1", "type": "input", "position": {"x": 0, "y": 0}, "data": {}},
                {"id": "2", "type": "text", "position": {"x": 100, "y": 0}, "data": {}},
                {"id": "3", "type": "text", "position": {"x": 200, "y": 0}, "data": {}},
                {"id": "4", "type": "text", "position": {"x": 300, "y": 0}, "data": {}},
            ],
            "edges": [
                {"source": "1", "target": "2"},
                {"source": "2", "target": "3"},
                {"source": "3", "target": "4"},
                {"source": "3", "target": "2"}, 
            ]
        }
        
        response = client.post("/pipelines/parse", json=payload)
        assert response.status_code == 200
        data = response.json()
        
        assert data["num_nodes"] == 4
        assert data["num_edges"] == 4
        assert data["is_dag"] == False
    
    def test_parse_with_missing_fields(self):
       
        payload = {
            "nodes": [
                {"id": "a", "type": "input", "position": {}, "data": {}},
                {"id": "b", "type": "output", "position": {}, "data": {}},
            ],
            "edges": [
                {"source": "a", "target": "b"},  
            ]
        }
        
        response = client.post("/pipelines/parse", json=payload)
        assert response.status_code == 200
        data = response.json()
        
        assert data["num_nodes"] == 2
        assert data["num_edges"] == 1
        assert data["is_dag"] == True


def test_health_check():
   
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"Ping": "Pong"}


if __name__ == "__main__":
    # Run tests with: python -m pytest test_main.py -v
    pytest.main([__file__, "-v"])
