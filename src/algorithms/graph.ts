import { VisualizationStep } from '../types';

interface GraphNode {
  id: number;
  x: number;
  y: number;
  visited: boolean;
  distance?: number;
}

interface GraphEdge {
  from: number;
  to: number;
  weight?: number;
}

export const bfsVisualization = (nodes: GraphNode[], edges: GraphEdge[], startNode: number): VisualizationStep[] => {
  const steps: VisualizationStep[] = [];
  const visited = new Set<number>();
  const queue: number[] = [startNode];
  const nodesCopy = nodes.map(n => ({ ...n, visited: false }));

  steps.push({
    step: 0,
    description: `Starting BFS from node ${startNode}`,
    data: { nodes: nodesCopy, edges, queue: [...queue] },
    highlighted: [startNode],
    code: `queue = [${startNode}]`,
    variables: { queue: [...queue], visited: Array.from(visited) },
  });

  while (queue.length > 0) {
    const current = queue.shift()!;
    
    if (visited.has(current)) continue;
    
    visited.add(current);
    nodesCopy[current].visited = true;

    steps.push({
      step: steps.length,
      description: `Visiting node ${current}`,
      data: { nodes: [...nodesCopy], edges, queue: [...queue] },
      highlighted: [current],
      code: `current = ${current}; visited.add(${current});`,
      variables: { queue: [...queue], visited: Array.from(visited), current },
    });

    // Add neighbors to queue
    const neighbors = edges
      .filter(e => e.from === current)
      .map(e => e.to)
      .filter(neighbor => !visited.has(neighbor));

    neighbors.forEach(neighbor => {
      if (!queue.includes(neighbor)) {
        queue.push(neighbor);
      }
    });

    if (neighbors.length > 0) {
      steps.push({
        step: steps.length,
        description: `Added neighbors [${neighbors.join(', ')}] to queue`,
        data: { nodes: [...nodesCopy], edges, queue: [...queue] },
        highlighted: neighbors,
        code: `queue.push(${neighbors.join(', ')});`,
        variables: { queue: [...queue], visited: Array.from(visited), neighbors },
      });
    }
  }

  steps.push({
    step: steps.length,
    description: 'BFS traversal completed!',
    data: { nodes: [...nodesCopy], edges, queue: [] },
    highlighted: [],
    code: 'return visited;',
    variables: { visited: Array.from(visited), completed: true },
  });

  return steps;
};

export const dijkstraVisualization = (nodes: GraphNode[], edges: GraphEdge[], startNode: number): VisualizationStep[] => {
  const steps: VisualizationStep[] = [];
  const distances = new Map<number, number>();
  const visited = new Set<number>();
  const nodesCopy = nodes.map(n => ({ ...n, distance: Infinity, visited: false }));

  // Initialize distances
  nodesCopy.forEach((_, index) => distances.set(index, Infinity));
  distances.set(startNode, 0);
  nodesCopy[startNode].distance = 0;

  steps.push({
    step: 0,
    description: `Starting Dijkstra's algorithm from node ${startNode}`,
    data: { nodes: [...nodesCopy], edges },
    highlighted: [startNode],
    code: `distances[${startNode}] = 0`,
    variables: { 
      distances: Object.fromEntries(distances), 
      visited: Array.from(visited),
      current: startNode 
    },
  });

  while (visited.size < nodes.length) {
    // Find unvisited node with minimum distance
    let current = -1;
    let minDistance = Infinity;

    for (let i = 0; i < nodes.length; i++) {
      if (!visited.has(i) && distances.get(i)! < minDistance) {
        minDistance = distances.get(i)!;
        current = i;
      }
    }

    if (current === -1) break;

    visited.add(current);
    nodesCopy[current].visited = true;

    steps.push({
      step: steps.length,
      description: `Visiting node ${current} with distance ${minDistance}`,
      data: { nodes: [...nodesCopy], edges },
      highlighted: [current],
      code: `current = ${current}; distance = ${minDistance}`,
      variables: { 
        distances: Object.fromEntries(distances), 
        visited: Array.from(visited),
        current,
        minDistance 
      },
    });

    // Update distances to neighbors
    const neighbors = edges.filter(e => e.from === current);
    
    for (const edge of neighbors) {
      const neighbor = edge.to;
      const newDistance = distances.get(current)! + (edge.weight || 1);

      if (newDistance < distances.get(neighbor)!) {
        distances.set(neighbor, newDistance);
        nodesCopy[neighbor].distance = newDistance;

        steps.push({
          step: steps.length,
          description: `Updated distance to node ${neighbor}: ${newDistance}`,
          data: { nodes: [...nodesCopy], edges },
          highlighted: [current, neighbor],
          code: `distances[${neighbor}] = ${newDistance}`,
          variables: { 
            distances: Object.fromEntries(distances), 
            visited: Array.from(visited),
            current,
            neighbor,
            newDistance 
          },
        });
      }
    }
  }

  steps.push({
    step: steps.length,
    description: 'Dijkstra\'s algorithm completed!',
    data: { nodes: [...nodesCopy], edges },
    highlighted: [],
    code: 'return distances;',
    variables: { distances: Object.fromEntries(distances), completed: true },
  });

  return steps;
};