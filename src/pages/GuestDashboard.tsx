
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Star, User, CreditCard, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/Navigation';

const GuestDashboard = () => {
  const [activeTab, setActiveTab] = useState('bookings');

  const upcomingBookings = [
    {
      id: 1,
      property: "Luxury Beachfront Villa",
      location: "Malibu, California",
      checkIn: "2024-07-15",
      checkOut: "2024-07-20",
      guests: 4,
      total: 2250,
      status: "Confirmed",
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=300&h=200&fit=crop",
      host: "Sarah"
    },
    {
      id: 2,
      property: "Cozy Mountain Retreat",
      location: "Aspen, Colorado",
      checkIn: "2024-08-10",
      checkOut: "2024-08-15",
      guests: 2,
      total: 1600,
      status: "Pending",
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=300&h=200&fit=crop",
      host: "Michael"
    }
  ];

  const pastBookings = [
    {
      id: 3,
      property: "Downtown Loft",
      location: "New York, NY",
      checkIn: "2024-05-01",
      checkOut: "2024-05-05",
      guests: 2,
      total: 720,
      status: "Completed",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=300&h=200&fit=crop",
      host: "Emma",
      canReview: true
    }
  ];

  const favoriteProperties = [
    {
      id: 1,
      title: "Seaside Cottage",
      location: "Cape Cod, Massachusetts",
      price: 280,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=300&h=200&fit=crop"
    },
    {
      id: 2,
      title: "Urban Studio",
      location: "San Francisco, CA",
      price: 150,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=300&h=200&fit=crop"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Confirmed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'Pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'Completed':
        return <CheckCircle className="h-4 w-4 text-blue-500" />;
      default:
        return <XCircle className="h-4 w-4 text-red-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Guest Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your bookings and travel plans</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="bookings">My Bookings</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="bookings" className="space-y-6">
            {/* Upcoming Bookings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Upcoming Trips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingBookings.map((booking) => (
                    <div key={booking.id} className="flex items-center space-x-4 p-4 bg-white rounded-lg border shadow-sm">
                      <img
                        src={booking.image}
                        alt={booking.property}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{booking.property}</h3>
                        <p className="text-sm text-gray-600 flex items-center mt-1">
                          <MapPin className="h-4 w-4 mr-1" />
                          {booking.location}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          {booking.checkIn} - {booking.checkOut} • {booking.guests} guests
                        </p>
                        <p className="text-sm text-gray-500">Hosted by {booking.host}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">${booking.total}</p>
                        <div className="flex items-center mt-2">
                          {getStatusIcon(booking.status)}
                          <Badge 
                            variant={booking.status === 'Confirmed' ? 'default' : 'outline'}
                            className="ml-2"
                          >
                            {booking.status}
                          </Badge>
                        </div>
                        <Button variant="outline" size="sm" className="mt-2">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Past Bookings */}
            <Card>
              <CardHeader>
                <CardTitle>Past Trips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pastBookings.map((booking) => (
                    <div key={booking.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                      <img
                        src={booking.image}
                        alt={booking.property}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{booking.property}</h3>
                        <p className="text-sm text-gray-600 flex items-center mt-1">
                          <MapPin className="h-4 w-4 mr-1" />
                          {booking.location}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          {booking.checkIn} - {booking.checkOut} • {booking.guests} guests
                        </p>
                      </div>
                      <div className="text-right space-y-2">
                        <p className="font-semibold text-gray-900">${booking.total}</p>
                        <Badge variant="secondary">{booking.status}</Badge>
                        {booking.canReview && (
                          <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                            Write Review
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="favorites" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Saved Properties</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {favoriteProperties.map((property) => (
                    <div key={property.id} className="bg-white rounded-lg shadow-sm border overflow-hidden">
                      <img
                        src={property.image}
                        alt={property.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-2">{property.title}</h3>
                        <p className="text-sm text-gray-600 flex items-center mb-2">
                          <MapPin className="h-4 w-4 mr-1" />
                          {property.location}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="text-sm font-medium text-gray-700 ml-1">
                              {property.rating}
                            </span>
                          </div>
                          <p className="font-semibold text-gray-900">${property.price}/night</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>My Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Star className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews yet</h3>
                  <p className="text-gray-600 mb-6">
                    After your stays, you can leave reviews to help other travelers.
                  </p>
                  <Link to="/browse">
                    <Button className="bg-emerald-600 hover:bg-emerald-700">
                      Book Your First Stay
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <p className="text-gray-900">John</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <p className="text-gray-900">Doe</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <p className="text-gray-900">john.doe@example.com</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <p className="text-gray-900">+1 (555) 123-4567</p>
                  </div>
                  <Button variant="outline" className="w-full">
                    Edit Profile
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="h-5 w-5 mr-2" />
                    Payment Methods
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">•••• •••• •••• 4567</p>
                        <p className="text-sm text-gray-600">Expires 12/25</p>
                      </div>
                      <Badge variant="outline">Primary</Badge>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    Add Payment Method
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default GuestDashboard;
