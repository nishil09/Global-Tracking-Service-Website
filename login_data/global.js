




var onLoadFunctions = new Array();

/* ======================================================================== */
/*                           Register onload functions                      */
/* ======================================================================== */

registerFunction(function() {tableRuler()});

registerFunction(function() {highlightFormElements()});

//registerFunction(function() {addAnchorAndImagesEventListeners()});
registerFunction(function() {addLoginFormFocusHandlers()});
registerFunction(function() {initializeKLayers()});
registerFunction(function() {initMenu()});
registerFunction(function() {moveContextMenuDivsToBody()});
window.onload=function(){executeOnLoad()};


/*
 * Executes all registered functions
 */
function executeOnLoad() {
    if (this.onLoadFunctions) {
        var k = this.onLoadFunctions.length;
        for ( var i = 0; i < k; i++ ) {
            this.onLoadFunctions[i]();
        }
    }
}

/*
 * Adds instance of Function to array of functions
 * which must be executed on window load
 * f - function to register
 */
function registerFunction(f) {
    if (this.onLoadFunctions) {
        var k = this.onLoadFunctions.length;
        this.onLoadFunctions[k] = f;
    }
}

/*
 * Initializes KLayers library if it was not done by browser
 */
function initializeKLayers() {
    if ( !KLayers ) {
        initKLayers();
    }
}

/* ======================================================================== */
/*                             MODAL WINDOW                                 */
/* ======================================================================== */

var modalWindow;
/*
 * Open modal window
 * @param url url of the modal window content
 * @param name name of the window
 * @param featrues features of the window like "width=300,height=300"
 */
function openModalWindow(url, name, features) {
    if (!modalWindow || (modalWindow && modalWindow.closed)) {
        modalWindow = window.open(url, name, features);
    } else {
        modalWindow.focus();
    }
}

function focusModalWindow() {
    if (modalWindow && !modalWindow.closed) {
        modalWindow.focus();
    }
}
window.document.onmousemove = focusModalWindow

function closeModalWindow() {
    if (modalWindow && !modalWindow.closed) {
        modalWindow.close();
    }
}
window.onunload = closeModalWindow


/* ======================================================================== */
/*                                 IFRAME                                   */
/* ======================================================================== */

function loadIFrameContent(iframeId, contentDivId) {
    var iframeElement = document.getElementById(iframeId);
    var out;
    if ( !isOpera5 ) {
        out = iframeElement.contentWindow.document.body;
    } else {
        out = iframeElement.contentDocument.body;
    }
    var contentDiv = document.getElementById(contentDivId);
    out.innerHTML = decodeURIComponent(contentDiv.innerHTML);
//  out.innerHTML = contentDiv.innerHTML;
}

/* ======================================================================== */
/*                               EDIT MODE                                  */
/* ======================================================================== */


var layerClassName;
var windowStatus;

/**
 * Selects layer with specified ID
 * layerId - ID of layer to select
 */
function doSelectLayer(layerId) {
    var selectedLayer = document.getElementById(layerId);
    if (selectedLayer) {
        layerClassName = selectedLayer.className;
        selectedLayer.className = 'selectedFieldValueWrapper';
    }
    windowStatus = window.status;
    window.status = 'Double-click to edit content';
}

/**
 * Removes selection from layer with specified ID
 * layerId - ID of layer to select
 */
function doUnselectLayer(layerId) {
    var selectedLayer = document.getElementById(layerId);
    if (selectedLayer) {
        selectedLayer.className = layerClassName;
    }
    window.status = windowStatus;
}

/**
 * Calls update of field value with specified ID
 * contentFieldId - ID of content field to update
 * redirectUrl  - URL of page (with query string) to return after editing.
 *                URL must be unencoded
 */
function doCallFieldUpdate(contentFieldId, redirectUrl) {
    redirectUrl = encodeURIComponent(redirectUrl);
    var action = "/ows/core/contentFieldValue/callCreateOrUpdate.do?contentFieldId=" + contentFieldId;
    if ( redirectUrl != null && redirectUrl.length > 0 ) {
        action += "&redirectUrl=" + redirectUrl;
    }
    window.location.href = action;
}

/**
 * Calls update of content
 * uri          - URI of action (context-relative to call to update content)
 * redirectUrl  - URL of page (with query string) to return after editing.
 *                URL must be unencoded
 */
function doCallContentUpdate(uri, redirectUrl) {
    redirectUrl = encodeURIComponent(redirectUrl);
    if ( redirectUrl != null && redirectUrl.length > 0 ) {
        var sign = "?";
        if ( uri.indexOf('?') != -1 ) {
            sign = "&";
        }
        uri += sign + "redirectUrl=" + redirectUrl;
    }
    window.location.href = uri;
}

/**
 * Calls creation of indexed field with given identifier on owner with given ID.
 * ownerId - ID of owner
 * identifier - field identifier
 * currentIndex - index of initial field
 * type - field type (numeric)
 * definition - definition on which initial field is placed
 * redirectUrl  - URL of page (with query string) to return after editing.
 *                URL must be unencoded
 */
function doCallCreateIndexedField(ownerId, identifier, currentIndex, type, definition, redirectUrl) {
    redirectUrl = encodeURIComponent(redirectUrl);
    var action = "/ows/core/contentFieldValue/callCreateOrUpdate.do?ownerId="
            + ownerId
            + "&indexedIdentifier=" + identifier
            + "&currentIndex=" + currentIndex
            + "&fieldType=" + type
            + "&definition=" + definition;
    if ( redirectUrl != null && redirectUrl.length > 0 ) {
        action += "&redirectUrl=" + redirectUrl;
    }
    window.location.href = action;
}

/**
 * Calls deletion of field with given ID.
 * fieldId - ID of field
 * ownerId - ID of owner
 * redirectUrl  - URL of page (with query string) to return after editing.
 *                URL must be unencoded
 */
function doDeleteIndexedField(fieldId, ownerId, redirectUrl) {
    if (!confirm('Are you sure, you want to delete?')) {
        return;
    }
    redirectUrl = encodeURIComponent(redirectUrl);
    var action = "/ows/core/contentField/delete.do?id=" + fieldId
            + "&ownerId=" + ownerId;
    if ( redirectUrl != null && redirectUrl.length > 0 ) {
        action += "&redirectUrl=" + redirectUrl;
    }
    window.location.href = action;
}

/**
 * Calls creation of element.
 * uri          - URI of action (context-relative to call to create element)
 * redirectUrl  - URL of page (with query string) to return after editing.
 *                URL must be unencoded
 */
function doCallCreateElement(uri, redirectUrl) {
    redirectUrl = encodeURIComponent(redirectUrl);
    if ( redirectUrl != null && redirectUrl.length > 0 ) {
        var sign = "?";
        if ( uri.indexOf('?') != -1 ) {
            sign = "&";
        }
        uri += sign + "redirectUrl=" + redirectUrl;
    }
    window.location.href = uri;
}

/**
 * Calls deletion of element.
 * uri          - URI of action (context-relative to call to delete element)
 * redirectUrl  - URL of page (with query string) to return after editing.
 *                URL must be unencoded
 */
function doCallDeleteElement(uri, redirectUrl) {
    if (!confirm('Are you sure, you want to delete?')) {
        return;
    }
    redirectUrl = encodeURIComponent(redirectUrl);
    if ( redirectUrl != null && redirectUrl.length > 0 ) {
        var sign = "?";
        if ( uri.indexOf('?') != -1 ) {
            sign = "&";
        }
        uri += sign + "redirectUrl=" + redirectUrl;
    }
    window.location.href = uri;
}

/**
 * Calls creation of content resource in given folder with given type.
 * folder       - initial resource path to be suggested
 * resourceType - type of resource
 */
function doCallCreateContentResource(folder, resourceType) {
    var action = "/ows/core/contentResource/callCreate.do";
    action += '?folder=' + encodeURIComponent(folder);
    action += '&type=' + encodeURIComponent(resourceType);
    action += '&closeWindowAfterCreated=true';
    window.open(action);
}

