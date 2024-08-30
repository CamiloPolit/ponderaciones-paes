import { useState } from "react";

const useFetchUniversityData = () => {
  const [universityData, setUniversityData] = useState([]);
  const [universityDataLoading, setUniversityDataLoading] = useState(false);
  const [universityDataError, setUniversityDataError] = useState(null);

  const fetchUniversityData = async (inputValue, searchType) => {
    setUniversityDataLoading(true);
    setUniversityDataError(null);
    try {
      let response;

      if (searchType === "Búsqueda por Universidad y Carrera") {
        response = await fetch(
          `/api/universidades/${inputValue.toUpperCase().replace(/ /g, "_")}`,
        );
      } else {
        response = await fetch(
          `/api/filtros/carrera/${inputValue.toUpperCase().replace(/ /g, "_")}`,
        );
      }

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setUniversityData(data);

      return data;
    } catch (error) {
      setUniversityDataError(error.message);
    } finally {
      setUniversityDataLoading(false);
    }
  };

  return {
    universityData,
    setUniversityData,
    universityDataLoading,
    universityDataError,
    fetchUniversityData,
  };
};

export default useFetchUniversityData;
