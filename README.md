# zomoji-web-library
This library can change this ":curious:" 

into this 

<img src="../readme_assets/curious-work.png?raw=true" alt="curious" height="48" width="48">

or this 

<img src="../readme_assets/curious-play.png?raw=true" alt="curious" height="48" width="48">

or this :O

<img src="../readme_assets/curious.gif?raw=true" alt="curious">

# Usage
Include the js and required css file based on the size and type
```
<script src="/js/zomoji.js"></script>
<link rel="stylesheet" href="/css/work/zomoji24.css">
```

```
<script>
var config = {};
var zomoji = new Zomoji( config ); //config optional
var zomojifiedhtml = zomoji.replace( textcontent );
//Insert this zomojifiedhtml to get zomoji in the place of text content.
</script>
```

You can pass size of the emoji and its type in config object. 

Supported options are:
* type //Type can be "work" or "play"
* default_size //Size for the zomoji when it is present alone
* along_text_size //Size for the zomoji when it comes along the text

Available size options are 24, 48, 72
