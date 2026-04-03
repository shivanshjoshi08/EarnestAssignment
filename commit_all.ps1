# Commit 4 (jwt is already staged)
git commit -m "feat: add JWT utility"

# Commit 5
git add backend/src/utils/errors.ts backend/src/config
git commit -m "feat: add error handling and basic configuration"

# Commit 6
git add backend/src/controllers/auth.controller.ts
git commit -m "feat: add auth controller"

# Commit 7
git add backend/src/controllers/task.controller.ts
git commit -m "feat: add task controller"

# Commit 8
git add backend/src/validators backend/src/middleware backend/src/lib
git commit -m "feat: add validators and middleware"

# Commit 9
git add backend/src/index.ts backend/src/routes
git commit -m "feat: add Express app entry point and routes"

# Commit 10
git add backend/.gitignore backend/package-lock.json backend/tsconfig.json
git commit -m "chore: add backend configuration and lockfile"

# Commit 11
git add frontend/package.json frontend/tsconfig.json frontend/next-env.d.ts frontend/next.config.mjs frontend/postcss.config.mjs frontend/.eslintrc.json
git commit -m "chore: add frontend package.json and Next.js config"

# Commit 12
git add frontend/.gitignore frontend/package-lock.json frontend/public
git commit -m "chore: add frontend .gitignore and lockfile"

# Commit 13
git add frontend/src/app/globals.css
git commit -m "feat: add global CSS and design system"

# Commit 14
git add frontend/src/app/layout.tsx
git commit -m "feat: add Next.js app layout"

# Commit 15
git add frontend/src/components/Navbar.tsx
git commit -m "feat: add Navbar component"

# Commit 16
git add frontend/src/components/TaskCard.tsx frontend/src/components/TaskCard.module.css
git commit -m "feat: add TaskCard component and styles"

# Commit 17
git add frontend/src/components/TaskModal.tsx frontend/src/components/TaskModal.module.css
git commit -m "feat: add TaskModal component and styles"

# Commit 18
git add frontend/src/components/Toast.tsx frontend/src/hooks/useToast.ts
git commit -m "feat: add Toast component and hook"

# Commit 19
git add frontend/src/lib/api.ts
git commit -m "feat: add API client wrapper"

# Commit 20
git add frontend/src/app/login frontend/src/app/register frontend/src/styles
git commit -m "feat: add authentication pages"

# Ensure all remaining is committed (number 21 if needed, but the prompt says 20 commits. Wait, 3 are already done. 3 + 17 = 20 commits. Let's make sure everything left gets added.)
git add .
git commit -m "feat: add dashboard page and final project files"

# Push
git push origin master
