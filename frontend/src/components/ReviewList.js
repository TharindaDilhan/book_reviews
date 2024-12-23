import React, { useState, useEffect } from "react";

const normalcenter = {
    textalign: "center",
    aligenitem: 'center',
    display: 'flex',
    flexdirection: "column"
};

const boxclass = {
    background: "transparent",
    border: "none",
    outline: "none",
    fontsize: "15px"
};

const liclass = {
    padding: "33px"
};

const ulclass = {
    display: "flex"
};

const ReviewList = () => {
  const [reviews, setReviews] = useState([]); // List of reviews
  const [editingReview, setEditingReview] = useState(null); // Review being edited
  const [updatedText, setUpdatedText] = useState(""); // Text for the updated review

  // Fetch all reviews
  useEffect(() => {
    fetch("http://localhost:5000/reviews")
      .then((response) => response.json())
      .then((data) => setReviews(data))
      .catch((error) => console.error("Error fetching reviews:", error));
  }, []);

  // Delete a review
  const deleteReview = (id) => {
    fetch(`http://localhost:5000/reviews/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        // Remove the review from the state
        setReviews((prevReviews) => prevReviews.filter((review) => review.id !== id));
      })
      .catch((error) => console.error("Error deleting review:", error));
  };

  // Update a review
  const updateReview = (id) => {
    if (!updatedText.trim()) {
      alert("Review text cannot be empty.");
      return;
    }

    fetch(`http://localhost:5000/reviews/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        book_title: editingReview.book_title,
        author: editingReview.author,
        review_text: updatedText,
        rating: editingReview.rating,
      }),
    })
      .then((response) => {
        if (response.ok) {
          // Update the reviews state
          setReviews((prevReviews) =>
            prevReviews.map((review) =>
              review.id === id ? { ...review, review_text: updatedText } : review
            )
          );
          setEditingReview(null); // Exit edit mode
          setUpdatedText("");
        } else {
          alert("Failed to update the review.");
        }
      })
      .catch((error) => console.error("Error updating review:", error));
  };

  return (
    <div>
      <h1>Book Reviews</h1>
      {reviews.length === 0 ? (
        <p>No reviews available.</p>
      ) : (
        <ul style={ulclass}>
          {reviews.map((review) => (
            <li style={liclass} key={review.id}>
              <h3>{review.book_title}</h3>
                <p>Author: {review.author}</p>
                <p>Review: {review.review_text}</p>
                <p>Rating: {review.rating} Stars</p>
                <p>Added on: {new Date(review.date_added).toLocaleDateString()}</p>
              {editingReview?.id === review.id ? (
                <div>
                  <textarea
                    value={updatedText}
                    onChange={(e) => setUpdatedText(e.target.value)}
                    placeholder="Edit your review"
                  />
                  <button onClick={() => updateReview(review.id)}>Save</button>
                  <button onClick={() => setEditingReview(null)}>Cancel</button>
                </div>
              ) : (
                <>
                  <button onClick={() => deleteReview(review.id)}>Delete</button>
                  <button
                    onClick={() => {
                      setEditingReview(review);
                      setUpdatedText(review.review_text);
                    }}
                  >
                    Edit
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReviewList;
