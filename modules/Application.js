/**
* Configuration Board application module
*
* Version 0.1
*/

/* API Includes */
// var module = require(...);
var xml2js = require('xml2js');
var fs = require('fs');
var js2xmlparser = require("js2xmlparser");
var unzip = require('unzip');
var archiver = require('archiver');
var mv = require('mv');

/* Script Modules */
var Config = require('../Config.js');

/* Classes */
var SitePreference = require('../classes/SitePreference.js');
var SitePreferenceDefinition = require('../classes/SitePreferenceDefinition.js');
var SitePreferences = require('../classes/SitePreferences.js');

// var sitePreferenceDefinitionMocks = (function() {
//     var definitions = {};
//
//     var definition = new SitePreferenceDefinition();
//     definition.id = 'googleMapsAPIKey';
//     definition.name = 'Google Maps API Key';
//     definition.description = 'As from 22 June 2016, all calls to the Google Maps API require an API key. In the past, Google Maps API allowed you to make calls to the API without an API key – this has changed. Please note that this does not necessarily mean that you will have to pay more as you are still allowed up to 25 000 map requests per day for free – the only difference now is that it is mandatory to have an API key when the request is made. Should you require more than 25 000 requests per day, you will be responsible for extra charges. However, for 99.9% of our customers, this will not be necessary.';
//     definition.type = 'string';
//     definition.minLength = 86;
//     definition.maxLength = 86;
//     definition.fieldLength = 90;
//     definition.groupId = 'Google Maps Settings';
//
//     definitions[ definition.id ] = definition;
//
//     definition = new SitePreferenceDefinition();
//     definition.id = 'googleMapsZoom';
//     definition.name = 'Google Maps Default Zoom';
//     definition.description = 'The initial resolution at which to display the map is set by the zoom property, where zoom 0 corresponds to a map of the Earth fully zoomed out, and larger zoom levels zoom in at a higher resolution. Specify zoom level as an integer.';
//     definition.type = 'number';
//     definition.minValue = 0;
//     definition.maxValue = 20;
//     definition.defaultValue = 8;
//     definition.fieldLength = 2;
//     definition.groupId = 'Google Maps Settings';
//
//     definitions[ definition.id ] = definition;
//
//     definition = new SitePreferenceDefinition();
//     definition.id = 'googleMapsCenter';
//     definition.name = 'Google Maps Center Coordinates';
//     definition.description = 'JSON is required, example: {lat: -34.397, lng: 150.644}';
//     definition.type = 'string';
//     definition.minLength = 12;
//     definition.fieldLength = 30;
//     definition.regexp = '{\s*lat:\s*\-?[0-9]*\.?[0-9]*,\s*lng:\s*\-?[0-9]*\.?[0-9]*\s*}';
//     definition.groupId = 'Settings';
//
//     definitions[ definition.id ] = definition;
//
//     return definitions;
// })();
//
// var sitePreferencesMocks = (function () {
//     var sitePreferences = {};
//
//     // Site #1
//     var preferences = new SitePreferences();
//     preferences.siteId = 'Adidas_US';
//
//     //All instances
//     preferences.custom.all_instances = {};
//
//     preferences.custom.all_instances['googleMapsAPIKey'] = (function() {
//         var preference = new SitePreference(sitePreferenceDefinitionMocks);
//         preference.id = 'googleMapsAPIKey';
//         preference.value = 'ADSdsgf12p14gfdsg9wqht90hqgsanv0-wr-fisadfldsgKHJHGasf899-daffFFAMNSFr9827502hfijoaj9g';
//
//         return preference;
//     })();
//
//     preferences.custom.all_instances['googleMapsZoom'] = (function() {
//         var preference = new SitePreference(sitePreferenceDefinitionMocks);
//         preference.id = 'googleMapsZoom';
//         preference.value = 10;
//
//         return preference;
//     })();
//
//     preferences.custom.all_instances['googleMapsCenter'] = (function() {
//         var preference = new SitePreference(sitePreferenceDefinitionMocks);
//         preference.id = 'googleMapsCenter';
//         preference.value = '{lat: -34.397, lng: 150.644}';
//
//         return preference;
//     })();
//
//     // Development
//     preferences.custom.development = {};
//
//     preferences.custom.development['googleMapsAPIKey'] = (function() {
//         var preference = new SitePreference(sitePreferenceDefinitionMocks);
//         preference.id = 'googleMapsAPIKey';
//         preference.value = 'ADSdsgf12p14gfdsg9wqht90hqgsanv0-wr-fisadfldsgKHJHGasf899-daffFFAMNSFr9827502hfijoaj9g';
//
//         return preference;
//     })();
//
//     preferences.custom.development['googleMapsZoom'] = (function() {
//         var preference = new SitePreference(sitePreferenceDefinitionMocks);
//         preference.id = 'googleMapsZoom';
//         preference.value = 10;
//
//         return preference;
//     })();
//
//     preferences.custom.development['googleMapsCenter'] = (function() {
//         var preference = new SitePreference(sitePreferenceDefinitionMocks);
//         preference.id = 'googleMapsCenter';
//         preference.value = '{lat: -34.397, lng: 150.644}';
//
//         return preference;
//     })();
//
//     // Staging
//     preferences.custom.staging = {};
//
//     preferences.custom.staging['googleMapsAPIKey'] = (function() {
//         var preference = new SitePreference(sitePreferenceDefinitionMocks);
//         preference.id = 'googleMapsAPIKey';
//         preference.value = 'HPSdsgf12p14gfdsg9wqht90hqgsanv0-wr-UIIIdfldsgKHJHGasf899-daffFFAMNSFr9827502hfijoaj9g';
//
//         return preference;
//     })();
//
//     preferences.custom.staging['googleMapsZoom'] = (function() {
//         var preference = new SitePreference(sitePreferenceDefinitionMocks);
//         preference.id = 'googleMapsZoom';
//         preference.value = 6;
//
//         return preference;
//     })();
//
//     preferences.custom.staging['googleMapsCenter'] = (function() {
//         var preference = new SitePreference(sitePreferenceDefinitionMocks);
//         preference.id = 'googleMapsCenter';
//         preference.value = '{lat: -4.397, lng: 250.644}';
//
//         return preference;
//     })();
//
//     // Production
//     preferences.custom.production = {};
//
//     preferences.custom.production['googleMapsAPIKey'] = (function() {
//         var preference = new SitePreference(sitePreferenceDefinitionMocks);
//         preference.id = 'googleMapsAPIKey';
//         preference.value = 'ofSdsgf45p14gfdsg9wqht90hqgsanv0-wr-fisadfldsgKHJHGasf899-daffFFAM9SFr9827502hfijoaj9g';
//
//         return preference;
//     })();
//
//     preferences.custom.production['googleMapsZoom'] = (function() {
//         var preference = new SitePreference(sitePreferenceDefinitionMocks);
//         preference.id = 'googleMapsZoom';
//         preference.value = 12;
//
//         return preference;
//     })();
//
//     preferences.custom.production['googleMapsCenter'] = (function() {
//         var preference = new SitePreference(sitePreferenceDefinitionMocks);
//         preference.id = 'googleMapsCenter';
//         preference.value = '{lat: -23.397, lng: 50.644}';
//
//         return preference;
//     })();
//
//     sitePreferences[ preferences.siteId ] = preferences;
//
//
//     // Site #2
//     preferences = new SitePreferences();
//     preferences.siteId = 'Adidas_DE';
//
//     // All instances
//     preferences.custom.all_instances = {};
//     preferences.custom.all_instances['googleMapsAPIKey'] = (function() {
//         var preference = new SitePreference(sitePreferenceDefinitionMocks);
//         preference.id = 'googleMapsAPIKey';
//         preference.value = 'LPSdsgf12p14gfdsg9wqht90hqgsanv0-wr-fisadfldsgKHJHGasf899-daffFFAMNSFr9827502hfijoaj9g';
//
//         return preference;
//     })();
//
//     preferences.custom.all_instances['googleMapsZoom'] = (function() {
//         var preference = new SitePreference(sitePreferenceDefinitionMocks);
//         preference.id = 'googleMapsZoom';
//         preference.value = 10;
//
//         return preference;
//     })();
//
//     preferences.custom.all_instances['googleMapsCenter'] = (function() {
//         var preference = new SitePreference(sitePreferenceDefinitionMocks);
//         preference.id = 'googleMapsCenter';
//         preference.value = '{lat: -34.397, lng: 150.644}';
//
//         return preference;
//     })();
//
//     // Development
//     preferences.custom.development = {};
//     preferences.custom.development['googleMapsAPIKey'] = (function() {
//         var preference = new SitePreference(sitePreferenceDefinitionMocks);
//         preference.id = 'googleMapsAPIKey';
//         preference.value = 'GBSdsgf12p14gfdsg9wqht90hqgsanv0-wr-fisadfldsgKHJHGasf899-daffFFAMNSFr9827502hfijoaj9g';
//
//         return preference;
//     })();
//
//     preferences.custom.development['googleMapsZoom'] = (function() {
//         var preference = new SitePreference(sitePreferenceDefinitionMocks);
//         preference.id = 'googleMapsZoom';
//         preference.value = 8;
//
//         return preference;
//     })();
//
//     preferences.custom.development['googleMapsCenter'] = (function() {
//         var preference = new SitePreference(sitePreferenceDefinitionMocks);
//         preference.id = 'googleMapsCenter';
//         preference.value = '{lat: -34.397, lng: 150.644}';
//
//         return preference;
//     })();
//
//     // Staging
//     preferences.custom.staging = {};
//     preferences.custom.staging['googleMapsAPIKey'] = (function() {
//         var preference = new SitePreference(sitePreferenceDefinitionMocks);
//         preference.id = 'googleMapsAPIKey';
//         preference.value = 'PPSdsgf12p14gfdsg9wqht90hqgsanv0-wr-UIIIdfldsgKHJHGasf899-daffFFAMNSFr9827502hfijoaj9g';
//
//         return preference;
//     })();
//
//     preferences.custom.staging['googleMapsZoom'] = (function() {
//         var preference = new SitePreference(sitePreferenceDefinitionMocks);
//         preference.id = 'googleMapsZoom';
//         preference.value = 8;
//
//         return preference;
//     })();
//
//     preferences.custom.staging['googleMapsCenter'] = (function() {
//         var preference = new SitePreference(sitePreferenceDefinitionMocks);
//         preference.id = 'googleMapsCenter';
//         preference.value = '{lat: -4.397, lng: 250.644}';
//
//         return preference;
//     })();
//
//     // Production
//     preferences.custom.production = {};
//     preferences.custom.production['googleMapsAPIKey'] = (function() {
//         var preference = new SitePreference(sitePreferenceDefinitionMocks);
//         preference.id = 'googleMapsAPIKey';
//         preference.value = 'oMSdsgf45p14gfdsg9wqht90hqgsanv0-wr-fisadfldsgKHJHGasf899-daffFFAM9SFr9827502hfijoaj9g';
//
//         return preference;
//     })();
//
//     preferences.custom.production['googleMapsZoom'] = (function() {
//         var preference = new SitePreference(sitePreferenceDefinitionMocks);
//         preference.id = 'googleMapsZoom';
//         preference.value = 8;
//
//         return preference;
//     })();
//
//     preferences.custom.production['googleMapsCenter'] = (function() {
//         var preference = new SitePreference(sitePreferenceDefinitionMocks);
//         preference.id = 'googleMapsCenter';
//         preference.value = '{lat: -23.397, lng: 50.644}';
//
//         return preference;
//     })();
//
//     sitePreferences[ preferences.siteId ] = preferences;
//
//     return sitePreferences;
// })();


