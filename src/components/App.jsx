import { useState, useRef } from 'react'
import Setter from './Setter'
import Timer from './Timer'
function App() {
  const [timer, setTimer] = useState({
    break: 300,
    session: 1500,
    state: 0,
  })
  const [isSession, setIsSession] = useState(true)
  const [timeLeft, setTimeLeft] = useState(1500)
  const sound = document.getElementById('beep')
  let intervalRef = useRef(null)
  if (timeLeft < 0) {
    sound.play()
    isSession ? setTimeLeft(timer.break) : setTimeLeft(timer.session)
    setIsSession(!isSession)
  }
  const config = {
    break: value => {
      if (value > 0 && value <= 3600) {
        setTimer({ break: value, session: timer.session, state: timer.state })
      }
    },
    session: value => {
      if (value > 0 && value <= 3600) {
        if (timer.state === 0) setTimeLeft(value)
        setTimer({ break: timer.break, session: value, state: timer.state })
      }
    },
  }
  const count = {
    start: () => {
      intervalRef.current = setInterval(() => {
        setTimeLeft(timeLeft => {
          if (sound.currentTime && sound.currentTime > 2) {
            sound.currentTime = 0
            sound.pause()
          }
          return timeLeft - 1
        })
      }, 1000)
    },
    stop: () => {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    },
  }
  const make = {
    reset: () => {
      setTimer({
        break: 300,
        session: 1500,
        state: 0,
      })
      setIsSession(true)
      setTimeLeft(1500)
      sound.pause()
      sound.currentTime = 0
      return count.stop()
    },
    playPause: () => {
      // 0: stopped, 1: counting, 2: paused
      timer.state === 0 && setTimeLeft(timer.session)
      if (timer.state === 1) {
        setTimer({ ...timer, state: 2 })
        return count.stop()
      } else {
        setTimer({ ...timer, state: 1 })
        return count.start()
      }
    },
  }

  return (
    <div>
      <h1>Pomodoro clock</h1>
      <div className="setters">
        <Setter name="break" current={timer.break} handler={config.break} />
        <Setter name="session" current={timer.session} handler={config.session} />
      </div>
      <Timer current={isSession} state={timer.state} count={timeLeft} session={timer.session} handler={make} />
      <audio id="beep" preload="auto">
        <source src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" />
      </audio>
    </div>
  )
}

export default App
