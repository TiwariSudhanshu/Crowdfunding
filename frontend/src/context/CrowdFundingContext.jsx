import { createContext, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import crowdfundingABI from "../contractABI";
import { contractAddress } from "../config";

const CrowdfundingContext = createContext();

export const CrowdfundingProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [campaigns, setCampaigns] = useState([]);
  const getEthereumContract = async () => {
    try {
      if (!window.ethereum) {
        alert("MetaMask is required! Please install it.");
        console.error("MetaMask not found.");
        return null;
      }

      // Connect to Ethereum provider
      const provider = new ethers.BrowserProvider(window.ethereum);
      if (!provider) {
        console.error("Ethereum provider not found.");
        return null;
      }

      // Get signer (user account)
      const signer = await provider.getSigner();
      if (!signer) {
        console.error("Failed to get signer. Please connect MetaMask.");
        return null;
      }

      // Create contract instance
      const contract = new ethers.Contract(
        contractAddress,
        crowdfundingABI,
        signer
      );
      if (!contract) {
        console.error("Failed to create contract instance.");
        return null;
      }

      console.log("Ethereum contract initialized successfully:", contract);
      return contract;
    } catch (error) {
      console.error("Error initializing Ethereum contract:", error);
      alert(`Error hehe: ${error.message}`);
      return null;
    }
  };

  const connectWallet = async () => {
    if (!window.ethereum) return alert("Install MetaMask!");
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setCurrentAccount(accounts[0]);
  };

  const createCampaign = async (title, description, target, deadline) => {
    try {
      const contract = await getEthereumContract();
      const tx = await contract.createCampaign(
        title,
        description,
        ethers.parseEther(target),
        deadline
      );
      await tx.wait();
      alert("Campaign Created Successfully!");
    } catch (error) {
      console.error(error);
    }
  };

  const donateToCampaign = async (campaignId, amount) => {
    try {
      const contract = await getEthereumContract();
      const tx = await contract.donate(campaignId, {
        value: ethers.parseEther(amount),
      });
      await tx.wait();
      alert("Donation Successful!");
    } catch (error) {
      console.error(error);
    }
  };

  const getAllCampaigns = async () => {
    try {
      const contract = await getEthereumContract();
      const campaignList = [];
      for (let i = 1; i <= 10; i++) {
        // Fetch first 10 campaigns
        try {
          const campaign = await contract.getCampaign(i);
          campaignList.push({
            id: i,
            owner: campaign[0],
            title: campaign[1],
            description: campaign[2],
            target: ethers.formatEther(campaign[3]),
            deadline: new Date(Number(campaign[4]) * 1000).toLocaleString(),
            amountCollected: ethers.formatEther(campaign[5]),
          });
        } catch (error) {
          break;
        }
      }
      setCampaigns(campaignList);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (currentAccount) getAllCampaigns();
  }, [currentAccount]);

  return (
    <CrowdfundingContext.Provider
      value={{
        currentAccount,
        connectWallet,
        createCampaign,
        donateToCampaign,
        campaigns,
        getAllCampaigns,
      }}
    >
      {children}
    </CrowdfundingContext.Provider>
  );
};

export const useCrowdfunding = () => useContext(CrowdfundingContext);
