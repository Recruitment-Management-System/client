import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const UpdateFeedbackHR = () => {
  const { feedbackhrid } = useParams(); 
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    feedbackdate: "",
    salaryexpectation: "",
    comment: "",
  });

  useEffect(() => {
    const fetchFeedbackHR = async () => {
      try {
        const response = await axios.get(`/feedbackhr/${feedbackhrid}`);
        const feedbackhr = response.data;
        setFormData({
          feedbackdate: feedbackhr.feedbackdate,
          salaryexpectation: feedbackhr.salaryexpectation,
          comment: feedbackhr.comment,
        });
      } catch (error) {
        console.error("Error fetching feedback data:", error);
      }
    };

    fetchFeedbackHR();
  }, [feedbackhrid]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/feedbackhr/updatehr/${feedbackhrid}`, formData);
      alert("Feedback updated successfully!");
      navigate(`/interviewlist`);
    } catch (error) {
      alert("Failed to update F. Please try again later.");
    }
  };

  return (
    <div className="bg-background">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Update Feedback
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="feedbackdate"
                className="block text-sm font-medium leading-6 text-white"
              >
                Feedback Date
              </label>
              <div className="mt-2">
                <input
                  id="feedbackdate"
                  name="feedbackdate"
                  type="text"
                  autoComplete="given-name"
                  value={formData.feedbackdate}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="salaryexpectation"
                className="block text-sm font-medium leading-6 text-white"
              >
                Salary Expectation
              </label>
              <div className="mt-2">
                <input
                  id="salaryexpectation"
                  name="salaryexpectation"
                  type="text"
                  autoComplete="family-name"
                  value={formData.salaryexpectation}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="comment"
                className="block text-sm font-medium leading-6 text-white"
              >
                Comment
              </label>
              <div className="mt-2">
                <input
                  id="comment"
                  name="comment"
                  type="text"
                  value={formData.comment}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-button px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-button focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Update Feedback
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateFeedbackHR;
