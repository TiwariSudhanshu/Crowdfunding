import React, { useEffect, useState } from "react";
import { Home, Zap, Shield, Globe } from "lucide-react";
import CampaignCard from "./components/CampaignCard";
import Navigation from "./components/Navigation";
import CreateCampaignModal from "./components/CreateCampaignModal";
import { ethers } from "ethers";
import crowdfundingABI from "./contractABI";
import { contractAddress } from "./config";
import { useCrowdfunding } from "./context/CrowdFundingContext";
const App = () => {
  // Setting up solidity
  const { currentAccount, connectWallet } = useCrowdfunding();
  const { campaigns, getAllCampaigns } = useCrowdfunding();

  useEffect(() => {
    getAllCampaigns();
  }, [campaigns]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-zinc-900 text-white min-h-screen pb-20">
      {/* Header */}
      <header className="bg-zinc-800 border-b border-zinc-700 py-5 px-6 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Zap className="text-emerald-500" size={32} />
            <h1 className="text-2xl font-bold tracking-tight">CrowdFunding</h1>
          </div>
          <div className="flex items-center space-x-4">
            {currentAccount ? (
              <p>Connected: {currentAccount}</p>
            ) : (
              <button
                className='"bg-emerald-600 text-white px-5 py-2 rounded-full hover:bg-emerald-700 transition-colors flex items-center space-x-2'
                onClick={connectWallet}
              >
                <Shield size={18} />
                <span>Connect Wallet</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Campaigns Grid */}
      <div className="container mx-auto px-4 mt-8">
        <h2 className="text-3xl font-bold mb-8 tracking-tight">
          Active Campaigns
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {campaigns.length > 0 ? (
            campaigns.map((campaign) => (
              <CampaignCard key={campaign.id} {...campaign} />
            ))
          ) : (
            <p className="text-zinc-300 col-span-full">
              No campaigns available
            </p>
          )}
        </div>
      </div>
      <CreateCampaignModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Navigation */}
      <Navigation onCreateCampaign={() => setIsModalOpen(true)} />
    </div>
  );
};

export default App;
