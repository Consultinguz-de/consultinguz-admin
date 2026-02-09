import { Send } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface RegisterNotFoundProps {
  message?: string;
}

export default function RegisterNotFound({ message }: RegisterNotFoundProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardContent className="text-center py-8 space-y-4">
          <p className="text-sm text-muted-foreground">
            {message ||
              "Bu sahifaga faqat yo'nalish tanlangandan so'ng kirish mumkin."}
          </p>
          <Button asChild>
            <a
              href="https://t.me/consulting_UZB"
              target="_blank"
              rel="noreferrer"
            >
              <Send className="mr-2 h-4 w-4" />
              Barcha yo'nalishlarni ko'rish
            </a>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
