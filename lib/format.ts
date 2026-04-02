const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split("-").map(Number);
  return `${day} ${MONTHS[month - 1]} ${year}`;
}

/** Formats a project's year/month fields as "Month YYYY" (e.g. "January 2026") */
export function formatProjectDate(year: number, month: number): string {
  return `${MONTHS[month - 1]} ${year}`;
}

