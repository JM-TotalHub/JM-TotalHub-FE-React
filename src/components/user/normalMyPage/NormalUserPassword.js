import React, { useEffect, useState } from 'react';
import api from '../../../utils/connections/api';

const NormalUserPassword = () => {
  // const dispatch = useDispatch();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {}, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      setError('새 비밀번호가 일치하지 않습니다.');
    }

    try {
      const response = await api.put('auth/password', {
        currentPassword: String(currentPassword),
        newPassword: String(newPassword),
      });

      setSuccess('비밀번호가 변경되었습니다.');
      setError(null);
    } catch (error) {
      const errorType = error.response.data.errorType;

      setSuccess(null);
      if (errorType === 'INVALID_CURRENT_PASSWORD') {
        setError('기존 비밀번호와 틀렸습니다.');
      } else if (errorType === 'SAME_AS_CURRENT_PASSWORD') {
        setError('새 비밀번호가 기존 비밀번호와 같습니다.');
      }
    }
  };

  return (
    <div>
      <h3>비밀번호 변경</h3>
      <form onSubmit={handleSubmit}>
        <label>
          현재 비밀번호:
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          ></input>
        </label>
        <label>
          새 비밀번호:
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          ></input>
        </label>
        <label>
          새 비밀번호 확인:
          <input
            type="password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            required
          ></input>
        </label>
        <button type="submit">비밀번호 변경</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  );
};

export default NormalUserPassword;
