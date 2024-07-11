import {StarIcon} from 'lucide-react'

const StarRating = ({ rating }) => {
    // Generate an array of 5 elements to represent the 5 stars
    const stars = Array.from({ length: 5 }, (_, index) => index < rating);
  
    return (
      <div className='flex gap-2 items-center'>
        <div className='flex gap-2'>
          {stars.map((isFilled, index) => (
            <StarIcon
              key={index}
              className={`w-6 h-6 fill-current ${isFilled ? 'text-yellow-300' : 'text-gray-200'}`}
            />
          ))}
        </div>
        <span className='text-xs text-gray-600'>{rating || 0} ratings</span>
      </div>
    );
  };

  export default StarRating