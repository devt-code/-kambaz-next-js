"use client";
import { useEffect, useState } from "react";
import { FormControl } from "react-bootstrap";

function dateObjectToHtmlDateString(d: Date) {
  // your existing helper
  return d.toISOString().slice(0, 10);
}

export default function DateStateVariable() {
  // 1) Stable SSR: render null first (same on server & client)
  const [startDate, setStartDate] = useState<Date | null>(null);

  // 2) Set the real date only on the client (post-hydration)
  useEffect(() => {
    setStartDate(new Date());
  }, []);

  return (
    <div id="wd-date-state-variables">
      <h2>Date State Variables</h2>

      {/* Optional: suppressHydrationWarning if you ever show time-changing text */}
      <h3 suppressHydrationWarning>
        {startDate ? JSON.stringify(startDate) : "…"}
      </h3>

      <h3 suppressHydrationWarning>
        {startDate ? dateObjectToHtmlDateString(startDate) : ""}
      </h3>

      <FormControl
        type="date"
        value={startDate ? dateObjectToHtmlDateString(startDate) : ""}
        onChange={(e) => {
          const d = new Date(e.target.value);
          if (!isNaN(d.getTime())) setStartDate(d);
        }}
      />
    </div>
  );
}
