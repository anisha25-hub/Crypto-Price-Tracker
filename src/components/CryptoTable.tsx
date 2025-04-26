import React, { useState } from 'react';
import { CryptoAsset } from '../types';
import PriceChange from './PriceChange';
import CryptoLogo from './CryptoLogo';
import PriceChart from './PriceChart';
import { formatCurrency, formatLargeNumber, formatSupply } from '../utils/formatters';
import { ChevronUp, ChevronDown, Star } from 'lucide-react';

interface CryptoTableProps {
  assets: CryptoAsset[];
}

const CryptoTable: React.FC<CryptoTableProps> = ({ assets }) => {
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());
  
  const toggleFavorite = (id: string) => {
    setFavoriteIds(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  };
  
  return (
    <div className="overflow-x-auto rounded-lg shadow">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-100 dark:bg-gray-800">
          <tr>
            <th scope="col" className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-10">
              <span className="sr-only">Favorite</span>
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-10">
              #
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Name
            </th>
            <th scope="col" className="px-3 py-3.5 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Price
            </th>
            <th scope="col" className="px-3 py-3.5 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              1h %
            </th>
            <th scope="col" className="px-3 py-3.5 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              24h %
            </th>
            <th scope="col" className="px-3 py-3.5 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              7d %
            </th>
            <th scope="col" className="px-3 py-3.5 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Market Cap
            </th>
            <th scope="col" className="px-3 py-3.5 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Volume (24h)
            </th>
            <th scope="col" className="px-3 py-3.5 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Circulating Supply
            </th>
            <th scope="col" className="px-3 py-3.5 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Last 7 Days
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
          {assets.map((asset) => (
            <tr 
              key={asset.id} 
              className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
            >
              <td className="px-3 py-4 whitespace-nowrap">
                <button 
                  onClick={() => toggleFavorite(asset.id)}
                  className="text-gray-400 hover:text-yellow-500 dark:hover:text-yellow-400 focus:outline-none transition-colors"
                  aria-label={favoriteIds.has(asset.id) ? "Remove from favorites" : "Add to favorites"}
                >
                  <Star 
                    size={16} 
                    className={favoriteIds.has(asset.id) ? "fill-yellow-400 text-yellow-400" : ""} 
                  />
                </button>
              </td>
              <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {asset.rank}
              </td>
              <td className="px-3 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <CryptoLogo symbol={asset.symbol} size={24} />
                  <div className="ml-3">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {asset.name}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {asset.symbol}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-3 py-4 whitespace-nowrap text-sm text-right font-medium text-gray-900 dark:text-white">
                {formatCurrency(asset.price)}
              </td>
              <td className="px-3 py-4 whitespace-nowrap text-sm text-right">
                <PriceChange value={asset.percentChange1h} />
              </td>
              <td className="px-3 py-4 whitespace-nowrap text-sm text-right">
                <PriceChange value={asset.percentChange24h} />
              </td>
              <td className="px-3 py-4 whitespace-nowrap text-sm text-right">
                <PriceChange value={asset.percentChange7d} />
              </td>
              <td className="px-3 py-4 whitespace-nowrap text-sm text-right text-gray-900 dark:text-white">
                {formatLargeNumber(asset.marketCap)}
              </td>
              <td className="px-3 py-4 whitespace-nowrap text-sm text-right text-gray-900 dark:text-white">
                {formatLargeNumber(asset.volume24h)}
              </td>
              <td className="px-3 py-4 whitespace-nowrap text-sm text-right text-gray-900 dark:text-white">
                {formatSupply(asset.circulatingSupply, asset.symbol)}
              </td>
              <td className="px-3 py-4 whitespace-nowrap text-sm text-right">
                <PriceChart data={asset.chartData} percentChange={asset.percentChange7d} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoTable;