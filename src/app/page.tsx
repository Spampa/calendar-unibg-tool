"use client";

import { useSession } from "next-auth/react";
import UserInfoCard from "./_components/userInfoCard";
import Explain from "./_components/explain";
import FileUpload from "./_components/fileUpload";
import EditTable from "./_components/editTable";
import { redirect } from "next/navigation";
import { useRef, useEffect, useState } from "react";

//types
import { Subject, Event } from "../types";

export default function Home() {
  const { status, update } = useSession();
  const [ calendar, setCalendar] = useState<Array<Event>>([]);
  const [ subjects, setSubjects ] = useState<Array<Subject>>([]);

  const updateRef = useRef(update);

  useEffect(() => {
    updateRef.current();
  }, []);

  if (status === "authenticated") {
    return (
      <main className=" container mx-auto p-6 flex flex-col items-center gap-3">
        <UserInfoCard />
        <Explain />
        <FileUpload setCalendar={setCalendar} setSubjects={setSubjects}/>
        <EditTable calendar={calendar} subjects={subjects} setSubjects={setSubjects} />
      </main>
    )
  } else {
    redirect('/login');
  }
}