import React from "react";
import logo from '../assets/logo.jpg';

export default function UpdateVacancy() {
  return (
    <>
      <div className="bg-background">
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
           
            <img className="mx-auto h-10 w-auto" src={logo} alt="Logo" />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
              Update a vacancy
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" action="#" method="POST">
              <div>
                <label htmlFor="Job Role" className="block text-sm font-medium leading-6 text-white">
                 Job Role
                </label>
                <div className="mt-2">
                  <input
                    id="jobrole"
                    name="jobrole"
                    type="text"
                    autoComplete="given-name"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="jobrefcode" className="block text-sm font-medium leading-6 text-white">
                 JobRef Code
                </label>
                <div className="mt-2">
                  <input
                    id="jobrefcode"
                    name="jobrefcode"
                    type="text"
                    autoComplete="family-name"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="openings" className="block text-sm font-medium leading-6 text-white">
                  Openings
                </label>
                <div className="mt-2">
                  <input
                    id="openings"
                    name="openings"
                    type="text"
                    autoComplete="openings"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="status" className="block text-sm font-medium leading-6 text-white">
                  Status
                </label>
                <div className="mt-2">
                  <input
                    id="status"
                    name="status"
                    type="text"
                    autoComplete="status"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="reason" className="block text-sm font-medium leading-6 text-white">
                  Reason
                </label>
                <div className="mt-2">
                  <textarea
                    id="reason"
                    name="reason"
                    type="text"
                    autoComplete="reason"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-button px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-button focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Update Vacancy
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
