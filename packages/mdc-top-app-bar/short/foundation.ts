/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

import {MDCTopAppBarAdapter} from '../adapter';
import {cssClasses} from '../constants';
import {MDCTopAppBarBaseFoundation} from '../foundation';

export class MDCShortTopAppBarFoundation extends MDCTopAppBarBaseFoundation {
  /**
   * State variable for the current top app bar state
   */
  isCollapsed = false;

  /* istanbul ignore next: optional argument is not a branch statement */
  constructor(adapter?: Partial<MDCTopAppBarAdapter>) {
    super(adapter);
  }

  init() {
    super.init();

    if (this.adapter_.getTotalActionItems() > 0) {
      this.adapter_.addClass(cssClasses.SHORT_HAS_ACTION_ITEM_CLASS);
    }

    if (!this.adapter_.hasClass(cssClasses.SHORT_COLLAPSED_CLASS)) {
      this.scrollHandler_ = () => this.shortAppBarScrollHandler_();
      this.adapter_.registerScrollHandler(this.scrollHandler_);
      this.shortAppBarScrollHandler_();
    }
  }

  destroy() {
    super.destroy();
  }

  /**
   * Scroll handler for applying/removing the collapsed modifier class on the short top app bar.
   */
  private shortAppBarScrollHandler_() {
    const currentScroll = this.adapter_.getViewportScrollY();

    if (currentScroll <= 0) {
      if (this.isCollapsed) {
        this.adapter_.removeClass(cssClasses.SHORT_COLLAPSED_CLASS);
        this.isCollapsed = false;
      }
    } else {
      if (!this.isCollapsed) {
        this.adapter_.addClass(cssClasses.SHORT_COLLAPSED_CLASS);
        this.isCollapsed = true;
      }
    }
  }
}

// tslint:disable-next-line:no-default-export Needed for backward compatibility with MDC Web v0.44.0 and earlier.
export default MDCShortTopAppBarFoundation;