/* ======================================================================== */
/*                                   GRID                                   */
/* ======================================================================== */


 /**
  * Prepares action to call
  * fieldName - Name of field to associate filter with
  * gridName - name of grid to which this field belongs
  * pageUrl - URL of the page on which grid is located
  * callFilterAction - filter action to call int filter window
  * fieldKey - Bundle key for field name. Used to write name on filter page.
  *            If it is null or has its length equal to zero, fieldName is used instead to show name
  */
 function prepareAction(fieldName, gridName, pageUrl, callFilterAction, fieldKey, rowIterators) {

     fieldName = encodeURIComponent(fieldName);
     gridName = encodeURIComponent(gridName);
     pageUrl = encodeURIComponent(pageUrl);

     var sign = "?";
     if ( callFilterAction.indexOf('?') != -1 ) {
         sign = "&";
     }

     var queryString = sign +
                       "fieldName=" + fieldName +
                       "&gridName=" + gridName +
                       "&pageUrl=" + pageUrl;

     if ( fieldKey ) {
        if ( fieldKey != null && fieldKey != '' ) {
             fieldKey = encodeURIComponent(fieldKey);
            queryString = queryString + "&fieldKey=" + fieldKey;
        }
     }

     if ( rowIterators ) {
        if ( rowIterators != null && rowIterators != '' ) {
             rowIterators = encodeURIComponent(rowIterators);
            queryString = queryString + "&rowIterators=" + rowIterators;
        }
     }

     var action = callFilterAction + queryString;

     return action;
 }

 /**
  * Opens filter window
  * action - action to call in opened window
  */
 function openFilterWindow(action) {

    var posStr = "top=200,left=200,width=530, resizable=no,height=200,scrollbars=yes";
    openModalWindow(action, "gridFilter", posStr);
 }

 /**
  * Show number filter window
  * fieldName - Name of field to associate filter with
  * gridName - name of grid to which this field belongs
  * pageUrl - URL of the page on which grid is located
  * fieldKey - Bundle key for field name. Used to write name on filter page.
  *            If it is null or has its length equal to zero, fieldName is used instead to show name
  */
 function showNumberFilterWindow(fieldName, gridName, pageUrl, fieldKey, rowIterators) {

    var action = prepareAction(fieldName, gridName, pageUrl, "/ows/grid/callNumberFilter.do", fieldKey, rowIterators);
    openFilterWindow(action);
 }

 /**
  * Show string filter window
  * fieldName - Name of field to associate filter with
  * gridName - name of grid to which this field belongs
  * pageUrl - URL of the page on which grid is located
  * fieldKey - Bundle key for field name. Used to write name on filter page.
  *            If it is null or has its length equal to zero, fieldName is used instead to show name
  */
 function showStringFilterWindow(fieldName, gridName, pageUrl, fieldKey, rowIterators) {

    var action = prepareAction(fieldName, gridName, pageUrl, "/ows/grid/callStringFilter.do", fieldKey, rowIterators);
    openFilterWindow(action);
 }

 /**
  * Show date filter window
  * fieldName - Name of field to associate filter with
  * gridName - name of grid to which this field belongs
  * pageUrl - URL of the page on which grid is located
  * fieldKey - Bundle key for field name. Used to write name on filter page.
  *            If it is null or has its length equal to zero, fieldName is used instead to show name
  */
 function showDateFilterWindow(fieldName, gridName, pageUrl, fieldKey, rowIterators) {

    var action = prepareAction(fieldName, gridName, pageUrl, "/ows/grid/callDateFilter.do", fieldKey, rowIterators);
    openFilterWindow(action);
 }

  /**
   * Show set filter window
   * fieldName - Name of field to associate filter with
   * gridName - name of grid to which this field belongs
   * pageUrl - URL of the page on which grid is located
   * fieldKey - Bundle key for field name. Used to write name on filter page.
   *            If it is null or has its length equal to zero, fieldName is used instead to show name
   * beanId - Identifier of Spring bean to use to get list of available elements for set filter.
   * method - Method of specified bean to call to get list of available elements for set filter.
   */
  function showSetFilterWindow(fieldName, gridName, pageUrl, fieldKey, beanId, method, label, value, rowIterators) {

     var action = prepareAction(fieldName, gridName, pageUrl, "/ows/grid/callSetFilter.do", fieldKey, rowIterators);
     if ( beanId != null && beanId != '' && method != null && method != '' ) {
        action += "&beanId=" + beanId + "&method=" + method;
     }

     if ( label != null && label != '' ) {
        action += "&label=" + label;
     }

     if ( value != null && value != '' ) {
        action += "&value=" + value;
     }

     openFilterWindow(action);
  }


/*
 * Adds 'onmouseover' and 'onmouseout' events to each table row if table's row class is 'grid'
 */
function tableRuler() {
    var currentClass;
    if (document.getElementById && document.createTextNode) {
        var tables = document.getElementsByTagName('table');
        for (var i = 0; i < tables.length; i++) {
            if(tables[i].className == 'grid') {
                var trs = tables[i].getElementsByTagName('tr');
                if ( !isOpera5 ) {
                    for(var j = 0; j < trs.length; j++) {
                        if(trs[j].parentNode.nodeName == 'TBODY'&& trs[j].parentNode.nodeName != 'TFOOT' && getAncestorWithNodeName(trs[j], 'TABLE') == tables[i]) {
                            trs[j].onmouseover = function() {
                                currentClass = this.className;
                                this.className = 'hover';
                                if ( isMSIE ) {
                                    return true;
                                } else {
                                    return false;
                                }
                            }
                            trs[j].onmouseout = function() {
                                if (currentClass) {
                                    this.className = currentClass;
                                }
                                return false
                            }
                        }
                    }
                }
            }
        }
    }
}


/*
 * Expands or rolls up list with specified ID
 * id - ID  of list ot show
 */
function expandList(id) {
    var list = document.getElementById(id);
    if ( list != null ) {
        list.style.display = (list.style.display == 'none' || list.style.display == '')?'block':'none';
    }
}

/* ======================================================================== */
/*                       BROWSER AND POPUP SELECTS                          */
/* ======================================================================== */

/**
 * Function used to show browser when TinyMCE is used
 * field_name - name of field in form, to which selected URL must be pasted
 * url        - value of field with name specified in field_name attribute
 * type       - type of browser (e.g. "file" or "image")
 * win        - reference to window, where form is placed
 */
function tinyMCEBrowserCallBack(field_name, url, type, win) {

    // url of browser to show
    var pageUrl;

    if ( type == "image" ) {
        pageUrl = "/ows/core/browser/browseImages.do?opening=true";
    } else {
        pageUrl = "/ows/core/browser/browseContentPages.do?opening=true";

        // attach language suffix
        if ( tinyMCE.selectedInstance ) {
            var editorAreaLanguage = tinyMCE.selectedInstance.editorAreaLanguage;
            if ( editorAreaLanguage ) {
                pageUrl += "&editorAreaLanguage=" + editorAreaLanguage;
            }
        }
    }

    // save reference to window that has executed this function
    this.tinyMCEServiceWindow = win;

    // browse
    browseInPopup(pageUrl, field_name);
}


/**
 * Function used to initialize every TinyMCE instance
 * instance - instance that is currently being initialized
 */
function tinyMCEInitInstanceCallBack(instance) {

    // calculate number of this instance
    var editorId = instance.editorId;
    var underscore = editorId.lastIndexOf('_');
    var number = parseInt(editorId.substring(underscore + 1));

    // get editor area language from array, filled in on page load
    if ( this.editorAreaLanguages ) {
        instance.editorAreaLanguage = this.editorAreaLanguages[number];
    }
}

/**
 * Sends URL to opener window
 * url - URL to set
 */
function sendUrl(url, inputId) {
    var win = window.opener;
    if ( win.tinyMCEServiceWindow != null ) {
        win = win.tinyMCEServiceWindow;
    }
    if ( inputId == null ) {
        win.SetUrl(url);
    } else {
        var input = win.document.getElementById(inputId);
        if ( input != null ) {
            input.value = url;
            // TODO: remove this patch when TinyMCE will use another mechanism
            if (input.onchange) {
                input.onchange();
            }
        } else {
            // try to find form field with specified name in the first form (it is TinyMCE feature)
            input = win.document.forms[0].elements[inputId];
            if ( input != null ) {
                input.value = url;
                // TODO: remove this patch when TinyMCE will use another mechanism
                if (input.onchange) {
                    input.onchange();
                }
            }
        }
    }
    // set reference to service window to null
    window.opener.tinyMCEServiceWindow = null;
    window.close();
    win.focus();
}

/**
 * Shows page in popup window with list of elements for select
 * pageUri - URL of page to show
 * inputId - ID of input element to paste selected value to
 */
