import React from 'react';

const LegalPage: React.FC = () => {
  return (
    <div>
      {/* Header */}
      <section className="pt-24 pb-12 bg-blue-900 text-white">
        <div className="container-custom">
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-4">
            Terms and Conditions
          </h1>
          <p className="text-blue-100">
            Legal information about booking with VoyageExplore
          </p>
        </div>
      </section>

      {/* Legal Content */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="prose max-w-none">
              <h2>1. General Terms</h2>
              <p>
                These terms and conditions (the "Terms") apply to all travel services offered by VoyageExplore ("we," "us," "our") through our website, by telephone, or at our physical locations. By booking a trip or other services with us, you ("the client," "you") agree to be bound by these Terms.
              </p>
              
              <h2>2. Booking and Payment</h2>
              <p>
                A binding contract between VoyageExplore and the client comes into existence when we confirm your booking in writing and issue a confirmation invoice. The person making the booking (the "lead name") must be at least 18 years old and possess the legal capacity to make the booking.
              </p>
              <p>
                Unless otherwise specified, a deposit of 20% of the total trip cost is required at the time of booking, with the balance due 60 days before departure. For bookings made within 60 days of departure, full payment is required at the time of booking.
              </p>
              
              <h2>3. Pricing and Surcharges</h2>
              <p>
                All prices are quoted in Euros (€) and are subject to availability. We reserve the right to alter any of our advertised prices at any time before we enter into a contract with you.
              </p>
              <p>
                Once you have booked, your price is fully guaranteed and will not be subject to any surcharges, except in cases of government action, exchange rate fluctuations, or increases in transportation costs or taxes that are part of the contract terms.
              </p>
              
              <h2>4. Cancellation by You</h2>
              <p>
                You may cancel your booking at any time, but notice of cancellation must be received in writing. Cancellation charges will apply as follows:
              </p>
              <ul>
                <li>More than 60 days before departure: Loss of deposit</li>
                <li>59-30 days before departure: 50% of total trip cost</li>
                <li>29-15 days before departure: 75% of total trip cost</li>
                <li>14 days or less before departure: 100% of total trip cost</li>
              </ul>
              <p>
                We strongly recommend that all clients obtain comprehensive travel insurance with cancellation coverage at the time of booking.
              </p>
              
              <h2>5. Cancellation by Us</h2>
              <p>
                We reserve the right to cancel a trip at any time before departure. In such cases, we will offer you an alternative trip (if available) or a full refund of all monies paid. However, we will not be liable for any additional expenses incurred by you.
              </p>
              <p>
                We will not cancel a trip less than 30 days before departure except for force majeure, or failure by you to pay the final balance.
              </p>
              
              <h2>6. Changes by You</h2>
              <p>
                If, after our confirmation invoice has been issued, you wish to change your travel arrangements, we will do our utmost to make these changes, although it may not always be possible. Any request for changes must be made in writing by the lead name. You will be asked to pay an administration charge of €50 per person, plus any further costs we incur in making this alteration.
              </p>
              
              <h2>7. Changes by Us</h2>
              <p>
                It is unlikely that we will have to make any changes to your travel arrangements, but occasionally changes may be necessary, and we reserve the right to do so at any time. Most of these changes will be minor, and we will advise you of them as soon as possible.
              </p>
              <p>
                If we make a significant change to your holiday, we will inform you as soon as reasonably possible. You will have the choice of either accepting the change of arrangements, accepting an offer of alternative travel arrangements (if available), or cancelling your booked holiday and receiving a full refund.
              </p>
              
              <h2>8. Our Liability to You</h2>
              <p>
                We will accept responsibility for the arrangements we agree to provide or arrange for you as an "organizer" under the Package Travel and Linked Travel Arrangements Regulations 2018. Subject to these Terms, if we or our suppliers negligently perform or arrange those services, and we don't remedy or resolve your complaint within a reasonable period, we will pay you reasonable compensation.
              </p>
              <p>
                Our liability, except in cases involving death, injury, or illness, shall be limited to a maximum of three times the cost of your travel arrangements. Our liability will also be limited in accordance with applicable international conventions.
              </p>
              
              <h2>9. Force Majeure</h2>
              <p>
                Except where otherwise expressly stated in these Terms, we regret we cannot accept liability or pay any compensation where the performance or prompt performance of our obligations under our contract with you is prevented or affected by, or you otherwise suffer any damage, loss, or expense as a result of, "force majeure". In these Terms, force majeure means any event which we or the supplier of the service(s) in question could not, even with all due care, foresee or avoid.
              </p>
              
              <h2>10. Complaints</h2>
              <p>
                If you have a complaint during your trip, you must inform our representative, tour leader, or supplier immediately so that the matter can be resolved on the spot. If your complaint cannot be resolved locally, you must inform us in writing within 28 days of your return.
              </p>
              
              <h2>11. Data Protection</h2>
              <p>
                To process your booking and ensure your travel arrangements run smoothly, we need to use the information you provide (such as name, address, special needs/dietary requirements, etc.). We take full responsibility for ensuring that proper security measures are in place to protect your information.
              </p>
              <p>
                We must pass the information on to the relevant suppliers of your travel arrangements (airlines, hotels, transport companies, etc.). The information may also be provided to security or credit checking companies, public authorities such as customs/immigration if required by them, or as required by law.
              </p>
              
              <h2>12. Governing Law</h2>
              <p>
                These Terms and any disputes arising from them are governed by French law. You agree that courts of Paris, France have exclusive jurisdiction over any disputes.
              </p>
              
              <h2>13. Contact Information</h2>
              <p>
                VoyageExplore<br />
                123 Travel Boulevard<br />
                Paris, France<br />
                Phone: +33 (0)1 23 45 67 89<br />
                Email: info@voyageexplore.com
              </p>
              
              <p className="text-sm text-gray-500 mt-8">
                Last updated: June 15, 2025
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LegalPage;