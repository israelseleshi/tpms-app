'use client';

import { PDFDocument, StandardFonts } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';

// Type definition for form data (matching server-side)
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
    mark_type_figurative?: boolean;
    mark_type_word?: boolean;
    mark_type_mixed?: boolean;
    mark_type_three_dim?: boolean;
    mark_description?: string;
    mark_translation?: string;
    mark_transliteration?: string;
    mark_language_requiring_translation?: string;
    mark_has_three_dim_features?: string;
    mark_color_indication?: string;
    goods_services_list?: string;
    disclaimer_text?: string;
    priority_country?: string;
    priority_application_filing_date?: string;
    priority_application_number?: string;
    priority_goods_services_covered?: string;
    priority_certificate_will_follow?: boolean;
    checklist_power_of_attorney?: boolean;
    checklist_priority_docs?: boolean;
    checklist_3d_drawing?: boolean;
    checklist_proof_of_payment?: boolean;
    checklist_other_docs?: boolean;
    checklist_other_docs_specify?: string;
    signature_applicant?: boolean;
    signature_agent?: boolean;
    signature_date?: string;
    chk_female?: boolean;
    chk_male?: boolean;
    chk_company?: boolean;
    chk_goods?: boolean;
    chk_service?: boolean;
    chk_services?: boolean;
    chk_collective?: boolean;
}

// Cache for the PDF template
let cachedTemplate: Uint8Array | null = null;
let cachedAmharicFont: Uint8Array | null = null;

/**
 * Load the PDF template from public directory (client-side)
 */
async function loadPdfTemplate(): Promise<Uint8Array> {
    if (cachedTemplate) {
        return cachedTemplate;
    }

    try {
        const response = await fetch('/application_form_template.pdf');
        if (!response.ok) {
            // Try fallback
            const fallbackResponse = await fetch('/application_form.pdf');
            if (!fallbackResponse.ok) {
                throw new Error('Failed to load PDF template');
            }
            const arrayBuffer = await fallbackResponse.arrayBuffer();
            cachedTemplate = new Uint8Array(arrayBuffer);
            return cachedTemplate;
        }
        const arrayBuffer = await response.arrayBuffer();
        cachedTemplate = new Uint8Array(arrayBuffer);
        return cachedTemplate;
    } catch (error) {
        console.error('Error loading PDF template:', error);
        throw new Error('Failed to load PDF template. Ensure the template exists in /public directory.');
    }
}

/**
 * Load Amharic font (client-side)
 */
async function loadAmharicFont(): Promise<Uint8Array | null> {
    if (cachedAmharicFont !== undefined) {
        return cachedAmharicFont;
    }

    try {
        // Try local font first
        const localResponse = await fetch('/fonts/NotoSansEthiopic-Regular.ttf');
        if (localResponse.ok) {
            const arrayBuffer = await localResponse.arrayBuffer();
            cachedAmharicFont = new Uint8Array(arrayBuffer);
            return cachedAmharicFont;
        }

        // Fallback to remote
        const remoteUrl =
            'https://raw.githubusercontent.com/googlefonts/noto-fonts/main/unhinted/ttf/NotoSansEthiopic/NotoSansEthiopic-Regular.ttf';
        const remoteResponse = await fetch(remoteUrl);
        if (remoteResponse.ok) {
            const arrayBuffer = await remoteResponse.arrayBuffer();
            cachedAmharicFont = new Uint8Array(arrayBuffer);
            return cachedAmharicFont;
        }

        cachedAmharicFont = null;
        return null;
    } catch (_error) {
        console.warn('Amharic font could not be loaded, Ethiopic text may fail to render.');
        cachedAmharicFont = null;
        return null;
    }
}

/**
 * Fill the EIPA Form 01 with provided form data (CLIENT-SIDE)
 * Returns the PDF as a Uint8Array for preview
 */
export async function fillEipaFormClient(formData: FormData): Promise<Uint8Array> {
    try {
        console.log('Starting client-side PDF generation...');
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
            } catch (_error) {
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

                    // Fix for "maxLength=0" issue
                    try {
                        const currentMaxLength = field.getMaxLength();
                        if (currentMaxLength === 0) {
                            field.setMaxLength(1000);
                        }
                    } catch (_error) {
                        // getMaxLength might not exist on all field types, ignore
                    }

                    const hasAmharicChars = /[\u1200-\u137F]/.test(value);
                    const font = hasAmharicChars && amharicFont ? amharicFont : timesRomanFont;

                    field.setText(value);
                    field.setFontSize(customFontSize || 12);
                    field.updateAppearances(font);
                    console.log(`✅ Filled field '${match}' with '${value}' (size: ${customFontSize || 12})`);
                } catch (error) {
                    console.error(`❌ Failed to fill '${match}'`, error);
                }
            }
        };

        // --- MAPPING LOGIC (same as server-side) ---

        // 1. Applicant Name
        fillField(['applicant_name', 'applicant_name_1', 'ApplicantName'], formData.applicant_name);

        // 2. Address Details
        fillField(['address_street', 'street', 'Address'], formData.address_street);
        fillField(['address_zone', 'zone', 'Zone', 'subcity'], formData.address_zone);
        fillField(['city_name', 'city', 'City'], formData.city_name);
        fillField(['city_code'], formData.city_code, 10);
        fillField(['state_name', 'state'], formData.state_name);
        fillField(['state_code'], formData.state_code, 10);
        fillField(['zip_code'], formData.zip_code, 10);

        // 3. Specific Location Details
        fillField(['wereda'], formData.wereda, 10);
        fillField(['house_no'], formData.house_no, 10);

        // 4. Contact Information
        fillField(['telephone', 'phone'], formData.telephone, 10);
        fillField(['email'], formData.email, 10);
        fillField(['fax'], formData.fax, 10);
        fillField(['po_box', 'po_box_no'], formData.po_box, 10);

        // 5. Nationality & Residence
        fillField(['nationality'], formData.nationality, 9);
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
            } catch (_error) {
                /* ignored */
            }
        };

        // Map checkboxes
        setCheckbox(formData.chk_female, ['female', 'chk_female', 'Female']);
        setCheckbox(formData.chk_male, ['male', 'chk_male', 'Male']);
        setCheckbox(formData.chk_company, ['company', 'chk_company', 'Company']);

        // Goods/Service/Collective Marks
        setCheckbox(formData.chk_goods, ['goods_mark', 'chk_goods', 'GoodsMark']);
        setCheckbox(formData.chk_services ?? formData.chk_service, ['service_mark', 'chk_service', 'chk_services', 'ServiceMark']);
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

        // DON'T flatten for preview - keep it editable
        // form.flatten();

        const filledPdfBytes = await pdfDoc.save();
        return filledPdfBytes;

    } catch (error) {
        console.error('Error filling EIPA form (client-side):', error);
        throw new Error(`Failed to fill EIPA form: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}
