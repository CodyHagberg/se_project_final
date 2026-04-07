/** Display labels for dashboard / leads pipeline */
export const LEAD_STATUS_LABELS = {
  new: "New",
  contacted: "Contacted",
  won: "Won",
  lost: "Lost",
};

/** Map legacy API values to current status keys (for UI before DB migration). */
export function normalizeLeadStatus(status) {
  if (status === "qualified") return "contacted";
  if (status === "closed") return "lost";
  if (Object.prototype.hasOwnProperty.call(LEAD_STATUS_LABELS, status)) return status;
  return "new";
}

export function leadStatusLabel(status) {
  const key = normalizeLeadStatus(status);
  return LEAD_STATUS_LABELS[key] || key;
}
