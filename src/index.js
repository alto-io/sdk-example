import { ethers } from "ethers";

if (typeof window.ethereum !== "undefined") {
    function setNetwork(networkId) {
        const networks = [
            "Ethereum Main Network (Mainnet)",
            "Ropsten Test Network",
            "Rinkeby Test Network",
            "Goerli Test Network",
            "Kovan Test Network",
        ];

        if (networkId === "0x1") {
            return networks[0];
        }

        if (networkId === "0x3") {
            return networks[1];
        }

        if (networkId === "0x4") {
            return networks[2];
        }

        if (networkId === "0x4") {
            return networks[3];
        }

        if (networkId === "0x2a") {
            return networks[4];
        }

        return "Undetected";
    }

    let connectButton = document.createElement("button");
    connectButton.setAttribute("id", "connectButton");
    connectButton.innerHTML = "Connect";
    document.body.appendChild(connectButton);

    connectButton.addEventListener("click", () => {
        getAddress();
    });

    async function getAddress() {
        ethereum
            .request({ method: "eth_requestAccounts" })
            .then((result) => {
                address = result;
                renderAddress.innerHTML = result;
            })
            .catch((result) => {
                renderAddress.innerHTML = result.message;
                console.log(result);
            });
        const chainId = await ethereum.request({ method: "eth_chainId" });
        renderNetwork.innerHTML = setNetwork(chainId);
    }

    let renderAddress = document.createElement("div");
    renderAddress.setAttribute("id", "renderAddress");
    renderAddress.innerHTML = "Please connect first!";
    document.body.appendChild(renderAddress);

    let renderNetwork = document.createElement("div");
    renderNetwork.setAttribute("id", "renderNetwork");
    renderNetwork.innerHTML = "Check network";
    document.body.appendChild(renderNetwork);

    let address;

    const provider = new ethers.providers.Web3Provider(window.ethereum);

    ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length === 0) {
            renderAddress.innerHTML = "Disconnected";
            renderNetwork.innerHTML = "Undetected";
        } else {
            renderAddress.innerHTML = accounts[0];
            ethereum.request({ method: "eth_chainId" }).then((chainId) => {
                renderNetwork.innerHTML = setNetwork(chainId);
            });
        }
    });

    ethereum.on("chainChanged", (chainId) => {
        renderNetwork.innerHTML = setNetwork(chainId);
        window.location.reload();
    });
} else {
    alert("Please install MetaMask!");
}
