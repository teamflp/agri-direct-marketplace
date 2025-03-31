
import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from 'react-router-dom';

interface HeaderSearchProps {
  placeholder: string;
}

const HeaderSearch = ({ placeholder }: HeaderSearchProps) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchOpen(false);
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  return (
    <div className="relative">
      {searchOpen ? (
        <form onSubmit={handleSearch} className="absolute right-0 top-[-5px] flex items-center">
          <div className="relative flex items-center bg-white rounded-md shadow-md overflow-hidden transition-all duration-300 animate-fade-in w-screen max-w-xs">
            <Input
              type="text"
              placeholder={placeholder}
              className="pl-3 pr-10 py-2 w-full text-gray-800 border-0 focus:ring-0 focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
            <Button 
              type="submit" 
              className="absolute right-0 top-0 h-full rounded-l-none bg-agrimarket-orange hover:bg-agrimarket-brown transition-colors"
            >
              <Search className="h-5 w-5" />
            </Button>
          </div>
          <Button 
            type="button"
            variant="ghost" 
            size="icon" 
            className="ml-2 text-gray-600 hover:bg-gray-100 transition-colors"
            onClick={() => setSearchOpen(false)}
            aria-label="Fermer la recherche"
          >
            <X className="h-5 w-5" />
          </Button>
        </form>
      ) : (
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-gray-600 hover:bg-gray-100 transition-colors"
          onClick={() => setSearchOpen(true)}
          aria-label="Rechercher"
        >
          <Search className="h-5 w-5" />
        </Button>
      )}
    </div>
  );
};

export default HeaderSearch;
