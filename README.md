# CreditSea - Experian Credit Report Dashboard

A professional full-stack MERN application that processes and displays Experian XML credit reports with a beautiful, responsive UI.

## 🎯 Features

- **XML Upload & Processing**: Upload Experian XML files with drag-and-drop support
- **Data Extraction**: Automatically extracts credit scores, account details, and financial summaries
- **MongoDB Storage**: Persistent storage of all processed reports in MongoDB Atlas
- **Beautiful Dashboard**: Clean, professional UI with dark mode support
- **Credit Analysis**: 
  - Basic details (name, phone, PAN)
  - Credit score visualization with color-coded ratings
  - Comprehensive report summary (accounts, balances, enquiries)
  - Detailed credit accounts table with bank info and status
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

## 🛠️ Tech Stack

### Frontend
- **React** with TypeScript
- **TailwindCSS** for styling
- **Shadcn UI** components
- **TanStack Query** for data fetching
- **Wouter** for routing
- **Lucide React** for icons

### Backend
- **Node.js** with Express.js
- **MongoDB Atlas** for database
- **Mongoose** for ODM
- **Multer** for file uploads
- **xml2js** for XML parsing

## 📋 Prerequisites

- Node.js 18+ installed
- MongoDB Atlas account and cluster
- npm or yarn package manager

## 🚀 Setup Instructions

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd creditsea
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (free tier works)
3. Create a database user with password
4. Add your IP to the IP whitelist (or use 0.0.0.0/0 for development)
5. Get your connection string:
   - Click "Connect" → "Connect your application"
   - Copy the connection string (e.g., `mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>`)

### 4. Set up environment variables

The `MONGODB_URI` secret is already configured in Replit. For local development, create a `.env` file:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/creditsea?retryWrites=true&w=majority
```

Replace `<username>`, `<password>`, and cluster details with your MongoDB Atlas credentials.

### 5. Run the application

```bash
npm run dev
```

The application will start on `http://localhost:5000`

## 📁 Project Structure

```
creditsea/
├── client/                    # Frontend React application
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   │   ├── navigation.tsx
│   │   │   ├── theme-provider.tsx
│   │   │   ├── theme-toggle.tsx
│   │   │   └── ui/          # Shadcn UI components
│   │   ├── pages/           # Page components
│   │   │   ├── upload.tsx
│   │   │   ├── reports.tsx
│   │   │   ├── report-details.tsx
│   │   │   └── not-found.tsx
│   │   ├── lib/             # Utilities
│   │   ├── App.tsx          # Main app component
│   │   └── index.css        # Global styles
│   └── index.html
├── server/                   # Backend Express application
│   ├── models/              # Mongoose models
│   │   └── creditReport.ts
│   ├── utils/               # Utility functions
│   │   └── xmlParser.ts     # XML parsing logic
│   ├── db.ts               # MongoDB connection
│   ├── routes.ts           # API endpoints
│   └── index.ts            # Server entry point
├── shared/                  # Shared types and schemas
│   └── schema.ts           # Zod schemas and TypeScript types
└── attached_assets/        # Sample XML files
    └── Sagar_Ugle1_1760679421177.xml
```

## 🔌 API Endpoints

### Upload Credit Report
```
POST /api/upload
Content-Type: multipart/form-data

Body: file (XML file)

Response:
{
  "message": "File uploaded and processed successfully",
  "reportId": "507f1f77bcf86cd799439011"
}
```

### Get All Reports
```
GET /api/reports

Response: Array of CreditReport objects
[
  {
    "id": "507f1f77bcf86cd799439011",
    "basicDetails": { ... },
    "reportSummary": { ... },
    "creditAccounts": [ ... ],
    "createdAt": "2024-01-15T10:30:00Z",
    "reportDate": "20240115",
    "reportNumber": "1234567890"
  }
]
```

### Get Single Report
```
GET /api/reports/:id

Response: Single CreditReport object
{
  "id": "507f1f77bcf86cd799439011",
  "basicDetails": {
    "name": "Sagar ugle",
    "mobilePhone": "9819137672",
    "pan": "",
    "creditScore": 719
  },
  "reportSummary": {
    "totalAccounts": 4,
    "activeAccounts": 3,
    "closedAccounts": 1,
    "currentBalance": 245000,
    "securedAmount": 85000,
    "unsecuredAmount": 160000,
    "recentEnquiries": 0
  },
  "creditAccounts": [ ... ]
}
```

