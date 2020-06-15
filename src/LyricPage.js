import React from 'react';
import appContext from './appContext';

class LyricPage extends React.Component {
    static contextType = appContext;
    constructor(props){
        super(props)
        this.state = {
            value: '',
            describe: '',
            question: '',
            lyrics: '',
        }
    }

    componentDidMount() {
        this.setState({
            lyrics: this.context.lyrics
        })
    }

    handleChange = (event) => {
        this.setState({value: event.target.value})
    }

    handleChangeDescribe = (event) => {
        this.setState({describe: event.target.value})
    }

    handleChangeLyrics = (event) => {
        this.setState({lyrics: event.target.value})
    }

    generateRhymeWord = (event) => {
        event.preventDefault()
        this.context.generateRhymeWord(this.state.value)
        this.setState({
            value: ''
        })
    }

    generateDescribingWord = (event) => {
        event.preventDefault()
        this.context.generateDescribingWord(this.state.describe)
        this.setState({
            describe: ''
        })

    }

    generateRandomQuestion = (event) => {
        event.preventDefault()
        const randomQuestion = this.context.questions[Math.floor(Math.random() * this.context.questions.length)]
        this.setState({
            question: randomQuestion,
        })
    }

    saveLyrics = (event) => {
        event.preventDefault()
        this.context.updateUserLyrics(this.state.lyrics)
            .then(response => {
                if(!response) {
                    console.log('lyrics error ran')
                    //this.context.errorChangePage()
                    alert('Login to be able to save lyrics')
                    //window.location.pathname='/loginpage'
                    this.props.history.push('/loginpage')
                }
            })

    }
    render() {
        let value = this.context;
        return(
            <div className='LyricPage'>
                <div>
                    <div className='intro'>
                        <h1 className='title small'>How to use</h1>
                    </div>
                    <p><b>Click one</b> of the three buttons for either a <b>rhyming word</b>, <b>describing word</b> or thought provoking <b>question</b> to help you brainstorm lyrics!</p>
                </div>
                <section>
                    <form>
                        <h2 className='title'>Generate Random Question</h2>
                        <button className='button' type='submit' onClick={this.generateRandomQuestion}>
                        <h3>Go</h3>
                        </button>
                        <p className='words'><b>Question:</b> {this.state.question}</p>
                    </form>
                </section>
                <section>
                    <form>
                        <h2 className='title'>Ryhme Word</h2>
                        <h3 className='subtitle'></h3>
                        <div className='inputBox'>
                            <input className='textInput' type='text' value={this.state.value} onChange={this.handleChange} placeholder='random word' />
                            <button className='button' type='submit' value='submit' onClick={this.generateRhymeWord}>Go</button>
                        </div>
                        <p className='words'><b>Rhyming words:</b> {value.rhymeWords.join(', ')}</p>
                    </form>
                </section>
                <section>
                    <form>
                        <h2 className='title'>Describing Word</h2>
                        <h3 className='subtitle'></h3>
                        <div className='inputBox'>
                            <input className='textInput' type='text' value={this.state.describe} onChange={this.handleChangeDescribe} placeholder='random word' />
                            <button className='button' type='submit' value='submit' onClick={this.generateDescribingWord}>Go</button>
                        </div>
                        <p className='words'><b>Describing words:</b> {value.describingWords.join(', ')}</p>
                    </form>
                </section>
                <section>
                    <h2 className='title'>Your Lyrics</h2>
                    <form className='lyrics'>
                        <textarea value={this.state.lyrics} onChange={this.handleChangeLyrics} className='userLyrics' />
                        <button className='saveButton' type='submit' onClick={this.saveLyrics}>save</button>
                    </form>
                </section>
            </div>
        )
    }
}

export default LyricPage;