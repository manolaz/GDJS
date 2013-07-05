/*
 * Game Develop JS Platform
 * Copyright 2013 Florian Rival (Florian.Rival@gmail.com). All rights reserved.
 * This project is released under the GNU Lesser General Public License.
 */

/**
 * The variablesContainer stores variables for a runtimeScene or a runtimeObject.
 * @namespace gdjs
 * @class variablesContainer
 * @constructor
 * @param initialVariablesData Optional object containing initial variables.
 */
gdjs.variablesContainer = function(initialVariablesData)
{
    var that = {};
    var my = {};

    my.variables = new Hashtable();
    
    /**
     * Initialize variables from a container data.
     * @method initFrom
     * @param data The object containing the variables.
     */
    that.initFrom = function(data) {
        gdjs.iterateOver(data, "Variable", function(varData) {

            var variable = gdjs.variable();
            var initialValue = varData.attr.Value;
            //Try to guess the type of the value, as GD has no way ( for now ) to specify
            //the type of a variable.
            if(!isNaN(initialValue)) {  //Number
                variable.setNumber(parseFloat(initialValue));
            }
            else { //We have a string ( Maybe empty ).
                if ( initialValue.length === 0 )
                    variable.setNumber(0);
                else
                    variable.setString(initialValue);
            }

            my.variables.put(varData.attr.Name, variable);
        });
    }
    if ( initialVariablesData != undefined ) that.initFrom(initialVariablesData);

    /**
     * Add a new variable.
     * @method add
     * @param name {String} Variable name
     * @param variable The variable to be added
     */
    that.add = function(name, variable) {
        my.variables.put(name, variable);
    }

    /**
     * Remove a variable.
     * @method remove
     * @param name {String} Variable to be removed
     */
    that.remove = function(name) {
        my.variables.remove(name);
    }

    /**
     * Get a variable.
     * @method get
     * @param name {String} The variable's name
     * @return The specified variable. If not found, an empty variable is added to the container.
     */
    that.get = function(name) {
        if ( !my.variables.containsKey(name) ) {
            my.variables.put(name, gdjs.variable());
        }

        return my.variables.get(name);
    }

    /**
     * Check if a variable exists in the container
     * @method has
     * @param name {String} The variable's name
     * @return true if the variable exists.
     */
    that.has = function(name) {
        return my.variables.containsKey(name);
    }

    return that;
}
