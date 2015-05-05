function pushRegisterError(_data, _callback) {
    _callback && _callback({
        success: false,
        error: _data
    });
}

function pushRegisterSuccess(_userId, _data, _callback) {
    var token = _data.deviceToken;
    Cloud.PushNotifications.unsubscribe({
        device_token: Ti.App.Properties.getString("android.deviceToken"),
        user_id: _userId,
        type: "android"
    }, function() {
        exports.subscribe("friends", token, function(_resp1) {
            _callback(_resp1.success ? {
                success: true,
                msg: "Subscribe to channel: friends",
                data: _data
            } : {
                success: false,
                error: _resp2.data,
                msg: "Error Subscribing to channel: friends"
            });
        });
    });
}

var Cloud = require("ti.cloud");

var AndroidPush = require("ti.cloudpush");

exports.initialize = function(_user, _pushRcvCallback, _callback) {
    USER_ID = _user.get("id");
    if ("Simulator" === Ti.Platform.model) {
        alert("Push ONLY works on Devices!");
        return;
    }
    var userId = _user.get("id");
    if (userId) {
        AndroidPush.clearStatus();
        AndroidPush.debug = true;
        AndroidPush.showTrayNotificationsWhenFocused = true;
        AndroidPush.retrieveDeviceToken({
            success: function(_data) {
                Ti.API.debug("recieved device token", _data.deviceToken);
                AndroidPush.addEventListener("callback", _pushRcvCallback);
                AndroidPush.enabled = true;
                AndroidPush.focusAppOnPush = false;
                pushRegisterSuccess(userId, _data, function(_response) {
                    Ti.App.Properties.setString("android.deviceToken", _data.deviceToken);
                    _callback(_response);
                });
            },
            error: function(_data) {
                AndroidPush.enabled = false;
                AndroidPush.focusAppOnPush = false;
                AndroidPush.removeEventListener("callback", _pushRcvCallback);
                pushRegisterError(_data, _callback);
            }
        });
    } else _callback && _callback({
        success: false,
        msg: "Must have User for Push Notifications"
    });
};

exports.subscribe = function(_channel, _token, _callback) {
    Cloud.PushNotifications.subscribe({
        channel: _channel,
        device_token: _token,
        type: "android"
    }, function(_event) {
        var msgStr = "Subscribed to " + _channel + " Channel";
        Ti.API.debug(msgStr + ": " + _event.success);
        _callback(_event.success ? {
            success: true,
            error: null,
            msg: msgStr
        } : {
            success: false,
            error: _event.data,
            msg: "Error Subscribing to All Channels"
        });
    });
};

exports.pushUnsubscribe = function(_data, _callback) {
    Cloud.PushNotifications.unsubscribe(_data, function(e) {
        if (e.success) {
            Ti.API.debug("Unsubscribed from: " + _data.channel);
            _callback({
                success: true,
                error: null
            });
        } else {
            Ti.API.error("Error unsubscribing: " + _data.channel);
            Ti.API.error(JSON.stringify(e, null, 2));
            _callback({
                success: false,
                error: e
            });
        }
    });
};

exports.sendPush = function(_params, _callback) {
    if (null === Alloy.Globals.pushToken) {
        _callback({
            success: false,
            error: "Device Not Registered For Notifications!"
        });
        return;
    }
    var data = {
        channel: "friends",
        payload: _params.payload
    };
    _params.friends && (data.friends = _params.friends);
    _params.to_ids && (data.to_ids = _params.to_ids);
    Cloud.PushNotifications.notify(data, function(e) {
        if (e.success) _callback({
            success: true
        }); else {
            var eStr = e.error && e.message || JSON.stringify(e);
            Ti.API.error(eStr);
            _callback({
                success: false,
                error: eStr
            });
        }
    });
};

exports.getChannels = function(_user, _callback) {
    var xhr = Ti.Network.createHTTPClient();
    var isProduction = "production" === Titanium.App.deployType;
    var acsKeyName = "acs-api-key-" + (isProduction ? "production" : "development");
    var url = "https://api.cloud.appcelerator.com/v1/push_notification/query.json?key=";
    url += Ti.App.Properties.getString(acsKeyName);
    url += "&user_id=" + _user.id;
    xhr.open("GET", url);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onerror = function(e) {
        alert(e);
        Ti.API.info(" " + String(e));
    };
    xhr.onload = function() {
        try {
            Ti.API.debug(" " + xhr.responseText);
            var data = JSON.parse(xhr.responseText);
            var subscriptions = data.response.subscriptions[0];
            Ti.API.info(JSON.stringify(subscriptions));
            _callback && _callback({
                success: true,
                data: subscriptions
            });
        } catch (E) {
            Ti.API.error(" " + String(E));
            _callback && _callback({
                success: false,
                data: null,
                error: E
            });
        }
    };
    xhr.send();
};