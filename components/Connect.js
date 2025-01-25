import React, { useEffect } from "react"
import { useChainId, useConnect } from "wagmi"

export function Connect() {
  const chainId = useChainId()
  const { connectors, connect } = useConnect()

  return (
    <div className="flex gap-2">
      {connectors?.map((connector, index) => (
        <ConnectorButton
          key={index}
          connector={connector}
          onClick={() => connect({ connector, chainId })}
        />
      ))}
    </div>
  )
}

function ConnectorButton({ connector, onClick }) {
  const [ready, setReady] = React.useState(false)
  useEffect(() => {
    connector.getProvider().then(provider => setReady(!!provider))
  }, [connector, setReady])

  return ready && connector.name === "MetaMask" ? (
    <button
      className="ml-auto p-4 bg-orange-200 rounded shadow-xs hover:shadow hover:bg-orange-300 transition-colors cursor-pointer"
      disabled={!ready}
      onClick={onClick}
      type="button"
    >
      Connect to MetaMask
    </button>
  ) : undefined
}
