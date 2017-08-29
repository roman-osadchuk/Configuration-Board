var React = require('react');
var MainTableBody = require('./MainTableBody.jsx');
var SitePreferencesModal = require('./SitePreferencesModal.jsx');
var SitePreferencesInfoModal = require('./SitePreferencesInfoModal.jsx');
var ReviewChangesModal = require('./ReviewChangesModal.jsx');
//var preload = require('../../preloadTestData.json');

import { connect } from 'react-redux';

require('./MainTable.css');


var MainTable = React.createClass({

    getInitialState: function() {
        return {
            //preload: preload,
            isOpenSitePref: false,
            isOpenSiteInfo: false,
            isOpenReviewChanges: false,
            preferenceSite: '',
            preferenceInfo: ''
        };
    },

    handleChanges: function(){
      //this should handle changes from Review Changes
    },

    // --------------Site Preferences----------------

    toggleSitePrefModal: function() {
      this.setState({
        isOpenSitePref: !this.state.isOpenSitePref
      });
    },

    handleSitePreferencesModal: function(el){
      this.toggleSitePrefModal();

      this.setState({
        preferenceSite: el.props.note.name
      });
    },

    // ------------------- Info ---------------------

    //reminder to try event target to determine the actual clicked column

    toggleSiteInfoModal: function() {
      this.setState({
        isOpenSiteInfo: !this.state.isOpenSiteInfo
      });
    },

    handleInfoModalDevelopment: function(el){
      this.toggleSiteInfoModal();

      this.setState({
        preferenceInfo: el.props.note.development
      });
    },

    handleInfoModalStaging: function(el){
      this.toggleSiteInfoModal();

      this.setState({
        preferenceInfo: el.props.note.staging
      });
    },

    handleInfoModalProduction: function(el){
      this.toggleSiteInfoModal();

      this.setState({
        preferenceInfo: el.props.note.production
      });
    },

    // ---------------Review Changes-----------------

    toggleReviewModal: function() {
      this.setState({
        isOpenReviewChanges: !this.state.isOpenReviewChanges
      });
    },


    render: function() {
      return (
        <div id="main_container">

          <table id="main_table">
            <caption>Epam-dw-rd-lab</caption>
            <thead>
              <tr>
                <th> Title </th>
                <th> Development </th>
                <th> Staging </th>
                <th> Production </th>
              </tr>
            </thead>
            <tbody>

              {store.sitePreferences.map(item => {return (<MainTableBody
                note={item}
                key={item.id}
                SitePreferenceTitle={this.handleSitePreferencesModal}
                SitePreferenceDevelopment={this.handleInfoModalDevelopment}
                SitePreferenceStaging={this.handleInfoModalStaging}
                SitePreferenceProduction={this.handleInfoModalProduction}
              />)})}

            </tbody>
          </table>

          <SitePreferencesModal
            show={this.state.isOpenSitePref}
            onClose={this.toggleSitePrefModal}>
            {this.state.preferenceSite}
          </SitePreferencesModal>

          <SitePreferencesInfoModal
            show={this.state.isOpenSiteInfo}
            onClose={this.toggleSiteInfoModal}>
            {this.state.preferenceInfo}
          </SitePreferencesInfoModal>

          <div id="Review_changes_container">
            <button onClick={this.toggleReviewModal}>
              Review changes
            </button>

            <ReviewChangesModal show={this.state.isOpenReviewChanges}
              onClose={this.toggleReviewModal}>
              Here's some content for Review Changes modal
            </ReviewChangesModal>
          </div>

        </div>
      );
    }

});

var mapStateToProps = function(state) {
  store: state
}

module.exports = connect(mapStateToProps)(MainTable);
