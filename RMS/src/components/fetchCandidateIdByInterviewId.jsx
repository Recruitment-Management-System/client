

const fetchCandidateIDByInterviewID = async (interviewID) => {
    try {
      const response = await fetch(`/interview/${interviewID}/candidateId`); 
      if (!response.ok) {
        throw new Error('Failed to fetch interview data');
      }
      const data = await response.json();
      return data.candidateID; 
    } catch (error) {
      throw new Error('Failed to fetch candidateID by interviewID: ' + error.message);
    }
  };
  
  export { fetchCandidateIDByInterviewID };
  