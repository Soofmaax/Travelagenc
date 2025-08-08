import React from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { CalendarCheck, MapPin, Users, Mail, Send, Download, Printer } from 'lucide-react';
import { Trip } from '../data/trips';

interface BookingFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  passengers: number;
  departureDate: string;
  specialRequests: string;
}

interface LocationState {
  formData: BookingFormData;
  trip: Trip;
}

const ConfirmationPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const { formData, trip } = (location.state as LocationState) || { formData: null, trip: null };

  // If we don't have the data in location state, we'd normally fetch it from the server
  // For this demo, we'll just show a generic confirmation if data is missing
  
  return (
    <div>
      {/* Header */}
      <section className="pt-24 pb-16 bg-blue-900 text-white">
        <div className="container-custom text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500 text-white rounded-full mb-6">
            <CalendarCheck size={40} />
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-4">
            Booking Confirmed!
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Thank you for booking with VoyageExplore. Your adventure is waiting!
          </p>
        </div>
      </section>

      {/* Confirmation Details */}
      <section className="section bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Booking Header */}
              <div className="bg-blue-900 text-white p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h2 className="font-serif text-2xl font-bold">Booking #{id}</h2>
                    <p className="text-blue-100">
                      {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                  </div>
                  <div className="mt-4 md:mt-0 space-x-2">
                    <button className="inline-flex items-center bg-white text-blue-900 px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-50 transition">
                      <Download size={16} className="mr-2" />
                      Download
                    </button>
                    <button className="inline-flex items-center bg-white text-blue-900 px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-50 transition">
                      <Printer size={16} className="mr-2" />
                      Print
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Booking Content */}
              <div className="p-6 md:p-8">
                {formData && trip ? (
                  <>
                    {/* Trip Info */}
                    <div className="flex flex-col md:flex-row mb-10 pb-6 border-b">
                      <div className="md:w-1/3 mb-4 md:mb-0">
                        <img
                          src={trip.image}
                          alt={trip.title}
                          className="w-full h-48 object-cover rounded-md"
                        />
                      </div>
                      <div className="md:w-2/3 md:pl-8">
                        <h3 className="font-serif text-2xl font-semibold mb-2">{trip.title}</h3>
                        <div className="flex items-center text-gray-600 mb-4">
                          <MapPin size={16} className="mr-1" />
                          <span>{trip.destination}</span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                              <CalendarCheck size={18} className="text-blue-900" />
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Departure Date</p>
                              <p className="font-medium">
                                {new Date(formData.departureDate).toLocaleDateString('en-US', { 
                                  day: 'numeric', 
                                  month: 'long', 
                                  year: 'numeric' 
                                })}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                              <Users size={18} className="text-blue-900" />
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Travelers</p>
                              <p className="font-medium">{formData.passengers} {formData.passengers === 1 ? 'person' : 'people'}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Traveler Info */}
                    <div className="mb-10">
                      <h3 className="font-serif text-xl font-semibold mb-4">Traveler Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Lead Traveler</p>
                          <p className="font-medium">{formData.firstName} {formData.lastName}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Contact Email</p>
                          <p className="font-medium">{formData.email}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Contact Phone</p>
                          <p className="font-medium">{formData.phone}</p>
                        </div>
                        
                        {formData.specialRequests && (
                          <div className="md:col-span-2">
                            <p className="text-sm text-gray-600 mb-1">Special Requests</p>
                            <p>{formData.specialRequests}</p>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Payment Summary */}
                    <div className="mb-10">
                      <h3 className="font-serif text-xl font-semibold mb-4">Payment Summary</h3>
                      <div className="bg-gray-50 p-6 rounded-md">
                        <div className="space-y-3">
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
                            <span>€{trip.price * formData.passengers}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <h3 className="font-serif text-2xl font-semibold mb-4">Your Booking is Confirmed!</h3>
                    <p className="text-gray-600 mb-4">
                      Booking reference: #{id}
                    </p>
                    <p className="text-gray-600">
                      A confirmation email has been sent with your booking details.
                    </p>
                  </div>
                )}
                
                {/* Next Steps */}
                <div>
                  <h3 className="font-serif text-xl font-semibold mb-4">Next Steps</h3>
                  <div className="bg-blue-50 p-6 rounded-md">
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <div className="mr-3 bg-blue-900 text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">
                          1
                        </div>
                        <div>
                          <h4 className="font-medium text-blue-900">Check your email</h4>
                          <p className="text-gray-600">
                            We've sent a detailed confirmation email to {formData?.email || 'your email address'} with all your booking information.
                          </p>
                        </div>
                      </li>
                      
                      <li className="flex items-start">
                        <div className="mr-3 bg-blue-900 text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">
                          2
                        </div>
                        <div>
                          <h4 className="font-medium text-blue-900">Complete your payment</h4>
                          <p className="text-gray-600">
                            Follow the secure payment link in your email to complete your booking within 48 hours.
                          </p>
                        </div>
                      </li>
                      
                      <li className="flex items-start">
                        <div className="mr-3 bg-blue-900 text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">
                          3
                        </div>
                        <div>
                          <h4 className="font-medium text-blue-900">Receive travel documents</h4>
                          <p className="text-gray-600">
                            After payment, we'll send your detailed itinerary and travel documents approximately 2 weeks before departure.
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                
                {/* Contact Support */}
                <div className="mt-10 text-center">
                  <h3 className="font-serif text-xl font-semibold mb-4">Need Assistance?</h3>
                  <p className="text-gray-600 mb-6">
                    Our travel experts are here to help with any questions or special requirements.
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <a href="mailto:support@voyageexplore.com" className="inline-flex items-center justify-center bg-blue-900 hover:bg-blue-800 text-white px-6 py-3 rounded-md transition">
                      <Mail size={18} className="mr-2" />
                      Email Support
                    </a>
                    <a href="tel:+33123456789" className="inline-flex items-center justify-center bg-amber-500 hover:bg-amber-400 text-white px-6 py-3 rounded-md transition">
                      <Send size={18} className="mr-2" />
                      Call Us
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-10">
              <Link to="/" className="text-blue-900 hover:text-blue-700 font-medium">
                Return to Homepage
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ConfirmationPage;