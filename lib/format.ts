const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split("-").map(Number);
  return `${day} ${MONTHS[month - 1]} ${year}`;
}

export function displayName(email: string): string {
  if (email === "jari@email.nl") return "Jari Dijk";
  if (email === "user@example.com") return "Demo User";
  return email.split("@")[0];
}
