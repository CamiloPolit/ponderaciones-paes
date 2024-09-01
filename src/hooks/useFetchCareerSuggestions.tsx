import { useState } from "react";

const useFetchCareerSuggestions = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCareerSuggestions = async (inputValue) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/filtros/carreras/${inputValue}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      setSuggestions(data);
      return data;
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    suggestions,
    loading,
    error,
    fetchCareerSuggestions,
  };
};

export default useFetchCareerSuggestions;
