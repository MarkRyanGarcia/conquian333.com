import { useState, useRef } from "react";

export default function DownloadButton({ children }: any) {
    const [coords, setCoords] = useState({ x: -1, y: -1 });
    const [isHovering, setIsHovering] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!buttonRef.current) return;
        const rect = buttonRef.current.getBoundingClientRect();

        setCoords({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });

        setIsHovering(true);
    };

    return (
        <button
            ref={buttonRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={() => setIsHovering(false)}
            className="relative px-6 py-1 rounded-full overflow-hidden border-2 border-offwhite group"
        >
            <span className="relative z-10 transition-colors duration-200 group-hover:text-black">
                {children}
            </span>
            <span
                className="absolute z-0 bg-offwhite rounded-full pointer-events-none transition-transform duration-300 ease-out"
                style={{
                    width: "200%",
                    height: "0",
                    paddingBottom: "200%",
                    left: coords.x,
                    top: coords.y,
                    transform: isHovering
                        ? "translate(-50%, -50%) scale(1)"
                        : "translate(-50%, -50%) scale(0)",
                }}
            />
        </button>
    );
};
