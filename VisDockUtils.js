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
	
	var vector_points = [];
	for (var j=0;j<points.length;j++){
		vector_points[j] = new Point2D(points[j][0], points[j][1])
	}	
	
	this.shapebound = shapebound;
	this.points = points;
	this.strpoints = strpoints;
	this.shapebound2D = new Polygon(shapebound);
	this.vector_points = vector_points;
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
visPolygon.prototype.polygonIntersection = function(polygon, inclusive, t) {

	var bound=new Polygon(polygon);
	var vector_points2 = [];

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
	var p2 = new Point2D(this.points[0],this.points[1])
	if (this.shapebound2D.pointInPolygon(p)){
		return 1;
	}
	if (bound.pointInPolygon(p2)){
		return 1;
	}	
	var result = Intersection.intersectPolygonPolygon(vector_points, this.vector_points2)
	if (result.status == "Intersection") {
		return 1;
	}
};
visPolygon.prototype.ellipseIntersection = function(ellipse, inclusive, t) {
	var cx=ellipse.getAttributeNS(null,"cx");
	var cy=ellipse.getAttributeNS(null,"cy");
	var c = new Point2D(cx,cy);
	if (ellipse.tagName == "circle"){
		var rx = ellipse.getAttributeNS(null,"r");
		var ry = rx;
	} else if (ellipse.tagName == "ellipse"){
		var rx = ellipse.getAttributeNS(null,"rx");
		var ry = ellipse.getAttributeNS(null,"ry");		
	}
	
	if (this.shapebound2D.pointInPolygon(c)){
		return 1;
	}
	if (Math.pow((cx-this.vector_points[0].x)/rx,2) + Math.pow((cy-this.vector_points[0].y)/ry,2) <= 1){
		return 1;
	}
	var result = Intersection.intersectEllipsePolygon(c, rx, ry, this.vector_points)
	if (result.status == "Intersection") {
		return 1;
	}		
};
visPolygon.prototype.lineIntersection = function(line, inclusive, t) {
	
	if (line.tagName == "polyline"){
		var points = line.getAttributeNS(null,"points").split(" ")		
		for (var j=0;j<points.length-1;j++){
			var pxy = points[j].split(",");
			var px = parseInt(pxy[0]);
			var py = parseInt(pxy[1]);
			var pxy2 = points[j+1].split(",");	
			var px2 = parseInt(pxy2[0]);
			var py2 = parseInt(pxy2[1]);
			var p1 = new Point2D(px,py);
			var p2 = new Point2D(px2,py2);				
			var result = Intersection.intersectLinePolygon(p1, p2, this.vector_points); //alert(result.status)
			if (result.status == "Intersection") {
				return 1;
			}
			if (this.shapebound2D.pointInPolygon(p1) || this.shapebound2D.pointInPolygon(p2)){
				return 1;
			}
		}
	} else if (line.tagName == "line") {
		var x1 = line.getAttributeNS(null,"x1");
		var y1 = line.getAttributeNS(null,"y1");
		var x2 = line.getAttributeNS(null,"x2");
		var y2 = line.getAttributeNS(null,"y2");
		var p1 = new Point2D(x1,y1)
		var p2 = new Point2D(x2,y2)
		var result = Intersection.intersectLinePolygon(p1, p2, this.vector_points); //alert(result.status)
		if (result.status == "Intersection") {
			return 1;
		}	
		if (result.status == "Intersection") {
			return 1;
		}
		if (this.shapebound2D.pointInPolygon(p1) || this.shapebound2D.pointInPolygon(p2)){
			return 1;
		}
	}
}

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
visEllipse.prototype.polygonIntersection = function(polygon, inclusive, t) {
	var vector_points = [];
	var points = polygon.getAttributeNS(null,"points").split(" ")
	for (var j=0;j<points.length;j++){
		var pxy = points[j].split(",");
		var px = parseInt(pxy[0]);
		var py = parseInt(pxy[1]);
		vector_points[j] = new Point2D(px,py)
	}

	var cx = this.points[0];
	var cy = this.points[1];

	var c = new Point2D(cx,cy);
	var rx = this.points[2];
	var ry = this.points[3];
	var bound = new Polygon(polygon)

	if (bound.pointInPolygon(c)){
		return 1;
	}

	if (Math.pow((cx-vector_points[0].x)/rx,2) + Math.pow((cy-vector_points[0].y)/ry,2) <= 1){
		return 1;
	}
	var result = Intersection.intersectEllipsePolygon(c, rx, ry, vector_points)
	if (result.status == "Intersection") {
		return 1;
	}	
};