function setDateInConfig() {

    // For corect date format
    Number.prototype.padLeft = function(base, chr) {
        var len = (String(base || 10).length - String(this).length) + 1;

        return len > 0 ? new Array(len).join(chr || '0') + this : this;
    }

    var d = new Date;
    var dformat = [(d.getMonth() + 1).padLeft(), d.getDate().padLeft(), d.getFullYear()].join('_') + ' ' + [d.getHours().padLeft(), d.getMinutes().padLeft(), d.getSeconds().padLeft()].join('.');

    Config.latestChanges = dformat;
}


function createJSONforFrontEnd(callback) {

    var arrayOfFolderSoureContent = fs.readdirSync(Config.dataDir + '/source');
    if (arrayOfFolderSoureContent.indexOf('Demandware_SitePreferences.zip') !== -1) {
        // For corect date format
        setDateInConfig();
        // Unzipping
        fs.createReadStream(Config.dataDir + '/source/Demandware_SitePreferences.zip').pipe(unzip.Extract({ path: Config.dataDir +  '/working/' + Config.latestChanges})).on('close', function() {

            readSitePreferenceDefinition(Config.dataDir + '/source' + '/Demandware_SitePreferences_Definitions.xml', function(definitions, groups) {
                readSitePreferences(definitions, function(sitePref) {
                    // Get JSON for front-end
                    callback(getSitePreferences(sitePref, groups));

                    fs.mkdirSync(Config.dataDir + '/archives/' + Config.latestChanges);
                    mv(Config.dataDir + '/source/Demandware_SitePreferences.zip', Config.dataDir + '/archives/' + Config.latestChanges + '/Demandware_SitePreferences.zip', function(err) {
                        if (err) {
                            console.log(err);
                        }
                    });
                });
            });
        });
    } else {
        readSitePreferenceDefinition(Config.dataDir + '/source' + '/Demandware_SitePreferences_Definitions.xml', function(definitions, groups){
            readSitePreferences(definitions, function(sitePref) {
                // Get JSON for front-end
                callback(getSitePreferences(sitePref, groups));
            });
        });
    }
}


