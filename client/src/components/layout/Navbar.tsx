import { NavLink } from 'react-router-dom';

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-mega-blue-800 border-b-4 border-hero-gold-500">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <NavLink to="/" className="flex flex-col">
          <span className="font-display text-hero-gold-500 text-2xl leading-none tracking-wide">
            HR HERO
          </span>
          <span className="font-heading text-corp-gray-300 text-[10px] uppercase tracking-widest">
            Megacorp Industries
          </span>
        </NavLink>

        <div className="flex items-center gap-6">
          <NavLink
            to="/positions"
            className={({ isActive }) =>
              `font-heading text-sm uppercase tracking-wider transition-colors ${
                isActive
                  ? 'text-hero-gold-500 border-b-2 border-hero-gold-500 pb-0.5'
                  : 'text-corp-gray-300 hover:text-white'
              }`
            }
          >
            Positions
          </NavLink>
          <NavLink
            to="/talent"
            className={({ isActive }) =>
              `font-heading text-sm uppercase tracking-wider transition-colors ${
                isActive
                  ? 'text-hero-gold-500 border-b-2 border-hero-gold-500 pb-0.5'
                  : 'text-corp-gray-300 hover:text-white'
              }`
            }
          >
            Talent Pool
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
