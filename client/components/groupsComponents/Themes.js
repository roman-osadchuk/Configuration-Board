import React, { Component } from 'react';
import RadioButton from './RadioButton'

export default class Themes extends Component {

    constructor(props) {
        super(props);

        this.state = {
            toggleSettings: false,
            toggleThemes: false,
            checkedTheme: 'Default'
        };

        this.toggleSettings = this.toggleSettings.bind(this);
        this.toggleThemes = this.toggleThemes.bind(this);
        this.toggleRadioTheme = this.toggleRadioTheme.bind(this);
    };

    darkTheme() {

        this.setState({
            checkedTheme: 'darkTheme'
        });

        let head = document.getElementsByTagName('HEAD')[0];

        let greenPref = document.getElementById('green_pref_style');
        let pinkPref = document.getElementById('pink_pref_style');
        let yellowPref = document.getElementById('yellow_pref_style');
        let toryPref = document.getElementById('tory_pref_style');
        let defultPref = document.getElementById('default_pref_style');

        if (greenPref !== null) {
            head.removeChild(greenPref);
        } else if (pinkPref !== null) {
            head.removeChild(pinkPref);
        } else if (yellowPref !== null) {
            head.removeChild(yellowPref);
        } else if (toryPref !== null) {
            head.removeChild(toryPref);
        } else if (defultPref !== null) {
            head.removeChild(defultPref);
        }

        let darkPref = document.getElementById('dark_pref_style');

        if (darkPref === null) {

            let darkLinkPref = document.createElement('link');


            darkLinkPref.setAttribute('href', 'css/darkStyles.css');
            darkLinkPref.setAttribute('rel', 'stylesheet');
            darkLinkPref.setAttribute('id', 'dark_pref_style');

            head.appendChild(darkLinkPref);
        }
    };

    greenTheme() {

        this.setState({
            checkedTheme: 'greenTheme'
        });

        let head = document.getElementsByTagName('HEAD')[0];

        let darkPref = document.getElementById('dark_pref_style');
        let pinkPref = document.getElementById('pink_pref_style');
        let yellowPref = document.getElementById('yellow_pref_style');
        let toryPref = document.getElementById('tory_pref_style');
        let defultPref = document.getElementById('default_pref_style');

        if (darkPref !== null) {
            head.removeChild(darkPref);
        } else if (pinkPref !== null) {
            head.removeChild(pinkPref);
        } else if (yellowPref !== null) {
            head.removeChild(yellowPref);
        } else if (toryPref !== null) {
            head.removeChild(toryPref);
        } else if (defultPref !== null) {
            head.removeChild(defultPref);
        }

        let greenPref = document.getElementById('green_pref_style');

        if (greenPref === null) {

            let greenLinkPref = document.createElement('link');


            greenLinkPref.setAttribute('href', 'css/greenStyles.css');
            greenLinkPref.setAttribute('rel', 'stylesheet');
            greenLinkPref.setAttribute('id', 'green_pref_style');

            head.appendChild(greenLinkPref);
        }
    };

    pinkTheme() {

        this.setState({
            checkedTheme: 'pinkTheme'
        });

        let head = document.getElementsByTagName('HEAD')[0];

        let darkPref = document.getElementById('dark_pref_style');
        let greenPref = document.getElementById('green_pref_style');
        let yellowPref = document.getElementById('yellow_pref_style');
        let toryPref = document.getElementById('tory_pref_style');
        let defultPref = document.getElementById('default_pref_style');

        if (darkPref !== null) {
            head.removeChild(darkPref);
        } else if (greenPref !== null) {
            head.removeChild(greenPref);
        } else if (yellowPref !== null) {
            head.removeChild(yellowPref);
        } else if (toryPref !== null) {
            head.removeChild(toryPref);
        } else if (defultPref !== null) {
            head.removeChild(defultPref);
        }

        let pinkPref = document.getElementById('pink_pref_style');

        if (pinkPref === null) {

            let pinkLinkPref = document.createElement('link');

            pinkLinkPref.setAttribute('href', 'css/pinkStyles.css');
            pinkLinkPref.setAttribute('rel', 'stylesheet');
            pinkLinkPref.setAttribute('id', 'pink_pref_style');

            head.appendChild(pinkLinkPref);
        }
    };

    yellowTheme() {

        this.setState({
            checkedTheme: 'yellowTheme'
        });

        let head = document.getElementsByTagName('HEAD')[0];

        let darkPref = document.getElementById('dark_pref_style');
        let greenPref = document.getElementById('green_pref_style');
        let pinkPref = document.getElementById('pink_pref_style');
        let toryPref = document.getElementById('tory_pref_style');
        let defultPref = document.getElementById('default_pref_style');

        if (darkPref !== null) {
            head.removeChild(darkPref);
        } else if (greenPref !== null) {
            head.removeChild(greenPref);
        } else if (pinkPref !== null) {
            head.removeChild(pinkPref);
        } else if (toryPref !== null) {
            head.removeChild(toryPref);
        } else if (defultPref !== null) {
            head.removeChild(defultPref);
        }

        let yellowPref = document.getElementById('yellow_pref_style');

        if (yellowPref === null) {

            let yellowLinkPref = document.createElement('link');

            yellowLinkPref.setAttribute('href', 'css/yellowStyles.css');
            yellowLinkPref.setAttribute('rel', 'stylesheet');
            yellowLinkPref.setAttribute('id', 'yellow_pref_style');

            head.appendChild(yellowLinkPref);
        }
    };

