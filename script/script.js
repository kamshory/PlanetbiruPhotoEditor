var canvas;
var canvasid = 'maincanvas';
var context;
var pix;
var GDHistory = new Array();
var addHistoryEffect = false;
var historyPos = 0;

var clone = (function(){ 
  return function (obj) { Clone.prototype=obj; return new Clone() };
  function Clone(){}
}());
function replaceStr(inFindStr,inReplStr,inText,inCaseSensitive){
if(!inCaseSensitive) inCaseSensitive=false;
var searchFrom=0;var offset=0;var outText="";var searchText="";
if(inCaseSensitive==null){inCaseSensitive=false;}
if(inCaseSensitive){searchText=inText.toLowerCase();inFindStr=inFindStr.toLowerCase();} 
else{searchText=inText;}
offset=searchText.indexOf(inFindStr, searchFrom);
while(offset!=-1){outText+=inText.substring(searchFrom, offset);outText+=inReplStr;searchFrom=offset + inFindStr.length;offset=searchText.indexOf(inFindStr, searchFrom);}
outText+=inText.substring(searchFrom,inText.length);
return (outText);
}

function rgb2hsl(rgba)
{
	var r = rgba[0]/255,
		g = rgba[1]/255,
		b = rgba[2]/255,
		a = rgba[3],
		min = Math.min(r, g, b),
		max = Math.max(r, g, b),
		delta = max - min,
		h, s, l;

	if (max == min)
		h = 0;
	else if (r == max)
		h = (g - b) / delta;
	else if (g == max)
		h = 2 + (b - r) / delta;
	else if (b == max)
		h = 4 + (r - g) / delta;

	h = Math.min(h * 60, 360);
	
	if (h < 0)
		h += 360;
	
	l = (min + max) / 2;
	
	if (max == min)
		s = 0;
	else if (l <= 0.5)
		s = delta / (max + min);
	else
		s = delta / (2 - max - min);
	
	return [h, s * 100, l * 100, a];
}

function hsl2rgb(hsla) {
  var h = hsla[0] / 360,
      s = hsla[1] / 100,
      l = hsla[2] / 100,
      a = hsla[3],
      t1, t2, t3, rgb, val;

  if (s == 0) {
    val = l * 255;
    return [val, val, val, a];
  }

  if (l < 0.5)
    t2 = l * (1 + s);
  else
    t2 = l + s - l * s;
  t1 = 2 * l - t2;

  rgb = [0, 0, 0];
  var v;
  for (var i = 0; i < 3; i++) {
    t3 = h + 1 / 3 * - (i - 1);
    t3 < 0 && t3++;
    t3 > 1 && t3--;

    if (6 * t3 < 1)
      val = t1 + (t2 - t1) * 6 * t3;
    else if (2 * t3 < 1)
      val = t2;
    else if (3 * t3 < 2)
      val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
    else
      val = t1;

	v = Math.round(val * 255);
	if(v>255) v = 255;
    rgb[i] = v;
  }
  rgb[3] = a;
  return rgb;
}

function imageObject()
{
	this.original_image_string = '';
	this.original_image_string_64 = '';
	this.original_image_bitmap = [[],[]];
	this.original_image_width = 1;
	this.original_image_height = 1;
	this.image_to_edit_bitmap = [[],[]];
	this.image_to_edit_width = 1;
	this.image_to_edit_height = 1;
	this.canvas_object = null;
	this.canvas_id = '';
	this.context = null;
	return this;
}

var ppeImage = imageObject();

function handleFileSelect(evt)
{
	var files = evt.target.files;
	for(var i = 0,f; f = files[i]; i++)
	{
		if (!f.type.match('image.*'))
		{
			continue;
		}
		var reader = new FileReader();
		reader.onload = (function(theFile)
		{
			return function(e) 
			{
				 loadImage(canvasid, e.target.result);
			};
		})(f);
		reader.readAsDataURL(f);
	}
	$('#dialog-file-open').dialog('destroy');
}

