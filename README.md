# Branded Content Briefing Dashboard

A professional AI-powered content strategy generator designed for sales teams working with digital publishers. This application generates comprehensive content creation blueprints that help publishers optimize their content workflows, maximize revenue, and scale their operations.

## Features

### 🚀 **Intelligent Briefing Form**
- Comprehensive client requirement capture
- Publisher type and audience analysis
- Content type and monetization method selection
- Budget and timeline planning

### 🧠 **AI-Powered Blueprint Generation**
- Executive summary with strategic overview
- Core functionalities and technical architecture
- Detailed user journey mapping
- Revenue impact projections and ROI analysis
- Implementation roadmap with phases
- Risk assessment and mitigation strategies

### 📊 **Professional Output**
- Clean, sales-ready presentation format
- PDF export functionality
- Copy-to-clipboard for easy sharing
- Branded, professional design

### 🎯 **Sales Team Optimized**
- Fast 3-minute form completion
- Instant blueprint generation
- Professional client-ready output
- Mobile-responsive design

## Technology Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **PDF Generation**: jsPDF, html2canvas
- **Deployment**: Vercel (optimized)

## Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd branded-content-briefing-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
npm run build
npm start
```

## Deployment to Vercel

This application is optimized for Vercel deployment:

1. **Connect your repository to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Configure build settings (defaults work)

2. **Automatic deployments**
   - Every push to main branch triggers deployment
   - Preview deployments for pull requests
   - Custom domains supported

3. **Environment Configuration**
   - No environment variables required for basic functionality
   - All processing happens client-side for optimal performance

## Usage Guide

### For Sales Teams

1. **Gather Client Information**
   - Publisher name and type
   - Current challenges and goals
   - Target audience details
   - Content types and monetization methods
   - Budget and timeline requirements

2. **Generate Blueprint**
   - Fill out the comprehensive briefing form
   - Submit for AI processing (takes ~3 seconds)
   - Review the generated 7-section blueprint

3. **Present to Client**
   - Export as PDF for presentations
   - Copy content for proposals
   - Use as foundation for detailed technical discussions

### Blueprint Sections

1. **Executive Summary** - Strategic overview and key benefits
2. **Core Functionalities** - Detailed feature breakdown
3. **Technical Architecture** - System design and integrations
4. **User Journey** - Workflow optimization for editors and business teams
5. **Revenue & ROI Impact** - Financial projections and performance metrics
6. **Implementation Roadmap** - Phased approach with timelines
7. **Risk & Mitigation** - Potential challenges and solutions

## Customization

### Branding
- Update colors in `tailwind.config.js`
- Modify logo and company information in components
- Customize footer and header content

### Content Generation
- Enhance blueprint generation logic in `utils/blueprintGenerator.ts`
- Add new form fields in `components/BriefingForm.tsx`
- Extend blueprint sections in `components/BlueprintDisplay.tsx`

### Styling
- Modify global styles in `app/globals.css`
- Update component-specific styles using Tailwind classes
- Add custom CSS components as needed

## Project Structure

```
├── app/
│   ├── components/
│   │   ├── BriefingForm.tsx    # Client briefing form
│   │   └── BlueprintDisplay.tsx # Blueprint presentation
│   ├── utils/
│   │   └── blueprintGenerator.ts # AI blueprint generation
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Main application page
│   └── types.ts                # TypeScript definitions
├── public/                     # Static assets
├── next.config.js              # Next.js configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies and scripts
```

## Performance Optimization

- **Static Generation**: Optimized for Vercel's edge network
- **Code Splitting**: Automatic component-level splitting
- **Image Optimization**: Next.js built-in optimization
- **Bundle Analysis**: Webpack bundle analyzer included

## Support

For technical support or feature requests:
- Create an issue in the repository
- Contact the development team
- Check documentation for troubleshooting

## License

This project is proprietary software designed for internal sales team use.