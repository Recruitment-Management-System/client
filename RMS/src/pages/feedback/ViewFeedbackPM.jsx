import React from "react";
import Table from "../../components/FeedbackViewTable";
import { Link } from 'react-router-dom'

const ViewFeedbackPM = () => {
  // Sample data
  const columns = ["Category", "Score", "Expected_Competency_Level", "Comment"];
  const data = [
    {
      Category: "Leadership",
      Score: 2,
      Expected_Competency_Level: 3,
      Comment: "sfsdf",
    },
  ];

  return (
    <div>
      <Table columns={columns} data={data} />
      <button className="cursor-pointer">
        <Link
          to={""}
          className="text-white rounded-sm text-1xl px-5 py-3 bg-[#222831]"
        >
          Hire Candidate
        </Link>
      </button>
      <button className="cursor-pointer">
        <Link
          to={""}
          className="text-white rounded-sm text-1xl px-5 py-3 bg-[#222831]"
        >
          Reject Candidate
        </Link>
      </button>
    </div>
  );
};

export default ViewFeedbackPM;
