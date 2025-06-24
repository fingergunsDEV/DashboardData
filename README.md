Business Intelligence Dashboard

A scalable, modern Business Intelligence Dashboard built with React, Tailwind CSS, and Chart.js, integrated with Google Sheets via Google Apps Script. Visualize key metrics—Sales, Marketing, Customer Service, Advertising, Branding, OKR, and Revenue—through interactive charts, graphs, and tables. Designed for performance, accessibility, and ease of use, it follows Material Design 3 principles with a responsive layout.

Features





Real-Time Data: Syncs with Google Sheets for live updates of business metrics.



Multiple Visualizations: Each tab includes:





Two Chart.js visualizations (e.g., line + pie for Sales, bar + doughnut for Marketing).



A responsive table displaying raw data.



Metric-Specific Tabs: Dedicated views for Sales, Marketing, Customer Service, Advertising, Branding, OKR, and Revenue.



Modern UI: Tailwind CSS with MD3 styling (primary: #1e40af, secondary: #34d399, rounded corners, shadows).



Scalable Architecture: Modular React components, cloud-based data fetching.



Automation Ready: Google Apps Script automates data syncing.



Deployment: Host on GitHub Pages with automated workflows.

Prerequisites





Node.js (optional, for local server testing).



A Google account for Sheets and Apps Script.



A GitHub account for deployment.



Basic knowledge of HTML, JavaScript, and Google Sheets.

Setup Instructions

1. Clone the Repository

git clone https://github.com/your-repo/bi-dashboard.git
cd bi-dashboard

2. Google Sheets Setup





Create a Google Sheet named DashboardData.



Add sheets for each metric: Sales, Marketing, Customer Service, Advertising, Branding, OKR, Revenue.



Example structure for Sales:







Month



Value





Jan



12000





Feb



15000





Mar



18000



Create a Google Apps Script:





Open the Sheet, go to Extensions > Apps Script.



Paste the following code:

function doGet() {
  const ss = SpreadsheetApp.openById('YOUR_SHEET_ID');
  const sheets = ['Sales', 'Marketing', 'Customer Service', 'Advertising', 'Branding', 'OKR', 'Revenue'];
  const data = {};
  sheets.forEach(sheet => {
    const values = ss.getSheetByName(sheet).getDataRange().getValues();
    data[sheet] = values.slice(1).map(row => ({ [values[0][0]]: row[0], [values[0][1]]: row[1] }));
  });
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}



Replace YOUR_SHEET_ID with your Sheet’s ID (from the URL).



Deploy as a web app:





Click Deploy > New Deployment.



Select Web app, set Who has access to Anyone, and deploy.



Copy the web app URL.

3. Update the Dashboard





Open index.html.



Replace the mockData fetch with real data:

const [data, setData] = useState({});
useEffect(() => {
  fetch('YOUR_APPS_SCRIPT_URL')
    .then(res => res.json())
    .then(setData);
}, []);



Update TabContent to use data[activeTab] instead of mockData[activeTab].

4. Local Testing





Open index.html in a browser (mock data works out of the box).



For a local server:

npx serve



Access at http://localhost:3000.

Deployment to GitHub Pages





Create a GitHub repository.



Add index.html and create .github/workflows/deploy.yml:

name: Deploy to GitHub Pages
on:
  push:
    branches: [ main ]
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: .



Push to the main branch:

git add .
git commit -m "Initial deploy"
git push origin main



Enable GitHub Pages in the repository settings (Settings > Pages > Source: gh-pages).



Access the dashboard at https://your-username.github.io/your-repo.

Usage





Navigate Tabs: Use the sidebar to switch between Sales, Marketing, Customer Service, Advertising, Branding, OKR, and Revenue.



View Visualizations:





Each tab displays two charts (e.g., line + pie) and a table.



Charts are interactive; hover for details.



Update Data: Edit the Google Sheet to reflect changes in real-time (after fetch setup).



Customize: Modify config in index.html to add charts or adjust styles.

Visualizations





Sales: Line (Sales Over Time), Pie (Sales Distribution), Table (Month, Sales).



Marketing: Bar (Marketing Leads), Doughnut (Leads by Campaign), Table (Campaign, Leads).



Customer Service: Line (Support Tickets), Bar (Tickets by Month), Table (Month, Tickets).



Advertising: Bar (Ad Spend), Pie (Spend Distribution), Table (Platform, Spend).



Branding: Bar (Brand Impressions), Doughnut (Impressions by Channel), Table (Channel, Impressions).



OKR: Bar (OKR Progress), Pie (Goal Progress), Table (Goal, Progress).



Revenue: Line (Revenue Over Time), Bar (Revenue by Month), Table (Month, Revenue).

Styling





Built with Tailwind CSS and Material Design 3 principles.



Colors: Primary (#1e40af), Secondary (#34d399).



Features rounded corners, shadows, and responsive layouts.

Troubleshooting





Charts not loading: Ensure mockData or fetched data matches config keys.



Google Sheets errors: Verify Apps Script URL and Sheet permissions.



Deployment issues: Check GitHub Actions logs in the repository.

Contributing





Fork the repository.



Create a feature branch (git checkout -b feature/new-feature).



Commit changes (git commit -m "Add new feature").



Push to the branch (git push origin feature/new-feature).



Open a pull request.

License

MIT License. See LICENSE for details.
