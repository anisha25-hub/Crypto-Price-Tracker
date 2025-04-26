// Generate random price chart data (7 days)
const generateChartData = (price, volatility = 0.05) => {
  const data = [];
  let currentPrice = price;
  
  // Generate 7 days of hourly data (24 * 7 = 168 points)
  for (let i = 0; i < 168; i++) {
    // Random price change within volatility range
    const change = (Math.random() * 2 - 1) * volatility * currentPrice;
    currentPrice = Math.max(currentPrice + change, 0.000001); // Ensure price doesn't go below zero
    data.push(currentPrice);
  }
  
  // Sample down to 20 points for display
  const sampledData = [];
  const sampleRate = Math.floor(data.length / 20);
  
  for (let i = 0; i < data.length; i += sampleRate) {
    sampledData.push(data[i]);
  }
  
  return sampledData;
};

// Generate mock cryptocurrency data
export const generateMockData = () => {
  const cryptoData = [
    {
      id: 'bitcoin',
      rank: 1,
      name: 'Bitcoin',
      symbol: 'BTC',
      logo: 'https://cryptologos.cc/logos/bitcoin-btc.png',
      price: 93759.48,
      percentChange1h: 0.43,
      percentChange24h: 0.93,
      percentChange7d: 11.11,
      marketCap: 1861618902186,
      volume24h: 43874950947,
      circulatingSupply: 19.85e6,
      maxSupply: 21e6,
    },
    {
      id: 'ethereum',
      rank: 2,
      name: 'Ethereum',
      symbol: 'ETH',
      logo: 'https://cryptologos.cc/logos/ethereum-eth.png',
      price: 1802.46,
      percentChange1h: 0.60,
      percentChange24h: 3.21,
      percentChange7d: 13.68,
      marketCap: 217581279327,
      volume24h: 23547469307,
      circulatingSupply: 120.71e6,
      maxSupply: null,
    },
    {
      id: 'tether',
      rank: 3,
      name: 'Tether',
      symbol: 'USDT',
      logo: 'https://cryptologos.cc/logos/tether-usdt.png',
      price: 1.00,
      percentChange1h: 0.00,
      percentChange24h: 0.00,
      percentChange7d: 0.04,
      marketCap: 145320022085,
      volume24h: 92288882007,
      circulatingSupply: 145.27e9,
      maxSupply: null,
    },
    {
      id: 'xrp',
      rank: 4,
      name: 'XRP',
      symbol: 'XRP',
      logo: 'https://cryptologos.cc/logos/xrp-xrp.png',
      price: 2.22,
      percentChange1h: 0.46,
      percentChange24h: 0.54,
      percentChange7d: 6.18,
      marketCap: 130073814966,
      volume24h: 5131481491,
      circulatingSupply: 58.39e9,
      maxSupply: 100e9,
    },
    {
      id: 'bnb',
      rank: 5,
      name: 'BNB',
      symbol: 'BNB',
      logo: 'https://cryptologos.cc/logos/bnb-bnb.png',
      price: 606.65,
      percentChange1h: 0.09,
      percentChange24h: -1.20,
      percentChange7d: 3.73,
      marketCap: 85471956947,
      volume24h: 1874281784,
      circulatingSupply: 140.89e6,
      maxSupply: 200e6,
    },
    {
      id: 'solana',
      rank: 6,
      name: 'Solana',
      symbol: 'SOL',
      logo: 'https://cryptologos.cc/logos/solana-sol.png',
      price: 151.51,
      percentChange1h: 0.53,
      percentChange24h: 1.26,
      percentChange7d: 14.74,
      marketCap: 78381958631,
      volume24h: 4881674486,
      circulatingSupply: 517.31e6,
      maxSupply: null,
    }
  ];
  
  // Add chart data to each cryptocurrency
  cryptoData.forEach(crypto => {
    // Higher market cap coins tend to be less volatile
    const volatility = 0.05 / Math.sqrt(crypto.rank);
    crypto.chartData = generateChartData(crypto.price, volatility);
  });
  
  return cryptoData;
};