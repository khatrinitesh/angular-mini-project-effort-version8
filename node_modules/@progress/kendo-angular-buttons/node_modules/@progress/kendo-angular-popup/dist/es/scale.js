import { InjectionToken } from '@angular/core';
/**
 * Used to set the document scale when using a [scale transform](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/scale).
 *
 * The document or container scale is required to compute the popup position correctly. Detecting the scale is not reliable and must be set by providing a value for SCALE. See [Support for Document Scale]({% slug documentscale_popup %}).
 *
 * > Using this token is not necessary for user-applied browser zoom.
 *
 * {% meta height:300 %}
 * {% embed_file scale/app.component.ts preview %}
 * {% embed_file scale/app.module.ts %}
 * {% embed_file scale/main.ts %}
 * {% endmeta %}
 *
 *
 */
export var SCALE = new InjectionToken('Popup Document Scale');
