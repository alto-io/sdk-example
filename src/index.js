import { ethers } from "ethers";

ethereum.request({ method: 'eth_requestAccounts' }).then(
    () => {
        alert("Logged in!");
    }
);

const provider = new ethers.providers.Web3Provider(window.ethereum)

const signer = provider.getSigner()


