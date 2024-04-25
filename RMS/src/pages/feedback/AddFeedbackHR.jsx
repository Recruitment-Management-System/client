import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";

const AddFeedbackHR = () => {
  //Edit ddata
  const { feedbackidhr } = useParams();

  const { interviewID } = useParams();

  const navigate = useNavigate();

  //fetch interviewer id from the token
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const userId = decodedToken.id;


  const [formData, setFormData] = useState({
    userId: userId,
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
      .get(`/feedbackhr/${feedbackidhr}`)
      .then((resp) => setFormData({ ...resp.data[0] }));
  }, [feedbackidhr]);

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const feedbackData = {
      userId: userId,
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
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Feedback submitted Successfully",
        showConfirmButton: false,
      });
      navigate('/api/interviewer');

      axios.put(`/interview/${interviewID}/updateStatus`);

      setFormData({
        feedbackdate: "",
        salaryexpectation: "",
        comment: "",
      });
    } catch (error) {
      console.log(error.message);
      Swal.fire({
        icon: "error",
        title: "Unsuccessfull!",
        text: "Feedback Submission Failed",
      });
    }
  };

  return (
    <>
      <div className="bg-background h-max">
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Interview Feedback
          </h2>
        </div>

      
        <div className="mt-10 sm:mx-auto sm:w-full h-lvh">
        <form className="space-y-6  mx-96" onSubmit={handleSubmit}>
          

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
                value={formData.feedbackdate}
                required
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
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
              type="number"
              value={formData.salaryexpectation}
              required
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
              required
              onChange={handleChange}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>

          <div >
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-button px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-button focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add Feedback
            </button>
          </div>
        </form>
        </div>
      </div>
    </>
  );
};

export default AddFeedbackHR;
