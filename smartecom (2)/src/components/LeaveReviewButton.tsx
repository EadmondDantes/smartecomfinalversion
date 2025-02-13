import React from 'react';
import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';

interface LeaveReviewButtonProps {
  agencyId: string;
  agencyName: string;
  className?: string;
}

export default function LeaveReviewButton({ agencyId, agencyName, className = '' }: LeaveReviewButtonProps) {
  return (
    <Link
      to={`/submit-review?agency=${agencyId}`}
      className={`group relative overflow-hidden rounded-xl bg-gradient-to-r from-rose-500 to-orange-500 p-[2px] transition-all duration-300 hover:scale-105 hover:shadow-lg ${className}`}
    >
      <div className="relative flex h-full w-full items-center justify-center gap-2 rounded-[10px] bg-white px-6 py-3 transition-all group-hover:bg-opacity-90">
        <Star className="h-5 w-5 text-rose-500" />
        <span className="font-medium text-gray-900">השאר חוות דעת</span>
      </div>
      <div className="absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100">
        <div className="h-full w-full animate-pulse bg-gradient-to-r from-rose-400/50 to-orange-400/50 blur-xl" />
      </div>
    </Link>
  );
}