# SOURCES.md

For each source, what real-world format was researched, what was chosen for the prototype, and why.

## 1) SAP (fuel & procurement)
- Real-world formats researched: IDoc exports, flat CSV extracts, OData endpoints, BAPI responses.
- Prototype choice: flat CSV with messy headers and inconsistent units (e.g., 'Liter', 'L', 'lt').
- Why: CSV captures the variety and edge cases without needing SAP credentials. Sample rows include plant codes, material numbers, quantity, unit, currency, and posting date.
- What will break in real deployment: missing lookups for plant codes and vendor mappings; localization differences (comma decimal separators).

## 2) Utility (electricity)
- Real-world formats researched: portal CSV exports, supplier APIs, PDF invoices.
- Prototype choice: CSV meter readings with columns: meter_id, start_date, end_date, consumption, unit, tariff
- Why: portal CSV is common and covers billing periods and meter units. Sample data explains billing period boundaries.
- What will break: complex tariff structures, multi-rate tariffs, and daylight-savings edge cases.

## 3) Corporate travel (Concur/Navan)
- Real-world formats researched: Concur export samples, Navan API docs, CSV trip reports.
- Prototype choice: Concur-like CSV with traveler, trip_date, origin_airport, dest_airport, mode, distance(optional), cost
- Why: CSV enables per-line categorization and mapping to emission factors; when distance is missing we use airport-to-airport distance lookups.
- What will break: incomplete location data, aggregated reports without per-flight lines, or missing class/seat info.

## Sample data rationale
- All sample files are intentionally messy (mixed units, missing fields) to mimic realistic ingestion challenges. These samples are included in `client/sample.csv` and used by the upload flow.
