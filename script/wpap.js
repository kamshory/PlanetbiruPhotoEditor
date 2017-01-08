function effectWPAP(numsegment, canvasid, context, x, y, width, height)
{
	if(!canvasid) canvasid = ppeImage.canvas_id;
	if(!context) context = ppeImage.context;
	imgd = context.getImageData(x, y, width, height);
	pix = imgd.data;
	
	var arr = setupWPAP(numsegment);
	
	var hsl;
	var hue;
	var pix2;
	for (var i = 0, n = pix.length; i < n; i += 4) {
		// change hue
		hsl = rgb2hsl([pix[i   ], pix[i+1], pix[i+2], pix[i+3]]);
		hsl[0] = mapWPAP(arr, hsl[0]);
		hsl[1] = 100;
		hsl[2] = 60;
		pix2 = hsl2rgb(hsl);
		pix[i  ] = pix2[0]; // red
		pix[i+1] = pix2[1]; // green
		pix[i+2] = pix2[2]; // blue
		// i+3 is alpha (the fourth element)
	}
	context.putImageData(imgd, x, y);
}
function setupWPAP(numsegment)
{
	var step = 360/numsegment;
	var arr = new Array();
	var i;
	for(i = 0; i<numsegment; i++)
	{
		arr.push({
		index:i,
		min:i*step,
		max:(i+1)*step
		});
	}
	return arr;
}

function mapWPAP(arr, hue)
{
	var i;
	for(i in arr)
	{
		if(hue>=arr[i].min && hue<=arr[i].max)
		{
			return (arr[i].max + arr[i].min) / 2;
		}
	}
	return 0;
}
