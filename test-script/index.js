const fs = require('fs');

const filePath = '../testtext.txt';
const startString = 'You';
const endString = 'Do you understand?.';

// Read file
let content = fs.readFileSync(filePath, 'utf8');

// Create regex to remove content between start and end (inclusive)
const regex = new RegExp(
  `${startString}[\\s\\S]*?${endString}`,
  'g'
);

// Remove the passage
content = content.replace(regex, '');

// Write back to file
fs.writeFileSync(filePath, content, 'utf8');

console.log('Specified passage removed successfully.');