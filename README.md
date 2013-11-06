Please read the `LICENSE`.

To build: `zip -r ansilove.xpi chrome.manifest install.rdf icon.png chrome/`

In FireFox: Tools > Add-ons > Gears Icon > Install Add-on From File... > Choose the XPI file and install.

You should now have a contextual menu, listed as "Filter Links With AnsiLove" when right-clicking a page.

**Any** link will now open with a image preview when shift-clicked, instead of redirecting to a page or downloading the file from the server. Similarly, keeping alt pressed when clicking a link will open in an emulated terminal display.

Known issues:
- urls pointing to pages are mistaken for images.

This extension uses [ansilove.js][1] to render textmode-art images.  
[ansilove™][2] is a trademark of Frederic Cambus.

[1]: http://andyherbert.github.io/ansilove.js/
[2]: https://github.com/fcambus/ansilove