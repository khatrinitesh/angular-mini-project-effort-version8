'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/* DOM dependent */
function caretIndex(element) {
    return element.disabled ? undefined : element.selectionStart;
}

function caretSelection(element, startIndex, endIndex) {
    if ( endIndex === void 0 ) endIndex = startIndex;

    if (startIndex && !element.disabled && element.selectionStart !== undefined) {
        element.focus();
        element.setSelectionRange(startIndex, endIndex);
    }
}

function endOfWordIndex(text, startIndex, separator) {
    var endIndex;
    if (separator !== "") {
        var word = wordAtCaret(startIndex, text, separator);
        var tmp = text.substring(0, startIndex).split(separator);
        var beginning = tmp[tmp.length - 1];
        endIndex = startIndex + (word.length - beginning.length);
    } else {
        endIndex = text.length;
    }

    return endIndex;
}

function selectEndOfWord(element, startIndex, separator) {
    caretSelection(element, startIndex, endOfWordIndex(element.value, startIndex, separator));
}

function moveToEndOfWord(element, caretIdx, separator) {
    var word = wordAtCaret(element, element.value, separator);
    var end = caretIdx + word.length;
    caretSelection(element, end, end);

    return end;
}

function hasSelection(element) {
    return element.selectionStart !== element.selectionEnd;
}

function getExtraHeight(element) {
    var result = 0;
    var dom = element.previousElementSibling;

    while (dom) {
        result += dom.offsetHeight;
        dom = dom.previousElementSibling;
    }

    return result;
}

function resizeList(list, listContainer, height) {
    var extraHeight = getExtraHeight(list);
    var listHeight = list.scrollHeight || list.offsetHeight;

    listContainer.style.height = listHeight > height ? height + "px" : "auto";
    list.style.height = listHeight > height ? height - extraHeight + "px" : "auto";
}

/* DOM independent */
function indexOfWordAtCaret(caretIdx, text, separator) {
    return separator ? text.substring(0, caretIdx).split(separator).length - 1 : 0;
}

function trim(word, separator) {
    var str = separator.substring(0, separator.length - 1);
    return word.endsWith(str) ? word.substring(0, word.length - str.length) : word;
}

function wordAtCaret(caretIdx, text, separator) {
    var result = text.split(separator)[indexOfWordAtCaret(caretIdx, text, separator)];
    return trim(result, separator);
}

function replaceWordAtCaret(caretIdx, text, word, separator) {
    var words = text.split(separator);

    words.splice(indexOfWordAtCaret(caretIdx, text, separator), 1, word);

    return words.join(separator);
}

function textReduced(newValue, oldValue) {
    if ( newValue === void 0 ) newValue = "";
    if ( oldValue === void 0 ) oldValue = "";

    var result;

    if (!newValue && !oldValue) {
        result = false;
    } else if (newValue.length < oldValue.length) {
        result = true;
    } else if (newValue.length === oldValue.length) {
        result = newValue === oldValue;
    } else {
        result = false;
    }

    return result;
}

function resolveValue(props) {
    var data = props.data;
    var defaultItem = props.defaultItem;
    var value = props.value;
    var index = props.index;
    var valueField = props.valueField;
    var dataItem;
    if (value !== undefined) {
        dataItem = data.find(function (element) { return getter(element, valueField) === value; });
        return {
            dataItem: dataItem,
            selected: data.indexOf(dataItem),
            focused: data.indexOf(dataItem)
        };
    } else if (index) {
        dataItem = data[index];
        return {
            dataItem: data[index],
            selected: index,
            focused: index
        };
    }
    return {
        dataItem: defaultItem,
        selected: -1,
        focused: -1
    };
}

function sameCharsOnly(word, character) {
    for (var idx = 0; idx < word.length; idx++) {
        if (word.charAt(idx) !== character) {
            return false;
        }
    }
    return true;
}

function normalizeIndex(index, length) {
    var result = index;

    if (result >= length) {
        result -= length;
    }

    return result;
}

function shuffleData(data, splitIndex, defaultItem) {
    var result = data;

    if (defaultItem) {
        result = [ defaultItem ].concat(result);
    }

    return result.slice(splitIndex).concat(result.slice(0, splitIndex));
}

function matchText(text, word, ignoreCase) {
    if (text === undefined || text === null) {
        return false;
    }

    var temp = String(text);

    if (ignoreCase) {
        temp = temp.toLowerCase();
    }

    return temp.indexOf(word) === 0;
}

function getter(dataItem, field) {
    if (dataItem) {
        return field ? dataItem[field] : dataItem;
    }
    return null;
}

var Util = {
    caretIndex: caretIndex,
    caretSelection: caretSelection,
    getter: getter,
    getExtraHeight: getExtraHeight,
    hasSelection: hasSelection,
    indexOfWordAtCaret: indexOfWordAtCaret,
    moveToEndOfWord: moveToEndOfWord,
    matchText: matchText,
    normalizeIndex: normalizeIndex,
    textReduced: textReduced,
    trim: trim,
    wordAtCaret: wordAtCaret,
    selectEndOfWord: selectEndOfWord,
    sameCharsOnly: sameCharsOnly,
    shuffleData: shuffleData,
    replaceWordAtCaret: replaceWordAtCaret,
    resizeList: resizeList,
    resolveValue: resolveValue,
    endOfWordIndex: endOfWordIndex
};

exports.DropDownsUtil = Util;

//# sourceMappingURL=main.js.map
