import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { trips } from '../data/trips';
import { Calendar, Users, CreditCard, Check, Mail, Phone, User } from 'lucide-react';

interface BookingFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  passengers: number;
  departureDate: string;
  specialRequests: string;
  agreeTerms: boolean;
}

const BookingPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const selectedDateFromUrl = searchParams.get('date') || '';
  
  const trip = id ? trips.find(t => t.id === Number(id)) : null;
  
  const [formData, setFormData] = useState<BookingFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    passengers: 1,
    departureDate: selectedDateFromUrl,
    specialRequests: '',
    agreeTerms: false
  });

  const [errors, setErrors] = useState<Partial<BookingFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Update departure date if URL param changes
    if (selectedDateFromUrl) {
      setFormData(prev => ({ ...prev, departureDate: selectedDateFromUrl }));
    }
  }, [selectedDateFromUrl]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    
    // Clear error when field is being edited
    if (errors[name as keyof BookingFormData]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<BookingFormData> = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.departureDate) newErrors.departureDate = 'Please select a departure date';
    if (!formData.agreeTerms) newErrors.agreeTerms = 'You must agree to the terms and conditions';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        
        // Generate a booking ID
        const bookingId = Math.floor(Math.random() * 1000000);
        
        // Navigate to confirmation page
        navigate(`/confirmation/${bookingId}`, { 
          state: { 
            formData,
            trip
          }
        });
      }, 1500);
    }
  };

  const calculateTotal = () => {
    if (!trip) return 0;
    return trip.price * formData.passengers;
  };

  return (
    <div>
      {/* Header */}
      <section className="pt-24 pb-12 bg-blue-900 text-white">
        <div className="container-custom">
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-4">
            {trip ? `Book Your ${trip.title} Adventure` : 'Book Your Trip'}
          </h1>
          <p className="text-blue-100 max-w-2xl">
            Complete the form below to secure your booking. Our team will contact you to confirm all details.
          </p>
        </div>
      </section>

      {/* Booking Form */}
      <section className="section bg-gray-50">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Form */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-lg shadow-md p-8">
                <form onSubmit={handleSubmit}>
                  <h2 className="font-serif text-2xl font-semibold mb-6 pb-2 border-b">Traveler Information</h2>
                  
                  {/* Personal Information */}
                  <div className="space-y-6 mb-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="firstName" className="block text-gray-700 mb-2">First Name *</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User size={18} className="text-gray-500" />
                          </div>
                          <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className={`pl-10 input-field ${errors.firstName ? 'border-red-500 focus:ring-red-500' : ''}`}
                          />
                        </div>
                        {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                      </div>
                      
                      <div>
                        <label htmlFor="lastName" className="block text-gray-700 mb-2">Last Name *</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User size={18} className="text-gray-500" />
                          </div>
                          <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className={`pl-10 input-field ${errors.lastName ? 'border-red-500 focus:ring-red-500' : ''}`}
                          />
                        </div>
                        {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="email" className="block text-gray-700 mb-2">Email *</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail size={18} className="text-gray-500" />
                          </div>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`pl-10 input-field ${errors.email ? 'border-red-500 focus:ring-red-500' : ''}`}
                          />
                        </div>
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                      </div>
                      
                      <div>
                        <label htmlFor="phone" className="block text-gray-700 mb-2">Phone *</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Phone size={18} className="text-gray-500" />
                          </div>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className={`pl-10 input-field ${errors.phone ? 'border-red-500 focus:ring-red-500' : ''}`}
                          />
                        </div>
                        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                      </div>
                    </div>
                  </div>
                  
                  {/* Trip Details */}
                  <h2 className="font-serif text-2xl font-semibold mb-6 pb-2 border-b">Trip Details</h2>
                  
                  <div className="space-y-6 mb-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="departureDate" className="block text-gray-700 mb-2">Departure Date *</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Calendar size={18} className="text-gray-500" />
                          </div>
                          <select
                            id="departureDate"
                            name="departureDate"
                            value={formData.departureDate}
                            onChange={handleChange}
                            className={`pl-10 input-field ${errors.departureDate ? 'border-red-500 focus:ring-red-500' : ''}`}
                          >
                            <option value="">Select a departure date</option>
                            {trip?.departureDate.map((date, index) => (
                              <option key={index} value={date}>
                                {new Date(date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                              </option>
                            ))}
                            {!trip && (
                              <>
                                <option value="2025-05-15">May 15, 2025</option>
                                <option value="2025-06-12">June 12, 2025</option>
                                <option value="2025-07-17">July 17, 2025</option>
                              </>
                            )}
                          </select>
                        </div>
                        {errors.departureDate && <p className="text-red-500 text-sm mt-1">{errors.departureDate}</p>}
                      </div>
                      
                      <div>
                        <label htmlFor="passengers" className="block text-gray-700 mb-2">Number of Travelers *</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Users size={18} className="text-gray-500" />
                          </div>
                          <select
                            id="passengers"
                            name="passengers"
                            value={formData.passengers}
                            onChange={handleChange}
                            className="pl-10 input-field"
                          >
                            {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                              <option key={num} value={num}>{num} {num === 1 ? 'traveler' : 'travelers'}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="specialRequests" className="block text-gray-700 mb-2">Special Requests (Optional)</label>
                      <textarea
                        id="specialRequests"
                        name="specialRequests"
                        value={formData.specialRequests}
                        onChange={handleChange}
                        rows={4}
                        className="input-field"
                        placeholder="Special dietary requirements, accessibility needs, or other requests..."
                      ></textarea>
                    </div>
                  </div>
                  
                  {/* Terms and Conditions */}
                  <div className="mb-8">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="agreeTerms"
                          name="agreeTerms"
                          type="checkbox"
                          checked={formData.agreeTerms}
                          onChange={handleChange}
                          className="w-4 h-4 text-blue-900 rounded border-gray-300 focus:ring-blue-900"
                        />
                      </div>
                      <label htmlFor="agreeTerms" className="ml-2 text-sm text-gray-700">
                        I agree to the <a href="/legal" className="text-blue-900 hover:underline">terms and conditions</a> and cancellation policy
                      </label>
                    </div>
                    {errors.agreeTerms && <p className="text-red-500 text-sm mt-1">{errors.agreeTerms}</p>}
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`btn-primary w-full py-3 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? 'Processing...' : 'Complete Booking'}
                  </button>
                </form>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <h3 className="font-serif text-xl font-semibold mb-6 pb-2 border-b">Booking Summary</h3>
                
                {trip ? (
                  <>
                    <div className="flex items-center mb-6">
                      <img
                        src={trip.image}
                        alt={trip.title}
                        className="w-20 h-20 object-cover rounded-md mr-4"
                      />
                      <div>
                        <h4 className="font-medium text-lg">{trip.title}</h4>
                        <p className="text-gray-600">{trip.destination}</p>
                        <p className="text-sm text-gray-500">{trip.duration} days</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Price per person</span>
                        <span>€{trip.price}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Travelers</span>
                        <span>x{formData.passengers}</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg pt-3 border-t">
                        <span>Total</span>
                        <span>€{calculateTotal()}</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-gray-600 mb-4">Please select a trip from our destinations page to see the booking summary.</p>
                    <a href="/trips" className="btn-primary">Browse Trips</a>
                  </div>
                )}
                
                <div className="bg-gray-50 p-4 rounded-md mt-6">
                  <h4 className="font-medium text-gray-800 mb-3 flex items-center">
                    <CreditCard size={18} className="mr-2" />
                    Payment Information
                  </h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Your booking will be confirmed after you complete this form. Payment details will be requested via secure link sent to your email.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start text-sm text-gray-600">
                      <Check size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                      <span>No deposit required today</span>
                    </li>
                    <li className="flex items-start text-sm text-gray-600">
                      <Check size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                      <span>Secure payment process</span>
                    </li>
                    <li className="flex items-start text-sm text-gray-600">
                      <Check size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                      <span>Free cancellation up to 30 days before departure</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BookingPage;