function zipFiles() {

    // Create a file to stream archive data to
    fs.mkdirSync(Config.dataDir + '/result/' + Config.latestChanges);

    var output = fs.createWriteStream(Config.dataDir + '/result/' + Config.latestChanges + '/Demandware_SitePreferences.zip');
    var archive = archiver('zip');

    // Listen for all archive data to be written
    output.on('close', function() {
        console.log(archive.pointer() + ' total bytes');
        console.log('archiver has been finalized and the output file descriptor has closed.');
    });

    // good practice to catch this error explicitly
    archive.on('error', function(err) {
        throw err;
    });

    // Pipe archive data to the file
    archive.pipe(output);
    archive.directory(Config.dataDir + '/working/' + Config.latestChanges + '/Demandware SitePreferences', false);
    archive.finalize();
}

/* Mode */
var debug = false;

function getSitePreferences(definitions, groups) {

    var frontEndObj = {};
    var JsonForFrontEnd = {};

    var dataSource = debug ? sitePreferencesMocks : definitions;

   // Sites (folders)
    for (var site in dataSource) {
        // Standart or Custom
        for (var standOrCustom in dataSource[site]) {
            // All, development, staging, production
            if (standOrCustom == 'siteId') {
                continue;
            }
            for (var enviroment in dataSource[site][standOrCustom]) {
                // Preferences
                for (var enviromentPrefId in dataSource[site][standOrCustom][enviroment]) {
                    // If such object exist in frontEndObj, only add 'site: value' to current enviroment
                    if (Object.keys(frontEndObj).find((name) => {return name == enviromentPrefId}) == enviromentPrefId) {
                        frontEndObj[enviromentPrefId].values[enviroment][site] = dataSource[site][standOrCustom][enviroment][enviromentPrefId].value;  // Add 'site: value' to current enviroment
                    } else {
                        // Else copy whole preference to frontEndObj as property
                        frontEndObj[enviromentPrefId] = {};

                        for (var prop in dataSource[site][standOrCustom][enviroment][enviromentPrefId]) {
                            if (prop !== 'value')
                                frontEndObj[enviromentPrefId][prop] = dataSource[site][standOrCustom][enviroment][enviromentPrefId][prop];
                        }
                        if (typeof frontEndObj[enviromentPrefId].values === 'undefined') {
                            frontEndObj[enviromentPrefId].values = {};
                            frontEndObj[enviromentPrefId].values.development = {};
                            frontEndObj[enviromentPrefId].values.staging = {};
                            frontEndObj[enviromentPrefId].values.production = {};
                            frontEndObj[enviromentPrefId].values.all_instances = {};
                        }
                        frontEndObj[enviromentPrefId].values[enviroment][site] = dataSource[site][standOrCustom][enviroment][enviromentPrefId].value; // Add 'site: value' to current enviroment
                    }
                }
            }
        }
    }

    JsonForFrontEnd['preferenceGroups'] = groups;
    JsonForFrontEnd['sitePreferences'] =  Object.values(frontEndObj);

    // fs.writeFile(Config.dataDir + '/frontEndJSON.json', JSON.stringify(JsonForFrontEnd, null, 4), 'utf8', function(err) {
    //     if (err) {
    //         console.log(err);
    //     }
    //     console.log('The file has been saved!');
    // });

    return JSON.stringify(JsonForFrontEnd, null, 4);
}