function loadImage(canvasid, image){
	$('#maincanvas-preview').css('display', 'none');
	$('#resize-control').css('display', 'none');
	
	canvas = document.getElementById(canvasid);
	context = canvas.getContext('2d');
	var imageObj = new Image();
	imageObj.onload = function() {
		$('#'+canvasid).css('display', 'block');
		$('#'+canvasid).attr('width', imageObj.width)
		$('#'+canvasid).attr('height', imageObj.height);
		$('#'+canvasid).css({'width':imageObj.width+'px','height':imageObj.height+'px'});
		$('#maincanvas-preview').attr('width', imageObj.width)
		$('#maincanvas-preview').attr('height', imageObj.height);
		$('#maincanvas-preview').css({'width':imageObj.width+'px','height':imageObj.height+'px'});
		
		context.drawImage(imageObj, 0, 0);
		
		ppeImage.canvas_object = canvas;
		ppeImage.canvas_id = canvasid;
		ppeImage.context = context;
		ppeImage.original_image_string_64 = image;
		ppeImage.original_image_width = imageObj.width;
		ppeImage.original_image_height = imageObj.height;
		ppeImage.original_image_bitmap = getMatrix(canvasid, context, 0, 0, imageObj.width, imageObj.height);
		
		ppeImage.image_to_edit_bitmap = original_image_bitmap;
		ppeImage.image_to_edit_width = imageObj.width;
		ppeImage.image_to_edit_height = imageObj.height;
		
		var imgd =  ppeImage.context.getImageData(0, 0, ppeImage.image_to_edit_width, ppeImage.image_to_edit_height);
		historyClear();
		addHistory({image:imgd}, ppeImage.image_to_edit_width, ppeImage.image_to_edit_height, 'original');
	};
	imageObj.src = image;
	$('#menu1').css('display', 'none');
	$('#menu2').css('display', 'block');
}


function drawImageToCanvas(canvasid, image){
	ppeImage = image;
	canvas = document.getElementById(canvasid);
	context = canvas.getContext('2d');
	var imageObj = new Image();
	imageObj.onload = function() {
		$('#'+canvasid).attr('width', imageObj.width)
		$('#'+canvasid).attr('height', imageObj.height);
		$('#'+canvasid).css({'width':imageObj.width+'px','height':imageObj.height+'px'});
		$('#maincanvas-preview').attr('width', imageObj.width)
		$('#maincanvas-preview').attr('height', imageObj.height);
		$('#maincanvas-preview').css({'width':imageObj.width+'px','height':imageObj.height+'px'});
		context.drawImage(imageObj, 0, 0);
		
		ppeImage.canvas_object = canvas;
		ppeImage.canvas_id = canvasid;
		ppeImage.context = context;
		ppeImage.original_image_string_64 = image;
		ppeImage.original_image_width = imageObj.width;
		ppeImage.original_image_height = imageObj.height;
		ppeImage.original_image_bitmap = getMatrix(canvasid, context, 0, 0, imageObj.width, imageObj.height);
		
		context.font="40px Verdana";
		context.strokeStyle = '#FFFFFF';
		context.strokeText("Hello World",10,50);
	};
	imageObj.src = image;
}

var matrix;
var matrix2;
function erase(x, y, opt)
{
	var shape = opt.shape;
	if(!shape) shape = 'rectangle';
	var radius = opt.radius;
	
	var vstart = y - radius;
	var vstop = y + radius;
	var hstart = x - radius;
	var hstop = x + radius;
	var i, j, k;
	
	if(vstart<0) vstart = 0;
	if(vstop>ppeImage.image_to_edit_height) vstop = ppeImage.image_to_edit_height;
	if(hstart<0) hstart = 0;
	if(hstop>ppeImage.image_to_edit_width) hstop = ppeImage.image_to_edit_width;
	
	matrix = getMatrix(ppeImage.canvas_id, ppeImage.context, 0, 0, ppeImage.image_to_edit_width, ppeImage.image_to_edit_height);
	for(j = hstart; j<hstop; j++)
	{
		for(i = vstart; i<vstop; i++)
		{
			matrix[j][i][3] = 0;
		}
	}
	setMatrix(ppeImage.canvas_id, ppeImage.context, 0, 0, ppeImage.image_to_edit_width, ppeImage.image_to_edit_height, matrix);
	
}
function effectInvertColor(x, y, width, height)
{
	var ppe;
	if(resizeMode)
	{
		ppe = ppeImageTmp;
	}
	else
	{
		ppe = ppeImage;
	}
	if(!x) x = 0;
	if(!y) y = 0;
	if(!width) width = ppe.image_to_edit_width;
	if(!height) height = ppe.image_to_edit_height;
	
	var imgd =  ppe.context.getImageData(0, 0, width, height);
	pix = imgd.data;
	for (var i = 0, n = pix.length; i < n; i += 4) {
		pix[i  ] = 255 - pix[i  ];
		pix[i+1] = 255 - pix[i+1];
		pix[i+2] = 255 - pix[i+2];
		// i+3 is alpha (the fourth element)
	}
	ppe.context.putImageData(imgd, x, y);
	var imgd =  ppe.context.getImageData(0, 0, ppe.image_to_edit_width, ppe.image_to_edit_height);
	addHistory({image:imgd}, ppe.image_to_edit_width, ppe.image_to_edit_height, 'invert-color');
}

