import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from "wagmi"
import { Logout, Wallet } from "./Icons"

export function Account() {
  const { address, connector } = useAccount()
  const { disconnect } = useDisconnect()
  const { data: ensName } = useEnsName({ address })
  const { data: ensAvatar } = useEnsAvatar({ name })

  const formattedAddress = formatAddress(address)

  return (
    <div className="flex gap-2 items-center justify-between">
      <div className="flex gap-2 items-center">
        <Wallet />
        {address && (
          <span className="text">
            {ensName ? `${ensName} (${formattedAddress})` : formattedAddress}
          </span>
        )}
      </div>
      <button
        className="flex gap-2 items-center px-4 py-2 bg-red-200 rounded shadow-xs hover:shadow hover:bg-red-300 transition-colors cursor-pointer"
        onClick={() => disconnect()}
        type="button"
      >
        <span>Disconnect</span>
        <Logout />
      </button>
    </div>
  )
}

function formatAddress(address) {
  if (!address) return null
  return `${address.slice(0, 6)}…${address.slice(38, 42)}`
}
