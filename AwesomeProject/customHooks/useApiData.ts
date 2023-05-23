import axios from 'axios';
import {useEffect, useState} from 'react';

export const useApiData = (url: string) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<any>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://northwind.vercel.app/api/' + url,
        );
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return {data, loading, error};
};
