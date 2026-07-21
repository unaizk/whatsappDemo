import { BrowserRouter, Routes, Route } from "react-router-dom";
import ConnectWhatsapp from "./Components/ConnectWhatsapp";
import ConnectGmail from "./Components/ConnectGmail";
import GoogleCallback from "./Components/GoogleCallback";

function Home() {
  return (
    <div style={{ padding: 40 }}>
      <h2>MySaleApp Integrations</h2>
      <ConnectWhatsapp />
      <br /><br />
      <ConnectGmail />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/google/callback" element={<GoogleCallback />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
