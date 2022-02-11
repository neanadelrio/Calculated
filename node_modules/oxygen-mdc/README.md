# Oxygen web-components

The Oxygen web-components are a light-weight collection of basic input
elements, such as text input, button, icons, etc.

## Icons

Icon showcase: https://bit.ly/3aIXPMt

## Changelog

### Version 1.0.0

Changes for version 1.0.0 are centered around a different style for focused
attributes using a blue outline (by default) instead of a background color.
Further, the focus will only show when the keyboard is used for navigation,
relying on the `focus-visible` selector instead of `focus`. Several other CSS
simplifications have been done.

API breaking changes for Version 1.0.0

#### <oxy-button>

* Removed `--oxy-button-background-color` as it can be styled on the host
* Changed `oxy-button`'s host style from `background-color` to `background`
* Changed `oxy-button`'s focus to use blue outline by default, which changes the
  meaning of `--oxy-button-focus-color`
* Added `active` property for `oxy-button` which is set during activation, e.g.,
  while the mouse button is pressed

#### <oxy-checkbox>

* Changed `oxy-checkbox`'s focus to use blue outline by default
* Added `--oxy-checkbox-checked-border` variable
* Added `--oxy-checkbox-focus-color` variable

#### <oxy-dialog>

* Default for `--oxy-dialog-text-color` is now inherited from parent
* The `oxy-dialog` can now be styled with the CSS part `dialog`

#### <oxy-input>

* Added `oxy-input` styles for the disabled state
* Changed `--oxy-input-background-color` on `background-color` to
  `--oxy-input-background` on `background`
* Replaced `--oxy-input-border-width` and `--oxy-input-border-color` with
  `--oxy-input-border` which defines all border attributes
* Replaced `--oxy-input-border-color-focused` with
  `--oxy-input-border-focused` which defines all border attributes
* Default for `--oxy-input-text-color` is now inherited from parent

#### <oxy-slider>

* Added `--oxy-slider-focus-color` variable
* Added `--oxy-slider-track-height` variable
* Added `--oxy-slider-thumb-size` and `--oxy-slider-thumb-radius` variables

#### <oxy-tabs>

* Replaced `--oxy-tabs-border-color` with `--oxy-tabs-border` which
  defines all border attributes

#### <oxy-textarea>

* Default for `--oxy-textarea-text-color` is now inherited from parent
* Changed `--oxy-textarea-background-color` on `background-color` to
  `--oxy-textarea-background` on `background`
* Changed `--oxy-textarea-background-color-focused` on `background-color` to
  `--oxy-textarea-background-focused`
* Replaced `--oxy-textarea-border-width` and `--oxy-textarea-border-color`
  with `--oxy-textarea-border` which defines all border attributes
* Replaced `--oxy-textarea-border-color-focused` with
  `--oxy-textarea-border-focused` which defines all border attributes
* Default for `--oxy-textarea-box-shadow` changed to `none`
* Default for `--oxy-textarea-box-shadow-focused` changed to `none`
* Added `--oxy-textarea-placeholder-color` variable