function readSitePreferenceDefinition(XMLName, callback) {
    
        var definitions = {};
        var groups = [];
    
        fs.readFile(XMLName, function(err, data) {
    
            var parser = new xml2js.Parser();
            parser.parseString(data, function (err, result) {
    
                var standardOrCustom;
                var parent = result['metadata']['type-extension'][0];
    
                for (var j in parent) {
                    if (j === 'custom-attribute-definitions') {
                        standardOrCustom = 'custom-attribute-definitions';
                    } else if (j === 'standard-attribute-definitions') {
                        standardOrCustom = 'standard-attribute-definitions';
                    } else {
                        continue;
                    }
    
                    for (var i = 0; i < parent[standardOrCustom][0]['attribute-definition'].length; i++) {
    
                        var definitionId = parent[standardOrCustom][0]['attribute-definition'][i]['$']['attribute-id'];
                        var definition = (typeof definitions[definitionId] !== 'undefined') ? definitions[definitionId]: new SitePreferenceDefinition();
    
                        // Create new sitePreferenceDefinition
                        definition.id = definitionId;
    
                        if ((typeof (parent[standardOrCustom][0]['attribute-definition'][i]['display-name']) !== 'undefined') /* && ((typeof parent[standardOrCustom][0]['attribute-definition'][i]['display-name'][0]['_']) === 'string') */) {
                            definition.name = parent[standardOrCustom][0]['attribute-definition'][i]['display-name'][0]['_'];
                        } 
    
                        if ((typeof(parent[standardOrCustom][0]['attribute-definition'][i]['description']) !== 'undefined')  /* && ((typeof parent[standardOrCustom][0]['attribute-definition'][i]['description'][0]['_']) === 'string') */) {
                            definition.description = parent[standardOrCustom][0]['attribute-definition'][i]['description'][0]['_'];
                        }
                        
                        if (typeof(parent[standardOrCustom][0]['attribute-definition'][i]['type']) !== 'undefined') {
                            definition.type = parent[standardOrCustom][0]['attribute-definition'][i]['type'][0];
                        }
    
                        if ((typeof(parent[standardOrCustom][0]['attribute-definition'][i]['min-length'])) !== 'undefined' /* && (typeof(+parent[standardOrCustom][0]['attribute-definition'][i]['min-length']) === 'number') */) {
                            definition.minLength = parent[standardOrCustom][0]['attribute-definition'][i]['min-length'][0];
                        } 

                        if ((typeof(parent[standardOrCustom][0]['attribute-definition'][i]['max-length'])) !== 'undefined' /* && (typeof(+parent[standardOrCustom][0]['attribute-definition'][i]['max-length'][0]) === 'number') */) {
                            definition.maxLength = parent[standardOrCustom][0]['attribute-definition'][i]['max-length'][0];
                        } 	
                            
                        if ((typeof(parent[standardOrCustom][0]['attribute-definition'][i]['min-value'])) !== 'undefined' /* && (typeof(+parent[standardOrCustom][0]['attribute-definition'][i]['min-value'][0]) === 'number') */){
                            definition.minValue = parent[standardOrCustom][0]['attribute-definition'][i]['min-value'][0];
                        }

                        if ((typeof(parent[standardOrCustom][0]['attribute-definition'][i]['max-value'])) !== 'undefined' /* && (typeof(+parent[standardOrCustom][0]['attribute-definition'][i]['max-value'][0]) === 'number') */ ){
                            definition.maxValue = parent[standardOrCustom][0]['attribute-definition'][i]['max-value'][0];
                        }
                        
                        if ((typeof(parent[standardOrCustom][0]['attribute-definition'][i]['mandatory-flag']) !== 'undefined') /* && (typeof(parent[standardOrCustom][0]['attribute-definition'][i]['mandatory-flag'][0]) === 'boolean') */) {
                            definition.mandatory = parent[standardOrCustom][0]['attribute-definition'][i]['mandatory-flag'][0];
                        } 
    
                        if ((typeof(parent[standardOrCustom][0]['attribute-definition'][i]['field-length'])) !== 'undefined' /* && (typeof(+parent[standardOrCustom][0]['attribute-definition'][i]['field-length']) === 'number') */)  {
                            definition.fieldLength = parent[standardOrCustom][0]['attribute-definition'][i]['field-length'][0];
                        }
    
                        if ((typeof(parent[standardOrCustom][0]['attribute-definition'][i]['default-value']) !== 'undefined') /* && (typeof(parent[standardOrCustom][0]['attribute-definition'][i]['default-value'][0]) == definition.type) */) {
                            definition.defaultValue = parent[standardOrCustom][0]['attribute-definition'][i]['default-value'][0];
                        } 
                        
                        if ((typeof(parent[standardOrCustom][0]['attribute-definition'][i]['regexp']) !== 'undefined') /* && (typeof( parent[standardOrCustom][0]['attribute-definition'][i]['regexp'][0]) === 'string') */) {
                            definition.regexp = parent[standardOrCustom][0]['attribute-definition'][i]['regexp'][0];
                        } 
    
                        definition.custom = standardOrCustom == 'custom-attribute-definitions' ? true : false;
                        definition.standart = !definition.custom;
    
                        definitions[definitionId] = definition;
                    }
                }
    
                // Parse Groups
                for (var i = 0; i < parent['group-definitions'][0]['attribute-group'].length; i++) {
    
                    var group = {};
                    group.preferences = [];
                    group.id = parent['group-definitions'][0]['attribute-group'][i]['$']['group-id'];
    
                    if ((typeof(parent['group-definitions'][0]['attribute-group'][i]['display-name']) !== 'undefined') && (typeof(parent['group-definitions'][0]['attribute-group'][i]['display-name'][0]['_']) === 'string')) {
                        group.name = parent['group-definitions'][0]['attribute-group'][i]['display-name'][0]['_'];
                    }
    
                    // If group has child 'attribute'
                    if (typeof parent['group-definitions'][0]['attribute-group'][i]['attribute'] !== 'undefined') {
                        for (var pref = 0; pref < parent['group-definitions'][0]['attribute-group'][i]['attribute'].length; pref++) {
                            group.preferences.push(parent['group-definitions'][0]['attribute-group'][i]['attribute'][pref]['$']['attribute-id']);
                        }
                    }
    
                    // Add group to groups array
                    groups.push(group);
                }
    
                // Set groupId to each sitePrefDef
                for (var key in definitions) {
                    for (var group in groups) {
                        if (groups[group].preferences.find((el) => {return el == key}) !== undefined) {
                            definitions[key].groupId = groups[group].id;
                            break;
                        }
                    }
                }
        });
        callback(definitions, groups);
    });
}


