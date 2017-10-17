/**
 * Class SitePreferences
 *
 * Version 0.1
 */
 
/* API Includes */
// var module = require(...);

/* Script Modules */
// var script = require(...);

var SitePreferences = function(sitePreferenceDefinitions) {
    // Private properties (closures)
    var _siteId;
   
    // sitePreferenceDefinitions is going to be an implicit closure
    Object.defineProperties(this, {
        siteId: {
            get: function() {
                return _siteId;
            },
            set: function(val) {
                _siteId = val;
            },
            configurable: true,
            enumerable: true
        },
        standard: {
            value: {},
            configurable: true,
            enumerable: true
            // 4 sub-properties: - all-instances, development, staging, production
            // Every sub-property constains list of standard SitePreference values
        },
        custom: {
            value: {},
            configurable: true,
            enumerable: true
            // 4 sub-properties: - all-instances, development, staging, production
            // Every sub-property constains list of standard SitePreference values
        },
        all: {
            value: {},
            configurable: true,
            enumerable: true
        }
    });
        
    Object.defineProperty(this.standard, 'all_instances', {
        value: {},
        configurable: true,
        enumerable: true
    });
    Object.defineProperty(this.standard, 'development', {
        value: {},
        configurable: true,
        enumerable: true
    });
    Object.defineProperty(this.standard, 'staging', {
        value: {},
        configurable: true,
        enumerable: true
    });
    Object.defineProperty(this.standard, 'production', {
        value: {},
        configurable: true,
        enumerable: true
    });
    Object.defineProperty(this.custom, 'all_instances', {
        value: {},
        configurable: true,
        enumerable: true
    });
    Object.defineProperty(this.custom, 'development', {
        value: {},
        configurable: true,
        enumerable: true
    });
    Object.defineProperty(this.custom, 'staging', {
        value: {},
        configurable: true,
        enumerable: true
    });
    Object.defineProperty(this.custom, 'production', {
        value: {},
        configurable: true,
        enumerable: true
    });
    
    // But Object.assign is ES6     
    var all_all_instances = Object.assign(this.custom.all_instances, this.standard.all_instances); 
    var all_development = Object.assign(this.custom.development, this.standard.development);    
    var all_staging = Object.assign(this.custom.staging, this.standard.staging); 
    var all_production = Object.assign(this.custom.production, this.standard.production); 
    
    Object.defineProperty(this.all, 'all_instances', {
        get: function () {
            return all_all_instances; 
        }
    });
    
    Object.defineProperty(this.all, 'development', {
        get: function () {
            return all_development;
        }
    });
        
    Object.defineProperty(this.all, 'staging', {
        get: function() {
            return all_staging;
        }
    });
        
    Object.defineProperty(this.all, 'production', {
        get: function () {
            return all_production;
        }
    });    
}           

/* Module Exports */
module.exports = exports = SitePreferences;
