import { Home, Plus, Search, UserCircle } from 'lucide-react';
const Navigation = ({ onCreateCampaign, onSearch }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-800 shadow-2xl">
      <div className="flex justify-around py-4">
        {[
          { icon: Home, label: 'Home' },
          { icon: Plus, label: 'Create', onClick: onCreateCampaign },
          { icon: Search, label: 'Search', onClick: onSearch },
          { icon: UserCircle, label: 'Profile' }
        ].map(({ icon: Icon, label, onClick }) => (
          <button 
            key={label}
            onClick={onClick}
            className="flex flex-col items-center text-zinc-500 hover:text-emerald-500 transition-colors"
          >
            <Icon strokeWidth={1.5} />
            <span className="text-xs mt-1">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;