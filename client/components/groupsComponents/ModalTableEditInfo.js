import React, {Component} from 'react'


export default class ModalTableEditInfo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            inputsStack: this.props.content.values,     //this state we pass to redux and to node.js
            initialValues: {deployementInstance: {}},   //this state contains immutable income values
            uniqueLocations: [],                        //state for unique locations
            deployementInfo: {}                         //state for information about clicked deployement
        };

        this.handleInput = this.handleInput.bind(this);
        this.validate = this.validate.bind(this);
        this.showFullDescription = this.showFullDescription.bind(this);
    };

    //retreiving unique locations and updating income abject to make all deployements have the same properties
    componentWillMount() {

        const deployementName = this.props.deployement;
        const development = this.state.inputsStack.development;
        const staging = this.state.inputsStack.staging;
        const production = this.state.inputsStack.production;
        const allInstances = this.state.inputsStack.allInstances;
        const all_instanses = [development, staging, production];

        //defining unique locations in all values
        let temp = [];

        for (let i = 0; i < all_instanses.length; i++) {
            for (let key in all_instanses[i]) {
                temp.push(key);
            }
        };

        const unique = temp.filter( onlyUnique );

        function onlyUnique(value, index, array) {
            return array.indexOf(value) === index;
        };

        this.setState({
            uniqueLocations: this.state.uniqueLocations.concat(unique)
        });

        //making immutable constant which holds income values of one deployement
        let incomeData = {deployementInstance: {}};
        let depVar = {};

        if ( deployementName === 'development' ) {
            depVar = development;
            for (let key in development) {
                incomeData['deployementInstance'][key] = development[key]
            }
        } else if ( deployementName === 'staging' ) {
            depVar = staging;
            for (let key in staging) {
                incomeData['deployementInstance'][key] = staging[key]
            }
        } else if ( deployementName === 'production' ) {
            depVar = production;
            for (let key in production) {
                incomeData['deployementInstance'][key] = production[key]
            }
        }

        this.setState({
            deployementInfo: depVar,
            initialValues: incomeData
        });

    };



    componentDidMount() {
        document.getElementsByClassName('modal-content')[0].style.maxWidth = window.innerWidth + 'px';

        const type = this.props.content.type;

        if(type === 'boolean') {
            const tds = document.getElementById("site_preference_table").getElementsByTagName("td");

            for (let i = 0; i < tds.length; i++) {
                tds[i].style.minWidth = '160px';
            }
        }
    };

    // If type === number enter only digits 
    validate(evt) {
        var theEvent = evt || window.event;
        var key = theEvent.keyCode || theEvent.which;
        var type = this.props.content.type;

        if (type === 'number') {
            key = String.fromCharCode(key);
            if(!(/[0-9]|\./.test(key)))  {
                theEvent.preventDefault();
            }
        }
    }

    handleInput(event) {

        const deployementInfo = this.state.deployementInfo;
        const deployementName = this.props.deployement;
        const initialValues = this.state.initialValues;

        const allInstances = this.props.content.values.allInstances;
        const type = this.props.content.type;
        const defaultValue = this.props.content.defaultValue === undefined
            ?
            ((type === 'boolean') ? false : '')
            :
            this.props.content.defaultValue;

        //modified values
        const development = this.state.inputsStack.development;
        const staging = this.state.inputsStack.staging;
        const production = this.state.inputsStack.production;

        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        const field = event.target.closest('td');


        if (target.className === 'closeInitialize') {

            field.childNodes[0].style.display = 'block';
            field.childNodes[1].style.display = 'none';
            field.childNodes[2].style.display = 'none';

            const nameOnClose = event.target.closest('td').childNodes[1].name;

            if ( deployementName === 'development' ) {
                delete  development[nameOnClose];
            } else if ( deployementName === 'staging' ) {
                delete  staging[nameOnClose];
            } else if ( deployementName === 'production' ) {
                delete  production[nameOnClose];
            }

            this.setState({
                inputsStack: { development, staging, production, allInstances }
            });

        } else if (target.className === 'initialize') {

            field.childNodes[0].style.display = 'none';
            field.childNodes[1].style.display = 'inline';
            type === 'boolean' ? field.childNodes[1].style.width = '' : field.childNodes[1].style.width = '75%';
            type === 'boolean' ? field.childNodes[2].style.left = '20px' : false;
            field.childNodes[2].style.display = 'inline';


            const nameOnInitialize = event.target.closest('td').childNodes[1].name;

            if ( deployementName === 'development' ) {
                development[nameOnInitialize] = defaultValue;
            } else if ( deployementName === 'staging' ) {
                staging[nameOnInitialize] = defaultValue;
            } else if ( deployementName === 'production' ) {
                production[nameOnInitialize] = defaultValue;
            }

            this.setState({
                inputsStack: { development, staging, production, allInstances }
            });


        } else {

            //updating value(state) depending on input's changes
            if ( deployementName === 'development' ) {

                if (name in deployementInfo) {
                    for (let key in development) {
                        if (name === key) {
                            development[key] = value;
                        }
                    }
                } else {
                    development[name] = value;
                    for (let key in development) {
                        if (name === key) {
                            development[key] = value;
                        }
                    }
                }

            } else if ( deployementName === 'staging' ) {

                if (name in deployementInfo) {
                    for (let key in staging) {
                        if (name === key) {
                            staging[key] = value;
                        }
                    }
                } else {
                    staging[name] = value;
                    for (let key in staging) {
                        if (name === key) {
                            staging[key] = value;
                        }
                    }
                }

            } else if ( deployementName === 'production' ) {

                if (name in deployementInfo) {
                    for (let key in production) {
                        if (name === key) {
                            production[key] = value;
                        }
                    }
                } else {
                    production[name] = value;
                    for (let key in production) {
                        if (name === key) {
                            production[key] = value;
                        }
                    }
                }

            };

            // Validation
            let errorMsg = document.getElementById('error_validation_msg_info');

            switch(type) {
                case 'number': {
                    if (value < 0 || value > 999999) {
                        errorMsg.innerHTML = 'Error! Please, enter a number between 0 and 999999.';
                        errorMsg.style.color = 'red';
                    } else {
                        errorMsg.innerHTML = '';
                    }
                }
                case 'string': {
                    if (value.length > 999999) {
                        errorMsg.innerHTML = 'Error! Please, enter a smaller string.';
                        errorMsg.style.color = 'red';
                    } else {
                        errorMsg.innerHTML = '';
                    }
                }
            }

            this.setState({
                inputsStack: { development, staging, production, allInstances }
            });
        }

    };



    showFullDescription() {
        const desc = document.getElementsByClassName('preferenceDescription');
        desc[0].className = "full_description";
    }



    render() {

        const type = this.props.content.type;
        const defaultValue = this.props.content.defaultValue === undefined
            ?
            ((type === 'boolean') ? false : '')
            :
            this.props.content.defaultValue;

        const locals = this.state.uniqueLocations;
        //modified parameters
        const stack = this.state.inputsStack;

        //income parameters
        const dev = this.state.initialValues.development;
        const stag = this.state.initialValues.staging;
        const prod = this.state.initialValues.production;

        const deployementInfo = this.state.deployementInfo;
        const deployementName = this.props.deployement;
        const initialValues = this.state.initialValues.deployementInstance;

        return (
            <div>
                <table id="site_preference_table">
                    <caption>{this.props.title}</caption>
                    <thead>
                        <tr>
                            {
                                locals.map((item, index, array) => {
                                    return (<th> {item} </th>)
                                })
                            }
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {
                                locals.map((item, index, array) => {

                                    if (type === 'boolean') {
                                        return (<td>
                                            <span className="initialize" onClick={this.handleInput} style={item in initialValues ? { display:'none'} : {display : 'block'}}> Initialize </span>
                                            {
                                                (item in initialValues)
                                                ?
                                                (<input className="customCheckbox" type="checkbox" name={item} onChange={this.handleInput} defaultChecked={stack[deployementName][item]}/>)
                                                :
                                                (<input className="initializedCheckbox" type="checkbox" name={item} onChange={this.handleInput} defaultChecked={stack[deployementName][item]} />)
                                            }
                                            <span className="closeInitialize" onClick={this.handleInput}> &#x2716; </span>
                                        </td>)

                                    } else if (type === 'string' || type === 'number') {
                                        return (<td>
                                            <span className="initialize" onClick={this.handleInput} style={item in initialValues ? { display:'none'} : {display : 'block'}}> Initialize </span>
                                            {
                                                (item in initialValues)
                                                ?
                                                (<input className="customInput" type="text" name={item} onChange={this.handleInput} value={stack[deployementName][item]} onKeyPress={this.validate} />)
                                                :
                                                (<input className="initializedInput" type="text" name={item} onChange={this.handleInput} value={stack[deployementName][item]} onKeyPress={this.validate} />)
                                            }
                                            <span className="closeInitialize" onClick={this.handleInput} > &#x2716; </span>
                                        </td>)

                                    }
                                })
                            }
                        </tr>
                    </tbody>
                </table>
                <div className="descriptionContainer">
                    <h5 className="preferenceDescription" onClick={this.showFullDescription}><b className="description">Description: </b><br/> {this.props.content.description}</h5>
                </div>
            </div>
        );
    }

}
