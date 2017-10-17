/* API Includes */
// var module = require(...);

/* Script Modules */
// var script = require(...);

/**
 * Class SitePreference.
 * @constructor
 * @param {sitePreferenceDefinitions} Object - Collection of SitePreferenceDefinition objects.
 * @version 0.1
 */
var SitePreferenceDefinition = require('./SitePreferenceDefinition.js');

function SitePreference(sitePreferenceDefinitions) {
    // Private properties closures
    var _id,
        _value,
        _sitePreferenceDefinition; // It was decided to use object linking but not classes inheritance for the needs of this class         

        
    Object.defineProperties(this, {
        id: {
            get: function() {
                return _id;
            },
            set: function(val) {

                if (typeof sitePreferenceDefinitions[val] === 'undefined') {
                    _sitePreferenceDefinition = new SitePreferenceDefinition();
                } else {
                    _sitePreferenceDefinition = sitePreferenceDefinitions[val]; 
                }

                if (typeof(val) === 'string' || val instanceof String) {
                    _id = val;
                } else if (typeof(val) === 'number' || val instanceof Number) {
                    // Convert Number to String
                    _id = '' + val;
                } else {
                    return;
                }  

            },
            configurable: true,
            enumerable: true
        },
        // Property is unchangeable within this class, read only mode
        name: {
            // Getter should be used instead of 'value' because _sitePreferenceDefinition is undefined at the stage of properties definition
            get: function() {
                return _sitePreferenceDefinition.name;
            },
            configurable: true,
            enumerable: true
        },
        description: {
            get: function() {
                return _sitePreferenceDefinition.description;
            },
            configurable: true,
            enumerable: true
        },
        type: {
            get: function() {
                if (typeof _sitePreferenceDefinition !== 'undefined') {
				    return _sitePreferenceDefinition.type; 
                } 
            },
            configurable: true,
            enumerable: true
        },
        defaultValue: {
            get: function() {
                return _sitePreferenceDefinition.defaultValue;
            },
            configurable: true,
            enumerable: true
        },
        minLength: {
            get: function() {
                return _sitePreferenceDefinition.minLength;
            },
            configurable: true,
            enumerable: true
        },
        maxLength: {
            get: function() {
                return _sitePreferenceDefinition.maxLength;
            },
            configurable: true,
            enumerable: true
        },
        minValue: {
            get: function() {
                return _sitePreferenceDefinition.minValue;
            },
            configurable: true,
            enumerable: true
        },
        maxValue: {
            get: function() {
                return _sitePreferenceDefinition.maxValue;
            },
            configurable: true,
            enumerable: true
        },
        regexp: {
            get: function() {
                return _sitePreferenceDefinition.regexp;
            },
            configurable: true,
            enumerable: true
        },
        mandatory: {
            get: function() {
                return _sitePreferenceDefinition.mandatory;
            },
            configurable: true,
            enumerable: true
        },
        translations: {
            get: function() {
                return _sitePreferenceDefinition.translations;
            },
            configurable: true,
            enumerable: true
        },
        standart: {
            get: function() {
                return _sitePreferenceDefinition.standart;
            },
            set: function(val) {
                if(typeof(val) === 'boolean' || val instanceof Boolean) {
                    _sitePreferenceDefinition.standart = val;
                }
            },
            configurable: true,
            enumerable: true
        },
        custom: {
            get: function() {
                return _sitePreferenceDefinition.custom;
            },
            set: function(val) {
                if(typeof(val) === 'boolean' || val instanceof Boolean) {
                    _sitePreferenceDefinition.custom = val;
                }
            },
            configurable: true,
            enumerable: true
        },
        value: {
            get: function() {
                return _value;
            },
            set: function(val) {
                if (typeof _sitePreferenceDefinition === 'undefined') {
                    _sitePreferenceDefinition = new SitePreferenceDefinition();
                   _sitePreferenceDefinition.type = typeof val;
                } 

                if (typeof val === 'string') { 
                    if ((typeof _sitePreferenceDefinition.maxLength !== 'undefined' && val.length > _sitePreferenceDefinition.maxLength) || (typeof _sitePreferenceDefinition.minLength !== 'undefined' && val.length < _sitePreferenceDefinition.minLength) || (typeof _sitePreferenceDefinition.regexp !== 'undefined' && !_sitePreferenceDefinition.regexp.test(val))) {
                        return;
                    } else {
                        _value = val;
                    }
                } else if (typeof val === 'number') {
                    if ((typeof _sitePreferenceDefinition.maxValue !== 'undefined' && val > _sitePreferenceDefinition.maxValue) || (typeof _sitePreferenceDefinition.minValue !== 'undefined' && val < _sitePreferenceDefinition.minValue)) {
                        return;
                    } else {
                        _value = val;
                    }
                } 
            },
            configurable: true,
            enumerable: true
        },
        fieldLength: {
            get: function() {
                return _sitePreferenceDefinition.fieldLength;
            },
            configurable: true,
            enumerable: true
        },
        groupId: {
            get: function() {
                return _sitePreferenceDefinition.groupId;   
            },
            configurable: true,
            enumerable: true
        }
    });
}

/* Module Exports */
module.exports = exports = SitePreference;
