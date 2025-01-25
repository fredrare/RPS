import React, { useState } from "react"
import { Lizard, Paper, Rock, Scissors, Spock } from "./Icons"

// Custom type to make key exclusions
type Exclusive<T> = {
  [Key in keyof T]: Required<Pick<T, Key>> &
    Partial<Record<Exclude<keyof T, Key>, never>>
}[keyof T]

type GameProps = {
  isTurn: boolean
  salt?: bigint
  bet: bigint
  setBet: Function
  state:
    | "create"
    | "play"
    | "p1CanForceWin"
    | "p2CanForceWin"
    | "decide"
    | "ended"
  callback: Function
}

type Option = {
  label: string
  value: 1 | 2 | 3 | 4 | 5
  icon: React.ReactNode
  bgColor: string
}

const options: Option[] = [
  {
    label: "Rock",
    value: 1,
    icon: <Rock />,
    bgColor: "bg-stone-400",
  },
  {
    label: "Paper",
    value: 2,
    icon: <Paper />,
    bgColor: "bg-white",
  },
  {
    label: "Scissors",
    value: 3,
    icon: <Scissors />,
    bgColor: "bg-red-200",
  },
  {
    label: "Spock",
    value: 4,
    icon: <Spock />,
    bgColor: "bg-blue-200",
  },
  {
    label: "Lizard",
    value: 5,
    icon: <Lizard />,
    bgColor: "bg-green-200",
  },
]

const Game = ({ isTurn, callback, salt, bet, setBet, state }: GameProps) => {
  const [selectedOption, setSelectedOption] = useState<Option>()
  const [confirmation, setConfirmation] = useState<string>()
  const [opponentAddress, setOpponentAddress] = useState("")

  return (
    <div className="w-full mx-auto max-w-2xl bg-gray-50 rounded-lg shadow-xs p-4 flex flex-col gap-2">
      {/* Select the play option */}
      {(state === "create" || state === "play") && (
        <>
          <h2 className="w-full text-center font-bold text-lg">
            {isTurn ? "Your turn" : "Wait for your opponent to play"}
          </h2>
          {isTurn && (
            <div className="flex gap-2 items-center">
              {options.map(option => (
                <button
                  key={option.value}
                  className={`w-full rounded-lg ${
                    option.value === selectedOption?.value
                      ? option.bgColor + " !border-gray-300 shadow-xs"
                      : "bg-gray-300"
                  } p-4 text-center hover:${
                    option.bgColor
                  } transition-colors cursor-pointer flex flex-col items-center justify-center gap-2 border border-transparent`}
                  onClick={() => setSelectedOption(option)}
                >
                  {option.icon}
                  <span className="text-sm">{option.label}</span>
                </button>
              ))}
            </div>
          )}
        </>
      )}
      {/* Commit the transaction */}
      <div className="w-full flex justify-center">
        {/* This is not the most optimal way to do this, but it is the most readable in this place */}
        {/* The game is being created */}
        {state === "create" && selectedOption && (
          <form
            className="flex flex-col gap-2 my-4 w-full"
            onSubmit={(e: any) => {
              e.preventDefault()
              callback(opponentAddress, selectedOption.value)
            }}
          >
            <div className="w-full flex gap-2 items-center">
              <input
                className="p-4 grow rounded-lg border border-gray-300 w-3/4 bg-white"
                placeholder="Opponent's address"
                pattern="0x[a-fA-F0-9]{40}"
                onChange={(e: any) => setOpponentAddress(e.target.value)}
                required
              />
              <input
                className="p-4 grow rounded-lg border border-gray-300 w-1/4 bg-white"
                placeholder="Bet (wei)"
                type="number"
                value={bet}
                onChange={(e: any) => setBet(BigInt(e.target.value))}
                required
              />
            </div>
            <div className="flex items-center gap-2">
              <div className="flex flex-col gap-2 text-sm text-wrap break-words w-3/4">
                <span className="font-bold">
                  Save this confirmation value BEFORE sending the transaction:
                </span>
                <p className="font-mono select-all p-2 border rounded-lg text-gray-700 border-gray-300">
                  {btoa(
                    JSON.stringify({
                      move: selectedOption.value,
                      salt: salt?.toString(),
                    })
                  )}
                </p>
                <strong>DO NOT GIVE THIS TO YOUR OPPONENT</strong>
              </div>
              <button className="w-1/4 cursor-pointer bg-blue-300 hover:bg-blue-200 p-4 rounded-lg shadow-xs transition-colors h-min mx-auto my-auto">
                Start game!
              </button>
            </div>
          </form>
        )}
        {/* The game is being played by P2 */}
        {state === "play" &&
          isTurn &&
          (selectedOption ? (
            <button
              className="cursor-pointer bg-blue-300 hover:bg-blue-200 p-4 rounded-lg shadow-xs transition-colors"
              onClick={() => callback(selectedOption.value)}
            >
              Play {selectedOption.label}
            </button>
          ) : (
            <span>You need to select an option</span>
          ))}
        {/* The game can be claimed by P1 due to the timeout*/}
        {state === "p1CanForceWin" && isTurn && (
          <button
            className="cursor-pointer bg-blue-300 hover:bg-blue-200 p-4 rounded-lg shadow-xs transition-colors"
            onClick={() => callback()}
          >
            Timeout, claim the funds!
          </button>
        )}
        {/* The game can be claimed by P1 due to the timeout*/}
        {state === "p2CanForceWin" && isTurn && (
          <button
            className="cursor-pointer bg-blue-300 hover:bg-blue-200 p-4 rounded-lg shadow-xs transition-colors"
            onClick={() => callback()}
          >
            Timeout, claim the funds!
          </button>
        )}
        {/* The game can be claimed by P1 due to the timeout*/}
        {state === "decide" &&
          (isTurn ? (
            <div className="flex gap-2 items-center w-full">
              <input
                className="p-4 grow rounded-lg border border-gray-300 w-3/4 bg-white"
                placeholder="Confirmation value"
                pattern="0x[a-fA-F0-9]{40}"
                onChange={(e: any) => setConfirmation(e.target.value)}
                required
              />
              <button
                className="w-1/4 cursor-pointer bg-blue-300 hover:bg-blue-200 p-4 rounded-lg shadow-xs transition-colors"
                onClick={() => {
                  const { move, salt } = JSON.parse(atob(confirmation))
                  callback(move, BigInt(salt))
                }}
              >
                Reveal!
              </button>
            </div>
          ) : (
            <span className="font-bold">Wait for your opponent to reveal.</span>
          ))}
        {state === "ended" && (
          <span className="font-bold">This game has already ended.</span>
        )}
      </div>
    </div>
  )
}

export default Game