function readSitePreferences(definitions, fn) {

    var sitePreferences = {};
    var counter = 0;
    fs.readdir(Config.dataDir + '/working/' + Config.latestChanges + '/Demandware SitePreferences/sites', function (err, list) {
       
        // Get every folder(site)
        list.forEach(function (folder) {
            
            var preferences = new SitePreferences(definitions);
            preferences.siteId = folder;

            // Read preferences for current folder
            fs.readFile(Config.dataDir + '/working/' + Config.latestChanges + '/Demandware SitePreferences/sites/' + folder + '/' + 'preferences.xml', function(err, data) {
                
                var parser = new xml2js.Parser();
                parser.parseString(data, function (err, result) {
                    
                    var root = result['preferences'];
                    var standardOrCustom;
                    var instance;

                    for (var key in root) {
                        switch (key) {
                            case '$':
                                continue;
                            case 'standard-preferences':
                                standardOrCustom = 'standard';
                                break;
                            case 'custom-preferences':
                                standardOrCustom = 'custom';
                                break;
                        }

                        for (var inst in root[key][0]) {
                            if  (inst == 'all-instances') {
                                instance = 'all_instances';
                            } else {
                                instance = inst;
                            }

                            // Check in dev, stag, prod or all are not empty
                            if (root[key][0][inst][0] !== '') {
                                for (var pref = 0; pref < root[key][0][inst][0]['preference'].length; pref++) {
                                    var preferenceId = root[key][0][inst][0]['preference'][pref]['$']['preference-id'];
                                    preferences[standardOrCustom][instance][preferenceId] = new SitePreference(definitions);
                                    preferences[standardOrCustom][instance][preferenceId].id = preferenceId;
                                    preferences[standardOrCustom][instance][preferenceId].value = root[key][0][inst][0]['preference'][pref]['_'];
                                    preferences[standardOrCustom][instance][preferenceId].standart = standardOrCustom === 'standard' ? true : false;
                                    preferences[standardOrCustom][instance][preferenceId].custom = !preferences[standardOrCustom][instance][preferenceId].standart;
                                }
                            }
                        }
                    }

                    counter++;
                    sitePreferences[preferences.siteId] = preferences;

                    if (counter === list.length){
                        fn(sitePreferences);
                    }
                });
            });
        });
    });
}


