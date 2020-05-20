import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import InstallCard from '../../components/UI/vCards/InstallLoginCard/InstallLoginCard';
import InstallForm from '../../components/UI/vForms/InstallForm/InstallForm';

class Install extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            pollingStation: [
                { id: "1", voters: "0", initDate: "2020-05-05T06:00", endDate: "", enable: false, idFather: "1", school: "Telecomunicaciones"},
                { id: "2", voters: "150", initDate: "2019-05-05T06:00", endDate: "2019-05-05T20:00", enable: false, idFather: "2", school: "Educación"},
                { id: "3", voters: "230", initDate: "2019-05-05T06:00", endDate: "2019-05-05T20:00", enable: false, idFather: "2", school: "Derecho"},
                { id: "4", voters: "600", initDate: "2019-05-05T06:00", endDate: "2019-05-05T20:00", enable: false, idFather: "2", school: "Civil"},
                { id: "5", voters: "2", initDate: "2018-05-05T06:00", endDate: "2018-05-05T20:00", enable: false, idFather: "3", school: "Informática"}
            ]
         };
    }

    installRedirection = () =>{
        console.log("installRedirection");
        if (this.props.selectedPollingStation === "Seleccione una de las opciones"){
            console.log("Error, escoja una opción")
        } else {
            console.log("logicRedirection");
            this.props.installHandler();
            this.props.history.push( '/login/' );
        }
    }

    render(){
        return (
            <Aux>
                <InstallCard>
                    <InstallForm
                        pollingStationsArray={this.state.pollingStation}
                        installHandler={this.installRedirection}
                        selectEvent={this.props.selectEvent}
                        value={this.props.selectedPollingStation}/>
                </InstallCard>
            </Aux>
        )
    }
}

export default Install;