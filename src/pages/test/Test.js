import React, { useEffect, useState } from 'react';

import api from '../../utils/connections/api'; // 헬퍼 함수

const Test = () => {
  const [tests, setTests] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTests = async () => {
      try {
        // const response = await axios.get('http://localhost:5000/tests');
        const response = await api.get('/tests');
        setTests(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchTests();
  }, []);

  return (
    <div>
      <h1>Tests</h1>
      {error ? (
        <p>Error fetching tests: {error}</p>
      ) : (
        <ul>
          {tests.map((test) => (
            <li key={test.id}>
              {test.title}: {test.content}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Test;
