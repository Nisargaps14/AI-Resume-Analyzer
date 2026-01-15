# 🤝 Contributing to AI-Powered Resume Analyzer

Thank you for your interest in contributing to this project! This document provides guidelines and best practices for contributing.

## 🚀 Quick Start

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes**
4. **Test thoroughly**
5. **Submit a pull request**

## 📋 Development Guidelines

### 🎯 Code Style

- **TypeScript** - Use TypeScript for all new code
- **Components** - Follow React functional component patterns
- **Tailwind CSS** - Use utility classes for styling
- **File Naming** - Use PascalCase for components, camelCase for utilities
- **Imports** - Group imports at the top of files

### 🏗️ Project Structure

```
src/
├── app/
│   ├── components/          # React components
│   │   ├── ui/             # Reusable UI components
│   │   └── *.tsx           # Feature components
│   ├── utils/              # Utility functions
│   │   ├── *.ts            # Helper functions
│   │   └── *.tsx           # React hooks
│   └── styles/             # CSS files
├── public/                  # Static assets
│   └── templates/         # Resume templates
└── docs/                   # Documentation
```

### 🔧 Development Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Build for production
npm run build

# Lint code
npm run lint
```

## 🎨 Adding Features

### New Components

1. **Create component file** in `src/app/components/`
2. **Export component** with proper TypeScript types
3. **Add to index** if it's a utility
4. **Write tests** for new functionality
5. **Update documentation**

Example component structure:
```tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface NewComponentProps {
  title: string;
  data: any[];
}

export function NewComponent({ title, data }: NewComponentProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Component content */}
      </CardContent>
    </Card>
  );
}

export default NewComponent;
```

### Adding Companies

1. **Update companyData.ts** with new company information
2. **Add resume template** in `public/templates/`
3. **Create preview HTML** for template
4. **Test integration** with job portal

Company data structure:
```typescript
export const COMPANY_DATA: Record<string, CompanyData> = {
  'NewCompany': {
    name: 'NewCompany',
    logo: '🏢',
    industry: 'Technology',
    description: 'Company description',
    resumeFormat: {
      template: 'newcompany-resume.docx',
      downloadUrl: '/templates/newcompany-resume.docx',
      previewUrl: '/templates/newcompany-preview.html',
      guidelines: [
        'Guideline 1',
        'Guideline 2'
      ]
    },
    interviewPrep: {
      questions: ['Question 1', 'Question 2'],
      technicalQuestions: ['Tech Question 1'],
      behavioralQuestions: ['Behavioral Question 1'],
      preparationTips: ['Tip 1', 'Tip 2'],
      videoResources: ['Video 1'],
      studyMaterials: ['Material 1']
    },
    culture: {
      values: ['Value 1', 'Value 2'],
      workStyle: 'Work style description',
      dressCode: 'Dress code info',
      interviewFormat: 'Interview format'
    },
    applicationTips: {
      coverLetter: ['Tip 1', 'Tip 2'],
      followUp: ['Follow-up tip'],
      timeline: ['Timeline info'],
      requirements: ['Requirement 1', 'Requirement 2']
    }
  }
};
```

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Writing Tests

- **Unit tests** for utility functions
- **Component tests** for React components
- **Integration tests** for API calls
- **E2E tests** for user workflows

Example test:
```typescript
import { render, screen } from '@testing-library/react';
import { NewComponent } from '../NewComponent';

