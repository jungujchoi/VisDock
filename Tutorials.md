# VisDock Tutorials
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
- Initialize viewport: this step creates an svg frame where your host visualization will reside. In this
case, the code below makes the variable 'viewport' such svg. <br>
<br>
<code style="margin-left: 30px">var viewport = VisDock.getViewport();</code>
<br>
<br>
- Make a visualization: you may create a visualization in 'viewport' (the svg frame created in the previous step).
This is not very difficult a task. When you are done with your visualization, you may skip the next few
steps and go to 'Selection Handler.'
But if you wish to adopt VisDock onto a pre-made visualization, it may take an extra work to do so.
In this case, we will use a visualization created with Raphael.js found on this <a href="http://raphaeljs.com/tiger.html">link</a>
and another visualization created with d3.js found on this <a href="http://bl.ocks.org/mbostock/4063530">link</a>.
<br>
<br>
<img src="https://github.com/jungujchoi/VisDock/blob/master/Tutorials/tigervis.png?raw=true" height = "400" width = "400">
<img src="https://github.com/jungujchoi/VisDock/blob/master/Tutorials/circlepackbefore.png?raw=true" height = "400" width = "400">
<br>
<br>
- Attach the visualization onto 'viewport' (<a href="http://bl.ocks.org/mbostock/4063530">circle packet example</a>):
this step may become complex if you are not making the visualization
from scratch. But the underlying concept is that you need to extract all the svg objects from the pre-made
visualization and push them onto 'viewport.' Some examples created with d3.js do not require this step
since it may only take the users to change the pre-defined svg space to 'viewport.'
<pre>
<code>
d3.json("circle.json", function(error, root) {
  node = viewport.datum(root).selectAll(".node") // This is the only change you need to make. 'svg' -> 'viewport'
      .data(pack.nodes)
      .enter().append("g")
      .attr("class", function(d) { return d.children ? "node" : "leaf node"; })

  node.append("title")
      .text(function(d) { return d.name + (d.children ? "" : ": " + format(d.size)); })
      
  node.append("circle")
      .attr("r", function(d) { return d.r; })
      .attr("cx", function(d) { return parseInt(d.x)})
      .attr("cy", function(d) { return parseInt(d.y)})
      .attr("fill-opacity", ".25");

  node.filter(function(d) { return !d.children; }).append("text")
      .attr("dy", ".3em")
      .style("text-anchor", "middle")
      .text(function(d) { return d.name.substring(0, d.r / 3); })
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
});
</code>
</pre>
<br>
- Attach the visualization onto 'viewport' (<a href="http://raphaeljs.com/tiger.html">tiger example</a>): But for an example 
created with Raphael.js this step will most certainly necessary.
<pre>
<code>
var r = Raphael(tiger).translate(200, 200); // here, the translation (200, 200) depends on the user's screen resolution
for (var i=0;i&lt;r.length;i++){
    var d = r[i][0].getAttributeNS(null,"d"); // 'd' attribute of svg path
    var stroke = r[i][0].getAttributeNS(null,"stroke"); // 'stroke' attribute of svg path
    var fill = r[i][0].getAttributeNS(null,"fill"); // 'fill' attribute of svg path
    var swidth = r[i][0].getAttributeNS(null,"stroke-width"); // 'stroke-width' attribute of svg path
    var tform = r[i][0].getAttributeNS(null,"transform"); // 'transform' attribute of svg path
    viewport.append("path") // putting elements onto viewport
        .attr("d",d)
        .attr("stroke",stroke)
        .attr("fill",fill)
        .attr("stroke-width",swidth)
        .attr("transform",tform)
}
r.remove() // removing the original elements
</code>
</pre>
<br>
- After initialization: at this stage, VisDock utilities are functional, which means users may draw shapes, pan and zoom in
          and out, and make annotations. But until Selection Handler is properly set, selection methods will not work 
          correctly.
<br><br>
<img src="https://github.com/jungujchoi/VisDock/blob/master/Tutorials/tiger.png?raw=true" height = "400" width = "400">
<img src="https://github.com/jungujchoi/VisDock/blob/master/Tutorials/bubblepacket.png?raw=true" height = "380" width = "400">
<br>
<br>
- Selection Handler: Selection Handler is a function inherent in the VisDock library. This function is invoked when
          a selection is made by users. This handles not only the intersections of user-drawn selection shapes and the
          svg objects of the host visualization but also other events such as 'setColor','removeColor', and 'changeColor'
          for the selected objects. We will provide the skeleton function here. 
	<br>
<pre><code>
VisDock.selectionHandler = {
    getHitsPolygon: function(points, inclusive){
    // This event is called when selections are made using Polygon, Lasso and Rectangular tools.

        return hits; 
    },
            
    getHitsEllipse: function(points, inclusive){
    // This event is called when selections are made using made using Ellipse Tool.
            
        return hits; 
    },
            
    getHitsLine: function(points, inclusive){
    // This event is called when selections are made using Polyline, Straightline, and Freeselection tools.
            
        return hits; 
    },
            
    setColor: function(hits){
    // This event is called when the user wants to change the colors of the selection layers.
            
    },
            
    changeVisibility: function(vis, query){
    // This event is called when the user wants to change the visibility of the selection layers.
            
    },
            
    removeColor: function(hits, index){
    // This event is called when the user wants to remove the colour of the selection layers.
            
    },
}
</code>
</pre>  
<br>
