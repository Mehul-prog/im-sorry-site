import { useEffect, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Heart,
  Music2,
  Pause,
  Play,
  RotateCcw,
  Volume2,
} from 'lucide-react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const REASONS = [
  {
    eyebrow: '01 · honesty',
    title: 'Deleting messages',
    text: 'I know deleting a message does not delete what happened around it. It can leave questions, doubt, and a feeling that something was hidden. I want to stop using that habit as an escape and learn to communicate openly.',
  },
  {
    eyebrow: '02 · listening',
    title: 'Trying to win the conversation',
    text: 'Having a different opinion is normal. Turning that difference into a fight is not something I want between us. I want to listen to understand you, not listen only for the moment when I can defend myself.',
  },
  {
    eyebrow: '03 · timing',
    title: 'Not knowing when to stop',
    text: 'When you are already hurt or overwhelmed, another explanation from me can feel like pressure. Sometimes the most caring thing I can do is pause, give you space, and come back when we can both breathe.',
  },
  {
    eyebrow: '04 · responsibility',
    title: 'Making you carry my reactions',
    text: 'My emotions and my reactions are mine to manage. You should not have to calm me down while you are the person who was hurt. I need to take responsibility for how I respond.',
  },
  {
    eyebrow: '05 · change',
    title: 'Repeating habits after saying sorry',
    text: 'I know an apology loses its meaning when the same behaviour keeps returning. I do not want this website to become another temporary promise. I want the change to be visible in what I actually do.',
  },
];

const MEMORIES = [
  {
    src: '/photos/memory-1.jpg',
    label: 'the little things',
    caption: 'All the ordinary moments that quietly became important to me.',
  },
  {
    src: '/photos/memory-2.jpg',
    label: 'what I value',
    caption: 'I never want one difficult night to make me forget everything good between us.',
  },
  {
    src: '/photos/memory-3.jpg',
    label: 'still grateful',
    caption: 'For every laugh, every conversation, every moment you chose to be there.',
  },
];

const PLAYLIST = [
  {
    title: 'Bulleya',
    artist: 'Papon',
    src: '/audio/song-1.mp3',
  },
  {
    title: 'Dooron Dooron',
    artist: 'Paresh Pahuja',
    src: '/audio/song-2.mp3',
  },
  {
    title: 'Ehsaan Tera Hoga Mujh Par',
    artist: 'Akanksha Grover',
    src: '/audio/song-3.mp3',
  },
  {
    title: 'Itna Na Mujhse Tu Pyaar Badha',
    artist: 'Lata Mangeshkar, Talat Mahmood',
    src: '/audio/song-4.mp3',
  },
  {
    title: 'Vaaroon Forever',
    artist: 'Shreya Ghoshal',
    src: '/audio/song-5.mp3',
  },
  {
    title: 'O Rangrez',
    artist: 'Shreya Ghoshal, Javed Bashir',
    src: '/audio/song-6.mp3',
  },
  {
    title: 'O Re Piya',
    artist: 'Rahat Fateh Ali Khan',
    src: '/audio/song-7.mp3',
  },
];
const HEARTS = [
  { id: 1, x: 14, y: 74, delay: 0.1, size: 24 },
  { id: 2, x: 30, y: 48, delay: 0.7, size: 19 },
  { id: 3, x: 47, y: 72, delay: 0.25, size: 27 },
  { id: 4, x: 63, y: 40, delay: 0.9, size: 21 },
  { id: 5, x: 79, y: 67, delay: 0.45, size: 25 },
  { id: 6, x: 88, y: 30, delay: 1.1, size: 18 },
  { id: 7, x: 21, y: 25, delay: 1.3, size: 20 },
  { id: 8, x: 56, y: 20, delay: 0.55, size: 17 },
];

const TOTAL_PAGES = 7;

function Bunny({ small = false }) {
  return (
    <div className={`bunny ${small ? 'bunny--small' : ''}`} aria-hidden="true">
      <div className="bunny__ear bunny__ear--left" />
      <div className="bunny__ear bunny__ear--right" />
      <div className="bunny__head">
        <span className="bunny__eye bunny__eye--left" />
        <span className="bunny__eye bunny__eye--right" />
        <span className="bunny__blush bunny__blush--left" />
        <span className="bunny__blush bunny__blush--right" />
        <span className="bunny__mouth" />
      </div>
      <div className="bunny__body">
        <span className="bunny__paw bunny__paw--left" />
        <span className="bunny__paw bunny__paw--right" />
      </div>
    </div>
  );
}

