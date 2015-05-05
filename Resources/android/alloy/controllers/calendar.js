function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function showCalendars(calendars) {
        for (var i = 0; i < calendars.length; i++) Ti.API.info(calendars[i].name);
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
    $.__views.calendar = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "calendar"
    });
    $.__views.calendar && $.addTopLevelView($.__views.calendar);
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
            right: 0,
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
    Ti.API.info("ALL CALENDARS:");
    showCalendars(Ti.Calendar.allCalendars);
    Ti.API.info("SELECTABLE CALENDARS:");
    showCalendars(Ti.Calendar.selectableCalendars);
    var CALENDAR_TO_USE = 3;
    var calendar = Ti.Calendar.getCalendarById(CALENDAR_TO_USE);
    var eventBegins = new Date(2010, 11, 26, 12, 0, 0);
    var eventEnds = new Date(2010, 11, 26, 14, 0, 0);
    var details = {
        title: "Do some stuff",
        description: "I'm going to do some stuff at this time.",
        begin: eventBegins,
        end: eventEnds
    };
    var event = calendar.createEvent(details);
    var reminderDetails = {
        minutes: 10,
        method: Ti.Calendar.METHOD_EMAIL
    };
    event.createReminder(reminderDetails);
    $.calendar.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;