# Amazon Clone - Product Search

This project is a React-based Amazon interface clone focusing on product search functionality, built with React 18, TypeScript, and Tailwind CSS.

## Features

- Amazon-inspired user interface with responsive design
- Real-time product search with debounce functionality
- Search suggestions/autocomplete while typing
- Error handling with user-friendly messages
- Product results display with image, title, price, and rating
- Local caching for the 10 most recent searches

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository or download the source code

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with:
   ```
   VITE_BOLT_API_KEY=your_api_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser to the URL shown in your terminal (typically http://localhost:5173)

## Project Structure

```
amazon-clone/
├── public/
│   └── amazon-favicon.svg
├── src/
│   ├── components/         # React components
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── ProductCard.tsx
│   │   ├── ProductGrid.tsx
│   │   ├── ProductSearch.tsx
│   │   └── SearchBar.tsx
│   ├── context/            # React context
│   │   └── ProductContext.tsx
│   ├── hooks/              # Custom hooks
│   │   └── useDebounce.ts
│   ├── services/           # API and mock data
│   │   ├── api.ts
│   │   └── mockData.ts
│   ├── types/              # TypeScript interfaces
│   │   └── Product.ts
│   ├── __tests__/          # Unit tests
│   │   └── SearchBar.test.tsx
│   ├── App.tsx             # Main App component
│   ├── index.css           # Global styles
│   └── main.tsx            # Entry point
├── .env                    # Environment variables
├── index.html              # HTML template
├── package.json            # Dependencies and scripts
├── tailwind.config.js      # Tailwind CSS configuration
└── README.md               # Project documentation
```

## API Integration

The application is set up to use a hypothetical Bolt API. For demonstration purposes, it uses mock data, but it's structured to easily connect to a real API by updating the API URL and key in the `.env` file. The API service is found in `src/services/api.ts`.

## Testing

Run the tests with:
```bash
npm run test
```

## Building for Production

To create a production build:
```bash
npm run build
```

The built files will be in the `dist` directory and can be served using any static file server.

## Note

This is a demo project for educational purposes only and is not affiliated with Amazon.