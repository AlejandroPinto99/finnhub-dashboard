import { useEffect, useRef, useState } from "react";

type Trade = {
  p: number;
  s: string;
  t: number;
  v: number;
};

const API_KEY = "d72ug4pr01qn7f070dogd72ug4pr01qn7f070dp0";

export const useWebSocket = () => {
  const socketRef = useRef<WebSocket | null>(null);
  const [trades, setTrades] = useState<Trade[]>([]);
  const bufferRef = useRef<Trade[]>([]);
  const subscribedSymbols = useRef<Set<string>>(new Set());

  useEffect(() => {
    const socket = new WebSocket(`wss://ws.finnhub.io?token=${API_KEY}`);
    socketRef.current = socket;

    socket.onopen = () => {
      console.log("WebSocket connected");
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "trade") {
        bufferRef.current.push(...data.data);
      }
    };

    socket.onerror = (err) => {
      console.error("WebSocket error:", err);
    };

    socket.onclose = () => {
      setTimeout(() => {
        socketRef.current = null;
      }, 3000);
    };

    return () => {
      socket.close();
    };
  }, []);

  // Updates
  useEffect(() => {
    const intervals = setInterval(() => {
      if (bufferRef.current.length === 0) return;

      setTrades((prev) => {
        const updated = { ...prev };

        bufferRef.current.forEach((trade) => {
          if (!updated[trade.s]) {
            updated[trade.s] = [];
          }

          updated[trade.s].unshift(trade);
          updated[trade.s] = updated[trade.s].slice(0, 50);
        });

        return updated;
      });

      bufferRef.current = [];
    }, 1000);
    return () => clearInterval(intervals);
  }, []);

  const subscribe = (symbol: string) => {
    const socket = socketRef.current;

    if (!socket) return;

    if (socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ type: "subscribe", symbol }));
      subscribedSymbols.current.add(symbol);
    } else {
      console.warn("Socket no listo, esperando...");

      socket.addEventListener(
        "open",
        () => {
          socket.send(JSON.stringify({ type: "subscribe", symbol }));
          subscribedSymbols.current.add(symbol);
        },
        { once: true },
      );
    }
  };
  const unsubscribe = (symbol: string) => {
    if (!socketRef.current) return;
    if (!subscribedSymbols.current.has(symbol)) return;

    socketRef.current.send(
      JSON.stringify({
        type: "unsubscribe",
        symbol,
      }),
    );
    subscribedSymbols.current.delete(symbol);
  };

  return {
    trades,
    subscribe,
    unsubscribe,
  };
};
