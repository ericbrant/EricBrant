-- 🎶 Chord Progression Generator & Analyzer SQL + HTML + JS + PHP Artifact
-- Created by Eric Brant

-- 1. SQL: Create table to save progressions
CREATE TABLE SavedProgressions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  key_name VARCHAR(20),
  progression TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
