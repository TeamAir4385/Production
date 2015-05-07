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
    $.__views.__alloyId1 = Ti.UI.createView({
        backgroundColor: "#DDD",
        height: Ti.UI.SIZE,
        id: "__alloyId1"
    });
    $.__views.__alloyId2 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        top: 30,
        color: "black",
        font: {
            fontSize: 20,
            fontWeight: "bold"
        },
        text: "Calendar Events",
        id: "__alloyId2"
    });
    $.__views.__alloyId1.add($.__views.__alloyId2);
    var __alloyId3 = {};
    var __alloyId6 = [];
    var __alloyId7 = {
        type: "Ti.UI.Label",
        bindId: "symbol",
        properties: {
            width: Ti.UI.SIZE,
            height: Ti.UI.SIZE,
            top: 30,
            color: "black",
            font: {
                fontSize: 34,
                fontWeight: "bold"
            },
            left: 0,
            bindId: "symbol"
        }
    };
    __alloyId6.push(__alloyId7);
    var __alloyId8 = {
        type: "Ti.UI.View",
        childTemplates: function() {
            var __alloyId9 = [];
            var __alloyId10 = {
                type: "Ti.UI.Label",
                bindId: "name",
                properties: {
                    width: Ti.UI.SIZE,
                    height: Ti.UI.SIZE,
                    top: 4,
                    color: "black",
                    font: {
                        fontSize: 16,
                        fontWeight: "bold"
                    },
                    left: 0,
                    textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
                    bindId: "name"
                }
            };
            __alloyId9.push(__alloyId10);
            var __alloyId11 = {
                type: "Ti.UI.Label",
                bindId: "details",
                properties: {
                    width: Ti.UI.SIZE,
                    height: Ti.UI.SIZE,
                    top: 4,
                    color: "black",
                    font: {
                        fontSize: 16,
                        fontWeight: "bold"
                    },
                    left: 0,
                    textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
                    bindId: "details"
                }
            };
            __alloyId9.push(__alloyId11);
            var __alloyId12 = {
                type: "Ti.UI.View",
                childTemplates: function() {
                    var __alloyId13 = [];
                    var __alloyId15 = {
                        type: "Ti.UI.Label",
                        properties: {
                            width: Ti.UI.SIZE,
                            height: Ti.UI.SIZE,
                            top: 30,
                            color: "#999",
                            font: {
                                fontSize: 10,
                                fontWeight: "bold"
                            },
                            text: "Start Date: "
                        }
                    };
                    __alloyId13.push(__alloyId15);
                    var __alloyId16 = {
                        type: "Ti.UI.Label",
                        bindId: "start_time",
                        properties: {
                            width: 30,
                            height: Ti.UI.SIZE,
                            top: 30,
                            color: "black",
                            font: {
                                fontSize: 10,
                                fontWeight: "bold"
                            },
                            left: 15,
                            bindId: "start_time"
                        }
                    };
                    __alloyId13.push(__alloyId16);
                    return __alloyId13;
                }(),
                properties: {
                    left: 0,
                    right: 0,
                    layout: "horizontal"
                }
            };
            __alloyId9.push(__alloyId12);
            return __alloyId9;
        }(),
        properties: {
            top: 0,
            left: 65,
            right: 65,
            bottom: 0,
            layout: "vertical"
        }
    };
    __alloyId6.push(__alloyId8);
    var __alloyId17 = {
        type: "Ti.UI.ImageView",
        bindId: "image",
        properties: {
            bindId: "image"
        }
    };
    __alloyId6.push(__alloyId17);
    var __alloyId5 = {
        properties: {
            name: "elementTemplate"
        },
        childTemplates: __alloyId6
    };
    __alloyId3["elementTemplate"] = __alloyId5;
    $.__views.listItemContainer = Ti.UI.createListSection({
        id: "listItemContainer"
    });
    var __alloyId19 = [];
    __alloyId19.push($.__views.listItemContainer);
    $.__views.eventList = Ti.UI.createListView({
        sections: __alloyId19,
        templates: __alloyId3,
        headerView: $.__views.__alloyId1,
        id: "eventList",
        defaultItemTemplate: "elementTemplate"
    });
    $.__views.calendar.add($.__views.eventList);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var Cloud = require("ti.cloud");
    Cloud.debug = true;
    Cloud.Events.search({
        name: "Party"
    }, function(e) {
        if (e.success) {
            var listViewItems = [];
            for (var i = 0; i < e.events.length; i++) {
                {
                    e.events[i];
                }
                listViewItems.push({
                    name: {
                        text: e.events[i].name
                    },
                    start_time: {
                        text: e.events[i].start_time
                    },
                    details: {
                        text: e.events[i].details
                    }
                });
            }
            $.calendar.open();
        } else alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
        $.eventList.sections[0].setItems(listViewItems);
    });
    __defers["$.__views.calendar!open!doOpen"] && $.__views.calendar.addEventListener("open", doOpen);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;