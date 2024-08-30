import { useState } from "react";

const useFetchCareerData = () => {
  const [careerData, setCareerData] = useState([]);
  const [careerDataLoading, setCareerDataLoading] = useState(false);
  const [careerDataError, setCareerDataError] = useState(null);

  const fetchCareerData = async (inputValue, selectedCareer) => {
    setCareerDataLoading(true);
    setCareerDataError(null);
    try {
      const response = await fetch(
        `/api/universidades/${inputValue.toUpperCase().replace(/ /g, "_")}?carrera=${selectedCareer}`,
      );

      if (!response.ok) {
        throw new Error(
          `careerDataError: ${response.status} ${response.statusText}`,
        );
      }

      const careerData = await response.json();
      setCareerData(careerData);

      return careerData;
    } catch (error) {
      setCareerDataError(error.message);
    } finally {
      setCareerDataLoading(false);
    }
  };

  return {
    careerData,
    setCareerData,
    careerDataLoading,
    careerDataError,
    fetchCareerData,
  };
};

export default useFetchCareerData;