function effectGrayScale(canvasid, context, x, y, width, height)
{
	var ppe;
	if(resizeMode)
	{
		ppe = ppeImageTmp;
	}
	else
	{
		ppe = ppeImage;
	}
	if(!canvasid) canvasid = ppe.canvas_id;
	if(!context) context = ppe.context;
	if(!x) x = 0;
	if(!y) y = 0;
	if(!width) width = ppe.image_to_edit_width;
	if(!height) height = ppe.image_to_edit_height;
	
	var imgd =  context.getImageData(x, y, width, height);
	pix = imgd.data;
	var gs;
	for (var i = 0, n = pix.length; i < n; i += 4) {
		gs = (0.299*pix[i  ]) + (0.587*pix[i+1]) + (0.114*pix[i+2]);
		pix[i  ] = gs;
		pix[i+1] = gs;
		pix[i+2] = gs;
		// i+3 is alpha (the fourth element)
	}
	context.putImageData(imgd, x, y);
	var imgd =  ppe.context.getImageData(0, 0, ppe.image_to_edit_width, ppe.image_to_edit_height);
	addHistory({image:imgd}, ppe.image_to_edit_width, ppe.image_to_edit_height, 'gray-scale');
}

function effectSepia(canvasid, context, x, y, width, height)
{
	var ppe;
	if(resizeMode)
	{
		ppe = ppeImageTmp;
	}
	else
	{
		ppe = ppeImage;
	}
	if(!canvasid) canvasid = ppe.canvas_id;
	if(!context) context = ppe.context;
	if(!x) x = 0;
	if(!y) y = 0;
	if(!width) width = ppe.image_to_edit_width;
	if(!height) height = ppe.image_to_edit_height;
	
	var imgd =  context.getImageData(x, y, width, height);
	pix = imgd.data;
	var gs;
	var hsla;
	var rgba;
	for (var i = 0, n = pix.length; i < n; i += 4) {
		hsla = rgb2hsl([pix[i  ], pix[i+1], pix[i+2], pix[i+3]]);
		rgba = hsl2rgb([36, 50, hsla[2], hsla[3]]);
		
		pix[i  ] = rgba[0];
		pix[i+1] = rgba[1];
		pix[i+2] = rgba[2];
		// i+3 is alpha (the fourth element)
	}
	context.putImageData(imgd, x, y);
	var imgd =  ppe.context.getImageData(0, 0, ppe.image_to_edit_width, ppe.image_to_edit_height);
	addHistory({image:imgd}, ppe.image_to_edit_width, ppe.image_to_edit_height, 'sepia');
}

function effectBrightness(br, canvasid, context, x, y, width, height)
{
	if(!canvasid) canvasid = ppeImage.canvas_id;
	if(!context) context = ppeImage.context;
	var imgd =  context.getImageData(x, y, width, height);
	pix = imgd.data;
	for (var i = 0, n = pix.length; i < n; i += 4) {
		pix[i  ] = pix[i  ] + br;
		pix[i+1] = pix[i+1] + br;
		pix[i+2] = pix[i+2] + br;
	}
	context.putImageData(imgd, x, y);
}

function effectContrast(ct, canvasid, context, x, y, width, height)
{
	if(!canvasid) canvasid = ppeImage.canvas_id;
	if(!context) context = ppeImage.context;
	var imgd =  context.getImageData(x, y, width, height);
	pix = imgd.data;
	for (var i = 0, n = pix.length; i < n; i += 4) {
		pix[i  ] = pix[i  ] + ((pix[i  ]-128) * ct / 128);
		pix[i+1] = pix[i+1] + ((pix[i+1]-128) * ct / 128);
		pix[i+2] = pix[i+2] + ((pix[i+2]-128) * ct / 128);
		// i+3 is alpha (the fourth element)
	}
	context.putImageData(imgd, x, y);
}

function effectBrightnessContrast(br, ct, canvasid, context, x, y, width, height)
{
	if(!canvasid) canvasid = ppeImage.canvas_id;
	if(!context) context = ppeImage.context;
	var imgd =  context.getImageData(x, y, width, height);
	pix = imgd.data;
	for (var i = 0, n = pix.length; i < n; i += 4) {
		pix[i  ] = pix[i  ] + ((pix[i  ]-128) * ct / 128) + br;
		pix[i+1] = pix[i+1] + ((pix[i+1]-128) * ct / 128) + br;
		pix[i+2] = pix[i+2] + ((pix[i+2]-128) * ct / 128) + br;
		// i+3 is alpha (the fourth element)
	}
	context.putImageData(imgd, x, y);
}


function effectOpacity(opa, canvasid, context, x, y, width, height)
{
	if(!canvasid) canvasid = ppeImage.canvas_id;
	if(!context) context = ppeImage.context;
	var imgd =  context.getImageData(x, y, width, height);
	pix = imgd.data;
	for (var i = 0, n = pix.length; i < n; i += 4) {
		pix[i+3] = opa; 
	}
	context.putImageData(imgd, x, y);
}

