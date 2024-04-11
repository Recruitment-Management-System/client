import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AddFeedback = () => {
  
  //Edit ddata
  const { id } = useParams();

  const { interviewID } = useParams();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    details: {
      categoryMap: {},
    },
    overallrating: "",
    feedbackdate: "",
    secondinterview: false,
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

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const categoryMap = {
      Educational_Background: {
        score: e.target.elements.eduScore.value,
        expectedCompetencyLevel: e.target.elements.eduExpected.value,
        comment: e.target.elements.eduComment.value,
      },
      Relevant_Experience: {
        score: e.target.elements.expScore.value,
        expectedCompetencyLevel: e.target.elements.expExpected.value,
        comment: e.target.elements.expComment.value,
      },
      "Architecture_and_Systems_Design": {
        score: e.target.elements.archiScore.value,
        expectedCompetencyLevel: e.target.elements.archiExpected.value,
        comment: e.target.elements.archiComment.value,
      },
      "Software_Development_and_Programming,Methodologies_and_tools,Technical_Expertise":
        {
          score: e.target.elements.devScore.value,
          expectedCompetencyLevel: e.target.elements.devExpected.value,
          comment: e.target.elements.devComment.value,
        },
      "Conceptual_Understanding": {
        score: e.target.elements.conceptScore.value,
        expectedCompetencyLevel: e.target.elements.conceptExpected.value,
        comment: e.target.elements.conceptComment.value,
      },
      "Analytical_and_Problem_Solving_Skills": {
        score: e.target.elements.ssScore.value,
        expectedCompetencyLevel: e.target.elements.ssExpected.value,
        comment: e.target.elements.ssComment.value,
      },
      "Team_Work": {
        score: e.target.elements.teamScore.value,
        expectedCompetencyLevel: e.target.elements.teamExpected.value,
        comment: e.target.elements.teamComment.value,
      },
      "Leadership": {
        score: e.target.elements.leadScore.value,
        expectedCompetencyLevel: e.target.elements.leadExpected.value,
        comment: e.target.elements.leadComment.value,
      },
      "Growth_Potential_and_Achievements": {
        score: e.target.elements.achScore.value,
        expectedCompetencyLevel: e.target.elements.achExpected.value,
        comment: e.target.elements.achComment.value,
      },
      "Communication_Skills": {
        score: e.target.elements.cmmScore.value,
        expectedCompetencyLevel: e.target.elements.cmmExpected.value,
        comment: e.target.elements.cmmComment.value,
      },
    };

    const details = {
      categoryMap,
    };

    const feedbackData = {
      details,
      overallrating: formData.overallrating,
      secondinterview: formData.secondinterview,
      feedbackdate: formData.feedbackdate,
    };

    setFormData({ ...formData, feedbackData });

    console.log(feedbackData);

    try {
      const response = await axios.post(`/feedback/${interviewID}/savefeedback`, feedbackData);
      alert("Feedback sent successfully");
      navigate(`/interviewlist`);

      setFormData({
        details: {
          categoryMap: {},
        },
        overallrating: "",
        feedbackdate: "",
        secondinterview: false,
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
                required
                value={formData.feedbackdate}
                onChange={handleChange}
                type="date"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="overallrating"
              className="block text-sm font-medium leading-6 text-white"
            >
              Overall Rating
            </label>
            <div className="mt-2">
              <select
                id="overallrating"
                name="overallrating"
                required
                value={formData.overallrating}
                onChange={handleChange}
                className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                <option>0</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="secondinterview"
              className="block text-sm font-medium leading-6 text-white"
            >
              Second Interview Need:
            </label>
            <div className="mt-2">
              <input
                id="secondinterview"
                name="secondinterview"
                required
                type="checkbox"
                checked={formData.secondinterview}
                onChange={handleChange}
                className="form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
              />
            </div>
          </div>

          <h2 className="text-white"> Feedback </h2>

          <div>
            <table className="table-auto text-white border">
              <thead>
                <tr>
                  <th className="w-2/6 border">Category</th>
                  <th className="w-1/6 border">Score</th>
                  <th className="w-1/6 border">Expected Competency Level</th>
                  <th className="w-2/6 border">Comments</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border">Educational Background</td>
                  <td className="border">
                    <div className="mt-2">
                      <select
                        name="eduScore"
                        className="px-3 w-full py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 sm:text-sm sm:leading-6"
                      >
                        <option>0</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </select>
                    </div>
                  </td>
                  <td className="border">
                    <div className="mt-2">
                      <select
                        name="eduExpected"
                        className="px-3 w-full py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 sm:text-sm sm:leading-6"
                      >
                        <option>0</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </select>
                    </div>
                  </td>
                  <td className="border">
                    <div className="mt-2">
                      <input
                        name="eduComment"
                        type="text"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="border">Relevant Experience</td>
                  <td className="border">
                    <div className="mt-2">
                      <select
                        name="expScore"
                        className="px-3 w-full py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 sm:text-sm sm:leading-6"
                      >
                        <option>0</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </select>
                    </div>
                  </td>
                  <td className="border">
                    <div className="mt-2">
                      <select
                        name="expExpected"
                        className="px-3 w-full py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 sm:text-sm sm:leading-6"
                      >
                        <option>0</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </select>
                    </div>
                  </td>
                  <td className="border">
                    <div className="mt-2">
                      <input
                        name="expComment"
                        type="text"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="border">Architecture & Systems Design</td>
                  <td className="border">
                    <div className="mt-2">
                      <select
                        name="archiScore"
                        className="px-3 w-full py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 sm:text-sm sm:leading-6"
                      >
                        <option>0</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </select>
                    </div>
                  </td>
                  <td className="border">
                    <div className="mt-2">
                      <select
                        name="archiExpected"
                        className="px-3 w-full py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 sm:text-sm sm:leading-6"
                      >
                        <option>0</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </select>
                    </div>
                  </td>
                  <td className="border">
                    <div className="mt-2">
                      <input
                        name="archiComment"
                        type="text"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="border">
                    Software Development & Programming, Methodologies & tools,
                    Technical Expertise
                  </td>
                  <td className="border">
                    <div className="mt-2">
                      <select
                        name="devScore"
                        className="px-3 w-full py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 sm:text-sm sm:leading-6"
                      >
                        <option>0</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </select>
                    </div>
                  </td>
                  <td className="border">
                    <div className="mt-2">
                      <select
                        name="devExpected"
                        className="px-3 w-full py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 sm:text-sm sm:leading-6"
                      >
                        <option>0</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </select>
                    </div>
                  </td>
                  <td className="border">
                    <div className="mt-2">
                      <input
                        name="devComment"
                        type="text"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="border">Conceptual Understanding</td>
                  <td className="border">
                    <div className="mt-2">
                      <select
                        name="conceptScore"
                        className="px-3 w-full py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 sm:text-sm sm:leading-6"
                      >
                        <option>0</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </select>
                    </div>
                  </td>
                  <td className="border">
                    <div className="mt-2">
                      <select
                        name="conceptExpected"
                        className="px-3 w-full py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 sm:text-sm sm:leading-6"
                      >
                        <option>0</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </select>
                    </div>
                  </td>
                  <td className="border">
                    <div className="mt-2">
                      <input
                        name="conceptComment"
                        type="text"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="border">
                    Analytical & Problem Solving Skills
                  </td>
                  <td className="border">
                    <div className="mt-2">
                      <select
                        name="ssScore"
                        className="px-3 w-full py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 sm:text-sm sm:leading-6"
                      >
                        <option>0</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </select>
                    </div>
                  </td>
                  <td className="border">
                    <div className="mt-2">
                      <select
                        name="ssExpected"
                        className="px-3 w-full py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 sm:text-sm sm:leading-6"
                      >
                        <option>0</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </select>
                    </div>
                  </td>
                  <td className="border">
                    <div className="mt-2">
                      <input
                        name="ssComment"
                        type="text"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="border">Team Work</td>
                  <td className="border">
                    <div className="mt-2">
                      <select
                        name="teamScore"
                        className="px-3 w-full py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 sm:text-sm sm:leading-6"
                      >
                        <option>0</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </select>
                    </div>
                  </td>
                  <td className="border">
                    <div className="mt-2">
                      <select
                        name="teamExpected"
                        className="px-3 w-full py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 sm:text-sm sm:leading-6"
                      >
                        <option>0</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </select>
                    </div>
                  </td>
                  <td className="border">
                    <div className="mt-2">
                      <input
                        name="teamComment"
                        type="text"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="border">Leadership</td>
                  <td className="border">
                    <div className="mt-2">
                      <select
                        name="leadScore"
                        className="px-3 w-full py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 sm:text-sm sm:leading-6"
                      >
                        <option>0</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </select>
                    </div>
                  </td>
                  <td className="border">
                    <div className="mt-2">
                      <select
                        name="leadExpected"
                        className="px-3 w-full py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 sm:text-sm sm:leading-6"
                      >
                        <option>0</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </select>
                    </div>
                  </td>
                  <td className="border">
                    <div className="mt-2">
                      <input
                        name="leadComment"
                        type="text"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="border">Growth Potential & Achievements</td>
                  <td className="border">
                    <div className="mt-2">
                      <select
                        name="achScore"
                        className="px-3 w-full py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 sm:text-sm sm:leading-6"
                      >
                        <option>0</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </select>
                    </div>
                  </td>
                  <td className="border">
                    <div className="mt-2">
                      <select
                        name="achExpected"
                        className="px-3 w-full py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 sm:text-sm sm:leading-6"
                      >
                        <option>0</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </select>
                    </div>
                  </td>
                  <td className="border">
                    <div className="mt-2">
                      <input
                        name="achComment"
                        type="text"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="border">Communication Skills</td>
                  <td className="border">
                    <div className="mt-2">
                      <select
                        name="cmmScore"
                        className="px-3 w-full py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 sm:text-sm sm:leading-6"
                      >
                        <option>0</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </select>
                    </div>
                  </td>
                  <td className="border">
                    <div className="mt-2">
                      <select
                        name="cmmExpected"
                        className="px-3 w-full py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 sm:text-sm sm:leading-6"
                      >
                        <option>0</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </select>
                    </div>
                  </td>
                  <td className="border">
                    <div className="mt-2">
                      <input
                        name="cmmComment"
                        type="text"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
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

export default AddFeedback;
