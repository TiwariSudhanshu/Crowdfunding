import React, { useState } from "react";
import { Zap } from "lucide-react";
import { useCrowdfunding } from "../context/CrowdFundingContext";
import { toast } from 'react-toastify';

const CampaignCard = ({ id, title, description, target, amountCollected }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [donationAmount, setDonationAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const progressPercentage = (amountCollected / target) * 100;
  const { donateToCampaign } = useCrowdfunding();

  const handleDonate = async () => {
    if (!donationAmount || donationAmount <= 0)
      return toast.error("Enter a valid amount");

    setLoading(true);
    try {
      await donateToCampaign(id, donationAmount);
      toast.success("Donation successful!");
      setIsModalOpen(false);
      setDonationAmount("");
    } catch (error) {
      console.error("Donation failed:", error);
      toast.error("Donation failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-zinc-800 rounded-2xl shadow-2xl overflow-hidden w-80 m-4 transform transition-all hover:scale-105 hover:shadow-4xl border border-zinc-700">
      <div className="relative">
        <img
          src="https://i.pinimg.com/736x/0c/89/39/0c8939455358229a2f3f001852890938.jpg"
          alt={title}
          className="w-full h-56 object-cover filter brightness-75"
        />
        <div className="absolute top-4 right-4 bg-zinc-900/70 px-3 py-1 rounded-full text-sm text-emerald-400">
          {`${progressPercentage.toFixed(0)}%`}
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-bold text-xl mb-3 text-white truncate">{title}</h3>
        <p className="text-zinc-400 text-sm mb-4 h-14 overflow-hidden">{description}</p>

        <div className="mb-3 flex justify-between text-sm">
          <span className="font-semibold text-emerald-500">${amountCollected.toLocaleString()}</span>
          <span className="text-zinc-500">Goal: ${target.toLocaleString()}</span>
        </div>

        <div className="w-full bg-zinc-700 rounded-full h-2 mb-4">
          <div
            className="bg-emerald-600 h-2 rounded-full"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full bg-emerald-600 text-white py-3 rounded-xl hover:bg-emerald-700 transition-colors duration-300 flex items-center justify-center space-x-2"
        >
          <Zap size={20} />
          <span>Support Campaign</span>
        </button>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-zinc-900 p-6 rounded-xl w-96">
            <h2 className="text-white text-lg font-bold mb-4">Enter Donation Amount</h2>
            <input
              type="number"
              value={donationAmount}
              onChange={(e) => setDonationAmount(e.target.value)}
              className="w-full p-2 rounded-lg bg-zinc-700 text-white border-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Enter amount in ETH"
            />
            <div className="flex justify-end space-x-3 mt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-zinc-600 rounded-lg text-white hover:bg-zinc-700"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                onClick={handleDonate}
                className="px-4 py-2 bg-emerald-600 rounded-lg text-white hover:bg-emerald-700 flex items-center justify-center"
                disabled={loading}
              >
                {loading ? (
                  <div className="h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  "Donate"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampaignCard;
