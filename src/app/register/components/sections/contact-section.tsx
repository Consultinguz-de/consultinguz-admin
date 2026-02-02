import { FormField } from "../form-field";
import { PhoneInput } from "../phone-input";

export function ContactSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <PhoneInput />
      <FormField
        id="email"
        label="Email"
        type="email"
        placeholder="email@example.com"
      />
    </div>
  );
}
