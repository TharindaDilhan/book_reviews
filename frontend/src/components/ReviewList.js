// import React, { useState, useEffect } from "react";

// function ReviewList() {
//   const [reviews, setReviews] = useState([]); // To store the list of reviews
//   const [editingReview, setEditingReview] = useState(null); // Currently edited review
//   const [updatedText, setUpdatedText] = useState(""); // Stores new text for editing

//   // Fetch reviews on component mount
//   useEffect(() => {
//     fetch("http://localhost:5000/reviews")
//       .then((response) => response.json())
//       .then((data) => setReviews(data))
//       .catch((error) => console.error("Error fetching reviews:", error));
//   }, []);

//   // Function to delete a review
//   const deleteReview = (id) => {
//     fetch(`http://localhost:5000/reviews/${id}`, {
//       method: "DELETE",
//     })
//       .then(() => {
//         // Update the state after deletion
//         setReviews((prevReviews) => prevReviews.filter((review) => review.id !== id));
//       })
//       .catch((error) => console.error("Error deleting review:", error));
//   };

//   // Function to update a review
//   const updateReview = (id) => {
//     if (!updatedText.trim()) {
//       alert("Review text cannot be empty.");
//       return;
//     }
  
//     // Ensure the book_title exists in editingReview
//     if (!editingReview || !editingReview.book_title) {
//       alert("Book title is missing for the review.");
//       return;
//     }
  
//     console.log("Attempting to update review with ID:", id);
//     console.log("Editing Review:", editingReview);
  
//     fetch(`http://localhost:5000/reviews/${id}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         book_title: editingReview.book_title, // Correctly use the title from the editingReview
//         review_text: updatedText,            // Updated text from the textarea
//       }),
//     })
//       .then(async (response) => {
//         const responseData = await response.json();
  
//         if (response.ok) {
//           console.log("Update successful:", responseData);
  
//           // Update the local reviews list
//           setReviews((prevReviews) =>
//             prevReviews.map((review) =>
//               review.id === id
//                 ? { ...review, review_text: updatedText } // Update the review text
//                 : review
//             )
//           );
//           setEditingReview(null); // Exit editing mode
//           setUpdatedText("");     // Clear textarea
//         } else {
//           console.error("Failed to update review:", responseData);
//           alert(`Failed to update the review: ${responseData.error || "Unknown error."}`);
//         }
//       })
//       .catch((error) => {
//         console.error("Error updating review:", error);
//         alert("An error occurred while updating the review. Please try again.");
//       });
//   };
  
//   return (
//     <div>
//       <h1>Book Reviews</h1>
//       {reviews.length === 0 ? (
//         <p>No reviews found.</p>
//       ) : (
//         <ul>
//           {reviews.map((review) => (
//             <li key={review.id} style={{ marginBottom: "20px" }}>
//               <h3>{review.book_title}</h3>
//               {editingReview && editingReview.id === review.id ? (
//                 // Editing Mode
//                 <div>
//                   <textarea
//                     value={updatedText}
//                     onChange={(e) => setUpdatedText(e.target.value)}
//                     placeholder="Edit your review"
//                   />
//                   <button onClick={() => updateReview(review.id)}>Save</button>
//                   <button onClick={() => setEditingReview(null)}>Cancel</button>
//                 </div>
//               ) : (
//                 // Display mode with Delete and Edit options
//                 <>
//                   <p>{review.review_text}</p>
//                   <button onClick={() => deleteReview(review.id)}>Delete</button>
//                   <button
//                      onClick={() => {
//                         console.log("Selected Review for Editing:", review); // Debug log
//                         setEditingReview(review); // Set the selected review in editing mode
//                         setUpdatedText(review.review_text); // Prepopulate the textarea with the current review text
//                       }}
//                     >
//                       Edit
//                     </button>
//                 </>
//               )}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

// export default ReviewList;

import React, { useState, useEffect } from "react";

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const [ratingFilter, setRatingFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("desc"); // Default to newest first

  // Fetch reviews with filters and sorting applied
  useEffect(() => {
    let url = `http://localhost:5000/reviews?sort=${sortOrder}`;
    if (ratingFilter) {
      url += `&rating=${ratingFilter}`;
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => setReviews(data))
      .catch((error) => console.error("Error fetching reviews:", error));
  }, [ratingFilter, sortOrder]);

  // Calculate average rating
  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0;
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (total / reviews.length).toFixed(2); // Two decimal places
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
            <p>{review.review_text}</p>
            <p>Rating: {review.rating} Stars</p>
            <p>Added on: {new Date(review.date_added).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReviewList;
