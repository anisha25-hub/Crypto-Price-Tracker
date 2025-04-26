# Real-Time Crypto Price Tracker

A responsive React + Redux application that tracks real-time cryptocurrency prices, simulating WebSocket updates for live data visualization.

![CryptoTracker Demo](https://i.imgur.com/demo.gif)

## Features

- Real-time cryptocurrency price and market data tracking
- Simulated WebSocket connection for live updates
- Complete Redux state management using Redux Toolkit
- Responsive data table optimized for all devices
- 7-day price charts for visual trend analysis
- Color-coded price changes to easily identify market movement
- Comprehensive crypto metrics including market cap, volume, and supply

## Tech Stack

- **Frontend**:
  - React 18
  - TypeScript
  - Redux Toolkit for state management
  - Tailwind CSS for styling
  - Chart.js for data visualization
  - Vite for development & building

- **Backend**:
  - Node.js with Express
  - Mock data generation with realistic price movements

## Project Architecture

```
/
├── frontend/              # React frontend application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── store/         # Redux store configuration
│   │   │   └── slices/    # Redux slices
│   │   ├── services/      # API and WebSocket services
│   │   ├── hooks/         # Custom React hooks
│   │   ├── types/         # TypeScript type definitions
│   │   └── utils/         # Utility functions
│   └── ...
└── backend/               # Node.js backend server
    ├── server.js          # Express server
    └── mockData.js        # Data generation utilities
```

