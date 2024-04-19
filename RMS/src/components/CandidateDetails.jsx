import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CandidateDetails = () => {
  const { candidateID } = useParams();
  const [candidate, setCandidate] = useState("");
  const [cvBlob, setCvBlob] = useState(null);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await axios.get(`/candidate/${candidateID}`);
        const candidateData = response.data;

        const cvContent = candidateData.cvpath;

        // Convert the base64 encoded content to a Blob
        const byteCharacters = atob(cvContent);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: "application/pdf" }); // Adjust the MIME type if needed
        setCvBlob(blob);

        setCandidate(response.data);
      } catch (error) {
        console.error("Error fetching vacancies:", error);
      }
    };

    fetchCandidates();
  }, []);

  const downloadCV = () => {
    if (cvBlob) {
      // Create a URL for the Blob object
      const url = window.URL.createObjectURL(cvBlob);
      // Trigger download
      const link = document.createElement("a");
      link.href = url;
      link.download = "CV.pdf"; // Set the desired filename
      document.body.appendChild(link);
      link.click();
      // Clean up
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
    }
  };

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

      {cvBlob && (
        <div>
          <p>
            <strong>CV : </strong><button onClick={downloadCV}>Download CV</button>
          </p>
        </div>
      )}
    </div>
  );
};

export default CandidateDetails;
