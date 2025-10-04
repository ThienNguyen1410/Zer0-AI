import { useEffect, useRef } from "react";
import { debugLog } from "../utils/logs/debug";

const RE_RENDER_ICON = "🔄";

export function useRenderTracker(componentName: string) {
    const renderCount = useRef(0);
    const lastRenderTime = useRef(Date.now());
    const isFirstRender = useRef(true);

    // Increment render count on every render
    renderCount.current += 1;

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return; // Skip logging for initial render
        }

        const now = Date.now();
        const timeSinceLastRender = lastRenderTime.current ? now - lastRenderTime.current : 0;
        lastRenderTime.current = now;
        debugLog(`${RE_RENDER_ICON} | ${componentName} --> re-render #${renderCount.current - 1} | (${timeSinceLastRender / 1000}s since last)`);
    });

    return renderCount.current;
}