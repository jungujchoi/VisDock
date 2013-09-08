function visPolygon(points){
	var shapebound = document.createElementNS("http://www.w3.org/2000/svg","polygon");
	var strpoints=[];

	for(var i=0;i<points.length;i++){
		if (i != points.length-1){
			strpoints=[strpoints + (points[i][0]) + "," + (points[i][1]) + " "];
		}
		else{
			strpoints=[strpoints + (points[i][0]) + "," + (points[i][1]) + " "];
		}
	}
	strpoints=[strpoints + (points[0][0]) + "," + (points[0][1])];
	shapebound.setAttributeNS(null,"points",strpoints);
	this.shapebound = shapebound;
	this.points = points;
	this.strpoints = strpoints;
	this.shapebound2D = new Polygon(shapebound);
}
visPolygon.prototype.pathIntersection = function(path, inclusive, t) {
	var P=new Path(path);
	var s=path.getAttributeNS(null,"d")
	var rel = ["M","L","H","V","C","S","Q","T","A","Z"," ",","];
	var i = 0;
	var j = 0;
	var x = "";
	var y = "";
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
		} else if (i == 1){
			if (rel.indexOf(s[j]) == -1){
				y = y + s[j].toString();
			}
			else {
				i++;
			}
		}
		j++
	}
	var pt = new Point2D(x,y);
	if (this.shapebound2D.pointInPolygon(pt)){
		if (inclusive == false){
			var result = Intersection.intersectPathShape(P, this.shapebound2D);
			if (result.status == "Intersection") {
				return 0;
			} else{
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
};
visPolygon.prototype.polygonIntersection = function(polygon, t) {
	var bound=new Polygon(shapebound);
	var npoly=new Polygon(polygon);
	var vector_points=[];
	var vector_points2 = [];

	for (var j=0;j<this.points.length;j++){
		vector_points[j] = new Point2D(this.points[j][0], this.points[j][1])
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

	if (this.shapebound2D.pointInPolygon(p)){
		return 1;
	}
	var result = Intersection.intersectPolygonPolygon(vector_points, vector_points2)
	if (result.status == "Intersection") {
		return 1;
	}
};
visPolygon.prototype.ellipseIntersection = function() {
	
};
visPolygon.prototype.lineIntersection = function() {};

function visEllipse(points){
	var ellipse = document.createElementNS("http://www.w3.org/2000/svg","ellipse");
	var ecx=points[0];
	var ecy=points[1];
	var rx=points[2];
	var ry=points[3];

	ellipse.setAttributeNS(null,"cx",ecx)
	ellipse.setAttributeNS(null,"cy",ecy)
	ellipse.setAttributeNS(null,"rx",rx)
	ellipse.setAttributeNS(null,"ry",ry) 

	this.ellipse = ellipse;
	this.points = points;
	this.ellipse2D = new Ellipse(points)
}
visEllipse.prototype.pathIntersection = function(path, inclusive, t) {
	var P = new Path(path);
	var s=path.getAttributeNS(null,"d")

	var rel = ["M","L","H","V","C","S","Q","T","A","Z"," ",","];
	var i = 0;
	var j = 0;
	var x = "";
	var y = "";

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
		} else if (i == 1){
			if (rel.indexOf(s[j]) == -1){
				y = y + s[j].toString();
			}
			else {
				i++;
			}
		}
		j++
	}
	var cx = this.points[0];
	var cy = this.points[1];
	var rx = this.points[2];
	var ry = this.points[3];

	x = parseFloat(x); 
	y = parseFloat(y); 

	if (inclusive == true){ 
		var result = Intersection.intersectPathShape(P, this.ellipse2D)
		if (result.status == "Intersection") {
			return 1;
		}
	}
	if (Math.pow((cx-x)/rx,2) + Math.pow((cy-y)/ry,2) <= 1){
		return 1;
	}
};
visEllipse.prototype.polygonIntersection = function() {};
visEllipse.prototype.ellipseIntersection = function() {};
visEllipse.prototype.lineIntersection = function() {};

function visLine(points){
	if (points.length == 2){
		var line = document.createElementNS("http://www.w3.org/2000/svg","line");
		var x1=points[0][0];
		var y1=points[0][1];
		var x2=points[1][0];
		var y2=points[1][1];
		line.setAttributeNS(null,"x1",x1);
		line.setAttributeNS(null,"y1",y1);
		line.setAttributeNS(null,"x2",x2);
		line.setAttributeNS(null,"y2",y2);
	} else if (points.length > 2){
		var line = document.createElementNS("http://www.w3.org/2000/svg","polyline");
		var strpoints=[];

		for(var i=0;i<points.length;i++){
			if (i != points.length-1){
				strpoints=[strpoints + (points[i][0]) + "," + (points[i][1]) + " "];
			}
			else{
				strpoints=[strpoints + (points[i][0]) + "," + (points[i][1]) + " "];
			}
		}		
		strpoints=[strpoints + (points[0][0]) + "," + (points[0][1])];
		line.setAttributeNS(null,"points",strpoints);
	}
	this.line = line;
	this.points = points;
}
visLine.prototype.pathIntersection = function() {
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
};
visLine.prototype.polygonIntersection = function() {};
visLine.prototype.ellipseIntersection = function() {};
visLine.prototype.lineIntersection = function() {};