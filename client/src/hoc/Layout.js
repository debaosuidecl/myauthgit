import React, {Component}  from 'react'
import Toolbar from '../components/Toolbar/Toolbar'
import Backdrop from '../UI/Backdrop/Backdrop'

class Layout extends Component{
    render(){
        return (
            <div className="Background">
                <Toolbar/>
                <Backdrop/>
                {this.props.children}
            </div>
        )
    }
}


export default Layout