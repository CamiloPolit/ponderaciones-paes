import { useState } from "react";

const useFetchCareerPlace = () => {
  const [careerPlace, setCareerPlace] = useState(null);
  const [placeLoading, setPlaceLoading] = useState(false);
  const [placeError, setPlaceError] = useState(null);

  const fetchCareerPlace = async (codigoCarrera, valorDecimal) => {
    setPlaceLoading(true);
    setPlaceError(null);
    try {
      const response = await fetch(
        `/api/lugar/${codigoCarrera}?valor_decimal=${valorDecimal}`,
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      setCareerPlace(data.length > 0 ? data[0].cantidad_mayores : 0);
      return data;
    } catch (error) {
      setPlaceError(error.message);
    } finally {
      setPlaceLoading(false);
    }
  };

  return {
    careerPlace,
    setCareerPlace,
    placeLoading,
    placeError,
    fetchCareerPlace,
  };
};

export default useFetchCareerPlace;
