import React from 'react';
import { Link } from 'react-router-dom';
import appContext from './appContext';
import spotifyPic from './pictures/Capture.PNG';
import howToOne from './pictures/how_to_1.PNG';
import howToTwo from './pictures/how_to_2.PNG';
import howToThree from './pictures/how_to_3.PNG';

class MainPage extends React.Component {
    static contextType = appContext;
    constructor(props){
        super(props)
        this.state = {

        }
    }

    changePage = (event) => {
        this.context.changePage(event)
    }

    changeGenre = (event) => {
        this.context.genre(event.target.value)
    }

    render() {
        
        return(
            <div className='Main'>
                <div className='intro'>
                    <h1 className='title'>Music Making</h1>
                </div>
                <section>
                    <h2 className='title'>Purpose</h2>
                    <p>I made this app to help <b>song writers</b> and <b>music producers</b>. The <b>genre page</b> is for producers to see general information about a genre. The <b>brainstorm page</b> is to help song writters to brainstorm and save lyrics.</p>
                </section>
                <section>
                    <h2 className='title'>Genre</h2>
                    <label htmlFor='genre'>
                        <h3 className='subtitle'>Learn about a genre!</h3>
                    </label>
                    <div className='selectBox'>
                        <select defaultValue={'DEFAULT'} onChange={this.changeGenre} className='select' id='genre'>
                            <option value='DEFAULT' disabled hidden>Select a Genre</option>
                            <option value='Rock'>Rock</option>
                            <option value='Jazz'>Jazz</option>
                            <option value='EDM'>EDM</option>
                            <option value='Rap'>Rap</option>
                            <option value='Techno'>Techno</option>
                            <option value='Country'>Country</option>
                        </select>
                        <Link className='button' id='genres' to='/genrepage' onClick={this.changePage}>Go</Link>
                    </div>
                        
                </section>
                <section>
                    <h2 className='title'>Brainstorm</h2>
                    <h3 className='subtitle'>Need help brainstorming lyrics?</h3>
                    <Link className='button brainstormPageButton' id='brainstorm' to='/lyricpage' onClick={this.changePage}>Yes</Link>
                </section>
                <section>
                    <h2 className='title'>How to use</h2>
                    <p><b>Producers</b>: click the drop down and choose the genre you will be trying to imitate to see general information on that genre. You can also listen to different artists of that genre to get a better feel for it.</p>
                    <img alt='spotifyPic' className='spotifyPic howTo' src={spotifyPic} />
                    <p><b>Song Writers</b>: click on the Brainstorm lyrics tab to start brainstorming lyrics.</p>
                    <div className='pictures'>
                        <p><b>Generate random question</b> to help brainstorm lyrics.</p>
                        <img alt='questionGenerator' className='howTo' src={howToOne} />
                        <p>Type in a word to find <b>rhyming word</b></p>
                        <img alt='rhymingWord' className='howTo' src={howToTwo} />
                        <p>Type in word to find <b>descriptive word</b></p>
                        <img alt='descriptiveWord' className='howTo' src={howToThree} />
                    </div>
                </section>
                <section>
                    <h2 className='title'>
                    About
                    </h2>
                    <p>I am a <b>music producer</b> and wanted to make an <b>easy way</b> for other producers like myself to <b>get information</b> about different <b>genres</b> in order to make better music!</p>
                </section>
            </div>
        )
    }
}

export default MainPage;