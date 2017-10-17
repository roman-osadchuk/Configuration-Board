import React, {Component} from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import * as ActionCreators from '../../actions/mainStoreActions';


class BodySitePrefModalEdit extends Component {

    constructor(props) {
        super(props);

        this.state = {
            inputsStack: this.props.content.values,
            initialValues: {development: {}, staging: {}, production: {}, allInstances: {}},
            initialData: {},
            uniqueLocations: []
        };

        this.handleInput = this.handleInput.bind(this);
        this.validate = this.validate.bind(this);
        this.showFullDescription = this.showFullDescription.bind(this);

        this.updateBodySitePrefModalEditValues = this.updateBodySitePrefModalEditValues.bind(this);


        this.handleCancel = this.handleCancel.bind(this);

    };

    //retreiving unique locations and updating income abject to make all deployements have the same properties
    componentWillMount() {

        const development = this.state.inputsStack.development;
        const staging = this.state.inputsStack.staging;
        const production = this.state.inputsStack.production;
        const allInstances = this.state.inputsStack.allInstances;
        const all_instanses = [development, staging, production];
        let temp = [];


        //collecting all properties in one array
        for (let i = 0; i < all_instanses.length; i++) {
            for (let key in all_instanses[i]) {
                temp.push(key);
            }
        };

        //filtering array to get only unique properties
        const unique = temp.filter( onlyUnique );

        function onlyUnique(value, index, array) {
            return array.indexOf(value) === index;
        };

        this.setState({
            uniqueLocations: this.state.uniqueLocations.concat(unique)
        });

        let incomeData = {development: {}, staging: {}, production: {}, allInstances: {}};

        //immutable income data (definition)
        for (let key in development) {
            incomeData['development'][key] = development[key]
        }
        for (let key in staging) {
            incomeData['staging'][key] = staging[key]
        }
        for (let key in production) {
            incomeData['production'][key] = production[key]
        }
        for (let key in allInstances) {
            incomeData['allInstances'][key] = allInstances[key]
        }

        this.setState({
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

    validate(evt) {
        var theEvent = evt || window.event;
        var key = theEvent.keyCode || theEvent.which;
        var type = this.props.content.type;

        if (type === 'number') {
            key = String.fromCharCode(key);
            if( !(/[0-9]|\./.test(key)))  {
                theEvent.preventDefault();
            }
        }
    }

    handleInput(event) {

        //initial values
        const dev = this.state.initialValues.development;
        const stag = this.state.initialValues.staging;
        const prod = this.state.initialValues.production;
        const allInstances = this.props.content.values.allInstances;
        const type = this.props.content.type;

        let defaultValue;
        if ( this.props.content.defaultValue === undefined ) {
            if ( type === 'boolean' ) {
                defaultValue = false;
            } else if ( type === 'string' ) {
                defaultValue = '';
            } else {
                defaultValue = 0;
            }
        } else {
            defaultValue = this.props.content.defaultValue;
        }


        //modified values
        const development = this.state.inputsStack.development;
        const staging = this.state.inputsStack.staging;
        const production = this.state.inputsStack.production;

        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        const field = event.target.closest('td');
        const deployement = event.target.closest('td').closest('tr').childNodes[0].innerHTML.trim();


        if (target.className === 'closeInitialize') {

            field.childNodes[0].style.display = 'block';
            field.childNodes[1].style.display = 'none';
            field.childNodes[2].style.display = 'none';

            const nameOnClose = event.target.closest('td').childNodes[1].name;

            if ( deployement === 'Development' ) {
                delete  development[nameOnClose];
            } else if ( deployement === 'Staging' ) {
                delete  staging[nameOnClose];
            } else if ( deployement === 'Production' ) {
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

            if ( deployement === 'Development' ) {
                development[nameOnInitialize] = defaultValue;
            } else if ( deployement === 'Staging' ) {
                staging[nameOnInitialize] = defaultValue;
            } else if ( deployement === 'Production' ) {
                production[nameOnInitialize] = defaultValue;
            }

            this.setState({
                inputsStack: { development, staging, production, allInstances }
            });


        } else {

            //updating value(state) depending on input's changes
            if ( deployement === 'Development' ) {

                if (name in dev) {
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

            } else if ( deployement === 'Staging' ) {

                if (name in stag) {
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

            } else if ( deployement === 'Production' ) {

                if (name in prod) {
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
            const errorMsg = document.getElementById('error_validation_msg_pref');

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


    updateBodySitePrefModalEditValues() {

        const newValues = this.state.inputsStack;
        const reduxArray = this.props.store.sitePreferences;

        const index = reduxArray.findIndex(item =>
            item.name == this.state.preferenceSite
        );

        const { dispatch, store } = this.props;
        const action = ActionCreators.updateBodyPref(newValues, index);
        dispatch(action);

        axios.patch('/data/definition', store);
    };

    handleCancel() {
        //initial
        const dev = this.state.initialValues.development;
        const stag = this.state.initialValues.staging;
        const prod = this.state.initialValues.production;
        const allInstances = this.props.content.values.allInstances;

        //modified
        const development = this.state.inputsStack.development;
        const staging = this.state.inputsStack.staging;
        const production = this.state.inputsStack.production;


        for (let key in development) {
            if (key in dev) {
                continue
            } else {
                delete development[key];
            }
        }

        for (let key in staging) {
            if (key in stag) {
                continue
            } else {
                delete staging[key];
            }
        }

        for (let key in production) {
            if (key in prod) {
                continue
            } else {
                delete production[key];
            }
        }

        this.setState({
            inputsStack: { development, staging, production, allInstances }
        })

    }



    render() {

        const type = this.props.content.type;
        let defaultValue;
        if ( this.props.content.defaultValue === undefined ) {
            if ( type === 'boolean' ) {
                defaultValue = false;
            } else if ( type === 'string' ) {
                defaultValue = '';
            } else {
                defaultValue = 0;
            }
        } else {
            defaultValue = this.props.content.defaultValue;
        }

        const locals = this.state.uniqueLocations;
        //modified parameters
        const stack = this.state.inputsStack;

        //income parameters
        const dev = this.state.initialValues.development;
        const stag = this.state.initialValues.staging;
        const prod = this.state.initialValues.production;

        return (
            <div>
                <table id="site_preference_table">
                    <caption>{this.props.title}</caption>
                    <thead>
                        <tr>
                            <th>  </th>
                            {
                                locals.map((item, index, array) => {
                                    return (<th> {item} </th>)
                                })
                            }
                        </tr>
                    </thead>
                    <tbody>

                        <tr>
                            <td> Development </td>
                            {
                                locals.map((item, index, array) => {

                                    if (type === 'boolean') {
                                        return (<td>
                                            <span className="initialize" onClick={this.handleInput} style={item in dev ? { display:'none'} : {display : 'block'}}> Initialize </span>
                                            {
                                                (item in dev)
                                                ?
                                                (<input className="customCheckbox" type="checkbox" name={item} onChange={this.handleInput} defaultChecked={stack.development[item]}/>)
                                                :
                                                (<input className="initializedCheckbox" type="checkbox" name={item} onChange={this.handleInput} defaultChecked={stack.development[item]} />)
                                            }
                                            <span className="closeInitialize" onClick={this.handleInput}> &#x2716; </span>
                                        </td>)

                                    } else if (type === 'string' || type === 'number') {
                                        return (<td>
                                            <span className="initialize" onClick={this.handleInput} style={item in dev ? { display:'none'} : {display : 'block'}}> Initialize </span>
                                            {
                                                (item in dev)
                                                ?
                                                (<input className="customInput" type="text" name={item} onChange={this.handleInput} value={stack.development[item]} onKeyPress={this.validate} />)
                                                :
                                                (<input className="initializedInput" type="text" name={item} onChange={this.handleInput} value={stack.development[item]} onKeyPress={this.validate} />)
                                            }
                                            <span className="closeInitialize" onClick={this.handleInput} > &#x2716; </span>
                                        </td>)

                                    }
                                })
                            }
                        </tr>

                        <tr>
                            <td> Staging </td>
                            {
                                locals.map((item, index, array) => {

                                    if (type === 'boolean') {
                                        return (<td>
                                            <span className="initialize" onClick={this.handleInput} style={item in stag ? { display:'none'} : {display : 'block'}}> Initialize </span>
                                            {
                                                (item in stag)
                                                ?
                                                (<input className="customCheckbox" type="checkbox" name={item} onChange={this.handleInput} defaultChecked={stack.staging[item]} />)
                                                :
                                                (<input className="initializedCheckbox" type="checkbox" name={item} onChange={this.handleInput} defaultChecked={stack.staging[item]} />)
                                            }
                                            <span className="closeInitialize" onClick={this.handleInput}> &#x2716; </span>
                                        </td>)

                                    } else if (type === 'string' || type === 'number') {
                                        return (<td>
                                            <span className="initialize" onClick={this.handleInput} style={item in stag ? { display:'none'} : {display : 'block'}}> Initialize </span>
                                            {
                                                (item in stag)
                                                ?
                                                (<input className="customInput" type="text" name={item} onChange={this.handleInput} value={stack.staging[item]} onKeyPress={this.validate} />)
                                                :
                                                (<input className="initializedInput" type="text" name={item} onChange={this.handleInput} value={stack.staging[item]} onKeyPress={this.validate} />)
                                            }
                                            <span className="closeInitialize" onClick={this.handleInput}> &#x2716; </span>
                                        </td>)

                                    }

                                })
                            }
                        </tr>

                        <tr>
                            <td> Production </td>
                            {
                                locals.map((item, index, array) => {

                                    if (type === 'boolean') {
                                        return (<td>
                                            <span className="initialize" onClick={this.handleInput} style={item in prod ? { display:'none'} : {display : 'block'}}> Initialize </span>
                                            {
                                                (item in prod)
                                                ?
                                                (<input className="customCheckbox" type="checkbox" name={item} onChange={this.handleInput} defaultChecked={stack.production[item]} />)
                                                :
                                                (<input className="initializedCheckbox" type="checkbox" name={item} onChange={this.handleInput} defaultChecked={stack.production[item]} />)
                                            }
                                            <span className="closeInitialize" onClick={this.handleInput}> &#x2716; </span>
                                        </td>)

                                    } else if (type === 'string' || type === 'number') {
                                        return (<td>
                                            <span className="initialize" onClick={this.handleInput} style={item in prod ? { display:'none'} : {display : 'block'}}> Initialize </span>
                                            {
                                                (item in prod)
                                                ?
                                                (<input className="customInput" type="text" name={item} onChange={this.handleInput} value={stack.production[item]} onKeyPress={this.validate} />)
                                                :
                                                (<input className="initializedInput" type="text" name={item} onChange={this.handleInput} value={stack.production[item]} onKeyPress={this.validate} />)
                                            }
                                            <span className="closeInitialize" onClick={this.handleInput}> &#x2716; </span>
                                        </td>)

                                    }

                                })
                            }
                        </tr>

                    </tbody>
                </table>
                <p id="error_validation_msg_pref"> </p>
                <div className="descriptionContainer">
                    <h5 className="preferenceDescription" onClick={this.showFullDescription}><b className="description">Description: </b><br/> {this.props.content.description}</h5>
                </div>
                <div className='div-for-edit-button'>
                    <button onClick={this.props.onClick} onMouseDown={this.updateBodySitePrefModalEditValues}>Save</button>
                    <button onClick={this.props.close} onMouseDown={this.handleCancel}>Cancel</button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        store: state.mainStore
    };
}

export default connect(mapStateToProps)(BodySitePrefModalEdit);
