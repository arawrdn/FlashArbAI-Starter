import { useState } from "react";
import {
  WagmiConfig,
  configureChains,
  createClient,
  useAccount,
  useConnect,
  useDisconnect,
} from "wagmi";
import { mainnet } from "wagmi/chains";
import { InjectedConnector } from "wagmi/connectors/injected";
import { publicProvider } from "wagmi/providers/public";

const { chains, provider } = configureChains([mainnet], [publicProvider()]);
const client = createClient({
  autoConnect: true,
  connectors: [new InjectedConnector({ chains })],
  provider,
});

function WalletConnector() {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  if (isConnected) {
    return (
      <div>
        <p>Connected: {address}</p>
        <button onClick={() => disconnect()}>Disconnect</button>
      </div>
    );
  }

  return (
    <div>
      {connectors.map((connector) => (
        <button key={connector.id} onClick={() => connect({ connector })}>
          Connect with {connector.name}
        </button>
      ))}
    </div>
  );
}

export default function Home() {
  const [arb, setArb] = useState(null);

  async function checkArbitrage() {
    // dummy prices from Uniswap & Balancer
    const uniPrice = 1000;
    const balPrice = 1015;

    if (balPrice - uniPrice > 10) {
      setArb(`Arbitrage opportunity: Buy at Uniswap (${uniPrice}), Sell at Balancer (${balPrice})`);
    } else {
      setArb("No arbitrage opportunity.");
    }
  }

  return (
    <WagmiConfig client={client}>
      <div style={{ padding: "20px" }}>
        <h1>FlashArbAI Starter</h1>
        <WalletConnector />
        <button onClick={checkArbitrage}>Check Arbitrage</button>
        {arb && <p>{arb}</p>}
      </div>
    </WagmiConfig>
  );
}
