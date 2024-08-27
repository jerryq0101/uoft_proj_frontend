import Image from "next/image";
import MainLeftBar from "./main_left_bar";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <MainLeftBar />
    </main>
  );
}
