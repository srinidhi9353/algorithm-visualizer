import { VisualizationStep } from '../types';

interface DataPoint {
  x: number;
  y: number;
  cluster?: number;
}

interface Centroid {
  x: number;
  y: number;
  cluster: number;
}

export const kMeansVisualization = (data: DataPoint[], k: number): VisualizationStep[] => {
  const steps: VisualizationStep[] = [];
  const points = data.map(p => ({ ...p }));
  
  // Initialize centroids randomly
  const centroids: Centroid[] = Array.from({ length: k }, (_, i) => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    cluster: i,
  }));

  steps.push({
    step: 0,
    description: `Initialize ${k} random centroids`,
    data: { points, centroids },
    highlighted: [],
    code: `k = ${k}; centroids = randomInit();`,
    variables: { k, iteration: 0, converged: false },
  });

  let iteration = 0;
  let hasChanged = true;

  while (hasChanged && iteration < 10) {
    hasChanged = false;
    iteration++;

    // Assign points to nearest centroid
    points.forEach((point, idx) => {
      let minDistance = Infinity;
      let nearestCluster = 0;

      centroids.forEach(centroid => {
        const distance = Math.sqrt(
          Math.pow(point.x - centroid.x, 2) + Math.pow(point.y - centroid.y, 2)
        );
        if (distance < minDistance) {
          minDistance = distance;
          nearestCluster = centroid.cluster;
        }
      });

      if (point.cluster !== nearestCluster) {
        hasChanged = true;
        point.cluster = nearestCluster;
      }
    });

    steps.push({
      step: steps.length,
      description: `Iteration ${iteration}: Assigned points to nearest centroids`,
      data: { points: [...points], centroids: [...centroids] },
      highlighted: [],
      code: `assignPointsToClusters();`,
      variables: { k, iteration, hasChanged },
    });

    // Update centroids
    centroids.forEach(centroid => {
      const clusterPoints = points.filter(p => p.cluster === centroid.cluster);
      if (clusterPoints.length > 0) {
        centroid.x = clusterPoints.reduce((sum, p) => sum + p.x, 0) / clusterPoints.length;
        centroid.y = clusterPoints.reduce((sum, p) => sum + p.y, 0) / clusterPoints.length;
      }
    });

    steps.push({
      step: steps.length,
      description: `Updated centroids based on cluster means`,
      data: { points: [...points], centroids: [...centroids] },
      highlighted: [],
      code: `updateCentroids();`,
      variables: { k, iteration, hasChanged },
    });
  }

  steps.push({
    step: steps.length,
    description: 'K-Means clustering completed!',
    data: { points, centroids },
    highlighted: [],
    code: 'return { clusters, centroids };',
    variables: { k, iteration, converged: true },
  });

  return steps;
};

export const linearRegressionVisualization = (data: DataPoint[]): VisualizationStep[] => {
  const steps: VisualizationStep[] = [];
  const n = data.length;
  
  // Calculate means
  const meanX = data.reduce((sum, p) => sum + p.x, 0) / n;
  const meanY = data.reduce((sum, p) => sum + p.y, 0) / n;

  steps.push({
    step: 0,
    description: 'Calculate means of X and Y',
    data: { points: data, meanX, meanY },
    highlighted: [],
    code: `meanX = ${meanX.toFixed(2)}, meanY = ${meanY.toFixed(2)}`,
    variables: { n, meanX, meanY },
  });

  // Calculate slope (m) and intercept (b)
  const numerator = data.reduce((sum, p) => sum + (p.x - meanX) * (p.y - meanY), 0);
  const denominator = data.reduce((sum, p) => sum + Math.pow(p.x - meanX, 2), 0);
  const slope = numerator / denominator;
  const intercept = meanY - slope * meanX;

  steps.push({
    step: steps.length,
    description: 'Calculate slope and intercept',
    data: { points: data, meanX, meanY, slope, intercept },
    highlighted: [],
    code: `slope = ${slope.toFixed(3)}, intercept = ${intercept.toFixed(3)}`,
    variables: { slope, intercept, numerator, denominator },
  });

  // Generate line points
  const minX = Math.min(...data.map(p => p.x));
  const maxX = Math.max(...data.map(p => p.x));
  const linePoints = [
    { x: minX, y: slope * minX + intercept },
    { x: maxX, y: slope * maxX + intercept },
  ];

  steps.push({
    step: steps.length,
    description: 'Linear regression line fitted!',
    data: { points: data, linePoints, equation: `y = ${slope.toFixed(3)}x + ${intercept.toFixed(3)}` },
    highlighted: [],
    code: `y = ${slope.toFixed(3)}x + ${intercept.toFixed(3)}`,
    variables: { slope, intercept, equation: true },
  });

  return steps;
};