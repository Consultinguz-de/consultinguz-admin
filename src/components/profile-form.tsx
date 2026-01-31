"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Mail, User, Camera, Save } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/auth-context";

export function ProfileForm() {
  const { user, loading, updateUserProfile } = useAuth();
  const [displayName, setDisplayName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || "");
      setPhotoURL(user.photoURL || "");
    }
  }, [user]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateUserProfile(displayName, photoURL);
      toast.success("Profil muvaffaqiyatli yangilandi!");
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error("Profilni yangilashda xatolik yuz berdi");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return <p className="text-muted-foreground">Yuklanmoqda...</p>;
  }

  return (
    <div className="grid gap-6 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Profil ma'lumotlari</CardTitle>
          <CardDescription>
            Profil rasmingiz va ismingizni o'zgartiring
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-6">
            {photoURL ? (
              <img
                src={photoURL}
                alt={displayName || "User"}
                className="w-24 h-24 rounded-full object-cover border-4 border-muted"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center border-4 border-muted">
                <User className="w-12 h-12 text-muted-foreground" />
              </div>
            )}
            <div className="flex-1">
              <p className="text-lg font-semibold">
                {displayName || "Foydalanuvchi"}
              </p>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="displayName" className="text-base font-medium">
                <User className="w-4 h-4 inline mr-2" />
                Ism (Display Name)
              </Label>
              <Input
                id="displayName"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Ismingizni kiriting"
                className="text-lg h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="photoURL" className="text-base font-medium">
                <Camera className="w-4 h-4 inline mr-2" />
                Profil rasmi URL (Photo URL)
              </Label>
              <Input
                id="photoURL"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                placeholder="https://example.com/photo.jpg"
                className="text-lg h-12"
              />
              <p className="text-sm text-muted-foreground">
                Rasm URL manzilini kiriting (masalan:
                https://example.com/photo.jpg)
              </p>
            </div>
          </div>

          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="w-full h-12 text-base"
          >
            <Save className="w-5 h-5 mr-2" />
            {isSaving ? "Saqlanmoqda..." : "Saqlash"}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Hisob ma'lumotlari</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
            <Mail className="w-6 h-6 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="text-lg font-medium">
                {user?.email || "Mavjud emas"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
            <User className="w-6 h-6 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">UID</p>
              <p className="text-sm font-mono">{user?.uid}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
