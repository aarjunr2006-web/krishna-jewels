import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && email.trim() && msg.trim()) {
      setSubmitted(true);
      setName('');
      setEmail('');
      setMsg('');
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  const storeLocations = [
    {
      city: 'Jaipur Flagship Boutique',
      address: 'Shop 14, Johari Bazar, Haldiya Bhawan, Jaipur, Rajasthan - 302003',
      phone: '+91 141 256 8920',
      hours: 'Mon - Sat: 11:00 AM - 8:30 PM | Sun: Closed',
    },
    {
      city: 'New Delhi Experience Center',
      address: 'C-24, Ground Floor, Connaught Place, Inner Circle, New Delhi - 110001',
      phone: '+91 11 4152 7394',
      hours: 'Mon - Sun: 11:00 AM - 9:00 PM',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 text-left bg-kj-ivory">
      
      {/* Title */}
      <div className="border-b border-kj-gold/20 pb-4 mb-8">
        <h1 className="font-serif text-2xl md:text-3xl font-bold text-kj-maroon uppercase tracking-wide">
          Contact Us & Store Locator
        </h1>
        <p className="font-sans text-xs md:text-sm text-gray-500 mt-1">
          Have questions or want to experience our pieces in person? Get in touch.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Form & Help (Span 7) */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          
          {/* Quick Help cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="border border-kj-gold/15 bg-white p-4 flex flex-col gap-1 text-center items-center">
              <Mail size={20} className="text-kj-gold" />
              <span className="font-serif font-bold text-xs text-kj-maroon uppercase tracking-wider mt-1">Email Us</span>
              <a href="mailto:aarjunr2006@gmail.com" className="font-sans text-xs text-gray-600 hover:text-kj-gold">
                aarjunr2006@gmail.com
              </a>
            </div>
            <div className="border border-kj-gold/15 bg-white p-4 flex flex-col gap-1 text-center items-center">
              <Phone size={20} className="text-kj-gold" />
              <span className="font-serif font-bold text-xs text-kj-maroon uppercase tracking-wider mt-1">Call Us</span>
              <a href="tel:+918005593151" className="font-sans text-xs text-gray-600 hover:text-kj-gold">
                +91 8005593151
              </a>
            </div>
            <div className="border border-kj-gold/15 bg-white p-4 flex flex-col gap-1 text-center items-center">
              <MapPin size={20} className="text-kj-gold" />
              <span className="font-serif font-bold text-xs text-kj-maroon uppercase tracking-wider mt-1">Web Developer</span>
              <span className="font-sans text-xs text-gray-600">ARJUN RATHORE</span>
            </div>
          </div>

          {/* Form container */}
          <div className="border border-kj-gold/15 bg-white p-6 md:p-8">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-10 text-center text-kj-emerald font-sans text-sm gap-2">
                <CheckCircle2 size={36} />
                <p className="font-bold uppercase tracking-wider">Inquiry Received</p>
                <p className="text-xs text-gray-500 font-light">Thank you! Our support team will get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <h3 className="font-serif text-lg font-bold text-kj-maroon">Send An Inquiry</h3>
                <div className="w-12 h-[1.5px] bg-kj-gold mb-2"></div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="font-sans text-[11px] uppercase tracking-wider font-semibold text-gray-500">Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter name"
                      className="bg-white border border-kj-gold/30 px-3 py-2.5 text-sm focus:outline-none focus:border-kj-maroon font-sans"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="font-sans text-[11px] uppercase tracking-wider font-semibold text-gray-500">Email</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter email"
                      className="bg-white border border-kj-gold/30 px-3 py-2.5 text-sm focus:outline-none focus:border-kj-maroon font-sans"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-sans text-[11px] uppercase tracking-wider font-semibold text-gray-500">Message</label>
                  <textarea
                    required
                    rows={5}
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                    placeholder="Describe your question, sizing queries, or order issues..."
                    className="bg-white border border-kj-gold/30 px-3 py-2.5 text-sm focus:outline-none focus:border-kj-maroon font-sans"
                  />
                </div>

                <Button type="submit" variant="primary" className="font-sans text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 py-3.5 self-end">
                  <Send size={14} /> Send Message
                </Button>
              </form>
            )}
          </div>

        </div>

        {/* Right Column: Store locator details (Span 5) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="border border-kj-gold/15 bg-white p-6 flex flex-col gap-6 text-left">
            <h3 className="font-serif text-lg font-bold text-kj-maroon border-b border-gray-100 pb-3 uppercase tracking-wide">
              Our Boutiques
            </h3>
            
            {storeLocations.map((loc, idx) => (
              <div key={idx} className="flex flex-col gap-2 border-b border-gray-100 pb-5 last:border-0 last:pb-0 font-sans text-xs md:text-sm text-gray-600">
                <span className="font-serif font-bold text-kj-charcoal text-sm">{loc.city}</span>
                <span className="font-light">{loc.address}</span>
                <span className="font-semibold text-kj-maroon">{loc.phone}</span>
                <span className="text-[11px] text-gray-400 font-light">{loc.hours}</span>
              </div>
            ))}

            {/* Note */}
            <div className="bg-kj-maroon/5 border border-kj-gold/25 p-4 text-xs font-sans text-gray-500 leading-relaxed font-light">
              💡 <strong>Private Viewings:</strong> Want a dedicated jewelry consultant to assist you? Call either boutique to schedule a private viewing suite session.
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
export default Contact;
