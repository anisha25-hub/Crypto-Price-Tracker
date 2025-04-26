import { store } from '../store';
import { updateAssetPrice } from '../store/slices/cryptoSlice';
import { CryptoAsset } from '../types';

class MockWebSocket {
  private interval: NodeJS.Timeout | null = null;
  private connected = false;
  
  constructor(private updateFrequency = 2000) {}
  
  // Connect to mock WebSocket
  connect() {
    if (this.connected) return;
    
    console.log('MockWebSocket: Connected');
    this.connected = true;
    
    // Start sending random price updates
    this.interval = setInterval(() => {
      this.sendRandomPriceUpdates();
    }, this.updateFrequency);
    
    return this;
  }
  
  // Disconnect from mock WebSocket
  disconnect() {
    if (!this.connected) return;
    
    console.log('MockWebSocket: Disconnected');
    this.connected = false;
    
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }
  
  // Generate and dispatch random price updates
  private sendRandomPriceUpdates() {
    if (!this.connected) return;
    
    const state = store.getState();
    const assets = state.crypto.assets;
    
    // Randomly select 1-3 assets to update
    const assetsToUpdate = Math.floor(Math.random() * 3) + 1;
    const selectedIndices = new Set<number>();
    
    while (selectedIndices.size < assetsToUpdate && selectedIndices.size < assets.length) {
      const randomIndex = Math.floor(Math.random() * assets.length);
      selectedIndices.add(randomIndex);
    }
    
    // Update prices for selected assets
    selectedIndices.forEach(index => {
      const asset = assets[index];
      const priceChange = (Math.random() * 0.02 - 0.01) * asset.price; // -1% to +1%
      const newPrice = Math.max(asset.price + priceChange, 0.00001);
      
      store.dispatch(updateAssetPrice({
        id: asset.id,
        price: parseFloat(newPrice.toFixed(8)),
      }));
    });
  }
  
  // Check connection status
  get isConnected(): boolean {
    return this.connected;
  }
}

// Create and export a singleton instance
export const mockWebSocket = new MockWebSocket();