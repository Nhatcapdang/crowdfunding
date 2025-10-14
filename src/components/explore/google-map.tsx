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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="max-w-md w-full">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <Avatar className="w-12 h-12">
              <AvatarImage src={campaign.creator.avatar} />
              <AvatarFallback>{campaign.creator.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-semibold text-sm">
                  {campaign.creator.name}
                </h3>
                {campaign.creator.verified && (
                  <Badge variant="secondary" className="text-xs">
                    Verified
                  </Badge>
                )}
              </div>
              <h2 className="font-bold text-lg mb-2 line-clamp-2">
                {campaign.title}
              </h2>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                {campaign.description}
              </p>
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <span className="font-semibold text-primary">
                    {campaign.amount.currency}
                    {formatNumber({ value: campaign.amount.raised, digit: 0 })}
                  </span>
                  <span className="text-muted-foreground"> raised</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  📍 {campaign.location}
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
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
    <div className="relative h-full max-lg:h-[500px]">
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
      <div className="absolute top-4 left-4 bg-white rounded-lg shadow-md px-3 py-2">
        <span className="text-sm font-medium">
          {campaignsWithCoords.length} campaigns
        </span>
      </div>

      {/* Map legend */}
      <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-md p-3">
        <div className="flex items-center gap-2 text-sm">
          <div className="bg-primary rounded-full p-1">
            <MapPin size={12} className="text-primary-foreground" />
          </div>
          <span>Campaign Location</span>
        </div>
      </div>

      {/* Campaign popup */}
      {selectedCampaign && (
        <CampaignPopup campaign={selectedCampaign} onClose={handleClosePopup} />
      )}
    </div>
  );
}
