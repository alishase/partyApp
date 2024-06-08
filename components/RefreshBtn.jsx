"use client"

import { useRouter } from "next/navigation";

export default function RefreshBtn() {
  return (
    <a href=""
      className="cursor-pointer inline-block mx-auto mb-5 rounded-md bg-blue-500 duration-300 hover:bg-blue-700 text-white font-bold px-6 py-3 text-base text-body-color text-xl"
    >
      Перезагрузить
    </a>
  );
}
