import type { Status } from "@/lib/blog";

const styles: Record<Status, React.CSSProperties> = {
  published: { color: "#38A169", background: "#F0FFF4" },
  pending: { color: "#DD6B20", background: "#FFFAF0" },
  rejected: { color: "#E53E3E", background: "#FFF5F5" },
};

const labels: Record<Status, string> = {
  published: "Published",
  pending: "Pending",
  rejected: "Rejected",
};

export default function StatusBadge({ status }: { status: Status }) {
  return (
    <span style={{
      ...styles[status],
      fontSize: 12, fontWeight: 500,
      padding: "2px 10px", borderRadius: 12,
      whiteSpace: "nowrap" as const,
      display: "inline-block",
    }}>
      {labels[status]}
    </span>
  );
}
