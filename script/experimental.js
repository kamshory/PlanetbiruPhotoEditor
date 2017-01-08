function toolErase()
{
	toolState = 'erase';
	$('.main-canvas-area').unbind();
	$('.main-canvas-area').bind('click', function(e){
		e.preventDefault();
		var left = parseFloat(e.clientX);
		var top  = parseFloat(e.clientY);
		var offset = $('.main-canvas-area').offset();
		var scrollLeft = parseFloat($(document).scrollLeft());
		var scrollTop = parseFloat($(document).scrollTop());
		left = (left - offset.left + scrollLeft) - 10;
		top = (top - offset.top + scrollTop) - 10;
		erase(left, top, {'shape':'rectangle', 'radius':10});
	});
}

function toolMagicWizard()
{
	toolState = 'magicwizard';
	$('.main-canvas-area').unbind();
	$('.main-canvas-area').bind('click', function(e){
		e.preventDefault();
		var left = parseFloat(e.clientX);
		var top  = parseFloat(e.clientY);
		var offset = $('.main-canvas-area').offset();
		var scrollLeft = parseFloat($(document).scrollLeft());
		var scrollTop = parseFloat($(document).scrollTop());
		left = (left - offset.left + scrollLeft) - 10;
		top = (top - offset.top + scrollTop) - 10;
		setMeAndFriend(left, top, {type:'erase'});
	});
}

function getFriend2(x, y, tolerance, canvasid, context, width, height)
{
	if(!tolerance) tolerance = 0;
	if(!canvasid) canvasid = ppeImage.canvas_id;
	if(!context) context = ppeImage.context;
	if(!x) x = 0;
	if(!y) y = 0;
	if(!width) width = ppeImage.image_to_edit_width;
	if(!height) height = ppeImage.image_to_edit_height;
	
	var hsla = rgb2hsl(getPixel(x, y));
	var hsla2 = new Array();
	
	imgd = context.getImageData(0, 0, width, height);
	pix = imgd.data;
	
	var i, j;
	var working;
	var arrpx = new Array();
	
	// right top
	working = true;
	for(i = x; i<width && working; i++)
	{
		for(j=y; j>=0 && working; j--)
		{
			hsla2 = rgb2hsl(getPixelFromPix(i, j, pix, width, height));
			if(Math.abs(hsla[0] - hsla2[0]) <= tolerance)
			{
				arrpx.push([j, i]);
			}
			else
			{
				break;
			}
		}
	}
	
	// right bottom
	working = true;
	for(i = x; i<width && working; i++)
	{
		for(j=y; j<height && working; j++)
		{
			hsla2 = rgb2hsl(getPixelFromPix(i, j, pix, width, height));
			if(Math.abs(hsla[0] - hsla2[0]) <= tolerance)
			{
				arrpx.push([j, i]);
			}
			else
			{
				break;
			}
		}
	}
	
	// left bottom
	working = true;
	for(i = x; i>=0 && working; i--)
	{
		for(j=y; j<height && working; j++)
		{
			hsla2 = rgb2hsl(getPixelFromPix(i, j, pix, width, height));
			if(Math.abs(hsla[0] - hsla2[0]) <= tolerance)
			{
				arrpx.push([j, i]);
			}
			else
			{
				break;
			}
		}
	}
	
	// left top
	working = true;
	for(i = x; i>=0 && working; i--)
	{
		for(j=y; j>=0 && working; j--)
		{
			hsla2 = rgb2hsl(getPixelFromPix(i, j, pix, width, height));
			if(Math.abs(hsla[0] - hsla2[0]) <= tolerance)
			{
				arrpx.push([j, i]);
			}
			else
			{
				break;
			}
		}
	}
	
	return arrpx;
}

var logx = '';

