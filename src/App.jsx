import abi from "./abi/chai.json"
import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import Buy from './components/Buy'
import GetMemos from "./components/GetMemos"
import './index.css'

function App() {
  const [account, setAccount] = useState(null);
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null
  });

  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0x695F173A93Eb7F45EC45Af5037f9412bc9c635f1";
      const contractABI = abi;

      try {
        const { ethereum } = window;

        if (ethereum) {
          // 1. Request accounts
          const accounts = await ethereum.request({ 
            method: "eth_requestAccounts" 
          });
          console.log("Account Connected: ", accounts[0]);

          window.ethereum.on("chainChanged", ()=>{
            window.location.reload();
          });

          window.ethereum.on("accountsChanged", ()=>{
            window.location.reload();
          });

          // 2. Initialize Provider (v6 syntax)
          const provider = new ethers.BrowserProvider(ethereum);

          // 3. Get Signer (In v6, this MUST be awaited)
          const signer = await provider.getSigner();

          // 4. Initialize Contract
          const contract = new ethers.Contract(
            contractAddress, 
            contractABI, 
            signer
          );
          setAccount(accounts[0]);
          setState({ provider, signer, contract });
        } else {
          alert("Please install MetaMask");
        }
      } catch (error) {
        console.error("Error connecting to wallet:", error);
      }
    };

    connectWallet();
  }, []);

  console.log("Current State:", state);

  return (
    <div className="App">
      <h1>Chai DApp</h1>
      <p>Connected Account: {account ? account : "Not connected"}</p>
      <Buy state={state} />
      <GetMemos state={state} />
    </div>
  );
}

export default App;