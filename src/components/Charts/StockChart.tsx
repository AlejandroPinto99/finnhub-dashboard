import { LineChart } from '@mui/x-charts';
import { useMemo } from 'react';

export const StockChart = ({ trades, symbol }: { trades: Trade[], symbol: string }) => {
  const data = useMemo(() => {
    return trades.map(trade => ({
      x: new Date(trade.t),
      y: trade.p,
    }));
  }, [trades]);

  return (
    <LineChart
      series={[{ data, label: symbol, line: true }]}
      xAxis={{ type: 'time', labels: { format: 'HH:mm:ss' } }}
      yAxis={{ type: 'linear' }}
      width={600}
      height={300}
    />
  );
};