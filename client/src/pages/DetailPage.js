import React, { useState, useCallback, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';
import { Loader } from '../Components/Loader';
import { LinkCard } from '../Components/LinkCard';

export const DetailPage = () => {
  const { loading, request } = useHttp();
  const { token } = useContext(AuthContext);
  const [link, setLink] = useState(null);
  const linkId = useParams().id;

  const getLink = useCallback(async () => {
    try {
      const fetched = await request(`/api/link/${linkId}`, 'GET', null, {
        Authorization: `Bearer ${token}`
      });
      setLink(fetched);
    } catch (e) {}
  }, [token, linkId, request]);

  useEffect(() => {
    getLink();
  }, [getLink]);

  if (loading) {
    return <Loader />;
  }

  return <>{!loading && link && <LinkCard link={link} />}</>;
};
