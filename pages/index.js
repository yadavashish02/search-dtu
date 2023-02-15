import Head from 'next/head'
import { Inter } from '@next/font/google'
import SearchDiv from "@/Components/SearchDiv";
import TopBar from "@/Components/TopBar";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>searchDTU</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/tab.ico" />
      </Head>
      <TopBar/>
      <SearchDiv/>
    </>
  )
}
