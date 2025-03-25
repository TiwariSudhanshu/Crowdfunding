import React, { useState } from "react";
import { X, Upload, Plus, Image } from "lucide-react";
import { useCrowdfunding } from "../context/CrowdFundingContext";

const CreateCampaignModal = ({ isOpen, onClose, onCreateCampaign }) => {
  const [campaignData, setCampaignData] = useState({
    title: "",
    description: "",
    target: "",
    deadline: "",
  });
  const { createCampaign } = useCrowdfunding();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCampaignData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createCampaign(
      campaignData.title,
      campaignData.description,
      campaignData.target,
      Math.floor(new Date(campaignData.deadline).getTime() / 1000)
    );
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="main-modal fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
      <div className="bg-zinc-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border border-zinc-700">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-6 border-b border-zinc-700">
          <h2 className="text-2xl font-bold text-white">Create New Campaign</h2>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white transition-colors"
          >
            <X size={28} />
          </button>
        </div>

        {/* Modal Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Campaign Title */}
          <div>
            <label className="block text-zinc-300 mb-2">Campaign Title</label>
            <input
              type="text"
              name="title"
              value={campaignData.title}
              onChange={handleInputChange}
              required
              placeholder="Enter campaign title"
              className="w-full bg-zinc-700 text-white px-4 py-3 rounded-xl border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Campaign Description */}
          <div>
            <label className="block text-zinc-300 mb-2">Description</label>
            <textarea
              name="description"
              value={campaignData.description}
              onChange={handleInputChange}
              required
              rows={4}
              placeholder="Describe your campaign's mission and goals"
              className="w-full bg-zinc-700 text-white px-4 py-3 rounded-xl border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Campaign Goal */}
          <div>
            <label className="block text-zinc-300 mb-2">Funding Target</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-400">
                $
              </span>
              <input
                type="number"
                name="target"
                value={campaignData.target}
                onChange={handleInputChange}
                required
                min="100"
                placeholder="Enter funding target"
                className="w-full bg-zinc-700 text-white px-4 py-3 pl-8 rounded-xl border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Deadline Selection */}
          <div>
            <label className="block text-zinc-300 mb-2">Deadline</label>
            <div className="relative">
              <input
                type="Date"
                name="deadline"
                value={campaignData.deadline}
                onChange={handleInputChange}
                required
                className="w-full bg-zinc-700 text-white px-4 py-3 pl-8 rounded-xl border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-emerald-600 text-white py-4 rounded-xl hover:bg-emerald-700 transition-colors flex items-center justify-center space-x-2"
            >
              <Plus size={20} />
              <span>Create Campaign</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCampaignModal;