function browseInPopup(pageUrl, inputId, width, height, top, left) {
    var posStr;

    if ( left == null ) {
        // set default value of left corner to 5% of screen width
        left = screen.width * 0.05;
    }

    if ( top == null ) {
        // set default value of top corner to 15% of screen height
        top = screen.height * 0.15;
    }

    if ( width == null ) {
        // set default width to 90% of scrren width
        width = screen.width * 0.9;
    }

    if ( height == null ) {
        // set default height to 70% of screen height
        height = screen.height * 0.7;
    }

    posStr = "top=" + top + ", left=" + left + ", width=" + width + ", height=" + height + ", resizable=no";

    inputId = encodeURIComponent(inputId);

     var sign = "?";
     if ( pageUrl.indexOf('?') != -1 ) {
         sign = "&";
     }

    var queryString = sign + "inputId=" + inputId;
    for ( var i = 2; i < arguments.length; i++ ) {
        var param = "param=" + encodeURIComponent(arguments[i]);
        queryString += "&" + param;
    }

    pageUrl += queryString;
    openModalWindow(pageUrl, "browseInPopup", posStr + ",scrollbars=yes");
}

/**
 * Pastes value to input element with specified ID in specified window
 * str - string to paste
 * win - window where input is located
 * inputId - ID of input element to paste in
*/
function pasteSelected(str, win, inputId) {
    if ( win == null || !win.document.getElementById) {
        window.close();
        return;
    }
    var input = win.document.getElementById(inputId);
    input.value = str;
}


/* ======================================================================== */
/*                                   MENU                                   */
/* ======================================================================== */
function initMenu() {
    var menu = document.getElementById("menuList");
    if ( menu != null ) {
        var items = menu.getElementsByTagName("li");
        for (var i=0; i < items.length; i++) {
            items[i].firstChild.myIndex = i;
            // retain any existing onclick handlers from menu-config.xml
            if (items[i].firstChild.onclick) {
                items[i].firstChild.onclick=function() {
                    eval(items[this.myIndex].firstChild.getAttribute("onclick"));
                    setCookie("menuSelected", this.myIndex);
                    };
            } else {
                items[i].firstChild.onclick=function() {
                    setCookie("menuSelected", this.myIndex);
                };
            }
        }
        activateMenu();
    }
}

function activateMenu() {
    var menu = document.getElementById("menuList");
    var items = menu.getElementsByTagName("li");
    var activeMenu;
    var found = 0;
    for (var i=0; i < items.length; i++) {
        var url = items[i].firstChild.getAttribute("href");
        var current = document.location.toString();
        if (current.indexOf(url) != -1) {
            found++;
        }
    }

    // more than one found, use cookies
    if (found > 1) {
        var menuSelected = getCookie("menuSelected");
        if (items[menuSelected].parentNode.className == "submenu") {
            items[menuSelected].firstChild.className="selected";
            items[menuSelected].parentNode.parentNode.className="selected";
        } else {
            items[menuSelected].className+="selected";
        }
    } else {
        // only one found, match on URL
        for (var i=0; i < items.length; i++) {
            var url = items[i].firstChild.getAttribute("href");
            var current = document.location.toString();
            if (current.indexOf(url) != -1) {
                if (items[i].parentNode.className == "submenu") {
                    items[i].firstChild.className="selected";
                    items[i].parentNode.parentNode.className="selected";
                } else {
                    items[i].className+="selected";
                }
            }
        }
    }
}

/* ======================================================================== */
/*                             CONTEXT MENU                                 */
/* ======================================================================== */

var contextMenuSupported = isNN6 || isIE;

/**
 * Holds batch of context menus for different table rows
 */
function ContextMenuHolder() {
    this.menus = new Array();
    this.currentMenuIndex = 0;
}

/**
 * Adds new menu to batch
 * menu - menu to add
 */
ContextMenuHolder.prototype.addMenu = function(menu) {
    this.menus[this.menus.length] = menu;
}

/**
 * Show menu, according to specified index of table row
 * index - index of table row to show menu for. Can be omitted if there is no table
 * (and therefore holder holds only one menu)
 */
ContextMenuHolder.prototype.show = function(index, evt) {
    if ( index == null ) {
        index = 0;
    }
    var menu = this.menus[index];
    if ( menu ) {
        this.currentMenuIndex = index;
        // move menu to appropriate position
        menu.show();
        positionContextMenu(menu, evt);

        // menu held in a holder is a fake one
        // it exists in order to group all items and bound them to the single DHTML layer
        // so we must show all children (they are real menu items) which are not null
        for ( var i = 0; i < menu.childItems.length; i++ ) {
            var item = menu.childItems[i];
            if ( item != null ) {
                item.show();
            }
        }
    }
}

/**
 * Hides all menus, stored in this holder
 */
ContextMenuHolder.prototype.hide = function() {
    // all menus in holder are bounded to the same layer structure
    // (only content of child items is different)
    // so, it's enough to hide menus from the first row only
    var menu = this.menus[0];
    if ( menu ) {
        menu.hide();
        for ( var i = 0; i < menu.childItems.length; i++ ) {
            var item = menu.childItems[i];
            if ( item != null ) {
                item.hide();
            }
        }
    }
}

/**
 * Finds a menu item in holder by its item layer ID (the search is recursive).
 * Item is searched through current menu. If nothing was found, returns null.
 */
ContextMenuHolder.prototype.findItem = function(itemId) {
    var result = null;
    var menu = this.menus[this.currentMenuIndex];
    if ( menu ) {
        for ( var i = 0; i < menu.childItems.length; i++ ) {
            var item = menu.childItems[i];
            if ( item != null ) {
                result = item.findItem(itemId);
                if (result) {
                    return result;
                }
            }
        }
    }
}

/**
 * Represents item of context menu
 * id      - id of DHTML layer that represents this item
 * content - content to put in layer when menu is being shown
 * hidden  - whether this element is hidden (shouldn't be displayed)
 * All further params are treated as child items of this item and will be added to list of child items
 */
function ContextMenuItem(id, content, hidden) {
    this.id = id;
    this.content = content;
    this.hidden = hidden;
    this.parent = null;
    this.itemLayer = layer(this.id);
    if ( !this.itemLayer.exists() ) {
        return null;
    }
    this.contentLayer = layer(this.id + "__content");
    if ( !this.contentLayer.exists() ) {
        this.contentLayer = null;
    }
    this.childItemsLayer = layer(this.id + "__childItems");
    if ( !this.childItemsLayer.exists() ) {
        this.childItemsLayer = null;
    }
    this.childItems = new Array();

    // process extra arguments
    var args = ContextMenuItem.arguments;
    var count = args.length;
    if ( count > 3 ) {
        for ( var i = 0; i < count - 3; i++ ) {
            var childItem = args[i + 3];
            if ( childItem != null ) {
                childItem.parent = this;
            }
            this.childItems[i] = childItem;
        }
    }
}

/**
 * Shows this item
 */
ContextMenuItem.prototype.show = function() {
    if (!this.hidden) {
        this.itemLayer.show();
        this.itemLayer.css.display = 'block';
        if ( this.contentLayer != null ) {
            this.contentLayer.object.innerHTML = this.content;
            this.contentLayer.show();
        }
    }
}

/**
 * Hides this item
 */
ContextMenuItem.prototype.hide = function() {
    this.itemLayer.hide();
    this.itemLayer.css.display = 'none';
    if ( this.contentLayer != null ) {
        this.contentLayer.hide();
    }

    // hide all child items

    for ( var i = 0; i < this.childItems.length; i++ ) {
        var item = this.childItems[i];
        if ( item != null ) {
            item.hide();
        }
    }

}

/**
 * Finds menu item with given item layer ID among this menu item and its
 * descendants. If nothing was found, null is returned.
 */
ContextMenuItem.prototype.findItem = function(itemId) {
    if (this.id == itemId) {
        return this;
    }
    var result = null;
    for ( var i = 0; i < this.childItems.length; i++ ) {
        var item = this.childItems[i];
        if ( item != null ) {
            result = item.findItem(itemId);
            if (result) {
                return result;
            }
        }
    }
}

/**
 * Returns parent of this item (item that contains this item in its childItems
 * list) or null, if nothing was found.
 */
ContextMenuItem.prototype.getParent = function() {
    return this.parent;
}

/**
 * Positions submenu of this menu item.
 *
 * parentLayer -- this is layer of parent menu; needed to correctly position
 * submenu
 */
