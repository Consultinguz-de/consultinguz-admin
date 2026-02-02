import { FormField } from "../form-field";

export function DocumentsSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField id="passport" label="Passport raqam" placeholder="AA1234567" />
      <FormField id="photo" label="Rasm" type="file" accept="image/*" />
    </div>
  );
}
