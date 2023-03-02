"use strict";
var eitherRect = function (rect, offset) {
    if (!rect) {
        return { height: 0, left: offset.left, top: offset.top, width: 0 };
    }
    return rect;
};
exports.eitherRect = eitherRect;
var replaceOffset = function (rect, offset) {
    if (!offset) {
        return rect;
    }
    var result = {
        height: rect.height,
        left: offset.left,
        top: offset.top,
        width: rect.width
    };
    return result;
};
exports.replaceOffset = replaceOffset;
var removeStackingOffset = function (rect, stackingOffset) {
    if (!stackingOffset) {
        return rect;
    }
    var result = {
        height: rect.height,
        left: rect.left - stackingOffset.left,
        top: rect.top - stackingOffset.top,
        width: rect.width
    };
    return result;
};
exports.removeStackingOffset = removeStackingOffset;
var isDifferentOffset = function (oldOffset, newOffset) {
    var oldLeft = oldOffset.left, oldTop = oldOffset.top;
    var newLeft = newOffset.left, newTop = newOffset.top;
    return Math.abs(oldLeft - newLeft) >= 1 || Math.abs(oldTop - newTop) >= 1;
};
exports.isDifferentOffset = isDifferentOffset;
var isDocumentAvailable = function () {
    return typeof document !== 'undefined' && !!document.body;
};
exports.isDocumentAvailable = isDocumentAvailable;
var isWindowAvailable = function () {
    return typeof window !== 'undefined';
};
exports.isWindowAvailable = isWindowAvailable;
var hasBoundingRect = function (elem) { return !!elem.getBoundingClientRect; };
exports.hasBoundingRect = hasBoundingRect;
var OVERFLOW_REGEXP = /auto|scroll/;
var scrollableParents = function (element) {
    var parents = [];
    if (!isDocumentAvailable() || !isWindowAvailable()) {
        return parents;
    }
    ;
    var parent = element.parentElement;
    while (parent) {
        if (OVERFLOW_REGEXP.test(window.getComputedStyle(parent).overflow)) {
            parents.push(parent);
        }
        parent = parent.parentElement;
    }
    parents.push(window);
    return parents;
};
exports.scrollableParents = scrollableParents;
var FRAME_DURATION = 1000 / 60;
exports.FRAME_DURATION = FRAME_DURATION; //1000ms divided by 60fps
var hasRelativeStackingContext = function () {
    if (!isDocumentAvailable()) {
        return false;
    }
    var top = 10;
    var parent = document.createElement("div");
    parent.style.transform = "matrix(10, 0, 0, 10, 0, 0)";
    parent.innerHTML = "<div style=\"position: fixed; top: " + top + "px;\">child</div>";
    document.body.appendChild(parent);
    var isDifferent = parent.children[0].getBoundingClientRect().top !== top;
    document.body.removeChild(parent);
    return isDifferent;
};
var HAS_RELATIVE_STACKING_CONTEXT = hasRelativeStackingContext();
exports.HAS_RELATIVE_STACKING_CONTEXT = HAS_RELATIVE_STACKING_CONTEXT;
