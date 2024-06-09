import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic'

export async function GET() {
  const prisma = new PrismaClient();
    const showCard = await prisma.card.findMany({
    })
  
    return NextResponse.json(showCard);
  }
