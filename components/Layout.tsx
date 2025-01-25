import React, { useState, useEffect } from "react"
import { ConnectWallet } from "./ConnectWallet"
import Game from "./Game"
import {
  createPublicClient,
  encodePacked,
  hexToBigInt,
  http,
  keccak256,
  numberToHex,
} from "viem"
import { useAccount, useWalletClient } from "wagmi"
import { sepolia } from "wagmi/chains"
import { useSearchParams } from "next/navigation"
import abi from "../src/abi/abi.json"
import rds from "../src/bytecode/rds.json"

const publicClient = createPublicClient({
  chain: sepolia,
  transport: http(),
})

const generateMoveHash = (move: number, salt: bigint) =>
  keccak256(encodePacked(["uint8", "uint256"], [move, salt]))

export default function Layout() {
  const searchParams = useSearchParams()
  const game = searchParams.get("game")
  const [salt, setSalt] = useState<bigint>()
  // Start the bet with a default value of 5000 wei
  const [bet, setBet] = useState<bigint>()
  const wallet = useWalletClient()
  const { address } = useAccount()
  const [player1, setPlayer1] = useState<`0x${string}`>()
  const [player2, setPlayer2] = useState<`0x${string}`>()
  const [lastAction, setLastAction] = useState<number>()
  const [playState, setPlayState] = useState("play")

  // Generate a random salt on load
  useEffect(() => {
    // Execution in secure environments allows us to generate cryptographically secure random numbers
    const [saltA, saltB] = window.crypto.getRandomValues(new Uint32Array(2))
    const salt = BigInt(saltA) * BigInt(saltB)
    const hash = keccak256(numberToHex(salt))
    setSalt(hexToBigInt(hash))
  }, [])

  useEffect(() => {
    // The address must be set
    if (!game) return
    // The wallet must be connected
    if (!address) return
    // Get player 1
    publicClient
      .readContract({
        address: game as `0x${string}`,
        functionName: "j1",
        abi,
      })
      .then(player => setPlayer1(player))

    // Get player 2
    publicClient
      .readContract({
        address: game as `0x${string}`,
        functionName: "j2",
        abi,
      })
      .then(player => setPlayer2(player))
    const interval = setInterval(() => {
      console.log("Getting game data...")
      // Get last action time
      publicClient
        .readContract({
          address: game as `0x${string}`,
          functionName: "lastAction",
          abi,
        })
        .then(lastAction =>
          setLastAction(parseInt((lastAction as any).toString()))
        )

      // Get bet amount
      publicClient
        .readContract({
          address: game as `0x${string}`,
          functionName: "stake",
          abi,
        })
        .then(stake => setBet(stake))
    }, 5000)
    return () => clearInterval(interval)
  }, [game, address])

  useEffect(() => {
    if (!game) return
    if (!lastAction) return
    // Check whether player 2 has already played or not
    publicClient
      .readContract({
        address: game as `0x${string}`,
        functionName: "c2",
        abi,
      })
      .then(move => {
        // Get current time in seconds
        const now = new Date().getTime() / 1000
        // If the move is 0, it's player 2's turn
        if (!move) {
          // Maybe the game has already ended
          if (bet === 0n) setPlayState("ended")
          // However, if P2 has not played in the time limit, it's timeout
          else if (now > lastAction + 300) setPlayState("p1CanForceWin")
          // Else, P2 can play normally
          else setPlayState("play")
        }
        // If the move is not 0, P2 has already played
        else {
          // Maybe the game has already ended
          if (bet === 0n) setPlayState("ended")
          // If P1 has not solved the game in the time limit, it's timeout
          else if (now > lastAction + 300) setPlayState("p2CanForceWin")
          // Else, P1 can decide the winner normally
          else setPlayState("decide")
        }
      })
  }, [game, lastAction, bet])

  // Handle the movement confirmation
  const handleMovement: Function = async (move: number) => {
    try {
      const { request } = await publicClient.simulateContract({
        account: address,
        address: game as `0x${string}`,
        functionName: "play",
        args: [move],
        value: bet,
        gasPrice: BigInt(
          Math.floor(
            parseInt((await publicClient.getGasPrice()).toString()) * 1.4
          )
        ),
        abi,
      })
      console.log(request)
      await wallet.data?.writeContract(request)
    } catch (error) {
      console.error(error)
    }
  }

  // Handle the game creation
  const handleCreateGame: Function = async (
    opponent: `0x${string}`,
    move: number
  ) => {
    const moveHash = generateMoveHash(move, salt)
    try {
      const txHash = await wallet.data?.deployContract({
        bytecode: rds.bytecode as `0x${string}`,
        args: [moveHash, opponent],
        account: address,
        value: bet,
        gasPrice: BigInt(
          Math.floor(
            parseInt((await publicClient.getGasPrice()).toString()) * 1.4
          )
        ),
        abi,
      })
      if (!txHash) return
      const { contractAddress } = await publicClient.waitForTransactionReceipt({
        hash: txHash,
      })
      window.location.href = `/?game=${contractAddress}`
    } catch (error) {
      console.error(error)
    }
  }

  const p1ForcesTimeout = async () => {
    try {
      const { request } = await publicClient.simulateContract({
        account: address,
        address: game as `0x${string}`,
        functionName: "j2Timeout",
        gasPrice: BigInt(
          Math.floor(
            parseInt((await publicClient.getGasPrice()).toString()) * 1.4
          )
        ),
        abi,
      })
      await wallet.data?.writeContract(request)
    } catch (error) {
      console.error(error)
    }
  }
  const p2ForcesTimeout = async () => {
    try {
      const { request } = await publicClient.simulateContract({
        account: address,
        address: game as `0x${string}`,
        functionName: "j1Timeout",
        gasPrice: BigInt(
          Math.floor(
            parseInt((await publicClient.getGasPrice()).toString()) * 1.4
          )
        ),
        abi,
      })
      await wallet.data?.writeContract(request)
    } catch (error) {
      console.error(error)
    }
  }

  const handleDecide = async (move: number, salt: bigint) => {
    try {
      const { request } = await publicClient.simulateContract({
        account: address,
        address: game as `0x${string}`,
        functionName: "solve",
        args: [move, salt],
        gasPrice: BigInt(
          Math.floor(
            parseInt((await publicClient.getGasPrice()).toString()) * 1.4
          )
        ),
        abi,
      })
      await wallet.data?.writeContract(request)
    } catch (error) {
      console.error(error)
    }
  }

  const handlers = {
    play: handleMovement,
    create: handleCreateGame,
    p1CanForceWin: p1ForcesTimeout,
    p2CanForceWin: p2ForcesTimeout,
    decide: handleDecide,
  }

  return (
    <div className="w-full mx-auto max-w-2xl p-4 flex flex-col gap-4 text-gray-800">
      <a
        href={game ? "/" : "#"}
        className="text-2xl font-bold w-full text-center hover:underline"
      >
        Rock-Paper-Scissors-Lizard-Spock
      </a>
      <ConnectWallet address={address as string} />
      {game && (
        <span className="text-sm text-gray-500">
          Game URL:
          <a
            href={window.location.href}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-blue-400 hover:underline"
          >
            {window.location.hostname}
            {window.location.port ? `:${window.location.port}` : ""}/?game=
            {game}
          </a>
        </span>
      )}
      {address ? (
        game ? (
          <Game
            isTurn={
              ((playState === "p1CanForceWin" ||
                playState === "p2CanForceWin" ||
                playState === "decide") &&
                player1 === address) ||
              ((playState === "p1CanForceWin" ||
                playState === "p2CanForceWin" ||
                playState === "play") &&
                player2 === address)
            }
            callback={
              handlers[
                (playState === "p1CanForceWin" || playState === "play") &&
                player2 === address
                  ? "play"
                  : (playState === "decide" || playState === "p2CanForceWin") &&
                    player1 === address
                  ? "decide"
                  : playState
              ]
            }
            bet={bet}
            setBet={setBet}
            state={
              (playState === "p1CanForceWin" || playState === "play") &&
              player2 === address
                ? "play"
                : (playState === "decide" || playState === "p2CanForceWin") &&
                  player1 === address
                ? "decide"
                : playState
            }
          />
        ) : (
          <Game
            isTurn={true}
            callback={handleCreateGame}
            salt={salt}
            bet={bet}
            setBet={setBet}
            state={"create"}
          />
        )
      ) : (
        <div className="w-full text-center text-lg font-semibold bg-gray-50 rounded-lg shadow-xs p-4">
          Connect your wallet to play.
        </div>
      )}
    </div>
  )
}
