"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mLogger;
var mErrorLogger;
function setLogger(logger, errorLogger) {
    mLogger = logger;
    mErrorLogger = errorLogger != null ? errorLogger : logger;
}
exports.setLogger = setLogger;
function isEnable() {
    return mLogger != null;
}
exports.isEnable = isEnable;
function log(message) {
    var optionalParams = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        optionalParams[_i - 1] = arguments[_i];
    }
    if (mLogger) {
        mLogger.apply(void 0, [message].concat(optionalParams));
    }
}
exports.log = log;
function error(message) {
    var optionalParams = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        optionalParams[_i - 1] = arguments[_i];
    }
    if (mErrorLogger) {
        mErrorLogger.apply(void 0, [message].concat(optionalParams));
    }
}
exports.error = error;
