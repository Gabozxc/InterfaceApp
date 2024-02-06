"use client"

import { useContext, useEffect, useState } from "react";

import withAuth from "@/lib/withAuth";
import { Itask } from "@/interfaces/Itask";
import { getTasks } from "@/server_endpoints/tasks";
import { AuthContext } from "@/context/authContext";
import TodoContainer from "@/components/TodoContainer/TodoContainer";

function Home() {

  const [tasks, setTasks] = useState<Itask[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const { state } = useContext(AuthContext);


  useEffect(() => {
    async function getStore() {
      if (state.token) {
        const requestToGetTasks: Itask[] = await getTasks(state.token);
        setTasks(requestToGetTasks);
        setIsFetching(false);
      }
    }
    if (state.token) {
      getStore()
    }
  }, [state.token])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <TodoContainer tasks={tasks} isFetching={isFetching}/>
    </main>
  );
}

export default withAuth(Home);