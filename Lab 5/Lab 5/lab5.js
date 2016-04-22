var shader; // Our shader program
var gl; // WebGL context
var alpha; // X rotation Euler angle
var beta; // Y rotation Euler angle
var gamma; // Y rotation Euler angle
var scaleX, scaleY;
var transX, transY;

function keyPressed(event){
	switch(event.code){
		case "KeyI":
			alpha -= .1;
			rotateAroundX();
			break;
			
		case "KeyJ":
			beta += .1;
			rotateAroundY();
			break;
			
		case "KeyK":
			alpha += .1;
			rotateAroundX();
			break;
			
		case "KeyL":
			beta -= .1;
			rotateAroundY();
			break;
			
		case "KeyU":
			gamma = gamma - 0.1;
			rotateAroundZ();
			break;
			
		case "KeyO":
			gamma += .1;
			rotateAroundZ();
			break;
			
		case "KeyW":
			transY += .1;
			translateOnY();
			break;
			
		case "KeyA":
			transX -= .1;
			translateOnX();
			break;
			
		case "KeyS":
			transY -= .1;
			translateOnY();
			break;
			
		case "KeyD":
			transX +=.1;
			translateOnX();
			break;
			
		case "KeyT":
			scaleY += .1;
			scaleOnY();
			break;
			
		case "KeyF":
			scaleX -= .1;
			scaleOnX();
			break;
			
		case "KeyG":
			scaleY -= .1;
			scaleOnY();
			break;
			
		case "KeyH":
			scaleX += .1;
			scaleOnX();
			break;
	}
}

function render(){
	// Do texture things!
	gl.uniform1i(gl.getUniformLocation(shader, "texMap0"), 0);
	
	// Draw!
	gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT ); // Clear the color and depth buffers!

	
	var numVertices = 18;
	
	gl.drawElements( gl.TRIANGLES, numVertices, gl.UNSIGNED_BYTE, 0 );

	requestAnimFrame(render); // Provide next frame upon browser's request. Will cause screen tearing
	                          // If desktop environment doesn't provide for refresh rate/vsync
							  // Uses browser's framebuffer for double buffering
}

function rotateAroundX(){
	alphaLoc = gl.getUniformLocation(shader, "alpha");
	gl.uniform1f(alphaLoc, alpha);
}

function rotateAroundY(){
	betaLoc = gl.getUniformLocation(shader, "beta");
	gl.uniform1f(betaLoc, beta);
}

function rotateAroundZ(){
	gammaLoc = gl.getUniformLocation(shader, "gamma");
	gl.uniform1f(gammaLoc, gamma);
}

function translateOnX(){
	transXLoc = gl.getUniformLocation(shader, "transX");
	gl.uniform1f(transXLoc, transX);
}

function translateOnY(){
	transYLoc = gl.getUniformLocation(shader, "transY");
	gl.uniform1f(transYLoc, transY);
}

function scaleOnX(){
	scaleXLoc = gl.getUniformLocation(shader, "scaleX");
	gl.uniform1f(scaleXLoc, scaleX);
}

function scaleOnY(){
	scaleYLoc = gl.getUniformLocation(shader, "scaleY");
	gl.uniform1f(scaleYLoc, scaleY);
}

