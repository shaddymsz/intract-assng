import logo from './logo.svg';
import './App.css';
import Header from './Component/header';
import HomeContent from './Component/homeContent';
import Footer from './Component/footer';
import { WagmiConfig, createClient, configureChains, mainnet } from 'wagmi'
 
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'
 
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { ConnectKitProvider } from 'connectkit';

const { chains, provider, webSocketProvider } = configureChains(
  [mainnet],
  [alchemyProvider({ apiKey: 'ApiKey' }), publicProvider()],
)

const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
  
    new WalletConnectConnector({
      chains: chains,
      options: {
        qrcode: true,
      },
    }),
    new InjectedConnector({
      chains,
      options: {
        name: 'Injected',
        shimDisconnect: true,
      },
    }),
  ],
  provider,
  webSocketProvider,
})

function App() {
  return (
    <WagmiConfig client={client}>
    <ConnectKitProvider>
    <div className="App">
      <Header/>
       <HomeContent/>
        <Footer/>
        
    </div>
    </ConnectKitProvider>
    </WagmiConfig>
  );
}

export default App;
