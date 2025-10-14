import campaignsData from '@/data/campaigns.json';
import { cloneDeep, filter, orderBy } from 'lodash';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Disable caching for this dynamic API route
export const dynamic = 'force-dynamic';

const campaignFiltersSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(9),
  type: z.enum(['donation', 'petition']).nullable().optional(),
  location: z.string().nullable().optional(),
  search: z.string().nullable().optional(),
  priceSort: z.enum(['asc', 'desc']).nullable().optional(),
  dateSort: z.enum(['asc', 'desc']).nullable().optional(),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const rawParams = Object.fromEntries(searchParams.entries());

    // Parse and validate with Zod schema
    const filters = campaignFiltersSchema.parse(rawParams);

    console.table({ filters });

    let campaigns = cloneDeep(campaignsData) as Campaign[];

    // Apply filters using the parsed filters object
    campaigns = filter(campaigns, campaign => {
      // Filter by type
      if (filters.type && campaign.type !== filters.type) {
        return false;
      }

      // Filter by search (title, description, creator name)
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();

        const searchableFields = [campaign.title, campaign.description].filter(
          field => field != null
        );

        if (
          !searchableFields.some(field =>
            String(field).toLowerCase().includes(searchLower)
          )
        ) {
          return false;
        }
      }

      return true;
    });
    // Sort by field
    let sortField: string = '';
    let sortDirection: 'asc' | 'desc' = 'asc';

    // Priority: priceSort or dateSort or no sort
    if (filters.priceSort) {
      sortField = 'amount.raised';
      sortDirection = filters.priceSort;
    }
    if (filters.dateSort) {
      sortField = 'createdAt';
      sortDirection = filters.dateSort;
    }

    // Apply sorting
    campaigns = orderBy(campaigns, sortField, sortDirection);

    // Apply pagination
    const total = campaigns.length;
    const startIndex = (filters.page - 1) * filters.pageSize;
    const endIndex = startIndex + filters.pageSize;
    const paginatedCampaigns = campaigns.slice(startIndex, endIndex);

    const response: CampaignsResponse = {
      campaigns: paginatedCampaigns,
      total,
      page: filters.page,
      pageSize: filters.pageSize,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching campaigns:', error);

    // Handle Zod validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid query parameters', details: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
