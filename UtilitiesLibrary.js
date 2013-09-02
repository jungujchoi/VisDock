//alert("loaded");

var result = []
var num = 0;
function getTexts(){
 var text1 = document.getElementsByTagName("text");
 var new_text = [];
 for (var i=0;i<text1.length-VisDock.init_text;i++){
  new_text[i] = text1[i+VisDock.init_text];
 }
 return new_text;
}
function getCircles(){
 return document.getElementsByTagName("circle");
}
function getPaths(){
 return document.getElementsByTagName("path");
}
function getNodes(N){
 var nodes = document.getElementsByTagName("g");

 var new_nodes = []
 for (var i=0;i<N;i++){
 init_g=4
//  new_nodes[i] = nodes[i+init_g-1];
  new_nodes[i] = nodes[i+init_g];
 }
 return new_nodes;
}
function getNumberOfCircles(){
 return VisDock.numSvgCircle;
}
function getNumberOfPaths(){
 return VisDock.numSvgPath;
}
function getQueryColor(index){
 return QueryManager.colors[index];
}
function getQueryVisibility(index){
 return QueryManager.visibility[index];
}
function getPolygons(){
 return document.getElementsByTagName("polygon");
}
function CheckNodeConditions(obj,attr,str){
 var result=obj.getAttributeNS(null,attr);
//alert(result)
 if (result == str){
  return 1;
 }
 else {
  return 0;
 }
}

//function PathInit(points){
// var path = document.createElementNS("http://www.w3.org/2000/svg","path");
// var strpoints=[];

// for(var i=0;i<points.length;i++){
//  if (i != points.length-1){
//   strpoints=[strpoints + points[i][0] + "," + points[i][1] + " "];
//  }
//  else{
//   strpoints=[strpoints + points[i][0] + "," + points[i][1]];
//  }
// }
// strpoints=[strpoints + points[0][0] + "," + points[0][1]];
// path.setAttributeNS(null,"points",strpoints)
// alert(strpoints);
// return path;
//}

function PolygonInit(points,t){
 var shapebound = document.createElementNS("http://www.w3.org/2000/svg","polygon");
 var strpoints=[];

 for(var i=0;i<points.length;i++){
  if (i != points.length-1){
   strpoints=[strpoints + (points[i][0]-t[0]) + "," + (points[i][1]-t[1]) + " "];
  }
  else{
   strpoints=[strpoints + (points[i][0]-t[0]) + "," + (points[i][1]-t[1]) + " "];
  }
 }
 strpoints=[strpoints + (points[0][0]-t[0]) + "," + (points[0][1]-t[1])];
 shapebound.setAttributeNS(null,"points",strpoints)
 
 return shapebound;
}

function EllipseInit(points){
 var ellipse = document.createElementNS("http://www.w3.org/2000/svg","ellipse");
 var ecx=points[0];
 var ecy=points[1];
 var rx=points[2];
 var ry=points[3];

 ellipse.setAttributeNS(null,"cx",ecx)
 ellipse.setAttributeNS(null,"cy",ecy)
 ellipse.setAttributeNS(null,"rx",rx)
 ellipse.setAttributeNS(null,"ry",ry) 

 return ellipse;
}

function LineInit(points){
 var line = document.createElementNS("http://www.w3.org/2000/svg","line");
 var x1=points[0][0];
 var y1=points[0][1];
 var x2=points[1][0];
 var y2=points[1][1];
 line.setAttributeNS(null,"x1",x1);
 line.setAttributeNS(null,"y1",y1);
 line.setAttributeNS(null,"x2",x2);
 line.setAttributeNS(null,"y2",y2);

 return line;
}

