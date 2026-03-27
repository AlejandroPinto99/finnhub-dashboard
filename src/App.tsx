import { useEffect, useState } from "react";
import {
  Box,
  CssBaseline,
} from "@mui/material";
import { Sidebar } from "./components/Sidebar/Sidebar";


type Trade = {
  p: number; // precio
  s: string; // símbolo
  t: number; // timestamp
  v: number; // volumen
};

export default function App() {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  // const API_KEY = "d72ug4pr01qn7f070dogd72ug4pr01qn7f070dp0"
  // useEffect(() => {
  //   const socket = new WebSocket(
  //     `wss://ws.finnhub.io?token=${API_KEY}`
  //   );

  //   // Conexión abierta
  //   socket.addEventListener("open", () => {
  //     console.log("Conectado");

  //     // Suscribirse a un símbolo (ej: Apple)
  //     socket.send(JSON.stringify({"type":"subscribe","symbol":"BINANCE:BTCUSDT"}));
  //   });

  //   // Recibir datos
  //   socket.addEventListener("message", (event) => {
  //     const data = JSON.parse(event.data);
  //     console.log({ data })
  //     if (data.type === "trade") {
  //       setTrades((prev) => [...data.data, ...prev]);
  //     }
  //   });

  //   // Manejo de errores
  //   socket.addEventListener("error", (err) => {
  //     console.error("Error:", err);
  //   });

  //   // Cleanup
  //   return () => {
  //     socket.close();
  //   };
  // }, []);

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
        </Box>
      </Box>
    </Box>
  );
}