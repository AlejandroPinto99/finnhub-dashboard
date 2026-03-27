import { useEffect, useState } from "react";
import {
  Box,
  CssBaseline,
} from "@mui/material";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { useWebSocket } from "./hooks/useWebSocket";
import { StockChart } from "./components/Charts/StockChart";

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { trades, subscribe, unsubscribe } = useWebSocket();

  useEffect(() => {
    subscribe("BINANCE:BTCUSDT");

    return () => {
      unsubscribe("BINANCE:BTCUSDT");
    };
  }, []);

  console.log({ trades })

  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <CssBaseline />
      <Sidebar
        open={sidebarOpen}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      {/* Área principal */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          bgcolor: "background.default",
        }}
      >
        {/* Contenido scrolleable */}
        <Box sx={{ flexGrow: 1, overflow: "auto", p: 3 }}>
          <p>Alejandro estuvo aquí</p>
          <ul>
            {(trades["BINANCE:BTCUSDT"] || [])
              .slice(0, 10)
              .map((trade, index) => (
                <li key={index}>
                  {trade.s} - ${trade.p} ({trade.v})
                </li>
              ))}
          </ul>
          {
            trades["BINANCE:BTCUSDT"]?.length > 0 && (
              <StockChart symbol={"BINANCE:BTCUSDT"} trades={trades["BINANCE:BTCUSDT"]} />
            )
          }
        </Box>
      </Box>
    </Box>
  );
}