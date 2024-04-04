import React from 'react';
import Table from '../../components/FeedbackViewTable';

const ViewFeedback = () => {
  // Sample data
  const columns = ['Name', 'Age', 'Email'];
  const data = [
    { Name: 'John Doe', Age: 30, Email: 'john@example.com' },
    { Name: 'Jane Smith', Age: 25, Email: 'jane@example.com' },
    // Add more rows as needed
  ];

  return (
    <div>
      <h1>Example Page</h1>
      <Table columns={columns} data={data} />
    </div>
  );
};

export default ViewFeedback;
