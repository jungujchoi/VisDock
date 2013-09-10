# VisDock Tutorials
- Import VisDock and related libraries: you need to import VisDock.js along with 2D.js,
IntersectionUtilities.js, and UtilitiesLibrary.js first. These library files can be found
 <a href="https://github.com/jungujchoi/VisDock/">here</a>. Of these library files, 2D.js
and IntersectionUtilies.js were created by <a href="http://www.kevlindev.com">Kevin Lindsey Software 
Development</a> and they can be liked directly to their remote URL or can be downloaded from
from <a href="http://www.kevlindev.com">www.kevindev.com</a> as well.
<pre>
<code style="margin-left: 30px">&lt;script type="text/javascript" src="visdock.js"&gt;&lt;/script&gt;</code><br>
<code style="margin-left: 30px">&lt;script type="text/javascript" src="http://www.kevlindev.com/gui/2D.js" &gt;&lt;/script&gt;</code><br>
<code style="margin-left: 30px">&lt;script type="text/javascript" src="http://www.kevlindev.com/geometry/2D/intersections/IntersectionUtilities.js" &gt;&lt;/script&gt;</code><br>
<code style="margin-left: 30px">&lt;script type="text/javascript" src="UtilitiesLibrary.js"&gt;&lt;/script&gt;</code>
</pre>
<br>
- Initialize VisDock: this initialization step physically attaches the VisDock onto your visualization. 
You must pass the width and heigh of your visualization as parameters. However, at this stage,
the VisDock tools will not function correctly. VisDock Event Handler needs to be 
implemented properly first. <br>
<br>
<code style="margin-left: 30px">VisDock.init("body", width, height);</code>
<br><br>
<img src="https://github.com/jungujchoi/VisDock/blob/master/Tutorial/init.png?raw=true" height = "400" width = "400">
<br><br>
- Initialize viewport: this step creates an SVG frame where your host visualization will reside. In this
case, the line below makes the variable 'viewport' such become this SVG frame. <br>
<br>
<code style="margin-left: 30px">var viewport = VisDock.getViewport();</code>
<br>
<br>
- Make a visualization: you may create a visualization in 'viewport' (the SVG frame created in the previous step).
This is not very difficult a task. When you are done with your visualization, you may skip the next few
steps and go to 'Selection Handler.'
But if you wish to adopt VisDock onto a pre-made visualization, it may take a few extra steps.
We will use a visualization created with Raphael.js found on this <a href="http://raphaeljs.com/tiger.html">link</a>
and another visualization created with d3.js found on this <a href="http://bl.ocks.org/mbostock/4063530">link</a>.
<br>
<br>
<img src="https://github.com/jungujchoi/VisDock/blob/master/Tutorial/tigervis.png?raw=true" height = "400" width = "400">
<img src="https://github.com/jungujchoi/VisDock/blob/master/Tutorial/circlepackbefore.png?raw=true" height = "400" width = "400">
<br>
<br>
- Attach the visualization onto 'viewport' (<a href="http://bl.ocks.org/mbostock/4063530">circle packet
example</a>): this step may become complex if you are using a non-SVG frame (such as Div or Raphael.js Paper).
But the underlying concept is that you need to extract all the SVG objects from the pre-made
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
- Attach the visualization onto 'viewport' (<a href="http://raphaeljs.com/tiger.html">tiger example</a>):
If you use Raphael.js Paper, it requires that you manually pop each element from the Paper frame and attach
it back on 'viewport.' This step can be very tedious so we will just use 
<a href="http://upload.wikimedia.org/wikipedia/commons/f/fd/Ghostscript_Tiger.svg">an SVG rendered picture
</a>of the tiger example. 
<pre>
<code>&lt;svg&gt;
        &lt;!-- Here are the SVG objects for the tiger example --!&gt;
&lt;/svg&gt;
&lt;scrip&gt;
        var svgObjects = document.getElementsByTagName("g")[0]; // stores all the SVG objects in svgObjects
        for (var i = 0; i &lt; svgObjects.length; i++) {
            viewport.appendChild(svgObjects[i]); // append the SVG objects into 'viewport'
            svgObjects[i].remove(); // Once the SVG objects are succesfully attached onto 'viewport'
                                            we can remove the original ones.
        }
