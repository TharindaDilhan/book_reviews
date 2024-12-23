import React, { useState, useEffect } from "react";

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const [ratingFilter, setRatingFilter] = useState(""); // Default to no filter
  const [sortOrder, setSortOrder] = useState("desc");  // Default to newest first

  useEffect(() => {
    let url = `http://localhost:5000/reviews?sort=${sortOrder}`;
    if (ratingFilter) {
      url += `&rating=${ratingFilter}`;
    }

    console.log("Fetching reviews from:", url); // Debug log

    fetch(url)
      .then((response) => response.json())
      .then((data) => setReviews(data))
      .catch((error) => console.error("Error fetching reviews:", error));
  }, [ratingFilter, sortOrder]);

  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0;
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (total / reviews.length).toFixed(2);
  };

  return (
    <div>
      <h1>Book Reviews</h1>
      <div>
        <label>
          Filter by Rating:
          <select value={ratingFilter} onChange={(e) => setRatingFilter(e.target.value)}>
            <option value="">All Ratings</option>
            {[1, 2, 3, 4, 5].map((rating) => (
              <option key={rating} value={rating}>
                {rating} Stars
              </option>
            ))}
          </select>
        </label>
        <label>
          Sort by Date:
          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value="desc">Newest First</option>
            <option value="asc">Oldest First</option>
          </select>
        </label>
      </div>
      <p>Average Rating: {calculateAverageRating()}</p>
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            <h3>{review.book_title}</h3>
            <p>Author: {review.author}</p>
            <p>Review: {review.review_text}</p>
            <p>Rating: {review.rating} Stars</p>
            <p>Added on: {new Date(review.date_added).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReviewList;
