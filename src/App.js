import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [coins, setCoins] = useState([]);

  const fetchData = async () => {
    const res = await axios.get('https://crypto-tracker-backend-2n2c.onrender.com/api/coins');
    setCoins(res.data);
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">Top 10 Cryptocurrencies</h1>
      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded shadow">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2">Name</th>
              <th className="p-2">Symbol</th>
              <th className="p-2">Price (USD)</th>
              <th className="p-2">Market Cap</th>
              <th className="p-2">24h %</th>
              <th className="p-2">Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {coins.map((coin) => (
              <tr key={coin.coinId} className="text-center border-b">
                <td className="p-2">{coin.name}</td>
                <td className="p-2">{coin.symbol.toUpperCase()}</td>
                <td className="p-2">${coin.price.toLocaleString()}</td>
                <td className="p-2">${coin.marketCap.toLocaleString()}</td>
                <td className="p-2">{coin.change24h.toFixed(2)}%</td>
                <td className="p-2">{new Date(coin.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
