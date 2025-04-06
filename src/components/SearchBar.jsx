import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./SearchBar.css";

const SearchBar = () => {
    const [search, setSearch] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [isFocused, setIsFocused] = useState(false);
    const navigate = useNavigate();

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
        navigate(`/product/${search}`);
    };

    const handleSelect = (name) => {
        setSearch(name); 
        setSuggestions([]);
        setIsFocused(false);
    };

    const handleBlur = () => {
        setTimeout(() => {
            setIsFocused(false);
        }, 200);
    };

    return (
        <div className="search-container">
          <input
            type="text"
            className={`search-input ${isFocused ? 'expanded' : ''}`}
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={handleBlur}
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
