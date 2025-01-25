import React from "react"
import { useAccount } from "wagmi"
import { Account } from "./Account"
import { Connect } from "./Connect"

type Props = {
  address: string
}

export function ConnectWallet({ address }: Props) {
  const { isConnected } = useAccount()
  return (
    <div className="container">
      {isConnected || address ? <Account /> : <Connect />}
    </div>
  )
}
