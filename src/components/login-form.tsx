"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { VALIDATION_MESSAGES } from "@/constants/messages";
import { useAuth } from "@/contexts/auth-context";
import {
  loginSchema,
  type LoginFormData,
} from "@/app/(auth)/login/login.types";

export function LoginForm() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (field: keyof LoginFormData) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    };
  };

  const validateForm = (): boolean => {
    const { email, password } = formData;

    if (!email.trim() && !password.trim()) {
      toast.error(VALIDATION_MESSAGES.FIELDS_EMPTY);
      return false;
    }

    const result = loginSchema.safeParse(formData);

    if (!result.success) {
      const firstError = result.error.issues[0];
      toast.error(firstError.message);
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      await signIn(formData.email, formData.password);
      toast.success("Muvaffaqiyatli kirdingiz!");
      router.push("/");
    } catch (error) {
      console.error("Login error:", error);
      toast.error(VALIDATION_MESSAGES.LOGIN_ERROR);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="Gmail manzilingizni kiriting"
          value={formData.email}
          onChange={handleInputChange("email")}
          disabled={isLoading}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Parol</Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Parolingizni kiriting"
            value={formData.password}
            onChange={handleInputChange("password")}
            disabled={isLoading}
            className="pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            disabled={isLoading}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Yuklanmoqda..." : "Kirish"}
      </Button>
    </form>
  );
}
