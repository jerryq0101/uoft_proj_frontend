import dynamic from "next/dynamic"

const DynamicComponent = dynamic(() => import('./MainPage'), { ssr: false });

export default function Home() {
  return <DynamicComponent />
}