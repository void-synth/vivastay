
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Users, Calendar, Star, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import Navigation from '@/components/Navigation';

const Index = () => {
  const [searchLocation, setSearchLocation] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('1');

  const featuredProperties = [
    {
      id: 1,
      title: "Luxury Beachfront Villa",
      location: "Malibu, California",
      price: 450,
      rating: 4.9,
      reviews: 127,
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop",
      host: "Sarah",
      amenities: ["Pool", "Beach Access", "WiFi", "Kitchen"]
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
      amenities: ["Fireplace", "Hot Tub", "Ski Access", "WiFi"]
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
      amenities: ["City View", "Gym", "WiFi", "Kitchen"]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/lovable-uploads/5eb8f437-daa8-4b94-bf27-0fa4c9915334.png')"
          }}
        />
        
        {/* Overlay gradient for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/30 to-black/40"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12 pt-20">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-2xl">
              Find your perfect
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 block">
                getaway
              </span>
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto drop-shadow-lg">
              Discover unique stays and experiences around the world, from cozy cabins to luxury villas.
            </p>
          </div>

          {/* Search Bar */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 max-w-4xl mx-auto border border-white/20">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">Where</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Search destinations"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    className="pl-10 border-gray-200 focus:border-emerald-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Check in</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="pl-10 border-gray-200 focus:border-emerald-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Check out</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="pl-10 border-gray-200 focus:border-emerald-500"
                  />
                </div>
              </div>
              
              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-700 mb-1">Guests</label>
                <div className="flex">
                  <div className="relative flex-1">
                    <Users className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      placeholder="Add guests"
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className="pl-10 border-gray-200 focus:border-emerald-500"
                    />
                  </div>
                  <Button className="ml-2 bg-emerald-600 hover:bg-emerald-700 shadow-lg">
                    <Search className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Stays Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Stays</h2>
            <p className="text-lg text-gray-600">Handpicked properties loved by our guests</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property) => (
              <Card key={property.id} className="group cursor-pointer border-0 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
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
                  
                  <p className="text-sm text-gray-500 mb-4">
                    Hosted by {property.host} • {property.reviews} reviews
                  </p>
                  
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
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/browse">
              <Button className="bg-emerald-600 hover:bg-emerald-700 px-8 py-3 text-lg">
                View All Properties
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How VivaStay Works</h2>
            <p className="text-lg text-gray-600">Your perfect stay is just three steps away</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-emerald-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Search className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Search & Discover</h3>
              <p className="text-gray-600">
                Browse thousands of unique properties and find the perfect stay for your trip.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-emerald-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Calendar className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Book Instantly</h3>
              <p className="text-gray-600">
                Select your dates, choose your guests, and book your stay with just a few clicks.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-emerald-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Heart className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Enjoy Your Stay</h3>
              <p className="text-gray-600">
                Relax and enjoy your perfect getaway with 24/7 support and host assistance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-emerald-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to start hosting?</h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
            Share your space and earn extra income by becoming a VivaStay host. It's easy to get started.
          </p>
          <Link to="/host">
            <Button className="bg-white text-emerald-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold">
              Become a Host
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-emerald-400 mb-4">VivaStay</h3>
              <p className="text-gray-400">
                Your trusted platform for unique stays and unforgettable experiences around the world.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Safety Information</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cancellation Options</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Community</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">VivaStay Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Host Resources</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community Forum</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Referral Program</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Hosting</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Host Your Home</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Host Guarantee</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Host Resources</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community Standards</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 VivaStay. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
