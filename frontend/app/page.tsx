import { IdentityAuth } from "@/components/IdentityAuth";

export default function Home() {
  return (
    <main className="mt-8">
      <div className="flex flex-col gap-8 items-center sm:items-start w-full px-3 md:px-0">
        <IdentityAuth />
      </div>
    </main>
  );
}

