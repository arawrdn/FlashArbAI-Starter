"use client";

import { useState } from "react";
import {
  WagmiConfig,
  configureChains,
  createClient,
} from "wagmi";
import { mainnet } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

import { createAppKit } from "@reown/appkit";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";

// Konfigurasi chains & providers
const { chains, provider } = configureChains([mainnet], [publicProvider()]);

// Wagmi adapter untuk Reown AppKit
const wagmiAdapter = new WagmiAdapter({
  chains,
  projectId: "180a7164cfa9e5388daf1160841f65a0", // Project ID kamu
});

// Client wagmi
const client = createClient({
  autoConnect: true,
  connectors: wagmiAdapter.connectors,
  provider: wagmiAdapter.provider,
});

// Inisialisasi AppKit (UI modal untuk koneksi multi-wallet)
createAppKit({
  adapters: [wagmiAdapter],
  projectId: "180a7164cfa9e5388daf1160841f65a0", // Project ID sama
  chains,
  metadata: {
    name: "FlashArbAI",
    description: "AI-driven DeFi Arbitrage Scanner",
    url: "http://localhost:3000",
    icons: ["https://your-dapp-url.com/icon.png"],
  },
});

export default function Home() {
  const [arb, setArb] = useState(null);

  async function checkArbitrage() {
    // Dummy prices
    const uniPrice = 1000;
    const balPrice = 1015;

    if (balPrice - uniPrice > 10) {
      setArb(
        `✅ Arbitrage opportunity: Buy at Uniswap (${uniPrice}), Sell at Balancer (${balPrice})`
      );
    } else {
      setArb("❌ No arbitrage opportunity found.");
    }
  }

  return (
    <WagmiConfig client={client}>
      <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
        <h1>⚡ FlashArbAI Starter</h1>

        {/* Tombol modal multi-wallet */}
        <appkit-button />

        <button onClick={checkArbitrage} style={{ marginTop: "15px" }}>
          Check Arbitrage
        </button>

        {arb && <p>{arb}</p>}
      </div>
    </WagmiConfig>
  );
}
