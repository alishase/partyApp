import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  
    const showCard = await prisma.card.findMany({
    })
  
    return NextResponse.json(showCard);
  }
