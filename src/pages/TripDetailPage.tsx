import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { trips } from '../data/trips';
import { Calendar, MapPin, Clock, Star, Users, Check, ChevronRight, ChevronLeft } from 'lucide-react';
import Newsletter from '../components/Newsletter';

const TripDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const trip = trips.find(t => t.id === Number(id));
  
  const [activeImage, setActiveImage] = useState(0);
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    if (!trip) {
      navigate('/trips');
    }
    
    // Reset gallery index when trip changes
    setActiveImage(0);
  }, [trip, navigate]);

  if (!trip) {
    return null;
  }

  const nextImage = () => {
    setActiveImage((prev) => (prev + 1) % trip.gallery.length);
  };

  const prevImage = () => {
    setActiveImage((prev) => (prev === 0 ? trip.gallery.length - 1 : prev - 1));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDate(e.target.value);
  };

  const handleBookNow = () => {
    if (selectedDate) {
      navigate(`/booking/${trip.id}?date=${selectedDate}`);
    } else {
      navigate(`/booking/${trip.id}`);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-blue-900 text-white">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center text-amber-400 mb-3">
                <Star size={20} fill="#F59E0B" className="mr-1" />
                <span className="font-medium mr-2">{trip.rating.toFixed(1)}</span>
                <span className="text-blue-100">({trip.reviews} reviews)</span>
              </div>
              <h1 className="font-serif text-3xl md:text-5xl font-bold mb-2">{trip.title}</h1>
              <div className="flex items-center text-blue-100">
                <MapPin size={18} className="mr-1" />
                <span>{trip.destination}</span>
              </div>
            </div>
            <div className="bg-white text-blue-900 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold mb-1">€{trip.price}</div>
              <div className="text-gray-600">per person</div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-8 bg-gray-50">
        <div className="container-custom">
          <div className="relative">
            <div className="aspect-w-16 aspect-h-9 overflow-hidden rounded-lg">
              <img
                src={trip.gallery[activeImage]}
                alt={`${trip.title} - Image ${activeImage + 1}`}
                className="w-full h-[600px] object-cover"
              />
            </div>
            <button 
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 p-2 rounded-full text-gray-800 shadow-md transition"
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 p-2 rounded-full text-gray-800 shadow-md transition"
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {trip.gallery.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`w-3 h-3 rounded-full ${
                    activeImage === index ? 'bg-white' : 'bg-white bg-opacity-50'
                  }`}
                  aria-label={`View image ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Trip Details */}
            <div className="lg:w-2/3">
              <div className="mb-10">
                <h2 className="font-serif text-2xl md:text-3xl font-bold mb-6 text-blue-900">Overview</h2>
                <p className="text-gray-700 leading-relaxed mb-6">{trip.longDescription}</p>
                <div className="flex flex-wrap gap-6 mt-8">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <Calendar size={20} className="text-blue-900" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Duration</p>
                      <p className="font-medium">{trip.duration} days</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <Clock size={20} className="text-blue-900" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Next Departure</p>
                      <p className="font-medium">{new Date(trip.departureDate[0]).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <Users size={20} className="text-blue-900" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Group Size</p>
                      <p className="font-medium">Max 12 people</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-10">
                <h2 className="font-serif text-2xl md:text-3xl font-bold mb-6 text-blue-900">Highlights</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {trip.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-start">
                      <div className="mt-1 mr-3 text-green-500">
                        <Check size={18} />
                      </div>
                      <p className="text-gray-700">{highlight}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-10">
                <h2 className="font-serif text-2xl md:text-3xl font-bold mb-6 text-blue-900">What's Included</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {trip.included.map((item, index) => (
                    <div key={index} className="flex items-start">
                      <div className="mt-1 mr-3 text-green-500">
                        <Check size={18} />
                      </div>
                      <p className="text-gray-700">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="font-serif text-2xl md:text-3xl font-bold mb-6 text-blue-900">Itinerary</h2>
                <div className="space-y-6">
                  {trip.itinerary.map((day) => (
                    <div key={day.day} className="bg-white p-6 rounded-lg shadow-sm">
                      <div className="flex items-start">
                        <div className="bg-blue-900 text-white w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                          {day.day}
                        </div>
                        <div>
                          <h3 className="font-serif text-xl font-semibold mb-2">{day.title}</h3>
                          <p className="text-gray-700">{day.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Booking Card */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <h3 className="font-serif text-xl font-semibold mb-4">Book This Trip</h3>
                
                <div className="mb-6">
                  <label className="block text-gray-700 mb-2">Select Departure Date</label>
                  <select 
                    value={selectedDate}
                    onChange={handleDateChange}
                    className="input-field"
                  >
                    <option value="">Select a date</option>
                    {trip.departureDate.map((date, index) => (
                      <option key={index} value={date}>
                        {new Date(date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="flex items-center justify-between mb-6 pb-6 border-b">
                  <div className="text-gray-700">Price per person</div>
                  <div className="text-2xl font-bold text-blue-900">€{trip.price}</div>
                </div>
                
                <button
                  onClick={handleBookNow}
                  className="btn-primary w-full mb-4"
                >
                  Book Now
                </button>
                
                <Link
                  to="/trips"
                  className="block text-center py-2 text-blue-900 hover:text-blue-700 transition font-medium"
                >
                  Browse More Trips
                </Link>
                
                <div className="mt-6 text-sm text-gray-600">
                  <p>Need assistance?</p>
                  <p className="font-semibold">Call us at +33 (0)1 23 45 67 89</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <Newsletter />
    </div>
  );
};

export default TripDetailPage;