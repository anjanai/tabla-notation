# Notate.Tabla 
https://anjanai.github.io/tabla-notation/

**Notate.Tabla** is a simple html-based tool that allows you to notate tabla compositions. This is intended for tabla-players who prefer to read and write their compositions in the devanagari script. Access the tool [here](https://anjanai.github.io/tabla-notation/).

In a few minutes, you can notate a composition on this page, and also generate the composition in other formats.
## Quick Start:  Create a simple vilambit teentaal theka.

### Step 1) Type the bols
In the text-area box on the page, copy and paste the following:
```
धा - - त   धिं - - त   धिं - धिं -   धा - - -
धा - - त   धिं - - त   धिं - धिं -   धा - - -
धा - - त   तिं - - त   तिं - तिं -   ता - - -
ति र कि ट   धिं - - त   धिं - धिं -   धा - - -
```

### Step 2) Set bols-per-beat
Set the *Bols per beat* number to 4 since we want 4 bols per beat.

### Step 3) Create formatted text
Click on the *Create Formatted Text* button and you will see the following:
<html>
<table id="formatted" border="1" cellspacing="0"><tbody><tr><td>धा - - त </td><td>धिं - - त </td><td>धिं - धिं - </td><td>धा - - - </td></tr>
<tr><td>धा - - त </td><td>धिं - - त </td><td>धिं - धिं - </td><td>धा - - - </td></tr>
<tr><td>धा - - त </td><td>तिं - - त </td><td>तिं - तिं - </td><td>ता - - - </td></tr>
<tr><td>ति र कि ट </td><td>धिं - - त </td><td>धिं - धिं - </td><td>धा - - - </td></tr>
</tbody></table>
</html>

### Step 4) Copy formatted text
You can copy and paste this formatted text into a document (try doing it in a google doc).

### Step 5) Copy html
Click on the *Copy Formatted text as HTML* button, then paste into a new text file which you can call teentaal.html.
The contents of your teentaal.html file should look like:

```
<table id="formatted" border="1" cellspacing="0"><tbody>
<tr><td>धा - - त </td><td>धिं - - त </td><td>धिं - धिं - </td><td>धा - - - </td></tr>
<tr><td>धा - - त </td><td>धिं - - त </td><td>धिं - धिं - </td><td>धा - - - </td></tr>
<tr><td>धा - - त </td><td>तिं - - त </td><td>तिं - तिं - </td><td>ता - - - </td></tr>
<tr><td>ति र कि ट </td><td>धिं - - त </td><td>धिं - धिं - </td><td>धा - - - </td></tr>
</tbody></table>
```

The tool also generates notation for the Vishwamohini tool. This tool is another free web-based tool for tabla notation, which also lets you hear the tabla sounds online.
Please see http://vishwamohini.com/ and http://vishwamohini.com/music/demo.php for more. You will need to sign up to be able to save something new, but you can play around with things using my sandbox: http://vishwamohini.com/music/music.php?id=871.

