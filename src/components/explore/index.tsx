'use client';
import { useDebouncedCallback } from '@/hooks';
import { useCampaignsStore } from '@/providers/campaigns-store-provider';
import { LayoutGrid, MapPin, Newspaper, Search } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setSearchInput(value);
    handleSearch(value);
  };

  const handleSearch = useDebouncedCallback((query: string) => {
    setSearch(query);
  }, 300);

  return (
    <div className="max-w-laptop mx-auto">
      <Tabs defaultValue="account" className="gap-0">
        <div className="max-w-xl mx-auto px-8 w-full">
          <div className=" flex items-center justify-between  h-16">
            <TabsList className="gap-[11px]">
              <TabsTrigger value="account">
                <LayoutGrid strokeWidth={2} size={24} />
                Gallery
              </TabsTrigger>
              <TabsTrigger value="password">
                <MapPin strokeWidth={2} size={24} />
                Map
              </TabsTrigger>
              <TabsTrigger value="test">
                <Newspaper strokeWidth={2} size={24} />
                Feed
              </TabsTrigger>

              <TabsTrigger value="passwortest2d" disabled>
                Password
              </TabsTrigger>
            </TabsList>
            <InputGroup className="h-11 border-slate-200 w-80">
              <InputGroupInput
                placeholder="Search"
                className="pr-3.5"
                onChange={handleChange}
                value={searchInput}
              />
              <InputGroupAddon className="pl-3.5">
                <Search size={20} strokeWidth={2} className="text-gray-500" />
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
