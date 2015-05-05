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
    this.__controllerPath = "contact";
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
    $.__views.contact = Ti.UI.createWindow({
        backgroundColor: "#222",
        id: "contact",
        title: "Contact Us"
    });
    $.__views.contact && $.addTopLevelView($.__views.contact);
    doOpen ? $.__views.contact.addEventListener("open", doOpen) : __defers["$.__views.contact!open!doOpen"] = true;
    $.__views.__alloyId1 = Ti.UI.createLabel({
        color: "#fff",
        text: "Please feel free to contact us if you are interested or have any questions!",
        top: "15",
        left: "10",
        right: "10",
        id: "__alloyId1"
    });
    $.__views.contact.add($.__views.__alloyId1);
    $.__views.lvContainer = Ti.UI.createView({
        top: "65",
        width: "280dp",
        height: Ti.UI.SIZE,
        layout: "vertical",
        borderColor: "orange",
        borderWidth: 0,
        id: "lvContainer"
    });
    $.__views.contact.add($.__views.lvContainer);
    $.__views.fname = Ti.UI.createTextField({
        autocapitalization: Ti.UI.TEXT_AUTOCAPITALIZATION_NONE,
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE,
        autocorrect: false,
        top: "6dp",
        left: "4dp",
        bottom: "2dp",
        right: "4dp",
        paddingLeft: "4dp",
        backgroundColor: "#fff",
        color: "#000",
        width: "260dp",
        height: "40dp",
        border: 1,
        borderColor: "#000",
        id: "fname",
        hintText: "First Name"
    });
    $.__views.lvContainer.add($.__views.fname);
    $.__views.lname = Ti.UI.createTextField({
        autocapitalization: Ti.UI.TEXT_AUTOCAPITALIZATION_NONE,
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE,
        autocorrect: false,
        top: "6dp",
        left: "4dp",
        bottom: "2dp",
        right: "4dp",
        paddingLeft: "4dp",
        backgroundColor: "#fff",
        color: "#000",
        width: "260dp",
        height: "40dp",
        border: 1,
        borderColor: "#000",
        id: "lname",
        hintText: "Last Name"
    });
    $.__views.lvContainer.add($.__views.lname);
    $.__views.email = Ti.UI.createTextField({
        autocapitalization: Ti.UI.TEXT_AUTOCAPITALIZATION_NONE,
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE,
        autocorrect: false,
        top: "6dp",
        left: "4dp",
        bottom: "2dp",
        right: "4dp",
        paddingLeft: "4dp",
        backgroundColor: "#fff",
        color: "#000",
        width: "260dp",
        height: "40dp",
        border: 1,
        borderColor: "#000",
        id: "email",
        hintText: "Email Address"
    });
    $.__views.lvContainer.add($.__views.email);
    $.__views.phone = Ti.UI.createTextField({
        autocapitalization: Ti.UI.TEXT_AUTOCAPITALIZATION_NONE,
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE,
        autocorrect: false,
        top: "6dp",
        left: "4dp",
        bottom: "2dp",
        right: "4dp",
        paddingLeft: "4dp",
        backgroundColor: "#fff",
        color: "#000",
        width: "260dp",
        height: "40dp",
        border: 1,
        borderColor: "#000",
        id: "phone",
        hintText: "Phone Number"
    });
    $.__views.lvContainer.add($.__views.phone);
    $.__views.submit = Ti.UI.createButton({
        id: "submit",
        title: "Submit",
        color: "#fff",
        bottom: "150"
    });
    $.__views.contact.add($.__views.submit);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    Ti.UI.currentWindow;
    Titanium.Network.createHTTPClient();
    $.submit.addEventListener("click", function() {
        var emailDialog = Titanium.UI.createEmailDialog();
        emailDialog.setSubject("I'm curious about Going Green!");
        emailDialog.setToRecipients([ "foo@gmail.com" ]);
        emailDialog.setMessageBody("<b>I'm curious about what the College of Business has to offer!\n\nFirst Name: " + $.fname.value + "\nLast Name : " + $.lname.value + "\nEmail: " + $.email.value + "\nPhone number: " + $.phone.value + "</b>å");
        emailDialog.setHtml(true);
        emailDialog.setBarColor("#336699");
        emailDialog.addEventListener("complete", function(e) {
            e.result == emailDialog.SENT ? "android" != Ti.Platform.osname && alert("message was sent") : alert("message was not sent. result = " + e.result);
        });
        emailDialog.open();
    });
    $.contact.open();
    __defers["$.__views.contact!open!doOpen"] && $.__views.contact.addEventListener("open", doOpen);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;