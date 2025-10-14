type CampaignType = 'donation' | 'petition';

interface Campaign {
  id: string;
  type: CampaignType;
  title: string;
  description: string;
  creator: {
    name: string;
    avatar: string;
    verified: boolean;
  };
  image: string;
  amount: {
    raised: number;
    currency: string;
  };
  percentage: number;
  location?: string;
  supporters?: number; // for petitions (signatures)
  createdAt: string; // ISO date string
  isLiked?: boolean;
}

interface CampaignsResponse {
  campaigns: Campaign[];
  total: number;
  page: number;
  pageSize: number;
}