function effectRGB(red, green, blue, canvasid, context, x, y, width, height)
{
	if(!canvasid) canvasid = ppeImage.canvas_id;
	if(!context) context = ppeImage.context;
	var imgd =  context.getImageData(x, y, width, height);
	pix = imgd.data;
	var red2, green2, blue2;
	for (var i = 0, n = pix.length; i < n; i += 4) {
		red2   = pix[i  ]*((100+red)/100);
		green2 = pix[i+1]*((100+green)/100);
		blue2  = pix[i+2]*((100+blue)/100);
		if(red2>255) red2 = 255;
		if(green2>255) green2 = 255;
		if(blue2>255) blue2 = 255;
		
		pix[i  ] = red2; 
		pix[i+1] = green2; 
		pix[i+2] = blue2; 
	}
	context.putImageData(imgd, x, y);
}

function getPixel(x, y, canvasid, context, width, height)
{
	if(!x) x = 0;
	if(!y) y = 0;
	
	if(!canvasid) canvasid = ppeImage.canvas_id;
	if(!context) context = ppeImage.context;
	if(!width) width = ppeImage.image_to_edit_width;
	if(!height) height = ppeImage.image_to_edit_height;
	
	imgd  = context.getImageData(0, 0, width, height);
	pix   = imgd.data;
	
	var red   = pix[(y*width*4) + (x*4) + 0];	
	var green = pix[(y*width*4) + (x*4) + 1];	
	var blue  = pix[(y*width*4) + (x*4) + 2];
	var alpha = pix[(y*width*4) + (x*4) + 3];
	return [red, green, blue, alpha];
}

function getPixelFromPix(x, y, pix, width, height)
{
	if(!width) width = ppeImage.image_to_edit_width;
	if(!height) height = ppeImage.image_to_edit_height;
	var red   = pix[(y*width*4) + (x*4) + 0];	
	var green = pix[(y*width*4) + (x*4) + 1];	
	var blue  = pix[(y*width*4) + (x*4) + 2];
	var alpha = pix[(y*width*4) + (x*4) + 3];
	return [red, green, blue, alpha];
}

function getMatrix(canvasid, context, x, y, width, height)
{
	imgd  = context.getImageData(x, y, width, height);
	pix   = imgd.data;
	
	matrix = new Array();
	
	for(w = x; w<(x+width); w++)
	{
		matrix[w] = new Array();
		for(h = y; h<(y+height); h++)
		{
			var red   = pix[(h*width*4) + (w*4) + 0];	
			var green = pix[(h*width*4) + (w*4) + 1];	
			var blue  = pix[(h*width*4) + (w*4) + 2];
			var alpha = pix[(h*width*4) + (w*4) + 3];
			matrix[w][h] = [red, green, blue, alpha];
		}
	}
	return matrix;
}

function setMatrix(canvasid, context, x, y, width, height, matrix)
{
	var imgd =  context.getImageData(x, y, width, height);
	pix = imgd.data;
	
	var h, w;
	for(w = x; w<(x+width); w++)
	{
		for(h = y; h<(y+height); h++)
		{
			pix[(h*width*4) + (w*4) + 0] = matrix[w][h][0];
			pix[(h*width*4) + (w*4) + 1] = matrix[w][h][1];
			pix[(h*width*4) + (w*4) + 2] = matrix[w][h][2];
			pix[(h*width*4) + (w*4) + 3] = matrix[w][h][3];
		}
	}
	context.putImageData(imgd, x, y);
}
function effectFlipHorizontal(canvasid, context, x, y, width, height)
{
	var ppe;
	if(resizeMode)
	{
		ppe = ppeImageTmp;
	}
	else
	{
		ppe = ppeImage;
	}
	if(!canvasid) canvasid = ppe.canvas_id;
	if(!context) context = ppe.context;
	if(!x) x = 0;
	if(!y) y = 0;
	if(!width) width = ppe.image_to_edit_width;
	if(!height) height = ppe.image_to_edit_height;
	
	matrix = getMatrix(canvasid, context, x, y, width, height);
	matrix2 = new Array();
	var w, h;
	for(w = 0; w<(width-x); w++)
	{
		matrix2[w] = new Array();
		for(h = 0; h<(height-y); h++)
		{
			matrix2[w][h] = matrix[width-w-1][h];
		}
	}
	setMatrix(canvasid, context, x, y, width, height, matrix2);	
	var imgd =  ppe.context.getImageData(0, 0, ppe.image_to_edit_width, ppe.image_to_edit_height);
	addHistory({image:imgd}, ppe.image_to_edit_width, ppe.image_to_edit_height, 'flip-horizontal');
}

