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
    
- PolygonPolygonIntersection (points, shape, polygon, inclusive, T): Check the intersection between an svg polygon and an svg polygon.
  * Input arguments: 
    + points: An array of points of the shape (second argument), which is a polygon. Usually, this polygon is created using Lasso, Polygon, or Rectangle Tool.
    + shape: this shape is an svg polygon object whose points are the same as in the first argument (points).
    + polygon: This is the shape of a polygon belonging to the original host visualization.
    + inclusive: this parameter is either 0 or 1. 0 means not inclusive so that the path element has to be fully enclosed by the svg polygon element or vice versa.
    + T: This is the transformation matrix. 
    
- EllipsePolygonIntersection (points, shape, points2, inclusive, T): Check the intersection between an svg polygon and an svg ellipse.
  * Input arguments: 
    + points: An array of points describing the ellipse, include the coordinates of the center of the ellipse, transverse diameters in the x and y directions. This parameter is passed in the form of [cx, cy, ra, rb]. 
    + shape: this shape is an svg polygon object whose points are the same as in the third argument (points2).
    + points2: An array of x and y coordinates of the polygon in the form of [[x1, y1], [x2, y2], [x3, y3], ... , [xn, yn]]. This array describes the polygon (shape), which is usually created by using Lasso, Polygon, or Rectangle Tool.
    + inclusive: this parameter is either 0 or 1. 0 means not inclusive so that the path element has to be fully enclosed by the svg polygon element or vice versa.
    + T: This is the transformation matrix. 

- LinePolygonIntersection (points1, points2, shape, inclusive, T): Check the intersection between an svg polygon and an svg line.
  * Input arguments: 
    + points: An array of points of the polygon (shape in the third argument). 
    + points2: An array of x and y coordinates of the line/line segments. If the user wants to check the intersection between line segments (curves or polylines) and a polygon, this arguments may have a length greater than 2. 
    + shape: this shape is an svg polygon object whose points are the same as in the first argument (points). This argument needs to be initialized using PolygonInit before being passed.
    + inclusive: this parameter is either 0 or 1. 0 means not inclusive so that the path element has to be fully enclosed by the svg polygon element or vice versa.
    + T: This is the transformation matrix. 

- EllipseEllipseIntersection (points1, points2, inclusive, T): Check the intersection between an svg ellipse and an svg ellipse.
  * Input arguments: 
    + points: An array describing the first ellipse that include the coordinates of the center of the ellipse, transverse diameters in the x and y directions. This parameter is passed in the form of [cx, cy, ra, rb]/
    + points2: An array of x and y coordinates of the line/line segments. If the user wants to check the intersection between line segments (curves or polylines) and a polygon, this arguments may have a length greater than 2. 
    + shape: this shape is an svg polygon object whose points are the same as in the first argument (points). This argument needs to be initialized using PolygonInit before being passed.
    + inclusive: this parameter is either 0 or 1. 0 means not inclusive so that the path element has to be fully enclosed by the svg polygon element or vice versa.
    + T: This is the transformation matrix. 
    
- EllipseLineIntersecction: Check the intersection between an svg elliipse and an svg line.
- LineLineIntersection: Check the intersection between an svg line and an svg line.

<a href="https://github.com/jungujchoi/VisDock/blob/master/Tutorials.md">Go to VisDock Tutorials</a>
------------------------------------------------------------------------------------------------------
