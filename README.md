# book_reviews

A simple full-stack application for managing book reviews. Users can add, view, edit, and delete book reviews, filter by rating, and sort by date. Built with React, Node.js, and MariaDB.

## Features

- **Add Book Reviews:** Provide book title, author, review, and rating.
- **View Book Reviews:** See all reviews with filters and sorting.
- **Edit and Delete Reviews:** Update or remove existing reviews.
- **Filter and Sort:** Filter by rating and sort by date added.
- **Responsive Design:** Simple, user-friendly UI.

## Tech Stack

### Frontend
- **React:** For building the user interface.
- **CSS:** For styling.

### Backend
- **Node.js with Express:** For handling server-side logic.
- **MariaDB:** For storing book reviews.

## Installation and Setup

### Prerequisites
- **Node.js** installed
- **MariaDB** server running
- **Git** for version control

### Instructions

```
CREATE TABLE reviews (
  id INT AUTO_INCREMENT PRIMARY KEY,
  book_title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  review_text TEXT NOT NULL,
  rating INT NOT NULL,
  date_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
