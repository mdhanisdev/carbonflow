from pypdf import PdfReader

reader = PdfReader("Breathe_ESG_Tech_Intern_Assignment.pdf")
for i, page in enumerate(reader.pages, start=1):
    text = page.extract_text() or ""
    print(f"--- PAGE {i} ---")
    print(text)
