# 🤖 AI-Powered Resume Analyzer & Job Hiring Portal

An intelligent resume analysis and job matching platform that helps job seekers optimize their resumes and find perfect job opportunities with company-specific insights.

## ✨ Features

### 🎯 Resume Analysis
- **ATS Score Optimization** - Real-time ATS compatibility scoring
- **Keyword Analysis** - Extract and match job requirements
- **Resume-Job Matching** - Calculate compatibility percentage
- **Improvement Suggestions** - Personalized recommendations

### 💼 Job Hiring Portal
- **Real-Time Job Listings** - Live data from multiple APIs
- **Smart Filtering** - By experience, location, keywords
- **Auto-Refresh** - Updates every 2 minutes
- **Mixed Job Categories** - Both IT and non-IT positions
- **Company Resources** - Download templates and interview prep

### 🏢 Company-Specific Features
- **Resume Templates** - Download company-optimized templates
- **Interview Preparation** - Company-specific questions and tips
- **Culture Insights** - Work style and interview format
- **Application Guidelines** - Tailored application advice
- **Template Preview** - Full HTML preview of resume formats

### 📋 Interactive Components
- **Resume Upload** - Parse and analyze resumes
- **Live Status** - Real-time job updates
- **Progress Tracking** - Visual match indicators
- **Modal Interfaces** - Detailed company information

## 🚀 Technology Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: TailwindCSS + Shadcn/ui
- **Build Tool**: Vite
- **Icons**: Lucide React
- **APIs**: Multiple job APIs (Remotive, RapidAPI, Adzuna)
- **Deployment**: GitHub Pages

## 📱 Live Demo

🌐 **[Live Demo](https://nisargaps14.github.io/AI-Resume-Analyzer/)**

## 🛠️ Installation

```bash
# Clone the repository
git clone https://github.com/Nisargaps14/AI-Resume-Analyzer.git

# Navigate to project
cd AI-Resume-Analyzer

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🎯 Usage

1. **Upload Resume** - Upload your resume for analysis
2. **Browse Jobs** - Filter by experience, location, keywords
3. **Analyze Match** - Get personalized job compatibility scores
4. **Company Resources** - Download templates and interview prep
5. **Apply Smart** - Use company-specific insights

## 🏢 Supported Companies

### Tech Giants
- 🔷 **Microsoft** - Azure-focused templates and interview prep
- 🔍 **Google** - Innovation and scale-oriented guidance
- 📦 **Amazon** - Customer-obsessed application tips

### IT Services
- 💼 **TCS** - Traditional IT application format
- 🏢 **Infosys** - Comprehensive tech preparation
- 🌐 **Wipro** - Enterprise development focus

### Additional Industries
- ☁️ **Salesforce** - CRM and sales career guidance
- 🏦 **HDFC Bank** - Banking and finance roles
- 🧴 **Unilever** - Marketing and brand management
- 🏨 **Taj Hotels** - Hospitality career paths
- 📚 **BYJU'S** - Education and content development
- 🏪 **Reliance Retail** - Retail and store management
- 🏥 **Apollo Hospitals** - Healthcare administration
- 🍽️ **Zomato** - Business development and partnerships

## 📊 Features Breakdown

### Resume Analysis Engine
- **Cosine Similarity** - Advanced text matching algorithms
- **Keyword Extraction** - NLP-powered skill identification
- **ATS Optimization** - Real-world compatibility testing
- **Score Visualization** - Progress bars and indicators

### Job Matching System
- **Multi-API Integration** - Real-time job aggregation
- **Smart Filtering** - Experience level and location
- **Duplicate Removal** - Clean, unique listings
- **Auto-Update Manager** - Configurable refresh intervals

### Company Intelligence
- **Template Library** - Company-specific resume formats
- **Interview Databases** - Real interview questions
- **Culture Guides** - Work environment insights
- **Application Tips** - Timeline and requirements

## 🔧 Configuration

### Environment Variables
```env
# API Keys (Optional - for enhanced job data)
VITE_RAPIDAPI_KEY=your_rapidapi_key
VITE_ADZUNA_APP_ID=your_adzuna_app_id
VITE_ADZUNA_APP_KEY=your_adzuna_app_key
```

### Auto-Update Settings
```javascript
// Configure refresh intervals
const updateConfig = {
  interval: 2 * 60 * 1000, // 2 minutes
  retryAttempts: 3,
  statusCallback: (status) => console.log(status)
};
```

## 🎨 Customization

### Branding
- Update **logo** and **color scheme** in `src/styles/theme.css`
- Modify **company data** in `src/app/utils/companyData.ts`
- Customize **job sources** in `src/app/utils/jobAPI.ts`

### Adding Companies
```typescript
// Add new company data
const newCompany: CompanyData = {
  name: 'Your Company',
  logo: '🏢',
  industry: 'Technology',
  resumeFormat: {
    template: 'company-resume.docx',
    downloadUrl: '/templates/company-resume.docx',
    previewUrl: '/templates/company-preview.html',
    guidelines: ['Custom guidelines']
  },
  // ... other properties
};
```

## 📈 Performance

- **⚡ Fast Loading** - Optimized bundle sizes
- **🔄 Real-Time Updates** - 2-minute refresh cycles
- **📱 Responsive Design** - Mobile-first approach
- **🎯 High Accuracy** - Advanced matching algorithms

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Workflow
1. Fork the repository
2. Create feature branch
3. Make your changes
4. Add tests if applicable
5. Submit pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

- **Author**: Nisarga P S
- **Email**: psnisarga1@gmail.com
- **GitHub**: [@Nisargaps14](https://github.com/Nisargaps14)
- **Live Demo**: [AI-Resume-Analyzer](https://nisargaps14.github.io/AI-Resume-Analyzer/)

---

⭐ **Star this repository** if it helps you in your job search! 🚀
