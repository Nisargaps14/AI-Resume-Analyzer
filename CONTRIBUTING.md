# Contributing to AI Resume Analyzer

First off, thank you for considering contributing to AI Resume Analyzer! 🎉

This project is a portfolio piece that demonstrates AI/NLP concepts, but we welcome improvements, bug fixes, and new features from the community.

## Table of Contents
1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [How to Contribute](#how-to-contribute)
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
