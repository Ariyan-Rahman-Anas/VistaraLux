export const SkeletonWidgetItem = () => (
    <article className="flex items-center justify-between gap-4 p-4 section-grant">
        <div>
            {/* Skeleton for Heading */}
            <div className="h-4 bg-gray-200 rounded-md w-20 mb-2 animate-pulse"></div>
            {/* Skeleton for Value */}
            <div className="h-6 bg-gray-200 rounded-md w-16 mb-2 animate-pulse"></div>
            {/* Skeleton for Percentage */}
            <div className="h-4 bg-gray-200 rounded-md w-24 animate-pulse"></div>
        </div>
        {/* Circular Skeleton */}
        <div className="relative h-[5rem] w-[5rem] rounded-full grid place-items-center bg-gray-200 animate-pulse">
            <div className="absolute h-16 w-16 bg-white rounded-full"></div>
        </div>
    </article>
);