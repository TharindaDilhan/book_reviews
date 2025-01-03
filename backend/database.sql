CREATE DATABASE IF NOT EXISTS book_reviews;

USE book_reviews;

CREATE TABLE IF NOT EXISTS reviews (
  id INT AUTO_INCREMENT PRIMARY KEY,
  book_title VARCHAR(255) NOT NULL,
  review_text TEXT NOT NULL
);

ALTER TABLE reviews ADD COLUMN rating INT NOT NULL DEFAULT 3; -- Default rating
ALTER TABLE reviews ADD COLUMN date_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP; -- Date added
ALTER TABLE reviews ADD COLUMN author VARCHAR(255) NOT NULL AFTER book_title;

