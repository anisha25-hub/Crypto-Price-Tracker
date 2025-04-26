import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { CryptoAsset, CryptoState } from '../../types';
import { fetchCryptoAssets } from '../../services/api';

// Initial state
const initialState: CryptoState = {
  assets: [],
  loading: false,
  error: null,
  lastUpdated: null,
};

// Async thunk for fetching crypto assets
export const fetchCryptoData = createAsyncThunk(
  'crypto/fetchCryptoData',
  async () => {
    const response = await fetchCryptoAssets();
    return response;
  }
);

// Create slice
const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    updateAssetPrice: (state, action: PayloadAction<{ id: string; price: number }>) => {
      const { id, price } = action.payload;
      const asset = state.assets.find(a => a.id === id);
      if (asset) {
        // Calculate percent change based on previous price
        const previousPrice = asset.price;
        const percentChange = ((price - previousPrice) / previousPrice) * 100;
        
        // Update price and percentage changes
        asset.price = price;
        asset.percentChange1h = adjustPercentChange(asset.percentChange1h, percentChange * 0.3);
        asset.percentChange24h = adjustPercentChange(asset.percentChange24h, percentChange * 0.1);
        asset.percentChange7d = adjustPercentChange(asset.percentChange7d, percentChange * 0.05);
        
        // Update volume with a random change
        const volumeChange = Math.random() * 0.1 - 0.05; // -5% to +5%
        asset.volume24h = Math.max(asset.volume24h * (1 + volumeChange), 0);
        
        state.lastUpdated = new Date().toISOString();
      }
    },
    updateMultipleAssets: (state, action: PayloadAction<CryptoAsset[]>) => {
      action.payload.forEach(updatedAsset => {
        const index = state.assets.findIndex(a => a.id === updatedAsset.id);
        if (index !== -1) {
          state.assets[index] = updatedAsset;
        }
      });
      state.lastUpdated = new Date().toISOString();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCryptoData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCryptoData.fulfilled, (state, action) => {
        state.loading = false;
        state.assets = action.payload;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(fetchCryptoData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch crypto data';
      });
  },
});

// Helper function to adjust percent changes within reasonable bounds
const adjustPercentChange = (currentPercent: number, adjustment: number): number => {
  const newPercent = currentPercent + adjustment;
  // Limit extreme changes to keep data realistic
  return Math.max(Math.min(newPercent, 30), -30);
};

export const { updateAssetPrice, updateMultipleAssets } = cryptoSlice.actions;

export default cryptoSlice.reducer;