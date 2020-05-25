import React from 'react';
import appContext from './appContext';

class SignUpPage extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            username: '',
            email: '',
            password: ''

        }
    }

    static contextType = appContext;

    signUp = (event) => {
        event.preventDefault()
        const { user_name, email, password } = event.target
        //console.log('user_name', user_name.value, 'password', password.value)
        this.context.signUp(user_name.value, email.value, password.value)
    }

    handleChangePassword = (event) => {
        this.setState({ password: event.target.value})
    }

    handleChangeUsername = (event) => {
        this.setState({ username: event.target.value})
    }

    handleChangeEmail = (event) => {
        this.setState({ email: event.target.value})
    }

    validateLoginInfo = () => {
        //return true
        const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&])[\S]+/
        if (!this.state.username) {
            return 'username missing'
        }
        if (!this.state.email) {
            return 'email missing'
        }
        if (this.state.password.startsWith(' ')|| this.state.password.endsWith(' ')) {
            return 'Password must not start or end with empty spaces'
        }
        if (!REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(this.state.password)) {
            return 'Password must contain 1 upper case, lower case, number and special character'
        }
        if (this.state.password.length < 8 || this.state.password.length > 72) {
            return 'Password is longer than 8 digits'
        }
    }

    render() {

        return(
            <div className='LoginPage'>
                <section className='login'>
                    <form className='LoginForm' onSubmit={this.signUp}>
                        <div className='column'>
                            <h1>Sign Up</h1>
                            <input className='textInput loginText loginTextTop' name='user_name' type='text' placeholder='username' onChange={this.handleChangeUsername} />
                            <input className='textInput loginText' name='email' type='text' placeholder="email" onChange={this.handleChangeEmail} />
                            <input className='textInput loginText loginTextBottom' id='signuppassword' name='password' type='password' placeholder="password" onChange={this.handleChangePassword} />
                            <p>{this.validateLoginInfo()}</p>
                            <button
                                className='button loginText loginButton'
                                type='submit'
                                disabled={
                                    this.validateLoginInfo()
                                }
                                >Sign Up</button>
                        </div>
                    </form>
                </section>
            </div>
        )
    }
}

export default SignUpPage;