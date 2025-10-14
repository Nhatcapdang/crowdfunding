'use client';

import { createContext, useContext, useRef, type ReactNode } from 'react';
import { useStore } from 'zustand';

import {
  createCampaignsStore,
  initCampaignsStore,
  type CampaignsStore,
} from '@/stores/use-campaigns-store';

export type CampaignsStoreApi = ReturnType<typeof createCampaignsStore>;

export const CampaignsStoreContext = createContext<
  CampaignsStoreApi | undefined
>(undefined);

export interface CounterStoreProviderProps {
  children: ReactNode;
}

export const CounterStoreProvider = ({
  children,
}: CounterStoreProviderProps) => {
  const storeRef = useRef<CampaignsStoreApi | null>(null);
  if (storeRef.current === null) {
    storeRef.current = createCampaignsStore(initCampaignsStore());
  }

  return (
    <CampaignsStoreContext.Provider value={storeRef.current}>
      {children}
    </CampaignsStoreContext.Provider>
  );
};

export const useCampaignsStore = <T,>(
  selector: (store: CampaignsStore) => T
): T => {
  const campaignsStoreContext = useContext(CampaignsStoreContext);

  if (!campaignsStoreContext) {
    throw new Error(
      `useCampaignsStore must be used within CampaignsStoreProvider`
    );
  }

  return useStore(campaignsStoreContext, selector);
};
