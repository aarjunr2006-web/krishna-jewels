import React, { useState } from 'react';
import { Review } from '../../lib/types';
import { StarRating } from '../ui/StarRating';
import { Button } from '../ui/Button';
import { Star, MessageSquarePlus, CheckCircle } from 'lucide-react';

interface ReviewsSectionProps {
  initialReviews: Review[];
  rating: number;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ initialReviews, rating }) => {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [userRating, setUserRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Compute stats
  const totalReviews = reviews.length;
  const ratingDistribution = [0, 0, 0, 0, 0]; // 1 to 5 index matching rating-1
  reviews.forEach((rev) => {
    const starIndex = Math.min(Math.max(Math.floor(rev.rating) - 1, 0), 4);
    ratingDistribution[starIndex]++;
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && comment.trim()) {
      const newReview: Review = {
        id: `rev-custom-${Date.now()}`,
        userName: name.trim(),
        rating: userRating,
        date: new Date().toISOString().split('T')[0],
        comment: comment.trim(),
      };
      setReviews([newReview, ...reviews]);
      setSubmitted(true);
      setName('');
      setComment('');
      setUserRating(5);
      setTimeout(() => {
        setSubmitted(false);
        setShowForm(false);
      }, 3000);
    }
  };

  return (
    <div className="w-full mt-16 border-t border-kj-gold/20 pt-12 text-left">
      <h3 className="font-serif text-xl md:text-2xl font-bold text-kj-maroon mb-6">
        Customer Reviews
      </h3>

      {/* Ratings Breakdown Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-b border-gray-100 pb-10 mb-8">
        
        {/* Average Rating Big Box */}
        <div className="md:col-span-4 flex flex-col items-center justify-center p-6 bg-kj-maroon/5 border border-kj-gold/15 text-center">
          <span className="font-serif text-5xl font-bold text-kj-maroon">{rating.toFixed(1)}</span>
          <StarRating rating={rating} size={18} className="mt-2" />
          <span className="font-sans text-xs text-gray-500 mt-2 tracking-wide uppercase">
            Based on {totalReviews} Reviews
          </span>
        </div>

        {/* Rating Bar Distribution Chart */}
        <div className="md:col-span-5 flex flex-col gap-2 font-sans text-xs">
          {[5, 4, 3, 2, 1].map((stars) => {
            const count = ratingDistribution[stars - 1] || 0;
            const percent = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
            return (
              <div key={stars} className="flex items-center gap-3">
                <span className="w-10 text-gray-500 font-medium flex items-center gap-0.5">
                  {stars} <Star size={10} fill="currentColor" className="text-kj-gold inline" />
                </span>
                <div className="flex-grow bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-kj-gold h-full" style={{ width: `${percent}%` }}></div>
                </div>
                <span className="w-8 text-right text-gray-400 font-light">{count}</span>
              </div>
            );
          })}
        </div>

        {/* Call to action "Write Review" button */}
        <div className="md:col-span-3 flex justify-center md:justify-end">
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 border border-kj-maroon text-kj-maroon hover:bg-kj-maroon hover:text-kj-ivory px-6 py-3 font-sans text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer focus:outline-none"
          >
            <MessageSquarePlus size={16} /> Write a Review
          </button>
        </div>

      </div>

      {/* Review Submission Form Overlay/Drawer */}
      {showForm && (
        <div className="bg-kj-maroon/5 border border-kj-gold/20 p-6 mb-8">
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-6 text-center text-kj-emerald font-sans text-sm gap-2">
              <CheckCircle size={32} />
              <p className="font-bold uppercase tracking-wider">Review Submitted Successfully!</p>
              <p className="text-xs text-gray-500 font-light">Thank you for sharing your experience with our parivar.</p>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
              <h4 className="font-serif font-bold text-kj-maroon text-lg">Share Your Experience</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="font-sans text-[11px] uppercase tracking-wider font-semibold text-gray-500">Your Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="bg-white border border-kj-gold/30 px-3 py-2 text-sm focus:outline-none focus:border-kj-maroon font-sans"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-sans text-[11px] uppercase tracking-wider font-semibold text-gray-500">Rating</label>
                  <div className="h-[38px] flex items-center">
                    <StarRating
                      rating={userRating}
                      interactive={true}
                      onChange={setUserRating}
                      size={20}
                      className="cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-sans text-[11px] uppercase tracking-wider font-semibold text-gray-500">Review Comments</label>
                <textarea
                  required
                  rows={4}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Tell us what you liked or how we can improve..."
                  className="bg-white border border-kj-gold/30 px-3 py-2 text-sm focus:outline-none focus:border-kj-maroon font-sans"
                />
              </div>

              <div className="flex justify-end gap-3 mt-1">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="font-sans text-xs font-semibold uppercase tracking-wider px-5 py-2.5 text-gray-500 hover:text-kj-charcoal focus:outline-none"
                >
                  Cancel
                </button>
                <Button type="submit" variant="primary" className="text-xs font-semibold tracking-wider px-6 py-2.5">
                  Submit Review
                </Button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* Reviews List */}
      <div className="flex flex-col gap-6">
        {reviews.length > 0 ? (
          reviews.map((rev) => (
            <div key={rev.id} className="border-b border-gray-100 pb-6 last:border-none">
              <div className="flex justify-between items-start gap-4">
                <div className="flex flex-col gap-0.5">
                  <h4 className="font-sans text-xs md:text-sm font-bold text-kj-charcoal">
                    {rev.userName}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <StarRating rating={rev.rating} size={12} />
                    <span className="text-[10px] text-gray-400 font-sans">{rev.date}</span>
                  </div>
                </div>
                {/* Certified buyer tag */}
                <span className="bg-kj-emerald/10 text-kj-emerald text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-sm font-sans font-bold flex-shrink-0">
                  Verified Buyer
                </span>
              </div>
              <p className="font-sans text-xs md:text-sm text-gray-600 mt-3 leading-relaxed font-light">
                {rev.comment}
              </p>
            </div>
          ))
        ) : (
          <p className="font-sans text-xs text-gray-400 text-center py-6">No reviews yet. Be the first to write a review!</p>
        )}
      </div>

    </div>
  );
};
export default ReviewsSection;
