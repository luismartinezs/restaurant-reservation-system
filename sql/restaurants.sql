insert into
  restaurants (
    name,
    location,
    cuisine_type,
    seating_capacity
  )
values
  (
    'restaurant one',
    'location one',
    'cuisine one',
    50
  ),
(
    'restaurant two',
    'location two',
    'cuisine two',
    100
  ),
(
    'restaurant three',
    'location three',
    'cuisine three',
    150
  );


ALTER TABLE restaurants ADD COLUMN image_url VARCHAR(255);

UPDATE restaurants
SET image_url = CASE name
    WHEN 'restaurant one' THEN 'http://example.com/image1.jpg'
    WHEN 'restaurant two' THEN 'http://example.com/image2.jpg'
    WHEN 'restaurant three' THEN 'http://example.com/image3.jpg'
    ELSE image_url
END;
