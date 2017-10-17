/* API Includes */
// var module = require(...);

/* Script Modules */
// var script = require(...);

/**
 * Class SitePreferenceDefinition.
 * @constructor
 * @version 0.1
 */
function SitePreferenceDefinition() {
    // Private properties closures
    var _id,
        _name,
        _description,
        _type,
        _defaultValue,
        _minLength,
        _maxLength,
        _minValue,
        _maxValue,
        _fieldLength,
        _regexp,
        _mandatory = false,
        _translations = {},
        _standart = false,
        _custom = true,
        _groupId;

    Object.defineProperty(this, 'id', {
        get: function() {
            return _id;
        },
        set: function(val) {
            if (typeof(val) === 'string' || val instanceof String) {
                _id = val;
            } else if (typeof(val) === 'number' || val instanceof Number) {
                // Convert Number to String
                _id = '' + val;
            }
        },
        enumerable: true
    });

    Object.defineProperty(this, 'name', {
        get: function() {
            return _name;
        },
        set: function(val) {
            if (typeof(val) === 'string' || val instanceof String) {
                _name = val;
            } else if (typeof(val) === 'number' || val instanceof Number) {
                // Convert Number to String
                _name = '' + val;
            }
        },
        enumerable: true
    });

    Object.defineProperty(this, 'description', {
        get: function() {
            return _description;
        },
        set: function(val) {
            if (typeof(val) === 'string' || val instanceof String) {
                _description = val;
            } else if (typeof(val) === 'number' || val instanceof Number) {
                // Convert Number to String
                _description = '' + val;
            }
        },
        enumerable: true
    });

    Object.defineProperty(this, 'type', {
        get: function() {
            return _type;
        },
        set: function(val) {
            // If val === 'string' or val === 'number' - it`s good, else ignore
            if ((typeof(val) === 'string' || val instanceof String) && val === 'string') {
                _type = val;

                /*
                    Value type depending properties of the object
                */

                // Remove all existing limitations
                Object.defineProperties(this, {
                    minValue: {
                        value: undefined,
                        configurable: true
                    },
                    maxValue: {
                        value: undefined,
                        configurable: true
                    }
                });

                // Define properties
                Object.defineProperties(this, {
                    minLength: {
                        get: function() {
                            return _minLength;
                        },
                        set: function(val) {
                            if (typeof(val) === 'number' || val instanceof Number) {
                                // If number invalid - ignore
                                if (val >= 0 && val <= 999999) {
                                    _minLength = val;    
                                } 
                            } else if (typeof(val) === 'string' || val instanceof String) {
                                // Check is NaN, if string invalid - ignore
                                val = parseInt(val);

                                if (!isNaN(val) && val >= 0 && val <= 999999) {
                                    _minLength = val;
                                }
                            }
                        },
                        configurable: true,
                        enumerable: true
                    },
                    maxLength: {
                        get: function() {
                            return _maxLength;
                        },
                        set: function(val) {
                            if (typeof(val) === 'number' || val instanceof Number) {
                                // If number invalid - ignore
                                if (val >= 0 && val <= 999999) {
                                    _maxLength = val;    
                                }
                            } else if (typeof(val) === 'string' || val instanceof String) {
                                // Check  is NaN, if string invalid - ignore
                                val = parseInt(val);

                                if (!isNaN(val) && val >= 0 && val <= 999999) {
                                    _maxLength = val;
                                }
                            }
                        },           
                        configurable: true,
                        enumerable: true
                    },
                    defaultValue: {
                        get: function() {
                            return _defaultValue;
                        },
                        set: function(val) {
                            if (typeof(val) === 'string' || val instanceof String) {
                                _defaultValue = val;
                            } else if (typeof(val) === 'number' || val instanceof Number) {
                                // Convert to String
                                _defaultValue = '' + val;
                            }
                        },
                        configurable: true,
                        enumerable: true
                    },
                    fieldLength: {
                        get: function() {
                            return _fieldLength;
                        },
                        set: function(val) {
                            if (typeof(val) === 'number' || val instanceof Number) {
                                _fieldLength = val;    
                            } else if (typeof(val) === 'string' || val instanceof String) {
                                // Check  is NaN, if string invalid - ignore
                                val = parseFloat(val);

                                if (!isNaN(val)) {
                                    _fieldLength = val;
                                }
                            }
                        },
                        configurable: true,
                        enumerable: true
                    }
                });

                Object.defineProperty(this, 'regexp', {
                    get: function() {
                        return _regexp;
                    },
                    set: function(val){
                        // If regexp invalid - ignore
                        if (typeof(val) === 'string' || val instanceof String) {
                            _regexp = new RegExp(val, 'i'); 
                        } else if (val instanceof RegExp) {
                            _regexp = val;
                        }
                    },
                    enumerable: true
                });
  
            } else if ((typeof(val) === 'string' || val instanceof String) && val === 'number') {
                _type = val;

                // Remove all existing limitations
                Object.defineProperties(this, {
                    minLength: {
                        value: undefined,
                        configurable: true
                    },
                    maxLength: {
                        value: undefined,
                        configurable: true
                    },
                    regexp: {
                        value: undefined,
                        configurable: true
                    }
                });

                Object.defineProperties(this, {
                    minValue: {
                        get: function() {
                            return _minValue;
                        },
                        set: function(val) {
                            if (typeof(val) === 'number' || val instanceof Number) {
                                _minValue = val;    
                            } else if (typeof(val) === 'string' || val instanceof String) {
                                // Check  is NaN, if string invalid - ignore
                                val = parseFloat(val);

                                if (!isNaN(val)) {
                                    _minValue = val;
                                }
                            }
                        },
                        configurable: true,
                        enumerable: true
                    },
                    maxValue: {
                        get: function() {
                            return _maxValue;
                        },
                        set: function(val) {
                            if (typeof(val) === 'number' || val instanceof Number) {
                                _maxValue = val;    
                            } else if (typeof (val) === 'string' || val instanceof String) {
                                // Check  is NaN, if string invalid - ignore
                                val = parseFloat(val);

                                if (!isNaN(val)) {
                                    _maxValue = val;
                                }
                            } 
                        },
                        configurable: true,
                        enumerable: true
                    },
                    defaultValue: {
                        get: function() {
                            return _defaultValue;
                        },
                        set: function(val) {
                            if (typeof(val) === 'number' || val instanceof Number) {
                                _defaultValue = val;
                            } else if (typeof(val) === 'string' || val instanceof String) {
                                // Convert to Number
                                val = parseFloat(val);

                                if (!isNaN(val)) {
                                    _defaultValue = val;
                                }
                            }
                        },
                        configurable: true,
                        enumerable: true
                    },
                    fieldLength: {
                        get: function() {
                            return _fieldLength;
                        },
                        set: function(val) {
                            if (typeof(val) === 'number' || val instanceof Number) {
                                _fieldLength = val;    
                            } else if (typeof(val) === 'string' || val instanceof String) {
                                // Check  is NaN, if string invalid - ignore
                                val = parseFloat(val);

                                if (!isNaN(val)) {
                                    _fieldLength = val;
                                }
                            }
                        },
                        configurable: true,
                        enumerable: true
                    }
                });  
            } else if ((typeof(val) === 'string' || val instanceof String) && val === 'boolean') {
                _type = val;

                 // Remove all existing limitations
                Object.defineProperties(this, {
                    minLength: {
                        value: undefined,
                        configurable: true
                    },
                    maxLength: {
                        value: undefined,
                        configurable: true
                    },
                    regexp: {
                        value: undefined,
                        configurable: true
                    },
                    minValue: {
                        value: undefined,
                        configurable: true
                    },
                    maxValue: {
                        value: undefined,
                        configurable: true
                    },
                    fieldLength: {
                        value: undefined,
                        configurable: true
                    }
                });
            }
        },
        enumerable: true
    });

    Object.defineProperty(this, 'mandatory', {
        get: function() {
            return _mandatory;
        },
        set: function(val) {
            if (typeof(val) === 'boolean' || val instanceof Boolean) {
                _mandatory = val;
            }
            // If not Boolean, _mandatory defined as false
        },
        enumerable: true
    });

    Object.defineProperty(this, 'translations', {
        get: function() {
            return _translations;
        },
        set: function(val) {
            if (typeof(val) === 'object' || val instanceof Object) {
                _translations = val;
            }
        },
        enumerable: true
    });

       Object.defineProperty(this, 'standart', {
        get: function() {
            return _standart;
        },
        set: function(val) {
            if (typeof(val) === 'boolean' || val instanceof Boolean) {
                _standart = val;

                if (val === true) {
                    _custom = false;
                } else if (val === false) {
                    _custom = true;
                }
            }
            // If not Boolean, _standart defined as false
        },
        enumerable: true
    });

    Object.defineProperty(this, 'custom', {
        get: function() {
            return _custom;
        },
        set: function(val) {
            if(typeof(val) === 'boolean' || val instanceof Boolean) {
                _custom = val;

                if (val === true) {
                    _standart = false;
                } else if (val === false) {
                    _standart = true;
                }
            }
            // If not Boolean, _custom defined as true
        },
        enumerable: true
    });

    Object.defineProperty(this, 'groupId', {
        get: function() {
            return _groupId;
        },
        set: function(val) {
            if (typeof(val) === 'string' || val instanceof String) {
                _groupId = val;
            } else if (typeof(val) === 'number' || val instanceof Number) {
                // Convert Number to String
                _groupId = '' + val;
            }
        },
        enumerable: true
    });
}

/* Module Exports */
module.exports = exports = SitePreferenceDefinition;
