import React, { useState } from 'react';
import { LayoutGrid,Settings,ChevronRight,ChevronLeft,} from 'lucide-react';
import { PiNotepadBold  } from "react-icons/pi";
import { LuNotebookPen } from "react-icons/lu";
import { BsCreditCard } from "react-icons/bs";
import { RiLogoutBoxLine } from "react-icons/ri";
import { Link ,useLocation  } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);
  

 const menuItems = [
  { id: 'dashboard', icon: LayoutGrid, label: 'Dashboard', path: '/dashboard' },
  { id: 'my-estimates', icon: PiNotepadBold, label: 'My Estimates', path: '/my-estimates' },
  { id: 'new-estimate', icon: LuNotebookPen , label: 'New Estimate', path: '/new-estimate' },
  { id: 'plan-credits', icon: BsCreditCard, label: 'Plan & Credits', path: '/plan-credits' },
  { id: 'settings', icon: Settings, label: 'Settings', path: '/settings' }
];

  return (
    
      <div className="flex md:flex-row flex-col md:h-screen">
        {/* Desktop Sidebar */}
        <div 
          className={`hidden md:flex bg-white backdrop-blur-3xl border-none border border-gray-200 rounded-3xl m-4 shadow-sm   transition-all duration-300 ease-in-out flex-col ${
            isOpen ? 'w-64' : 'w-18'
          }`}
        >
          {/* Desktop Toggle Button */}
          <div className="p-3 border-b border-gray-100">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-full flex items-center justify-center p-2 rounded-xl hover:bg-gray-50 transition-colors"
            >
              {isOpen ? (
                <ChevronLeft size={20} className="text-gray-600" />
              ) : (
                <ChevronRight size={20} className="text-gray-600" />
              )}
            </button>
          </div>

          {/* Desktop Menu Items */}
          <nav className="flex-1 p-3 md:space-y-4 lg:space-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;


              return (
    <Link to={item.path} key={item.id}>
      <button
        className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
          isActive
            ? 'bg-purple-100 text-purple-500 border-2 border-purple-300'
            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
        }`}
        title={!isOpen ? item.label : ''}
      >
        <Icon size={20} className="flex-shrink-0" />
        {isOpen && (
          <span className="font-medium text-sm whitespace-nowrap">
            {item.label}
          </span>
        )}
      </button>
    </Link>
  );
            })}
          </nav>

          
        </div>

        {/* Mobile Top Navigation - Horizontal Icons */}
        <div className="md:hidden bg-white border border-gray-200 rounded-3xl mx-4 mt-4 shadow-sm">
          <nav className="flex items-center justify-between p-3">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link to={item.path} key={item.id}>
                <button
                  
                  
                  className={`flex items-center justify-center p-3 rounded-xl transition-all duration-200 ${
                    isActive 
                      ? 'bg-purple-100 text-purple-500 border border-purple-300' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                  }`}
                >
                  <Icon size={20} />
                </button>
                </Link>
              );
            })}
          </nav>
        </div>

        
      </div>
    
  );
};

export default Sidebar;