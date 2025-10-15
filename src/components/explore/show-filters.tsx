'use client';

import { useCallback, useState } from 'react';
import { ListFilter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCampaignsStore } from '@/providers/campaigns-store-provider';

export default function ShowFilters() {
  const [open, setOpen] = useState(false);

  const filters = useCampaignsStore(state => state.filters);
  const setFilters = useCampaignsStore(state => state.setFilters);
  const [localFilters, setLocalFilters] = useState(filters);

  const handleApplyFilters = useCallback(() => {
    setFilters(localFilters);
  }, [localFilters, setFilters]);

  const handleResetFilters = useCallback(() => {
    setFilters({ priceSort: undefined, dateSort: undefined });
    setLocalFilters({ priceSort: undefined, dateSort: undefined });
  }, [setFilters]);

  const handlePriceSortChange = (value: 'asc' | 'desc' | 'default') => {
    if (value === 'default') {
      setLocalFilters({ priceSort: undefined });
    } else {
      setLocalFilters({ priceSort: value });
    }
  };

  const handleDateSortChange = (value: 'asc' | 'desc' | 'default') => {
    if (value === 'default') {
      setLocalFilters({ dateSort: undefined });
    } else {
      setLocalFilters({ dateSort: value });
    }
  };

  const getPriceSortValue = () => {
    if (localFilters.priceSort === 'asc') return 'asc';
    if (localFilters.priceSort === 'desc') return 'desc';
    return 'default';
  };

  const getDateSortValue = () => {
    if (localFilters.dateSort === 'asc') return 'asc';
    if (localFilters.dateSort === 'desc') return 'desc';
    return 'default';
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button size="lg">
          <ListFilter size={16} />
          Show filters
        </Button>
      </SheetTrigger>
      <SheetContent className="p-4">
        <SheetHeader className="p-0">
          <SheetTitle>Filters</SheetTitle>
          <SheetDescription>
            Customize your campaign search with sorting options.
          </SheetDescription>
        </SheetHeader>

        <div className="grid gap-6 py-6">
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Sort by Price
            </label>
            <Select
              value={getPriceSortValue()}
              onValueChange={handlePriceSortChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select price sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="asc">Price: Low to High</SelectItem>
                <SelectItem value="desc">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Sort by Date
            </label>
            <Select
              value={getDateSortValue()}
              onValueChange={handleDateSortChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select date sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="asc">Date: Oldest First</SelectItem>
                <SelectItem value="desc">Date: Newest First</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="lg"
              className="w-full"
              onClick={handleApplyFilters}
            >
              Apply
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="w-full"
              onClick={handleResetFilters}
            >
              Reset
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
