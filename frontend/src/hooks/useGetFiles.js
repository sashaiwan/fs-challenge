import { useEffect, useState } from "react";
import { apiService } from "../services/apiService";

/**
 * Use to fetch files data from API and manage error messages and loading states.
 * @returns {{ filesData: Array, isLoading: boolean, isError: message | null }}
 */
const useGetFiles = () => {
  const [filesData, setFilesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const callService = async () => {
      setIsLoading(true);
      try {
        const response = await apiService.getFiles();
        setFilesData(response);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    callService();
  }, []);

  return { filesData, isLoading, error };
};

export default useGetFiles;
