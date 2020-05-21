import React from 'react';
import { Link } from 'react-router-dom'

class MainPage extends React.Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }

    render() {
        
        return(
            <div className='Main'>
                    <div className='intro'>
                        <h1 className='title'>Music Making</h1>
                    </div>
                    <section>
                        <h2 className='title'>How to use</h2>
                        <p>Click the drop down, choose the genre of music and click go to see basic information about that genre! If you would like to work on writing lyrics to you song click on yes under the lyrics heading to get started.</p>
                    </section>
                    <section>
                        <h2 className='title'>Genre</h2>
                        <label>
                            <h3 className='subtitle'>Pick a Genre!</h3>
                        </label>
                        <div className='selectBox'>
                            <select className='select' id='genre'>
                                <option>Rock</option>
                                <option>Jazz</option>
                                <option>EDM</option>
                                <option>Boom Bap (Rap)</option>
                                <option>Trap</option>
                            </select>
                            <Link className='button' to='/genrepage'>Go</Link>
                        </div>
                        
                    </section>
                    <section>
                        <h2 className='title'>Lyrics</h2>
                        <h3 className='subtitle'>Need help brainstorming lyrics?</h3>
                        <Link className='button' to='/lyricpage'>Yes</Link>
                    </section>
                    <section>
                        <h2 className='title'>
                        About
                        </h2>
                        <p>I am a music producer and wanted to make an easy way for other producers like myself to get information about different genres in order to make better music!</p>
                    </section>
            </div>
        )
    }
}

export default MainPage;