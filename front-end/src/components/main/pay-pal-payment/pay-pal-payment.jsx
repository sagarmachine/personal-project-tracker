import React, { Component } from 'react'
import axios from 'axios'


  class PayPalPayment extends Component {
    

    state={
        amt:"1"
    }

    amtChangeHandler=(newAmt)=>{
         
        this.setState({
            amt:newAmt
        })

    }

    makePaymentHandler=()=>{

        axios.post("v1/user/make/payment?sum="+this.state.amt).
        then(data=>{window.location.href =data.data.redirect_url;
    });
    }

    completePayment=()=>{
        
    }

    render() {
        return (
            <div>
                <input value={this.state.amt} 
                onChange={(event)=>
                    this.amtChangeHandler(event.target.value)} 

                />

                <button onClick={this.makePaymentHandler}>Make A Payment </button>
            </div>
        )
    }
}


export default PayPalPayment;