// Object from front-end -> Object model for back-end
function postSitePreferences(jsonFromFrontEnd) {

    //var content = fs.readFileSync(Config.dataDir + '/frontEndJSON.json', 'utf8');
    //var objFromFrontEnd = JSON.parse(jsonFromFrontEnd);
    
    var objFromFrontEnd = jsonFromFrontEnd;

    var definitions = {}; // sitePrefDef
    var sitePreferences = {}; // general object of sites

    // Every sitePref
    for (var sitePref in objFromFrontEnd.sitePreferences) {

        var definition = new SitePreferenceDefinition();

        // Check if standart or custom
        var standartOrCustom = objFromFrontEnd.sitePreferences[sitePref].custom === true ? 'custom' : 'standard';

        // Properties of SitePreferenceDefinition
        for (var prop in definition) {
            definition[prop] = objFromFrontEnd.sitePreferences[sitePref][prop];
        }

        definitions[definition.id] = definition;

        // Enviroments: dev, stag, prod, all
        for (var enviroment in objFromFrontEnd.sitePreferences[sitePref].values) {
            // Sites
            for (var sites in objFromFrontEnd.sitePreferences[sitePref].values[enviroment]) {
                //Create sitePreference
                var preference = new SitePreference(definitions);
                preference.id = objFromFrontEnd.sitePreferences[sitePref].id;
                
                var validationObj = objFromFrontEnd.sitePreferences[sitePref];
                
                switch (validationObj.type) {
                    case 'string':
                        if ((typeof validationObj.maxLength !== 'undefined' && validationObj.values[enviroment][sites].length > validationObj.maxLength) || (typeof validationObj.minLength !== 'undefined' && validationObj.values[enviroment][sites].length < validationObj.minLength) || (typeof validationObj.regexp !== 'undefined' && !validationObj.regexp.test(validationObj.values[enviroment][sites]))) {
                            preference.value = '';
                        } else {
                            preference.value = validationObj.values[enviroment][sites];
                        }

                        break;
                    
                    case 'number':
                        if ((typeof validationObj.maxValue !== 'undefined' && +validationObj.values[enviroment][sites] > validationObj.maxValue) || (typeof validationObj.minValue !== 'undefined' && +validationObj.values[enviroment][sites] < validationObj.minValue)) {
                            preference.value = '';
                        } else {
                            preference.value = validationObj.values[enviroment][sites];
                        }

                        break;
                    
                    default:
                    	preference.value = validationObj.values[enviroment][sites];
                }

                // If site exist -> add new preference
                if (Object.keys(sitePreferences).find((name) => {return name == sites}) == sites) {
                    // Set site Preference to site
                    sitePreferences[sites][standartOrCustom][enviroment][objFromFrontEnd.sitePreferences[sitePref].id] = preference;
                } else {
                    // Create new site
                    var preferences = new SitePreferences();
                    preferences.siteId = sites;

                    // Set site Preference to site
                    preferences[standartOrCustom][enviroment][objFromFrontEnd.sitePreferences[sitePref].id] = preference;

                    // Add site to sites collection
                    sitePreferences[preferences.siteId] = preferences;
                }
            }
        }
    }

    return sitePreferences;
}


