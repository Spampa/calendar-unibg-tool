"use client";

import { useSession } from "next-auth/react";
import UserInfoCard from "../_components/userInfoCard";
import Explain from "../_components/explain";
import FileUpload from "../_components/fileUpload";
import EditTable from "../_components/editTable";
import { redirect } from "next/navigation";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";

//types
import { Subject, Event } from "@/types"

export default function Home() {
  const { status, update } = useSession();
  const [calendar, setCalendar] = useState<Array<Event>>([]);
  const [subjects, setSubjects] = useState<Array<Subject>>([]);

  const updateRef = useRef(update);

  useEffect(() => {
    updateRef.current();
  }, []);

  if (status === "authenticated") {
    return (
      <main className="container mx-auto p-6 flex flex-col items-center gap-6 pb-20">
        <UserInfoCard />
        <Explain />
        <FileUpload setCalendar={setCalendar} setSubjects={setSubjects} />
        <EditTable calendar={calendar} subjects={subjects} setSubjects={setSubjects} />
        <div className="fixed bottom-0 w-full text-center p-3 text-sm bg-background">
          Utilizzando UNIBG Calendar Tool confermi di avere letto l&apos;<Link href={"/policy"} className="underline">informativa sulla privacy.</Link>
        </div>
      </main>
    )
  } else {
    redirect('/login');
  }
}