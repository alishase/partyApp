import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request) {
  const body = await request.json();
  const { date, money, people } = body.data;
  console.log(body.data);

  const participants = people
    .split(",")
    .map((participant) => participant.trim());

  const card = await prisma.card.create({
    data: {
      date,
      money: parseFloat(money),
      people: participants,
      paid: [],
    },
  });

  return NextResponse.json(card);
}
