# VisDock Tutorials
- Make a visualization: let's assumme you have successfully created a visualization of svg objects. In this case, we will use a visualization created with Raphael.js found on this <a href="http://raphaeljs.com/tiger.html">link</a>.
<br>
<img src="https://github.com/jungujchoi/VisDock/blob/master/Tutorials/tigervis.png?raw=true" height = "450" width = "450">
- Import VisDock and related libraries: you need to import VisDock.js along with 2D.js, IntersectionUtilities.js, and UtilitiesLibrary.js first. These library files can be found <a href="https://github.com/jungujchoi/VisDock/">here</a>. Of these library files, 2D.js and IntersectionUtilies.js were created by <a href="http://www.kevlindev.com">Kevin Linsey Software Development</a> and they can be downloaded from <a href="http://www.kevlindev.com">www.kevindev.com</a> as well.
<pre>
<code style="margin-left: 30px">&lt;script type="text/javascript" src="visdock.js"&gt;&lt;/script&gt;</code><br>
<code style="margin-left: 30px">&lt;script type="text/javascript" src="2d.js"&gt;&lt;/script&gt;</code><br>
<code style="margin-left: 30px">&lt;script type="text/javascript" src="intersectionUtilities.js"&gt;&lt;/script&gt;</code><br>
<code style="margin-left: 30px">&lt;script type="text/javascript" src="UtilitiesLibrary.js"&gt;&lt;/script&gt;</code>
</pre>
<br>
- Initialize VisDock: this initialization step physically attaches the VisDock onto your visualization. You must pass the width and heigh
					of your visualization as parameters. However, at this stage, the VisDock tools will not function
					correctly. VisDock Selection Handler needs to be properly first. <br>
<br>
<code style="margin-left: 30px">VisDock.init("body", width, height);</code>
<br>
<br>
<img src="https://github.com/jungujchoi/VisDock/blob/master/Tutorials/tiger.png?raw=true" height = "450" width = "450">
<br>

- After initialization: at this stage, VisDock utilities are functional, which means users may draw shapes, pan and zoom in
          and out, and make annotations. But until Selection Handler is properly set, selection methods will not work 
          correctly. In the figure below, Rectangle selection method is being used and a yellow rectangle is drawn by
          the user.
- Selection Handler: Selection Handler is a function inherent in the VisDock library. This function is invoked when
          a selection is made by users. This handles not only the intersections of user-drawn selection shapes and the
          svg objects of the host visualization but also other events such as 'setColor','removeColor', and 'changeColor'
          for the selected objects. We will provide the skeleton function here. 
	<br>
<pre>
<code style="margin-left: 30px">VisDock.selectionHandler = {</code>
    			<br>
    			<code style="margin-left: 40px">getHitsPolygon: function(points, inclusive){</code>
    			<br>
    			<code style="margin-left: 40px">// This event is called when selections are made using Polygon, Lasso and Rectangular tools.</code>
    			<br>
    			<br>
    			<code style="margin-left: 40px">return hits; </code>
    			<br>
     			<code style="margin-left: 30px">},</code>
    			<br>
    			<code style="margin-left: 40px">getHitsEllipse: function(points, inclusive){</code>
    			<br>
    			<code style="margin-left: 40px">// This event is called when selections are made using made using Ellipse Tool.</code>
    			<br>
    			<br>
    			<code style="margin-left: 40px">return hits; </code>
    			<br>
     			<code style="margin-left: 30px">},</code>
    			<br>
     			<code style="margin-left: 40px">getHitsLine: function(points, inclusive){</code>
    			<br>
    			<code style="margin-left: 40px">// This event is called when selections are made using Polyline, Straightline, and Freeselection tools.</code>
    			<br>
    			<br>
    			<code style="margin-left: 40px">return hits; </code>
    			<br>
     			<code style="margin-left: 30px">},</code>
    			<br>
    			<code style="margin-left: 40px">setColor: function(hits){</code>
    			<br>
    			<code style="margin-left: 40px">// This event is called when the user wants to change the colors of the selection layers.</code>
    			<br>
     			<code style="margin-left: 30px">},</code>
    			<br>
    			<code style="margin-left: 40px">changeVisibility: function(vis, query){</code>
    			<br>
    			<code style="margin-left: 40px">// This event is called when the user wants to change the visibility of the selection layers.</code>
    			<br>
     			<code style="margin-left: 30px">},</code>
    			<br>    			    			
     			<code style="margin-left: 40px">removeColor: function(hits, index){</code>
    			<br>
    			<code style="margin-left: 40px">// This event is called when the user wants to remove the colour of the selection layers.</code>
    			<br>
     			<code style="margin-left: 30px">},</code>
    			<br></pre>  