ContextMenuItem.prototype.positionSubmenu = function(parentLayer) {
    var parentLeft   = parentLayer.getAbsoluteLeft();
    var parentTop    = parentLayer.getAbsoluteTop();
    var parentWidth  = parentLayer.getWidth();
    var parentHeight = parentLayer.getHeight();
    var initialLeft   = this.itemLayer.getAbsoluteLeft();
    var initialTop    = this.itemLayer.getAbsoluteTop();
    var initialWidth  = this.itemLayer.getWidth();
    var initialHeight = this.itemLayer.getHeight();
    var relLeft = initialLeft - getScrollX();
    var relTop = initialTop - getScrollY();
    var winWidth = getWindowWidth();
    var winHeight = getWindowHeight();
    var atRight = (winWidth - initialLeft - initialWidth >= initialLeft - this.childItemsLayer.getWidth());
    var newLeft = 0;
    if (atRight) {
        newLeft = initialLeft + initialWidth;
    } else {
        newLeft = initialLeft - this.childItemsLayer.getWidth()/*initialWidth*/;
    }
    var newTop = initialTop/*initialTop - parentTop*/;
/*    alert('initialLeft='   + initialLeft   + ', ' +
          'initialTop='    + initialTop    + ', ' +
          'initialWidth='  + initialWidth  + ', ' +
          'initialHeight=' + initialHeight + ', ' +
          'relLeft='       + relLeft       + ', ' +
          'relTop='        + relTop        + ', ' +
          'winWidth='      + winWidth      + ', ' +
          'winHeight='     + winHeight     + ', ' +
          'atRight='       + atRight       + ', ' +
          'newLeft='       + newLeft       + ', ' +
          'this.childItemsLayer.getWidth()='       + this.childItemsLayer.getWidth()       + ', ' +
          'newTop='        + newTop);*/
    if (this.childItemsLayer) {
        this.childItemsLayer.moveTo(newLeft, newTop);
    }
}

// This is used to store all context menu layers to close them all when needed
var contextMenus = new Array();

/**
 * Positions given context menu accordingly to info about click event
 */
function positionContextMenu(menu, evt)
{
    var clientX = evt.clientX;
    var clientY = evt.clientY;
    var clientDx = getScrollX();
    var clientDy = getScrollY();
    var width  = menu.itemLayer.getWidth();
    var height = menu.itemLayer.getHeight();
    var windowWidth  = getWindowWidth();
    var windowHeight = getWindowHeight();
    var x = clientDx + ((clientX + width  > windowWidth)  ? (windowWidth  - width)  : clientX);
    var y = clientDy + ((clientY + height > windowHeight) ? (windowHeight - height) : clientY);
    x = (x < 0) ? 0 : x;
    y = (y < 0) ? 0 : y;
    menu.itemLayer.moveTo(x, y);
}

/**
 * Shows context menu held in given holder with given index
 */
function showContextMenu(menuHolder, evt, index) {
    if ( index == null ) {
        index = 0;
    }
    hideAllMenus();
    menuHolder.show(index, evt);

    return false; // It is done to prevent the appearance of system context menu
}

function hideContextMenu(menu) {
    return menu.hide();
}

/**
 * Hides all menus (context and dropdown)
 */
function hideAllMenus() {
    for (var i = 0; i < contextMenus.length; i++) {
        hideContextMenu(contextMenus[i]);
    }
    for (var i = 0; i < dropdownMenus.length; i++) {
        hideDropdownMenu(dropdownMenus[i]);
    }
}

/**
 * Event handler that is triggered when a user pressed mouse button on context
 * menu item
 */
function onMenuItemClick(source) {
    var itemId = source.parentNode.parentNode.id;
    var parentId = source.parentNode.parentNode.parentNode.id;
    var menuHolder = null;
    for (var i = 0; i < contextMenus.length; i++) {
        var foundItem = contextMenus[i].findItem(itemId);
        if (foundItem) {
            menuHolder = contextMenus[i];
            break;
        }
    }
    var isSubmenu = false;
    var item = null;
    if (menuHolder && itemId && parentId) {
        item = menuHolder.findItem(itemId);
        if (item) {
            isSubmenu = (item.childItems.length > 0);
        }
    }
    if (isSubmenu) {
        dontProcessDocumentClick = true; // this is done to keep menu shown
    } else {
        var url = source.getAttribute("url");
        var target = source.getAttribute("target");
        if (url && trim(url) != '') {
            if (target && trim(target) != '') {
                window.open(url, target);
            } else {
                window.location = url;
            }
        } else {
            dontProcessDocumentClick = true; // this is done to keep menu shown
        }
    }
}

/**
 * Activates menu item. Highlights it and, if it's a submenu, all other submenus
 * are being hidden and this one is shown.
 *
 * source -- html element that represents our item
 * className -- name of class to set (for highlighting)
 */
function activateContextMenuItem(source, className) {
    var itemId = source.parentNode.parentNode.id;
    var parentId = source.parentNode.parentNode.parentNode.id;
    var menuHolder = null;
    for (var i = 0; i < contextMenus.length; i++) {
        var foundItem = contextMenus[i].findItem(itemId);
        if (foundItem) {
            menuHolder = contextMenus[i];
            break;
        }
    }
    var isSubmenu = false;
    var item = null;
    if (menuHolder && itemId && parentId) {
        item = menuHolder.findItem(itemId);
        if (item) {
            isSubmenu = (item.childItems.length > 0);
        }
    }
    if (item != menuHolder.currentItem) {
        // entered new item
        var parent = item.getParent();
        if (parent) {
            for (var i = 0; i < parent.childItems.length; i++) {
                sibling = parent.childItems[i];
                if (sibling != item) {
                    sibling.childItemsLayer.hide();
                    for (var j = 0; j < sibling.childItems.length; j++) {
                        sibling.childItems[j].hide();
                    }
                }
            }
        }
        if (isSubmenu) {
            var parentLayer = layer(parentId);
            item.childItemsLayer.show();
            for ( var i = 0; i < item.childItems.length; i++ ) {
                var child = item.childItems[i];
                if ( child != null ) {
                    child.show();
                }
            }
            item.positionSubmenu(parentLayer);
        }
        menuHolder.currentItem = item;
    }
    swapClass(source, className);
}

/**
 * Deactivates menu item: just lowlights it.
 *
 * source -- html element that represents our item
 * className -- name of class to set (for lowlighting)
 */
function deactivateContextMenuItem(source, className) {
    swapClass(source, className);
}

/**
 * Moves elements with given IDs to BODY element (if it exists).
 *
 * ids - array with IDs of elements that are to be moved
 */
function moveElementsToBody(ids) {
    if (document.getElementsByTagName && document.getElementById) {
        var body = document.getElementsByTagName('body')[0];
        if (body) {
            for (var i = 0; i < ids.length; i++) {
                var id = ids[i];
                var elem = document.getElementById(id);
                if (elem) {
                    var parent = elem.parentNode;
                    if (parent) {
                        if (parent.removeChild && body.appendChild)
                        parent.removeChild(elem);
                        body.appendChild(elem);
                    }
                }
            }
        }
    }
}

// This array will contain IDs of all top-level DIVs that contain context menu
// structure
var contextMenuDivIds = new Array();

/**
 * Moves context menu DIVs to BODY element. This is done because those DIVs may
 * appear in arbitrary place in page and that may make a page non-valid, so
 * different problems may appear with some browsers.
 * This method is to be called on page load, so it's registered as onload
 * function.
 * List of IDs of DIVs to move is taken from contextMenuDivIds variable.
 */
function moveContextMenuDivsToBody() {
    moveElementsToBody(contextMenuDivIds);
}

/**
 * Processes event when user clicks with mouse somewhere in the document. If
 * dontProcessDocumentClick is true, this click is not processed.
 * Currently processing is just hiding all context menus.
 */
function processDocumentClick() {
    if (!dontProcessDocumentClick) {
        hideAllMenus();
    }
    dontProcessDocumentClick = false;
}

/**
 * Calls field update in current locale
 *
 * @param locale locale in which to work with content
 * @param contentFieldId ID of field to work with
 * @param redirectUrl where to redirect after updating field
 */