visEllipse.prototype.ellipseIntersection = function(ellipse, inclusive, t) {
	var ecx=ellipse.getAttributeNS(null,"cx");
	var ecy=ellipse.getAttributeNS(null,"cy");
	if (ellipse.tagName == "circle"){
		var rx=ellipse.getAttributeNS(null,"rx");
		var ry=rx;
	} else if (ellipse.tagName == "ellipse"){
		var rx=ellipse.getAttributeNS(null,"rx");
		var ry=ellipse.getAttributeNS(null,"ry");		
	}
	var ec = new Point2D(ecx,ecy);
	
	var cx=this.points[0];
	var cy=this.points[1];
	var r1=this.points[2];
	var r2=this.points[3];
	var c = new Point2D(cx,cy);
	
	if (Math.pow((cx-ecx)/rx,2) + Math.pow((cy-ecy)/ry,2) <= 1){
		return 1;
	}
	var result = Intersection.intersectEllipseEllipse(c, r1, r2, ec, rx, ry)
	if (result.status == "Intersection") {
		return 1;
	}
};

visEllipse.prototype.lineIntersection = function(line, inclusive, t) {
	var c = new Point2D(this.points[0], this.points[1]);
	if (points.length > 2){
		for (var j=0;j<points.length-1;j++){
			var a1 = new Point2D(points[j][0],points[j][1]);
			var a2 = new Point2D(points[j+1][0],points[j+1][1]);
			var result = Intersection.intersectEllipseLine(c, this.points[2], this.points[3], a1, a2)
			if (result.status == "Intersection") {
				return 1;
			}
		}
	} else if (points.length == 2){
		var a1 = new Point2D(points[0][0],points[0][1]);
		var a2 = new Point2D(points[1][0],points[1][1]);
		var result = Intersection.intersectEllipseLine(c, this.points[2], this.points[3], a1, a2)
		if (result.status == "Intersection") {
			return 1;
		}
	}
};

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
visLine.prototype.pathIntersection = function(path, inclusive, t) {
	var P = new Path(path)
	if (this.points.length > 2){
		for (var j=0;j<points.length-1;j++){
			var line = document.createElementNS("http://www.w3.org/2000/svg","line");
			line.setAttributeNS(null,"x1",this.points[j][0])
			line.setAttributeNS(null,"y1",this.points[j][1])
			line.setAttributeNS(null,"x2",this.points[j+1][0])
			line.setAttributeNS(null,"y2",this.points[j+1][1])	
			var L = new Line(line);
			var result = Intersection.intersectPathShape(P, L); 
			if (result.status == "Intersection") {
				return 1;
			}
		}
	}
	else{
		var line = document.createElementNS("http://www.w3.org/2000/svg","line");
		line.setAttributeNS(null,"x1",this.points[0][0])
		line.setAttributeNS(null,"y1",this.points[0][1])
		line.setAttributeNS(null,"x2",this.points[1][0])
		line.setAttributeNS(null,"y2",this.points[1][1])			
		var L = new Line(line);
		var result = Intersection.intersectPathShape(P, L);
		if (result.status == "Intersection") {
			return 1;
		}	
	}		
};

