/**
 * Created by fran on 15.09.2016.
 */


/**
 * Composing the element with the given item
 * @param menuItem
 * @returns {Element}
 */
var composeNode = function(menuItem){
    var node = document.createElement("LI");
    var textnode = document.createTextNode(menuItem.id);
    node.appendChild(textnode);
    node.className = menuItem.cssClass;
    node.id = menuItem.id;
    return node;
}
/**
 * Append items and search for childrens items
 * @param data
 */
var appendItem = function(data){
    var menuElement = document.getElementById("menu");
    if(data.menu){
        var parent = document.getElementById(data.id);
        var submenu = data.menu;
        for(var i in submenu){
            if(i==0){
                var subMenu = document.createElement("UL");
                parent.appendChild(subMenu);
            }
            var node = composeNode(submenu[i]);
            subMenu.appendChild(node);
            appendItem(submenu[i]);
        }

    }
}
/**
 * Starts creating the root elements and looking for childrens
 * @param data
 */
function createMenu(data){
    var menuElement = document.getElementById("menu");
    var menu = data.menu;
    for(var i in menu){
        console.log(menu[i]);
        var node = composeNode(menu[i]);
        menuElement.appendChild(node)
        appendItem(menu[i]);
    }
}
/**
 * Loads the file
 * Avoiding CORS
 * @param callback
 */
function loadJSON(callback) {

    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'data/menu.json', true);
    xobj.setRequestHeader('Access-Control-Allow-Origin', '*');

    xobj.setRequestHeader('Access-Control-Allow-Methods', 'GET');
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
           callback(xobj.responseText);
        }
    };
    xobj.send(null);
}

/**
 * Starts the application
 * Contents the main functionallity,
 * in two parts
 *  - Load JSON FILE
 *  - Create data
 */
function init() {
    loadJSON(function(response) {
        if(response) {
            // Parse JSON string into object
            var jsonData = JSON.parse(response);
            if (jsonData) {
                createMenu(jsonData);
            }
        } else {
            console.log("no files to load");
        }
    });
}

init();