function effectFlipVertical(canvasid, context, x, y, width, height)
{
	var ppe;
	if(resizeMode)
	{
		ppe = ppeImageTmp;
	}
	else
	{
		ppe = ppeImage;
	}
	if(!canvasid) canvasid = ppe.canvas_id;
	if(!context) context = ppe.context;
	if(!x) x = 0;
	if(!y) y = 0;
	if(!width) width = ppe.image_to_edit_width;
	if(!height) height = ppe.image_to_edit_height;
	
	matrix = getMatrix(canvasid, context, x, y, width, height);
	matrix2 = new Array();
	var w, h;
	for(w = 0; w<(width-x); w++)
	{
		matrix2[w] = new Array();
		for(h = 0; h<(height-y); h++)
		{
			matrix2[w][h] = matrix[w][height-h-1];
		}
	}
	setMatrix(canvasid, context, x, y, width, height, matrix2);	
	var imgd =  ppe.context.getImageData(0, 0, ppe.image_to_edit_width, ppe.image_to_edit_height);
	addHistory({image:imgd}, ppe.image_to_edit_width, ppe.image_to_edit_height, 'flip-vertical');
}
function effectRotate(angle, canvasid, context, x, y, width, height)
{
	if(!angle) angle = 0;
	var ppe;
	ppe = ppeImage;
	if(!canvasid) canvasid = ppe.canvas_id;
	if(!context) context = ppe.context;
	if(!x) x = 0;
	if(!y) y = 0;
	if(!width) width = ppe.image_to_edit_width;
	if(!height) height = ppe.image_to_edit_height;
	
	matrix = getMatrix(canvasid, context, x, y, width, height);
	matrix2 = new Array();
	var w, h;
	
	if(angle == 90)
	{
		for(w = 0; w<(height-y); w++)
		{
			matrix2[w] = new Array();
			for(h = 0; h<(width-x); h++)
			{
				matrix2[w][h] = matrix[h][height-w-1];
			}
		}
		document.getElementById(canvasid).width = height;
		document.getElementById(canvasid).height = width;
		$('#'+canvasid).css({'width':height+'px','height':width+'px'});
		ppe.image_to_edit_width = height;
		ppe.image_to_edit_height = width;
		var canvas = document.getElementById(canvasid);
		context = canvas.getContext('2d');
		context.fillStyle="#FFFFFF";
		context.fillRect(0,0,height,width);
		setMatrix(canvasid, context, y, x, height, width, matrix2);	
		var imgd =  ppe.context.getImageData(0, 0, ppe.image_to_edit_width, ppe.image_to_edit_height);
		addHistory({image:imgd}, ppe.image_to_edit_width, ppe.image_to_edit_height, 'rotate-clockwise');
	}
	else if(angle == 180)
	{
	
		for(w = 0; w<(width-x); w++)
		{
			matrix2[w] = new Array();
			for(h = 0; h<(height-y); h++)
			{
				matrix2[w][h] = matrix[width-w-1][height-h-1];
			}
		}
		setMatrix(canvasid, context, x, y, width, height, matrix2);	
		var imgd =  ppe.context.getImageData(0, 0, ppe.image_to_edit_width, ppe.image_to_edit_height);
		addHistory({image:imgd}, ppe.image_to_edit_width, ppe.image_to_edit_height, 'rotate-180');
	}
	else if(angle == 270)
	{
		for(w = 0; w<(height-y); w++)
		{
			matrix2[w] = new Array();
			for(h = 0; h<(width-x); h++)
			{
				matrix2[w][h] = matrix[width-h-1][w];
			}
		}
		document.getElementById(canvasid).width = height;
		document.getElementById(canvasid).height = width;
		$('#'+canvasid).css({'width':height+'px','height':width+'px'});
		ppe.image_to_edit_width = height;
		ppe.image_to_edit_height = width;
		var canvas = document.getElementById(canvasid);
		context = canvas.getContext('2d');
		context.fillStyle="#FFFFFF";
		context.fillRect(0,0,height,width);
		setMatrix(canvasid, context, y, x, height, width, matrix2);	
		var imgd =  ppe.context.getImageData(0, 0, ppe.image_to_edit_width, ppe.image_to_edit_height);
		addHistory({image:imgd}, ppe.image_to_edit_width, ppe.image_to_edit_height, 'rotate-counterclockwise');
	}
	if(resizeMode)
	{
		TBResize(0);
	}
}

function effectHue(hue, canvasid, context, x, y, width, height)
{
	if(!canvasid) canvasid = ppeImage.canvas_id;
	if(!context) context = ppeImage.context;
	var imgd =  context.getImageData(x, y, width, height);
	pix = imgd.data;
	var hsl;
	var pix2;
	for (var i = 0, n = pix.length; i < n; i += 4) {
		// change hue
		pix2 = changeHue([pix[i   ], pix[i+1], pix[i+2], pix[i+3]], hue);
		pix[i  ] = pix2[0];
		pix[i+1] = pix2[1];
		pix[i+2] = pix2[2];
		// i+3 is alpha (the fourth element)
	}
	context.putImageData(imgd, x, y);
}

