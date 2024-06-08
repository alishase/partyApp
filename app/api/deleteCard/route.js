import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request) {
  const body = await request.json();
  const { card } = body.data;

  const deleteCard = await prisma.card.delete({
    where: {
      id: card.id,
    },
  })

  return NextResponse.json(card.paid);
}
