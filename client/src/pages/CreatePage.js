import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';

export const CreatePage = () => {
  const history = useHistory();
  const { request } = useHttp();
  const [link, setLink] = useState('');
  const auth = useContext(AuthContext);

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  const pressHandler = async e => {
    if (e.key === 'Enter') {
      try {
        const data = await request(
          '/api/link/generate',
          'POST',
          {
            from: link
          },
          { Authorization: `Bearer ${auth.token}` }
        );
        history.push(`/detail/${data.link._id}`);
      } catch (e) {}
    }
  };
  return (
    <div className="row">
      <div className="col s6 offset-s3" style={{ paddingTop: '2rem' }}>
        <div className="input-field">
          <input
            placeholder="Вставте ссылку"
            id="link"
            type="text"
            value={link}
            onChange={e => setLink(e.target.value)}
            onKeyPress={pressHandler}
          />
          <label htmlFor="link">Ввыдите ссылку</label>
        </div>
      </div>
    </div>
  );
};
