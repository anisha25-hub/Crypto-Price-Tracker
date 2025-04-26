// Crypto asset interface
export interface CryptoAsset {
  id: string;
  rank: number;
  name: string;
  symbol: string;
  logo: string;
  price: number;
  percentChange1h: number;
  percentChange24h: number;
  percentChange7d: number;
  marketCap: number;
  volume24h: number;
  circulatingSupply: number;
  maxSupply: number | null;
  chartData: number[];
}

// State interface for the crypto slice
export interface CryptoState {
  assets: CryptoAsset[];
  loading: boolean;
  error: string | null;
  lastUpdated: string | null;
}

// WebSocket message types
export interface WebSocketMessage {
  type: 'price_update' | 'volume_update' | 'full_update';
  data: any;
}

export interface PriceUpdate {
  id: string;
  price: number;
}

// API response types
export interface ApiResponse {
  status: {
    error_code: number;
    error_message: string | null;
  };
  data: CryptoAsset[];
}