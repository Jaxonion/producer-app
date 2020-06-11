import React from 'react';
import appContext from './appContext';

class GenrePage extends React.Component {
    static contextType = appContext;
    constructor(props){
        super(props)
        this.state = {

        }
    }

    changeGenre = (event) => {
        this.context.genre(event.target.value)
    }

    render() {
        return(
            <div className='GenrePage'>
                <section>
                    <div className='selectBox genreSelect'>
                        <select defaultValue={'DEFAULT'} onChange={this.changeGenre} className='select' id='genre'>
                            <option value='DEFAULT' disabled hidden>Select an Genre</option>
                            <option value='Rock'>Rock</option>
                            <option value='Jazz'>Jazz</option>
                            <option value='EDM'>EDM</option>
                            <option value='Rap'>Rap</option>
                            <option value='Techno'>Techno</option>
                            <option value='Country'>Country</option>
                        </select>
                    </div>
                    <h1 className='title'>
                        {this.context.selected.charAt(0).toUpperCase() + this.context.selected.slice(1)}
                    </h1>
                    <h2>Common BPM: {this.context.genres[this.context.selected.charAt(0).toUpperCase() + this.context.selected.slice(1)].bpm}</h2>
                    <h2>Common Instruments: {this.context.genres[this.context.selected.charAt(0).toUpperCase() + this.context.selected.slice(1)].instruments}</h2>
                    <p>{this.context.genres[this.context.selected.charAt(0).toUpperCase() + this.context.selected.slice(1)].info}</p>
                </section>
                <section className="spotify">
                    <h1 className='title'>Listen to {this.context.selected.charAt(0).toUpperCase() + this.context.selected.slice(1) || ''}</h1>
                    <div className='spotifyContainer'>{this.context.genres[this.context.selected.charAt(0).toUpperCase() + this.context.selected.slice(1)].music || ''}</div>
                </section>
            </div>
        )
    }
}

export default GenrePage;