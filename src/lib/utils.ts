import { PublicKey } from "@solana/web3.js";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { validateMnemonic } from 'bip39'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const isValidSolanaAddress = (address: string) => {
    try {
      const publicKey = new PublicKey(address);
      return PublicKey.isOnCurve(publicKey);
    } catch (e) {
      return false;
    }
}

export const isValidSeedPhrase = (seedPhrase: string) => {
    return validateMnemonic(seedPhrase);
}