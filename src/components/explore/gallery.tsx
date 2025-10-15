'use client';
import { useCampaignsQuery } from '@/hooks';
import { cn, formatNumber } from '@/lib/utils';
import { useCampaignsStore } from '@/providers/campaigns-store-provider';
import {
  BadgeCheckIcon,
  FilePenLine,
  Gift,
  Heart,
  List,
  MapPin,
  PiggyBank,
  Share,
} from 'lucide-react';
import Image from 'next/image';
import { memo, useCallback, useMemo } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader } from '../ui/card';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../ui/pagination';
import { Progress } from '../ui/progress';
import { Skeleton } from '../ui/skeleton';
import {
  CyclingSortButton,
  CyclingSortGroup,
  ToggleGroup,
  ToggleGroupItem,
} from '../ui/toggle-group';
import GoogleMap from './google-map';
import ShowFilters from './show-filters';
import { isEqual } from 'lodash';

export default function Gallery() {
  const campaigns = useCampaignsStore(state => state.campaigns);
  const layoutView = useCampaignsStore(state => state.layoutView);
  const type = useCampaignsStore(state => state.type);
  const setFilters = useCampaignsStore(state => state.setFilters);
  const filters = useCampaignsStore(state => state.filters);
  const currentPage = useCampaignsStore(state => state.currentPage);
  const isLoading = useCampaignsStore(state => state.isLoading);
  const canGoPrevious = useCampaignsStore(state => state.canGoPrevious);
  const canGoNext = useCampaignsStore(state => state.canGoNext);
  const pageNumbers = useCampaignsStore(state => state.pageNumbers);

  const setLayoutView = useCampaignsStore(state => state.setLayoutView);
  const setType = useCampaignsStore(state => state.setType);
  const nextPage = useCampaignsStore(state => state.nextPage);
  const previousPage = useCampaignsStore(state => state.previousPage);
  const setCurrentPage = useCampaignsStore(state => state.setCurrentPage);

  // Fetch campaigns data and sync to store
  useCampaignsQuery();

  const handlePriceSortChange = useCallback(
    (value?: 'asc' | 'desc') => {
      setFilters({ priceSort: value });
    },
    [setFilters]
  );

  const handleDateSortChange = useCallback(
    (value?: 'asc' | 'desc') => {
      setFilters({ dateSort: value });
    },
    [setFilters]
  );

  const handleTypeChange = useCallback(
    (value: string) => {
      if (!value) return;
      setType(value as 'all-views' | CampaignType);
    },
    [setType]
  );

  const handleLayoutViewChange = useCallback(
    (value: ('map' | 'list')[]) => {
      setLayoutView(value);
    },
    [setLayoutView]
  );

  const handlePreviousPage = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      previousPage();
    },
    [previousPage]
  );

  const handleNextPage = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      nextPage();
    },
    [nextPage]
  );

  const handlePageClick = useCallback(
    (pageNum: number) => (e: React.MouseEvent) => {
      e.preventDefault();
      setCurrentPage(pageNum);
    },
    [setCurrentPage]
  );

  const showMap = useMemo(() => layoutView.includes('map'), [layoutView]);
  const showListView = useMemo(() => layoutView.includes('list'), [layoutView]);
  const isListOnly = useMemo(() => isEqual(layoutView, ['list']), [layoutView]);
  const isMapOnly = useMemo(() => isEqual(layoutView, ['map']), [layoutView]);
  const isEmpty = useMemo(() => isEqual(layoutView, []), [layoutView]);
  const isBothViews = useMemo(
    () => layoutView.includes('list') && layoutView.includes('map'),
    [layoutView]
  );

  return (
    <div
      className={cn('mx-auto px-8 w-full flex flex-col gap-6', {
        'max-w-xl': isListOnly || isMapOnly || isEmpty,
        'max-w-tablet': isBothViews,
      })}
    >
      <div />
      <div />
      <div className="flex gap-8 lg:flex-row flex-col">
        <div className="flex-1 flex flex-col gap-6">
          <div className="flex justify-between">
            <div>
              <h2 className="text-4xl">Explore</h2>
              <p className="text-[#475467]">Where do you want to help</p>
            </div>
            <div className="flex  gap-3">
              <CyclingSortGroup variant="outline" size="lg">
                <CyclingSortButton
                  label="Price"
                  sortKey="priceSort"
                  value={filters.priceSort}
                  onChange={handlePriceSortChange}
                />
                <CyclingSortButton
                  label="Date"
                  sortKey="dateSort"
                  value={filters.dateSort}
                  onChange={handleDateSortChange}
                />
              </CyclingSortGroup>
              <ShowFilters />
            </div>
          </div>
          <div className="flex justify-between">
            <ToggleGroup
              type="single"
              size="lg"
              variant="outline"
              defaultValue="all-views"
              value={type}
              onValueChange={handleTypeChange}
            >
              <ToggleGroupItem value="all-views" aria-label="All views">
                All views
              </ToggleGroupItem>
              <ToggleGroupItem value="petition" aria-label="Petitions">
                <FilePenLine size={20} strokeWidth={2} />
                Petitions
              </ToggleGroupItem>
              <ToggleGroupItem value="donation" aria-label="Donations">
                <PiggyBank size={20} strokeWidth={2} />
                Donations
              </ToggleGroupItem>
            </ToggleGroup>
            <ToggleGroup
              type="multiple"
              size="lg"
              variant="outline"
              value={layoutView}
              onValueChange={handleLayoutViewChange}
            >
              <ToggleGroupItem value="list" aria-label="List view">
                <List size={20} className="text-slate-500" />
              </ToggleGroupItem>
              <ToggleGroupItem value="map" aria-label="Map view">
                <MapPin size={20} className="text-slate-500" />
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
          <div
            className={cn('h-full overflow-y-auto', {
              'overflow-y-auto h-[766px]': showListView || showMap,
            })}
          >
            <div
              className={cn({
                'flex flex-wrap gap-[13px]': !showListView,
                'flex flex-col gap-4': showListView,
              })}
            >
              {campaigns.length === 0 && !isLoading && (
                <div className="flex justify-center items-center h-full">
                  <h3 className="text-gray-600">No campaigns found</h3>
                </div>
              )}
              {isLoading
                ? Array.from({ length: 6 }).map((_, index) =>
                    !showListView ? (
                      <SkeletonCard key={index} />
                    ) : (
                      <SkeletonCardList key={index} />
                    )
                  )
                : campaigns.map((campaign: Campaign) =>
                    !showListView ? (
                      <CardItem key={campaign.id} {...campaign} />
                    ) : (
                      <CardItemList key={campaign.id} {...campaign} />
                    )
                  )}
            </div>
          </div>
          <Pagination className="h-15 text-gray-600 pt-5 border-t border-slate-200">
            <PaginationPrevious
              className={cn('[&_svg]:size-5', {
                'opacity-50 cursor-not-allowed': !canGoPrevious,
              })}
              href="#"
              onClick={handlePreviousPage}
              aria-disabled={!canGoPrevious}
            />
            <PaginationContent className="text-gray-800">
              {pageNumbers.map(
                (pageNum: number | 'ellipsis', index: number) => (
                  <PaginationItem key={`${pageNum}-${index}`}>
                    {pageNum === 'ellipsis' ? (
                      <PaginationEllipsis />
                    ) : (
                      <PaginationLink
                        href="#"
                        onClick={handlePageClick(pageNum)}
                        isActive={currentPage === pageNum}
                      >
                        {pageNum}
                      </PaginationLink>
                    )}
                  </PaginationItem>
                )
              )}
            </PaginationContent>
            <PaginationNext
              className={cn('[&_svg]:size-5', {
                'opacity-50 cursor-not-allowed': !canGoNext,
              })}
              href="#"
              onClick={handleNextPage}
              aria-disabled={!canGoNext}
            />
          </Pagination>
        </div>
        {showMap && (
          <div className="flex-1">
            <GoogleMap />
          </div>
        )}
      </div>
      <div />
      <div />
      <div />
      <div />
    </div>
  );
}

