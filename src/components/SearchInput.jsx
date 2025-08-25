import { useState } from 'react';
import { Search, X } from 'lucide-react';

const SearchInput = ({ onSearch, placeholder = 'Buscar...' }) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setIsSearching(true);
      onSearch(query.trim())
        .finally(() => setIsSearching(false));
    }
  };

  return (
    <form 
      onSubmit={handleSearch}
      className={`relative flex items-center transition-all duration-300 ${isFocused ? 'ring-2 ring-teal-300' : ''}`}
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        aria-label="Campo de busca"
        className="w-full py-2 pl-10 pr-4 border rounded-lg focus:outline-none"
      />
      <div className="absolute inset-y-0 left-0 flex items-center pl-3">
        {isSearching ? (
          <div className="w-4 h-4 border-t-2 border-teal-500 rounded-full animate-spin" />
        ) : (
          <Search size={18} className="text-gray-400" />
        )}
      </div>
      {query && (
        <button
          type="button"
          onClick={() => setQuery('')}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
          aria-label="Limpar busca"
        >
          <X size={18} />
        </button>
      )}
    </form>
  );
};

export default SearchInput;