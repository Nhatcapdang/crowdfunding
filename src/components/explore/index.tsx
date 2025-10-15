'use client';
import { useDebouncedCallback } from '@/hooks';
import { useCampaignsStore } from '@/providers/campaigns-store-provider';
import { LayoutGrid, MapPin, Newspaper, Search } from 'lucide-react';
import { useEffect, useState, useRef, useCallback } from 'react';
import Gallery from './gallery';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '../ui/input-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

function Explore() {
  const { setSearch, search, _hasHydrated } = useCampaignsStore(state => state);
  const [searchInput, setSearchInput] = useState<string>(search);
  const isInitialized = useRef(false);

  useEffect(() => {
    if (_hasHydrated && !isInitialized.current) {
      setSearchInput(search);
      isInitialized.current = true;
    }
  }, [_hasHydrated, search]);

  const debouncedSearch = useDebouncedCallback((query: string) => {
    setSearch(query);
  }, 300);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.currentTarget.value;
      setSearchInput(value);
      debouncedSearch(value);
    },
    [setSearchInput, debouncedSearch]
  );

  return (
    <div className="max-w-laptop mx-auto">
      <Tabs defaultValue="account" className="gap-0">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 py-4 sm:h-16">
            <TabsList className="gap-2 sm:gap-[11px] w-full sm:w-auto">
              <TabsTrigger
                value="account"
                className="flex-1 sm:flex-initial text-xs sm:text-sm"
              >
                <LayoutGrid
                  strokeWidth={2}
                  className="w-4.5 h-4.5 sm:w-6 sm:h-6"
                />
                <span className="hidden sm:inline">Gallery</span>
              </TabsTrigger>
              <TabsTrigger
                value="password"
                className="flex-1 sm:flex-initial text-xs sm:text-sm"
              >
                <MapPin strokeWidth={2} className="w-4.5 h-4.5 sm:w-6 sm:h-6" />
                <span className="hidden sm:inline">Map</span>
              </TabsTrigger>
              <TabsTrigger
                value="test"
                className="flex-1 sm:flex-initial text-xs sm:text-sm"
              >
                <Newspaper
                  strokeWidth={2}
                  className="w-4.5 h-4.5 sm:w-6 sm:h-6"
                />
                <span className="hidden sm:inline">Feed</span>
              </TabsTrigger>
              <TabsTrigger
                value="passwortest2d"
                disabled
                className="hidden sm:flex"
              >
                Password
              </TabsTrigger>
            </TabsList>
            <InputGroup className="h-10 sm:h-11 border-slate-200 w-full sm:w-64 lg:w-80">
              <InputGroupInput
                placeholder="Search"
                className="pr-3 sm:pr-3.5 text-sm sm:text-base"
                onChange={handleChange}
                value={searchInput}
              />
              <InputGroupAddon className="pl-3 sm:pl-3.5">
                <Search
                  strokeWidth={2}
                  className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500"
                />
              </InputGroupAddon>
            </InputGroup>
          </div>
        </div>
        <div className="border-b border-slate-200" />
        <TabsContent value="account">
          <Gallery />
        </TabsContent>
        <TabsContent value="password">adasa</TabsContent>
        <TabsContent value="test">dasdas</TabsContent>
      </Tabs>
    </div>
  );
}
export default Explore;
