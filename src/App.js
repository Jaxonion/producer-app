import React from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';

import MainPage from './MainPage';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';
import GenrePage from './GenrePage';
import LyricPage from './LyricPage';
import appContext from './appContext';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      rhymeWords: [],
      describingWords: [],
      questions: ['What do you think about most?','what are you passionate about?','How do you feel? Why?','How could the world improve?'],
      username: '',
      genres: {
        Rock: {
            bpm: '110-140',
            instruments: 'Electric guitar, bass guitar, drums, keyboards',
            info: '',
            music: <iframe src="https://open.spotify.com/embed/playlist/37i9dQZF1DWXRqgorJj26U" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
        },
        Jazz: {
            bpm: '120-125',
            instruments: 'Piano, saxophone, clarinet, trombone, trumpet, electric guitar, vibraphone, flute, french horn, drum kit',
            info: '',
            music: <iframe src="https://open.spotify.com/embed/playlist/37i9dQZF1DXbITWG1ZJKYt" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
        },
        EDM: {
            bpm: '140 +/-',
            instruments: 'sampler-sequencer, drum machine, bass line generator, drum machine',
            info: '',
            music: <iframe src="https://open.spotify.com/embed/playlist/3Di88mvYplBtkDBIzGLiiM" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
        },
        Rap: {
            bpm: '140 +/-',
            instruments: 'Bells, strings, piano, synths, brass',
            info: '',
            music: <iframe src="https://open.spotify.com/embed/playlist/4pCLzyVRnWpOivB6RwPREo" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
        },
        Techno: {
          bpm: '120-160',
          instruments: 'Drum machine, sequencer, synthesizers, digital audio workstation',
          info: '',
          music: <iframe src="https://open.spotify.com/embed/playlist/3QEYvCsVXZj8KuzE0bDmcI" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
        },
        Country: {
          bpm: '80-160',
          instruments: 'Guitar, drums, bass, piano, fiddle, string bass, banjo',
          info: '',
          music: <iframe src="https://open.spotify.com/embed/playlist/37i9dQZF1DX1lVhptIYRda" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
        }
      },
      selected: 'rock',
    }
  }

  genre = (changeTo) => {
    console.log('genre change to', changeTo)
    this.setState({
      selected: changeTo
    })
    //console.log('genre', this.state.selected)
  }

  generateDescribingWord = (word) => {
    //console.log('function ran')
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
        //console.log(res.slice(0, 5)[0].word)
        const oldObject = res.slice(0, 10)
        const newArray = oldObject.map(words => words.word)
        //console.log(newArray)
        return newArray
      })
      .then(words => {
        this.setState({
          describingWords: words
        })
        //console.log('state', this.state.describingWords)
      })
  }

  generateRhymeWord = (word) => {
    //console.log('function ran')
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
        //console.log(res.slice(0, 5)[0].word)
        const oldObject = res.slice(0, 10)
        const newArray = oldObject.map(words => words.word)
        //console.log(newArray)
        return newArray
      })
      .then(words => {
        this.setState({
          rhymeWords: words
        })
        //console.log('state', this.state.rhymeWords)
      })
  }

  signUp = (username, email, password) => {
    //console.log('username', email, 'password', password)
    fetch(`https://radiant-dusk-15656.herokuapp.com/api/auth/signup`, {
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
      //console.log(response)
      return response.json()
    })
  }

  login = (user_name, password) => {
    //console.log(user_name, password)

    return fetch(`https://radiant-dusk-15656.herokuapp.com/api/auth/login`, {
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
      //console.log('res', res)
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
      console.log('zzzr', this.state.username)
      this.getUserInfo()
      //this.props.history.push('/')
      return response
    })
    /*
    fetch(`http://localhost:8000/api/auth/signup`, {
      method: 'GET',
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
      return res
    })
    .then(response => {
      return response.json()
    })
    .then(res => {
      console.log(res)
      this.setState({
        userInfo: res
      })
    })*/
    
  }

  updateUserLyrics = (lyrics) => {
    console.log('lyrics', lyrics)
    this.setState({
      lyrics: lyrics
    })
    console.log(this.state.lyrics)
    return fetch(`https://radiant-dusk-15656.herokuapp.com/api/auth/update`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
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
    fetch(`https://radiant-dusk-15656.herokuapp.com/api/auth/login`, {
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
  }

  componentDidMount() {
    /*
    fetch(``, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': 'Bearer 910237e9-95fd-4ecf-b17b-4af6605a1f01'
      }
    })
    .then(res => {
      if(!res.ok) {
        throw new Error('fetch didn't work')
      }
      return res
    })
    .then(response => {
      return response.json()
    })
    .then(res => {
      console.log(res)
      this.setState({
        userInfo: res
      })
    })
    */
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
      generateDescribingWord: this.generateDescribingWord,
      generateRhymeWord: this.generateRhymeWord,
      signUp: this.signUp,
      login: this.login,
      genre: this.genre,
      updateUserLyrics: this.updateUserLyrics
    }
    console.log('context', contextValue.selected)
    return(
      <appContext.Provider
        value={contextValue}>
          <div className='App'>
            <header
              aria-label='producer-app'
              aria-describedby='header'>
                <Link className='header' id='header' to='/'><h1>Producer App</h1></Link>
                <Link className='header' id='signup' to='/signuppage'>Sign Up</Link>
                <Link className='header' id='login' to='/loginpage'>Login</Link>
                <Link className='header' id='logout' to='/' onClick={this.logout} >Logout</Link>
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