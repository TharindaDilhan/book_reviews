import React, { useState } from "react";

const AddReviewForm = ({ onAddReview }) => {
  const [bookTitle, setBookTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(3);

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!bookTitle.trim() || !author.trim() || !reviewText.trim() || !rating) {
      alert("All fields are required.");
      return;
    }
  
    const newReview = {
      book_title: bookTitle.trim(),
      author: author.trim(),
      review_text: reviewText.trim(),
      rating,
    };
  
    console.log("Review Being Submitted:", newReview);
  
    fetch("http://localhost:5000/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newReview),
    })
      .then(async (response) => {
        const data = await response.json();
        if (response.ok) {
          console.log("Review added successfully:", data);
          if (onAddReview) onAddReview(data);
          setBookTitle("");
          setAuthor("");
          setReviewText("");
          setRating(3);
        } else {
          console.error("Failed to add review:", data.error);
          alert(data.error || "Failed to add review. Please check your data.");
        }
      })
      .catch((error) => {
        console.error("Error submitting review:", error);
        alert("An error occurred while adding the review. Please try again.");
      });
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          placeholder="Book Title"
          value={bookTitle}
          onChange={(e) => setBookTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
      </div>
      <div>
        <textarea
          placeholder="Write your review here..."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          required
        />
      </div>
      <div>
        <label>
          Rating:
          <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
            {[1, 2, 3, 4, 5].map((value) => (
              <option key={value} value={value}>
                {value} Stars
              </option>
            ))}
          </select>
        </label>
      </div>
      <button type="submit">Add Review</button>
    </form>
  );
};

export default AddReviewForm;
