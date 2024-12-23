import React, { useState } from 'react';
import axios from 'axios';

const EditReviewForm = ({ review, onUpdate }) => {
  const [formData, setFormData] = useState({ ...review });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5000/reviews/${formData.id}`, formData)
      .then(() => onUpdate())
      .catch(err => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="title" value={formData.title} onChange={handleChange} required />
      <input type="text" name="author" value={formData.author} onChange={handleChange} required />
      <input type="number" name="rating" value={formData.rating} onChange={handleChange} min="1" max="5" required />
      <textarea name="review_text" value={formData.review_text} onChange={handleChange} required />
      <button type="submit">Save Changes</button>
    </form>
  );
};

export default EditReviewForm;