    toryTheme() {

        this.setState({
            checkedTheme: 'toryTheme'
        });

        let head = document.getElementsByTagName('HEAD')[0];

        let darkPref = document.getElementById('dark_pref_style');
        let greenPref = document.getElementById('green_pref_style');
        let pinkPref = document.getElementById('pink_pref_style');
        let yellowPref = document.getElementById('yellow_pref_style');
        let defultPref = document.getElementById('default_pref_style');

        if (darkPref !== null) {
            head.removeChild(darkPref);
        } else if (greenPref !== null) {
            head.removeChild(greenPref);
        } else if (pinkPref !== null) {
            head.removeChild(pinkPref);
        } else if (yellowPref !== null) {
            head.removeChild(yellowPref);
        } else if (defultPref !== null) {
            head.removeChild(defultPref);
        }

        let toryPref = document.getElementById('tory_pref_style');

        if (toryPref === null) {

            let toryLinkPref = document.createElement('link');

            toryLinkPref.setAttribute('href', 'css/toryStyles.css');
            toryLinkPref.setAttribute('rel', 'stylesheet');
            toryLinkPref.setAttribute('id', 'tory_pref_style');

            head.appendChild(toryLinkPref);
        }
    };

    defaultTheme() {
        let head = document.getElementsByTagName('HEAD')[0];

        let darkPref = document.getElementById('dark_pref_style');
        let greenPref = document.getElementById('green_pref_style');
        let pinkPref = document.getElementById('pink_pref_style');
        let yellowPref = document.getElementById('yellow_pref_style');
        let toryPref = document.getElementById('tory_pref_style');

        if (darkPref !== null) {
            head.removeChild(darkPref);
        } else if (greenPref !== null) {
            head.removeChild(greenPref);
        } else if (pinkPref !== null) {
            head.removeChild(pinkPref);
        } else if (yellowPref !== null) {
            head.removeChild(yellowPref);
        } else if (toryPref !== null) {
            head.removeChild(toryPref);
        }

        let defaultPref = document.getElementById('default_pref_style');

        if (defaultPref === null) {

            let defaultLinkPref = document.createElement('link');


            defaultLinkPref.setAttribute('href', 'css/mainStyles.css');
            defaultLinkPref.setAttribute('rel', 'stylesheet');
            defaultLinkPref.setAttribute('id', 'default_pref_style');

            head.appendChild(defaultLinkPref);
        }
    };

    toggleSettings() {
        this.setState({
            toggleSettings: !this.state.toggleSettings
        });

        const el_1 = document.getElementById('settings_span');
        const el_2 = document.getElementById('theme_menu');

        if (this.state.toggleSettings) {
            el_1.classList.remove('toggle_settings');
            el_2.classList.remove('toggle_themes');

            this.setState({
                toggleThemes: false
            });
        } else {
            el_1.className = 'toggle_settings';
        }
    };

    toggleThemes() {
        this.setState({
            toggleThemes: !this.state.toggleThemes
        });

        const el = document.getElementById('theme_menu');

        if (this.state.toggleThemes) {
            el.classList.remove('toggle_themes');
        } else {
            el.className = 'toggle_themes';
        }
    };

    toggleRadioTheme(e) {
        this.setState({
            checkedTheme: e.target.value
        });
    }

    render() {
        return (
            <div id="settings_container">
                <span id="settings_span">
                    <i className="fa fa-cogs" aria-hidden="true" onClick={this.toggleSettings}></i>
                    <ul id="sub_menu">
                        <span className="sub_menu_title" onClick={this.toggleThemes}>
                            <i className="fa fa-themeisle" aria-hidden="true"></i>
                            Themes
                        </span>
                        <ul id="theme_menu">
                        <li onClick={this.darkTheme.bind(this)}> Dark Blue <RadioButton theme={"darkTheme"} isActive={this.state.checkedTheme == 'darkTheme'} toggle={this.toggleRadioTheme} /> </li>
                        <li onClick={this.greenTheme.bind(this)}> Green <RadioButton theme={"greenTheme"} isActive={this.state.checkedTheme == 'greenTheme'} toggle={this.toggleRadioTheme} /> </li>
                        <li onClick={this.pinkTheme.bind(this)}> Pink <RadioButton theme={"pinkTheme"} isActive={this.state.checkedTheme == 'pinkTheme'} toggle={this.toggleRadioTheme} /> </li>
                        <li onClick={this.yellowTheme.bind(this)}> Yellow <RadioButton theme={"yellowTheme"} isActive={this.state.checkedTheme == 'yellowTheme'} toggle={this.toggleRadioTheme} /> </li>
                        <li onClick={this.toryTheme.bind(this)}> Tory Burch <RadioButton theme={"toryTheme"} isActive={this.state.checkedTheme == 'toryTheme'} toggle={this.toggleRadioTheme} /> </li>
                        <li onClick={this.defaultTheme.bind(this)}> Light Blue <RadioButton theme={"defaultTheme"} isActive={this.state.checkedTheme == 'defaultTheme'} toggle={this.toggleRadioTheme} /> </li>
                        </ul>
                        <span className="sub_menu_title">
                            <i className="fa fa-transgender-alt" aria-hidden="true"></i>
                            Smth else
                        </span>
                   </ul>
                </span>
            </div>
        );
    }
};
