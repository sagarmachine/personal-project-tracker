import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';

 class PayPalSuccess extends Component {

    componentDidUpdate=()=>{
console.log(this.props);   

    }
    render() {
        return (
            <div>
                SUCCESS
            </div>
        )
    }
}

 export default withRouter(PayPalSuccess);