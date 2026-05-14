"use client";

import toast from "react-hot-toast";

export async function connectSolanaWallet() {
  try {
    // Check for Phantom
    const provider = (window as any).solana;

    if (!provider?.isPhantom) {
      toast.error("Phantom Wallet extension not found. Please install it.");
      window.open("https://phantom.app/", "_blank");
      return null;
    }

    const resp = await provider.connect();
    const address = resp.publicKey.toString();
    
    localStorage.setItem("labvex_wallet", address);
    return address;
  } catch (err: any) {
    console.error("Wallet connection error:", err);
    if (err.code === 4001) {
      toast.error("User rejected the connection request.");
    } else {
      toast.error("Failed to connect wallet.");
    }
    return null;
  }
}

export async function connectBackpackWallet() {
  try {
    const provider = (window as any).backpack;

    if (!provider) {
      toast.error("Backpack Wallet extension not found.");
      window.open("https://www.backpack.app/", "_blank");
      return null;
    }

    const resp = await provider.connect();
    const address = provider.publicKey.toString();
    
    localStorage.setItem("labvex_wallet", address);
    return address;
  } catch (err) {
    toast.error("Failed to connect Backpack.");
    return null;
  }
}
