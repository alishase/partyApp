

import { PrismaClient } from "@prisma/client";
import PanelBtn from "../../components/PanelBtn";
import Link from "next/link";
import RefreshBtn from "@/components/RefreshBtn";
import DeleteBtn from "@/components/DeleteBtn";
import ChangeBtn from "@/components/ChangeBtn";

const prisma = new PrismaClient();

async function CardList() {
  const cards = await prisma.card.findMany();
  async function togglePaymentStatus(id, cPaid){
    e.preventDefault()
    console.log(cPaid, id)
    // const updateCard = await prisma.card.update({
    //   where: {
    //     id: id,
    //   },
    //   data: {
    //     paid: ,
    //   },
    // })
  }
  return (
    <div>
      {cards.map((card) => (
        <div
          className="party-card bg-white p-4 mb-4 shadow-lg rounded w-11/12 max-w-xl mx-auto"
          key={card.id}
        >
          <h2 className="text-xl font-bold">Сбор денег {card.date}</h2>
          <p>Общая сумма: {card.money} руб.</p>
          <ul className="flex items-stretch flex-col">
            {card.people.map((participant, index) => (
              <li key={index} className="my-3 flex justify-between max-w-xl">
                <span className="mr-4">
                  {participant}: {(card.money / card.people.length).toFixed(2)}{" "}
                  руб.{" - "}
                  {card.paid.includes(participant) ? (
                  <span className="text-green-500">Оплатил</span>
                ) : (
                  <span className="text-red-500">Не оплатил</span>
                )}
                </span>
                
                <ChangeBtn card={card} person={participant}/>
              </li>
            ))}
          </ul>
          <DeleteBtn card={card}/>
        </div>
      ))}
    </div>
  );
}

const CardListPage = () => {
  return (
    <div className="text-center bg-gray-100">
      <h2 className="font-bold text-3xl py-10">Список карточек</h2>
      <CardList />
      <RefreshBtn />
      <PanelBtn></PanelBtn>
    </div>
  );
};

export default CardListPage;
