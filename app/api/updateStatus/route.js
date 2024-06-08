import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request) {
  const body = await request.json();
  const { card, person, paidArr } = body.data;

  const updateCard = await prisma.card.update({
    where: {
      id: card.id,
    },
    data: {
      paid: paidArr,
    },
  })

  return NextResponse.json(card.paid);
}
