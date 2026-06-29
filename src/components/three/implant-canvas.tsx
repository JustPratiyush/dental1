"use client";

import dynamic from "next/dynamic";

/**
 * Client-only loader for the WebGL hero. Three.js is heavy and DOM-dependent,
 * so it is code-split and excluded from SSR. While it loads (or if WebGL is
 * unavailable) the warm copper gradient behind it stands in gracefully.
 */
const ImplantScene = dynamic(() => import("./implant-scene"), {
  ssr: false,
  loading: () => <div className="h-full w-full" aria-hidden="true" />,
});

export function ImplantCanvas({ className }: { className?: string }) {
  return (
    <div className={className} aria-hidden="true">
      <ImplantScene />
    </div>
  );
}