function doCallFieldUpdateInCurrentLocale(locale, contentFieldId, redirectUrl, ownerId, identifier, fieldType) {
    redirectUrl = encodeURIComponent(redirectUrl);
    var url = "/ows/core/contentFieldValue/callCreateOrUpdate.do?locale="
            + locale + '&contentFieldId=' + contentFieldId
            + '&redirectUrl=' + redirectUrl;
    if (ownerId != null) {
        url += '&ownerId=' + ownerId;
    }
    if (identifier != null) {
        url += '&identifier=' + identifier;
    }
    if (fieldType != null) {
        url += '&fieldType=' + fieldType;
    }
    window.location.href = url;
}

/**
 * Calls a page to choose locales for field update
 *
 * @param id          ID if field
 * @param redirectUrl where to redirect after updating field
 */
function doChooseLocalesForFieldUpdate(id, redirectUrl) {
    redirectUrl = encodeURIComponent(redirectUrl);
    var url = "/ows/core/contentField/view.do?"
            + 'id=' + id + '&redirectUrl=' + redirectUrl;
    window.location.href = url;
}

document.onclick = processDocumentClick;

var dontProcessDocumentClick = false;

/* ======================================================================== */
/*                            DROPDOWN MENU                                 */
/* ======================================================================== */

// Here dropdown menu holders are stored
var dropdownMenus = new Array();

/**
 * Hides dropdown menu (actually, only its submenus are being hidden, main menu
 * still remains)
 *
 * menu - dropdown menu holder
 */
function hideDropdownMenu(menu) {
    return menu.hide();
}

/**
 * Holds dropdown menu
 */
function DropdownMenuHolder() {
    this.menu = null;
    this.currentItem = null;
}

/**
 * Sets menu to batch
 * menu - menu to set
 */
DropdownMenuHolder.prototype.setMenu = function(menu) {
    this.menu = menu;
}

/**
 * Shows menu
 */
DropdownMenuHolder.prototype.show = function(evt) {
    var menu = this.menu;
    if ( menu ) {
        // move menu to appropriate position
        menu.show();
        positionContextMenu(menu, evt);

        for ( var i = 0; i < menu.childItems.length; i++ ) {
            var item = menu.childItems[i];
            if ( item != null ) {
                item.show();
            }
        }
    }
}

/**
 * Hides menu stored in this holder
 */
DropdownMenuHolder.prototype.hide = function() {
    var menu = this.menu;
    if ( menu ) {
        menu.hide(2);
    }
}

/**
 * Finds a menu item in holder by its item layer ID (the search is recursive).
 * If nothing was found, returns null.
 */
DropdownMenuHolder.prototype.findItem = function(itemId) {
    var result = null;
    var menu = this.menu;
    if ( menu ) {
        for ( var i = 0; i < menu.childItems.length; i++ ) {
            var item = menu.childItems[i];
            if ( item != null ) {
                result = item.findItem(itemId);
                if (result) {
                    return result;
                }
            }
        }
    }
}

/**
 * Represents item of dropdown menu
 * id      - id of DHTML layer that represents this item
 * All further params are treated as child items of this item and will be added to list of child items
 */
function DropdownMenuItem(id) {
    this.id = id;
    this.parent = null;
    this.itemLayer = layer(this.id);
    if ( !this.itemLayer.exists() ) {
//        return null;
        this.itemLayer = null;
    }
    this.contentLayer = layer(this.id + "__content");
    if ( !this.contentLayer.exists() ) {
        this.contentLayer = null;
    }
    this.childItemsLayer = layer(this.id + "__childItems");
    if ( !this.childItemsLayer.exists() ) {
        this.childItemsLayer = null;
    }
    this.childItems = new Array();

    // process extra arguments
    var args = DropdownMenuItem.arguments;
    var count = args.length;
    if ( count > 1 ) {
        for ( var i = 0; i < count - 1; i++ ) {
            var childItem = args[i + 1];
            if ( childItem != null ) {
                childItem.parent = this;
            }
            this.childItems[i] = childItem;
        }
    }
}

/**
 * Shows this item
 */
DropdownMenuItem.prototype.show = function() {
    if (this.itemLayer != null) {
        this.itemLayer.show();
        this.itemLayer.css.display = 'block';
    }
    if ( this.contentLayer != null ) {
        this.contentLayer.show();
    }
}

/**
 * Hides this item
 */
DropdownMenuItem.prototype.hide = function(notToHide) {
    if (notToHide == null) {
        notToHide = 0;
    }
    if (notToHide <= 0) {
        if (this.itemLayer != null) {
            this.itemLayer.hide();
            this.itemLayer.css.display = 'none';
        }
        if ( this.contentLayer != null ) {
            this.contentLayer.hide();
        }
    }
    if (notToHide <= 1) {
        this.childItemsLayer.hide();
    }

    // hide all child items

    for ( var i = 0; i < this.childItems.length; i++ ) {
        var item = this.childItems[i];
        if ( item != null ) {
            item.hide(notToHide-1);
        }
    }

}

/**
 * Finds menu item with given item layer ID among this menu item and its
 * descendants. If nothing was found, null is returned.
 */
DropdownMenuItem.prototype.findItem = function(itemId) {
    if (this.id == itemId) {
        return this;
    }
    var result = null;
    for ( var i = 0; i < this.childItems.length; i++ ) {
        var item = this.childItems[i];
        if ( item != null ) {
            result = item.findItem(itemId);
            if (result) {
                return result;
            }
        }
    }
}

/**
 * Returns parent of this item (item that contains this item in its childItems
 * list) or null, if nothing was found.
 */
DropdownMenuItem.prototype.getParent = function() {
    return this.parent;
}

/**
 * Positions submenu of this menu item.
 *
 * parentLayer -- this is layer of parent menu; needed to correctly position
 * submenu
 */
DropdownMenuItem.prototype.positionSubmenu = function(parentLayer) {
    var parentLeft   = parentLayer.getAbsoluteLeft();
    var parentTop    = parentLayer.getAbsoluteTop();
    var parentWidth  = parentLayer.getWidth();
    var parentHeight = parentLayer.getHeight();
    var initialLeft   = this.itemLayer.getAbsoluteLeft();
    var initialTop    = this.itemLayer.getAbsoluteTop();
    var initialWidth  = this.itemLayer.getWidth();
    var initialHeight = this.itemLayer.getHeight();
    var relLeft = initialLeft - getScrollX();
    var relTop = initialTop - getScrollY();
    var winWidth = getWindowWidth();
    var winHeight = getWindowHeight();
    var atRight = (winWidth - initialLeft - initialWidth >= initialLeft - this.childItemsLayer.getWidth());
    var newLeft = 0;
    if (atRight) {
        newLeft = initialLeft + initialWidth;
    } else {
        newLeft = initialLeft - this.childItemsLayer.getWidth()/*initialWidth*/;
    }
    var newTop = initialTop/*initialTop - parentTop*/;
/*    alert('initialLeft='   + initialLeft   + ', ' +
          'initialTop='    + initialTop    + ', ' +
          'initialWidth='  + initialWidth  + ', ' +
          'initialHeight=' + initialHeight + ', ' +
          'relLeft='       + relLeft       + ', ' +
          'relTop='        + relTop        + ', ' +
          'winWidth='      + winWidth      + ', ' +
          'winHeight='     + winHeight     + ', ' +
          'atRight='       + atRight       + ', ' +
          'newLeft='       + newLeft       + ', ' +
          'this.childItemsLayer.getWidth()='       + this.childItemsLayer.getWidth()       + ', ' +
          'newTop='        + newTop);*/
    if (this.childItemsLayer) {
        this.childItemsLayer.moveTo(newLeft, newTop);
    }
}

/**
 * Activates menu item. Highlights it and, if it's a submenu, all other submenus
 * are being hidden and this one is shown.
 * It is assumed that source element is located in TABLE>TBODY>TR>TD
 *
 * source -- html element that represents our item
 * className -- name of class to set (for highlighting)
 */
