import React from "react"

const Rock = () => (
  <svg
    className="w-5 h-5"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
  >
    <path d="M144 0C117.5 0 96 21.5 96 48l0 48 0 28.5L96 176c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-26.7-9 7.5C40.4 169 32 187 32 206L32 244c0 38 16.9 74 46.1 98.3L128 384l0 96c0 17.7 14.3 32 32 32l160 0c17.7 0 32-14.3 32-32l0-105.3c46.9-19 80-65 80-118.7l0-80 0-16 0-16c0-26.5-21.5-48-48-48c-12.4 0-23.6 4.7-32.1 12.3C350 83.5 329.3 64 304 64c-12.4 0-23.6 4.7-32.1 12.3C270 51.5 249.3 32 224 32c-12.4 0-23.6 4.7-32.1 12.3C190 19.5 169.3 0 144 0z" />
  </svg>
)

const Paper = () => (
  <svg
    className="w-5 h-5"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
  >
    <path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-176c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 272c0 1.5 0 3.1 .1 4.6L67.6 283c-16-15.2-41.3-14.6-56.6 1.4s-14.6 41.3 1.4 56.6L124.8 448c43.1 41.1 100.4 64 160 64l19.2 0c97.2 0 176-78.8 176-176l0-208c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 112c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-176c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 176c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208z" />
  </svg>
)

const Scissors = () => (
  <svg
    className="w-5 h-5"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
  >
    <path d="M40 208c-22.1 0-40 17.9-40 40s17.9 40 40 40l180.2 0c-7.6 8.5-12.2 19.7-12.2 32c0 25.3 19.5 46 44.3 47.9c-7.7 8.5-12.3 19.8-12.3 32.1c0 26.5 21.5 48 48 48l32 0 64 0c70.7 0 128-57.3 128-128l0-113.1c0-40.2-16-78.8-44.4-107.3C444.8 76.8 413.9 64 381.7 64L336 64c-21.3 0-39.3 13.9-45.6 33.1l74.5 23.7c8.4 2.7 13.1 11.7 10.4 20.1s-11.7 13.1-20.1 10.4L288 129.9c0 0 0 .1 0 .1L84 65.8C62.9 59.2 40.5 70.9 33.8 92s5.1 43.5 26.2 50.2L269.5 208 40 208z" />
  </svg>
)

const Lizard = () => (
  <svg
    className="w-5 h-5"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
  >
    <path d="M0 112C0 85.5 21.5 64 48 64l112 0 80 0 46.5 0c36.8 0 71.2 18 92.1 48.2l113.5 164c13 18.7 19.9 41 19.9 63.8l0 12 0 16 0 48c0 17.7-14.3 32-32 32l-96 0c-17.7 0-32-14.3-32-32l0-13.8L273.9 352 240 352l-80 0-48 0c-26.5 0-48-21.5-48-48s21.5-48 48-48l48 0 80 0c26.5 0 48-21.5 48-48s-21.5-48-48-48l-80 0L48 160c-26.5 0-48-21.5-48-48z" />
  </svg>
)

const Spock = () => (
  <svg
    className="w-5 h-5"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 576 512"
  >
    <path d="M246.9 23.7C242.3 6.6 224.8-3.5 207.7 1.1s-27.2 22.1-22.6 39.2L238 237.8c2.5 9.2-4.5 18.2-14 18.2c-6.4 0-12-4.2-13.9-10.3L166.6 102.7c-5.1-16.9-23-26.4-39.9-21.3s-26.4 23-21.3 39.9l62.8 206.4c2.4 7.9-7.2 13.8-13.2 8.1L99.6 283c-16-15.2-41.3-14.6-56.6 1.4s-14.6 41.3 1.4 56.6L156.8 448c43.1 41.1 100.4 64 160 64l10.9 0 8.2 0c.1 0 .1-.1 .1-.1s.1-.1 .1-.1c58.3-3.5 108.6-43.2 125.3-99.7l81.2-275c5-16.9-4.7-34.7-21.6-39.8s-34.7 4.7-39.8 21.6L443.5 247.1c-1.6 5.3-6.4 8.9-12 8.9c-7.9 0-13.8-7.3-12.2-15.1l36-170.3c3.7-17.3-7.4-34.3-24.7-37.9s-34.3 7.4-37.9 24.7L355.1 235.1c-2.6 12.2-13.3 20.9-25.8 20.9c-11.9 0-22.4-8-25.4-19.5l-57-212.8z" />
  </svg>
)

const Wallet = () => (
  <svg
    className="w-5 h-5"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
  >
    <path d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-224c0-35.3-28.7-64-64-64L80 128c-8.8 0-16-7.2-16-16s7.2-16 16-16l368 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L64 32zM416 272a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
  </svg>
)

const Logout = () => (
  <svg
    className="w-5 h-5"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
  >
    <path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z" />
  </svg>
)

export { Rock, Paper, Scissors, Lizard, Spock, Wallet, Logout }
