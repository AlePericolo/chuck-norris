import { useEffect, useState } from 'react';
import axios from 'axios';

const { endpoint } = window;

const useApi = (method, url, payload = {}, opts = {}) => {
  const [func, response] = useLazyApi(method, url, payload);

  useEffect(() => {
    (async () => {
      await func();
    })();
  }, []);

  return response;
};

const useLazyApi = (method, url, opts = {}) => {
  const [error, setError] = useState(null);
  const [event, setEvent] = useState({
    loading: false,
    data: null
  });

  const func = async (payload = {}) => {
    try {
      setEvent({
        loading: true,
        data: null
      });

      const response = await axios({
        baseURL: endpoint.api,
        method,
        url,
        data: payload
      });

      setEvent({
        loading: false,
        data: response.data
      });
    } catch (e) {
      setError(e);
    }
  };

  return [
    func,
    {
      error,
      loading: event.loading,
      data: event.data
    }
  ];
};

export { useApi, useLazyApi, endpoint };
