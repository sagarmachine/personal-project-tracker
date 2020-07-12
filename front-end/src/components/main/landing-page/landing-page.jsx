import React, { Component } from 'react'
 
 class LandingPage extends Component {

    state={
        value:""
    }
    componentDidMount=()=>{
this.repeat();
     }

     repeat =()=>{
  setTimeout(()=>{this.setState((prevState)=>{return{value:""}});                 
  setTimeout(()=>{this.setState((prevState)=>{return{value:"प्रोजेक्ट "}});
  setTimeout(()=>{this.setState((prevState)=>{return{value:prevState.value+" ट्रैकर"}});
  setTimeout(()=>{this.setState((prevState)=>{return{value:prevState.value+" में"}});
  setTimeout(()=>{this.setState((prevState)=>{return{value:prevState.value+" आपका"}});
  setTimeout(()=>{this.setState((prevState)=>{return{value:prevState.value+" स्वागत"}});
  setTimeout(()=>{this.setState((prevState)=>{return{value:prevState.value+" है |"}});

  setTimeout(()=>{this.setState((prevState)=>{return{value:""}});
  setTimeout(()=>{this.setState((prevState)=>{return{value:" Welcome"}});
  setTimeout(()=>{this.setState((prevState)=>{return{value:prevState.value+" to"}});
  setTimeout(()=>{this.setState((prevState)=>{return{value:prevState.value+" Project"}});
  setTimeout(()=>{this.setState((prevState)=>{return{value:prevState.value+" Tracker."}});

  setTimeout(()=>{this.setState((prevState)=>{return{value:""}});
  setTimeout(()=>{this.setState((prevState)=>{return{value:prevState.value+" Make"}});
  setTimeout(()=>{this.setState((prevState)=>{return{value:prevState.value+" your"}});
  setTimeout(()=>{this.setState((prevState)=>{return{value:prevState.value+" project"}});
  setTimeout(()=>{this.setState((prevState)=>{return{value:prevState.value+" unforgatable."}});

  setTimeout(()=>{this.setState((prevState)=>{return{value:""}});
  setTimeout(()=>{this.setState((prevState)=>{return{value:prevState.value+"Track"}});
  setTimeout(()=>{this.setState((prevState)=>{return{value:prevState.value+" and"}});
  setTimeout(()=>{this.setState((prevState)=>{return{value:prevState.value+" plan"}});
  setTimeout(()=>{this.setState((prevState)=>{return{value:prevState.value+" your"}});
  setTimeout(()=>{this.setState((prevState)=>{return{value:prevState.value+" every"}});
  setTimeout(()=>{this.setState((prevState)=>{return{value:prevState.value+" project."}});

  setTimeout(()=>{this.setState((prevState)=>{return{value:""}});
  setTimeout(()=>{this.setState((prevState)=>{return{value:prevState.value+"This"}});
  setTimeout(()=>{this.setState((prevState)=>{return{value:prevState.value+" is"}});
  setTimeout(()=>{this.setState((prevState)=>{return{value:prevState.value+" just"}});
  setTimeout(()=>{this.setState((prevState)=>{return{value:prevState.value+" a"}});
  setTimeout(()=>{this.setState((prevState)=>{return{value:prevState.value+" begining."}});

  setTimeout(()=>{this.setState((prevState)=>{return{value:""}});
  setTimeout(()=>{this.setState((prevState)=>{return{value:prevState.value+"Team"}});
  setTimeout(()=>{this.setState((prevState)=>{return{value:prevState.value+" Project"}});
  setTimeout(()=>{this.setState((prevState)=>{return{value:prevState.value+" Tracker"}});
  setTimeout(()=>{this.setState((prevState)=>{return{value:prevState.value+" under"}});
  setTimeout(()=>{this.setState((prevState)=>{return{value:prevState.value+" construction."}});

this.repeat();
},500);
},500);
},500);
},500);
},500);
},1000);
},500);
},500);
},500);
},500);
},500);
},1000);
},500);
},500);
},500);
},500);
},500);
},500);
},1000);
},500);
},500);
},500);
},500);
},1000);
},500);
},500);
},500);
},500);
},1000);
},500);
},500);
},500);
},500);
 },500);
},500);
},1000);
     } 

    render() {
        return (
            <div style={{color:"orangered",fontSize:"4rem"}}>
               {this.state.value}
       
           </div>
        )
    }
}
export default LandingPage;
