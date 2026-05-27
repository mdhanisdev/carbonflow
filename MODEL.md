# MODEL.md

## Overview
This document describes the data model for CarbonFlow (Breathe ESG assignment). The model is designed to: support multi-tenancy, record Scope 1/2/3 categorization, track source-of-truth for each row (which source produced it and when), normalize units, and maintain an audit trail for edits and approvals.

## Core Entities
- Tenant
  - id (UUID)
  - name
  - created_at

- EmissionRecord
  - id (UUID)
  - tenant_id (FK -> Tenant)
  - source (enum: SAP, UTILITY, TRAVEL)
  - source_id (string) — id from the ingest source if available
  - uploaded_at (datetime)
  - record_date (date) — the date the measurement or activity occurred
  - category (string) — e.g., fuel, procurement, electricity, flight, hotel
  - value (float)
  - unit (string) — original unit from source
  - normalized_value (float) — value converted to standard unit (kgCO2e)
  - normalized_unit (string) — 'kgCO2e'
  - scope (enum: SCOPE_1, SCOPE_2, SCOPE_3)
  - status (enum: PENDING, APPROVED, REJECTED)
  - suspicious (boolean)
  - source_file (string|null)
  - original_row_data (json) — raw parsed row
  - created_by (string|null)
  - updated_by (string|null)
  - created_at, updated_at

- AuditLog
  - id
  - emission_record_id (FK)
  - action (enum: CREATE, UPDATE, APPROVE, REJECT)
  - actor (string)
  - details (json)
  - timestamp

## Normalization
- Units are normalized to `kgCO2e`. A small utility handles unit conversions (e.g., liters diesel -> kWh -> kgCO2e via factors) and distance-based emissions for travel (Haversine or airport code lookups when distances are not provided).
- We keep `original_row_data` so nothing is lost and normalization is reversible/traceable.

## Multi-tenancy
- `tenant_id` on `EmissionRecord` ensures data separation. All API endpoints accept an authenticated tenant context; for the prototype we use a simple `X-Tenant-ID` header.

## Audit & Source-of-truth
- Every create/update/approve action creates an `AuditLog` entry.
- `source` and `source_id` fields keep provenance of the row and allow re-ingestion reconciliation.

## Comments and Limits
- This prototype favors simplicity: single `EmissionRecord` table stores normalized data. For production, consider separate tables for meter readings vs activity events.
