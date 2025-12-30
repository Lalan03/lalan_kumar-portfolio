// import { connectDB } from "@/lib/db";
// import Contact from "@/models/Contact";

// export const dynamic = "force-dynamic";

// async function getMessages() {
//   await connectDB();
//   const messages = await Contact.find()
//     .sort({ createdAt: -1 })
//     .lean();
//   return messages;
// }

// export default async function AdminPage() {
//   const messages = await getMessages();

//   return (
//     <div className="min-h-screen bg-black text-white px-6 py-20 max-w-6xl mx-auto">
//       {/* HEADER WITH LOGOUT */}
//       <div className="flex items-center justify-between mb-8">
//         <h1 className="text-3xl font-semibold">
//           Contact Messages
//         </h1>

//         {/* LOGOUT BUTTON */}
//         <form action="/api/admin/logout" method="post">
//           <button
//             type="submit"
//             className="text-sm text-red-400 hover:text-red-300"
//           >
//             Logout
//           </button>
//         </form>
//       </div>

//       {/* MESSAGES */}
//       <div className="space-y-6">
//         {messages.length === 0 && (
//           <p className="text-gray-400">No messages yet.</p>
//         )}

//         {messages.map((msg: any) => (
//           <div
//             key={msg._id}
//             className="border border-zinc-800 rounded-lg p-4"
//           >
//             <p className="font-medium">{msg.name}</p>
//             <p className="text-sm text-gray-400">
//               {msg.email}
//             </p>
//             <p className="mt-2">{msg.message}</p>
//             <p className="mt-2 text-xs text-gray-500">
//               {new Date(msg.createdAt).toLocaleString()}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }



import { connectDB } from "@/lib/db";
import Contact from "@/models/Contact";
import DeleteButton from "./DeleteButton";

export const dynamic = "force-dynamic";

async function getMessages() {
  await connectDB();
  const messages = await Contact.find()
    .sort({ createdAt: -1 })
    .lean();

  return messages.map((m) => ({
    ...m,
    _id: m._id.toString(),
  }));
}

export default async function AdminPage() {
  const messages = await getMessages();

  return (
    <div className="min-h-screen bg-black text-white px-6 py-20 max-w-6xl mx-auto">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-semibold">Contact Messages</h1>

        <form action="/api/admin/logout" method="post">
          <button className="text-sm text-red-400 hover:text-red-300">
            Logout
          </button>
        </form>
      </div>

      {/* MESSAGES */}
      <div className="space-y-6">
        {messages.length === 0 && (
          <p className="text-gray-400">No messages yet.</p>
        )}

        {messages.map((msg) => (
          <div
            key={msg._id}
            className="border border-zinc-800 rounded-lg p-5 relative"
          >
            {/* DELETE BUTTON */}
            <DeleteButton id={msg._id} />

            <p className="font-medium text-lg">{msg.name}</p>
            <p className="text-sm text-gray-400">{msg.email}</p>

            <p className="mt-3 text-gray-200">{msg.message}</p>

            <p className="mt-3 text-xs text-gray-500">
              {new Date(msg.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