function activateDropdownMenuItem(source, className) {
    var itemId = source.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.id;
    var parentId = source.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.id;
    var menuHolder = null;
    for (var i = 0; i < dropdownMenus.length; i++) {
        var foundItem = dropdownMenus[i].findItem(itemId);
        if (foundItem) {
            menuHolder = dropdownMenus[i];
            break;
        }
    }
    var isSubmenu = false;
    var item = null;
    if (menuHolder && itemId && parentId) {
        item = menuHolder.findItem(itemId);
        if (item) {
            for (var i = 0; i < item.childItems.length; i++) {
                var child = item.childItems[i];
                if (child.itemLayer != null) {
                    isSubmenu = true;
                    break;
                }
            }
        }
    }
    if (!item) {
        return;
    }
    if (item != menuHolder.currentItem) {
        // entered new item
        var parent = item.getParent();
        if (parent) {
            for (var i = 0; i < parent.childItems.length; i++) {
                sibling = parent.childItems[i];
                if (sibling != item) {
                    sibling.childItemsLayer.hide();
                    for (var j = 0; j < sibling.childItems.length; j++) {
                        sibling.childItems[j].hide();
                    }
                }
            }
        }
        if (isSubmenu) {
            var parentLayer = layer(parentId);
            if (item.childItemsLayer) {
                item.childItemsLayer.show();
            }
            for ( var i = 0; i < item.childItems.length; i++ ) {
                var child = item.childItems[i];
                if ( child != null ) {
                    child.show();
                }
            }
            item.positionSubmenu(parentLayer);
        }
        menuHolder.currentItem = item;
    }
//    swapClass(source, className);
}

/**
 * Deactivates menu item: just lowlights it.
 *
 * source -- html element that represents our item
 * className -- name of class to set (for lowlighting)
 */
function deactivateDropdownMenuItem(source, className) {
//    swapClass(source, className);
}

/* ======================================================================== */
/*                             PRINT FUNCTIONS                              */
/* ======================================================================== */

var gAutoPrint = true; // Flag for whether or not to automatically call the print function
function printSpecial()
{
    if (document.getElementById != null)
    {
        var html = '<HTML>\n<HEAD>\n';
        if (document.getElementsByTagName != null)
        {
            var headTags = document.getElementsByTagName("head");
            if (headTags.length > 0) {
                var headCopy = headTags[0].cloneNode(true);
                var children = headCopy.childNodes;
                var toDelete = new Array();
                for (var i = 0; i < children.length; i++) {
                    var child = children[i];
                    if (child.tagName == 'SCRIPT') {
                        toDelete[toDelete.length] = child;
                    }
                }
                for (var i = 0; i < toDelete.length; i++) {
                    headCopy.removeChild(toDelete[i]);
                }
                html += headCopy.innerHTML;
            }
        }
        html += '\n<LI' + 'NK rel="stylesheet" type="text/css" media="all" href="/ows/styles/core/print.css" />\n';
        html += '\n</HE' + 'AD>\n<BODY class="print">\n';
        html += '\n<TABLE cellpadding="5" cellspacing="5" border="0">\n<TR><TD bgcolor="#FFFFFF">\n';
        var printReadyElem = document.getElementById("printReady");
        if (printReadyElem != null)
        {
                html += printReadyElem.innerHTML;
        }
        else
        {
            print();
            return;
        }
        html += '\n</TD></TR></TABLE>';
        html += '\n</BO' + 'DY>\n</HT' + 'ML>';

        var printWin = window.open("","printSpecial");
        printWin.document.open();
        printWin.document.write(html);
        printWin.document.close();
        if (gAutoPrint)
            printWin.print();
    }
    else
    {
        print();
    }
}

function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}

/* This function is used to change the style class of an element */
function swapClass(obj, newStyle) {
    obj.className = newStyle;
}

function isUndefined(value) {
    var undef;
    return value == undef;
}

/* Function for showing and hiding elements that use 'display:none' to hide */
function toggleDisplay(targetId)
{
    if (document.getElementById) {
        target = document.getElementById(targetId);
        if (target.style.display == "none"){
            target.style.display = "";
        } else {
            target.style.display = "none";
        }
    }
}

// toggle visibility
function toggleVisibility(targetId) {
    if (document.getElementById) {
        target = document.getElementById(targetId);
        if (target.style.visibility == "hidden"){
            target.style.visibility = "visible";
        } else {
            target.style.visibility = "hidden";
        }
    }
}

function checkAll(theForm) { // check all the checkboxes in the list
  for (var i=0;i<theForm.elements.length;i++) {
    var e = theForm.elements[i];
        var eName = e.name;
        if (eName != 'allbox' &&
            (e.type.indexOf("checkbox") == 0)) {
            e.checked = theForm.allbox.checked;
        }
    }
}

/* Function to clear a form of all it's values */
function clearForm(frmObj) {
    for (var i = 0; i < frmObj.length; i++) {
        var element = frmObj.elements[i];
        if(element.type.indexOf("text") == 0 ||
                element.type.indexOf("password") == 0) {
                    element.value="";
        } else if (element.type.indexOf("radio") == 0) {
            element.checked=false;
        } else if (element.type.indexOf("checkbox") == 0) {
            element.checked = false;
        } else if (element.type.indexOf("select") == 0) {
            for(var j = 0; j < element.length ; j++) {
                element.options[j].selected=false;
            }
            element.options[0].selected=true;
        }
    }
}

/* Function to get a form's values in a string */
function getFormAsString(frmObj) {
    var query = "";
    for (var i = 0; i < frmObj.length; i++) {
        var element = frmObj.elements[i];
        if (element.type.indexOf("checkbox") == 0 ||
            element.type.indexOf("radio") == 0) {
            if (element.checked) {
                query += element.name + '=' + escape(element.value) + "&";
            }
        } else if (element.type.indexOf("select") == 0) {
            for (var j = 0; j < element.length ; j++) {
                if (element.options[j].selected) {
                    query += element.name + '=' + escape(element.value) + "&";
                }
            }
        } else {
            query += element.name + '='
                  + escape(element.value) + "&";
        }
    }
    return query;
}

/* Function to hide form elements that show through
   the search form when it is visible */
function toggleForm(frmObj, iState) // 1 visible, 0 hidden
{
    for(var i = 0; i < frmObj.length; i++) {
        if (frmObj.elements[i].type.indexOf("select") == 0 || frmObj.elements[i].type.indexOf("checkbox") == 0) {
            frmObj.elements[i].style.visibility = iState ? "visible" : "hidden";
        }
    }
}

/* Helper function for re-ordering options in a select */
function opt(txt,val,sel) {
    this.txt=txt;
    this.val=val;
    this.sel=sel;
}

/* Function for re-ordering <option>'s in a <select> */
function move(list,to) {
    var total=list.options.length;
    index = list.selectedIndex;
    if (index == -1) return false;
    if (to == +1 && index == total-1) return false;
    if (to == -1 && index == 0) return false;
    to = index+to;
    var opts = new Array();
    for (i=0; i<total; i++) {
        opts[i]=new opt(list.options[i].text,list.options[i].value,list.options[i].selected);
    }
    tempOpt = opts[to];
    opts[to] = opts[index];
    opts[index] = tempOpt
    list.options.length=0; // clear

    for (i=0;i<opts.length;i++) {
        list.options[i] = new Option(opts[i].txt,opts[i].val);
        list.options[i].selected = opts[i].sel;
    }

    list.focus();
}

/*  This function is to select all options in a multi-valued <select> */
function selectAll(elementId) {
    var element = document.getElementById(elementId);
    len = element.length;
    if (len != 0) {
        for (i = 0; i < len; i++) {
            element.options[i].selected = true;
        }
    }
}

/**
 * Toggles all checkboxes on or off on specified form with possible exceptions.

 * form - form to process checkboxes in
 * checkId - element to verify toggle position. If provided element is checkbox and checked,
 * all checkboxes including this one (if it is from the same form), will be unchecked. If it is unchecked, all will be checked.
 * If provided element is not the checkbox, nothing will happen.
 * exceptions - array which contains names of checkboxes that should not be
 * affected
 */
function toggleAllCheckBoxes(form, checkId, exceptions) {
    if (exceptions == null) {
        exceptions = new Array();
    }

    var controlElement = document.getElementById(checkId);
    var toggle = true;
    if ( controlElement.type == "checkbox" ) {
        toggle = controlElement.checked;
    } else {
        return;
    }

    for ( i = 0; i < form.elements.length; i++ ) {
        var e = form.elements[i];
        if ( e.type == "checkbox" ) {
            var isException = false;
            for (var j = 0; j < exceptions.length; j++) {
                if (e.name == exceptions[j]) {
                    isException = true;
                    break;
                }
            }
            if (!isException) {
                e.checked = toggle;
            }
        }
    }
}

/**
 * Returns true, if form has checked boxes, except of one with specified ID
 * form - form to look in
 * checkId - ID of checkbox that must be ignored
 * errorMessage - Error message to show user if nothing was checked. If this attribute is omitted, nothing will be shown
 */