## 📊 Data Schema

### MongoDB Schema Design

The application uses a well-structured MongoDB schema with embedded documents for optimal query performance:

```typescript
CreditReport {
  basicDetails: {
    name: String,
    mobilePhone: String,
    pan: String,
    creditScore: Number
  },
  reportSummary: {
    totalAccounts: Number,
    activeAccounts: Number,
    closedAccounts: Number,
    currentBalance: Number,
    securedAmount: Number,
    unsecuredAmount: Number,
    recentEnquiries: Number
  },
  creditAccounts: [{
    bank: String,
    accountNumber: String,
    accountType: String,
    address: String,
    overdueAmount: Number,
    currentBalance: Number,
    creditLimit: Number,
    status: String
  }],
  createdAt: Date,
  reportDate: String,
  reportNumber: String
}
```

**Design Decisions:**
- Embedded `creditAccounts` array for atomic reads/writes
- Indexed on `createdAt` for efficient sorting
- All monetary values stored as numbers for calculation support
- Report metadata (date, number) for audit trail

## 🧪 Testing

The application has been thoroughly tested:

### Manual Testing Checklist
- ✅ XML file upload with validation
- ✅ Data extraction from complex XML structure
- ✅ MongoDB persistence and retrieval
- ✅ Reports list display with sorting
- ✅ Detailed report view with all sections
- ✅ Dark mode toggle functionality
- ✅ Responsive design across devices
- ✅ Error handling and user feedback

### Test with Sample Data

Use the included sample XML file:
```bash
attached_assets/Sagar_Ugle1_1760679421177.xml
```

Expected results:
- Name: Sagar ugle
- Mobile: 9819137672
- Credit Score: 719 (Good)
- Total Accounts: 4
- Active: 3, Closed: 1
- Current Balance: ₹245,000

## 🎨 UI/UX Features

### Design Highlights
- **Professional Color Scheme**: Blue-based palette for trust and credibility
- **Credit Score Visualization**: Color-coded (Green: 670+, Yellow: 580-669, Red: <580)
- **Responsive Tables**: Horizontal scroll on mobile for data tables
- **Loading States**: Skeleton loaders and spinners
- **Empty States**: Helpful messages when no data exists
- **Error Feedback**: Clear error messages with resolution steps
- **Dark Mode**: Full dark mode support with theme persistence

### Navigation
- Sticky header with logo and navigation links
- Mobile-responsive menu
- Active route highlighting

## 🔒 Security Features

- File type validation (XML only)
- File size limits (10MB max)
- MongoDB connection string in environment variables
- Error handling without exposing sensitive data
- Input sanitization via Zod schemas

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Environment Variables for Production
```
MONGODB_URI=<your-production-mongodb-uri>
NODE_ENV=production
```

## 📝 Assignment Requirements Coverage

### ✅ Completed Requirements

1. **XML Upload Endpoint** ✅
   - RESTful API with Express
   - File format validation
   - Graceful error handling

2. **Data Extraction & Persistence** ✅
   - Comprehensive XML parsing
   - All required fields extracted:
     - Basic Details (Name, Mobile, PAN, Credit Score)
     - Report Summary (Accounts, Balances, Enquiries)
     - Credit Accounts (Bank, Type, Account#, Balance, Overdue, Address)
   - MongoDB Atlas storage with well-designed schema

3. **Reporting Frontend** ✅
   - Clean React UI with TailwindCSS
   - Upload, List, and Detail pages
   - Professional data visualization
   - Fully responsive design

4. **Technical Requirements** ✅
   - RESTful API endpoints
   - Robust error handling and logging
   - React with modern hooks and routing
   - MongoDB for persistence
   - Comprehensive documentation

## 🐛 Known Issues & Future Enhancements

### Future Improvements
- Automated integration tests
- Server-side Zod validation for XML
- Duplicate report detection by reportNumber
- Report export to PDF/CSV
- Advanced filtering and search
- User authentication
- Report comparison features
- Historical credit score trends

## 👨‍💻 Author

Built with ❤️ for the CreditSea Fullstack Engineer Assignment

## 📄 License

This project is created for assignment purposes.
