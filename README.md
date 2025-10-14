# Crowdfunding Campaign Platform

**The Explore page for [Crowdfy](https://crowdfunding-green.vercel.app/explore)** - Browse campaigns, filter results, search, and view interactive maps.

## 🌐 Live Demo

**[View Live Application →](https://crowdfunding-green.vercel.app/explore)**

## 📋 Table of Contents

- [Core Technologies](#core-technologies)
- [Features](#features)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [State Management](#state-management)
- [API Documentation](#api-documentation)
- [Hooks Documentation](#hooks-documentation)
- [Utilities](#utilities)
- [Environment Variables](#environment-variables)

## 🚀 Core Technologies

- **React 19.1.0** with **TypeScript 5**
- **Next.js 15.5.4** (App Router with Turbopack)
- **Tailwind CSS 4** for styling
- **ShadCN UI** components with Radix UI primitives
- **Zustand 5.0.8** for state management
- **TanStack React Query 5.90.2** for API requests and caching
- **Axios 1.12.2** for HTTP requests
- **Zod 4.1.12** for schema validation
- **Lodash 4.17.21** for utility functions
- **Google Maps React 2.2.5** for map integration
- **Lucide React** for icons

## ✨ Features

### 1. Gallery View (Implemented)

- **Responsive Grid Layout**: Displays campaign cards in a responsive grid that adapts to different screen sizes
- **Card View**: Each card displays:
  - Campaign image with Next.js Image optimization
  - Creator information with avatar and verified badge
  - Campaign title and description preview
  - Amount raised with currency formatting
  - Funding percentage with animated progress bar
  - Share and favorite (heart) icons with hover effects
- **List View**: Alternative layout showing campaigns in a list format with expanded information
- **Skeleton Loading**: Beautiful skeleton loaders during data fetch

### 2. Filtering System (Implemented)

The filter system provides comprehensive filtering capabilities:

- **View Toggle**: Three mutually exclusive buttons
  - All views (default)
  - Petitions (shows only petition campaigns)
  - Donations (shows only donation campaigns)
- **Sorting Options**:
  - **Price Sort**: Ascending/Descending toggle (sorts by amount raised)
  - **Date Sort**: Ascending/Descending toggle (sorts by creation date)
  - Only one sort can be active at a time
- **View Mode Toggle**:

  - Gallery (grid) view
  - List view
  - Map view
  - Multiple views can be active simultaneously (e.g., List + Map)

- **Filter Behavior**:
  - Filters work cumulatively (combining view type + sorting + search)
  - Filters persist across page refreshes using localStorage
  - Filters reset pagination to page 1
  - State managed globally with Zustand

### 3. Search Functionality (Implemented)

- **Real-time Search**: Search input in the header
- **Debounced Input**: 300ms debounce to optimize API calls
- **Search Scope**: Filters campaigns by:
  - Campaign title (case-insensitive)
  - Campaign description (case-insensitive)
- **Combined Filtering**: Works seamlessly with active filters
- **Persistent State**: Search query persists across sessions

### 4. Pagination (Implemented)

- **Smart Pagination**: Displays page numbers with ellipsis
- **Page Controls**:
  - Previous/Next navigation buttons
  - Direct page number selection
  - Current page highlighting
- **Configuration**:
  - 9 items per page (configurable)
  - Intelligent page number generation
  - Shows first 2 and last 2 pages with middle pages around current
- **URL Sync**: Current page synced to URL query parameters
- **State Management**: Pagination state managed in Zustand store

### 5. State Management with Zustand (Implemented)

The Zustand store manages:

- **Filter State**:
  - Current view filter (all-views/petitions/donations)
  - Active sort (price/date and direction)
  - Layout view mode (gallery/list/map)
- **Search State**:
  - Search query string
- **Pagination State**:
  - Current page number
  - Total pages
  - Total items
  - Page size
  - Navigation flags (canGoNext, canGoPrevious, isFirstPage, isLastPage)
  - Page numbers array with ellipsis
- **Data State**:
  - Campaigns array
  - Loading states (isLoading, isFetching)
  - Favorite campaigns (heart toggle)
- **Persistence**:
  - State persists to localStorage
  - Hydration tracking to prevent SSR issues
  - Selective persistence (excludes data, includes preferences)

## 🏃 Getting Started

### Installation

1. **Clone the repository**:

```bash
git clone https://github.com/Nhatcapdang/crowdfunding
cd crowdfunding
```

2. **Install dependencies**:

```bash
yarn install
```

See [Environment Variables](#environment-variables) section for more details.

3 **Run the development server**:

```bash
yarn dev
```

The application will start on [http://localhost:3001](http://localhost:3001)

### Building for Production

```bash
# Build the application
yarn build

# Start production server
yarn start
```

## 📁 Project Structure

```
crowdfunding/
├── public/                      # Static assets
│   ├── images/                 # Image assets
│   └── svgs/                   # SVG icons
│
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes
│   │   │   └── campaigns/     # Campaigns API endpoint
│   │   │       └── route.ts   # GET /api/campaigns
│   │   ├── explore/           # Explore page
│   │   │   └── page.tsx
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Home page
│   │   └── globals.css        # Global styles
│   │
│   ├── components/            # React components
│   │   ├── explore/          # Explore page components
│   │   │   ├── gallery.tsx   # Main gallery component
│   │   │   ├── google-map.tsx # Map view component
│   │   │   └── index.tsx     # Explore container
│   │   ├── ui/               # ShadCN UI components
│   │   │   ├── avatar.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── pagination.tsx
│   │   │   ├── progress.tsx
│   │   │   ├── skeleton.tsx
│   │   │   ├── tabs.tsx
│   │   │   └── toggle-group.tsx
│   │   └── header.tsx
│   │
│   ├── data/                  # Static data
│   │   └── campaigns.json    # Campaign mock data
│   │
│   ├── global/               # Global CSS
│   │   ├── base.css
│   │   ├── components.css
│   │   ├── theme.css
│   │   └── utilities.css
│   │
│   ├── hooks/                # Custom React hooks
│   │   ├── use-campaigns-query.ts
│   │   ├── use-debounced-callback.ts
│   │   ├── use-callback-ref.ts
│   │   └── use-is-first-render.ts
│   │
│   ├── lib/                  # Utility libraries
│   │   ├── generatePageNumbers.ts
│   │   └── utils.ts
│   │
│   ├── providers/            # Context providers
│   │   ├── campaigns-store-provider.tsx
│   │   ├── query-provider.tsx
│   │   └── theme-provider.tsx
│   │
│   ├── stores/               # Zustand stores
│   │   └── use-campaigns-store.ts
│   │
│   └── types/                # TypeScript type definitions
│       └── campaigns.d.ts
│
├── components.json           # ShadCN configuration
├── tailwind.config.ts       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Dependencies and scripts
```

```typescript
// Persisted fields
{
  layoutView, priceSort, dateSort, type, search, pageSize, currentPage;
}
```

## 🔌 API Documentation

### GET `/api/campaigns`

Fetches filtered and paginated campaigns.

#### Query Parameters

| Parameter   | Type   | Required | Default | Description                              |
| ----------- | ------ | -------- | ------- | ---------------------------------------- |
| `page`      | number | No       | 1       | Current page number (min: 1)             |
| `pageSize`  | number | No       | 9       | Items per page (min: 1, max: 100)        |
| `type`      | string | No       | -       | Filter by type: 'donation' or 'petition' |
| `location`  | string | No       | -       | Filter by location                       |
| `search`    | string | No       | -       | Search in title and description          |
| `priceSort` | string | No       | -       | Sort by price: 'asc' or 'desc'           |
| `dateSort`  | string | No       | -       | Sort by date: 'asc' or 'desc'            |

#### Response Format

```typescript
{
  campaigns: Campaign[];      // Array of campaign objects
  total: number;             // Total number of campaigns (after filtering)
  page: number;              // Current page number
  pageSize: number;          // Items per page
}
```

#### Example Request

```javascript
const response = await axios.get('/api/campaigns', {
  params: {
    page: 1,
    pageSize: 9,
    type: 'donation',
    search: 'education',
    priceSort: 'desc',
  },
});
```

#### Implementation Details

1. **Validation**: Uses Zod schema for parameter validation
2. **Filtering**:
   - Filters by campaign type
   - Searches in title and description (case-insensitive)
3. **Sorting**:
   - Supports sorting by `amount.raised` (price) or `createdAt` (date)
   - Only one sort active at a time (priceSort takes precedence)
4. **Pagination**:
   - Slices results based on page and pageSize
   - Returns total count for pagination UI

## 🎣 Hooks Documentation

### useCampaignsQuery

**Location**: `src/hooks/use-campaigns-query.ts`

Custom hook for fetching and syncing campaign data.

#### Features:

- Fetches campaigns from API
- Syncs data to Zustand store
- Manages loading states
- URL parameter synchronization
- 5-minute cache with React Query

#### Usage:

```typescript
function MyComponent() {
  const query = useCampaignsQuery();

  // Access query state
  const { data, isLoading, error, refetch } = query;
}
```

#### Dependencies:

- Watches: `type`, `search`, `priceSort`, `dateSort`, `currentPage`, `pageSize`
- Refetches automatically when dependencies change
- Updates Zustand store with fetched data

### useDebouncedCallback

**Location**: `src/hooks/use-debounced-callback.ts`

Debounces callback function execution.

#### Parameters:

```typescript
interface UseDebouncedCallbackOptions {
  delay: number; // Delay in milliseconds
  flushOnUnmount?: boolean; // Execute on unmount
  leading?: boolean; // Execute on leading edge
}
```

#### Usage:

```typescript
const debouncedSearch = useDebouncedCallback(
  (query: string) => setSearch(query),
  300 // 300ms delay
);

// Use in event handler
<input onChange={e => debouncedSearch(e.target.value)} />;
```

#### Methods:

- `flush()`: Execute pending callback immediately
- `cancel()`: Cancel pending callback

### Commands:

- **`yarn dev`**: Start development server on port 3001 with Turbopack
- **`yarn build`**: Build production bundle with Turbopack
- **`yarn start`**: Start production server
- **`yarn lint`**: Run ESLint
- **`yarn typecheck`**: Check TypeScript types without emitting files

```
User Interaction
    ↓
Component Event Handler
    ↓
Zustand Store Action
    ↓
React Query Hook (useCampaignsQuery)
    ↓
API Route (/api/campaigns)
    ↓
Data Processing & Filtering
    ↓
Response
    ↓
React Query Cache Update
    ↓
Zustand Store Update
    ↓
Component Re-render
```

## 🎯 Performance Optimizations

1. **React Query Caching**: 5-minute stale time reduces API calls
2. **Debounced Search**: 300ms debounce prevents excessive searches
3. **Next.js Image**: Automatic image optimization
4. **Code Splitting**: Automatic with Next.js App Router
5. **Zustand**: Lightweight state management (1KB)
6. **Skeleton Loading**: Perceived performance improvement
7. **Turbopack**: Faster development builds

## 📄 License

This project is private.

## 👨‍💻 Author

**Nguyen Van Kiet**

---

For more information about Next.js, check out:

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)
