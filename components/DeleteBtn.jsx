'use client'
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function DeleteBtn({card}) {
    const {data: session} = useSession()
    const router = useRouter()

    async function deleteCard(e){
        e.preventDefault();
        const data = {
            card: card,
        }
        const response = await fetch("/api/deleteCard", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ data }),
          });

          const cardInfo = await response.json();
          router.refresh()
        }
    if(session?.user.email=='maksimzorin10@gmail.com'){
        return (
            <div className="w-full flex justify-end mt-5">
                <button onClick={(e)=> {deleteCard(e)}} className="toggle-payment-status bg-red-500 duration-300 hover:bg-red-700 text-white font-bold py-1 px-4 rounded text-xs ml-2">
                    Удалить
                </button>
            </div>
        )
    }
}
