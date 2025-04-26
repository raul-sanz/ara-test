const Skeleton: React.FC = () => (
  <div className="bg-gray-100 rounded-lg p-4 w-full">
    <div className="animate-pulse flex flex-col space-y-2">
      <div className="h-12 bg-gray-300 rounded"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
      <div className="h-4 bg-gray-300 rounded w-1/4"></div>
      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
    </div>
  </div>
);

export default Skeleton;