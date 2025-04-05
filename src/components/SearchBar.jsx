import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./SearchBar.css";

const SearchBar = () => {
    const [search, setSearch] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        if (search.length > 1) {
          axios.get(`http://localhost/connect.php?search=${search}`)
            .then(res => {
              setSuggestions(res.data);
            })
            .catch(err => console.error(err));
        } else {
          setSuggestions([]);
        }
    }, [search]);

    const handleSearch = () => {
        console.log("Search for:", search);
        // You can implement search result page navigation here
    };

    const handleSelect = (name) => {
        setSearch(name);  // Auto-fill the search input
        setSuggestions([]);  // Hide the suggestions after selection
        setIsFocused(false);  // Close the search input expansion
    };

    const handleBlur = () => {
        // Delay the hiding of suggestions to allow clicking on the autocomplete list
        setTimeout(() => {
            setIsFocused(false);
        }, 200); // Delay to ensure click event happens first
    };

    return (
        <div className="search-container">
          <input
            type="text"
            className={`search-input ${isFocused ? 'expanded' : ''}`}  // Add dynamic class for expanded state
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}  // Update state as user types
            onFocus={() => setIsFocused(true)}  // Expand input field when focused
            onBlur={handleBlur}  // Collapse input field when not focused with a small delay to allow click
          />
          <button onClick={handleSearch}>Search</button>

          {suggestions.length > 0 && isFocused && (
            <ul className="autocomplete-list">
              {suggestions.map(item => (
                <li key={item.name} onClick={() => handleSelect(item.name)}>
                  {item.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      );
};

export default SearchBar;
