// temp.js
// Define Data structure to match dashboard's initialData
const Data = {
  Sales: [],
  Marketing: [],
  'Customer Service': [],
  Advertising: [],
  Branding: [],
  OKR: [],
  Revenue: [],
};

// Load and update Sales data from localStorage
const uploadedData = localStorage.getItem('uploadedData');
if (uploadedData) {
  Data.Sales = JSON.parse(uploadedData);
}

// Save updated Data to localStorage (matching dashboard's key)
localStorage.setItem('dashboardData', JSON.stringify(Data));

console.log('Sales data updated:', Data.Sales);
