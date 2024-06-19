"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function ChangeBtn({ card, person }) {
  const router = useRouter();
  const { data: session } = useSession();
  async function updateCard(e) {
    e.preventDefault();
    Array.prototype.removeByValue = function (val) {
      for (var i = 0; i < this.length; i++) {
        if (this[i] === val) {
          this.splice(i, 1);
          i--;
        }
      }
      return this;
    };
    const paidArr = card.paid;
    const participantIndex = paidArr.indexOf(person);
    if (participantIndex > -1) {
      paidArr.removeByValue(person);
    } else {
      paidArr.push(person);
    }

    const data = {
      card: card,
      person: person,
      paidArr: paidArr,
    };
    const response = await fetch("/api/updateStatus", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data }),
    });

    const cardInfo = await response.json();
    router.refresh();
  }
  if (session?.user.email == "maksimzorin10@gmail.com") {
    return (
      <button
        onClick={(e) => {
          updateCard(e);
        }}
        className="toggle-payment-status  bg-blue-500 duration-300 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-xs ml-2"
      >
        Изменить
      </button>
    );
  }
}
