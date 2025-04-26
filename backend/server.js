import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { generateMockData } from './mockData.js';

const app = express();
const port = process.env.PORT || 3001;
const server = createServer(app);

// Middleware
app.use(cors());
app.use(express.json());

// Generate initial mock data
const mockData = generateMockData();

// API Routes
app.get('/api/crypto', (req, res) => {
  res.json(mockData);
});

app.get('/api/crypto/:id', (req, res) => {
  const { id } = req.params;
  const asset = mockData.find(asset => asset.id === id);
  
  if (!asset) {
    return res.status(404).json({ error: 'Cryptocurrency not found' });
  }
  
  res.json(asset);
});

// WebSocket-like endpoint for frontend polling fallback (not actually used with our mock)
app.get('/api/crypto/updates', (req, res) => {
  // Return a subset of coins with updated prices
  const updatedCoins = mockData
    .sort(() => 0.5 - Math.random())
    .slice(0, 3)
    .map(coin => ({
      id: coin.id,
      price: coin.price * (1 + (Math.random() * 0.02 - 0.01)),
      percentChange1h: coin.percentChange1h + (Math.random() * 0.4 - 0.2),
      percentChange24h: coin.percentChange24h + (Math.random() * 0.2 - 0.1),
      volume24h: coin.volume24h * (1 + (Math.random() * 0.1 - 0.05)),
    }));
    
  res.json(updatedCoins);
});

// Start server
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});