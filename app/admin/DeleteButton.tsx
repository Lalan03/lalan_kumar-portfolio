"use client";

import { useTransition } from "react";

export default function DeleteButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (!confirm("Delete this message?")) return;

    startTransition(async () => {
      await fetch(`/api/admin/messages/${id}`, {
        method: "DELETE",
      });

      window.location.reload();
    });
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="
        absolute top-4 right-4
        text-xs text-red-400
        hover:text-red-300
        disabled:opacity-50
      "
    >
      {isPending ? "Deleting..." : "Delete"}
    </button>
  );
}
