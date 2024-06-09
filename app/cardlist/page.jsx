'use client'

import PanelBtn from "../../components/PanelBtn";
import RefreshBtn from "@/components/RefreshBtn";
import DeleteBtn from "@/components/DeleteBtn";
import ChangeBtn from "@/components/ChangeBtn";
import { useState, useEffect } from "react";


function CardList() {
  const [cards, setCards] = useState(null)
  const [isLoading, setLoading] = useState(true)
    // const fetchData = async () => {
    //   const response = await fetch('http://localhost:3000/api/showCards', {method : 'GET'} ,{ cache: 'no-store' }); // Replace with your API endpoint
    //   const result = response;
    //   setCards(result);
    // };
    useEffect(() => {
      fetch('/api/showCards', {method : 'GET'} ,{ cache: 'no-store' })
      .then((res) => res.json())
      .then((data) => {
        setCards(data)
        setLoading(false)
      })
    }, [])
    if(isLoading) return <p className="text-center text-3xl">Loading...</p>
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
