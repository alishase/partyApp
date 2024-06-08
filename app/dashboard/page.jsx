"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

const DashboardPage = () => {
  const router = useRouter();
  const [success, setSuccess] = useState(false)
  const { data: session, status } = useSession();
  const [data, setData] = useState({
    people: "",
    money: "",
    date: "",
  });

  if (status === "loading") {
    return <p>Loading...</p>;
  }
  if (status === "unauthenticated") {
    return (
      <p className="text-center mt-10 text-lg">
        Unathenticated please login:{" "}
        <Link href="/login" className="underline my-30 text-xl">
          Login
        </Link>
      </p>
    );
  }
  if (session.user.email != "maksimzorin10@gmail.com") {
    return (
      <p className="text-center mt-10 text-lg">
        Access denied{" "}
        <Link href="/page" className="underline my-30 text-xl">
          Login
        </Link>
      </p>
    );
  }

  async function addCard(e) {
    e.preventDefault();
    const response = await fetch("/api/addCard", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data }),
    });

    const userInfo = await response.json();
    setData({
      people: "",
      money: "",
      date: "",
    });
    setSuccess(true);
    setTimeout(()=>{
      setSuccess(false);
    }, 3000)
  }

  return (
    <div className="text-center text-xl h-3/4 bg-gray-100">
      <p className="mb-2 mt-2">Hi {session?.user.name} </p>
      {session.user.email === "maksimzorin10@gmail.com" ? (
        <p>You're admin</p>
      ) : (
        ""
      )}
      <div className="mx-auto px-4 sm:w-full max-w-lg">
        <h1 className="text-3xl font-bold text-center my-6">
          Учет расходов на тусовки
        </h1>
        <div id="partyForm" className="mb-8">
          <div className="bg-blue-100 p-4 mb-6 rounded-lg border-blue-400 border-4">
            <h2 className="text-2xl font-bold mb-4">Добавить тусовку</h2>
            <form id="createPartyForm" onSubmit={(e) => addCard(e)}>
              <div className="mb-4">
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-700"
                >
                  Дата
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  required
                  value={data.date}
                  onChange={(e) => setData({ ...data, date: e.target.value })}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="participants"
                  className="block text-sm font-medium text-gray-700"
                >
                  Участники (через запятую)
                </label>
                <input
                  type="text"
                  id="participants"
                  name="participants"
                  required
                  value={data.people}
                  onChange={(e) => setData({ ...data, people: e.target.value })}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  placeholder="Анна, Борис"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="totalAmount"
                  className="block text-sm font-medium text-gray-700"
                >
                  Общая сумма
                </label>
                <input
                  type="number"
                  id="totalAmount"
                  name="totalAmount"
                  required
                  value={data.money}
                  onChange={(e) => setData({ ...data, money: e.target.value })}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  placeholder="1000"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Добавить
              </button>
            </form>
          </div>
          {
            success ? <span className="border-2 border-green-600 bg-green-200 rounded-md py-2 px-5">Карта добавлена</span> : ''
          }
        </div>
      </div>
      {/* {
        success ? <span className="border-2 border-green-600 bg-green-200 rounded-md py-2 px-5">Success</span> : ''
      } */}
      <div className="my-30">
        <Link href="/cardlist" className="block">
          <span className="inline-block mx-auto mb-5 rounded-md bg-blue-500 text-white font-bold px-6 py-3 text-body-color text-xl">
            Список карт
          </span>
        </Link>
      </div>

      <button
        className="text-primary hover:underline mb-7"
        onClick={() => {
          signOut({ callbackUrl: "/login" });
        }}
      >
        Log out
      </button>
    </div>
  );
};

export default DashboardPage;
