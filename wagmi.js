import { http } from "wagmi"
import { defaultWagmiConfig } from "@web3modal/wagmi/react/config"

import { sepolia } from "wagmi/chains"
import { metaMask } from "wagmi/connectors"

export const config = defaultWagmiConfig({
  ssr: true,
  chains: [sepolia],
  connectors: [metaMask()],
  transports: {
    [sepolia.id]: http(),
  },
})
