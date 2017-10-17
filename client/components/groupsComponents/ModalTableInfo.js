import React, {Component} from 'react'


export default class ModalTableInfo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            deployementInfo: {},
            uniqueLocations: []
        };

        this.showFullDescription = this.showFullDescription.bind(this);
    };


    componentWillMount() {

        const deployementName = this.props.deployement;
        const property_dev = this.props.content.values.development;
        const property_stag = this.props.content.values.staging;
        const property_prod = this.props.content.values.production;
        const all_instanses = [property_dev, property_stag, property_prod];

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

        //defining the deployementVariable according to deployementName
        let depVar = {};

        if ( deployementName === 'development' ) {
            depVar = property_dev;
        } else if ( deployementName === 'staging' ) {
            depVar = property_stag;
        } else if ( deployementName === 'production' ) {
            depVar = property_prod;
        }

        this.setState({
            deployementInfo: depVar
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

        const locals = this.state.uniqueLocations;
        const type = this.props.content.type;
        const deployementInfo = this.state.deployementInfo;

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
                                    if (typeof deployementInfo[item] === 'boolean') {
                                        return (<td> {deployementInfo[item].toString()} </td>)
                                    } else if (deployementInfo.hasOwnProperty(item)) {
                                        return (<td> {deployementInfo[item]} </td>)
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
