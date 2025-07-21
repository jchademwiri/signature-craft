import { auth } from "@/lib/auth";
import { db } from "@/db";
import { accounts } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { currentPassword, newPassword } = body;

    // Basic validation
    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { error: "Current password and new password are required" },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: "New password must be at least 6 characters long" },
        { status: 400 }
      );
    }

    if (newPassword.length > 128) {
      return NextResponse.json(
        { error: "New password must be less than 128 characters" },
        { status: 400 }
      );
    }

    // Get user's current password from accounts table
    const userAccount = await db
      .select()
      .from(accounts)
      .where(
        and(
          eq(accounts.userId, session.user.id),
          eq(accounts.providerId, "credential")
        )
      )
      .limit(1);

    if (userAccount.length === 0) {
      return NextResponse.json(
        { error: "No password account found. Please use social login or contact support." },
        { status: 400 }
      );
    }

    // Get auth context for password operations
    const ctx = await auth.$context;
    
    // Verify current password
    const isCurrentPasswordValid = await ctx.password.verify({
      password: currentPassword,
      hash: userAccount[0].password || ""
    });

    if (!isCurrentPasswordValid) {
      return NextResponse.json(
        { error: "Current password is incorrect" },
        { status: 400 }
      );
    }

    // Hash new password
    const hashedNewPassword = await ctx.password.hash(newPassword);

    // Update password in accounts table
    await db
      .update(accounts)
      .set({
        password: hashedNewPassword,
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(accounts.userId, session.user.id),
          eq(accounts.providerId, "credential")
        )
      );

    return NextResponse.json({
      message: "Password updated successfully",
    });
  } catch (error) {
    console.error("Error updating password:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}