/**
 * Format a number as currency with appropriate abbreviation for large values
 */
export const formatCurrency = (value: number): string => {
  if (value >= 1) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 2,
    }).format(value);
  } else {
    // For very small values (below $1), show more decimal places
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 6,
    }).format(value);
  }
};

/**
 * Format large numbers with abbreviations (K, M, B, T)
 */
export const formatLargeNumber = (value: number): string => {
  if (value >= 1_000_000_000_000) {
    return `$${(value / 1_000_000_000_000).toFixed(2)}T`;
  } else if (value >= 1_000_000_000) {
    return `$${(value / 1_000_000_000).toFixed(2)}B`;
  } else if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(2)}M`;
  } else if (value >= 1_000) {
    return `$${(value / 1_000).toFixed(2)}K`;
  } else {
    return `$${value.toFixed(2)}`;
  }
};

/**
 * Format supply with appropriate cryptocurrency symbol
 */
export const formatSupply = (value: number, symbol: string): string => {
  if (value >= 1_000_000_000) {
    return `${(value / 1_000_000_000).toFixed(2)}B ${symbol}`;
  } else if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(2)}M ${symbol}`;
  } else if (value >= 1_000) {
    return `${(value / 1_000).toFixed(2)}K ${symbol}`;
  } else {
    return `${value.toFixed(2)} ${symbol}`;
  }
};

/**
 * Format a percent value with sign
 */
export const formatPercent = (value: number): string => {
  const sign = value > 0 ? '+' : '';
  return `${sign}${value.toFixed(2)}%`;
};