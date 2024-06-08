'use client'

import { useSession } from "next-auth/react"
import Link from 'next/link'
export default function PanelBtn() {
    const {data: session} = useSession()
    if(session?.user.email=='maksimzorin10@gmail.com'){
        return (
            <Link href="/dashboard" className="block">
                <span className="inline-block mx-auto mb-5 rounded-md bg-blue-500 duration-300 hover:bg-blue-700 text-white font-bold px-6 py-3 text-base text-body-color text-xl">
                Панель
                </span>
            </Link>
        )
    }
    else{
        return null;
    }
}
