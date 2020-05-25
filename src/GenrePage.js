import React from 'react';
import appContext from './appContext';

class GenrePage extends React.Component {
    static contextType = appContext;
    constructor(props){
        super(props)
        this.state = {

        }
    }

    render() {
        return(
            <div className='GenrePage'>
                <section>
                    <h1>
                        {this.context.selected.charAt(0).toUpperCase() + this.context.selected.slice(1)}
                    </h1>
                    <h2>BPM: {this.context.genres[this.context.selected.charAt(0).toUpperCase() + this.context.selected.slice(1)].bpm}</h2>
                    <h2>Common Instruments: {this.context.genres[this.context.selected.charAt(0).toUpperCase() + this.context.selected.slice(1)].instruments}</h2>
                    <p>{this.context.genres[this.context.selected.charAt(0).toUpperCase() + this.context.selected.slice(1)].info}</p>
                </section>
                <section class="spotify">
                    <h1>{this.context.genres[this.context.selected.charAt(0).toUpperCase() + this.context.selected.slice(1)].music}</h1>
                </section>
            </div>
        )
    }
}

export default GenrePage;