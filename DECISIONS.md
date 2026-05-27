# DECISIONS.md

This document records design choices made for the prototype and the rationale.

1. Ingestion mechanisms
   - SAP: simulate using CSV exports that mimic common SAP flat exports (chosen for ease of prototyping). Rationale: SAP real integrations (IDoc/BAPI/OData) are complex; CSV captures the real-world mess (inconsistent headers, locales).
   - Utility: chosen CSV portal export for facility meters. Rationale: many facility teams export CSVs; PDF parsing is harder and out-of-scope for a 4-day prototype.
   - Travel: simulate Concur-like CSV export containing travel lines with trip dates, origin/destination airports, and fare classes.

2. Storage
   - Use SQLite for prototype and auditability. Rationale: quick to set up and matches local dev environment. For real deployment, switch to Postgres.

3. Deployment
   - Target: Railway/Render for quick deployment of prototype. Rationale: easy GitHub integration and free tiers for demos. We'll run Django with Gunicorn.

4. Authentication & Multi-tenancy
   - Prototype uses a simple `X-Tenant-ID` header to distinguish tenants. Rationale: full auth (OAuth) would take too long for the prototype.

5. Data validation
   - Validate required columns per source and flag suspicious rows (e.g., extremely large values) instead of rejecting them.

Questions we would ask the PM
- Which subset of SAP export formats should we prioritize (IDoc vs OData vs flat CSV)?
- Expected retention and whether an external DB (Postgres) is available for the demo.
