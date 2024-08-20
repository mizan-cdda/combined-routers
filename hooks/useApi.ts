import { useEffect, useState } from "react";
import { AxiosResponse, AxiosError, AxiosRequestConfig } from "axios";
import Axios from "@/components/axios";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

interface ApiHookResult<T> {
  data: T | null;
  error: AxiosError | null;
  loading: boolean;
  refetchDataHandler: () => void;
}

export const useApi = <T>(
  method: HttpMethod,
  url: string,
  initialData?: T | null | undefined | any,
  config?: AxiosRequestConfig
): ApiHookResult<T> => {
  const [data, setData] = useState<T | null>(initialData);
  const [error, setError] = useState<AxiosError | null>(null);
  const [loading, setLoading] = useState(true);

  const [refetchData, setRefetchData] = useState(0);

  const refetchDataHandler = () => {
    setRefetchData((prev) => prev + 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.request<T>({
          method,
          url,
          ...config,
        });
        setData(response.data);
      } catch (error: any) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [method, url, config, refetchData]);

  return { data, error, loading, refetchDataHandler };
};
