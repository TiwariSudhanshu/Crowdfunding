// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

contract Crowdfunding{
    
    // Structure of campaign

    struct Campaign{
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        address[] donors;
        mapping (address => uint256) donations;
    }

    uint256 public campaignCount; // Number of campaigns
    mapping (uint256 => Campaign) public campaigns; // Mapping of campaign id to campaign

    //Event when a new campaign is created
    event CampaignCreated(uint256 id, address owner, string title, uint256 target, uint256 deadline );

    // Event when donation is recieved
    event DonationReceived( uint256 campaignId, address donor, uint256 amount);

    // Function to create  a new campaign

    function createCampaign(
         string memory _title,
        string memory _description,
        uint256 _target,
        uint256 _deadline
    ) public {
        require(_deadline > block.timestamp , "Deadline must be in future");

        // Since new campaign created , one more added to total no of campaigns
        campaignCount++;

        // Creating new campaign directly in storage
        Campaign storage newCampaign = campaigns[campaignCount];

        newCampaign.owner = msg.sender;
        newCampaign.title = _title;
        newCampaign.description = _description;
        newCampaign.target = _target;
        newCampaign.deadline = _deadline;

        emit CampaignCreated(campaignCount, msg.sender, _title, _target, _deadline);
    
    }

    // Function to donate
    function donate( uint256 _campaignId) public payable{
        require(_campaignId <= campaignCount, "Invalid Campaign Id");

        // Find and store that certain campaig in a new storage refrence
        Campaign storage campaign = campaigns[_campaignId];
        require( block.timestamp < campaign.deadline, "Campaign has ended");

        // Update transaction
        campaign.amountCollected += msg.value;
        campaign.donors.push(msg.sender);
        campaign.donations[msg.sender] += msg.value;

        // emit event
        emit DonationReceived(_campaignId, msg.sender, msg.value);
    }

    // Function to withdraw funs
    function withdrawFunds( uint256 _campaignId) public{
          Campaign storage campaign = campaigns[_campaignId];
          
        //   Authenticate
        require(msg.sender == campaign.owner, "Only campaign owner can withdraw");
        require(block.timestamp >= campaign.deadline, "Cannot withdraw before deadline");

        // Transaction
        payable(msg.sender).transfer(campaign.amountCollected);
    }

    // Function to get Campaigns
     function getCampaign(uint256 _campaignId) public view returns (
        address owner, string memory title, string memory description, 
        uint256 target, uint256 deadline, uint256 amountCollected, address[] memory donors
    ) {
        Campaign storage campaign = campaigns[_campaignId];
        return (
            campaign.owner,
            campaign.title,
            campaign.description,
            campaign.target,
            campaign.deadline,
            campaign.amountCollected,
            campaign.donors
        );
    }

}