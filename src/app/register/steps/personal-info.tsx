import {
  BasicInfoSection,
  ContactSection,
  DocumentsSection,
  AddressSection,
} from "../components/sections";

export function PersonalInfoStep() {
  return (
    <div className="space-y-6">
      <BasicInfoSection />
      <ContactSection />
      <DocumentsSection />
      <AddressSection />
    </div>
  );
}
