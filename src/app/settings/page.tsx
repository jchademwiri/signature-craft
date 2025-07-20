"use client";

import { useSession, signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, User, LogOut, FileText, Settings, Edit, Lock, Save, X } from "lucide-react";
import Link from "next/link";

export default function SettingsPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  
  // Edit Profile State
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
  });
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);

  // Change Password State
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
    if (session) {
      setProfileData({
        name: session.user.name || "",
        email: session.user.email || "",
      });
    }
  }, [session, isPending, router]);

  const handleLogout = async () => {
    await signOut();
    router.push("/");
  };

  const handleEditProfile = () => {
    setIsEditingProfile(true);
  };

  const handleCancelEdit = () => {
    setIsEditingProfile(false);
    setProfileData({
      name: session?.user.name || "",
      email: session?.user.email || "",
    });
  };

  const handleUpdateProfile = async () => {
    if (!profileData.name.trim()) {
      alert("Name is required");
      return;
    }

    setIsUpdatingProfile(true);
    try {
      const response = await fetch("/api/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileData),
      });

      if (response.ok) {
        setIsEditingProfile(false);
        // Refresh the page to get updated session data
        window.location.reload();
      } else {
        const error = await response.json();
        alert(error.error || "Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const handleChangePassword = () => {
    setIsChangingPassword(true);
  };

  const handleCancelPasswordChange = () => {
    setIsChangingPassword(false);
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const handleUpdatePassword = async () => {
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      alert("All password fields are required");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords do not match");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      alert("New password must be at least 6 characters long");
      return;
    }

    setIsUpdatingPassword(true);
    try {
      const response = await fetch("/api/user/password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        }),
      });

      if (response.ok) {
        setIsChangingPassword(false);
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        alert("Password updated successfully");
      } else {
        const error = await response.json();
        alert(error.error || "Failed to update password");
      }
    } catch (error) {
      console.error("Error updating password:", error);
      alert("Failed to update password. Please try again.");
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  if (isPending || !session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <Container>
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Dashboard
                </Link>
              </Button>
              <div className="flex items-center gap-2">
                <FileText className="h-6 w-6 text-primary" />
                <span className="font-semibold text-lg">SignatureCraft</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                Welcome, {session.user.name}
              </span>
            </div>
          </div>
        </Container>
      </header>

      <main className="py-8">
        <Container>
          <div className="max-w-2xl mx-auto space-y-8">
            {/* Page Header */}
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                <Settings className="h-8 w-8" />
                Account Settings
              </h1>
              <p className="text-muted-foreground">
                Manage your account information and preferences
              </p>
            </div>

            {/* Profile Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Profile Information
                </CardTitle>
                <CardDescription>
                  Your basic account information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {isEditingProfile ? (
                  // Edit Profile Form
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="edit-name">Full Name</Label>
                        <Input
                          id="edit-name"
                          type="text"
                          value={profileData.name}
                          onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="Enter your full name"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="edit-email">Email Address</Label>
                        <Input
                          id="edit-email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                          placeholder="Enter your email address"
                        />
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button
                        onClick={handleUpdateProfile}
                        disabled={isUpdatingProfile}
                        className="flex-1"
                      >
                        {isUpdatingProfile ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Updating...
                          </>
                        ) : (
                          <>
                            <Save className="h-4 w-4 mr-2" />
                            Save Changes
                          </>
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={handleCancelEdit}
                        disabled={isUpdatingProfile}
                        className="flex-1"
                      >
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : isChangingPassword ? (
                  // Change Password Form
                  <div className="space-y-4">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input
                          id="current-password"
                          type="password"
                          value={passwordData.currentPassword}
                          onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                          placeholder="Enter your current password"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input
                          id="new-password"
                          type="password"
                          value={passwordData.newPassword}
                          onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                          placeholder="Enter your new password"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <Input
                          id="confirm-password"
                          type="password"
                          value={passwordData.confirmPassword}
                          onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                          placeholder="Confirm your new password"
                        />
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button
                        onClick={handleUpdatePassword}
                        disabled={isUpdatingPassword}
                        className="flex-1"
                      >
                        {isUpdatingPassword ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Updating...
                          </>
                        ) : (
                          <>
                            <Save className="h-4 w-4 mr-2" />
                            Update Password
                          </>
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={handleCancelPasswordChange}
                        disabled={isUpdatingPassword}
                        className="flex-1"
                      >
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  // View Profile Information
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground">
                          Full Name
                        </label>
                        <div className="p-3 bg-muted rounded-md">
                          <p className="text-sm">{session.user.name}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground">
                          Email Address
                        </label>
                        <div className="p-3 bg-muted rounded-md">
                          <p className="text-sm">{session.user.email}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">
                        Account Created
                      </label>
                      <div className="p-3 bg-muted rounded-md">
                        <p className="text-sm">
                          {new Date(session.user.createdAt || Date.now()).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        onClick={handleEditProfile}
                        disabled={isEditingProfile}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Profile
                      </Button>
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        onClick={handleChangePassword}
                        disabled={isChangingPassword}
                      >
                        <Lock className="h-4 w-4 mr-2" />
                        Change Password
                      </Button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Account Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-destructive">Account Actions</CardTitle>
                <CardDescription>
                  Manage your account and session
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Sign Out</p>
                    <p className="text-sm text-muted-foreground">
                      Sign out of your account on this device
                    </p>
                  </div>
                  <Button
                    variant="destructive"
                    onClick={handleLogout}
                    className="flex items-center gap-2"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg opacity-50">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Delete Account</p>
                    <p className="text-sm text-muted-foreground">
                      Permanently delete your account and all data
                    </p>
                  </div>
                  <Button variant="destructive" disabled>
                    Delete Account
                    <span className="ml-2 text-xs">(Coming Soon)</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Usage Information */}
            <Card>
              <CardHeader>
                <CardTitle>Usage & Plan</CardTitle>
                <CardDescription>
                  Your current usage and plan information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-primary/5 rounded-lg">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-primary">Current Plan</p>
                      <p className="text-2xl font-bold">Free</p>
                      <p className="text-xs text-muted-foreground">
                        1 signature, basic templates
                      </p>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-muted rounded-lg">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Signatures Created</p>
                      <p className="text-2xl font-bold">-</p>
                      <p className="text-xs text-muted-foreground">
                        Total signatures in your account
                      </p>
                    </div>
                  </div>
                </div>

                <Button variant="outline" className="w-full" disabled>
                  <Settings className="h-4 w-4 mr-2" />
                  Upgrade Plan
                  <span className="ml-2 text-xs text-muted-foreground">(Coming Soon)</span>
                </Button>
              </CardContent>
            </Card>
          </div>
        </Container>
      </main>
    </div>
  );
}