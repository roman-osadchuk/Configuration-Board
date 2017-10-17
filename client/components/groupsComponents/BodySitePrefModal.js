import React, {Component} from 'react';


export default class BodySitePrefModal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            uniqueLocations: []
        };

        this.showFullDescription = this.showFullDescription.bind(this);
    };


    componentWillMount() {

        const property_dev = this.props.content.values.development;
        const property_stag = this.props.content.values.staging;
        const property_prod = this.props.content.values.production;
        const all_instanses = [property_dev, property_stag, property_prod];
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


    showFullDescription() {
        const desc = document.getElementsByClassName('preferenceDescription');
        desc[0].className = "full_description";
    }


    render() {

        const development = this.props.content.values.development;
        const staging = this.props.content.values.staging;
        const production = this.props.content.values.production;
        const locals = this.state.uniqueLocations;

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
                                    if (typeof development[item] === 'boolean') {
                                        return (<td> {development[item].toString()} </td>)
                                    } else if (development.hasOwnProperty(item)) {
                                        return (<td> {development[item]} </td>)
                                    } else {
                                        return (<td> <i className="not_initialized"> not initialized </i> </td>)
                                    }
                                })
                            }
                        </tr>
                        <tr>
                            <td> Staging </td>
                            {
                                locals.map((item, index, array) => {
                                    if (typeof staging[item] === 'boolean') {
                                        return (<td> {staging[item].toString()} </td>)
                                    } else if (staging.hasOwnProperty(item)) {
                                        return (<td> {staging[item]} </td>)
                                    } else {
                                        return (<td> <i className="not_initialized"> not initialized </i> </td>)
                                    }
                                })
                            }
                        </tr>
                        <tr>
                            <td> Production </td>
                            {
                                locals.map((item, index, array) => {
                                    if (typeof production[item] === 'boolean') {
                                        return (<td> {production[item].toString()} </td>)
                                    } else if (production.hasOwnProperty(item)) {
                                        return (<td> {production[item]} </td>)
                                    } else {
                                        return (<td> <i className="not_initialized"> not initialized </i> </td>)
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
