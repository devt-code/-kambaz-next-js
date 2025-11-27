"use client";
import { useEffect, useState } from "react";
import { FormControl } from "react-bootstrap";

function dateObjectToHtmlDateString(d: Date) {
  return d.toISOString().slice(0, 10);
}

export default function DateStateVariable() {
  const [startDate, setStartDate] = useState<Date | null>(null);

  useEffect(() => {
    setStartDate(new Date());
  }, []);

  return (
    <div id="wd-date-state-variables">
      <h2>Date State Variables</h2>

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
