import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CandidateDetails = () => {
  const { candidateID } = useParams();
  const [candidate, setCandidate] = useState("");
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await axios.get(`/candidate/${candidateID}`);
        setCandidate(response.data);
      } catch (error) {
        console.error("Error fetching vacancies:", error);
      }
    };

    fetchCandidates();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">
        {candidate.firstname} {candidate.lastname}
      </h1>
      <p>
        <strong>NIC:</strong> {candidate.nic}
      </p>
      <p>
        <strong>Years of Experience:</strong> {candidate.experience}
      </p>
      <p>
        <strong>Qualification:</strong> {candidate.qualification}
      </p>
      <p>
        <strong>Description:</strong> {candidate.description}
      </p>
    </div>
  );
};

export default CandidateDetails;