visLine.prototype.polygonIntersection = function(polygon, inclusive, t) {
	var shapebound = new Polygon(polygon)
	var p1, p2;

	var vector_points = [];
	var points = polygon.getAttributeNS(null,"points").split(" ")
	for (var j=0;j<points.length;j++){
		var pxy = points[j].split(",");
		var px = parseInt(pxy[0]);
		var py = parseInt(pxy[1]);
		vector_points[j] = new Point2D(px,py)
	}

	for (var j=0;j<this.points.length-1;j++){
		p1 = new Point2D(this.points[j][0], this.points[j][1])
		p2 = new Point2D(this.points[j+1][0], this.points[j+1][1])

		if (shapebound.pointInPolygon(p1) || shapebound.pointInPolygon(p2)){
			return 1;
		}		

		var result = Intersection.intersectLinePolygon(p1, p2, vector_points); //alert(result.status)
		if (result.status == "Intersection") {
			return 1;
		}
	}	
};

visLine.prototype.ellipseIntersection = function(ellipse, inclusive, t) {
	var cx=circle.getAttributeNS(null,"cx");
	var cy=circle.getAttributeNS(null,"cy");
	var c = new Point2D(cx,cy)	
	if (ellipse.tagName == "circle"){ // Circle
		var rx=circle.getAttributeNS(null,"r");		
		var ry=rx;	
	} else if (ellipse.tagName == "ellipse") { // Circle
		var rx=circle.getAttributeNS(null,"rx");		
		var ry=circle.getAttributeNS(null,"ry");			
	}
	if (this.points.length > 2){
		for (var j=0;j<points.length-1;j++){
			var a1 = new Point2D(this.points[j][0],this.points[j][1]);
			var a2 = new Point2D(this.points[j+1][0],this.points[j+1][1]);
			var result = Intersection.intersectEllipseLine(c, rx, ry, a1, a2)
			if (result.status == "Intersection") {
				return 1;
			}
		}
	}
	else{
		var a1 = new Point2D(this.points[0][0],this.points[0][1]);
		var a2 = new Point2D(this.points[1][0],this.points[1][1]);
		var result = Intersection.intersectEllipseLine(c, rx, ry, a1, a2)
		if (result.status == "Intersection") {
			return 1;
		}
	}
};

visLine.prototype.lineIntersection = function(line, inclusive, t) {
	if (line.tagName == "polyline"){
		var vector_points = [];

		var points = line.getAttributeNS(null,"points").split(" ")
		for (var j=0;j<points.length-1;j++){
			var pxy = points[j].split(",");
			var pxy2 = points[j+1].split(",";)
			var px = parseInt(pxy[0]);
			var px2 = parseInt(pxy2[0]);
			var py = parseInt(pxy[1]);
			var py2 = parseInt(pxy2[1]);
			
			var P1 = new Point2D(px, py)
			var P2 = new Point2D(px2, py2)
			for (var j=0;j<this.points.length-1;j++){
				var p1 = new Point2D(this.points[j][0], this.points[j][1])
				var p2 = new Point2D(this.points[j+1][0], this.points[j+1][1])

				var result = Intersection.intersectLinePolygon(p1, p2, P1, P2); //alert(result.status)
				if (result.status == "Intersection") {
					return 1;
				}
			}
		}		
	} else if (line.tagName == "line"){
		var pxy = points[0].split(",");
		var pxy2 = points[1].split(",";)
		var px = parseInt(pxy[0]);
		var px2 = parseInt(pxy2[0]);
		var py = parseInt(pxy[1]);
		var py2 = parseInt(pxy2[1]);	
			
		var P1 = new Point2D(px, py)
		var P2 = new Point2D(px2, py2)
		for (var j=0;j<this.points.length-1;j++){
			p1 = new Point2D(this.points[j][0], this.points[j][1])
			p2 = new Point2D(this.points[j+1][0], this.points[j+1][1])

			var result = Intersection.intersectLinePolygon(p1, p2, P1, P2); //alert(result.status)
			if (result.status == "Intersection") {
				return 1;
			}
		}		
	}
};
