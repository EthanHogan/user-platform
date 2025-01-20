import Tasks from "~/components/Tasks";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-center text-5xl font-extrabold tracking-tight text-primary sm:text-[5rem]">
          user<span className="text-blue-500">-</span>platform
        </h1>
        <Tasks />
      </div>
    </main>
  );
}
