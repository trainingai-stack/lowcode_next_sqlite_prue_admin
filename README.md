# Low-Code Page Builder with Next.js & SQLite

A powerful low-code page builder application built with Next.js, React, TypeScript, Tailwind CSS, and SQLite. Create and manage dynamic pages with a visual drag-and-drop interface without writing code.

## ✨ Features

- 🎨 **Visual Page Builder**
  - 🖱️ Drag-and-drop interface for building pages
  - 🧩 Pre-built components (Hero, Card, Button, Text, Gallery, Contact, etc.)
  - 📐 Real-time canvas preview
  - 🎯 Property panel for component customization

- 🏗️ **Component Library**
  - Hero sections with customizable backgrounds
  - Card components with flexible layouts
  - Button components with multiple styles
  - Text components with rich formatting
  - Gallery components for image display
  - Contact forms with validation
  - Social media components
  - Dividers and sections
  - Avatar components

- 💾 **Data Persistence**
  - SQLite database with Prisma ORM
  - Save and load page configurations
  - Version control for pages
  - Type-safe database operations

- 🎯 **Modern Tech Stack**
  - ⚡ **Next.js 16** with App Router and Turbopack
  - 🎨 **Tailwind CSS v4** with dark/light mode support
  - 🛠 **TypeScript** for full type safety
  - 🎯 **React 19** with latest features
  - 🧩 **shadcn/ui** components
  - ✨ **Lucide React Icons**

- 🌓 **Theme Support**
  - Dark/Light mode toggle
  - Smooth theme transitions
  - CSS variable-based theming

- 📱 **Responsive Design**
  - Mobile-friendly builder interface
  - Responsive component rendering
  - Adaptive layouts

## 🚀 Getting Started

### Prerequisites

- Node.js 22.x (LTS recommended)
- npm 11.x or later (included with Node.js)
- Git for version control

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/trainingai-stack/lowcode_next_sqlite_prue_admin.git
   cd lowcode_next_sqlite_prue_admin
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up the database:

   ```bash
   npm run migrate
   ```

   This command will create the database schema and generate the Prisma client.

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## 🛠 Development

### Available Scripts

- `npm run dev` - Start the development server with Turbopack
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run migrate` - Run Prisma migrations and generate client
- `npm run studio` - Open Prisma Studio for database management

### Development Workflow

1. **Start Development**: Use `npm run dev` for the fastest development experience
2. **Build Pages**: Use the visual builder at `/builder` to create pages
3. **Database Management**: Use `npm run studio` to inspect the database
4. **Code Quality**: Run `npm run lint` before committing changes

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── builder/
│   │       └── pages/          # API endpoints for page management
│   ├── builder/
│   │   ├── page.tsx            # Builder home page
│   │   └── [pageId]/page.tsx   # Page editor
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Home page
├── components/
│   ├── Builder/
│   │   ├── BuilderProvider.tsx # Builder context provider
│   │   ├── Canvas.tsx          # Canvas for page preview
│   │   ├── ComponentPanel.tsx  # Component library panel
│   │   ├── PropertyPanel.tsx   # Property editor
│   │   └── Toolbar.tsx         # Builder toolbar
│   ├── BuilderComponents/      # Pre-built components
│   │   ├── AvatarComponent.tsx
│   │   ├── ButtonComponent.tsx
│   │   ├── CardComponent.tsx
│   │   ├── ContactComponent.tsx
│   │   ├── DividerComponent.tsx
│   │   ├── GalleryComponent.tsx
│   │   ├── HeroComponent.tsx
│   │   ├── SectionComponent.tsx
│   │   ├── SocialComponent.tsx
│   │   ├── TextComponent.tsx
│   │   └── ComponentRenderer.tsx
│   ├── Header/
│   │   └── Header.tsx          # Navigation header
│   ├── Providers/
│   │   ├── ThemeProvider.tsx   # Theme configuration
│   │   └── ToastProvider.tsx   # Toast notifications
│   └── shadcnui/               # shadcn/ui components
├── hooks/
│   ├── useBuilder.ts           # Builder state management
│   └── useDragDrop.ts          # Drag and drop functionality
├── lib/
│   ├── builder/
│   │   ├── defaults.ts         # Default component configurations
│   │   ├── schemas.ts          # Type definitions
│   │   └── utils.ts            # Builder utilities
│   ├── database/
│   │   └── dbClient.ts         # Prisma database client
│   ├── env/                    # Environment configuration
│   └── utils.ts                # Utility functions
└── types/
    └── builder.ts              # TypeScript type definitions

prisma/
├── schema.prisma               # Database schema
└── dev.db                      # SQLite database file
```

## 🎨 Builder Features

### Component Library

The builder includes a comprehensive set of pre-built components:

- **Hero Component**: Full-width hero sections with customizable backgrounds
- **Card Component**: Flexible card layouts with image and content areas
- **Button Component**: Styled buttons with multiple variants
- **Text Component**: Rich text content with formatting options
- **Gallery Component**: Image gallery with grid layouts
- **Contact Component**: Contact forms with validation
- **Social Component**: Social media links and icons
- **Avatar Component**: User avatars with customization
- **Section Component**: Container sections for layout
- **Divider Component**: Visual dividers and separators

### Builder Interface

- **Drag-and-Drop Canvas**: Intuitive interface for building pages
- **Component Panel**: Browse and add components to your page
- **Property Panel**: Edit component properties in real-time
- **Toolbar**: Quick access to builder actions
- **Live Preview**: See changes instantly on the canvas

## 💾 Database Schema

The application uses Prisma with SQLite to manage page data:

- **Pages**: Store page configurations and metadata
- **Components**: Store component instances and their properties
- **Layouts**: Manage page layouts and structures

Run `npm run studio` to open Prisma Studio and explore the database visually.

## 🎨 Theming

This project uses `next-themes` for theme management:

- **Default theme**: Dark mode
- **Theme toggle**: Available in the header
- **CSS variables**: Comprehensive design system with light/dark variants
- **Smooth transitions**: Animated theme switching

## 🚀 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Database**: Prisma with SQLite
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Theme**: next-themes
- **State Management**: React Context (Builder Context)
- **Code Quality**: ESLint, Prettier

## 🔧 Configuration

- **React Compiler**: Enabled for automatic memoization
- **Typed Routes**: Enabled for type-safe navigation
- **Path Aliases**: `@/*` mapped to `./src/*`
- **Theme System**: Full CSS variable integration
- **Database**: Prisma with SQLite adapter

## 📝 Environment Variables

```bash
# Database
DATABASE_URL="file:./prisma/dev.db"  # SQLite database path
```

Copy `.env.example` to `.env` and modify as needed for your environment.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [shadcn/ui](https://ui.shadcn.com/)
- [Lucide Icons](https://lucide.dev/)
- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

---

Built with ❤️ by the Training AI Stack Team
