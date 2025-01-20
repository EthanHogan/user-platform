"use client";

import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function Tasks() {
  const tasks = useQuery(api.tasks.get);
  const toggleTask = useMutation(api.tasks.toggleTask);

  return (
    <div className="flex w-full max-w-screen-sm flex-col items-center gap-2">
      {tasks?.map(({ _id, text, isCompleted }) => (
        <div
          key={_id}
          className="flex w-full items-center gap-3 rounded bg-secondary p-2 shadow"
        >
          <input
            type="checkbox"
            checked={isCompleted}
            onChange={() => toggleTask({ id: _id })}
            className="h-4 w-4"
          />
          <span className={isCompleted ? "line-through" : ""}>{text}</span>
        </div>
      ))}
    </div>
  );
}
