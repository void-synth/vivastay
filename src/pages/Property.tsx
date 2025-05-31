
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Users, Bed, Bath, Star, Heart, Share2, Wifi, Car, Utensils, Waves, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Navigation from '@/components/Navigation';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Property } from '@/hooks/useProperties';

interface Review {
  id: string;
  rating: number;
  comment: string;
  created_at: string;
  profiles: {
    first_name: string;
    last_name: string;
    avatar_url?: string;
  };
}

const PropertyPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [property, setProperty] = useState<Property | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  
  // Booking form state
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    if (id) {
      fetchProperty();
      fetchReviews();
    }
  }, [id]);

  const fetchProperty = async () => {
    if (!id) return;
    
    try {
      const { data, error } = await supabase
        .from('properties')
        .select(`
          *,
          profiles:host_id (
            first_name,
            last_name,
            avatar_url,
            bio
          )
        `)
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching property:', error);
        toast({
          title: "Error",
          description: "Failed to load property",
          variant: "destructive",
        });
        navigate('/browse');
        return;
      }

      setProperty(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    if (!id) return;
    
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select(`
          *,
          profiles:guest_id (
            first_name,
            last_name,
            avatar_url
          )
        `)
        .eq('property_id', id)
        .order('created_at', { ascending: false });

      if (!error && data) {
        setReviews(data);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleBooking = async () => {
    if (!property || !checkIn || !checkOut) {
      toast({
        title: "Missing Information",
        description: "Please select check-in and check-out dates",
        variant: "destructive",
      });
      return;
    }

    setBookingLoading(true);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "Please log in to make a booking",
          variant: "destructive",
        });
        navigate('/login');
        return;
      }

      const checkInDate = new Date(checkIn);
      const checkOutDate = new Date(checkOut);
      const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 3600 * 24));
      const totalAmount = nights * property.price_per_night;

      const { error } = await supabase
        .from('bookings')
        .insert({
          property_id: property.id,
          guest_id: user.id,
          check_in_date: checkIn,
          check_out_date: checkOut,
          guest_count: guests,
          total_amount: totalAmount,
          status: 'pending'
        });

      if (error) {
        console.error('Booking error:', error);
        toast({
          title: "Booking Failed",
          description: "There was an error creating your booking",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Booking Successful!",
        description: "Your booking request has been submitted",
      });
      
      navigate('/guest-dashboard');
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setBookingLoading(false);
    }
  };

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0;
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    return Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 3600 * 24));
  };

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'wifi': return <Wifi className="h-5 w-5" />;
      case 'parking': return <Car className="h-5 w-5" />;
      case 'kitchen': return <Utensils className="h-5 w-5" />;
      case 'pool': return <Waves className="h-5 w-5" />;
      default: return null;
    }
  };

  const nextImage = () => {
    if (property?.images) {
      setSelectedImage((prev) => (prev + 1) % property.images.length);
    }
  };

  const prevImage = () => {
    if (property?.images) {
      setSelectedImage((prev) => (prev - 1 + property.images.length) % property.images.length);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="bg-gray-300 h-96 rounded-xl mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-gray-300 h-8 w-3/4 mb-4 rounded"></div>
                <div className="bg-gray-300 h-4 w-1/2 mb-6 rounded"></div>
                <div className="bg-gray-300 h-32 rounded"></div>
              </div>
              <div className="bg-gray-300 h-96 rounded-xl"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Property not found</h1>
          <Button onClick={() => navigate('/browse')} size="lg">
            Browse Properties
          </Button>
        </div>
      </div>
    );
  }

  const defaultImage = "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop";
  const images = property.images && property.images.length > 0 ? property.images : [defaultImage];
  const averageRating = reviews.length > 0 ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length : 0;

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">{property.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-4">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
              <span className="font-medium">{averageRating.toFixed(1)}</span>
              <span className="ml-1">({reviews.length} reviews)</span>
            </div>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              {property.location}
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline" size="sm" className="hover:bg-gray-50">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setIsFavorited(!isFavorited)}
              className="hover:bg-gray-50"
            >
              <Heart className={`h-4 w-4 mr-2 ${isFavorited ? 'fill-red-500 text-red-500' : ''}`} />
              Save
            </Button>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="mb-8">
          {showAllPhotos ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${property.title} ${index + 1}`}
                  className="w-full h-64 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => {
                    setSelectedImage(index);
                    setShowAllPhotos(false);
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2 h-96 md:h-80">
              <div className="md:col-span-2 md:row-span-2 relative">
                <img
                  src={images[selectedImage]}
                  alt={property.title}
                  className="w-full h-full object-cover rounded-l-xl md:rounded-l-xl"
                />
                {images.length > 1 && (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white"
                      onClick={prevImage}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white"
                      onClick={nextImage}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </>
                )}
              </div>
              {images.slice(1, 5).map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image}
                    alt={`${property.title} ${index + 2}`}
                    className="w-full h-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => setSelectedImage(index + 1)}
                  />
                  {index === 3 && images.length > 5 && (
                    <div 
                      className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-r-xl cursor-pointer hover:bg-opacity-40 transition-all"
                      onClick={() => setShowAllPhotos(true)}
                    >
                      <span className="text-white font-semibold">Show all {images.length} photos</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Property Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Host Info */}
            <div className="border-b pb-6">
              <div className="flex items-center gap-4 mb-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={property.profiles?.avatar_url} />
                  <AvatarFallback className="text-lg">
                    {property.profiles?.first_name?.[0]}{property.profiles?.last_name?.[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-2xl font-semibold">
                    Hosted by {property.profiles?.first_name} {property.profiles?.last_name}
                  </h2>
                  <div className="flex items-center gap-4 text-gray-600 mt-1">
                    <span>Superhost</span>
                    <span>•</span>
                    <span>5 years hosting</span>
                  </div>
                </div>
              </div>

              {/* Property Stats */}
              <div className="flex gap-8 text-gray-700">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  <span>{property.max_guests} guests</span>
                </div>
                <div className="flex items-center gap-2">
                  <Bed className="h-5 w-5" />
                  <span>{property.bedrooms} bedrooms</span>
                </div>
                <div className="flex items-center gap-2">
                  <Bath className="h-5 w-5" />
                  <span>{property.bathrooms} bathrooms</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="border-b pb-6">
              <h3 className="text-xl font-semibold mb-4">About this place</h3>
              <p className="text-gray-700 leading-relaxed text-lg">{property.description}</p>
            </div>

            {/* Amenities */}
            <div className="border-b pb-6">
              <h3 className="text-xl font-semibold mb-6">What this place offers</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {property.amenities?.map((amenity, index) => (
                  <div key={index} className="flex items-center gap-4 py-2">
                    <div className="text-gray-600">
                      {getAmenityIcon(amenity)}
                    </div>
                    <span className="text-gray-800">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Star className="h-6 w-6 text-yellow-400 fill-current" />
                <h3 className="text-xl font-semibold">
                  {averageRating.toFixed(1)} · {reviews.length} reviews
                </h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {reviews.slice(0, 6).map((review) => (
                  <div key={review.id} className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={review.profiles?.avatar_url} />
                        <AvatarFallback>
                          {review.profiles?.first_name?.[0]}{review.profiles?.last_name?.[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">
                          {review.profiles?.first_name} {review.profiles?.last_name}
                        </p>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                              }`}
                            />
                          ))}
                          <span className="text-sm text-gray-500 ml-2">
                            {new Date(review.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed">{review.comment}</p>
                  </div>
                ))}
              </div>
              
              {reviews.length > 6 && (
                <Button variant="outline" className="mt-6">
                  Show all {reviews.length} reviews
                </Button>
              )}
            </div>
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8 shadow-xl border-0">
              <CardHeader className="pb-4">
                <CardTitle className="flex justify-between items-center">
                  <span className="text-2xl">${property.price_per_night}<span className="text-base font-normal text-gray-600">/night</span></span>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                    <span className="text-sm font-medium">{averageRating.toFixed(1)}</span>
                    <span className="text-sm text-gray-500 ml-1">({reviews.length})</span>
                  </div>
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-0 border rounded-lg">
                  <div className="border-r border-b p-3">
                    <label className="block text-xs font-medium text-gray-700 mb-1 uppercase tracking-wide">
                      Check-in
                    </label>
                    <Input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="border-0 p-0 h-auto text-sm focus-visible:ring-0"
                    />
                  </div>
                  <div className="border-b p-3">
                    <label className="block text-xs font-medium text-gray-700 mb-1 uppercase tracking-wide">
                      Check-out
                    </label>
                    <Input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      min={checkIn || new Date().toISOString().split('T')[0]}
                      className="border-0 p-0 h-auto text-sm focus-visible:ring-0"
                    />
                  </div>
                  <div className="col-span-2 p-3">
                    <label className="block text-xs font-medium text-gray-700 mb-1 uppercase tracking-wide">
                      Guests
                    </label>
                    <Input
                      type="number"
                      value={guests}
                      onChange={(e) => setGuests(parseInt(e.target.value))}
                      min={1}
                      max={property.max_guests}
                      className="border-0 p-0 h-auto text-sm focus-visible:ring-0"
                    />
                  </div>
                </div>

                <Button 
                  className="w-full bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-semibold py-3 text-base" 
                  onClick={handleBooking}
                  disabled={bookingLoading || !checkIn || !checkOut}
                  size="lg"
                >
                  {bookingLoading ? 'Booking...' : 'Reserve'}
                </Button>
                
                <p className="text-center text-sm text-gray-500">
                  You won't be charged yet
                </p>

                {checkIn && checkOut && (
                  <div className="space-y-3 pt-4 border-t">
                    <div className="flex justify-between text-sm">
                      <span>${property.price_per_night} x {calculateNights()} nights</span>
                      <span>${property.price_per_night * calculateNights()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Cleaning fee</span>
                      <span>${Math.round(property.price_per_night * 0.15)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Service fee</span>
                      <span>${Math.round(property.price_per_night * calculateNights() * 0.1)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold text-base">
                      <span>Total</span>
                      <span>${Math.round(property.price_per_night * calculateNights() * 1.25)}</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyPage;
