# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# TrackFusion  

**TrackFusion** is a modern web application for seamless transaction management and analytics. The project leverages a **React** frontend and a **Node.js/Express** backend, hosted on **Vercel** and **Render**, respectively.  

## Features  

- **Dashboard**:  
  - Visualize transaction data through bar and pie charts.  
  - Filter transactions by month, search keywords, or categories.  

- **Statistics**:  
  - View totals for sold, not sold, and sales revenue for a selected month.  

- **Pagination and Search**:  
  - Paginated views of transactions with live search functionality.  

- **Interactive Charts**:  
  - Analyze sales trends using dynamic visualizations powered by Recharts.  

---

## Frontend  

**Hosted on:** [TrackFusion Frontend](https://track-fusion.vercel.app/)  

### Built With  

- [React](https://reactjs.org/) - Frontend library.  
- [Vite](https://vitejs.dev/) - Development environment for fast builds.  
- [Recharts](https://recharts.org/) - Data visualization.  
- [Axios](https://axios-http.com/) - For API communication.  
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework for styling.  

### Setup and Installation  

1. Clone the repository:  
   ```bash
   git clone <repository-url>
   cd frontend

2. Install dependencies:
    ```bash
    npm install

3. Run the development server:
    ```bash
    npm run dev

4. Open your browser at http://localhost:5173.


## Backend
Hosted on: Roxiler Transaction Management Backend

Built With
Node.js and Express.js - Server and API development.
MongoDB - NoSQL database for managing data.
API Endpoints
Get Transactions

URL: GET /api/gettransactions
Parameters:
page (optional): Current page number.
search (optional): Search query.
month (optional): Filter transactions by month.
Get Statistics

URL: GET /api/getstatistics
Parameters:
month (required): Month to fetch statistics for.
Response:
json
Copy code
{
  "totalSold": 100,
  "totalNotSold": 50,
  "totalSale": 15000
}
Bar Chart Data

URL: GET /api/getPriceRangeStatistics/:month
Response: Array of price ranges with counts.
Pie Chart Data

URL: GET /api/getCategoryStatistics/:month
Response: Array of categories with item counts.
