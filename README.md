VisDock
=======

VisDock Libraries
----------------------------------------------------------------------------------------------------
VisDock is an interactive web-visualization framework written in JavaScript. VisDock allows visualization creators to import various tools onto their host visuailzations to explore them.

### VisDock.js
VisDock.js library contains various tools: Such tools include cross-cutting selection tools, pan/zoom tool, query management tools, and annotation tools. VisDock can be imported into any SVG rendered visualizations.

### 2D.js and IntersectionLibrary.js
These libraries provide functions to determine whether the user-drawn shapes or lines cross the boundaries of svg objects. These files were obtained from Kevin Lindsey Software Development (www.kevlindev.com). 
Such cross-cutting selections can be made between:
- Path and Polygon
- Path and Elllipse
- Path and Line
- Polygon and Polygon
- Polygon and Ellipse
- Polygon and Line
- Ellipse and Ellipse
- Ellipse and Line
- Line and Line

### UtilitiesLibrary.js
Even though 2D.js and IntersectionLibrary.js already provide excellent functions to determine whether user-drawn shapes and svg objects cross one another, it requires knowledge and practice to utilize these functions. UtilitiesLibrary.js sort of eliminates this necessity by defining compact functions like:

- PathPolygonIntersection (points, shape, path, inclusive, T): Check the intersection between an svg path and an svg polygon.
  * Input arguments: 
    + points: An array of x and y coordinates of the polygon in the form of [[x1, y1], [x2, y2], [x3, y3], ... , [xn, yn]]
    + shape: Shape of the polygon. In order to pass this parameter, the user must initialize the polygon using PolygonInit function.
    + path: the svg path element
    + inclusive: this parameter is either 0 or 1. 0 means not inclusive so that the path element has to be fully enclosed by the svg polygon element or vice versa.
    + T: This is the transformation matrix. If the user has used PanZoomTool to modify the scale or location of the host visualization, this parameter must be specified to reflect the scale and location of the host visualization relative to the selection polygon.
    
- PathEllipseIntersection (points, path, inclusive, T): Check the intersectioni between an svg path and an svg ellipse.
  * Input arguments: 
    + points: An array of points that include the coordinates of the center of the ellipse, transverse diameters in the x and y directions. This parameter is passed in the form of [cx, cy, ra, rb]
    + path: the svg path element
    + inclusive: this parameter is either 0 or 1. 0 means not inclusive so that the path element has to be fully enclosed by the svg polygon element or vice versa.
    + T: This is the transformation matrix. 

- PathLineIntersection (points, path, T): Check the intersection between an svg path and an svg line.
  * Input arguments: 
    + points: An array of points of the line. The line can consist of a few segments. If the line is just one straight line, then this parameter would be in the form of [x1, y1, x2, y2]. If the line has a number of segments (e.g. curves), this parameter would be in the form of [x1, y1, x2, y2, x3, y3, ... , xn, yn]
    + path: the svg path element
    + inclusive: this parameter is either 0 or 1. 0 means not inclusive so that the path element has to be fully enclosed by the svg polygon element or vice versa.
    + T: This is the transformation matrix. 
    
- PolygonPolygonIntersection: Check the intersection between an svg polygon and an svg polygon.
- EllipsePolygonIntersection: Check the intersection between an svg polygon and an svg ellipse.
- LinePolygonIntersection: Check the intersection between an svg polygon and an svg line.
- EllipseEllipseIntersection: Check the intersection between an svg ellipse and an svg ellipse.
- EllipseLineIntersecction: Check the intersection between an svg elliipse and an svg line.
- LineLineIntersection: Check the intersection between an svg line and an svg line.

VisDock Tutorials
------------------------------------------------------------------------------------------------------
https://github.com/jungujchoi/VisDock/blob/master/Tutorials.md
