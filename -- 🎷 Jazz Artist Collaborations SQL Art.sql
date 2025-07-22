-- 🎷 Jazz Artist Collaborations SQL Artifact

-- 1. Create Artists table
CREATE TABLE Artists (
    artist_id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

-- 2. Create Collaborations table
CREATE TABLE Collaborations (
    artist1_id INT,
    artist2_id INT,
    FOREIGN KEY (artist1_id) REFERENCES Artists(artist_id),
    FOREIGN KEY (artist2_id) REFERENCES Artists(artist_id),
    CHECK (artist1_id < artist2_id)
);

-- 3. Insert Jazz Artist data
INSERT INTO Artists VALUES
(1, 'Miles Davis'),
(2, 'John Coltrane'),
(3, 'Herbie Hancock'),
(4, 'Wayne Shorter'),
(5, 'Ron Carter'),
(6, 'Tony Williams');

-- 4. Insert Collaborations data
INSERT INTO Collaborations VALUES
(1, 2), -- Miles Davis & John Coltrane
(1, 3), -- Miles Davis & Herbie Hancock
(1, 4), -- Miles Davis & Wayne Shorter
(1, 5), -- Miles Davis & Ron Carter
(1, 6), -- Miles Davis & Tony Williams
(3, 4), -- Herbie Hancock & Wayne Shorter
(3, 5), -- Herbie Hancock & Ron Carter
(3, 6), -- Herbie Hancock & Tony Williams
(4, 5), -- Wayne Shorter & Ron Carter
(4, 6), -- Wayne Shorter & Tony Williams
(5, 6); -- Ron Carter & Tony Williams

-- 5. Query: List all collaborators for a selected artist (e.g. 'Miles Davis')
SELECT a.name AS collaborator
FROM Artists a
JOIN Collaborations c 
  ON (a.artist_id = c.artist1_id OR a.artist_id = c.artist2_id)
JOIN Artists selected
  ON (selected.artist_id = c.artist1_id OR selected.artist_id = c.artist2_id)
WHERE selected.name = 'Miles Davis'
  AND a.name != 'Miles Davis';
