"use strict";

function formatTable(rows) {
  if (!rows.length) return "";
  const headers = ["id", "date", "type", "amount", "category", "memo"];
  const data = rows.map((r) => [r.id, r.date, r.type, r.amount, r.category || "", r.memo || ""]);
  const colWidths = headers.map((h, i) =>
    Math.max(h.length, ...data.map((row) => String(row[i]).length))
  );
  const fmtRow = (row) =>
    row
      .map((v, i) => String(v).padEnd(colWidths[i]))
      .join("  ");
  const lines = [];
  lines.push(fmtRow(headers));
  lines.push(colWidths.map((w) => "".padEnd(w, "-")).join("  "));
  for (const r of data) lines.push(fmtRow(r));
  return lines.join("\n");
}

function formatCurrency(n) {
  const v = Number(n || 0);
  return new Intl.NumberFormat(undefined, { maximumFractionDigits: 0 }).format(v);
}

function formatStats({ income, expense, net }) {
  return [
    `수입:   ${formatCurrency(income)}`,
    `지출:   ${formatCurrency(expense)}`,
    `합계:   ${formatCurrency(net)}`,
  ].join("\n");
}

module.exports = { formatTable, formatStats };