&lt;/script&gt;
</code>
</pre>
<br>
- After initialization: at this stage, VisDock utilities are functional, which means users may draw shapes, pan and zoom in
 and out, and make annotations. But until VisDock Event Handler is properly implemented, selection methods
will not work correctly.
<br><br>
<img src="https://github.com/jungujchoi/VisDock/blob/master/Tutorial/tiger.png?raw=true" height = "400" width = "400">
<img src="https://github.com/jungujchoi/VisDock/blob/master/Tutorial/bubblepacket.png?raw=true" height = "380" width = "400">
<br>
<br>
- Selection Handler: Selection Handler is a VisDock event handler inherent in the VisDock library. This
function is invoked when
          a selection is made by users. This handles not only the intersections of user-drawn selection shapes and the
          SVG objects of the host visualization but also other events such as 'setColor','removeColor', and 'changeColor'
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
- Cross-cutting seletions (tiger example): UtilitiesLibrary.js provides various functions that users
can utilize. Tiger visualization consists of only svg path elements. Therefore, only comparison between
path elements and shapes needs to be made. We will provide an example.
 + getHitsPolygon: this event will be called when the users make selections with Lasso, Polygon and
Rectangle tools.
<br>
<pre><code>
getHitsPolygon: function(points, inclusive, t){
            var aa = getPaths(); // look up all the path elements and store them in the variable 'aa'
            var nElements = getNumberOfPaths(); 
            var hits = []; // this stores information about objects or objects themselves that 
                            intersect the user-drawn polygon.
            var count = 0;
            var captured = 0;
            t = [200,200]; // this transformation has scale and translation.
            var shapebound = PolygonInit(points,t); // shapebound is a new polygon object 
                                                        which has the shape created by using
                                                        selection tools.
            for (var i=0; i&lt;nElements; i++){
                captured = 0;
                captured = PathPolygonIntersection(points,shapebound,aa[i],inclusive,t); 
                // captured will have 0 if the path element 'aa[i]' and shapebound do not intersect
                // Otherwise, it will haev 1
                if (captured == 1){
                    hits[count] = i; // we are storing the index of the path object. But the users may
                                        choose to store other information or the object itself.
                    count++;
                }
            }
            return hits;
        }
</code></pre>
<br>
 + getHitsEllipse: similarly, this event will be called when the users make selections with Ellipse tool.
<br>
<pre><code>
getHitsEllipse: function(points, inclusive, t){
            var aa = getPaths();
            var nElements = getNumberOfPaths();	
            var hits = [];
            var count = 0;
            var captured = 0;
            var ellipse = EllipseInit(points, t);
            for (var i=0; i%lt;nElements; i++){
                captured = 0;
                captured = PathEllipseIntersection(ellipse,aa[i],inclusive,t);
                if (captured == 1){
                    hits[count] = i;
                    count++;
                }
            }
            return hits;
        },
</code></pre>
<br>
 + setColor: this function will be called when a query is made by either making new selections or performing
binary operations between queries (common, union, or XOR).
<br>
<pre><code>
setColor: function(hits, t){
            var aa = getCircles();
            for (var i=0;i&lt;hits.length;i++){
                addPathLayer(aa[hits[i]],t); // t is the transformation matrix
            }
},
</code></pre>
<br>
 + changeColor: this function will be called when the users wish to change the color of a query or queries.
<br>
<pre><code>
changeColor: function(color, query){
            for (var i=0;i&lt;query.length;i++){
                query[i].attr("fill",color)
            }
},
</code></pre>
<br>
 + changeVisibility: this function will be called when the users wish to change the visibility of
Freeselection tools.
<pre><code>
changeVisibility: function(vis, query){
            for (var i=0;i&lt;query.length;i++){
                query[i].attr("opacity",vis);
            }
},
</code></pre>
<br>
 + removeColor: this function will be called when the users wish to remove the layers for a query or queries.
<pre><code>
removeColor: function(hits, index){
            for (var i=0;i&lt;hits.length;i++){
                hits[i].remove();
            }
    },
</code></pre>
 + QueryClick: this function is completely optional. The users may add this function to handle events when
a query box is clicked in the query list. For the tiger example, we'll leave this function out.
</code></pre>
<br>
 + getHitsLine: this function will be called when the users make selections with StraightLine, Polyline, and
