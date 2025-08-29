import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchFiltersProps {
  onSearch: (query: string) => void;
  onFilterChange: (filter: string) => void;
  activeFilter: string;
}

export function SearchFilters({
  onSearch,
  onFilterChange,
  activeFilter,
}: SearchFiltersProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filters = [
    { id: "all", label: "All" },
    { id: "project", label: "Projects" },
    { id: "blog", label: "Blog" },
    { id: "react", label: "React" },
    { id: "javascript", label: "JavaScript" },
    { id: "design", label: "Design" },
  ];

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    onSearch(value);
  };

  return (
    <div className="mb-8 space-y-4">
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
        <div className="relative flex-1 max-w-md mx-auto lg:mx-0">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="Search projects and posts..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10"
            data-testid="input-search"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <Button
              key={filter.id}
              variant={activeFilter === filter.id ? "default" : "secondary"}
              size="sm"
              onClick={() => onFilterChange(filter.id)}
              data-testid={`button-filter-${filter.id}`}
            >
              {filter.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
