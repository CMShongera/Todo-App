import { Skeleton } from "./ui/skeleton"

const TodoSkeleton = () => {
  return (
      <div className="flex items-center space-x-4 p-4 border rounded-lg bg-card border-border">
          <Skeleton className="h-4 w-4 rounded" />
          <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
          </div>
          <div className="flex space-x-2">
              <Skeleton className="h-8 w-8 rounded" />
              <Skeleton className="h-8 w-8 rounded" />
          </div>
      </div>
  )
}

export default TodoSkeleton