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
      className={cn(
        'mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col gap-4 sm:gap-6',
        {
          'max-w-xl': isListOnly || isMapOnly || isEmpty,
          'max-w-tablet': isBothViews,
        }
      )}
    >
      <div />
      <div />
      <div className="flex gap-4 sm:gap-6 lg:gap-8 lg:flex-row flex-col">
        <div className="flex-1 flex flex-col gap-4 sm:gap-6">
          <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl">Explore</h2>
              <p className="text-[#475467] text-sm sm:text-base">
                Where do you want to help
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <CyclingSortGroup
                variant="outline"
                size="lg"
                className="hidden sm:flex"
              >
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
          <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
            <ToggleGroup
              type="single"
              size="lg"
              variant="outline"
              defaultValue="all-views"
              value={type}
              onValueChange={handleTypeChange}
              className="flex-wrap justify-start"
            >
              <ToggleGroupItem
                value="all-views"
                aria-label="All views"
                className="text-xs sm:text-sm"
              >
                All views
              </ToggleGroupItem>
              <ToggleGroupItem
                value="petition"
                aria-label="Petitions"
                className="text-xs sm:text-sm"
              >
                <FilePenLine
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  strokeWidth={2}
                />
                <span className="hidden sm:inline">Petitions</span>
              </ToggleGroupItem>
              <ToggleGroupItem
                value="donation"
                aria-label="Donations"
                className="text-xs sm:text-sm"
              >
                <PiggyBank className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2} />
                <span className="hidden sm:inline">Donations</span>
              </ToggleGroupItem>
            </ToggleGroup>
            <ToggleGroup
              type="multiple"
              size="lg"
              variant="outline"
              value={layoutView}
              onValueChange={handleLayoutViewChange}
              className="justify-end"
            >
              <ToggleGroupItem value="list" aria-label="List view">
                <List className="w-4 h-4 sm:w-5 sm:h-5 text-slate-500" />
              </ToggleGroupItem>
              <ToggleGroupItem value="map" aria-label="Map view">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-slate-500" />
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
          <div
            className={cn('h-full overflow-y-auto', {
              'overflow-y-auto h-[500px] sm:h-[600px] lg:h-[766px]':
                showListView || showMap,
            })}
          >
            <div
              className={cn({
                'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3':
                  !showListView,
                'flex flex-col gap-3': showListView,
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
    <Card className="w-full p-0 rounded-xl border-border overflow-hidden gap-0">
      <CardHeader className="relative h-[140px] sm:h-[160px] lg:h-[175px] w-full">
        <Skeleton className="w-full h-full rounded-none" />
        <div className="absolute bottom-0 right-0 p-1.5 sm:p-2 flex gap-1.5 sm:gap-2">
          <Skeleton className="h-8 w-8 sm:h-10 sm:w-10 lg:h-[42px] lg:w-[42px] rounded-md" />
          <Skeleton className="h-8 w-8 sm:h-10 sm:w-10 lg:h-[42px] lg:w-[42px] rounded-md" />
        </div>
      </CardHeader>
      <CardContent className="p-3 sm:p-4 pt-4 sm:pt-5 flex flex-col gap-3 sm:gap-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <Skeleton className="size-8 sm:size-10 rounded-full" />
          <Skeleton className="h-3 sm:h-4 w-24 sm:w-32" />
        </div>
        <Skeleton className="h-5 sm:h-6 w-3/4" />
        <div className="space-y-1.5 sm:space-y-2">
          <Skeleton className="h-3 sm:h-4 w-full" />
          <Skeleton className="h-3 sm:h-4 w-5/6" />
        </div>
        <Skeleton className="h-1.5 sm:h-2 w-full rounded-full" />
        <div className="flex justify-between">
          <Skeleton className="h-4 sm:h-5 w-20 sm:w-24" />
          <Skeleton className="h-4 sm:h-5 w-10 sm:w-12" />
        </div>
      </CardContent>
    </Card>
  );
});

SkeletonCard.displayName = 'SkeletonCard';

