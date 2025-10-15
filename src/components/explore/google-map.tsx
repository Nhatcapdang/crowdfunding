'use client';

import GoogleMapReact from 'google-map-react';
import { MapPin } from 'lucide-react';
import { useState } from 'react';
import { useCampaignsStore } from '@/providers/campaigns-store-provider';
import { Card, CardContent } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { formatNumber } from '@/lib/utils';

interface CampaignMarkerProps {
  lat: number;
  lng: number;
  campaign: Campaign;
  onClick: (campaign: Campaign) => void;
}

function CampaignMarker({ campaign, onClick }: CampaignMarkerProps) {
  return (
    <div
      className="relative cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
      onClick={() => onClick(campaign)}
    >
      <div className="bg-primary text-primary-foreground rounded-full p-2 shadow-lg hover:scale-110 transition-transform">
        <MapPin size={20} />
      </div>
      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-primary rotate-45" />
    </div>
  );
}

// Campaign info popup
interface CampaignPopupProps {
  campaign: Campaign;
  onClose: () => void;
}

function CampaignPopup({ campaign, onClose }: CampaignPopupProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3 sm:p-4">
      <Card className="max-w-sm sm:max-w-md w-full max-h-[90vh] overflow-y-auto">
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-start gap-3 sm:gap-4">
            <Avatar className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0">
              <AvatarImage src={campaign.creator.avatar} />
              <AvatarFallback className="text-xs sm:text-sm">
                {campaign.creator.name[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-semibold text-xs sm:text-sm truncate">
                  {campaign.creator.name}
                </h3>
                {campaign.creator.verified && (
                  <Badge variant="secondary" className="text-xs flex-shrink-0">
                    Verified
                  </Badge>
                )}
              </div>
              <h2 className="font-bold text-base sm:text-lg mb-2 line-clamp-2">
                {campaign.title}
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4 line-clamp-3">
                {campaign.description}
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                <div className="text-xs sm:text-sm">
                  <span className="font-semibold text-primary">
                    {campaign.amount.currency}
                    {formatNumber({ value: campaign.amount.raised, digit: 0 })}
                  </span>
                  <span className="text-muted-foreground"> raised</span>
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground">
                  📍 {campaign.location}
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 text-muted-foreground hover:text-foreground text-lg sm:text-xl"
          >
            ✕
          </button>
        </CardContent>
      </Card>
    </div>
  );
}

// Mock function to convert location string to coordinates
// In a real app, you'd use a geocoding service
function getCoordinatesFromLocation(location: string): {
  lat: number;
  lng: number;
} {
  const locationMap: Record<string, { lat: number; lng: number }> = {
    'Saint Martin': { lat: 18.0708, lng: -63.0501 },
    'New York': { lat: 40.7128, lng: -74.006 },
    'Los Angeles': { lat: 34.0522, lng: -118.2437 },
    London: { lat: 51.5074, lng: -0.1278 },
    Paris: { lat: 48.8566, lng: 2.3522 },
    Tokyo: { lat: 35.6762, lng: 139.6503 },
    Sydney: { lat: -33.8688, lng: 151.2093 },
    Berlin: { lat: 52.52, lng: 13.405 },
    Toronto: { lat: 43.6532, lng: -79.3832 },
    Amsterdam: { lat: 52.3676, lng: 4.9041 },
  };

  return locationMap[location] || { lat: 40.7128, lng: -74.006 }; // Default to NYC
}

export default function GoogleMap() {
  const { campaigns } = useCampaignsStore(state => state);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(
    null
  );

  const campaignsWithCoords = campaigns
    .filter((campaign: Campaign) => campaign.location)
    .map((campaign: Campaign) => ({
      ...campaign,
      coordinates: getCoordinatesFromLocation(campaign.location!),
    }));

  const defaultCenter = { lat: 40.7128, lng: -74.006 }; // NYC
  const defaultZoom = 2;

  const handleMarkerClick = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
  };

  const handleClosePopup = () => {
    setSelectedCampaign(null);
  };

  return (
    <div className="relative h-full min-h-[400px] sm:min-h-[500px] lg:min-h-[600px]">
      <div className="h-full w-full rounded-lg overflow-hidden border border-gray-200">
        <GoogleMapReact
          bootstrapURLKeys={{
            key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
          }}
          defaultCenter={defaultCenter}
          defaultZoom={defaultZoom}
          options={{
            styles: [
              {
                featureType: 'poi',
                elementType: 'labels',
                stylers: [{ visibility: 'off' }],
              },
            ],
            disableDefaultUI: false,
            zoomControl: true,
            mapTypeControl: false,
            scaleControl: true,
            streetViewControl: false,
            rotateControl: false,
            fullscreenControl: true,
          }}
        >
          {campaignsWithCoords.map(
            (
              campaign: Campaign & { coordinates: { lat: number; lng: number } }
            ) => (
              <CampaignMarker
                key={campaign.id}
                lat={campaign.coordinates.lat}
                lng={campaign.coordinates.lng}
                campaign={campaign}
                onClick={handleMarkerClick}
              />
            )
          )}
        </GoogleMapReact>
      </div>

      {/* Campaign count indicator */}
      <div className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-white rounded-lg shadow-md px-2 py-1.5 sm:px-3 sm:py-2">
        <span className="text-xs sm:text-sm font-medium">
          {campaignsWithCoords.length} campaigns
        </span>
      </div>

      {/* Map legend */}
      <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 bg-white rounded-lg shadow-md p-2 sm:p-3">
        <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
          <div className="bg-primary rounded-full p-0.5 sm:p-1">
            <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-primary-foreground" />
          </div>
          <span className="hidden sm:inline">Campaign Location</span>
          <span className="sm:hidden">Campaigns</span>
        </div>
      </div>

      {/* Campaign popup */}
      {selectedCampaign && (
        <CampaignPopup campaign={selectedCampaign} onClose={handleClosePopup} />
      )}
    </div>
  );
}
