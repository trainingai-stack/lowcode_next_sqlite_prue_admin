import Link from "next/link";

const Header = () => {
  return (
    <header
      className="fixed top-0 right-0 left-0 z-50 border-b bg-white shadow"
      aria-label="app-header">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <Link href={"/"}>
          <h1
            className="text-2xl font-semibold text-gray-900"
            aria-label="App Name">
            NSF App
          </h1>
        </Link>

        <nav className="flex items-center gap-4 text-gray-900">
          <Link href={"/"}>Home</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
