import { auth } from "@/lib/auth";
import { db } from "@/db";
import { signatures } from "@/db/schema";
import { eq, and, desc } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

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
        phone: signatures.phone,
        website: signatures.website,
        logoData: signatures.logoData,
        primaryColor: signatures.primaryColor,
        secondaryColor: signatures.secondaryColor,
        templateId: signatures.templateId,
        createdAt: signatures.createdAt,
      })
      .from(signatures)
      .where(eq(signatures.userId, session.user.id))
      .orderBy(desc(signatures.createdAt));

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
    /* eslint-disable @typescript-eslint/no-unused-vars */
    const {
      name,
      title,
      company,
      email,
      phone,
      website,
      logoData,
      primaryColor,
      secondaryColor,
      templateId = "classic",
    } = body;
    /* eslint-enable @typescript-eslint/no-unused-vars */

    // Basic validation
    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    // Create values object without explicit ID and include color fields if provided
    const signatureValues = {
      userId: session.user.id,
      name,
      title,
      company,
      email,
      phone,
      website,
      logoData,
      templateId,
      ...(primaryColor ? { primaryColor } : {}),
      ...(secondaryColor ? { secondaryColor } : {}),
    };

    const newSignature = await db
      .insert(signatures)
      .values(signatureValues)
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

export async function DELETE(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Signature ID is required" }, { status: 400 });
    }
    // Only delete if the signature belongs to the user
    const deleted = await db.delete(signatures)
      .where(and(
        eq(signatures.id, id),
        eq(signatures.userId, session.user.id)
      ))
      .returning();
    if (!deleted.length) {
      return NextResponse.json({ error: "Signature not found or not authorized" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting signature:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}