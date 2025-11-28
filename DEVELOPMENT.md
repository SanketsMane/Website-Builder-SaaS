# Development Workflow Guide

## 🔄 Git Workflow for Website Builder SaaS

### Current Repository Status
✅ **Repository**: https://github.com/SanketsMane/Website-Builder-SaaS.git  
✅ **Main Branch**: Production-ready code  
✅ **Dev Branch**: Development and feature integration  
✅ **Current Branch**: `dev` (ready for development)  

### Branch Structure

```
main          # 🚀 Production branch - stable releases only
└── dev       # 🛠️ Development branch - feature integration
    ├── feature/auth-improvements
    ├── feature/new-templates
    └── feature/payment-integration
```

### Daily Development Workflow

#### 1. Starting a New Feature
```bash
# Make sure you're on dev branch
git checkout dev
git pull origin dev

# Create new feature branch
git checkout -b feature/your-feature-name

# Example: git checkout -b feature/product-search
```

#### 2. Working on Features
```bash
# Make your changes
# Add files
git add .

# Commit with descriptive message
git commit -m "feat: add product search functionality"

# Push to remote
git push -u origin feature/your-feature-name
```

#### 3. Completing a Feature
```bash
# Switch back to dev
git checkout dev

# Merge your feature
git merge feature/your-feature-name

# Push updated dev branch
git push origin dev

# Delete feature branch (optional)
git branch -d feature/your-feature-name
git push origin --delete feature/your-feature-name
```

#### 4. Releasing to Production
```bash
# Switch to main branch
git checkout main

# Merge stable dev changes
git merge dev

# Tag the release
git tag -a v1.0.0 -m "Release version 1.0.0"

# Push main and tags
git push origin main
git push origin --tags
```

### Commit Message Convention

Use conventional commits for better changelog generation:

```
feat: new feature
fix: bug fix
docs: documentation changes
style: formatting, missing semicolons, etc.
refactor: code restructuring
test: adding tests
chore: updating build tasks, package manager configs, etc.
perf: performance improvements
ci: continuous integration changes
```

Examples:
```bash
git commit -m "feat: add shopping cart persistence"
git commit -m "fix: resolve checkout payment validation"
git commit -m "docs: update API endpoint documentation"
git commit -m "refactor: optimize store loading performance"
```

### Emergency Hotfixes

For critical production fixes:

```bash
# Create hotfix from main
git checkout main
git checkout -b hotfix/critical-bug-fix

# Make your fix
git add .
git commit -m "hotfix: resolve critical payment processing bug"

# Merge to both main and dev
git checkout main
git merge hotfix/critical-bug-fix
git push origin main

git checkout dev
git merge hotfix/critical-bug-fix
git push origin dev

# Delete hotfix branch
git branch -d hotfix/critical-bug-fix
```

### Best Practices

#### Before Starting Work
- Always pull latest changes: `git pull origin dev`
- Create feature branches from `dev`, not `main`
- Use descriptive branch names: `feature/google-sheets-sync`

#### While Working
- Commit small, logical changes frequently
- Write clear, descriptive commit messages
- Test your code before committing
- Keep commits focused on single features/fixes

#### Code Quality
- Run tests before pushing: `npm test`
- Check for linting errors: `npm run lint`
- Ensure code builds successfully: `npm run build`

#### Collaboration
- Create Pull Requests for code review
- Review others' code thoroughly
- Document breaking changes in commit messages
- Update README.md for new features

### Environment Management

#### Development Environment
```bash
# Backend
cd backend
npm install
cp .env.example .env
# Configure your .env file
npx prisma migrate dev
npm start

# Frontend  
cd frontend
npm install
npm run dev
```

#### Production Deployment Checklist
- [ ] All tests pass
- [ ] Environment variables configured
- [ ] Database migrations run
- [ ] Security review completed
- [ ] Performance testing done
- [ ] Documentation updated

### Useful Git Commands

```bash
# View commit history
git log --oneline --graph

# See what changed
git diff

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Stash changes temporarily
git stash
git stash pop

# Check remote repositories
git remote -v

# Switch branches
git checkout branch-name

# Create and switch to new branch
git checkout -b new-branch-name
```

### Repository Maintenance

#### Weekly Tasks
- Merge completed features from `dev` to `main`
- Clean up merged feature branches
- Update dependencies: `npm update`
- Review and close completed issues

#### Monthly Tasks  
- Create release tags for major versions
- Update documentation
- Security audit: `npm audit`
- Performance review and optimization

---

**Remember**: Always work on the `dev` branch for new features, only merge to `main` for releases! 🚀