function drawShapes(){
	// Initialize WebGL
	var mainCanvas = document.getElementById("gl-canvas");
	gl = WebGLUtils.setupWebGL(mainCanvas);
	if(!gl){
		alert("WebGL is not available on this machine. Do you have the proper files?");
	}
	
	// Set initial canvas state
	gl.viewport(0, 0, 1024, 1024); // Set render size of viewport
	gl.clearColor(0.0, 0.0, 0.0, 1.0); // Transparent color -- RGBA
	gl.enable( gl.DEPTH_TEST ) // Enable depth test culling -- renders 3D objects properly
	gl.clear(gl.COLOR_BUFFER_BIT); // Clear the buffer!
	gl.clear( gl.DEPTH_BUFFER_BIT );
	
	alpha = 0;
	beta = 0;
	gamma = 0;
	scaleX = 1;
	scaleY = 1;
	transX = 0;
	transY = 0;
	
	// Create points for Pyramid
	totArray = [
		vec4(-0.5, 0.0, -0.5, 1.0), //0, back-left
		vec4(0.5, 0.0, -0.5, 1.0), //1, back-right
		vec4(-0.5, 0.0, 0.5, 1.0), //2, front-left
		vec4(0.5, 0.0, 0.5, 1.0), //3, front-right
		vec4(0.0, 0.75, 0.0, 1.0) //4, top
	]; 
	
	var totColors = [
		vec4( 1.0, 0.0, 0.0, 1.0 ),
		vec4( 0.0, 1.0, 0.0, 1.0 ),
		vec4( 0.0, 0.0, 1.0, 1.0 ),
		vec4( 0.5, 0.5, 0.0, 1.0 ),
		vec4( 0.0, 0.5, 0.5, 1.0 )
	];

	var indexList = [
		0, 1, 4, // back-left, back-right, top
		2, 0, 4, // front-right, back-left, top
		2, 3, 4, // front-left, front-right, top
		1, 3, 4, // back-right, front-right, top
		0, 1, 2, // back-left, back-right, front-left
		1, 3, 2 // back-right, front-right, front-left
	];
	
	var usableTotArray = [
		vec4(-0.5, 0.0, -0.5, 1.0),
		vec4(0.5, 0.0, -0.5, 1.0),
		vec4(0.0, 0.75, 0.0, 1.0),
		vec4(-0.5, 0.0, 0.5, 1.0),
		vec4(-0.5, 0.0, -0.5, 1.0),
		vec4(0.0, 0.75, 0.0, 1.0),
		vec4(-0.5, 0.0, 0.5, 1.0),
		vec4(0.5, 0.0, 0.5, 1.0), 
		vec4(0.0, 0.75, 0.0, 1.0),
		vec4(0.5, 0.0, -0.5, 1.0),
		vec4(0.5, 0.0, 0.5, 1.0), 
		vec4(0.0, 0.75, 0.0, 1.0),
		vec4(-0.5, 0.0, -0.5, 1.0),
		vec4(0.5, 0.0, -0.5, 1.0),
		vec4(-0.5, 0.0, 0.5, 1.0),
		vec4(0.5, 0.0, -0.5, 1.0),
		vec4(0.5, 0.0, 0.5, 1.0),
		vec4(-0.5, 0.0, 0.5, 1.0)
	];
	
	var usableIndexList = [
		0, 1, 2,
		3, 4, 5,
		6, 7, 8,
		9, 10, 11,
		12, 13, 14,
		15, 16, 17
	];
	
	var textureCoords = [
		0.0, 0.0,
		0.5, 1.0,
		1.0, 0.0,
		0.0, 0.0,
		0.5, 1.0,
		1.0, 0.0,
		0.0, 0.0,
		0.5, 1.0,
		1.0, 0.0,
		0.0, 0.0,
		0.5, 1.0,
		1.0, 0.0,
		0.0, 0.0,
		0.5, 1.0,
		1.0, 0.0,
		0.0, 0.0,
		0.5, 1.0,
		1.0, 0.0,
	];
	
	// Set up buffers and data
	var indexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(usableIndexList), gl.STATIC_DRAW);
	
	var colorBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(totColors), gl.STATIC_DRAW);
	
	var vertexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(usableTotArray), gl.STATIC_DRAW);
	
	// Initialize shaders
	shader = initShaders( gl, "vertex-shader", "fragment-shader" ); // Construct a shader program from the shaders in our HTML
	gl.useProgram( shader ); // Use that program
	
	var position = gl.getAttribLocation( shader, "position" );    // Get position variable location from vertex shader
	gl.vertexAttribPointer( position, 4, gl.FLOAT, false, 0, 0 ); // Get information on the actual type of data to be loaded into variable
																  // In this case, 4D Floats
	gl.enableVertexAttribArray( position ); // Enable the variable for access
	
	//var vertexColor = gl.getAttribLocation(shader, "vertexColor"); // Get address to vertexColor uniform
	//gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
	//gl.vertexAttribPointer( vertexColor, 4, gl.FLOAT, false, 0, 0 );
	//gl.enableVertexAttribArray( vertexColor );
	
	// Set initial scale and translate uniform values to allow rendering to work
	scaleXLoc = gl.getUniformLocation(shader, "scaleX");
	gl.uniform1f(scaleXLoc, scaleX);
	scaleYLoc = gl.getUniformLocation(shader, "scaleY");
	gl.uniform1f(scaleYLoc, scaleY);
	
	transXLoc = gl.getUniformLocation(shader, "transX");
	gl.uniform1f(transXLoc, transX);
	transYLoc = gl.getUniformLocation(shader, "transY");
	gl.uniform1f(transYLoc, transY);
	
	
	// Initialize texture
	var picture = document.getElementById("BlueRogues");
	textureImage = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D, textureImage);
	gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, picture);
	//gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	//gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
	//gl.generateMipmap(gl.TEXTURE_2D);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	
	var texCoordBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(textureCoords), gl.STATIC_DRAW);
	
	var texCoordLoc = gl.getAttribLocation(shader, "textureCoordinate");
	gl.vertexAttribPointer( texCoordLoc, 2, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray(texCoordLoc);
	
	
	//setInterval( render, 16 ); // lock update interval to 60hz
	// Note: Independent of browser execution, so may cause issues
	
	render();
	
}