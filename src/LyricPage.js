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
        //console.log('lyrics', this.context.lyrics)
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
        //console.log('function ran', this.state.value)
        this.context.generateRhymeWord(this.state.value)
        //console.log(this.context.ryhmeWords)
        this.setState({
            value: ''
        })
        console.log(this.context.questions)
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
        //console.log('random question', randomQuestion)
        this.setState({
            question: randomQuestion,
        })
        //console.log(this.state.question)
    }

    saveLyrics = (event) => {
        event.preventDefault()
        //console.log(this.state.username)
        //console.log('saveLyrics ran', this.state.lyrics)
        this.context.updateUserLyrics(this.state.lyrics)
            .then(response => {
                if(!response) {
                    console.log('false')
                    this.props.history.push('/loginpage')
                }
            })
        //console.log('state', this.state.lyrics, 'context', this.context.lyrics)

    }
    render() {
        let value = this.context;
        //console.log('questions', value.questions)
        //const randomQuestion = value.questions[Math.floor(Math.random() * value.questions.length)]
        //const rhymeWords = value.ryhmeWords
        //console.log('contexxxxt', value.rhymeWords)
        return(
            <div className='LyricPage'>
                <section>
                    <h2 className='title'>How to use</h2>
                    <p>Click one of the two buttons for either a random word or question to help you brainstorm lyrics!</p>
                </section>
                <section>
                    <form>
                        <h2 className='title'>Generate Random Question</h2>
                        <button className='button' type='submit' onClick={this.generateRandomQuestion}>
                        <h3>Go</h3>
                        </button>
                        <p>Question: {this.state.question}</p>
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
                        <p>rhyming words: {value.rhymeWords.join(', ')}</p>
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
                        <p>describing words: {value.describingWords.join(', ')}</p>
                    </form>
                </section>
                <section>
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