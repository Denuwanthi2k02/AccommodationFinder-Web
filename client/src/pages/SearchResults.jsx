import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAppContext } from "../contex/AppContext";
import AccommodationCards from "../components/AccommodationCards";
import "./SearchResults.css";
import Title from "../components/Title";

const SearchResults = () => {
  const { axios: axiosInstance } = useAppContext();
  const location = useLocation(); // get URL query
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        // Read query params from URL
        const searchParams = new URLSearchParams(location.search);
        const distance = searchParams.get("distance") || "";
        const monthlyRent = searchParams.get("monthlyRent") || "";
        const numStudents = searchParams.get("numStudents") || "";

        // Call backend search API
        const { data } = await axiosInstance.get(
          `/api/user/search?distance=${distance}&monthlyRent=${monthlyRent}&numStudents=${numStudents}`
        );

        if (data.success) {
          setResults(data.results);
        } else {
          setResults([]);
        }
      } catch (error) {
        console.error(error.message);
        setResults([]);
      }
    };

    fetchResults();
  }, [location.search, axiosInstance]); // rerun if URL changes

  return (
    <div className="search-results-page">
      {/* <h2 className="results-title"><strong>Search Results</strong></h2> */}
      <Title title="Search Results"/>
      {results.length === 0 ? (
        <p className="no-results">No accommodations found.</p>
      ) : (
        <div className="results-grid">
          {results.map((annex) => (
            <AccommodationCards key={annex._id} annex={annex} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
