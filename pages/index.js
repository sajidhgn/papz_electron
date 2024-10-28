import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ScreenAuthentication from "@/lib/screenAuthentication";
import { Quote } from "lucide-react";
import { RotateCcw } from 'lucide-react';
import Loader from "@/components/loader";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();
  const [authError, setAuthError] = useState(false);
  const [macAddress, setMacAddress] = useState(false);

  const handleRefresh = () => {
    router.reload();
  };

  const screenRecognition = async () => {
    // Get Mac Address
    let sa = await ScreenAuthentication(macAddress);
    // let sa = await ScreenAuthentication("68:1D:EF:2A:3A:D5");
    // let sa = await ScreenAuthentication("68:1D:EF:2A:3A:D3");

    if (sa.status) {
      const branch = sa.branch;
      localStorage.setItem('branch', JSON.stringify(branch));
      router.push('/home');
    } else {
      setAuthError(true);
    }
  }

  useEffect(() => {
    screenRecognition();
    fetchMacAddress();
  }, [])

  async function fetchMacAddress() {
    try {
      if (window.macElectronAPI) {
        const address = await window.macElectronAPI.getMacAddress();
        setMacAddress(address);

        console.log(address);
       
      } else {
        throw new Error('electronAPI is not available');
      }
    } catch (err) {
      console.error('Error fetching MAC address:', err);
    }
  }

  return (
    <>
      {authError ? (
        <div className="bg-zinc-900 w-full min-h-screen flex flex-col justify-center items-center text-slate-200">
          <div className="text-6xl font-bold text-red-400">UNAUTHORIZED</div>

          <div className="text-3xl mt-1 font-semibold">ACCESS</div>
          <div className="text-lg mt-1 italic flex">Please contact administrator for furhter assistance<Quote size={20} className="ml-2" /></div>

          <div className="text-lg mt-3 flex items-center bg-slate-200 text-slate-800 font-semibold px-2 rounded-sm cursor-pointer" onClick={handleRefresh}><RotateCcw size={14} className="mr-1" /> RETRY</div>

        </div>
      ) : (
        <div className="bg-zinc-900 w-full min-h-screen flex flex-col justify-center items-center text-slate-200">
          <div className="text-3xl mt-1 font-semibold"><Loader /></div>
          <div className="text-3xl mt-1 font-semibold">Please Wait</div>
          <div className="text-lg mt-1 italic flex">While we are setting the app for you...</div>
        </div>
      )}
    </>
  );
}
