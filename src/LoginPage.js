import React from 'react';
import appContext from './appContext';

class LoginPage extends React.Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }

    static contextType = appContext;

    login = (event) => {
        event.preventDefault()
        const { user_name, password } = event.target
        //console.log('user_name', user_name.value, 'password', password.value)
        this.context.login(user_name.value, password.value)
            .then(response => {
                this.props.history.push('/')
            })
    }

    validateLoginInfo = () => {

    }

    render() {

        return(
            <div className="LoginPage">
                <form className='LoginForm column' onSubmit={this.login}>
                <h1 className='subtitle'>Login</h1>
                <input className='textInput loginText loginTextTop' id='user_name' name='user_name' type='text' placeholder='password' />
                <input className='textInput loginText loginTextBottom' name='password' type='password' placeholder='password' />
                <button
                    className='button loginText loginButton'
                    type='submit'
                    disabled={
                        this.validateLoginInfo()
                    }
                    >Login</button>
            </form>
            </div>
        )
    }
}

export default LoginPage;