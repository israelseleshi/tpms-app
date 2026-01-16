'use server';

import { PDFDocument, StandardFonts } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import fs from 'fs/promises';
import path from 'path';

// Type definition for form data
export interface FormData {
  applicant_name: string;
  address_street?: string;
  address_zone?: string;
  city_name?: string;
  city_code?: string;
  state_name?: string;
  state_code?: string;
  zip_code?: string;
  wereda?: string;
  house_no?: string;
  telephone?: string;
  email?: string;
  fax?: string;
  nationality?: string;
  po_box?: string;
  residence_country?: string;
  tin_number?: string;
  phone_number?: string;
  trademark_name?: string;
  trademark_description?: string;
  nice_classes?: string[];
  // --- Section IV: Mark Details ---
  mark_type_figurative?: boolean;
  mark_type_word?: boolean;
  mark_type_mixed?: boolean;
  mark_type_three_dim?: boolean;
  mark_description?: string;
  mark_translation?: string;
  mark_transliteration?: string;
  mark_language_requiring_translation?: string;
  mark_has_three_dim_features?: string; // text field indicating presence of 3-D features
  mark_color_indication?: string;
  goods_services_list?: string;

  // --- Section V: Disclaimer ---
  disclaimer_text?: string;

  // --- Section VI: Priority Right ---
  priority_country?: string;
  priority_application_filing_date?: string; // yyyy-mm-dd
  priority_application_number?: string;
  priority_goods_services_covered?: string;
  priority_certificate_will_follow?: boolean;

  // --- Section VII: Checklist (Applicant) ---
  checklist_power_of_attorney?: boolean;
  checklist_priority_docs?: boolean;
  checklist_3d_drawing?: boolean;
  checklist_proof_of_payment?: boolean;
  checklist_other_docs?: boolean;
  checklist_other_docs_specify?: string;

  // --- Signature Section ---
  signature_applicant?: boolean;
  signature_agent?: boolean;
  signature_date?: string; // yyyy-mm-dd
  // Checkbox flags matching PDF field names
  chk_female?: boolean;
  chk_male?: boolean;
  chk_company?: boolean;
  chk_goods?: boolean;
  chk_service?: boolean;
  chk_services?: boolean; // alias plural
  chk_collective?: boolean;
  
  // Backward-compatibility flags (will map to chk_goods / chk_service)
  is_goods_mark?: boolean;
  is_service_mark?: boolean;

  trademark_image_url?: string;
}

/**
 * Load the PDF template from public directory
 * CRITICAL: Must match the name of the file edited in Master PDF Editor
 */
async function loadPdfTemplate(): Promise<Uint8Array> {
  const templatePath = path.join(process.cwd(), 'public', 'application_form_template.pdf');
  const fallbackPath = path.join(process.cwd(), 'public', 'application_form.pdf');

  try {
    // Try the template file first
    const pdfBuffer = await fs.readFile(templatePath);
    console.log(`Loaded template: ${templatePath}`);
    return new Uint8Array(pdfBuffer);
  } catch (error) {
    // Fallback to the original file
    try {
      const pdfBuffer = await fs.readFile(fallbackPath);
      console.log(`Template not found, loaded fallback: ${fallbackPath}`);
      return new Uint8Array(pdfBuffer);
    } catch (_fallbackError) {
      console.error('Error loading PDF template:', _fallbackError);
      throw new Error(`Failed to load PDF template. Ensure 'public/application_form.pdf' exists.`);
    }
  }
}

/**
 * Load an Amharic-compatible font (Noto Sans Ethiopic)
 * Falls back to standard font if not available
 */
let cachedAmharicFont: Uint8Array | null | undefined;

async function loadAmharicFont(): Promise<Uint8Array | null> {
  if (cachedAmharicFont !== undefined) {
    return cachedAmharicFont;
  }

  const localPath = path.join(process.cwd(), 'public', 'fonts', 'NotoSansEthiopic-Regular.ttf');
  try {
    const localBytes = await fs.readFile(localPath);
    cachedAmharicFont = new Uint8Array(localBytes);
    return cachedAmharicFont;
  } catch (_localErr) {
    // try remote fetch as fallback (cached in-memory once downloaded)
    try {
      const remoteUrl =
        'https://raw.githubusercontent.com/googlefonts/noto-fonts/main/unhinted/ttf/NotoSansEthiopic/NotoSansEthiopic-Regular.ttf';
      const res = await fetch(remoteUrl);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const arrayBuffer = await res.arrayBuffer();
      cachedAmharicFont = new Uint8Array(arrayBuffer);
      return cachedAmharicFont;
    } catch (remoteErr) {
      console.warn('Amharic font could not be loaded locally or remotely, Ethiopic text may fail to render.');
      cachedAmharicFont = null;
      return null;
    }
  }
}