function hasCheckedBox(form, checkId, errorMessage) {

    for ( i = 0; i < form.elements.length; i++ ) {
        var e = form.elements[i];
        if ( checkId != null && e.id == checkId ) {
            continue;
        }
        if ( e.type == "checkbox" ) {
            if ( e.checked ) {
                return true;
            }
        }
    }

    // all checkboxes were proceeded, but none was checked

    if ( errorMessage ) {
        alert(errorMessage);
    }

    return false;
}

/* This function is used to select a checkbox by passing
 * in the checkbox id
 */
function toggleChoice(elementId) {
    var element = document.getElementById(elementId);
    if (element.checked) {
        element.checked = false;
    } else {
        element.checked = true;
    }
}

/* This function is used to select a radio button by passing
 * in the radio button id and index you want to select
 */
function toggleRadio(elementId, index) {
    var element = document.getElementsByName(elementId)[index];
    element.checked = true;
}


/* This function is used to open a pop-up window */
function openWindow(url, winTitle, winParams) {
    winName = window.open(url, winTitle, winParams);
    winName.focus();
}


/* This function is to open search results in a pop-up window */
function openSearch(url, winTitle) {
    var screenWidth = parseInt(screen.availWidth);
    var screenHeight = parseInt(screen.availHeight);

    var winParams = "width=" + screenWidth + ",height=" + screenHeight;
        winParams += ",left=0,top=0,toolbar,scrollbars,resizable,status=yes";

    openWindow(url, winTitle, winParams);
}

/* This function is used to set cookies */
function setCookie(name,value,expires,path,domain,secure) {
  document.cookie = name + "=" + escape (value) +
    ((expires) ? "; expires=" + expires.toGMTString() : "") +
    ((path) ? "; path=" + path : "") +
    ((domain) ? "; domain=" + domain : "") + ((secure) ? "; secure" : "");
}

/* This function is used to get cookies */
function getCookie(name) {
    var prefix = name + "="
    var start = document.cookie.indexOf(prefix)

    if (start==-1) {
        return null;
    }

    var end = document.cookie.indexOf(";", start+prefix.length)
    if (end==-1) {
        end=document.cookie.length;
    }

    var value=document.cookie.substring(start+prefix.length, end)
    return unescape(value);
}

/* This function is used to delete cookies */
function deleteCookie(name,path,domain) {
  if (getCookie(name)) {
    document.cookie = name + "=" +
      ((path) ? "; path=" + path : "") +
      ((domain) ? "; domain=" + domain : "") +
      "; expires=Thu, 01-Jan-70 00:00:01 GMT";
  }
}

// This function is for stripping leading and trailing spaces
function trim(str) {
    if (str != null) {
        var i;
        for (i=0; i<str.length; i++) {
            if (str.charAt(i)!=" ") {
                str=str.substring(i,str.length);
                break;
            }
        }

        for (i=str.length-1; i>=0; i--) {
            if (str.charAt(i)!=" ") {
                str=str.substring(0,i+1);
                break;
            }
        }

        if (str.charAt(0)==" ") {
            return "";
        } else {
            return str;
        }
    }
}

// This function is used by the login screen to validate user/pass
// are entered.
function validateRequired(form) {
    var bValid = true;
    var focusField = null;
    var i = 0;
    var fields = new Array();
    oRequired = new required();

    for (x in oRequired) {
        if ((form[oRequired[x][0]].type == 'text' || form[oRequired[x][0]].type == 'textarea' || form[oRequired[x][0]].type == 'select-one' || form[oRequired[x][0]].type == 'radio' || form[oRequired[x][0]].type == 'password') && form[oRequired[x][0]].value == '') {
           if (i == 0)
              focusField = form[oRequired[x][0]];

           fields[i++] = oRequired[x][1];

           bValid = false;
        }
    }

    if (fields.length > 0) {
       focusField.focus();
       alert(fields.join('\n'));
    }

    return bValid;
}

// This function is a generic function to create form elements
function createFormElement(element, type, name, id, value, parent) {
    var e = document.createElement(element);
    e.setAttribute("name", name);
    e.setAttribute("type", type);
    e.setAttribute("id", id);
    e.setAttribute("value", value);
    parent.appendChild(e);
}

function highlightFormElements() {
    // add input box highlighting
    addFocusHandlers(document.getElementsByTagName("input"));
    if (!isOpera) {
        addFocusHandlers(document.getElementsByTagName("select"));
        addFocusHandlers(document.getElementsByTagName("textarea"));
    }
}
var focusPostfix = '-focus';

function addFocusHandlers(elements) {
    for (i=0; i < elements.length; i++) {
        if (elements[i].type != "button" && elements[i].type != "submit" && elements[i].type != "hidden" && elements[i].type != "reset" && elements[i].type != "checkbox" && elements[i].id != "j_username" && elements[i] != "j_password"
            ) {
            if (isOpera && (elements[i].type == 'textarea' || elements[i].type == 'select')) {
                continue;
            }
            if (elements[i].className != '') {
                var oldClass;
                if (elements[i].type != "file") {
                    elements[i].onfocus = function() {
                        oldClass = this.className;
                        this.className = this.className + focusPostfix;
                    }
                    elements[i].onblur = function() {
                        this.className = oldClass;
                    };
                } else {
                    oldFileClass = elements[i].className;
                    elements[i].onclick = function() {
                        this.focus();
                    }
                    elements[i].onfocus = function() {
                        this.className = this.className + focusPostfix;
                    }
                    elements[i].onblur = function() {
                        this.className = oldFileClass;
                    }
                }
             } else {
                elements[i].onfocus = function() {
                    this.className = 'focus';
                };
                elements[i].onblur = function() {
                    this.className = '';
                };
            }
        }

    }
}

function addLoginFormFocusHandlers() {
    if (document.getElementById("j_username") != null) {
        var oldUsernameClass = document.getElementById("j_username").className;
        var newUsernameClass = document.getElementById("j_username").className + focusPostfix;
        var oldPasswordClass = document.getElementById("j_password").className;
        var newPasswordClass = document.getElementById("j_password").className + focusPostfix;
        document.getElementById("j_password").onfocus = function() {
            this.className = newPasswordClass;
        };
        document.getElementById("j_password").onblur = function() {
            this.className = oldPasswordClass;
        };
        document.getElementById("j_username").onfocus = function() {
            this.className = newUsernameClass;
        };
        document.getElementById("j_username").onblur = function() {
            this.className = oldUsernameClass;
        };
        if (getCookie("username") != null) {
            document.getElementById("j_username").value = getCookie("username");
            document.getElementById("j_password").className = newPasswordClass;
            document.getElementById("j_password").focus();
         } else {
            document.getElementById("j_username").className = newPasswordClass;
            document.getElementById("j_username").focus();
        }
    }
}

function addAnchorAndImagesEventListeners() {
    addEventListeners(document.getElementsByTagName("a"));
    addEventListeners(document.getElementsByTagName("img"));
}

function addEventListeners(elements) {
    for (i = 0; i < elements.length; i++) {
        elements[i].onmouseover = function() {
            setWindowStatus(this.title);
            if ( isOpera5 ){
                return false;
            } else {
                return true;
            }
        };
        elements[i].onmouseout = function() {
            restoreStatus();
            return true;
        };
    }
}

function setWindowStatus(msg) {
    if (msg == ''){restoreStatus();return true;};
    window.status = msg;
}

function restoreStatus() {
    window.status = window.defaultStatus;
}

function radio(clicked){
    var form = clicked.form;
    var checkboxes = form.elements[clicked.name];
    if (!clicked.checked || !checkboxes.length) {
        clicked.parentNode.parentNode.className="";
        return false;
    }

    for (i=0; i<checkboxes.length; i++) {
        if (checkboxes[i] != clicked) {
            checkboxes[i].checked=false;
            checkboxes[i].parentNode.parentNode.className="";
        }
    }

    // highlight the row
    clicked.parentNode.parentNode.className="over";
}

/*
 * Disables all buttons (actually 'submits') that refer to given form, if the second parameter is
 * true, else does nothing
 */
function disableButtons(form, disable) {
    if (disable) {
        for (var i  = 0; i < form.elements.length; i++) {
            var e = form.elements[i];
            if (e.type == "submit") {
                e.disabled = true;
            }
        }
    }
}

/*
 * Disables all buttons (actually 'submits') in all forms, if the parameter is
 * true, else does nothing
 */
function disableButtonsInAllForms(disable) {
    if (disable) {
        for (var i = 0; i < document.forms.length; i++) {
            var form = document.forms[i];
            if (form) {
                disableButtons(form, disable);
            }
        }
    }
}

