
import { Link } from 'react-router-dom';
import { Star, Heart, MapPin, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Property } from '@/hooks/useProperties';

interface PropertyCardProps {
  property: Property;
  viewMode: 'grid' | 'list';
}

const PropertyCard = ({ property, viewMode }: PropertyCardProps) => {
  const defaultImage = "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop";
  
  return (
    <Card className="group cursor-pointer border-0 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <Link to={`/property/${property.id}`}>
        {viewMode === 'grid' ? (
          <>
            <div className="relative overflow-hidden rounded-t-lg">
              <img
                src={property.images?.[0] || defaultImage}
                alt={property.title}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <button className="absolute top-4 right-4 p-2 bg-white/80 hover:bg-white rounded-full transition-colors">
                <Heart className="h-5 w-5 text-gray-600 hover:text-red-500" />
              </button>
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
                <span className="text-sm font-medium text-gray-900">
                  ${property.price_per_night}/night
                </span>
              </div>
            </div>
            
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-semibold text-gray-900 line-clamp-1">
                  {property.title}
                </h3>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium text-gray-700 ml-1">
                    4.8
                  </span>
                </div>
              </div>
              
              <p className="text-gray-600 mb-3 flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                {property.location}
              </p>
              
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <span><Users className="h-4 w-4 inline mr-1" />{property.max_guests} guests</span>
                <span>{property.bedrooms} beds</span>
                <span>{property.bathrooms} baths</span>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {property.amenities?.slice(0, 3).map((amenity, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full"
                  >
                    {amenity}
                  </span>
                ))}
                {property.amenities && property.amenities.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                    +{property.amenities.length - 3} more
                  </span>
                )}
              </div>
            </CardContent>
          </>
        ) : (
          <div className="flex">
            <div className="relative w-80 h-60 overflow-hidden rounded-l-lg">
              <img
                src={property.images?.[0] || defaultImage}
                alt={property.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <button className="absolute top-4 right-4 p-2 bg-white/80 hover:bg-white rounded-full transition-colors">
                <Heart className="h-5 w-5 text-gray-600 hover:text-red-500" />
              </button>
            </div>
            
            <CardContent className="flex-1 p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                    {property.title}
                  </h3>
                  <p className="text-gray-600 flex items-center mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    {property.location}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <span><Users className="h-4 w-4 inline mr-1" />{property.max_guests} guests</span>
                    <span>{property.bedrooms} beds</span>
                    <span>{property.bathrooms} baths</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center mb-2">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-700 ml-1">
                      4.8 (124)
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    ${property.price_per_night}/night
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {property.amenities?.map((amenity, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
              
              <p className="text-sm text-gray-500">
                Hosted by {property.profiles?.first_name || 'Host'}
              </p>
            </CardContent>
          </div>
        )}
      </Link>
    </Card>
  );
};

export default PropertyCard;