/**
 * Inspect PDF form fields - Returns list of field names in the PDF
 */
export async function inspectPdfFields(): Promise<string[]> {
  try {
    const pdfBytes = await loadPdfTemplate();
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const form = pdfDoc.getForm();
    return form.getFields().map(f => f.getName());
  } catch (error) {
    console.error('Error inspecting PDF fields:', error);
    throw new Error(`Failed to inspect PDF fields: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Generate a debug PDF that shows all field locations
 */
export async function generateFieldDebugPdf(): Promise<number[]> {
  try {
    const pdfBytes = await loadPdfTemplate();
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const form = pdfDoc.getForm();
    const fields = form.getFields();
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

    for (const field of fields) {
      if (field.constructor.name === 'PDFTextField') {
        try {
          const textField = form.getTextField(field.getName());
          textField.setText(`[${field.getName()}]`);
          textField.setFontSize(8);
          textField.updateAppearances(timesRomanFont);
        } catch (error) {
          console.warn(`Could not set debug text for field: ${field.getName()}`);
        }
      }
    }

    const debugPdfBytes = await pdfDoc.save();
    return Array.from(debugPdfBytes);
  } catch (error) {
    console.error('Error generating debug PDF:', error);
    throw new Error(`Failed to generate debug PDF: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Fill the EIPA Form 01 with provided form data
 * Uses named form fields exclusively (no hardcoded coordinate fallback)
 */
export async function fillEipaForm(formData: FormData): Promise<number[]> {
  try {
    console.log('Starting PDF generation...');
    const pdfBytes = await loadPdfTemplate();
    const pdfDoc = await PDFDocument.load(pdfBytes);

    pdfDoc.registerFontkit(fontkit);
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
    const timesRomanBoldFont = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);

    // Try to load Amharic font for Amharic text support
    let amharicFont = null;
    const amharicFontBytes = await loadAmharicFont();
    if (amharicFontBytes) {
      try {
        amharicFont = await pdfDoc.embedFont(amharicFontBytes);
      } catch (error) {
        console.warn('Failed to embed Amharic font');
      }
    }

    const form = pdfDoc.getForm();
    const availableFields = form.getFields().map(f => f.getName());
    console.log('Available fields in PDF:', availableFields);

    // --- HELPER: Set Field Safely ---
    const fillField = (possibleNames: string[], value: string | undefined, customFontSize?: number) => {
      if (!value) return;

      const match = possibleNames.find(name => availableFields.includes(name));

      if (match) {
        try {
          const field = form.getTextField(match);

          // Fix for "maxLength=0" issue: some PDF editors set maxLength to 0 which pdf-lib 
          // interprets as a limit of 0 characters. We'll set it to a large number if it's 0.
          try {
            const currentMaxLength = field.getMaxLength();
            if (currentMaxLength === 0) {
              field.setMaxLength(1000);
            }
          } catch (error) {
            // getMaxLength might not exist on all field types, ignore
          }

          const hasAmharicChars = /[\u1200-\u137F]/.test(value);
          const font = hasAmharicChars && amharicFont ? amharicFont : timesRomanFont;

          field.setText(value);

          // Use custom font size if provided, otherwise default to 12
          // Smaller fields like nationality, po_box, etc. might need smaller fonts
          field.setFontSize(customFontSize || 12);

          field.updateAppearances(font);
          console.log(`✅ Filled field '${match}' with '${value}' (size: ${customFontSize || 12})`);
        } catch (error) {
          console.error(`❌ Failed to fill '${match}'`, error);
        }
      } else {
        console.warn(`⚠️ Could not find any of these fields in the PDF: ${possibleNames.join(', ')}`);
      }
    };

    // --- MAPPING LOGIC ---

    // 1. Applicant Name
    fillField(['applicant_name', 'applicant_name_1', 'ApplicantName'], formData.applicant_name);

    // 2. Address Details
    fillField(['address_street', 'street', 'Address'], formData.address_street);
    fillField(['address_zone', 'zone', 'Zone', 'subcity'], formData.address_zone);
    fillField(['city_name', 'city', 'City'], formData.city_name);
    fillField(['city_code'], formData.city_code, 10); // Smaller font for code
    fillField(['state_name', 'state'], formData.state_name);
    fillField(['state_code'], formData.state_code, 10); // Smaller font for code
    fillField(['zip_code'], formData.zip_code, 10); // Smaller font for zip

    // 3. Specific Location Details
    fillField(['wereda'], formData.wereda, 10);
    fillField(['house_no'], formData.house_no, 10);

    // 4. Contact Information
    fillField(['telephone', 'phone'], formData.telephone, 10);
    fillField(['email'], formData.email, 5); // Decreased to 8pt to prevent cutoff
    fillField(['fax'], formData.fax, 10);
    fillField(['po_box', 'po_box_no'], formData.po_box, 10);

    // 5. Nationality & Residence
    fillField(['nationality'], formData.nationality, 9); // Proportional small font
    fillField(['residence_country'], formData.residence_country, 10);

    // 6. Checkbox helper
    const setCheckbox = (flag: boolean | undefined, names: string[]) => {
      if (!flag) return;
      const fieldName = names.find((n) => availableFields.includes(n));
      if (!fieldName) return;
      try {
        const field = form.getField(fieldName);
        if (field.constructor.name === 'PDFCheckBox') {
          form.getCheckBox(fieldName).check();
        } else if (field.constructor.name === 'PDFTextField') {
          const tf = form.getTextField(fieldName);
          tf.setText('X');
          tf.setFontSize(5);
          tf.updateAppearances(timesRomanBoldFont);
        }
      } catch (error) {
        /* ignored */
      }
    };

    // Map checkboxes based on new flags (fallback to old flags for goods/service)
    setCheckbox(formData.chk_female, ['female', 'chk_female', 'Female']);
    setCheckbox(formData.chk_male, ['male', 'chk_male', 'Male']);
    setCheckbox(formData.chk_company, ['company', 'chk_company', 'Company']);

    // Goods/Service/Collective Marks
    setCheckbox(formData.chk_goods ?? formData.is_goods_mark, ['goods_mark', 'chk_goods', 'GoodsMark']);
    setCheckbox(formData.chk_services ?? formData.chk_service ?? formData.is_service_mark, ['service_mark', 'chk_service', 'chk_services', 'ServiceMark']);
    setCheckbox(formData.chk_collective, ['collective_mark', 'chk_collective', 'CollectiveMark']);

    // 7. Mark Details (Section IV)
    fillField(['mark_translation'], formData.mark_translation);
    fillField(['mark_transliteration'], formData.mark_transliteration);
    fillField(['mark_language_requiring_translation'], formData.mark_language_requiring_translation);
    fillField(['mark_has_three_dim_features'], formData.mark_has_three_dim_features);
    fillField(['mark_color_indication'], formData.mark_color_indication);
    fillField(['goods_services_list'], formData.goods_services_list);

    // 8. Disclaimer (Section V)
    fillField(['disclaimer_text', 'disclaimer'], formData.disclaimer_text);

    // 9. Priority (Section VI)
    fillField(['priority_country'], formData.priority_country);
    fillField(['priority_application_filing_date', 'priority_date'], formData.priority_application_filing_date);
    fillField(['priority_application_number'], formData.priority_application_number);
    fillField(['priority_goods_services_covered'], formData.priority_goods_services_covered);

    // 10. Trademark Image (if URL provided)
    if (formData.trademark_image_url) {
      // Note: Coordinates for image are still needed as images aren't usually form fields
      // But we can try to find a field named 'mark_image' to get its position if possible
      // For now, we'll use the coordinate from Phase 6 spec if no field found
      await embedTrademarkImage(pdfDoc, formData.trademark_image_url, 1, 80, 580);
    }

    // Flatten form (makes fields uneditable and permanent)
    form.flatten();

    const filledPdfBytes = await pdfDoc.save();
    return Array.from(filledPdfBytes);

  } catch (error) {
    console.error('Error filling EIPA form:', error);
    throw new Error(`Failed to fill EIPA form: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Embed trademark image into the PDF
 */
export async function embedTrademarkImage(
  pdfDoc: PDFDocument,
  imageUrl: string,
  pageIndex: number,
  x: number,
  y: number,
  maxWidth: number = 140,
  maxHeight: number = 140
): Promise<void> {
  try {
    let imageBytes: Uint8Array;

    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      const response = await fetch(imageUrl);
      const arrayBuffer = await response.arrayBuffer();
      imageBytes = new Uint8Array(arrayBuffer);
    } else {
      const buffer = await fs.readFile(imageUrl);
      imageBytes = new Uint8Array(buffer);
    }

    let embeddedImage;
    if (imageUrl.toLowerCase().endsWith('.png')) {
      embeddedImage = await pdfDoc.embedPng(imageBytes);
    } else {
      embeddedImage = await pdfDoc.embedJpg(imageBytes);
    }

    const scaledDims = embeddedImage.scaleToFit(maxWidth, maxHeight);
    const offsetX = (maxWidth - scaledDims.width) / 2;
    const offsetY = (maxHeight - scaledDims.height) / 2;

    const pages = pdfDoc.getPages();
    if (pageIndex < pages.length) {
      const page = pages[pageIndex];
      page.drawImage(embeddedImage, {
        x: x + offsetX,
        y: y + offsetY,
        width: scaledDims.width,
        height: scaledDims.height,
      });
    }
  } catch (error) {
    console.error('Error embedding trademark image:', error);
  }
}