function PathPolygonIntersection(points,shapebound,path, inclusive, t){
//alert(points + shapebound + path + inclusive + t)
 shapebound.setAttributeNS(null,"transform","translate("+(-1*t[0])+","+(-1*t[1])+")")
//alert("DA")
 var bound=new Polygon(shapebound);
 var P=new Path(path);
// var str=path.getAttributeNS(null,"d").split("L")
// var str2=str[0].split(",");
// var x=str2[0].split("M")[1];
// var y=str2[1];
 var s=path.getAttributeNS(null,"d")
 var rel = ["M","L","H","V","C","S","Q","T","A","Z"," ",","];
 var i = 0;
 var j = 0;
 var x = "";
 var y = "";
//alert(s)
 while (i < 2){

  if (i == 0){
   if (rel.indexOf(s[j]) == -1){
    x = x + s[j].toString();
   }
   else {
    if (j != 0){
     i++;
    }
   }
  }
  else if (i == 1){
   if (rel.indexOf(s[j]) == -1){
    y = y + s[j].toString();
   }
   else {
    i++;
   }
  }
  j++
 }
//alert(path.getAttributeNS(null,"transform"))
 var pt = new Point2D(x,y);
 if (bound.pointInPolygon(pt)){
  if (inclusive == false){
   var result = Intersection.intersectPathShape(P, bound);
   if (result.status == "Intersection") {
    return 0;
   }
   else{
    return 1;
   }
  }
  else{
   return 1;
  }
 }

 if (inclusive == true){
  var result = Intersection.intersectPathShape(P, bound);
  if (result.status == "Intersection") {
   return 1;
  }
  else{
   return 0;
  }
 }
}

function PathLineIntersection(points,path){
 var P = new Path(path)
 if (points.length > 2){
  for (var j=0;j<points.length-1;j++){
   var line = LineInit([[points[j][0], points[j][1]],[points[j+1][0],points[j+1][1]]]);
   var L = new Line(line);
   var result = Intersection.intersectPathShape(P, L); 
   if (result.status == "Intersection") {
    return 1;
   }
  }
 }
 else{
  var line = LineInit(points);
  var L = new Line(line);
  var result = Intersection.intersectPathShape(P, L);
  if (result.status == "Intersection") {
   return 1;
  }
 }
}

function PathEllipseIntersection(points,path,inclusive){
 var E = new Ellipse(points);
 var P = new Path(path);
 var s=path.getAttributeNS(null,"d")
// var str=path.getAttributeNS(null,"d").split("L")
// var str2=str[0].split(",");
// var x=str2[0].split("M")[1];
// var y=str2[1];
 var rel = ["M","L","H","V","C","S","Q","T","A","Z"," ",","];
 var i = 0;
 var j = 0;
 var x = "";
 var y = "";
//alert(s)
 while (i < 2){

  if (i == 0){
   if (rel.indexOf(s[j]) == -1){
    x = x + s[j].toString();
   }
   else {
    if (j != 0){
     i++;
    }
   }
  }
  else if (i == 1){
   if (rel.indexOf(s[j]) == -1){
    y = y + s[j].toString();
   }
   else {
    i++;
   }
  }
  j++
 }
//alert(s)
//alert(" x = " + x + " y = " + y)
//alert(path.getAttributeNS(null,"d"))
 var cx = parseFloat(points.getAttributeNS(null,"cx"))
 var cy = parseFloat(points.getAttributeNS(null,"cy"))
 var rx = parseFloat(points.getAttributeNS(null,"rx"))
 var ry = parseFloat(points.getAttributeNS(null,"ry"))

 x = parseFloat(x); //alert(x)
 y = parseFloat(y); //alert(y)
//alert("CS = " +Math.pow((cx-x)/rx,2) + Math.pow((cy-y)/ry,2)) 

 if (inclusive == true){ 
  var result = Intersection.intersectPathShape(P, E)
  if (result.status == "Intersection") {
   return 1;
  }
 }
 if (Math.pow((cx-x)/rx,2) + Math.pow((cy-y)/ry,2) <= 1){
  return 1;
 }
}

