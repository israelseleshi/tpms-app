# EIPA Form 01: Coordinate Mapping Specification

## PDF Metadata
- **Template Path:** `/public/application_form.pdf`
- **Unit of Measure:** Points (1/72 inch).
- **Page Size:** A4 (approx. 595 x 842 pts).

## Field Coordinates (Approximate - Requires Fine-Tuning)
| Digital Field | Page | X (pt) | Y (pt) | Logic |
| :--- | :--- | :--- | :--- | :--- |
| **Applicant Name** | 1 | 180 | 665 | Text Overlay |
| **City** | 1 | 85 | 640 | Text Overlay |
| **Nationality** | 1 | 380 | 560 | Text Overlay |
| **Mark Image** | 2 | 80 | 580 | Scale to 140pt x 140pt (5cm) |
| **Goods Mark (Check)** | 1 | 65 | 400 | Draw "X" or "✓" |
| **Service Mark (Check)** | 1 | 65 | 385 | Draw "X" or "✓" |

## Technical Implementation Logic
1. **Font Loading:** Load standard `Helvetica` to ensure the English text is readable. 
2. **Amharic Support:** To render the Applicant Name in Amharic (as seen in Section 1), a Unicode-enabled font must be embedded (e.g., 'Noto Sans Ethiopic').
3. **Image Logic:** Before embedding the Mark Image, check the aspect ratio. Center it within the 140pt x 140pt box defined in Section IV.