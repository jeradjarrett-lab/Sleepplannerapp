interface AdPlacementProps {
  size: "medium" | "mobile" | "large" | "leaderboard";
  className?: string;
}

export function AdPlacement({
  size,
  className = "",
}: AdPlacementProps) {
  const dimensions =
    size === "medium"
      ? {
          width: 300,
          height: 250,
          name: "Medium Rectangle",
          mobileWidth: 300,
          mobileHeight: 250,
        }
      : size === "large"
        ? {
            width: 728,
            height: 90,
            name: "Leaderboard",
            mobileWidth: 320,
            mobileHeight: 50,
          }
        : size === "leaderboard"
          ? {
              width: 728,
              height: 90,
              name: "Leaderboard Banner",
              mobileWidth: 320,
              mobileHeight: 100,
            }
          : {
              width: 320,
              height: 100,
              name: "Mobile Banner",
              mobileWidth: 320,
              mobileHeight: 100,
            };

  return (
    <div
      className={`flex justify-center py-4 md:py-6 ${className}`}
    >
      <div className="w-full max-w-full overflow-hidden">
        <div className="text-center mb-2">
          <span className="text-[10px] text-white/40 uppercase tracking-wider">
            Advertisement
          </span>
        </div>
        <div
          className="mx-auto rounded-lg overflow-hidden bg-white/5 border border-white/10 flex items-center justify-center"
          style={{
            width: "100%",
            maxWidth: `${dimensions.width}px`,
            minHeight: `${dimensions.mobileHeight}px`,
          }}
        >
          <div className="text-center p-4">
            <p className="text-white/60 text-sm mb-2">
              {dimensions.name}
            </p>
            <p className="text-white/40 text-xs">
              Google AdSense Placeholder
            </p>
            <p className="text-white/30 text-xs mt-1">
              {dimensions.width}x{dimensions.height}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}