function PolygonPolygonIntersection(points,shapebound,polygon){
 var bound=new Polygon(shapebound);
 var npoly=new Polygon(polygon);
 var vector_points=[];
 var vector_points2 = [];

 for (var j=0;j<points.length;j++){
  vector_points[j] = new Point2D(points[j][0],points[j][1])
 }
 var points2 = polygon.getAttributeNS(null,"points").split(" ")
 for (var j=0;j<points2.length;j++){
  var pxy = points2[j].split(",");
  var px = parseInt(pxy[0]);
  var py = parseInt(pxy[1]);
  vector_points2[j] = new Point2D(px,py)
 }
 var pxy = points2[0].split(",");
 var p_x = pxy[0];
 var p_y = pxy[1];

 var p = new Point2D(p_x,p_y);

 if (bound.pointInPolygon(p)){
  return 1;
 }
 var result = Intersection.intersectPolygonPolygon(vector_points, vector_points2)
 if (result.status == "Intersection") {
  return 1;
 }
}

function CirclePolygonIntersection(points,shapebound,circle, inclusive){
 var bound=new Polygon(shapebound);
 var vector_points=[];
 var cx=(circle.getAttributeNS(null,"cx"));
 var cy=(circle.getAttributeNS(null,"cy"));
 var r=(circle.getAttributeNS(null,"r"));
 for (var j=0;j<points.length;j++){
  vector_points[j] = new Point2D(points[j][0],points[j][1])
 }
 if (cx != null && cy != null && r != null){
  cx = parseFloat(cx);
  cy = parseFloat(cy);
  r = parseFloat(r);
  var p = new Point2D(cx,cy);

  if (bound.pointInPolygon(p)){
   return 1;
  }
  if (inclusive == true){
   var result = Intersection.intersectCirclePolygon(p, r, vector_points)
   if (result.status == "Intersection") {
    return 1;
   }
  }
 }
}

function EllipsePolygonIntersection(points,shapebound,points2){
 var bound=new Polygon(shapebound); 
 var vector_points=[];
 var cx=points[0];//(ellipse.getAttributeNS(null,"cx"));
 var cy=points[1];//(circle.getAttributeNS(null,"cy"));

 var c = new Point2D(cx,cy);//alert("JFDSKLK")
 var rx = points[2];
 var ry = points[3];//alert("CCCCCC")
  if (bound.pointInPolygon(points2[0])){
   return 1;
  }

  if (Math.pow((cx-points2[0].x)/rx,2) + Math.pow((cy-points2[0].y)/ry,2) <= 1){
   return 1;
  }
  var result = Intersection.intersectEllipsePolygon(c, rx, ry, points2)
  if (result.status == "Intersection") {
   return 1;
  }
}

function LinePolygonIntersection(points1, points2, shapebound){//alert("JSDFKLJDFKS")
 var bound=new Polygon(shapebound);
 var vector_points=[];
 var p = [];

 for (var j=0;j<points2.length-1;j++){
  p1 = new Point2D(points2[j][0], points2[j][1])
  p2 = new Point2D(points2[j+1][0],points2[j+1][1])

  var result = Intersection.intersectLinePolygon(p1, p2, points1); //alert(result.status)
  if (result.status == "Intersection") {
   return 1;
  }
 }
}

function CircleLineIntersection(points,circle){
 var cx=(circle.getAttributeNS(null,"cx"));
 var cy=(circle.getAttributeNS(null,"cy"));
 var r=(circle.getAttributeNS(null,"r"));
 if (cx != null && cy != null && r != null){
  var c = new Point2D(cx,cy);
  if (points.length > 2){
   for (var j=0;j<points.length-1;j++){
    var a1 = new Point2D(points[j][0],points[j][1]);
    var a2 = new Point2D(points[j+1][0],points[j+1][1]);
    var result = Intersection.intersectCircleLine(c, r, a1, a2)
    if (result.status == "Intersection") {
     return 1;
    }
   }
  }
  else{
   var a1 = new Point2D(points[0][0],points[0][1]);
   var a2 = new Point2D(points[1][0],points[1][1]);
   var result = Intersection.intersectCircleLine(c, r, a1, a2)
   if (result.status == "Intersection") {
    return 1;
   }
  }
 }
}

