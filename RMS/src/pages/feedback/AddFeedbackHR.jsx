import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AddFeedbackHR = () => {
  //Edit ddata
  const { id } = useParams();

  const { interviewID } = useParams();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    feedbackdate: "",
    salaryexpectation: "",
    comment: "",
  });

  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  useEffect(() => {
    axios
      .get(`/feedback/${id}`)
      .then((resp) => setFormData({ ...resp.data[0] }));
  }, [id]);

  // const [user, setUser] = useState([]);

  // useEffect(() => {
  //   const fetchInterviewer = async () => {
  //     try {
  //       // Fetch JWT token from local storage
  //       const token = localStorage.getItem("token");

  //       // Decode JWT token to extract user ID
  //       const decodedToken = jwtDecode(token);
  //       const userId = decodedToken.id;

  //       // Fetch interviews relevant to the user ID
  //       const response = await axios.get(`/${userId}`, {
  //         //   headers: {
  //         //     'Authorization': `Bearer ${token}`,
  //         //     'Content-Type': 'application/json'
  //         //   }
  //       });

  //       if (response.status === 200) {
  //         setUser(response.data);
  //       } else {
  //         // Handle error
  //         console.error("Failed to fetch interviewer:", response.statusText);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching interviewers:", error);
  //     }
  //   };
  //   fetchInterviewer();
  // }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const feedbackData = {
      feedbackdate: formData.feedbackdate,
      salaryexpectation: formData.salaryexpectation,
      comment: formData.comment,
    };

    setFormData({ ...formData, feedbackData });

    console.log(feedbackData);

    try {
      const response = await axios.post(
        `/feedbackhr/${interviewID}/savefeedbackhr`,
        feedbackData
      );
      alert("Feedback sent successfully");
      navigate(`/interviewlist`);

      setFormData({
        feedbackdate: "",
        salaryexpectation: "",
        comment: "",
      });
    } catch (error) {
      console.log(error.message);
      alert("Feedback creation failed");
    }
  };

  return (
    <>
      <div className="bg-background">
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Interview Feedback
          </h2>
        </div>

        {/* <h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white"> Interviewed By : </h1>
        <p className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
          {user.map((interviewer) => (
            <React.Fragment key={interviewer.id}>
              {interviewer.firstName} {interviewer.lastname}
            </React.Fragment>
          ))}
        </p> */}

        <form className="space-y-6  mx-96" onSubmit={handleSubmit}>
          {/* <div>
            <label
              htmlFor="jobTitle"
              className="block text-sm font-medium leading-6 text-white"
            >
              Job Title
            </label>
            <div className="mt-2">
              <input
                id="jobTitle"
                name="jobTitle"
                type="text"
                autoComplete="given-name"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="candidateName"
              className="block text-sm font-medium leading-6 text-white"
            >
              Candidate Name
            </label>
            <div className="mt-2">
              <input
                id="candidateName"
                name="candidateName"
                type="text"
                autoComplete="family-name"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div> */}

          <div>
            <label
              htmlFor="feedbackdate"
              className="block text-sm font-medium leading-6 text-white"
            >
              Date
            </label>
            <div className="mt-2">
              <input
                id="feedbackdate"
                name="feedbackdate"
                value={formData.feedbackdate || ""}
                onChange={handleChange}
                type="date"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="w-full">
            <label
              htmlFor="salaryexpectation"
              className="block text-sm font-medium leading-6 text-white"
            >
              Salary Expectation
            </label>
            <input
              id="salaryexpectation"
              name="salaryexpectation"
              type="text"
              value={formData.salaryexpectation}
              onChange={handleChange}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>

          <div className="w-full">
            <label
              htmlFor="comment"
              className="block text-sm font-medium leading-6 text-white"
            >
              Comment
            </label>
            <input
              id="comment"
              name="comment"
              type="textarea"
              value={formData.comment}
              onChange={handleChange}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-button px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-button focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add Feedback
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddFeedbackHR;
