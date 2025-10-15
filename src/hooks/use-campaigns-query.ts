'use client';

import { useQuery } from '@tanstack/react-query';
import { useCampaignsStore } from '@/providers/campaigns-store-provider';
import { useEffect } from 'react';
import axios from 'axios';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface UseCampaignsQueryProps {
  location?: string;
}

export function useCampaignsQuery({ location }: UseCampaignsQueryProps = {}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const {
    search,
    type,
    filters,
    currentPage,
    pageSize,
    setCampaigns,
    setPaginationData,
    setIsLoading,
    setIsFetching,
    setCurrentPage,
  } = useCampaignsStore(state => state);

  // Sync URL params on mount
  useEffect(() => {
    const pageFromUrl = searchParams.get('page');
    if (pageFromUrl) {
      const parsedPage = parseInt(pageFromUrl, 10);
      if (!isNaN(parsedPage) && parsedPage >= 1) {
        setCurrentPage(parsedPage);
      }
    }
  }, [searchParams, setCurrentPage]);

  // Fetch campaigns with useQuery
  const query = useQuery<CampaignsResponse>({
    queryKey: [
      'use-campaigns-query',
      type,
      location,
      search,
      filters,
      currentPage,
      pageSize,
    ],
    queryFn: async () => {
      const res = await axios.get<CampaignsResponse>('/api/campaigns', {
        params: {
          page: currentPage,
          pageSize,
          type: type === 'all-views' ? undefined : type,
          location,
          search: search === '' ? undefined : search,
          priceSort: filters.priceSort,
          dateSort: filters.dateSort,
        },
      });
      return res.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Sync loading states to store
  useEffect(() => {
    setIsLoading(query.isLoading);
  }, [query.isLoading, setIsLoading]);

  useEffect(() => {
    setIsFetching(query.isFetching);
  }, [query.isFetching, setIsFetching]);

  // Sync data to store
  useEffect(() => {
    if (query.data) {
      setCampaigns(query.data.campaigns);
      setPaginationData({
        totalPages: Math.ceil(query.data.total / query.data.pageSize),
        totalItems: query.data.total,
        currentPage: query.data.page,
      });
    }
  }, [query.data, setCampaigns, setPaginationData]);

  // Update URL when page changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', currentPage.toString());
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }, [currentPage, pathname, router, searchParams]);

  return query;
}