function getFriend(x, y, tolerance, canvasid, context, width, height)
{
	if(!tolerance) tolerance = 0;
	if(!canvasid) canvasid = ppeImage.canvas_id;
	if(!context) context = ppeImage.context;
	if(!x) x = 0;
	if(!y) y = 0;
	if(!width) width = ppeImage.image_to_edit_width;
	if(!height) height = ppeImage.image_to_edit_height;
	
	matrix = getMatrix(canvasid, context, 0, 0, width, height);	
	
	imgd = context.getImageData(0, 0, width, height);
	pix = imgd.data;
	
	var hsla = rgb2hsl(getPixelFromPix(x, y, pix, width, height));
	var hsla2 = new Array();
	
	var i, j;
	var working;
	var walk;
	var arrpx = new Array();
	var x2, y2;
	
	var ptop1, ptop2, ptop3, ptop4, pright1, pright2, pright3, pright4, pbottom1, pbottom2, pbottom3, pbottom4, pleft1, pleft2, pleft3, pleft4;
	
	working = true;
	
	walk = 0;
	do
	{
		if(walk > 0)
		{
			x2 = arrpx[arrpx.length-1][0];
			y2 = arrpx[arrpx.length-1][1];
			pleft1 = checkLeft(x2, y2, tolerance, hsla, pix, arrpx, width, height);
			ptop1 = checkTop(arrpx[arrpx.length-1][0], arrpx[arrpx.length-1][1], tolerance, hsla, pix, arrpx, width, height);
		}
		else
		{
			x2 = x;
			y2 = y;
		}
		pright1 = checkRight(x2, y2, tolerance, hsla, pix, arrpx, width, height);
		pbottom1 = checkBottom(x2, y2, tolerance, hsla, pix, arrpx, width, height);
		
		
		if(walk > 0)
		{
		if(pleft1 != false) arrpx.push(pleft1);
		if(ptop1 != false) arrpx.push(ptop1);
		}
		if(pright1 != false) arrpx.push(pright1);
		if(pbottom1 != false) arrpx.push(pbottom1);
		walk++;

	}
	while(ptop1 || pright1 || pbottom1 || pleft1);
	
	walk = 0;
	do
	{
		if(walk>0)
		{
		x2 = arrpx[arrpx.length-1][0];
		y2 = arrpx[arrpx.length-1][1];
		pright1 = checkRight(x2, y2, tolerance, hsla, pix, arrpx, width, height);
		pbottom1 = checkBottom(x2, y2, tolerance, hsla, pix, arrpx, width, height);
		}
		else
		{
		x2 = x;
		y2 = y;
		}
		pleft1 = checkLeft(x2, y2, tolerance, hsla, pix, arrpx, width, height);
		ptop1 = checkTop(x2, y2, tolerance, hsla, pix, arrpx, width, height);
		
		if(pleft1 != false) arrpx.push(pleft1);
		if(ptop1 != false) arrpx.push(ptop1);
		if(walk>0)
		{
		if(pright1 != false) arrpx.push(pright1);
		if(pbottom1 != false) arrpx.push(pbottom1);
		}
		walk++;
	}
	while(ptop1 || pright1 || pbottom1 || pleft1);
	
	arrpx.push([x, y]);
	
	return arrpx;
}

function checkTop(x, y, tolerance, hsla, pix, arrpx, width, height)
{
	y = y - 1; // top
	if(y<0) return false;
	if(x<0) return false;
	if(y>=height) return false;
	if(x>=width) return false;
	if(inArray([x, y], arrpx)) return false;
	var hsla2 = rgb2hsl(getPixelFromPix(x, y, pix, width, height));
	if(Math.abs(hsla2[0] - hsla[0]) > tolerance) return false;
	return [x, y];
}

function checkRight(x, y, tolerance, hsla, pix, arrpx, width, height)
{
	x = x + 1; // right
	if(y<0) return false;
	if(x<0) return false;
	if(y>=height) return false;
	if(x>=width) return false;
	if(inArray([x, y], arrpx)) return false;
	var hsla2 = rgb2hsl(getPixelFromPix(x, y, pix, width, height));
	if(Math.abs(hsla2[0] - hsla[0]) > tolerance) return false;
	
	return [x, y];
}

function checkBottom(x, y, tolerance, hsla, pix, arrpx, width, height)
{
	y = y + 1; // bottom
	if(y<0) return false;
	if(x<0) return false;
	if(y>=height) return false;
	if(x>=width) return false;
	if(inArray([x, y], arrpx)) return false;
	var hsla2 = rgb2hsl(getPixelFromPix(x, y, pix, width, height));
	if(Math.abs(hsla2[0] - hsla[0]) > tolerance) return false;
	
	return [x, y];
}

function checkLeft(x, y, tolerance, hsla, pix, arrpx, width, height)
{
	x = x - 1; // left
	if(y<0) return false;
	if(x<0) return false;
	if(y>=height) return false;
	if(x>=width) return false;
	if(inArray([x, y], arrpx)) return false;
	var hsla2 = rgb2hsl(getPixelFromPix(x, y, pix, width, height));
	if(Math.abs(hsla2[0] - hsla[0]) > tolerance) return false;
	
	return [x, y];
}

function setMeAndFriend(x, y, effect, canvasid, context, width, height)
{
	if(!canvasid) canvasid = ppeImage.canvas_id;
	if(!context) context = ppeImage.context;
	if(!x) x = 0;
	if(!y) y = 0;
	if(!width) width = ppeImage.image_to_edit_width;
	if(!height) height = ppeImage.image_to_edit_height;

	var effecttype = effect.type;
	
	var arrpx = getFriend(x, y, 4);
	var i;
	var w, h;
	if(effecttype == 'erase')
	{
		matrix = getMatrix(ppeImage.canvas_id, ppeImage.context, 0, 0, ppeImage.image_to_edit_width, ppeImage.image_to_edit_height);
		for(i in arrpx)
		{
			w = arrpx[i][1];
			h = arrpx[i][0];
			matrix[w][h][3] = 0;
		}
		setMatrix(ppeImage.canvas_id, ppeImage.context, 0, 0, ppeImage.image_to_edit_width, ppeImage.image_to_edit_height, matrix);
	}
}
