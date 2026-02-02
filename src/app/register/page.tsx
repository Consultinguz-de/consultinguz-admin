import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RegisterForm } from "./register-form";
import { RegisterResult } from "./register-result";
import { MobileResultFab } from "./mobile-result-fab";
import { RegisterProvider } from "./register-context";
import { RegisterHeader } from "./register-header";

export default function RegisterPage() {
  return (
    <RegisterProvider>
      <div className="h-screen flex bg-background p-2 md:p-4 overflow-hidden">
        <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-6">
          {/* Form Section */}
          <Card className="flex flex-col h-full overflow-hidden">
            <RegisterHeader />
            <CardContent className="flex-1 min-h-0 p-3 md:p-6 pt-0 md:pt-0">
              <RegisterForm />
            </CardContent>
          </Card>

          {/* Result Section - Desktop only */}
          <Card className="hidden md:flex flex-col h-full overflow-hidden">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Natija</CardTitle>
              <CardDescription>Ro'yxatdan o'tish natijasi</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex">
              <RegisterResult />
            </CardContent>
          </Card>
        </div>

        {/* Mobile FAB for Result */}
        <MobileResultFab />
      </div>
    </RegisterProvider>
  );
}