/**
 * Sets value of element with given name on form with given name
 */
function setElementValue(formName, elementName, value) {
    var form = document.forms[formName];
    if (form) {
        var element = form.elements[elementName];
        if (element) {
            element.value = value;
        }
    }
}

/**
 * Tries to submit a form with a given name. Submits it if onsubmit is not defined
 * or if it doesn't return false.
 */
function submitForm(formName) {
    var form = document.forms[formName];
    if (form) {
        var valid = true;
        if (form.onsubmit) {
            valid = form.onsubmit();
        }
        if (valid != false) {
            form.submit();
        }
    }
}

/**
 * Returns ancestor of given node with given node name. If no such node exists,
 * null is returned.
 *
 * node - node, for which to search ancestor
 * nodeName - node name of ancestor
 */
function getAncestorWithNodeName(node, nodeName) {
    while (node.parentNode) {
        node = node.parentNode;
        if (node.nodeName == nodeName) {
            return node;
        }
    }
    return null;
}

/**
 * Returns a node that:
 * 1. is ancestor of 'descendant'
 * 2. is descendant of 'ancestor'
 * 3. has name 'nodeName'
 * 4. has class 'className'
 * The innermost node that satisfies to all conditions is returned. If no such
 * found, null is returned.
 * 'ancestor' is assumed to be an ancestor of 'descendant'
 */
function getNodeBetweenNodesWithNameAndClass(ancestor, descendant, nodeName, className) {
    var result = null;
    var node = descendant;
    do {
        node = node.parentNode;
        if (!node) {
            // reached top
            break;
        }
        if (node == ancestor) {
            // reached ancestor, so nothing was found
            break;
        }
        if (node.nodeName == nodeName && node.className == className) {
            result = node;
            break;
        }
    } while (true);
    return result;
}

/**
 * Redirects browser to given URL
 */
function redirect(url) {
    window.location = url;
}

/**
 * Decides whether we need to redirect user or not (latter is in case if click
 * was made on element inside TD with class "defaultCursorCell" or on link)
 */
function whetherNeedToRedirect(evt, tr) {
    var target = null;
    if (evt.srcElement) {
        target = evt.srcElement;
    } else if (evt.target) {
        target = evt.target;
    }
    if (target) {
        var td = null;
        if (target.tagName == 'TD' && target.className == 'defaultCursorCell') {
            td = target;
        } else {
            td = getNodeBetweenNodesWithNameAndClass(tr, target, 'TD', 'defaultCursorCell');
        }
        if (td == null || td.className != 'defaultCursorCell') {
//            return !whetherElementIsLinkOrInsideIt(target);
            return true;
        } else {
            return false;
        }
    }
    return false;
}

/**
 * Figures out whether given element is inside a link (A tag) or link itself.
 */
function whetherElementIsLinkOrInsideIt(target) {
    var aTagName = 'A';
    return target.tagName == aTagName || whetherElementIsInsideTag(target, aTagName);
}

/**
 * Figures out whether element is inside a tag with given name.
 */
function whetherElementIsInsideTag(element, tagName) {
    var e = element;
    var result = false;
    while (e.parentNode != null) {
        e = e.parentNode;
        if (e.tagName == tagName) {
            result = true;
            break;
        }
    }
    return result;
}

/**
 * Dispatches click on TR of grid. If the click was inside TD with class
 * "defaultCursorCell" or link, then no action is performed, else redirect to
 * given URL is done.
 *
 * evt - event object
 * tr  - current TR; should be used as 'this'
 * url - where to redirect to
 */
function dispatchGridTrClick(evt, tr, url) {
    if (whetherNeedToRedirect(evt, tr)) {
        redirect(url);
    }
}

/**
 * Refreshes info in auxiliary info div (for example, it may display selected
 * role description)
 *
 * selectId - id of SELECT element for which aux info will be shown
 * auxId    - id of element which will display aux info
 * ar       - assoc array (title->description), where title is element in a
 * SELECT and description is its description
 */
function renewAuxInfo(selectId, auxId, ar) {
    var e = document.getElementById(selectId);
    if (e) {
        var selectedDescription = ar[e.options[e.selectedIndex].text];
        document.getElementById(auxId).innerHTML = selectedDescription;
    }
}

/**
 * Removes a DIV generated by RTEditor from document by its field name.
 *
 * fieldName - name of field which DIV should be removed
 */
function removeRTEDiv(fieldName) {
    var field = document.getElementById(fieldName);
    if (field) {
        var rteDiv = field.parentNode;
        if (rteDiv) {
            var parent = rteDiv.parentNode;
            if (parent) {
                parent.removeChild(rteDiv);
            }
        }
    }
}

/**
 * Represents a slide-show.
 * 
 * aElem - ID of A element
 * imgElem - ID of IMG element
 * interval - rotation interval in milliseconds
 * varname - name of variable by which slideshow object will be accessible
 */
function Slideshow(aElem, imgElem, titleElem, countElem, interval, varname) {
    this.aElem = aElem;
    this.imgElem = imgElem;
    this.titleElem = titleElem;
    this.countElem = countElem;
    this.interval = interval;
    this.varname = varname;
    this.images = new Array();
    this.current = 0;
    this.timerID = null;
    this.largestPreloadedIndex = 0;
    return this;
}

/**
 * Adds an image to slide-show.
 *
 * src - image src
 * link - image link
 * descr - image description
 */
Slideshow.prototype.addImage = function(src, link, descr) {
    this.images[this.images.length] = new SlideshowImage(src, link, descr);
}

/**
 * Changes current image.
 *
 * index - number of image to show
 */
Slideshow.prototype.changeImage = function(index) {
    var image = this.images[index];
    var a = document.getElementById(this.aElem);
    var img = document.getElementById(this.imgElem);
    var title = document.getElementById(this.titleElem);
    var count = document.getElementById(this.countElem);
    a.href = image.link;
    a.title = image.descr;
    img.src = image.src;
    img.alt = image.descr;
    title.innerHTML = image.descr;
    count.innerHTML = index + 1;
    // preload next image if needed
    if (index + 1 > this.largestPreloadedIndex && index + 1 <= this.images.length - 1) {
        image = this.images[index + 1];
        preloadImage(image.src);
        this.largestPreloadedIndex = index + 1;
    }
}

/**
 * Schedules image renewal.
 */
Slideshow.prototype.schedule = function() {
    if (this.images.length > 0) {
        this.timerID = setInterval(this.varname + '.next()', this.interval);
    }
}

/**
 * Cancels auto-rotating.
 */
Slideshow.prototype.clearSchedule = function() {
    if (this.timerID != null) {
        clearInterval(this.timerID);
        this.timerID = null;
    }
}

/**
 * Calculates next image index.
 */
Slideshow.prototype.getNextIndex = function() {
    return this.current == this.images.length - 1 ? 0 : this.current + 1;
}

/**
 * Calculates prev image index.
 */
Slideshow.prototype.getPrevIndex = function() {
    return this.current == 0 ? this.images.length - 1 : this.current - 1;
}

/**
 * Starts the slideshow.
 */
Slideshow.prototype.start = function() {
    if (this.images.length > 0) {
        this.changeImage(0);
        this.schedule();
    }
}

/**
 * Renews image - selects next image cyclically.
 */
Slideshow.prototype.next = function() {
    if (this.images.length > 0) {
        var next = this.getNextIndex();
        this.changeImage(next);
        this.current = next;
    }
}

/**
 * Renews image - selects prev image cyclically.
 */
Slideshow.prototype.prev = function() {
    if (this.images.length > 0) {
        var prev = this.getPrevIndex();
        this.changeImage(prev);
        this.current = prev;
    }
}

/**
 * Manually selects next image. Auto-rotating is turned off.
 *
 */
Slideshow.prototype.manualNext = function() {
    this.clearSchedule();
    this.next();
    return false;
}

/**
 * Manually selects prev image. Auto-rotating is turned off.
 *
 */
Slideshow.prototype.manualPrev = function() {
    this.clearSchedule();
    this.prev();
    return false;
}

/**
 * Represents a slide-show image.
 *
 * src - image src
 * link - image link
 * descr - image description
 */
function SlideshowImage(src, link, descr) {
    this.src = src;
    this.link = link;
    this.descr = descr;
    return this;
}


// Show the document's title on the status bar
window.defaultStatus=document.title;
