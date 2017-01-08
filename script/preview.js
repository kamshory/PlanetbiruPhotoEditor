var lastPreview = false;
var frameRate = 30;
var previewInterval = 1000/frameRate;
function allowPreview()
{
	var curTimeObj = new Date();
	var curTime = curTimeObj.getTime();

	if(lastPreview === false)
	{
		lastPreview = curTime;
		return true;
	}
	
	var interval = curTime - lastPreview;
	if(interval >= previewInterval)
	{
		lastPreview = curTime;
		return true;
	}
	return false;
}


function previewCopy()
{
	ppeImageTmp = clone(ppeImage);
	ppeImageTmp.canvas_id = ppeImageTmp.canvas_id+'-preview';
	ppeImageTmp.canvas = document.getElementById(ppeImageTmp.canvas_id);
	ppeImageTmp.context = ppeImageTmp.canvas.getContext('2d');
	$('#'+ppeImageTmp.canvas_id).attr('width', ppeImageTmp.image_to_edit_width)
	$('#'+ppeImageTmp.canvas_id).attr('height', ppeImageTmp.image_to_edit_height);
	var imgd = ppeImage.context.getImageData(0, 0, ppeImage.image_to_edit_width, ppeImage.image_to_edit_height);
	ppeImageTmp.context.putImageData(imgd, 0, 0);
}
function previewBrightnessContrast(br, ct)
{
	if(allowPreview())
	{
	$('#maincanvas').css('display', 'none');
	$('#maincanvas-preview').css('display', 'block');
	ct = parseInt(ct);
	br = parseInt(br);
	
	previewCopy();
	effectBrightnessContrast(br, ct, ppeImageTmp.canvas_id, ppeImageTmp.context, 0, 0, ppeImageTmp.image_to_edit_width, ppeImageTmp.image_to_edit_height);
	}
}

function previewHSL(hu, sa, lu)
{
	if(allowPreview())
	{
	$('#maincanvas').css('display', 'none');
	$('#maincanvas-preview').css('display', 'block');
	hu = parseInt(hu);
	sa = parseInt(sa);
	lu = parseInt(lu);
	
	previewCopy();
	effectHSL(hu, sa, lu, ppeImageTmp.canvas_id, ppeImageTmp.context, 0, 0, ppeImageTmp.image_to_edit_width, ppeImageTmp.image_to_edit_height);
	}
}

function previewOpacity(op)
{
	if(allowPreview())
	{
	$('#maincanvas').css('display', 'none');
	$('#maincanvas-preview').css('display', 'block');
	op = parseInt(op);
	
	previewCopy();
	effectOpacity(op, ppeImageTmp.canvas_id, ppeImageTmp.context, 0, 0, ppeImageTmp.image_to_edit_width, ppeImageTmp.image_to_edit_height);
	}
}

function previewSobel(th, rgb)
{
	if(allowPreview())
	{
	$('#maincanvas').css('display', 'none');
	$('#maincanvas-preview').css('display', 'block');
	th = parseInt(th);
	previewCopy();
	effectSobel(th, ppeImageTmp.canvas_id, ppeImageTmp.context, 0, 0, ppeImageTmp.image_to_edit_width, ppeImageTmp.image_to_edit_height, rgb);
	}
}

function previewWPAP(se)
{
	if(allowPreview())
	{
	$('#maincanvas').css('display', 'none');
	$('#maincanvas-preview').css('display', 'block');
	se = parseInt(se);
	
	previewCopy();
	effectWPAP(se, ppeImageTmp.canvas_id, ppeImageTmp.context, 0, 0, ppeImageTmp.image_to_edit_width, ppeImageTmp.image_to_edit_height);
	}
}

function previewColorBalance(red, green, blue)
{
	if(allowPreview())
	{
	$('#maincanvas').css('display', 'none');
	$('#maincanvas-preview').css('display', 'block');
	red = parseInt(red);
	green = parseInt(green);
	blue = parseInt(blue);
	
	previewCopy();
	effectRGB(red, green, blue, ppeImageTmp.canvas_id, ppeImageTmp.context, 0, 0, ppeImageTmp.image_to_edit_width, ppeImageTmp.image_to_edit_height);
	}
}