describe('NewComponent', () => {
  it('renders title correctly', () => {
    render(<NewComponent title="Test Title" data={[]} />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });
});
```

## 📝 Documentation

### Updating README

- **Add new features** to Features section
- **Update installation** instructions if needed
- **Document new APIs** or dependencies
- **Add screenshots** for UI changes

### Code Comments

- **JSDoc** for function documentation
- **Inline comments** for complex logic
- **TODO comments** for future improvements

## 🎨 UI/UX Guidelines

### Design Principles

- **Consistent** - Follow existing design patterns
- **Responsive** - Mobile-first approach
- **Accessible** - WCAG 2.1 compliance
- **User-friendly** - Clear error messages and loading states

### Color Usage

Use CSS custom properties defined in `src/styles/branding.css`:
```css
.component {
  background: var(--brand-primary);
  color: white;
  border-radius: var(--brand-radius-md);
}
```

### Component Patterns

- **Cards** - Use Card component for content sections
- **Buttons** - Use Button component with variants
- **Forms** - Use proper form validation
- **Modals** - Use Dialog component for overlays

## 🚀 Pull Request Process

### Before Submitting

1. **Test your changes** thoroughly
2. **Update documentation** if needed
3. **Rebase** with main branch if necessary
4. **Ensure no merge conflicts**
5. **Follow commit message** conventions

### Commit Message Format

```
type(scope): brief description

[optional body]

[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation update
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

Examples:
```
feat(job-portal): add company-specific resume templates

fix(ats): resolve keyword extraction issue

docs(readme): update installation instructions
```

### PR Template

```markdown
## 🎯 Description
Brief description of changes made.

## 🧪 Changes Made
- [x] Change 1
- [x] Change 2
- [ ] Future change

## 🧪 Testing
- [x] Unit tests pass
- [x] Integration tests pass
- [x] Manual testing completed

## 📷 Screenshots
(If applicable)

## 🔗 Related Issues
Closes #123
```

## 🐛 Bug Reports

### Reporting Issues

1. **Use GitHub Issues** for bug reports
2. **Search existing issues** first
3. **Provide detailed information**:
   - Browser and version
   - Steps to reproduce
   - Expected vs actual behavior
   - Error messages
   - Screenshots if applicable

### Bug Report Template

```markdown
## 🐛 Bug Description
Brief description of the bug.

### 🔄 Steps to Reproduce
1. Go to...
2. Click on...
3. Enter...
4. See error...

### 🎯 Expected Behavior
What should happen.

### ❌ Actual Behavior
What actually happens.

### 📷 Screenshots
(If applicable)

### 🌐 Environment
- OS: [Windows/macOS/Linux]
- Browser: [Chrome/Firefox/Safari]
- Version: [v1.0.0]

### 📝 Additional Context
Any other relevant information.
```

## 💡 Feature Requests

### Requesting Features

1. **Check roadmap** for planned features
2. **Use GitHub Discussions** for ideas
3. **Provide use cases** and benefits
4. **Consider implementation** complexity

### Feature Request Template

```markdown
## 🚀 Feature Description
Clear description of the feature.

### 🎯 Problem Statement
What problem does this solve?

### 💡 Proposed Solution
How should this be implemented?

### 🎨 UI/UX Considerations
Any design considerations.

### 🔧 Technical Details
Implementation approach or technical considerations.

### 📈 Benefits
Value this adds to the project.
```

## 🏆 Recognition

### Contributors

All contributors will be recognized in:
- **README.md** - Contributors section
- **GitHub Contributors** - Automatic recognition
- **Release notes** - Feature attributions

### Code of Conduct

- **Be respectful** and professional
- **Welcome newcomers** and help them learn
- **Focus on what** is best for the project
- **Assume good intentions**

## 📞 Getting Help

### Support Channels

- **GitHub Issues** - Bug reports and feature requests
- **GitHub Discussions** - General questions and ideas
- **Documentation** - Check existing docs first

### Contact Maintainers

- **Create issue** with `question` label for general questions
- **Use `help wanted` label for contributions needed
- **Tag maintainers** in issues for specific questions

---

## 🎉 Thank You!

Your contributions help make this project better for everyone. Whether you're fixing a bug, adding a feature, improving documentation, or sharing ideas, your effort is valued and appreciated!

**Happy coding!** 🚀
4. [Development Guidelines](#development-guidelines)
5. [Pull Request Process](#pull-request-process)
6. [Community](#community)

## Code of Conduct

### Our Pledge
We are committed to providing a welcoming and inspiring community for everyone.

### Our Standards
- Be respectful and inclusive
- Welcome newcomers and encourage learning
- Focus on what's best for the community
- Show empathy towards other community members

## Getting Started

### Prerequisites
```bash
- Node.js 18+ or 20+
- Git
- A code editor (VS Code recommended)
- Basic knowledge of React and TypeScript
```

### Initial Setup
```bash
# 1. Fork the repository on GitHub

# 2. Clone your fork
git clone https://github.com/YOUR-USERNAME/ai-resume-analyzer.git

# 3. Navigate to the project
cd ai-resume-analyzer

# 4. Add upstream remote
git remote add upstream https://github.com/ORIGINAL-OWNER/ai-resume-analyzer.git

# 5. Install dependencies
npm install

# 6. Create a branch
git checkout -b feature/your-feature-name

# 7. Start development server
npm run dev
```

## How to Contribute

### Types of Contributions We're Looking For

#### 🐛 Bug Reports
Found a bug? Please create an issue with:
- Clear description of the bug
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)
- Environment details (browser, OS)

#### ✨ Feature Requests
Have an idea? Create an issue describing:
- The problem you're trying to solve
- Your proposed solution
- Why this would be useful to others
- Alternative solutions you've considered

#### 📝 Documentation Improvements
- Fix typos and grammar
- Clarify confusing sections
- Add missing documentation
- Improve code comments
- Create tutorials or guides

#### 💻 Code Contributions
- Bug fixes
- New features
- Performance improvements
- Test coverage
- Refactoring

## Development Guidelines

### Code Style

#### TypeScript/React
```typescript
// ✅ Good - Use TypeScript types
interface ResumeData {
  skills: string[];
  experience: string[];
}

// ✅ Good - Descriptive component names
function ResumeUploader({ onComplete }: Props) {
  // ...
}

// ✅ Good - Clear variable names
const [extractedData, setExtractedData] = useState<ExtractedData | null>(null);

// ❌ Bad - Any types
function processData(data: any) { }

// ❌ Bad - Unclear names
function Comp() { }
const x = useState(null);
```

#### File Organization
```
src/app/
├── components/          # React components
│   ├── ui/             # Reusable UI components
│   └── FeatureName.tsx # Feature-specific components
├── utils/              # Utility functions
│   ├── nlp.ts         # NLP-related utilities
│   └── helpers.ts     # General helpers
└── types/              # TypeScript type definitions
```

#### Naming Conventions
- **Components**: PascalCase (e.g., `ResumeUploader.tsx`)
- **Utilities**: camelCase (e.g., `calculateSimilarity()`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `MAX_FILE_SIZE`)
- **Types/Interfaces**: PascalCase (e.g., `interface UserData`)

### Testing Guidelines

```typescript
// Example test structure
describe('NLP Utilities', () => {
  describe('extractSkills', () => {
    it('should extract technical skills from text', () => {
      const text = 'Experienced with React, Python, and Docker';
      const skills = extractSkills(text);
      
      expect(skills).toContain('react');
      expect(skills).toContain('python');
      expect(skills).toContain('docker');
    });

    it('should handle empty text', () => {
      const skills = extractSkills('');
      expect(skills).toEqual([]);
    });
  });
});
```

### Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```bash
# Format
<type>(<scope>): <subject>

# Types
feat:     New feature
fix:      Bug fix
docs:     Documentation only
style:    Code style (formatting, missing semicolons, etc.)
refactor: Code refactoring
test:     Adding tests
chore:    Maintenance tasks

# Examples
feat(resume): add support for RTF file format
fix(nlp): correct skill extraction regex pattern
docs: update setup instructions in README
style(components): format code with Prettier
refactor(utils): simplify TF-IDF calculation
test(parser): add PDF parsing edge case tests
chore: update dependencies to latest versions
```

### Code Review Checklist

Before submitting a PR, ensure:

- [ ] Code follows project style guidelines
- [ ] All existing tests pass (`npm test`)
- [ ] New tests added for new features
- [ ] Documentation updated if needed
- [ ] No console.log() or debugger statements
- [ ] TypeScript types are properly defined
- [ ] Components are properly typed
- [ ] Error handling is implemented
- [ ] Code is formatted (`npm run format`)
- [ ] No ESLint warnings or errors

## Pull Request Process

### 1. Prepare Your Changes

```bash
# Make sure your branch is up to date
git checkout main
git pull upstream main

# Rebase your feature branch
git checkout feature/your-feature-name
git rebase main

# Run tests
npm test

# Run linter
npm run lint

# Build to check for errors
npm run build
```

### 2. Create Pull Request

**PR Title Format**:
```
<type>: <short description>

Examples:
feat: Add salary prediction feature
fix: Resolve PDF parsing crash on large files
docs: Improve NLP algorithm documentation
```

**PR Description Template**:
```markdown
## Description
Brief description of what this PR does

## Type of Change
- [ ] Bug fix (non-breaking change fixing an issue)
- [ ] New feature (non-breaking change adding functionality)
- [ ] Breaking change (fix or feature causing existing functionality to change)
- [ ] Documentation update

## Changes Made
- Change 1
- Change 2
- Change 3

## Testing
Describe the tests you ran and how to reproduce them

## Screenshots (if applicable)
Add screenshots for UI changes

## Checklist
- [ ] My code follows the project's style guidelines
- [ ] I have commented my code where necessary
- [ ] I have updated the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix/feature works
- [ ] New and existing tests pass locally
```

### 3. Code Review

- Be patient - reviews may take a few days
- Respond to feedback constructively
- Make requested changes in new commits
- Once approved, we'll merge your PR!

## Development Workflow

### Working on a Feature

```bash
# 1. Create branch from main
git checkout -b feature/amazing-feature

# 2. Make your changes
# ... code, code, code ...

# 3. Test your changes
npm run dev
npm test

# 4. Commit your changes
git add .
git commit -m "feat: add amazing feature"

# 5. Push to your fork
git push origin feature/amazing-feature

# 6. Create Pull Request on GitHub
```

### Syncing Your Fork

```bash
# Fetch upstream changes
git fetch upstream

# Merge into your main branch
git checkout main
git merge upstream/main

# Push to your fork
git push origin main
```

## Areas for Contribution

### High Priority
1. **Real AI Integration**: Replace mock AI with OpenAI/Gemini APIs
2. **Testing**: Add comprehensive unit and integration tests
3. **Accessibility**: Improve ARIA labels and keyboard navigation
4. **Performance**: Optimize bundle size and load times

### Medium Priority
1. **User Authentication**: Add login/signup functionality
2. **Data Persistence**: Store resume history in database
3. **Export Features**: PDF/Word export of analysis
4. **Multi-language**: Add internationalization (i18n)

### Low Priority (Nice to Have)
1. **Dark Mode**: Add theme switching
2. **Resume Templates**: Pre-built resume templates
3. **Browser Extension**: Chrome/Firefox extension
4. **Mobile App**: React Native version

## Questions?

### Where to Ask
- **General Questions**: Create a GitHub Discussion
- **Bug Reports**: Create an Issue
- **Feature Ideas**: Create an Issue with [Feature Request] tag
- **Urgent Security Issues**: Email directly (see SECURITY.md)

### Getting Help
- Check existing Issues and PRs first
- Read the documentation in `/docs` folder
- Ask in GitHub Discussions
- Be specific and provide context

## Recognition

Contributors will be:
- Listed in README.md
- Mentioned in release notes
- Given credit in commit history
- Featured on project website (if applicable)

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

## Additional Resources

### Helpful Links
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [PDF.js Documentation](https://mozilla.github.io/pdf.js/)

### Recommended Tools
- **VS Code**: Code editor
- **React DevTools**: Browser extension for debugging
- **TypeScript**: For type checking
- **Prettier**: Code formatting
- **ESLint**: Code linting

### Learning Resources
- [React Tutorial](https://react.dev/learn)
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)
- [NLP with JavaScript](https://medium.com/tag/natural-language-processing)
- [Git Best Practices](https://git-scm.com/book/en/v2)

---

## Thank You! 🙏

Every contribution, no matter how small, helps make this project better for everyone.

**Happy Coding!** 💻✨

---

**Last Updated**: January 12, 2026