function objectModelToXML(jsonFromFrontEnd) {

    var ObjectModel = postSitePreferences(jsonFromFrontEnd);

    setDateInConfig();

    fs.mkdirSync(Config.dataDir + '/working/' + Config.latestChanges);
    fs.mkdirSync(Config.dataDir + '/working/' + Config.latestChanges + '/Demandware SitePreferences');
    fs.mkdirSync(Config.dataDir + '/working/' + Config.latestChanges + '/Demandware SitePreferences' + '/sites');

    var resultObj = {};
    var superObj = {};

    for (var site in ObjectModel) {
        // Create folder with siteId name
        // Create file preferences.xml in that folder
        for (var standardOrCustom in ObjectModel[site]) {
            if (standardOrCustom === 'siteId') {
                continue;
            }

            var standOrCus = standardOrCustom === 'standard' ? 'standard-preferences' : 'custom-preferences';
            resultObj[standOrCus] = {};

            for (var enviroment in ObjectModel[site][standardOrCustom]) {
                var newEnviroment = '';

                if (enviroment == 'all_instances') {
                    newEnviroment = 'all-instances';
                } else {
                    newEnviroment = enviroment;
                }

                resultObj[standOrCus][newEnviroment] = {};

                if (Object.keys(ObjectModel[site][standardOrCustom][enviroment]).length !== 0) {
                    resultObj[standOrCus][newEnviroment]['preference'] = [];

                    for (var sitePref in ObjectModel[site][standardOrCustom][enviroment]) {
                        var prefObj = {};

                        prefObj['@'] = {};
                        prefObj['@']['preference-id'] = ObjectModel[site][standardOrCustom][enviroment][sitePref].id;
                        prefObj['#'] =  ObjectModel[site][standardOrCustom][enviroment][sitePref].value;

                        resultObj[standOrCus][newEnviroment]['preference'].push(prefObj);
                    }
                }

                superObj[standOrCus] = resultObj[standOrCus];
            }
        }

        fs.mkdirSync(Config.dataDir + '/working/' + Config.latestChanges + '/Demandware SitePreferences' + '/sites/' + site);

        var path = Config.dataDir + '/working/' + Config.latestChanges + '/Demandware SitePreferences' + '/sites/' + site + '/preferences.xml';
        fs.writeFileSync(path, js2xmlparser.parse('preferences', superObj), 'utf8');
    }

    zipFiles();
}

/* Calls functions */
//createJSONforFrontEnd();

//objectModelToXML();


function createSitePreferenceDefinition(obj) {
    // ...
}

function updateSitePreferenceDefinition() {
    // ...
}

function deleteSitePreferenceDefinition() {
    // ...
}

module.exports = {
    'readSitePreferences': readSitePreferences,
    'postSitePreferences': postSitePreferences,
    'createSitePreferenceDefinition': createSitePreferenceDefinition,
    'updateSitePreferenceDefinition': updateSitePreferenceDefinition,
    'deleteSitePreferenceDefinition': deleteSitePreferenceDefinition,
    'objectModelToXML': objectModelToXML, 
    'createJSONforFrontEnd': createJSONforFrontEnd 
}
