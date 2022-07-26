import React from "react"
import { Web3ReactProvider } from "@web3-react/core"
import Web3 from "web3"
import "./src/styles/global.css"

function getLibrary(provider) {
  return new Web3(provider)
}

// highlight-start
export const wrapRootElement = ({ element }) => (
  <Web3ReactProvider getLibrary={getLibrary}>{element}</Web3ReactProvider>
)
