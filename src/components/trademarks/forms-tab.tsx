'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Download, FileText, Settings } from 'lucide-react';
import { toast } from 'sonner';
import { fillEipaForm, type FormData } from '@/lib/pdf/actions';

interface FormsTabProps {
  trademark: {
    appNo: string;
    mark: string;
    class: string;
    jurisdiction: string;
    status: string;
    applicantName?: string;
    city?: string;
    nationality?: string;
  };
}

export function FormsTab({ trademark }: FormsTabProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [availableFields, setAvailableFields] = useState<string[]>([]);
  const [showFields, setShowFields] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    applicant_name: trademark.applicantName || '',
    address_street: '',
    address_zone: '',
    city_name: '',
    city_code: '',
    state_name: '',
    state_code: '',
    zip_code: '',
    wereda: '',
    house_no: '',
    telephone: '',
    email: '',
    fax: '',
    nationality: '',
    po_box: '',
    residence_country: '',
    chk_goods: false,
    chk_service: false,
    chk_services: false,
    chk_collective: false,
    chk_female: false,
    chk_male: false,
    chk_company: false,
    // Section IV defaults
    mark_type_figurative: false,
    mark_type_word: false,
    mark_type_mixed: false,
    mark_type_three_dim: false,
    mark_description: '',
    mark_translation: '',
    mark_transliteration: '',
    mark_language_requiring_translation: '',
    mark_has_three_dim_features: '',
    mark_color_indication: '',
    goods_services_list: '',
    // Section V
    disclaimer_text: '',
    // Section VI
    priority_country: '',
    priority_application_filing_date: '',
    priority_application_number: '',
    priority_goods_services_covered: '',
    priority_certificate_will_follow: false,
    // Section VII
    checklist_power_of_attorney: false,
    checklist_priority_docs: false,
    checklist_3d_drawing: false,
    checklist_proof_of_payment: false,
    checklist_other_docs: false,
    checklist_other_docs_specify: '',
    // Signature
    signature_applicant: false,
    signature_agent: false,
    signature_date: '',
  });

  const handleInputChange = <K extends keyof FormData>(field: K, value: FormData[K]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleInspectFields = async () => {
    try {
      const { inspectPdfFields } = await import('@/lib/pdf/actions');
      const fields = await inspectPdfFields();
      setAvailableFields(fields);
      setShowFields(true);
      toast.success(`Found ${fields.length} fields in PDF template`);
    } catch (error) {
      console.error('Error inspecting fields:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      toast.error(`Failed to inspect PDF fields: ${errorMessage}`);
    }
  };

  const handleDownloadDebugPdf = async () => {
    setIsGenerating(true);

    try {
      console.log('Starting field debug PDF generation...');
      const { generateFieldDebugPdf } = await import('@/lib/pdf/actions');

      const pdfBytes = await generateFieldDebugPdf();
      console.log('Field debug PDF generated successfully, size:', pdfBytes.length, 'bytes');

      // Create a blob and download debug PDF
      const uint8Array = new Uint8Array(pdfBytes);
      const blob = new Blob([uint8Array], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `EIPA_Form_Field_Debug.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success('Field debug PDF downloaded successfully!');
    } catch (error) {
      console.error('Error generating field debug PDF:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      toast.error(`Failed to generate field debug PDF: ${errorMessage}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadEipaForm = async () => {
    setIsGenerating(true);

    try {
      console.log('Starting EIPA form generation...');
      console.log('Form data being sent:', formData);

      const pdfBytes = await fillEipaForm(formData);
      console.log('PDF generated successfully, size:', pdfBytes.length, 'bytes');

      // Create a blob and download PDF
      const uint8Array = new Uint8Array(pdfBytes);
      const blob = new Blob([uint8Array], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `EIPA_Form_${trademark.appNo}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success('EIPA form downloaded successfully!');
    } catch (error) {
      console.error('Error generating PDF:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      toast.error(`Failed to generate EIPA form: ${errorMessage}`);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="glass-card smooth-corners">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            EIPA Application Form Data
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Section 1: Applicant Information */}
          <div className="flex gap-6 flex-wrap">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="chk_female"
                checked={formData.chk_female}
                onCheckedChange={(checked) => handleInputChange('chk_female', checked === true)}
              />
              <Label htmlFor="chk_female">Female</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="chk_male"
                checked={formData.chk_male}
                onCheckedChange={(checked) => handleInputChange('chk_male', checked === true)}
              />
              <Label htmlFor="chk_male">Male</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="chk_company"
                checked={formData.chk_company}
                onCheckedChange={(checked) => handleInputChange('chk_company', checked === true)}
              />
              <Label htmlFor="chk_company">Company</Label>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-900 border-b pb-2">I. Applicant Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="applicant_name">Applicant Name *</Label>
                <Input
                  id="applicant_name"
                  value={formData.applicant_name}
                  onChange={(e) => handleInputChange('applicant_name', e.target.value)}
                  placeholder="Enter applicant name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nationality">Nationality</Label>
                <Input
                  id="nationality"
                  value={formData.nationality}
                  onChange={(e) => handleInputChange('nationality', e.target.value)}
                  placeholder="Enter nationality"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Address Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-900 border-b pb-2">II. Address Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address_street">Address Street</Label>
                <Input
                  id="address_street"
                  value={formData.address_street}
                  onChange={(e) => handleInputChange('address_street', e.target.value)}
                  placeholder="Enter street address"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address_zone">Address Zone/Subcity</Label>
                <Input
                  id="address_zone"
                  value={formData.address_zone}
                  onChange={(e) => handleInputChange('address_zone', e.target.value)}
                  placeholder="Enter zone or subcity"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="city_name">City Name</Label>
                <Input
                  id="city_name"
                  value={formData.city_name}
                  onChange={(e) => handleInputChange('city_name', e.target.value)}
                  placeholder="Enter city"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city_code">City Code</Label>
                <Input
                  id="city_code"
                  value={formData.city_code}
                  onChange={(e) => handleInputChange('city_code', e.target.value)}
                  placeholder="Code"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state_name">State Name</Label>
                <Input
                  id="state_name"
                  value={formData.state_name}
                  onChange={(e) => handleInputChange('state_name', e.target.value)}
                  placeholder="Enter state"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="state_code">State Code</Label>
                <Input
                  id="state_code"
                  value={formData.state_code}
                  onChange={(e) => handleInputChange('state_code', e.target.value)}
                  placeholder="Code"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="zip_code">Zip Code</Label>
                <Input
                  id="zip_code"
                  value={formData.zip_code}
                  onChange={(e) => handleInputChange('zip_code', e.target.value)}
                  placeholder="Zip"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="residence_country">Country of Residence</Label>
                <Input
                  id="residence_country"
                  value={formData.residence_country}
                  onChange={(e) => handleInputChange('residence_country', e.target.value)}
                  placeholder="Enter country"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="wereda">Wereda</Label>
                <Input
                  id="wereda"
                  value={formData.wereda}
                  onChange={(e) => handleInputChange('wereda', e.target.value)}
                  placeholder="Wereda"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="house_no">House No.</Label>
                <Input
                  id="house_no"
                  value={formData.house_no}
                  onChange={(e) => handleInputChange('house_no', e.target.value)}
                  placeholder="No."
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="po_box">P.O. Box</Label>
                <Input
                  id="po_box"
                  value={formData.po_box}
                  onChange={(e) => handleInputChange('po_box', e.target.value)}
                  placeholder="Enter P.O. Box"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-900 border-b pb-2">III. Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="telephone">Telephone</Label>
                <Input
                  id="telephone"
                  value={formData.telephone}
                  onChange={(e) => handleInputChange('telephone', e.target.value)}
                  placeholder="Enter phone"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Enter email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fax">Fax</Label>
                <Input
                  id="fax"
                  value={formData.fax}
                  onChange={(e) => handleInputChange('fax', e.target.value)}
                  placeholder="Enter fax"
                />
              </div>
            </div>
          </div>

          {/* Section 4: Mark Details */}
          <div className="space-y-4">
            <h3 className="text-md font-semibold text-slate-900 border-b pb-2">IV. Mark Details</h3>
            <div className="flex gap-6 flex-wrap">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="chk_goods"
                  checked={formData.chk_goods}
                  onCheckedChange={(checked) => handleInputChange('chk_goods', checked === true)}
                />
                <Label htmlFor="chk_goods">Goods Mark</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="chk_services"
                  checked={formData.chk_services}
                  onCheckedChange={(checked) => handleInputChange('chk_services', checked === true)}
                />
                <Label htmlFor="chk_services">Service Mark</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="chk_collective"
                  checked={formData.chk_collective}
                  onCheckedChange={(checked) => handleInputChange('chk_collective', checked === true)}
                />
                <Label htmlFor="chk_collective">Collective Mark</Label>
              </div>
            </div>
              {/* Mark Type Checkboxes */}
            <div className="flex gap-6 flex-wrap mt-2">
              {[
                { id: 'mark_type_figurative', label: 'Figurative' },
                { id: 'mark_type_word', label: 'Word' },
                { id: 'mark_type_mixed', label: 'Mixed' },
                { id: 'mark_type_three_dim', label: 'Three Dimension' },
              ].map(({ id, label }) => (
                <div key={id} className="flex items-center space-x-2">
                  <Checkbox
                    id={id}
                    checked={Boolean(formData[id as keyof FormData])}
                    onCheckedChange={(checked) => handleInputChange(id as keyof FormData, checked === true)}
                  />
                  <Label htmlFor={id}>{label}</Label>
                </div>
              ))}
            </div>

            {/* Mark Description & Translation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="mark_description">Description of the Mark</Label>
                <Textarea
                  id="mark_description"
                  value={formData.mark_description}
                  onChange={(e) => handleInputChange('mark_description', e.target.value)}
                  placeholder="Describe the mark"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mark_translation">Translation (if any)</Label>
                <Input
                  id="mark_translation"
                  value={formData.mark_translation}
                  onChange={(e) => handleInputChange('mark_translation', e.target.value)}
                  placeholder="Translation"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mark_transliteration">Transliteration (non-English)</Label>
                <Input
                  id="mark_transliteration"
                  value={formData.mark_transliteration}
                  onChange={(e) => handleInputChange('mark_transliteration', e.target.value)}
                  placeholder="Transliteration"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mark_language_requiring_translation">Language requiring translation</Label>
                <Input
                  id="mark_language_requiring_translation"
                  value={formData.mark_language_requiring_translation}
                  onChange={(e) => handleInputChange('mark_language_requiring_translation', e.target.value)}
                  placeholder="Language"
                />
              </div>
            </div>

            {/* 3-D features & Color indication */}
            <div className="space-y-2 mt-2">
              <Label htmlFor="mark_has_three_dim_features">Indication of 3-Dimensional features</Label>
              <Input
                id="mark_has_three_dim_features"
                value={formData.mark_has_three_dim_features}
                onChange={(e) => handleInputChange('mark_has_three_dim_features', e.target.value)}
                placeholder="Describe any 3-D features of the mark"
              />
            </div>
            <div className="space-y-2 mt-4">
              <Label htmlFor="mark_color_indication">Indication of color(s)</Label>
              <Input
                id="mark_color_indication"
                value={formData.mark_color_indication}
                onChange={(e) => handleInputChange('mark_color_indication', e.target.value)}
                placeholder="e.g. Red, Black & White"
              />
            </div>

            {/* Goods/Services list */}
            <div className="space-y-2 mt-4">
              <Label htmlFor="goods_services_list">List of goods & services</Label>
              <Textarea
                id="goods_services_list"
                value={formData.goods_services_list}
                onChange={(e) => handleInputChange('goods_services_list', e.target.value)}
                placeholder="One item per line"
              />
            </div>
          </div>

          {/* Section 5: Disclaimer */}
          <div className="space-y-4 mt-6">
            <h3 className="text-md font-semibold text-slate-900 border-b pb-2">V. Disclaimer</h3>
            <Textarea
              id="disclaimer_text"
              value={formData.disclaimer_text}
              onChange={(e) => handleInputChange('disclaimer_text', e.target.value)}
              placeholder="No claim is made to the exclusive right to use ..."
            />
          </div>

          {/* Section 6: Priority Right */}
          <div className="space-y-4 mt-6">
            <h3 className="text-md font-semibold text-slate-900 border-b pb-2">VI. Priority Right (if any)</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="priority_country">Country</Label>
                <Input
                  id="priority_country"
                  value={formData.priority_country}
                  onChange={(e) => handleInputChange('priority_country', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="priority_application_filing_date">Filing Date</Label>
                <Input
                  id="priority_application_filing_date"
                  type="date"
                  value={formData.priority_application_filing_date}
                  onChange={(e) => handleInputChange('priority_application_filing_date', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="priority_application_number">Application No.</Label>
                <Input
                  id="priority_application_number"
                  value={formData.priority_application_number}
                  onChange={(e) => handleInputChange('priority_application_number', e.target.value)}
                />
              </div>
              <div className="space-y-2 md:col-span-3">
                <Label htmlFor="priority_goods_services_covered">Goods/services covered</Label>
                <Textarea
                  id="priority_goods_services_covered"
                  value={formData.priority_goods_services_covered}
                  onChange={(e) => handleInputChange('priority_goods_services_covered', e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <Checkbox
                id="priority_certificate_will_follow"
                checked={formData.priority_certificate_will_follow}
                onCheckedChange={(checked) => handleInputChange('priority_certificate_will_follow', checked === true)}
              />
              <Label htmlFor="priority_certificate_will_follow">Certificate will be submitted within 3 months</Label>
            </div>
          </div>

          {/* Section 7: Checklist */}
          <div className="space-y-4 mt-6">
            <h3 className="text-md font-semibold text-slate-900 border-b pb-2">VII. Check List (tick where applicable)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { id: 'checklist_power_of_attorney', label: 'Power of Attorney' },
                { id: 'checklist_priority_docs', label: 'Priority Documents' },
                { id: 'checklist_3d_drawing', label: 'Drawing of the Mark with 3D features' },
                { id: 'checklist_proof_of_payment', label: 'Proof of payment' },
                { id: 'checklist_other_docs', label: 'Other document(s)' },
              ].map(({ id, label }) => (
                <div key={id} className="flex items-center space-x-2">
                  <Checkbox
                    id={id}
                    checked={Boolean(formData[id as keyof FormData])}
                    onCheckedChange={(checked) => handleInputChange(id as keyof FormData, checked === true)}
                  />
                  <Label htmlFor={id}>{label}</Label>
                </div>
              ))}
            </div>
            {formData.checklist_other_docs && (
              <div className="space-y-2 mt-2">
                <Label htmlFor="checklist_other_docs_specify">Specify other document(s)</Label>
                <Input
                  id="checklist_other_docs_specify"
                  value={formData.checklist_other_docs_specify}
                  onChange={(e) => handleInputChange('checklist_other_docs_specify', e.target.value)}
                />
              </div>
            )}
          </div>

          {/* Signature Section */}
          <div className="space-y-4 mt-6">
            <h3 className="text-md font-semibold text-slate-900 border-b pb-2">Signature</h3>
            <div className="flex gap-6 flex-wrap">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="signature_applicant"
                  checked={formData.signature_applicant}
                  onCheckedChange={(checked) => handleInputChange('signature_applicant', checked === true)}
                />
                <Label htmlFor="signature_applicant">Applicant</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="signature_agent"
                  checked={formData.signature_agent}
                  onCheckedChange={(checked) => handleInputChange('signature_agent', checked === true)}
                />
                <Label htmlFor="signature_agent">Agent</Label>
              </div>
            </div>
            <div className="space-y-2 mt-2 max-w-xs">
              <Label htmlFor="signature_date">Date</Label>
              <Input
                id="signature_date"
                type="date"
                value={formData.signature_date}
                onChange={(e) => handleInputChange('signature_date', e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={handleDownloadEipaForm}
              disabled={isGenerating || !formData.applicant_name}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              {isGenerating ? 'Generating...' : 'Download Filled Form'}
            </Button>

            <Button
              variant="outline"
              onClick={handleDownloadDebugPdf}
              disabled={isGenerating}
              className="flex items-center gap-2"
            >
              <Settings className="h-4 w-4" />
              Download Field Debug PDF
            </Button>

            <Button
              variant="secondary"
              onClick={handleInspectFields}
              disabled={isGenerating}
              className="flex items-center gap-2"
            >
              <Settings className="h-4 w-4" />
              Inspect PDF Fields
            </Button>
          </div>

          {showFields && availableFields.length > 0 && (
            <div className="mt-4 p-4 bg-slate-50 rounded-lg">
              <h4 className="font-medium text-slate-700 mb-2">Available PDF Fields:</h4>
              <div className="flex flex-wrap gap-2">
                {availableFields.map((field, index) => (
                  <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                    {field}
                  </span>
                ))}
              </div>
              <p className="text-xs text-slate-500 mt-2">
                These are the field names found in your PDF template. Make sure they match the field mappings in the code.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="glass-card smooth-corners">
        <CardHeader>
          <CardTitle>Form Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-slate-700">Form Type:</span>
              <span className="ml-2 text-slate-600">EIPA Form 01 - Application for Registration</span>
            </div>
            <div>
              <span className="font-medium text-slate-700">Template:</span>
              <span className="ml-2 text-slate-600">Ethiopian Intellectual Property Office</span>
            </div>
            <div>
              <span className="font-medium text-slate-700">Language Support:</span>
              <span className="ml-2 text-slate-600">English & Amharic (Unicode)</span>
            </div>
            <div>
              <span className="font-medium text-slate-700">Format:</span>
              <span className="ml-2 text-slate-600">PDF (A4)</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