function effectSaturation(sat, canvasid, context, x, y, width, height)
{
	if(!canvasid) canvasid = ppeImage.canvas_id;
	if(!context) context = ppeImage.context;
	var imgd =  context.getImageData(x, y, width, height);
	pix = imgd.data;
	var hsl;
	var pix2;
	for (var i = 0, n = pix.length; i < n; i += 4) {
		pix2 = changeSaturation([pix[i   ], pix[i+1], pix[i+2], pix[i+3]], sat);
		pix[i  ] = pix2[0];
		pix[i+1] = pix2[1];
		pix[i+2] = pix2[2];
	}
	context.putImageData(imgd, x, y);
}

function effectLuminance(lum, canvasid, context, x, y, width, height)
{
	if(!canvasid) canvasid = ppeImage.canvas_id;
	if(!context) context = ppeImage.context;
	var imgd =  context.getImageData(x, y, width, height);
	pix = imgd.data;
	var hsl;
	var pix2;
	for (var i = 0, n = pix.length; i < n; i += 4) {
		pix2 = changeLuminance([pix[i   ], pix[i+1], pix[i+2], pix[i+3]], lum);
		pix[i  ] = pix2[0];
		pix[i+1] = pix2[1];
		pix[i+2] = pix2[2];
	}
	context.putImageData(imgd, x, y);
}

function effectHSL(hue, sat, lum, canvasid, context, x, y, width, height)
{
	if(!canvasid) canvasid = ppeImage.canvas_id;
	if(!context) context = ppeImage.context;
	var imgd =  context.getImageData(x, y, width, height);
	pix = imgd.data;
	var rgba, hsla;
	for (var i = 0, n = pix.length; i < n; i += 4) {
		hsla = rgb2hsl([pix[i   ], pix[i+1], pix[i+2]]);
		rgba = hsl2rgb([hsla[0]+hue, hsla[1]*((100+sat)/100), hsla[2]+lum]);
		pix[i  ] = rgba[0];
		pix[i+1] = rgba[1];
		pix[i+2] = rgba[2];
	}
	context.putImageData(imgd, x, y);
}

function effectOpacity(opacity, canvasid, context, x, y, width, height)
{
	if(!opacity) opacity = 0;
	if(!canvasid) canvasid = ppeImage.canvas_id;
	if(!context) context = ppeImage.context;
	if(!x) x = 0;
	if(!y) y = 0;
	if(!width) width = ppeImage.image_to_edit_width;
	if(!height) height = ppeImage.image_to_edit_height;
	
	matrix = getMatrix(canvasid, context, x, y, width, height);
	var w, h;
	for(w = 0; w<(width-x); w++)
	{
		for(h = 0; h<(height-y); h++)
		{
			matrix[w][h][3] = parseInt(matrix[w][h][3]*opacity/255);
		}
	}
	setMatrix(canvasid, context, x, y, width, height, matrix);	
}

function effectSobel(threshold, canvasid, context, x, y, width, height, rgb)
{
	if(!canvasid) canvasid = ppeImage.canvas_id;
	if(!context) context = ppeImage.context;
	var imgd =  context.getImageData(x, y, width, height);
	pix = imgd.data;
	var pix2 = sobel(pix, width, height, threshold, rgb);
	var i;
	for(i = 0; i < pix.length; i+=4)
	{
		pix[i] = pix2[i];
		pix[i+1] = pix2[i+1];
		pix[i+2] = pix2[i+2];
	}
	context.putImageData(imgd, x, y);
}

function changeHue(rgba, hue)
{
	hsla = rgb2hsl(rgba);
	var h = hsla[0] + hue;
	var s = hsla[1];
	var l = hsla[2];
	var a = hsla[3];
	return hsl2rgb([h, s, l, a]);
}
function changeSaturation(rgba, sat)
{
	hsla = rgb2hsl(rgba);
	var h = hsla[0];
	var s = hsla[1] + sat;
	var l = hsla[2];
	var a = hsla[3];
	return hsl2rgb([h, s, l, a]);
}
function changeLuminance(rgba, lum)
{
	hsla = rgb2hsl(rgba);
	var h = hsla[0];
	var s = hsla[1];
	var l = hsla[2] + lum;
	var a = hsla[3];
	return hsl2rgb([h, s, l, a]);
}
var toolState = '';


function inArray(needle, haystack)
{
    var length = haystack.length;
    for(var i = 0; i < length; i++)
	{
        if(haystack[i].join(',') == needle.join(',')) return true;
    }
    return false;
}


