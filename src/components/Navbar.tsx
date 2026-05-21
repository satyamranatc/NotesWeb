import { Menu, ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { categories } from "./Sidebar";

interface NavbarProps {
  onMenuClick: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  const location = useLocation();

  // Find category and page names
  let categoryName = "";
  let pageName = "";

  if (location.pathname === "/") {
    pageName = "Dashboard";
  } else {
    for (const cat of categories) {
      const matchedPage = cat.pages.find((p) => p.path === location.pathname);
      if (matchedPage) {
        categoryName = cat.name;
        pageName = matchedPage.title;
        break;
      }
    }
  }

  return (
    <header className="md:hidden glass-header flex items-center justify-between px-6 py-4 w-full">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="p-2 -ml-2 rounded-lg hover:bg-zinc-900 border border-transparent hover:border-zinc-800 text-zinc-400 hover:text-zinc-200 transition-all cursor-pointer"
        >
          <Menu className="w-5.5 h-5.5" />
        </button>

        <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-500 font-sans select-none">
          <Link to="/" className="hover:text-zinc-300 transition-colors">
            DevNotes
          </Link>
          {categoryName && (
            <>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-zinc-500">{categoryName}</span>
            </>
          )}
          {pageName && (
            <>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-zinc-200 font-bold">{pageName}</span>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
