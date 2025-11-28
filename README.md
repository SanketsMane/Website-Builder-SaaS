# Website Builder SaaS

A full-stack SaaS platform for creating and managing online stores with subdomain-based public stores, built with React and Node.js.

## 🚀 Features

### 🔐 Authentication & User Management
- JWT-based authentication with refresh tokens
- User registration and login
- Password hashing with bcrypt
- Session persistence

### 🏪 Store Management
- Create and customize online stores
- Subdomain-based public store access (e.g., `store123.localhost:5173`)
- Store themes and customization
- Logo and banner uploads

### 📦 Product Management
- Add, edit, and delete products
- Product categories and pricing
- Image uploads via Cloudinary
- Inventory management

### 🎨 Design Customization
- Homepage layout editor
- Custom themes and templates
- Responsive design templates
- Real-time preview

### 📊 Analytics & Reporting
- Sales analytics dashboard
- Order tracking and management
- Revenue reports
- Customer insights

### 🛒 E-commerce Features
- Shopping cart functionality
- Checkout process
- Order management
- Coupon system

### 📋 Google Sheets Integration
- Export orders to Google Sheets
- Automated order notifications
- Inventory sync capabilities

### 💳 Subscription System
- Multiple pricing tiers
- Subscription management
- Payment processing ready

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Zustand** - Lightweight state management
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Lucide React** - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Prisma ORM** - Database toolkit
- **PostgreSQL** - Primary database
- **JWT** - Authentication tokens
- **Cloudinary** - Image storage and optimization
- **Google APIs** - Sheets integration
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
Website-Builder-SaaS/
├── backend/
│   ├── controllers/          # Request handlers
│   ├── middleware/           # Authentication & upload middleware
│   ├── prisma/              # Database schema and migrations
│   ├── routes/              # API route definitions
│   ├── utils/               # Utility functions
│   └── index.js            # Server entry point
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── store/          # Zustand state stores
│   │   ├── api/            # API configuration
│   │   └── lib/            # Utility libraries
│   ├── public/             # Static assets
│   └── index.html          # Entry HTML file
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL database
- Cloudinary account (for image uploads)
- Google Cloud Console project (for Sheets integration)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/SanketsMane/Website-Builder-SaaS.git
   cd Website-Builder-SaaS
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   
   # Create .env file
   cp .env.example .env
   # Configure your environment variables
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   ```

4. **Database Setup**
   ```bash
   cd backend
   npx prisma migrate dev
   npx prisma generate
   ```

### Environment Variables

Create `.env` file in the backend directory:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/website_builder"

# JWT
JWT_SECRET="your-super-secret-jwt-key"
REFRESH_TOKEN_SECRET="your-refresh-token-secret"

# Cloudinary
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Google Sheets
GOOGLE_CLIENT_EMAIL="your-service-account-email"
GOOGLE_PRIVATE_KEY="your-private-key"

# Server
PORT=3001
```

### Running the Application

1. **Start Backend Server**
   ```bash
   cd backend
   npm run dev
   ```

2. **Start Frontend Server**
   ```bash
   cd frontend
   npm run dev
   ```

3. **Access the Application**
   - Main App: `http://localhost:5173`
   - API: `http://localhost:3001`
   - Public Stores: `http://[store-username].localhost:5173`

## 🔄 Version Control Workflow

### Branch Strategy
- `main` - Production-ready code
- `dev` - Development branch for feature integration
- `feature/*` - Feature-specific branches

### Development Workflow

1. **Create Feature Branch**
   ```bash
   git checkout dev
   git checkout -b feature/your-feature-name
   ```

2. **Make Changes and Commit**
   ```bash
   git add .
   git commit -m "feat: add new feature description"
   ```

3. **Push to Remote**
   ```bash
   git push -u origin feature/your-feature-name
   ```

4. **Create Pull Request**
   - Merge `feature/*` → `dev`
   - Merge `dev` → `main` for releases

### Commit Convention
```
feat: new feature
fix: bug fix
docs: documentation changes
style: formatting changes
refactor: code restructuring
test: adding tests
chore: maintenance tasks
```

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh JWT token

### Store Endpoints
- `GET /api/stores` - Get user stores
- `POST /api/stores` - Create new store
- `PUT /api/stores/:id` - Update store
- `DELETE /api/stores/:id` - Delete store

### Public Store Endpoints
- `GET /api/public/:subdomain` - Get public store
- `GET /api/public/:subdomain/products` - Get store products
- `GET /api/public/:subdomain/products/:id` - Get specific product

### Product Endpoints
- `GET /api/products` - Get products
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

## 🧪 Testing

Run tests:
```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

## 📦 Deployment

### Backend Deployment
1. Set up PostgreSQL database
2. Configure environment variables
3. Run Prisma migrations
4. Deploy to your preferred platform (Heroku, Railway, etc.)

### Frontend Deployment
1. Build the application: `npm run build`
2. Deploy to Vercel, Netlify, or similar platform
3. Configure environment variables for API endpoints

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Sanket Mane** - *Initial work* - [@SanketsMane](https://github.com/SanketsMane)

## 🙏 Acknowledgments

- React and Node.js communities
- Prisma for the excellent ORM
- Tailwind CSS for the utility-first approach
- All open-source contributors

## 📞 Support

For support, email sanketmane7170@gmail.com or create an issue in this repository.