function toolChangeBackground()
{
	$('#maincanvas').css('background', '#FF0000');
}

var historyLabel = {
'original':'Original Image',
'flip-horizontal':'Flip Horizontal',
'flip-vertical':'Flip Vertical',
'rotate-clockwise':'Rotate Clockwise',
'rotate-counterclockwise':'Rotate Counter Clockwise',
'adjust-color':'Adjust Color',
'color-balance':'Adjust Color Balance',
'brightness-contrast':'Adjust Brightness and Contrast',
'opacity':'Adjust Opacity',
'invert-color':'Invert Image Color',
'gray-scale':'Convert to Gray Scale',
'sepia':'Effect Sepia',
'resize':'Resize Image',
'sobel':'Vectorize Sobel',
'wpap':'WPAP Image'

};

function textImage()
{
	this.x = 0;
	this.y = 0;
	this.font='12px Verdana';
	this.strokeStyle = '#000000';
	this.data = '';
}
function htmlEntities(text)
{
	text = replaceStr('<', '&lt;', text, false);
	text = replaceStr('>', '&gt;', text, false);
	text = replaceStr('"', '&quot;', text, false);
	return text;
}
function addHistory(data, width, height, action)
{
	var date = new Date();
	var now = date.getTime();
	var idx = GDHistory.length; 
	var actionLabel = historyLabel[action];
	if(!actionLabel)
	actionLabel = htmlEntities(action);
	
	var textData;
	if(!data.text)
	{
		textData = false;
	}
	else
	{
		textData = data.text;
	}
	
	GDHistory.push({
	index:idx,
	gd:data.image,
	text:textData,
	width:width,
	height:height,
	time:now,
	action:action
	});
	$('#history-list-item').prepend('<li><a href="javascript:goTo('+idx+')" data-id="'+idx+'">'+actionLabel+'</a></li>');
	$('#history-list-item a').removeClass('selected');
	$('#history-list-item a[data-id='+idx+']').addClass('selected');
	historyPos = idx;
	
	if(addHistoryEffect)
	{
	setTimeout(function(){
	var options = { to: $('#history-list-item').children('li:first'), className: "ui-effects-transfer" };
	var delay = 300;
	var dt = $('#maincanvas').css('display');
	
	if(dt == 'none')
	{
		$('#maincanvas-preview').effect('transfer', options, delay);
	}
	else
	{
		$('#maincanvas').effect('transfer', options, delay);
	}
	}, 50);
	}
	
}
function goTo(idx)
{
	$('#maincanvas-preview').css('display', 'none');
	$('#maincanvas-preview').parent('.ui-wrapper').css('display', 'none');
	$('#maincanvas-preview').attr('width', GDHistory[idx].width)
	$('#maincanvas-preview').attr('height', GDHistory[idx].height);
	$('#maincanvas-preview').css({'width':GDHistory[idx].width+'px','height':GDHistory[idx].height+'px'});
	
	$('#maincanvas').css({'display': 'block', 'width':GDHistory[idx].width+'px', 'height':GDHistory[idx].height+'px'});
	$('#maincanvas').attr('width', GDHistory[idx].width);
	$('#maincanvas').attr('height', GDHistory[idx].height);
	$('#history-list-item a').removeClass('selected');
	$('#history-list-item a[data-id='+idx+']').addClass('selected');
	ppeImage.image_to_edit_width = GDHistory[idx].width;
	ppeImage.image_to_edit_height = GDHistory[idx].height;
	
	document.getElementById(ppeImage.canvas_id).width = GDHistory[idx].width;
	document.getElementById(ppeImage.canvas_id).height = GDHistory[idx].height;
	var canvas = document.getElementById(ppeImage.canvas_id);
	context = canvas.getContext('2d');
	context.fillStyle="#FFFFFF";
	context.fillRect(0, 0, GDHistory[idx].width, GDHistory[idx].height);
	ppeImage.context.putImageData(GDHistory[idx].gd, 0, 0);
	historyPos = idx;
}
function historyClear()
{
	GDHistory = new Array();
	$('#history-list-item').empty();
}
function historyBack()
{
	historyPos--;
	if(historyPos<0) historyPos = 0;
	goTo(historyPos);
}
function historyForward()
{
	historyPos++;
	if(historyPos>=GDHistory.length) historyPos = GDHistory.length-1;
	goTo(historyPos);
}

