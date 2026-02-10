import type { Metadata } from "next";
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
import RegisterNotFound from "./not-found";
import { getDirectionByUuid } from "@/lib/directions";

export const metadata: Metadata = {
  title: "Ro'yxatdan o'tish",
  description: "Consulting Pro - Ro'yxatdan o'tish sahifasi",
};

export const dynamic = "force-dynamic";

interface RegisterPageProps {
  searchParams: Promise<{
    directionId?: string | string[];
    lead?: string | string[];
  }>;
}

export default async function RegisterPage({
  searchParams,
}: RegisterPageProps) {
  const { directionId, lead } = await searchParams;

  if (typeof directionId !== "string" || directionId.trim().length === 0) {
    return (
      <RegisterNotFound message="Yo'nalish topilmadi yoki link noto'g'ri." />
    );
  }

  const direction = await getDirectionByUuid(directionId);

  if (!direction) {
    return (
      <RegisterNotFound message="Yo'nalish topilmadi yoki link noto'g'ri." />
    );
  }
  if (direction.linkActive === false) {
    return (
      <RegisterNotFound message="Ro'yxatdan o'tish havolasi o'chirilgan." />
    );
  }

  if (typeof lead === "string" && lead.trim().length > 0) {
    const leadEntry = direction.leadLinks?.find(
      (item) => item.name === lead.trim(),
    );
    if (!leadEntry) {
      return <RegisterNotFound message="Lead topilmadi yoki link noto'g'ri." />;
    }
    if (leadEntry.active === false) {
      return <RegisterNotFound message="Ushbu lead havolasi o'chirilgan." />;
    }
  } else if (Array.isArray(lead)) {
    return <RegisterNotFound message="Lead parametri noto'g'ri formatda." />;
  }

  const leadName = typeof lead === "string" ? lead.trim() : undefined;

  return (
    <RegisterProvider
      directionTitle={direction.title}
      directionId={directionId}
      leadName={leadName}
    >
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
