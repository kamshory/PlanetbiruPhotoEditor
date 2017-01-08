var MASK_N 	= 2;
var MASK_X 	= 3;
var MASK_Y 	= 3;
var WHITE  	= 255;
var BLACK  	= 0;

var mask = [
	[
	 	[-1,-2,-1],
		[0 , 0, 0],
		[1 , 2, 1]
	],
	[
	 	[-1, 0, 1],
		[-2, 0, 2],
		[-1, 0, 1]
	]
];
var adjustX, adjustY, xBound, yBound;
adjustX = (MASK_X % 2) ? 1 : 0;
adjustY = (MASK_Y % 2) ? 1 : 0;
xBound = Math.floor(MASK_X / 2);
yBound = Math.floor(MASK_Y / 2);
var byte_per_pixel = 4;
function color_to_int(R, G, B)
{
	return parseInt((R+G+B)/3);
}

function sobel(image_s, width, height, threshold, rgb) 
{
	threshold = threshold;
	var image_t = new Array();
	var  x, y, i, v, u;
	var R, G, B;
	var val = new Array();
	var total;
	if(!rgb)
	{
	var _red = 0;
	var _green = 0;
	var _blue = 0;
	}
	else
	{
	var _red = rgb[0];
	var _green = rgb[1];
	var _blue = rgb[2];
	}
	
	for(y = 0; y < height; ++y) 
	{
		for(x = 0; x < width; ++x) 
		{
			total = 0.0;
			for(i = 0; i < MASK_N; ++i) 
			{
				
				val[i] = 0.0;
				for(v = -yBound; v < yBound + adjustY; ++v) 
				{
					for (u = -xBound; u < xBound + adjustX; ++u) 
					{
						if (x + u >= 0 && x + u < width && y + v >= 0 && y + v < height) 
						{
							R = image_s[(byte_per_pixel * (width * (y+v) + (x+u))) + 0];
							G = image_s[(byte_per_pixel * (width * (y+v) + (x+u))) + 1];
							B = image_s[(byte_per_pixel * (width * (y+v) + (x+u))) + 2];
							val[i] += color_to_int(R, G, B) * mask[i][u + xBound][v + yBound];
						}
					}
				}
				total += val[i] * val[i];
			}
			
			total = Math.sqrt(total);
			
			if (total - threshold >= 0) 
			{
				image_t[(byte_per_pixel * (width * y + x)) + 0] = _red;
				image_t[(byte_per_pixel * (width * y + x)) + 1] = _green;
				image_t[(byte_per_pixel * (width * y + x)) + 2] = _blue;
			}
			else 
			{
				image_t[(byte_per_pixel * (width * y + x)) + 0] = WHITE;
				image_t[(byte_per_pixel * (width * y + x)) + 1] = WHITE;
				image_t[(byte_per_pixel * (width * y + x)) + 2] = WHITE;
			}
			image_t[(byte_per_pixel * (width * y + x)) + 3] = 255;
		}
	}
	return image_t;
}
