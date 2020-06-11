import React from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';

import MainPage from './MainPage';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';
import GenrePage from './GenrePage';
import LyricPage from './LyricPage';
import appContext from './appContext';

import { API_URL } from './config';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      rhymeWords: [],
      describingWords: [],
      questions: ['What do you think about most?','what are you passionate about?','How do you feel? Why?','How could the world improve?'],
      username: '',
      page: '',
      genres: {
        Rock: {
            bpm: '110-140',
            instruments: 'Electric guitar, bass guitar, drums, keyboards',
            info: '',
            music: <iframe src="https://open.spotify.com/embed/playlist/37i9dQZF1DWXRqgorJj26U" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
        },
        Jazz: {
            bpm: '120-125',
            instruments: 'Piano, saxophone, clarinet, trombone, trumpet, electric guitar, vibraphone, flute, french horn, drum kit',
            info: '',
            music: <iframe src="https://open.spotify.com/embed/playlist/37i9dQZF1DXbITWG1ZJKYt" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
        },
        EDM: {
            bpm: '140 +/-',
            instruments: 'sampler-sequencer, drum machine, bass line generator, drum machine',
            info: '',
            music: <iframe src="https://open.spotify.com/embed/playlist/3Di88mvYplBtkDBIzGLiiM" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
        },
        Rap: {
            bpm: '140 +/-',
            instruments: 'Bells, strings, piano, synths, brass',
            info: '',
            music: <iframe src="https://open.spotify.com/embed/playlist/4pCLzyVRnWpOivB6RwPREo" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
        },
        Techno: {
          bpm: '120-160',
          instruments: 'Drum machine, sequencer, synthesizers, digital audio workstation',
          info: '',
          music: <iframe src="https://open.spotify.com/embed/playlist/3QEYvCsVXZj8KuzE0bDmcI" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
        },
        Country: {
          bpm: '80-160',
          instruments: 'Guitar, drums, bass, piano, fiddle, string bass, banjo',
          info: '',
          music: <iframe src="https://open.spotify.com/embed/playlist/37i9dQZF1DX1lVhptIYRda" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
        }
      },
      selected: 'rock',
    }
  }

  errorChangePage = () => {
    this.setState({
      page: 'login'
    })
  }

  changePage = (event) => {
    this.setState({
      page: event.target.id
    })
  }

  genre = (changeTo) => {
    this.setState({
      selected: changeTo
    })
  }

  generateDescribingWord = (word) => {
    fetch(`https://api.datamuse.com/words?rel_jjb=${word}`)
      .then(res => {
        if(!res.ok) {
          throw new Error(`fetch didn't work`)
        }
        return res
      })
      .then(response => {
        return response.json()
      })
      .then(res => {
        const oldObject = res.slice(0, 10)
        const newArray = oldObject.map(words => words.word)
        return newArray
      })
      .then(words => {
        this.setState({
          describingWords: words
        })
      })
  }

  generateRhymeWord = (word) => {
    fetch(`https://api.datamuse.com/words?rel_rhy=${word}`)
      .then(res => {
        if(!res.ok) {
          throw new Error(`fetch didn't work`)
        }
        return res
      })
      .then(response => {
        return response.json()
      })
      .then(res => {
        const oldObject = res.slice(0, 10)
        const newArray = oldObject.map(words => words.word)
        return newArray
      })
      .then(words => {
        this.setState({
          rhymeWords: words
        })
      })
  }

  signUp = (username, email, password) => {
    return fetch(`${API_URL}/api/auth/signup`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password
      })
    })
    .then(res => {
      if(!res.ok) {
        throw new Error(`fetch didn't work`)
      }
      return res
    })
    .then(response => {
      return response.json()
    })
      .then(response => {
        return response;
      })
  }

  login = (user_name, password) => {

    return fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        username: user_name,
        password: password
      })
    })
    .then(res => {
      if(!res.ok) {
        throw new Error(`fetch didn't work`)
      }
      return res.json()
    })
    .then(response => {
      localStorage.setItem('token', response.token)
      this.setState({
        username: user_name,
        lyrics: response.lyrics
      })
      this.getUserInfo()
      return response
    })
  }

  updateUserLyrics = (lyrics) => {
    this.setState({
      lyrics: lyrics
    })
    return fetch(`${API_URL}/api/auth/update`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'sessiontoken': `${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        username: this.state.username,
        lyrics
      })
    })
    .then(res => {
      if(!res.ok) {
        return false;
      }
      return res.json()
    })

  }

  getUserInfo = () => {
    fetch(`${API_URL}/api/auth/login`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      'sessiontoken': `${localStorage.getItem('token')}`
    }
  })
  .then(res => {
    
    if(!res.ok) {
      throw new Error(`fetch didn't work`)
    }
    return res.json()
  })
  .then(response => {
    this.setState({
      lyrics: response.lyrics
    })
    return response
  })
  }

  logout = () => {
    this.setState({
      username: '',
      lyrics: ''
    })
    localStorage.removeItem('token')
  }

  componentDidMount() {
    
  }

  render() {
    const contextValue = {
      //set variables for global methods
      rhymeWords: this.state.rhymeWords,
      describingWords: this.state.describingWords,
      questions: this.state.questions,
      genreInfo: this.state.genreInfo,
      userInfo: this.state.userInfo,
      value: this.state.value,
      username: this.state.username,
      lyrics: this.state.lyrics,
      selected: this.state.selected,
      genres: this.state.genres,
      generateRandomQuestion: this.generateRandomQuestion,
      saveLyrics: this.saveLyrics,
      generateRandomWord: this.generateRandomWord,
      changePage: this.changePage,
      errorChangePage: this.errorChangePage,
      generateDescribingWord: this.generateDescribingWord,
      generateRhymeWord: this.generateRhymeWord,
      signUp: this.signUp,
      login: this.login,
      genre: this.genre,
      updateUserLyrics: this.updateUserLyrics
    }
    return(
      <appContext.Provider
        value={contextValue}>
          <div className='App'>
            <header
              aria-label='producer-app'
              aria-describedby='header'>
                <Link className='header' id='header' to='/' onClick={this.changePage}><h1>Producer App</h1></Link>
                {
                  this.state.username || window.location.pathname == '/signuppage' ? null : <Link className='header' id='signup' to='/signuppage' onClick={this.changePage}>Sign Up</Link>
                }
                {
                  this.state.username || window.location.pathname == '/loginpage' ? null : <Link className='header' id='login' to='/loginpage' onClick={this.changePage}>Login</Link>
                }
                {
                  this.state.username ? <Link className='header' id='logout' to='/' onClick={this.logout} >Log Out</Link> : null
                }
                {
                  window.location.pathname !== '/lyricpage' ? <Link className='header brainstorm' id='brainstorm' to='/lyricpage' onClick={this.changePage}>Brainstorm Lyrics</Link> : null
                }
                {
                  window.location.pathname !== '/genrepage' ? <Link className='header genres' id='genres' to='genrepage' onClick={this.changePage}>Genres</Link> : null
                }
              </header>
              <div className='MainPage'>
                <Route exact path={['/']}
                  render={(props) => {
                    return(
                      <MainPage {...props}/>
                    )
                  }}/>
                <Route path={['/lyricpage']}
                  render={(props) => {
                    return(
                      <LyricPage {...props}/>
                    )
                  }}/>
                  <Route path={['/signuppage']}
                  render={(props) => {
                    return(
                      <SignUpPage {...props}/>
                    )
                  }}/>
                <Route path={['/loginpage']}
                  render={(props) => {
                    return(
                      <LoginPage {...props}/>
                    )
                  }}/>
                <Route path={['/genrepage']}
                  render={(props) => {
                    return(
                      <GenrePage {...props}/>
                    )
                  }}/>
              </div>
          </div>

      </appContext.Provider>
    )
  }
}

export default App;