import React,{Component} from 'react';
import axios from 'axios'
import Input from '../../UI/Input'
import Button from '../../UI/Button/Button'
import {checkValidity} from '../../shared/utility'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import * as Action from '../../store/actions/auth'
import Spinner from '../../UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import './Auth.css'


class Auth extends Component{
    state = {
        controls: {
            email: {
                elementType: 'input',

                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },

                value: '',

                validation: {
                    required: true,
                    isEmail: true
                },

                valid: false,
                touched: false,
                disabled: false
            },

            password: {
                elementType: 'input',

                elementConfig: {
                    type: 'password',
                    placeholder: 'Your Password'
                },

                value: '',

                validation: {
                    required: true,
                    special: true
                },

                valid: false,
                touched: false,
                disabled: false,
            },
            confirmPassword: {
                elementType: 'input',

                elementConfig: {
                    type: 'password',
                    placeholder: 'Confirm Password'
                },

                value: '',

                validation: {
                    required: true,
                },

                valid: false,
                touched: false,
                disabled: true
            }
        },
        isSignUp: true,
        formValidity: false,
        mounted: false
    };
    componentDidMount() {
         this.onSlideIn()
    }

    onSlideIn = ()=> {
        if(!this.props.isAuthenticated){
            setTimeout(()=> {
                this.setState({mounted: true})
            }, 50);
        }


    };
    onChangeHandler= (event, inputIdentifier)=> {
        //console.log(event.target.value);
        let controls = {
            ...this.state.controls,
            [inputIdentifier]: {
                ...this.state.controls[inputIdentifier],
                value: event.target.value,
                touched: true,
                valid: checkValidity(event.target.value, this.state.controls[inputIdentifier].validation ),
            }
        };
        let isMatch = null;
        switch(inputIdentifier){

            case 'password':
                   if(this.state.controls.confirmPassword) {
                    (controls[inputIdentifier].valid !== true?
                    controls['confirmPassword'].disabled = true:
                    controls['confirmPassword'].disabled = false);
                    isMatch = controls[inputIdentifier].value === controls['confirmPassword'].value && controls['password'].value !== '';
                    isMatch? controls['confirmPassword'].valid = true: controls['confirmPassword'].valid = false;
                   } else{
                       controls[inputIdentifier].value = event.target.value;
                   }
                break;
            case 'confirmPassword':
                isMatch = controls[inputIdentifier].value === controls['password'].value && controls['password'].value !== '';
                isMatch? controls[inputIdentifier].valid = true: controls[inputIdentifier].valid = false;
                console.log(isMatch);
                 break;
            default:
                controls[inputIdentifier].value = event.target.value
    }
    let isValid = true;
        for (let inputIdentifier in controls){
            isValid = isValid && controls[inputIdentifier].valid;
            console.log(isValid)
        }
        this.setState({controls: controls, formValidity: isValid})
    };


    onSubmitHandler= (event)=> {
        event.preventDefault();
        const userDetails = {
            email: this.state.controls.email.value,
            password: this.state.controls.password.value
        };
        this.props.onSubmit(userDetails, this.state.isSignUp)


    };
    onToggleHandler =() => {
            this.props.history.push('/signin');
    };


    render(){
        let inputArray = [];

        for (let inputIdentifier in this.state.controls){

            inputArray.push({
                id: inputIdentifier,
                config: this.state.controls[inputIdentifier]
            });
        }
        if(!this.state.isSignUp){
            console.log(inputArray)
        }
        let AuthClass = 'Auth';
        if (this.state.mounted){
            AuthClass = 'Auth SlideIn'
        } else{
            AuthClass = 'Auth slideOut'
        }
        let redirect = null;
        if (this.props.newSignUp){
            redirect= <Redirect to="/"/>;
        }
        if (this.props.isAuthenticated){
            redirect = <Redirect to="/"/>;
        }

        return(
            <div className={AuthClass}>
                {redirect}
                {this.props.loading? <Spinner/>: null}
               <h1>Sign Up</h1>
                <form onSubmit={this.onSubmitHandler}>
                    {inputArray.map(input=> {
                        return <Input
                            key={input.id}
                            elementType={input.config.elementType}
                            value={input.config.value}
                            elementConfig={input.config.elementConfig}
                            changed={(event)=>this.onChangeHandler(event,input.id)}
                            touched={input.config.touched}
                            invalid={!input.config.valid}
                            shouldBeValidated = {true}
                            valueType={input.id}
                            disabled={input.config.disabled}

                        />
                    })}
                    { this.state.isSignUp?
                        <Button classType="Success" disabled={!this.state.formValidity}>Sign Up</Button>:
                        <Button classType="Success" disabled={!this.state.formValidity}>Sign In</Button>
                    }

                </form>

                      <p className="Switcher">Already have an Account? <span className="Toggler" onClick={this.onToggleHandler} >Sign In</span></p>

            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        loading: state.loading,
        isAuthenticated: state.token !== null,
        newSignUp: state.newSignUp
    }
};

const mapDispatchToProps = dispatch => {
    return{
        onSubmit: (userDetails, isSignUp)=> dispatch(Action.authInit(userDetails, isSignUp))
    }
};



export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Auth, axios))