VisDock
=======

VisDock Libraries
----------------------------------------------------------------------------------------------------
isDock is an interactive web-visualization framework written in JavaScript. VisDock allows visualization creators to import various tools onto their host visuailzations to explore them.

### VisDock.js
VisDock.js library contains various tools: Such tools include cross-cutting selection tools, pan/zoom tool, query management tools, and annotation tools. VisDock can be imported into any SVG rendered visualizations.

### 2D.js, IntersectionLibrary.js
These libraries provide functions to determine whether the user-drawn shapes or lines cross the boundaries of svg objects. These files were obtained from Kevin Lindsey Software Development (www.kevlindev.com). 
Such cross-cutting selections can be made between:
- Path and Polygon
- Path and Elllipse
- Path and Line
- Polygon and Polygon
- Polygon and Line
- Polygon and Ellipse
- Ellipse and Line
- Ellipse and Ellipse
- Line and Line

### UtilitiesLibrary.js
Even though 2D.js and IntersectionLibrary.js already provide excellent functions to determine whether user-drawn shapes and svg objects cross one another, it requires knowledge and practice to utilize these functions. UtilitiesLibrary.js sort of eliminates this necessity by defining compact functions like:
- PathPolygonIntersection: Check the intersection between an svg path and an svg polygon.
- PathEllipseIntersection: Check the intersectioni between an svg path and an svg ellipse.
- PathLineIntersection: Check the intersection between an svg path and an svg line.