function CircleEllipseIntersection(points,circle){

 var vector_points=[];
 var ecx=points[0];
 var ecy=points[1];
 var rx=points[2];
 var ry=points[3];
 var cx=circle.getAttributeNS(null,"cx");
 var cy=circle.getAttributeNS(null,"cy");
 var r=circle.getAttributeNS(null,"r");
 var cc = new Point2D(cx,cy);
 if (cx != null && cy != null && r != null){
  cx = parseFloat(cx);
  cy = parseFloat(cy);
  var ec = new Point2D(ecx,ecy);
  if (Math.pow((cx-ecx)/rx,2) + Math.pow((cy-ecy)/ry,2) <= 1){
   return 1;
  }
  var result = Intersection.intersectCircleEllipse(cc, r, ec, rx, ry)
  if (result.status == "Intersection") {
   return 1;
  }
 }
}
function addCircleLayer(circle){
 if (QueryManager.layers[num-1] == undefined){
  QueryManager.layers[num-1] = [];
  QueryManager.colors[num-1] = [];
  QueryManager.visibility[num-1] = [];
 }

 var cx = parseFloat(circle.getAttributeNS(null,"cx"));
 var cy = parseFloat(circle.getAttributeNS(null,"cy"));
 var r = parseFloat(circle.getAttributeNS(null,"r"));

 var C = viewport.append("circle")
  .attr("cx",cx)
  .attr("cy",cy)
  .attr("r",r)
  .attr("style", "opacity:" + VisDock.opacity + "; fill:" + VisDock.color[num-1]);

 QueryManager.layers[num-1].push(C);
 if (QueryManager.colors[num-1].length == 0){
  QueryManager.colors[num-1] = VisDock.color[num-1];
  QueryManager.visibility[num-1] = VisDock.opacity;
 }
}

function addPathLayer(path,t){
 if (QueryManager.layers[num-1] == undefined){
  QueryManager.layers[num-1] = [];
  QueryManager.colors[num-1] = [];
  QueryManager.visibility[num-1] = [];
 }

 var d = path.getAttributeNS(null,"d");
 var P = viewport.append("path")
  .attr("d",d)
  .attr("fill", VisDock.color[num-1])
  .attr("opacity", VisDock.opacity)
  .attr("stroke-width",1)
  .attr("transform","translate("+t[0]+","+t[1]+")")

 QueryManager.layers[num-1].push(P);
 if (QueryManager.colors[num-1].length == 0){
  QueryManager.colors[num-1] = VisDock.color[num-1];
  QueryManager.visibility[num-1] = VisDock.opacity;
 }
}

function addTextLayer(textstr,str,style,t){
 if (QueryManager.layers[num-1] == undefined){
  QueryManager.layers[num-1] = [];
  QueryManager.colors[num-1] = [];
  QueryManager.visibility[num-1] = [];
 }

 style.fill = VisDock.color[num-1];
 var posx = textstr.attr("x")
 var posy = textstr.attr("y")
 var P = viewport.append("text")
  .attr({"x":posx,"y":posy})
  .attr(style)
  //.attr("fill", VisDock.color[num-1])
  //.attr("transform","translate("+t[0]+","+t[1]+")")
  .text(str)
 QueryManager.layers[num-1].push(P);
 if (QueryManager.colors[num-1].length == 0){
  QueryManager.colors[num-1] = VisDock.color[num-1];
  QueryManager.visibility[num-1] = VisDock.opacity;
 }
}

function AddCircleColor(circle){
 if (QueryManager.layers[num-1] == undefined){
  QueryManager.layers[num-1] = [];
  QueryManager.colors[num-1] = [];
  QueryManager.visibility[num-1] = [];
 }
 circle.setAttributeNS(null, "style", "fill: " + VisDock.color[num-1]);
 QueryManager.layers[num-1].push(circle);
 if (QueryManager.colors[num-1].length == 0){
  QueryManager.colors[num-1] = VisDock.color[num-1];
  QueryManager.visibility[num-1] = VisDock.opacity;
 }
}
function ChangeCircleColor(circle,color){
 circle.setAttributeNS(null, "style", "fill: " + color);
}
//alert("done");