function Tape({ side }) {
  return <span className={`tape tape--${side}`} aria-hidden="true" />;
}

function SectionLabel({ children }) {
  return <p className="section-label">{children}</p>;
}

function ContinueButton({ children = 'Continue', onClick, disabled = false }) {
  return (
    <button className="continue-button" type="button" onClick={onClick} disabled={disabled}>
      <span>{children}</span>
      <ArrowRight size={18} strokeWidth={2.2} />
    </button>
  );
}

function Progress({ page }) {
  return (
    <div className="progress" aria-label={`Step ${page + 1} of ${TOTAL_PAGES}`}>
      <span>from my heart</span>
      <div className="progress__track">
        <span style={{ width: `${((page + 1) / TOTAL_PAGES) * 100}%` }} />
      </div>
      <strong>{String(page + 1).padStart(2, '0')}</strong>
    </div>
  );
}

function App() {
  const [page, setPage] = useState(0);
  const [reasonIndex, setReasonIndex] = useState(0);
  const [caughtHearts, setCaughtHearts] = useState(() => new Set());
  const [playing, setPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(0);
  const [audioName, setAudioName] = useState('our song');
  const [audioReady, setAudioReady] = useState(true);
  const audioRef = useRef(null);

  const goNext = () => {
    setPage((current) => Math.min(current + 1, TOTAL_PAGES - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goPrevious = () => {
    setPage((current) => Math.max(current - 1, 0));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    setCaughtHearts(new Set());
  }, [page]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return undefined;

    const handleEnded = () => setPlaying(false);
    audio.addEventListener('ended', handleEnded);
    return () => audio.removeEventListener('ended', handleEnded);
  }, []);

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio || !audioReady) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }

    try {
      await audio.play();
      setPlaying(true);
    } catch {
      setAudioReady(false);
      setPlaying(false);
    }
  };

  const handleAudioUpload = (event) => {
    const file = event.target.files?.[0];
    const audio = audioRef.current;
    if (!file || !audio) return;

    audio.src = URL.createObjectURL(file);
    setAudioName(file.name.replace(/\.[^/.]+$/, ''));
    setAudioReady(true);
    audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  };

  const catchHeart = (id) => {
    setCaughtHearts((current) => {
      const next = new Set(current);
      next.add(id);
      return next;
    });
  };

  const resetWebsite = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    setPage(0);
    setReasonIndex(0);
    setCaughtHearts(new Set());
    setPlaying(false);
    setAudioName('our song');
    setAudioReady(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const reason = REASONS[reasonIndex];
  const heartsComplete = caughtHearts.size >= 6;

  return (
    <main className="site-shell">
      <div className="paper">
        <div className="paper__grain" aria-hidden="true" />
        <div className="paper__wash paper__wash--top" aria-hidden="true" />
        <div className="paper__wash paper__wash--bottom" aria-hidden="true" />
        <Tape side="left" />
        <Tape side="right" />

        {page > 0 && <Progress page={page} />}

        {page === 0 && (
          <section className="screen screen--hero">
            <div className="hero__tiny">a little website I made for you</div>
            <div className="hero__copy">
              <span className="hero__overline">before anything else....</span>
              <h1>I&apos;m sorry.</h1>
              <div className="scribble" />
              <p>Not to make you forgive me.<br />Just to finally say it properly.</p>
              <ContinueButton onClick={goNext}>Open this</ContinueButton>
            </div>
            <div className="hero__bunny-wrap">
              <div className="speech-bubble">I mean it....</div>
              <Bunny />
            </div>
            <div className="hero__flowers" aria-hidden="true">✿　✿　✿</div>
          </section>
        )}

        {page === 1 && (
          <section className="screen screen--letter">
            <SectionLabel>a letter I should have written sooner</SectionLabel>
            <h2>There are some things<br />I need to say....</h2>

            <article className="letter-card">
              <div className="letter-card__pin">♡</div>
              <p>Last night wasn&apos;t really about who was right or wrong.</p>
              <p>We had different opinions. That is okay. What I am not okay with is the way I behaved when the conversation became difficult.</p>
              <p>When you said, <em>“If I talk 1 min more.... I&apos;ll create a big blunder... and say many things which u can&apos;t digest.”</em></p>
              <p>I heard that as a boundary. You were telling me you needed the conversation to stop before more hurtful things were said.</p>
              <p>And instead of making this another argument, I want to understand my part in why you reached that point.</p>
              <div className="letter-card__closing">I am not here to prove that I was right.<br /><strong>I am here to take responsibility for what I did wrong.</strong></div>
            </article>

            <ContinueButton onClick={goNext}>What I understand now</ContinueButton>
          </section>
        )}

        {page === 2 && (
          <section className="screen screen--reasons">
            <SectionLabel>no excuses · just honesty</SectionLabel>
            <h2>Things I need<br />to change.</h2>

            <article className="reason-card">
              <div className="reason-card__topline">
                <span>{reason.eyebrow}</span>
                <span>{String(reasonIndex + 1).padStart(2, '0')} / {String(REASONS.length).padStart(2, '0')}</span>
              </div>
              <h3>{reason.title}</h3>
              <p>{reason.text}</p>
              <div className="reason-card__footer">
                <div className="reason-dots" aria-label={`Reason ${reasonIndex + 1} of ${REASONS.length}`}>
                  {REASONS.map((item, index) => (
                    <span
                      key={item.title}
                      className={index === reasonIndex ? 'is-active' : ''}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <div className="reason-arrows">
                  <button type="button" disabled={reasonIndex === 0} onClick={() => setReasonIndex((i) => i - 1)} aria-label="Previous reason">
                    <ArrowLeft size={18} />
                  </button>
                  <button type="button" disabled={reasonIndex === REASONS.length - 1} onClick={() => setReasonIndex((i) => i + 1)} aria-label="Next reason">
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </article>

            {reasonIndex === REASONS.length - 1 && (
              <div className="honesty-note">An apology only matters when it becomes behaviour.</div>
            )}

            <ContinueButton onClick={goNext} disabled={reasonIndex !== REASONS.length - 1}>
              {reasonIndex === REASONS.length - 1 ? 'The memories I value' : 'Read each one first'}
            </ContinueButton>
          </section>
        )}

        {page === 3 && (
          <section className="screen screen--memories">
            <SectionLabel>the part I never want to lose</SectionLabel>
            <h2>One bad moment<br />doesn&apos;t erase the good.</h2>
            <p className="screen-intro">I am not using these memories to make you forget what happened. I am remembering why your feelings matter to me in the first place.</p>

            <div className="memory-stack">
              {MEMORIES.map((memory, index) => (
                <figure className={`memory-card memory-card--${index + 1}`} key={memory.src}>
                  <div className="memory-card__photo">
                    <img src={memory.src} alt="A memory placeholder" />
                    <span>{String(index + 1).padStart(2, '0')}</span>
                  </div>
                  <figcaption>
                    <small>{memory.label}</small>
                    <p>{memory.caption}</p>
                  </figcaption>
                </figure>
              ))}
            </div>

            <ContinueButton onClick={goNext}>A tiny little thing</ContinueButton>
          </section>
        )}

        {page === 4 && (
          <section className="screen screen--hearts">
            <SectionLabel>no serious words for a minute</SectionLabel>
            <h2>Catch a little love.</h2>
            <p className="screen-intro">There is no hidden meaning here. Just tap a few hearts and stay for a second.</p>

            <div className="heart-field">
              <div className="heart-field__counter"><strong>{caughtHearts.size}</strong> / 6 caught</div>
              <div className="heart-field__hint">tap them before they float away</div>
              {HEARTS.map((heart) => {
                const caught = caughtHearts.has(heart.id);
                return (
                  <button
                    key={heart.id}
                    type="button"
                    className={`floating-heart ${caught ? 'is-caught' : ''}`}
                    style={{ left: `${heart.x}%`, top: `${heart.y}%`, '--delay': `${heart.delay}s`, '--size': `${heart.size}px` }}
                    onClick={() => catchHeart(heart.id)}
                    aria-label="Catch this heart"
                  >
                    <Heart size={heart.size} fill="currentColor" />
                  </button>
                );
              })}
            </div>

            <div className={`heart-message ${heartsComplete ? 'is-visible' : ''}`}>
              <span>you caught them....</span>
              <p>Some things are simple. I care about you. I am sorry. And I am trying.</p>
            </div>

            <ContinueButton onClick={goNext} disabled={!heartsComplete}>One last thing</ContinueButton>
          </section>
        )}

        {page === 5 && (
          <section className="screen screen--music">
            <SectionLabel>for the feelings I cannot explain well</SectionLabel>
            <h2>Let the music<br />say a little of it.</h2>

            <div className={`record ${playing ? 'is-playing' : ''}`}>
              <div className="record__groove record__groove--one" />
              <div className="record__groove record__groove--two" />
              <div className="record__groove record__groove--three" />
              <div className="record__label">♡</div>
            </div>

            <div className="music-player">
              <div className="song-list">
  {PLAYLIST.map((song, index) => (
    <button
      key={song.src}
      className={`song-item ${currentSong === index ? 'active' : ''}`}
      onClick={() => {
        setCurrentSong(index);
        setPlaying(false);
      }}
    >
      <span>{String(index + 1).padStart(2, '0')}</span>

      <div>
        <strong>{song.title}</strong>
        <small>{song.artist}</small>
      </div>
    </button>
  ))}
</div>
              <button type="button" className="music-player__button" onClick={toggleMusic} aria-label={playing ? 'Pause song' : 'Play song'} disabled={!audioReady}>
                {playing ? <Pause size={20} /> : <Play size={20} />}
              </button>
              <div className="music-player__copy">
                <strong>{audioName}</strong>
                <span>{audioReady ? (playing ? 'playing now' : 'press play when you are ready') : 'add a song below to use this player'}</span>
              </div>
              <Volume2 size={18} className="music-player__volume" />
            </div>

            <label className="song-upload">
              <Music2 size={17} />
              <span>Choose our song</span>
              <input type="file" accept="audio/*" onChange={handleAudioUpload} />
            </label>
            <p className="song-note">You can also place your file at <code>public/audio/song.mp3</code>.</p>

            <ContinueButton onClick={goNext}>Read the last page</ContinueButton>
          </section>
        )}

        {page === 6 && (
          <section className="screen screen--final">
            <div className="final-heart" aria-hidden="true">♡</div>
            <SectionLabel>no pressure · no conditions</SectionLabel>
            <h2>I&apos;m sorry.<br /><em>I understand.</em><br />I love you.</h2>

            <article className="final-letter">
              <p>I cannot promise that I will never make another mistake. I am human, and I know I still have things to learn.</p>
              <p>But I can promise that I do not want to keep hiding behind the same habits.</p>
              <p>I want to communicate instead of deleting. Listen instead of defending. Pause instead of pushing a conversation further. And when you need space, respect it without making it about me.</p>
              <p>I do not expect this website to fix what happened. I do not expect you to stop being upset. And I definitely do not expect a reply just because I made this.</p>
              <p className="final-letter__strong">I just wanted you to know that I heard you.</p>
              <p className="final-letter__strong">I am sorry for hurting you.</p>
              <p className="final-letter__strong">And I am going to let my actions say the rest.</p>
              <div className="signature">— Mehul ♡</div>
            </article>

            <div className="final-bunny"><Bunny small /></div>
            <p className="take-time">Take your time. You do not owe me anything right now.</p>

            <div className="final-actions">
              <button type="button" className="back-button" onClick={goPrevious}><ArrowLeft size={16} /> read again</button>
              <button type="button" className="reset-button" onClick={resetWebsite}><RotateCcw size={15} /> start again</button>
            </div>
          </section>
        )}

        <footer className="site-footer">made with honesty, not pressure ♡</footer>
      </div>

    <audio
  ref={audioRef}
  src={PLAYLIST[currentSong].src}
  preload="metadata"
/>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