const SkeletonCard = memo(() => {
  return (
    <Card className="w-full max-w-[396px] p-0 rounded-xl border-border overflow-hidden gap-0">
      <CardHeader className="relative h-[175px] w-full">
        <Skeleton className="w-full h-full rounded-none" />
        <div className="absolute bottom-0 right-0 p-2 flex gap-2">
          <Skeleton className="h-[42px] w-[42px] rounded-md" />
          <Skeleton className="h-[42px] w-[42px] rounded-md" />
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-5 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <Skeleton className="size-10 rounded-full" />
          <Skeleton className="h-4 w-32" />
        </div>
        <Skeleton className="h-6 w-3/4" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
        <Skeleton className="h-2 w-full rounded-full" />
        <div className="flex justify-between">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-5 w-12" />
        </div>
      </CardContent>
    </Card>
  );
});

SkeletonCard.displayName = 'SkeletonCard';

const CardItem = memo(
  ({ creator, image, description, title, amount, percentage }: Campaign) => {
    return (
      <Card className="w-full max-w-[396px] p-0 rounded-xl border-border overflow-hidden gap-0 ">
        <CardHeader className="relative h-[175px]">
          <Image src={image} alt="card-image" fill />
          <div className="absolute bottom-0 right-0  p-2 flex gap-2">
            <Button
              variant="outline"
              className="h-[42px] w-[42px] border-slate-200"
            >
              <Share className="text-black" size={16} />
            </Button>
            <Button
              variant="outline"
              className="h-[42px] w-[42px] border-slate-200"
            >
              <Heart className="text-black" size={16} />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-5 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <Avatar className="size-10">
              <AvatarImage src={creator.avatar} alt="@shadcn" />
              <AvatarFallback className="text-gray-600 font-medium">
                {creator.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <span className="font-medium">{creator.name}</span>
          </div>
          <h3 className="text-gray-900 line-clamp-1">{title}</h3>
          <p className="line-clamp-2">{description}</p>
          <Progress value={percentage} className="w-full" />
          <div className="flex justify-between font-medium">
            <p className="flex items-center gap-0.5">
              <Gift />
              {amount.currency}
              {formatNumber({
                value: amount.raised,
                digit: 2,
              })}
            </p>
            <p className="text-slate-800">{percentage}%</p>
          </div>
        </CardContent>
      </Card>
    );
  }
);

CardItem.displayName = 'CardItem';

const SkeletonCardList = memo(() => {
  return (
    <Card className="w-full p-0 rounded-xl border-border overflow-hidden">
      <div className="flex gap-4 p-4">
        <Skeleton className="w-[240px] h-[160px] rounded-lg flex-shrink-0" />
        <div className="flex-1 flex flex-col gap-3 py-1">
          <div className="flex items-center gap-3">
            <Skeleton className="size-10 rounded-full" />
            <Skeleton className="h-4 w-32" />
          </div>
          <Skeleton className="h-6 w-3/4" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
          <Skeleton className="h-2 w-full rounded-full" />
          <div className="flex justify-between items-center">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-5 w-12" />
            <div className="flex gap-2">
              <Skeleton className="h-10 w-10 rounded-md" />
              <Skeleton className="h-10 w-10 rounded-md" />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
});

SkeletonCardList.displayName = 'SkeletonCardList';

const CardItemList = memo(
  ({
    image,
    description,
    title,
    amount,
    location,
    percentage,
    isLiked,
    id,
  }: Campaign) => {
    const toggleLike = useCampaignsStore(state => state.toggleLike);

    const handleToggleLike = useCallback(() => {
      toggleLike(id);
    }, [toggleLike, id]);

    return (
      <Card className="w-full p-4 rounded-xl border-border h-[250px] ">
        <div className="flex gap-4 h-full relative">
          <div className="absolute top-0 right-0">
            <Button
              variant="outline"
              size="icon"
              className={cn(
                'h-10 w-10 border-slate-200 [&_svg]:text-black hover:bg-red-500 hover:[&_svg]:text-white',
                {
                  'bg-red-500 [&_svg]:text-white': isLiked,
                }
              )}
              onClick={handleToggleLike}
            >
              <Heart size={16} />
            </Button>
          </div>
          <div className="relative h-full aspect-square flex-shrink-0 rounded-lg overflow-hidden">
            <Image src={image} alt="card-image" fill className="object-cover" />
            <Badge
              variant="custom"
              className=" absolute bottom-2 left-2 gap-1 py-0.5 pl-1.5 pr-2 text-xs"
            >
              <BadgeCheckIcon size={12} />
              Verified
            </Badge>
          </div>
          <div className="flex-1 flex flex-col gap-4 ">
            <div>
              <p className="text-sm text-lime-600 font-semibold">Donations</p>
              <h3 className="text-gray-900 text-lg font-semibold line-clamp-1">
                {title}
              </h3>
            </div>
            <p className="line-clamp-2 text-gray-600 flex-1">{description}</p>
            <div className="flex justify-between items-center h-6 ">
              <div className="flex items-center gap-2 text-gray-400 font-medium">
                <MapPin size={20} className="text-gray-400" />
                <p>{location}</p>
              </div>
              <p className="text-gray-900 font-semibold text-xl">
                {amount.currency}
                {formatNumber({
                  value: amount.raised,
                  digit: 2,
                })}
              </p>
            </div>
            <Progress value={percentage} className="w-full" />
          </div>
        </div>
      </Card>
    );
  }
);

CardItemList.displayName = 'CardItemList';
