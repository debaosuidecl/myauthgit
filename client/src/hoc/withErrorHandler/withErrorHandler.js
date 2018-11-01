import React, { Component } from 'react'

const withErrorHandler = (WrappedComponent, axios) =>{
    return class extends Component{
        state = {
            error: null
        };
        componentWillMount(){
            this.reqinterceptors = axios.interceptors.request.use(req=>{
                this.setState({error: null});
                return req
            }, error=>{
                console.log(error);

            });
            this.resinterceptors = axios.interceptors.response.use(res=>res, error=>{
                console.log(error);
                this.setState({error: error})
            })
        }
        componentWillUnmount() {

            axios.interceptors.request.eject(this.reqinterceptors);
            axios.interceptors.response.eject(this.resinterceptors);
        }

       /* errorConfirmedHandler= ()=>{
            this.setState({error:null})
        };*/
        render() {
            return(
                <React.Fragment>

                       {/* {this.state.error? this.state.error.message: null*/}}

                    <WrappedComponent {...this.props} />
                </React.Fragment>
            )
        }
    }

};

export default withErrorHandler