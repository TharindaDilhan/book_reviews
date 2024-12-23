import React, { useState } from "react";

// const AddReviewForm = ({ onAddReview }) => {
//   const [bookTitle, setBookTitle] = useState("");
//   const [reviewText, setReviewText] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!bookTitle.trim() || !reviewText.trim()) {
//       alert("Both book title and review text are required.");
//       return;
//     }

//     const newReview = {
//       book_title: bookTitle,
//       review_text: reviewText,
//     };

//     console.log("Submitting review:", newReview);

//     fetch("http://localhost:5000/reviews", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(newReview),
//     })
//       .then(async (response) => {
//         const data = await response.json();

//         if (response.ok) {
//           console.log("Review added successfully:", data);
//           if (onAddReview) {
//             onAddReview(data);
//           }
//           setBookTitle(""); // Clear the form fields
//           setReviewText("");
//         } else {
//           console.error("Failed to add review:", data.error);
//           alert("Failed to add the review. Please check your data.");
//         }
//       })
//       .catch((error) => {
//         console.error("Error adding review:", error);
//         alert("An error occurred while adding the review. Please try again.");
//       });
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <input
//           type="text"
//           placeholder="Book Title"
//           value={bookTitle}
//           onChange={(e) => setBookTitle(e.target.value)}
//           required
//         />
//       </div>
//       <div>
//         <textarea
//           placeholder="Write your review here..."
//           value={reviewText}
//           onChange={(e) => setReviewText(e.target.value)}
//           required
//         />
//       </div>
//       <button type="submit">Add Review</button>
//     </form>
//   );
// };

// export default AddReviewForm;


const AddReviewForm = ({ onAddReview }) => {
    const [bookTitle, setBookTitle] = useState("");
    const [reviewText, setReviewText] = useState("");
    const [rating, setRating] = useState(3); // Default rating
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      if (!bookTitle.trim() || !reviewText.trim()) {
        alert("Both book title and review text are required.");
        return;
      }
  
      const newReview = {
        book_title: bookTitle,
        review_text: reviewText,
        rating,
      };
  
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
            if (onAddReview) {
              onAddReview(data);
            }
            setBookTitle("");
            setReviewText("");
            setRating(3); // Reset to default
          } else {
            console.error("Failed to add review:", data.error);
            alert("Failed to add the review. Please check your data.");
          }
        })
        .catch((error) => {
          console.error("Error adding review:", error);
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
  