const CardItem = memo(
  ({
    creator,
    image,
    description,
    title,
    amount,
    percentage,
    id,
    isLiked,
  }: Campaign) => {
    const toggleLike = useCampaignsStore(state => state.toggleLike);

    const handleToggleLike = useCallback(() => {
      toggleLike(id);
    }, [toggleLike, id]);

    return (
      <Card className="w-full p-0 rounded-xl border-border overflow-hidden gap-0">
        <CardHeader className="relative h-[140px] sm:h-[160px] lg:h-[175px]">
          <Image src={image} alt="card-image" fill className="object-cover" />
          <div className="absolute bottom-0 right-0 p-1.5 sm:p-2 flex gap-1.5 sm:gap-2">
            <Button
              variant="outline"
              className="h-8 w-8 sm:h-10 sm:w-10 lg:h-[42px] lg:w-[42px] border-slate-200"
              size="icon"
            >
              <Share className="text-black w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className={cn(
                'h-8 w-8 sm:h-10 sm:w-10 lg:h-[42px] lg:w-[42px] border-slate-200 hover:bg-red-500/25 hover:[&_svg]:text-white',
                {
                  'bg-red-500 [&_svg]:text-white': isLiked,
                }
              )}
              onClick={handleToggleLike}
            >
              <Heart className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-3 sm:p-4 pt-4 sm:pt-5 flex flex-col gap-3 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <Avatar className="size-8 sm:size-10">
              <AvatarImage src={creator.avatar} alt="@shadcn" />
              <AvatarFallback className="text-gray-600 font-medium text-xs sm:text-sm">
                {creator.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <span className="font-medium text-sm sm:text-base">
              {creator.name}
            </span>
          </div>
          <h3 className="text-gray-900 line-clamp-1 text-sm sm:text-base lg:text-lg font-medium">
            {title}
          </h3>
          <p className="line-clamp-2 text-xs sm:text-sm text-gray-600">
            {description}
          </p>
          <Progress value={percentage} className="w-full h-1.5 sm:h-2" />
          <div className="flex justify-between font-medium text-xs sm:text-sm">
            <p className="flex items-center gap-0.5 sm:gap-1">
              <Gift className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
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
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 p-3 sm:p-4">
        <Skeleton className="w-full sm:w-[180px] lg:w-[240px] h-[140px] sm:h-[120px] lg:h-[160px] rounded-lg flex-shrink-0" />
        <div className="flex-1 flex flex-col gap-2 sm:gap-3 py-1">
          <div className="flex items-center gap-2 sm:gap-3">
            <Skeleton className="size-8 sm:size-10 rounded-full" />
            <Skeleton className="h-3 sm:h-4 w-24 sm:w-32" />
          </div>
          <Skeleton className="h-5 sm:h-6 w-3/4" />
          <div className="space-y-1.5 sm:space-y-2 flex-1">
            <Skeleton className="h-3 sm:h-4 w-full" />
            <Skeleton className="h-3 sm:h-4 w-5/6" />
          </div>
          <Skeleton className="h-1.5 sm:h-2 w-full rounded-full" />
          <div className="flex justify-between items-center">
            <Skeleton className="h-4 sm:h-5 w-20 sm:w-24" />
            <Skeleton className="h-4 sm:h-5 w-10 sm:w-12" />
            <div className="flex gap-1.5 sm:gap-2">
              <Skeleton className="h-8 w-8 sm:h-10 sm:w-10 rounded-md" />
              <Skeleton className="h-8 w-8 sm:h-10 sm:w-10 rounded-md" />
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
      <Card className="w-full p-3 sm:p-4 rounded-xl border-border min-h-[200px] sm:h-[218px]">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 h-full relative">
          <div className="absolute top-0 right-0 z-10">
            <Button
              variant="outline"
              size="icon"
              className={cn(
                'h-8 w-8 sm:h-10 sm:w-10 border-slate-200 [&_svg]:text-black hover:bg-red-500/25 hover:[&_svg]:text-white',
                {
                  'bg-red-500 [&_svg]:text-white': isLiked,
                }
              )}
              onClick={handleToggleLike}
            >
              <Heart className="w-3 h-3 sm:w-4 sm:h-4" />
            </Button>
          </div>
          <div className="relative w-full sm:w-[180px] lg:w-[240px] h-[140px] sm:h-full sm:aspect-square flex-shrink-0 rounded-lg overflow-hidden">
            <Image src={image} alt="card-image" fill className="object-cover" />
            <Badge
              variant="custom"
              className="absolute bottom-1.5 sm:bottom-2 left-1.5 sm:left-2 gap-1 py-0.5 pl-1.5 pr-2 text-xs"
            >
              <BadgeCheckIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              Verified
            </Badge>
          </div>
          <div className="flex-1 flex flex-col gap-3 sm:gap-4">
            <div>
              <p className="text-xs sm:text-sm text-lime-600 font-semibold">
                Donations
              </p>
              <h3 className="text-gray-900 text-base sm:text-lg font-semibold line-clamp-1">
                {title}
              </h3>
            </div>
            <p className="line-clamp-2 text-xs sm:text-sm text-gray-600 flex-1">
              {description}
            </p>
            <div className=" flex justify-between items-center gap-2 sm:gap-0">
              <div className="flex items-center gap-1.5 sm:gap-2 text-gray-400 font-medium text-xs sm:text-sm">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                <p>{location}</p>
              </div>
              <p className="text-gray-900 font-semibold text-lg sm:text-xl">
                {amount.currency}
                {formatNumber({
                  value: amount.raised,
                  digit: 2,
                })}
              </p>
            </div>
            <Progress value={percentage} className="w-full h-1.5 sm:h-2" />
          </div>
        </div>
      </Card>
    );
  }
);

CardItemList.displayName = 'CardItemList';
