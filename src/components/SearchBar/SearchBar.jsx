import React, { useState, useEffect, useCallback, useRef } from 'react';
import { TextField, InputAdornment, IconButton, Paper, List, ListItem, ListItemText, ClickAwayListener } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import debounce from 'lodash.debounce';
import './SearchBar.css';

const SearchBar = ({ onSearch, searchResults = [], onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openDropdown, setOpenDropdown] = useState(false);
  const containerRef = useRef(null);

  const debouncedSearch = useCallback(
    debounce((term) => {
      if (onSearch) {
        onSearch(term);
      }
    }, 500),
    [onSearch]
  );

  useEffect(() => {
    debouncedSearch(searchTerm);
    if (searchTerm) {
      setOpenDropdown(true);
    } else {
      setOpenDropdown(false);
    }
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchTerm, debouncedSearch]);

  const handleClear = () => {
    setSearchTerm('');
    if (onSearch) {
      onSearch('');
    }
    setOpenDropdown(false);
  };

  const handleSearchClick = () => {
    if (onSearch) {
      onSearch(searchTerm);
    }
    if (searchTerm) {
      setOpenDropdown(true);
    }
  };

  const handleSelect = (movie) => {
    if (onSelect) {
      onSelect(movie);
    }
    setSearchTerm(movie.title);
    setOpenDropdown(false);
  };

  const handleClickAway = () => {
    setOpenDropdown(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div ref={containerRef} style={{ position: 'relative', width: '100%' }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search for movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: searchTerm && (
              <InputAdornment position="end" style={{ display: 'flex', gap: '4px' }}>
                <IconButton onClick={handleClear} aria-label="clear search">
                  <ClearIcon />
                </IconButton>
                <IconButton onClick={handleSearchClick} aria-label="search">
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ mb: 3 }}
          onFocus={() => {
            if (searchTerm) {
              setOpenDropdown(true);
            }
          }}
        />
        {openDropdown && searchResults.length > 0 && (
          <Paper
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              zIndex: 10,
              maxHeight: 300,
              overflowY: 'auto',
            }}
          >
            <List>
              {searchResults.map((movie) => (
                <ListItem button key={movie.id} onClick={() => handleSelect(movie)}>
                  <ListItemText primary={movie.title} secondary={movie.release_date ? movie.release_date.substring(0, 4) : ''} />
                </ListItem>
              ))}
            </List>
          </Paper>
        )}
      </div>
    </ClickAwayListener>
  );
};

export default SearchBar;
