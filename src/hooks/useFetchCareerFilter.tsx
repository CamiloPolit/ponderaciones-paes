import { useState } from "react";

const useFetchCareerFilter = () => {
  const [careerSearchData, setCareerSearchData] = useState([]);
  const [careerSearchLoading, setCareerSearchLoading] = useState(false);
  const [careerSearchError, setCareerSearchError] = useState(null);

  const fetchCareerSearchData = async (careerFilterInputValue) => {
    setCareerSearchLoading(true);
    setCareerSearchError(null);
    try {
      const response = await fetch(
        `/api/filtros/carreras2/${careerFilterInputValue}`,
      );

      if (!response.ok) {
        throw new Error(
          `careerSearchError: ${response.status} ${response.statusText}`,
        );
      }

      const data = await response.json();
      setCareerSearchData(data);

      return data;
    } catch (error) {
      setCareerSearchError(error.message);
    } finally {
      setCareerSearchLoading(false);
    }
  };

  return {
    careerSearchData,
    setCareerSearchData,
    careerSearchLoading,
    careerSearchError,
    fetchCareerSearchData,
  };
};

export default useFetchCareerFilter;
