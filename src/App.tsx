import './App.css'
import Enemy from './components/enemy/Enemy'
import Player from './components/player/Player'
import { PlayerProvider } from './context/PlayerContext'

function App() {


  return (
    <>
      <PlayerProvider>
        <Enemy />
        <Player />
      </PlayerProvider>
    </>
  )
}

export default App
