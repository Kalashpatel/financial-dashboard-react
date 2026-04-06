export const Card = ({ children, className = '', title, action }) => {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm ${className}`}>
      {title && (
        <div className="flex items-center justify-between p-6 pb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {title}
          </h3>
          {action && <div>{action}</div>}
        </div>
      )}
      <div className={title ? 'px-6 pb-6' : 'p-6'}>
        {children}
      </div>
    </div>
  );
};