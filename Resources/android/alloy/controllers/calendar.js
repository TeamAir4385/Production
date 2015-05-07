function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function doOpen(e) {
        var actionBar = e.source.activity.actionBar;
        if (actionBar) {
            actionBar.displayHomeAsUp = true;
            actionBar.onHomeIconItemSelected = function() {
                e.source.close();
            };
            e.source.activity.invalidateOptionsMenu();
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "calendar";
    if (arguments[0]) {
        {
            __processArg(arguments[0], "__parentSymbol");
        }
        {
            __processArg(arguments[0], "$model");
        }
        {
            __processArg(arguments[0], "__itemTemplate");
        }
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.calendar = Ti.UI.createWindow({
        id: "calendar",
        title: "Upcoming Events"
    });
    $.__views.calendar && $.addTopLevelView($.__views.calendar);
    doOpen ? $.__views.calendar.addEventListener("open", doOpen) : __defers["$.__views.calendar!open!doOpen"] = true;
    var __alloyId2 = [];
    $.__views.__alloyId3 = {
        properties: {
            title: "List item 1",
            id: "__alloyId3"
        }
    };
    __alloyId2.push($.__views.__alloyId3);
    $.__views.__alloyId4 = {
        properties: {
            title: "List item 2",
            id: "__alloyId4"
        }
    };
    __alloyId2.push($.__views.__alloyId4);
    $.__views.__alloyId5 = {
        properties: {
            title: "List item 3",
            id: "__alloyId5"
        }
    };
    __alloyId2.push($.__views.__alloyId5);
    $.__views.__alloyId0 = Ti.UI.createListSection({
        id: "__alloyId0"
    });
    $.__views.__alloyId0.items = __alloyId2;
    var __alloyId6 = [];
    __alloyId6.push($.__views.__alloyId0);
    $.__views.list = Ti.UI.createListView({
        sections: __alloyId6,
        id: "list"
    });
    $.__views.calendar.add($.__views.list);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    $.calendar.open();
    __defers["$.__views.calendar!open!doOpen"] && $.__views.calendar.addEventListener("open", doOpen);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;