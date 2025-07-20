import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { signatures } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";

export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userSignatures = await db
      .select({
        id: signatures.id,
        name: signatures.name,
        title: signatures.title,
        company: signatures.company,
        email: signatures.email,
        templateId: signatures.templateId,
        createdAt: signatures.createdAt,
      })
      .from(signatures)
      .where(eq(signatures.userId, session.user.id))
      .orderBy(signatures.createdAt);

    return NextResponse.json(userSignatures);
  } catch (error) {
    console.error("Error fetching signatures:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      name,
      title,
      company,
      email,
      phone,
      mobile,
      website,
      department,
      address,
      logoData,
      templateId = "classic",
      primaryColor,
      secondaryColor,
    } = body;

    // Basic validation
    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    const newSignature = await db
      .insert(signatures)
      .values({
        id: randomUUID(),
        userId: session.user.id,
        name,
        title,
        company,
        email,
        phone: phone || mobile, // Use phone or mobile as fallback
        website,
        logoData,
        templateId,
      })
      .returning();

    return NextResponse.json(newSignature[0], { status: 201 });
  } catch (error) {
    console.error("Error creating signature:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}