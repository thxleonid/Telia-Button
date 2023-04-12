# Telia button

This is a simple button with a dropdown, which items are dynamically passed into Button component. App is built using React TS and SCSS.

Main features include:
- rendering items based on provided attributes of each item
- dropdown position is defined by button location on screen, using Floating UI library. If there's not enough space on Y axis, dropdown is made smaller until it fits (either below or above the button, using the larger option of these two)
- four color schemes (one is Telia brand scheme modified for WCAG accessibitily)
- selected item is passed to State variable so that it can be used later

Online version of the project can be accessed here: https://phenomenal-cendol-5f57ef.netlify.app
