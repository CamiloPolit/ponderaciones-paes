import { useState, useEffect } from "react";

function useParseDateRange(dateRange) {
  const [yearsElapsed, setYearsElapsed] = useState(null);

  useEffect(() => {
    if (dateRange) {
      const [start, end] = dateRange.split(" AL ");

      const [startDay, startMonth, startYear] = start.split("/");
      const [endDay, endMonth, endYear] = end.split("/");

      const startDate = new Date(`${startYear}-${startMonth}-${startDay}`);
      const endDate = new Date(`${endYear}-${endMonth}-${endDay}`);

      const yearsDifference = endDate.getFullYear() - startDate.getFullYear();

      const hasCompletedYear =
        endDate.getMonth() > startDate.getMonth() ||
        (endDate.getMonth() === startDate.getMonth() &&
          endDate.getDate() >= startDate.getDate());

      const totalYears = hasCompletedYear
        ? yearsDifference
        : yearsDifference - 1;

      setYearsElapsed(totalYears);
    }
  }, [dateRange]);

  return { yearsElapsed };
}

export default useParseDateRange;
