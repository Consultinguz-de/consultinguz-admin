import { Card, CardContent } from "@/components/ui/card";

export default function RegisterNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardContent className="text-center py-8">
          <p className="text-sm text-muted-foreground">
            Bu sahifaga faqat yo'nalish tanlangandan so'ng kirish mumkin.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
