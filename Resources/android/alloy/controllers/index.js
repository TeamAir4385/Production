function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function __alloyId21() {
        $.__views.index.removeEventListener("open", __alloyId21);
        if ($.__views.index.activity) ; else {
            Ti.API.warn("You attempted to access an Activity on a lightweight Window or other");
            Ti.API.warn("UI component which does not have an Android activity. Android Activities");
            Ti.API.warn("are valid with only windows in TabGroups or heavyweight Windows.");
        }
    }
    function __alloyId25() {
        $.__views.index.removeEventListener("open", __alloyId25);
        if ($.__views.index.activity) $.__views.index.activity.onCreateOptionsMenu = function(e) {
            var __alloyId24 = {
                title: "Settings",
                icon: "/images/overflow.png",
                showAsAction: Ti.Android.SHOW_AS_ACTION_IF_ROOM,
                id: "__alloyId23"
            };
            $.__views.__alloyId23 = e.menu.add(_.pick(__alloyId24, Alloy.Android.menuItemCreateArgs));
            $.__views.__alloyId23.applyProperties(_.omit(__alloyId24, Alloy.Android.menuItemCreateArgs));
            clickedSettings ? $.__views.__alloyId23.addEventListener("click", clickedSettings) : __defers["$.__views.__alloyId23!click!clickedSettings"] = true;
        }; else {
            Ti.API.warn("You attempted to attach an Android Menu to a lightweight Window");
            Ti.API.warn("or other UI component which does not have an Android activity.");
            Ti.API.warn("Android Menus can only be opened on TabGroups and heavyweight Windows.");
        }
    }
    function clickedSettings() {
        var settingsController = Alloy.createController("settings");
        var win = settingsController.getView();
        Alloy.Globals.navgroup ? Alloy.Globals.navgroup.openWindow(win) : win.open();
    }
    function calendar() {
        Alloy.createController("calendar").getView();
    }
    function contactUs() {
        Alloy.createController("contact").getView();
    }
    function deviceTokenSuccess(e) {
        alert("please work" + e.deviceToken);
        deviceToken = e.deviceToken;
        subscribeToChannel(deviceToken);
    }
    function deviceTokenError(e) {
        alert("Failed to register for push notifications! " + e.error);
    }
    function subscribeToChannel(deviceToken) {
        Cloud.PushNotifications.subscribeToken({
            device_token: deviceToken,
            channel: "news_alerts",
            type: "android"
        }, function(e) {
            alert(e.success ? "Subscribed" : "Error:\n" + (e.error && e.message || JSON.stringify(e)));
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
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
    $.__views.index = Ti.UI.createWindow({
        backgroundColor: "#222222",
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    $.__views.index.addEventListener("open", __alloyId21);
    $.__views.index.addEventListener("open", __alloyId25);
    $.__views.corn = Ti.UI.createImageView({
        top: "5%",
        width: 195,
        height: 265,
        id: "corn",
        image: "/images/logo.png"
    });
    $.__views.index.add($.__views.corn);
    $.__views.cobButton = Ti.UI.createButton({
        width: 65,
        height: 65,
        top: "50%",
        left: "10%",
        backgroundImage: "/images/browser.png",
        id: "cobButton"
    });
    $.__views.index.add($.__views.cobButton);
    $.__views.calendarButton = Ti.UI.createButton({
        width: 65,
        height: 65,
        top: "50%",
        backgroundImage: "/images/calendar.png",
        id: "calendarButton"
    });
    $.__views.index.add($.__views.calendarButton);
    calendar ? $.__views.calendarButton.addEventListener("click", calendar) : __defers["$.__views.calendarButton!click!calendar"] = true;
    $.__views.contactButton = Ti.UI.createButton({
        width: 65,
        height: 65,
        top: "50%",
        right: "10%",
        backgroundImage: "/images/contact.png",
        id: "contactButton"
    });
    $.__views.index.add($.__views.contactButton);
    contactUs ? $.__views.contactButton.addEventListener("click", contactUs) : __defers["$.__views.contactButton!click!contactUs"] = true;
    $.__views.facebookButton = Ti.UI.createButton({
        width: 65,
        height: 65,
        top: "75%",
        left: "25%",
        backgroundImage: "/images/facebook.png",
        id: "facebookButton"
    });
    $.__views.index.add($.__views.facebookButton);
    $.__views.youtubeButton = Ti.UI.createButton({
        width: 65,
        height: 65,
        top: "75%",
        right: "25%",
        backgroundImage: "/images/youtube.png",
        id: "youtubeButton"
    });
    $.__views.index.add($.__views.youtubeButton);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    $.cobButton.addEventListener("click", function() {
        Ti.Platform.openURL("http://www.wtamu.edu/academics/college-business.aspx");
    });
    $.facebookButton.addEventListener("click", function() {
        Ti.Platform.openURL("http://www.facebook.com/WTAMUCOB");
    });
    $.youtubeButton.addEventListener("click", function() {
        Ti.Platform.openURL("https://www.youtube.com/channel/UCENCoEEcsLJvyWaMjonwFuQ");
    });
    var CloudPush = require("ti.cloudpush");
    var Cloud = require("ti.cloud");
    var deviceToken = null;
    CloudPush.retrieveDeviceToken({
        success: deviceTokenSuccess,
        error: deviceTokenError
    });
    CloudPush.addEventListener("callback", function(evt) {
        alert("Notification received: " + evt.payload);
    });
    $.index.open();
    __defers["$.__views.__alloyId23!click!clickedSettings"] && $.__views.__alloyId23.addEventListener("click", clickedSettings);
    __defers["$.__views.calendarButton!click!calendar"] && $.__views.calendarButton.addEventListener("click", calendar);
    __defers["$.__views.contactButton!click!contactUs"] && $.__views.contactButton.addEventListener("click", contactUs);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;