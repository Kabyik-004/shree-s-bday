import MusicPlayer from './components/common/MusicPlayer'
import Hero from './sections/Hero'
import BirthdayReveal from './sections/BirthdayReveal'
import OurStory from './sections/OurStory'
import Memories from './sections/Memories'
import Reasons from './sections/Reasons'
import OpenWhen from './sections/OpenWhen'
import Quiz from './sections/Quiz'
import Secret from './sections/Secret'
import Letter from './sections/Letter'
import Finale from './sections/Finale'

function App() {
  return (
    <>
      {/* One persistent audio player for the whole site — never inside a section */}
      <MusicPlayer />

      <main>
        <Hero />
        <BirthdayReveal />
        <OurStory />
        <Memories />
        <Reasons />
        <OpenWhen />
        <Quiz />
        <Secret />
        <Letter />
        <Finale />
      </main>
    </>
  )
}

export default App
