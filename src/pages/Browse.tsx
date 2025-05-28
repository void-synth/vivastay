
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, MapPin, Users, Calendar, Star, Heart, Grid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

const Browse = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [searchLocation, setSearchLocation] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [propertyType, setPropertyType] = useState('all');
  const [amenities, setAmenities] = useState([]);

  const properties = [
    {
      id: 1,
      title: "Luxury Beachfront Villa",
      location: "Malibu, California",
      price: 450,
      rating: 4.9,
      reviews: 127,
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop",
      host: "Sarah",
      type: "Villa",
      guests: 8,
      bedrooms: 4,
      bathrooms: 3,
      amenities: ["Pool", "Beach Access", "WiFi", "Kitchen", "Parking", "Hot Tub"]
    },
    {
      id: 2,
      title: "Cozy Mountain Retreat",
      location: "Aspen, Colorado",
      price: 320,
      rating: 4.8,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=300&fit=crop",
      host: "Michael",
      type: "Cabin",
      guests: 6,
      bedrooms: 3,
      bathrooms: 2,
      amenities: ["Fireplace", "Hot Tub", "Ski Access", "WiFi", "Kitchen"]
    },
    {
      id: 3,
      title: "Downtown Loft",
      location: "New York, NY",
      price: 180,
      rating: 4.7,
      reviews: 203,
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=300&fit=crop",
      host: "Emma",
      type: "Apartment",
      guests: 4,
      bedrooms: 2,
      bathrooms: 1,
      amenities: ["City View", "Gym", "WiFi", "Kitchen", "Elevator"]
    },
    {
      id: 4,
      title: "Charming Countryside Cottage",
      location: "Tuscany, Italy",
      price: 280,
      rating: 4.9,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop",
      host: "Marco",
      type: "Cottage",
      guests: 5,
      bedrooms: 2,
      bathrooms: 2,
      amenities: ["Garden", "WiFi", "Kitchen", "Parking", "Fireplace"]
    },
    {
      id: 5,
      title: "Modern City Apartment",
      location: "Tokyo, Japan",
      price: 220,
      rating: 4.6,
      reviews: 94,
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop",
      host: "Yuki",
      type: "Apartment",
      guests: 3,
      bedrooms: 1,
      bathrooms: 1,
      amenities: ["City View", "WiFi", "Kitchen", "Balcony"]
    },
    {
      id: 6,
      title: "Seaside Beach House",
      location: "Gold Coast, Australia",
      price: 380,
      rating: 4.8,
      reviews: 112,
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=300&fit=crop",
      host: "Jake",
      type: "House",
      guests: 10,
      bedrooms: 5,
      bathrooms: 3,
      amenities: ["Beach Access", "Pool", "BBQ", "WiFi", "Kitchen", "Parking"]
    }
  ];

  const availableAmenities = [
    "WiFi", "Kitchen", "Pool", "Hot Tub", "Parking", "Fireplace",
    "Beach Access", "City View", "Garden", "Gym", "Balcony", "BBQ"
  ];

  const toggleAmenity = (amenity) => {
    setAmenities(prev => 
      prev.includes(amenity) 
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold text-emerald-600">
                VivaStay
              </Link>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/browse" className="text-emerald-600 font-medium">
                Browse
              </Link>
              <Link to="/host" className="text-gray-700 hover:text-emerald-600 transition-colors">
                Become a Host
              </Link>
              <Link to="/login" className="text-gray-700 hover:text-emerald-600 transition-colors">
                Log in
              </Link>
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                Sign up
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters Header */}
        <div className="mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-end">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Where</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Search destinations"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2"
                >
                  <Filter className="h-4 w-4" />
                  Filters
                </Button>
                
                <div className="flex border rounded-lg">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="rounded-r-none"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="rounded-l-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="bg-white rounded-lg shadow-sm p-6 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
                  <Select value={propertyType} onValueChange={setPropertyType}>
                    <SelectTrigger>
                      <SelectValue placeholder="All types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All types</SelectItem>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="house">House</SelectItem>
                      <SelectItem value="villa">Villa</SelectItem>
                      <SelectItem value="cabin">Cabin</SelectItem>
                      <SelectItem value="cottage">Cottage</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Min"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                    />
                    <Input
                      placeholder="Max"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="lg:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Amenities</label>
                  <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
                    {availableAmenities.map((amenity) => (
                      <div key={amenity} className="flex items-center space-x-2">
                        <Checkbox
                          id={amenity}
                          checked={amenities.includes(amenity)}
                          onCheckedChange={() => toggleAmenity(amenity)}
                        />
                        <label htmlFor={amenity} className="text-sm text-gray-700">
                          {amenity}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            {properties.length} stays found
          </h1>
          <Select defaultValue="recommended">
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recommended">Recommended</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Properties Grid/List */}
        <div className={viewMode === 'grid' 
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
          : "space-y-6"
        }>
          {properties.map((property) => (
            <Card key={property.id} className="group cursor-pointer border-0 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <Link to={`/property/${property.id}`}>
                {viewMode === 'grid' ? (
                  <>
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img
                        src={property.image}
                        alt={property.title}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <button className="absolute top-4 right-4 p-2 bg-white/80 hover:bg-white rounded-full transition-colors">
                        <Heart className="h-5 w-5 text-gray-600 hover:text-red-500" />
                      </button>
                      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
                        <span className="text-sm font-medium text-gray-900">
                          ${property.price}/night
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
                            {property.rating}
                          </span>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-3 flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {property.location}
                      </p>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                        <span>{property.guests} guests</span>
                        <span>{property.bedrooms} beds</span>
                        <span>{property.bathrooms} baths</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {property.amenities.slice(0, 3).map((amenity) => (
                          <span
                            key={amenity}
                            className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full"
                          >
                            {amenity}
                          </span>
                        ))}
                        {property.amenities.length > 3 && (
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
                        src={property.image}
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
                            <span>{property.guests} guests</span>
                            <span>{property.bedrooms} beds</span>
                            <span>{property.bathrooms} baths</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center mb-2">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="text-sm font-medium text-gray-700 ml-1">
                              {property.rating} ({property.reviews})
                            </span>
                          </div>
                          <div className="text-2xl font-bold text-gray-900">
                            ${property.price}/night
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {property.amenities.map((amenity) => (
                          <span
                            key={amenity}
                            className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full"
                          >
                            {amenity}
                          </span>
                        ))}
                      </div>
                      
                      <p className="text-sm text-gray-500">
                        Hosted by {property.host} • {property.reviews} reviews
                      </p>
                    </CardContent>
                  </div>
                )}
              </Link>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" className="px-8 py-3">
            Load More Properties
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Browse;
