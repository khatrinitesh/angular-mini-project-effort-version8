import offsetParent from './offset-parent';
import offsetRect from './offset';
import wnd from './window';

var position = function (element) {
    var win = wnd(element);
    var elementStyles = win.getComputedStyle(element);
    var offset = offsetRect(element);
    var parentElement = offsetParent(element);
    var parentStyles = win.getComputedStyle(parentElement);

    var parentOffset = { top: 0, left: 0 };

    if (elementStyles.position !== "fixed" && parentElement !== element.ownerDocument.body) {
        parentOffset = offsetRect(parentElement);

        parentOffset.top += parseInt(parentStyles.borderTopWidth, 10);
        parentOffset.left += parseInt(parentStyles.borderLeftWidth, 10);
    }

    return {
        top: offset.top - parentOffset.top - parseInt(elementStyles.marginTop, 10),
        left: offset.left - parentOffset.left - parseInt(elementStyles.marginLeft, 10),
        height: offset.height,
        width: offset.width
    };
};

export default position;

//# sourceMappingURL=position.js.map
