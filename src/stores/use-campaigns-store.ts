import { createStore } from 'zustand/vanilla';
import { persist } from 'zustand/middleware';
import { pick } from 'lodash';
import { generatePageNumbers } from '@/lib/generatePageNumbers';

export type CampaignsState = {
  campaigns: Campaign[];
  search: string;
  type: 'all-views' | CampaignType;
  layoutView: ('map' | 'list')[];
  filters: {
    priceSort?: 'asc' | 'desc';
    dateSort?: 'asc' | 'desc';
  };
  _hasHydrated: boolean;
  // Pagination state
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  isLoading: boolean;
  isFetching: boolean;
  canGoPrevious: boolean;
  canGoNext: boolean;
  isFirstPage: boolean;
  isLastPage: boolean;
  pageNumbers: (number | 'ellipsis')[];
};

export type CampaignsActions = {
  setSearch: (search: string) => void;
  setLayoutView: (layoutView: ('map' | 'list')[]) => void;
  setType: (type: 'all-views' | CampaignType) => void;
  setFilters: (filters: {
    priceSort?: 'asc' | 'desc';
    dateSort?: 'asc' | 'desc';
  }) => void;
  _setHasHydrated: (hasHydrated: boolean) => void;
  setCampaigns: (campaigns: Campaign[]) => void;
  // Pagination actions
  setCurrentPage: (page: number) => void;
  nextPage: () => void;
  previousPage: () => void;
  firstPage: () => void;
  lastPage: () => void;
  setPageSize: (size: number) => void;
  setPaginationData: (data: {
    totalPages: number;
    totalItems: number;
    currentPage: number;
  }) => void;
  setIsLoading: (isLoading: boolean) => void;
  setIsFetching: (isFetching: boolean) => void;
  toggleLike: (id: string) => void;
};

export type CampaignsStore = CampaignsState & CampaignsActions;

export const initCampaignsStore = (): CampaignsState => {
  return {
    campaigns: [],
    search: '',
    layoutView: [],
    type: 'all-views',
    filters: {
      priceSort: undefined,
      dateSort: undefined,
    },
    _hasHydrated: false,
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    pageSize: 9,
    isLoading: false,
    isFetching: false,
    canGoPrevious: false,
    canGoNext: false,
    isFirstPage: false,
    isLastPage: false,
    pageNumbers: [],
  };
};

export const defaultInitStateCampaigns: CampaignsState = {
  campaigns: [],
  search: '',
  layoutView: [],
  type: 'all-views',
  filters: {
    priceSort: undefined,
    dateSort: undefined,
  },
  _hasHydrated: false,
  currentPage: 1,
  totalPages: 1,
  totalItems: 0,
  pageSize: 9,
  isLoading: false,
  isFetching: false,
  canGoPrevious: false,
  canGoNext: false,
  isFirstPage: false,
  isLastPage: false,
  pageNumbers: [],
};

export const createCampaignsStore = (
  initState: CampaignsState = defaultInitStateCampaigns
) => {
  return createStore<CampaignsStore>()(
    persist(
      set => ({
        ...initState,
        setSearch: search => set({ search, currentPage: 1 }), // Reset to page 1 on search
        setLayoutView: layoutView =>
          set(() => {
            return {
              layoutView: layoutView,
            };
          }),
        setType: type => set({ type, currentPage: 1 }), // Reset to page 1 on type change
        setFilters: filters => set({ filters, currentPage: 1 }),
        _setHasHydrated: _hasHydrated => set({ _hasHydrated }),
        setCampaigns: campaigns => set({ campaigns }),
        // Pagination actions
        setCurrentPage: currentPage => set({ currentPage }),
        nextPage: () =>
          set(state => {
            const currentPage =
              state.currentPage < state.totalPages
                ? state.currentPage + 1
                : state.currentPage;
            return {
              currentPage,
              canGoPrevious: currentPage > 1,
              canGoNext: currentPage < state.totalPages,
              isFirstPage: currentPage === 1,
              isLastPage: currentPage === state.totalPages,
              pageNumbers: generatePageNumbers(currentPage, state.totalPages),
            };
          }),
        previousPage: () =>
          set(state => {
            const currentPage =
              state.currentPage > 1 ? state.currentPage - 1 : 1;
            return {
              currentPage,
              canGoPrevious: currentPage > 1,
              canGoNext: currentPage < state.totalPages,
              isFirstPage: currentPage === 1,
              isLastPage: currentPage === state.totalPages,
              pageNumbers: generatePageNumbers(currentPage, state.totalPages),
            };
          }),
        firstPage: () => set({ currentPage: 1 }),
        lastPage: () => set(state => ({ currentPage: state.totalPages })),
        setPageSize: pageSize => set({ pageSize, currentPage: 1 }),
        setPaginationData: ({ totalPages, totalItems, currentPage }) =>
          set(() => {
            return {
              totalPages,
              totalItems,
              currentPage,
              canGoPrevious: currentPage > 1,
              canGoNext: currentPage < totalPages,
              isFirstPage: currentPage === 1,
              isLastPage: currentPage === totalPages,
              pageNumbers: generatePageNumbers(currentPage, totalPages),
            };
          }),
        setIsLoading: isLoading => set({ isLoading }),
        setIsFetching: isFetching => set({ isFetching }),
        toggleLike: id =>
          set(state => {
            const campaignIndex = state.campaigns.findIndex(
              campaign => campaign.id === id
            );
            if (campaignIndex === -1) return state;
            state.campaigns[campaignIndex].isLiked =
              !state.campaigns[campaignIndex].isLiked;
            return {
              campaigns: state.campaigns,
            };
          }),
      }),
      {
        name: 'campaigns-storage',
        partialize: state =>
          pick(state, [
            'layoutView',
            'filters',
            'type',
            'search',
            'pageSize',
            'currentPage',
          ]),
        onRehydrateStorage: () => {
          return state => {
            state?._setHasHydrated(true);
          };
        },
      }
    )
  );
};
