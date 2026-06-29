"use client";

import { useEffect, useState } from "react";

/** Live local time for the studio (Europe/Madrid → CET/CEST). */
export function LiveClock() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: "Europe/Madrid",
    });
    const tick = () => setTime(`${fmt.format(new Date())} CET`);
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // suppressHydrationWarning: value is intentionally client-only.
  return (
    <span suppressHydrationWarning className="tabular-nums">
      {time || "—— CET"}
    </span>
  );
}
