import React from 'react';

class GenrePage extends React.Component {
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
                        Genre name
                    </h1>
                    <h2>Common BPM: ...</h2>
                    <h2>Common Instruments:... </h2>
                    <p>Nunc sodales ex quis elit consectetur, eu dignissim lectus porttitor. Phasellus vel est nec ex interdum faucibus et sit amet magna. Nam mollis, leo eget rutrum ultrices, libero elit cursus eros, in rhoncus odio est id libero. Quisque massa mi, pulvinar ac lectus et, dictum consequat purus. Cras et sollicitudin nisl. Nam a est leo. Nunc id lobortis leo. Curabitur sapien nibh, bibendum at ultrices venenatis, maximus et arcu. Donec feugiat semper erat, ac accumsan erat vulputate sit amet.</p>
                </section>
                <section class="spotify">
                    <h1>Implemented Spotify API with Playlist of Genre</h1>
                </section>
            </div>
        )
    }
}

export default GenrePage;