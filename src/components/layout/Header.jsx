import { Bell, Share2, ChevronDown } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setRole } from '../../redux/slices/authSlice';
import { Badge } from '../common/Badge';

export const Header = () => {
  const dispatch = useDispatch();
  const role = useSelector(state => state.auth.role);
  const user = useSelector(state => state.auth.user);

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
      <div className="px-6 py-4 flex items-center justify-between">
        {/* Left: Breadcrumb */}
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-1">
            <span>{user.name}</span>
            <span>›</span>
            <span className="text-gray-900 dark:text-white font-medium">Dashboard</span>
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-500">
            Last update {new Date().toLocaleTimeString('en-IN', { 
              hour: '2-digit', 
              minute: '2-digit',
              hour12: true 
            })}
          </p>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-4">
          {/* Role Switcher */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Role:</span>
            <select
              value={role}
              onChange={(e) => dispatch(setRole(e.target.value))}
              className="px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="viewer">👁️ Viewer</option>
              <option value="admin">👑 Admin</option>
            </select>
          </div>

          {/* Role Badge */}
          <Badge variant={role === 'admin' ? 'primary' : 'default'}>
            {role === 'admin' ? 'Full Access' : 'Read Only'}
          </Badge>

          {/* Notifications */}
          <button className="relative p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Share Button */}
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
            <Share2 className="w-4 h-4" />
            Share
          </button>

          {/* User Avatar */}
          <button className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
            <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
              <span className="text-primary-700 dark:text-primary-300 font-semibold text-xs">
                {user.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>
    </header>
  );
};