function setWindowSize()
{
	$('.main-bar').css('height', (parseInt($(window).height())-60)+'px');
}
var video = null;
$(document).ready(function(){ 
	video = $("#videoelement")[0];
	document.getElementById('imagesource').addEventListener('change', handleFileSelect, false);
	
	$('.menu ul').dropDownMenu();	
	setWindowSize();
	$(window).resize(function(){setWindowSize();});
	$('.text-editor-all').draggable().resizable({
	minWidth:120,
	minHeight:40,
	resize:function(){
		var par = $(this);
		par.find('.text-editor').css({
				width:(parseInt(par.width())-2)+'px',
				height:(parseInt(par.height())-18)+'px'
			});
		}
	});
	
	$('.menu a[href=#]').bind('click', function(){
		return false;
	});
	
	hideTextEditor();
	$(document).on('click', '#text-editor-button, #applytext', function(){
		textImageApply();
	});
	$('#textcolor, #rgbforsobel').jPicker();
	$(document).on('click', '.jPicker .Ok', function(){
		textImageApplyStyle()
	});
	$(document).on('change', '#fontface, #fontsize, #textcolor, #textbold, #textitalic, #textunderline, #textstrikethrought', function(){
		var sz = $('#fontsize').val();
		sz = sz.replace(/[^0-9]/g, '');
		$('#fontsize').val(sz);
		textImageApplyStyle()
	});
	$(document).on('click', '#closetextcontrol', function(){
		hideTextEditor();
	});
	
	textImageApplyStyle();
	
	$('body').pasteimage(function(src, type, data){
		loadImage(canvasid, src);
	});
	
});


function cacheExternalImage(cid, url, callbackFunction) 
{ 
	var img = new Image(); 
	img.crossOrigin = '';     
	img.src = url;     
	img.onload = function() 
	{         
		var canvas = document.createElement("canvas" );     
		canvas.width = img.width;     
		canvas.height = img.height;         
		var ctx = canvas.getContext("2d" );     
		ctx.drawImage(img, 0, 0);     
		img.src = ctx.canvas.toDataURL("image/png" );
		callbackFunction(cid, img.src);
	}     
} 

function loadExternalImage(canvasid, url)
{
	cacheExternalImage(canvasid, url, function(canvasid, url2){
		loadImage(canvasid, url2);
	});
}

(function($){
	var foundImage = false;
	var pasteObj = null;
	$.fn.pasteimage = function(options, callback) 
	{
		var settings = {'attribute':'data-id'};
		if(typeof options == 'function' && typeof callback == 'undefined')
		{
			callback = options;
		}
		else
		{
			settings = $.extend(settings, options);
		}
		return this.each(function(index){
			var elem = $(this);
			var data = {id:elem.attr(settings.attribute)};
			if(typeof(callback) == "function") 
			{
				$.event.props.push('clipboardData');
				$(document).on("paste", function(event){
					doPaste(event, callback, data);
				});
				if(!window.Clipboard) 
				{
					pasteObj = $('<div>');
					pasteObj.attr('contenteditable','true').css({
						'position':'absolute', 
						'left':'-10000px', 	
						'width':'0px', 
						'height':'0px', 
						'overflow':'hidden', 
						'outline':'0'
					});
					$(document.body).prepend(pasteObj);
				}
			}
			else
			{
				console.log('Invalid callback function.');
			}

		});
		
		
		function doPaste(e, clbk, extendedData)
		{
			var data = extendedData;
			if (e.clipboardData.items)
			{
				var items = e.clipboardData.items;
				if(items) 
				{
					for(var i = 0; i < items.length; i++) 
					{
						items[i].type = items[i].type.toLowerCase();
						if(items[i].type.indexOf("image/") !== -1) 
						{
							var blob = items[i].getAsFile();
							var type = items[i].type;
							var reader = new FileReader();
							reader.onload = function(event)
							{
								clbk(event.target.result, type, data); 
							};
							reader.readAsDataURL(blob);
						}
						else
						{
							// console.log('The clipboard does not containing image.');
						}
					}
				} 
				else 
				{ 
					// console.log('The clipboard does not containing image.');
				}
			} 
			else 
			{
				pasteObj.get(0).focus();
				foundImage = true;
				setTimeout(function(){
					checkInput(clbk, data);
				}, 100); 
			}
			
		}

		function checkInput(clbk, data) 
		{
			if(foundImage == true) 
			{
				var child = pasteObj.children().last().get(0);
				if (child) 
				{
					if (child.tagName === "IMG" && child.src.substr(0, 5) == 'data:') 
					{
						var type = child.src.substr(0, child.src.indexOf(';'));
						type = type.substr(5);
						clbk(child.src, type, data);
						foundImage = false;
					} 
					else 
					{ 
						// console.log('The clipboard does not containing image.');
					}
					pasteObj.html(""); 
				} 
				else 
				{ 
					// console.log('No children found in pasteObj DIV');
				}
			} 
			else 
			{ 
				// console.log('The clipboard does not containing image.');
			}
		}	
	}
})(jQuery);
