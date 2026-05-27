# TRADEOFFS.md

Three deliberate omissions and why:

1. Real SAP integration (IDoc/BAPI/OData)
   - Omitted due to time: integrating with SAP requires credentials and environment setup. Instead, we handle CSV exports that approximate SAP's messy structure.

2. Full authentication and permissions
   - Omitted in favor of a simple tenant header. Implementing robust auth (SSO/OAuth) would take significant time and distract from data model quality.

3. PDF parsing for utility bills
   - Parsing scanned PDFs and extracting line-items is error-prone and time-consuming; we instead require CSV portal exports for utility data.

Each omission is documented and justified in `DECISIONS.md` and `SOURCES.md`.