Freeselection tools.
<br>
<pre><code>
getHitsLine: function(points, inclusive){
            var aa = getPaths();
            var nElements = getNumberOfPaths(); 	
            var hits = [];
            var count = 0;
            var captured = 0;
            for (var i=0; i&lt;nElements; i++){
                captured = 0;
                captured = PathLineIntersection(points,aa[i]);
                if (captured == 1){
                    hits[count] = i;
                    count++;
                }
            }
            return hits;
    },
</pre></code>
<br>
- Circle Packet example: the circle packet example is written in a very similar manner except that the
condition checking function is used. The lines are a little bit different. For instance:
 + Node checking: getHits functions use 'getNodes' and 'CheckNodeConditions.' 
<br>
<pre><code>
getHitsLine: function(points, inclusive){
            var aa = getCircles();
            var nElements = getNumberOfCircles();
            var aa2 = getNodes(nElements); // while the variable 'aa' stores the svg circles, the variable
						'aa2' stores the nodes that refer to the svg circles.
						This variable will be used to check additional selection
						conditions.
            var hits = [];
            var count = 0;
            var captured = 0;
            for (var i=0; i&lt;nElements; i++){
                captured = 0;
                captured = CircleLineIntersection(points,aa[i]);
                if (captured == 1 && CheckNodeConditions(aa2[i],"class","leaf node")){
		    // The node condition that only leaf node will be selected must be satisfied.
                    hits[count] = i;
                    count++;
                }
            }
            return hits;
},
</code></pre>
<br>
 + Circle Packet example: we list here the entire code for selectionHandler in Circle Packet example.
<br>
<pre><code>
VisDock.selectionHandler = {
            getHitsPolygon: function(points, inclusive, t){
                var aa = getCircles();
                var nElements = getNumberOfCircles();	
                var aa2 = getNodes(nElements);
                var hits = [];
                var count = 0;
                var captured = 0;
                var shapebound = PolygonInit(points,[0,0]);
                for (var i=0; i&lt;nElements; i++){
                    captured = 0;
                    captured = CirclePolygonIntersection(points,shapebound,aa[i], inclusive,t);
                    if (captured == 1 && CheckNodeConditions(aa2[i],"class","leaf node")){
                        hits[count] = i;
                        count++;
                    }
                }
                return hits;
            },
            getHitsEllipse: function(points, inclusive, t){
                var aa = getCircles();
                var nElements = getNumberOfCircles();	
                var aa2 = getNodes(nElements);
                var hits = [];
                var count = 0;
                var captured = 0;
                for (var i=0; i&lt;nElements; i++){
                    captured = 0;
                    captured = CircleEllipseIntersection(points,aa[i]);
                    if (captured == 1 && CheckNodeConditions(aa2[i],"class","leaf node")){
                        hits[count] = i;
                        count++;
                    }
                }
                return hits;
            },
            getHitsLine: function(points, inclusive){
                var aa = getCircles();
                var nElements = getNumberOfCircles();
                var aa2 = getNodes(nElements);
                var hits = [];
                var count = 0;
                var captured = 0;
                for (var i=0; i&lt;nElements; i++){
                    captured = 0;
                    captured = CircleLineIntersection(points,aa[i]);
                    if (captured == 1 && CheckNodeConditions(aa2[i],"class","leaf node")){
                        hits[count] = i;
                        count++;
                    }
                }
                return hits;
            },
            setColor: function(hits){
                var aa = getCircles();
                for (var i=0;i&lt;hits.length;i++){
                    addCircleLayer(aa[hits[i]]);
                }
            },
            changeColor: function(color, query, index){
                var visibility = getQueryVisibility(index);	
                for (var i=0;i&lt;query.length;i++){
                    query[i].attr("style","opacity:" + visibility + ";fill: " +color)
                }
            },
            changeVisibility: function(vis, query, index){
                var color = getQueryColor(index);
                for (var i=0;i&lt;query.length;i++){
                    query[i].attr("style","opacity:" + vis + ";fill: " +color)
                }
            },
            removeColor: function(hits, index){
                for (var i=0;i&lt;hits.length;i++){
                    hits[i].remove();
                }
            }
}
</code></pre>
<br>
- Screenshots of the final products: exploration and annotations
<br>
<img src="https://github.com/jungujchoi/VisDock/blob/master/Tutorials/tigerdone.png?raw=true" height = "500" width = "500">
<img src="https://github.com/jungujchoi/VisDock/blob/master/Tutorials/circlepackdone.png?raw=true" height = "450" width = "500">
