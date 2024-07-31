const fs = require('fs');
const path = require('path');

// Updated user IDs based on provided list
const userIdsUpdated = [
	'1730828b-1c00-4ec4-a7ae-148f35ea11f5',
	'a8b4f919-50bd-4639-8762-4a9fbe297259',
	'4e92ba9d-205b-4204-a31c-4c37e1472a16',
	'4647ea43-88d5-4d1f-8eda-a4c9a3afe142',
	'9c6bee44-4b64-464e-a763-58227361f206',
	'78fc80aa-a914-41ba-a794-8b62fb706e0e',
	'bcb6486a-6f18-49d1-aa23-c5a3e2edaecc',
	'8bfb2721-b759-44aa-9bba-27cea1419085',
	'46be8745-cd58-454a-a945-6cef957779c2',
	'b9dbcb58-a8ac-4017-af0f-adb86237d871',
	'6c28ba3d-4f65-4480-897a-0d3c63572c6e',
	'66c7d9e8-d78c-47f4-9986-0a819aa33ecd',
	'f85d4015-7720-48cd-bbed-36deeb233b7c',
];

// Function to generate random integer between min and max (inclusive)
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Generating mock ratings
const numRatings = 200;
const ratings = [];

for (let i = 0; i < numRatings; i++) {
	const restaurantId = getRandomInt(9, 103);
	const userId = userIdsUpdated[Math.floor(Math.random() * userIdsUpdated.length)];
	const rating = getRandomInt(1, 5);
	ratings.push({ restaurantId, userId, rating });
}

// Converting to CSV format
const csvContent = 'restaurant_id,user_id,rating\n' + ratings.map(r => `${r.restaurantId},${r.userId},${r.rating}`).join('\n');

const databaseFolder = './database';
if (!fs.existsSync(databaseFolder)) {
	fs.mkdirSync(databaseFolder);
}

// Saving to CSV
const outputFilePath = path.join(databaseFolder, 'ratings.csv');
fs.writeFileSync(outputFilePath, csvContent);

console.log('ratings.csv file has been generated.');
