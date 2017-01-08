var ppeImageTmp;
var showControl = true;
var showSidebar = true;
var resizeMode = false;
var login_pb_login_data = {};

function TBInvertColor()
{
	effectInvertColor();
	hideTextEditor();
}

function TBGrayScale()
{
	effectGrayScale();
	hideTextEditor();
}

function TBSepia()
{
	effectSepia();
	hideTextEditor();
}

function TBFlipHorizontal()
{
	effectFlipHorizontal();
	hideTextEditor();
}

function TBFlipVertical()
{
	effectFlipVertical();
	hideTextEditor();
}

function TBRotateClockwise()
{
	effectRotate(90);
	hideTextEditor();
}
function TBRotateCounterclockwise()
{
	effectRotate(270);
	hideTextEditor();
}

function TBFileOpen()
{
	$('#dialog-file-open').dialog({
		modal:true,
		width:400,
		height:180,
		buttons:{
			'Cancel':function(){
				$('#dialog-file-open').dialog('destroy');
				destroyResize();
			}
		}
	});
	hideTextEditor();
}

function TBFileImport()
{
	$('#dialog-import-image').dialog({
		modal:true,
		width:400,
		height:180,
		buttons:{
			'Import':function(){
				loadExternalImage('maincanvas', $('#url').val());
				$('#dialog-import-image').dialog('destroy');
				destroyResize();
			},
			'Cancel':function(){
				$('#dialog-import-image').dialog('destroy');
				destroyResize();
			}
		}
	});
	hideTextEditor();
}
function importFile()
{
	loadExternalImage('maincanvas', $('#url').val());
	try{
		$('#dialog-import-image').dialog('destroy');
	}
	catch(e){}
	return false;
}
function TBBrightnessContrast()
{
	previewBrightnessContrast(0, 0);
	$('#dialog-effect-brightness-contrast').dialog({
		modal:false,
		width:400,
		height:220,
		buttons:{
		'OK':function(){
			$('#maincanvas-preview').css('display', 'none');
			$('#maincanvas').css('display', 'block');
			destroyResize();
			var imgd =  ppeImageTmp.context.getImageData(0, 0, ppeImage.image_to_edit_width, ppeImage.image_to_edit_height);
			ppeImage.context.putImageData(imgd, 0, 0);	
			addHistory({image:imgd}, ppeImage.image_to_edit_width, ppeImage.image_to_edit_height, 'brightness-contrast');
			$('#dialog-effect-brightness-contrast').dialog('destroy');
		},
		'Reset':function(){
			$("#slider-brightness").slider("value", 0)
			$("#slider-contrast").slider("value", 0)
			previewBrightnessContrast(0, 0);
		},
		'Cancel':function(){
			$('#maincanvas-preview').css('display', 'none');
			destroyResize();
			$('#maincanvas').css('display', 'block');
			$('#dialog-effect-brightness-contrast').dialog('destroy');
		}
		}
	});
	$('.ui-dialog-titlebar-close').bind('click', function(){
		$('#maincanvas-preview').css('display', 'none');
		destroyResize();
		$('#maincanvas').css('display', 'block');
		$('#dialog-effect-brightness-contrast').dialog('destroy');
	});

	$("#slider-brightness").slider({
		value:0,
		min:-100,
		max:100,
		step:1,
		slide:function(event, ui){
			$("#status-brightness").text(ui.value);
			setTimeout(function(){
			previewBrightnessContrast(ui.value, $("#slider-contrast").slider("value"));
			}, 5);
		}
	});

	$("#slider-contrast").slider({
		value:0,
		min:-100,
		max:100,
		step:1,
		slide:function(event,ui){
			$("#status-contrast").text(ui.value);
			setTimeout(function(){
			previewBrightnessContrast($("#slider-brightness").slider("value"), ui.value);
			}, 5);
		}
	});
	$("#status-brightness").text($("#slider-brightness").slider("value"));
	$("#status-contrast").text($("#slider-contrast").slider("value"));
	hideTextEditor();
}

function TBAdjustColor()
{
	previewHSL(0, 0, 0);
	$('#dialog-effect-hsl').dialog({
		modal:false,
		width:400,
		height:240,
		buttons:{
		'OK':function(){
			$('#maincanvas-preview').css('display', 'none');
			destroyResize();
			$('#maincanvas').css('display', 'block');
			var imgd =  ppeImageTmp.context.getImageData(0, 0, ppeImage.image_to_edit_width, ppeImage.image_to_edit_height);
			ppeImage.context.putImageData(imgd, 0, 0);	
			addHistory({image:imgd}, ppeImage.image_to_edit_width, ppeImage.image_to_edit_height, 'adjust-color');
			$('#dialog-effect-hsl').dialog('destroy');
		},
		'Reset':function(){
			$("#slider-hue").slider("value", 0)
			$("#slider-saturation").slider("value", 0)
			$("#slider-luminance").slider("value", 0)
			previewHSL(0, 0, 0);
		},
		'Cancel':function(){
			$('#maincanvas-preview').css('display', 'none');
			destroyResize();
			$('#maincanvas').css('display', 'block');
			$('#dialog-effect-hsl').dialog('destroy');
		}
		}
	});
	$('.ui-dialog-titlebar-close').bind('click', function(){
		$('#maincanvas-preview').css('display', 'none');
		destroyResize();
		$('#maincanvas').css('display', 'block');
		$('#dialog-effect-brightness-contrast').dialog('destroy');
	});

	$("#slider-hue").slider({
		value:0,
		min:-180,
		max:180,
		step:1,
		slide:function(event, ui){
			$("#status-hue").text(ui.value);
			setTimeout(function(){
			previewHSL(ui.value, $("#slider-saturation").slider("value"), $("#slider-luminance").slider("value"));
			}, 5);
		}
	});

	$("#slider-saturation").slider({
		value:0,
		min:-100,
		max:100,
		step:1,
		slide:function(event,ui){
			$("#status-saturation").text(ui.value);
			setTimeout(function(){
			previewHSL($("#slider-hue").slider("value"), ui.value, $("#slider-luminance").slider("value"));
			}, 5);
		}
	});
	
	$("#slider-luminance").slider({
		value:0,
		min:-100,
		max:100,
		step:1,
		slide:function(event,ui){
			$("#status-luminance").text(ui.value);
			setTimeout(function(){
			previewHSL($("#slider-hue").slider("value"), $("#slider-saturation").slider("value"), ui.value);
			}, 5);
		}
	});
	$("#status-hue").text($("#slider-hue").slider("value"));
	$("#status-saturation").text($("#slider-luminance").slider("value"));
	$("#status-luminance").text($("#slider-luminance").slider("value"));
	hideTextEditor();
}

function TBOpacity()
{
	previewOpacity(255);
	$('#dialog-effect-opacity').dialog({
		modal:false,
		width:400,
		height:180,
		buttons:{
		'OK':function(){
			$('#maincanvas-preview').css('display', 'none');
			destroyResize();
			$('#maincanvas').css('display', 'block');
			var imgd =  ppeImageTmp.context.getImageData(0, 0, ppeImage.image_to_edit_width, ppeImage.image_to_edit_height);
			ppeImage.context.putImageData(imgd, 0, 0);	
			addHistory({image:imgd}, ppeImage.image_to_edit_width, ppeImage.image_to_edit_height, 'opacity');
			$('#dialog-effect-opacity').dialog('destroy');
		},
		'Reset':function(){
			$("#slider-opacity").slider("value", 255)
			previewOpacity(255);
		},
		'Cancel':function(){
			$('#maincanvas-preview').css('display', 'none');
			destroyResize();
			$('#maincanvas').css('display', 'block');
			$('#dialog-effect-opacity').dialog('destroy');
		}
		}
	});
	$('.ui-dialog-titlebar-close').bind('click', function(){
		$('#maincanvas-preview').css('display', 'none');
		destroyResize();
		$('#maincanvas').css('display', 'block');
		$('#dialog-effect-opacity').dialog('destroy');
	});

	$("#slider-opacity").slider({
		value:255,
		min:0,
		max:255,
		step:1,
		slide:function(event, ui){
			$("#status-opacity").text(ui.value);
			setTimeout(function(){
			previewOpacity(ui.value);
			}, 5);
		}
	});

	$("#status-opacity").text($("#slider-opacity").slider("value"));
	hideTextEditor();
}

function TBVectorize()
{
	$('#applysobel').bind('click', function(){
	testSobel();
	});
	previewSobel(128, [0,0,0]);
	$('#dialog-effect-edge-detection').dialog({
		modal:false,
		width:400,
		height:180,
		buttons:{
		'OK':function(){
			$('#maincanvas-preview').css('display', 'none');
			destroyResize();
			$('#maincanvas').css('display', 'block');
			var imgd =  ppeImageTmp.context.getImageData(0, 0, ppeImage.image_to_edit_width, ppeImage.image_to_edit_height);
			ppeImage.context.putImageData(imgd, 0, 0);	
			addHistory({image:imgd}, ppeImage.image_to_edit_width, ppeImage.image_to_edit_height, 'sobel');
			$('#dialog-effect-edge-detection').dialog('destroy');
		},
		'Reset':function(){
			$("#slider-threshold").slider("value", 128)
			previewSobel(128, [0,0,0]);
		},
		'Cancel':function(){
			$('#maincanvas-preview').css('display', 'none');
			destroyResize();
			$('#maincanvas').css('display', 'block');
			$('#dialog-effect-edge-detection').dialog('destroy');
		}
		}
	});
	$('.ui-dialog-titlebar-close').bind('click', function(){
		$('#maincanvas-preview').css('display', 'none');
		$('#maincanvas').css('display', 'block');
		$('#dialog-effect-edge-detection').dialog('destroy');
	});

	$("#slider-threshold").slider({
		value:128,
		min:0,
		max:255,
		step:1,
		slide:function(event, ui){
			$("#status-threshold").text(ui.value);
			setTimeout(function(){
			previewSobel(ui.value, extractRGB($('#rgbforsobel').val()));
			}, 5);
		}
	});

	$("#status-threshold").text($("#slider-threshold").slider("value"));
	hideTextEditor();
}
function testSobel()
{
	previewSobel($("#slider-threshold").slider('value'), extractRGB($('#rgbforsobel').val()));
}
function extractRGB(rgbstr)
{
	var red = 0, green = 0, blue = 0;
	rgbstr.trim('#');
	if(rgbstr.length>6)
	rgbstr = rgbstr.substr(0, 6);
	if(rgbstr.length<6)
	{
		if(rgbstr.length==3)
		{
			red = rgbstr.substr(0,1)+''+rgbstr.substr(0,1);
			green = rgbstr.substr(1,1)+''+rgbstr.substr(1,1);
			blue = rgbstr.substr(2,1)+''+rgbstr.substr(2,1);
		}
		else
		{
			// fix color
			while(rgbstr.length<6)
			{
				rgbstr += ''+'0';
			}
		}
	}
	red = rgbstr.substr(0,2);
	green = rgbstr.substr(2,2);
	blue = rgbstr.substr(4,2);
	red = parseInt(red, 16);
	green = parseInt(green, 16);
	blue = parseInt(blue, 16);
	return [red, green, blue];
}

function TBWPAP()
{
	previewWPAP(100);
	$('#dialog-effect-wpap').dialog({
		modal:false,
		width:400,
		height:180,
		buttons:{
		'OK':function(){
			$('#maincanvas-preview').css('display', 'none');
			destroyResize();
			$('#maincanvas').css('display', 'block');
			var imgd =  ppeImageTmp.context.getImageData(0, 0, ppeImage.image_to_edit_width, ppeImage.image_to_edit_height);
			ppeImage.context.putImageData(imgd, 0, 0);	
			addHistory({image:imgd}, ppeImage.image_to_edit_width, ppeImage.image_to_edit_height, 'wpap');
			$('#dialog-effect-wpap').dialog('destroy');
		},
		'Reset':function(){
			$("#slider-segment").slider("value", 100)
			previewWPAP(100);
		},
		'Cancel':function(){
			$('#maincanvas-preview').css('display', 'none');
			destroyResize();
			$('#maincanvas').css('display', 'block');
			$('#dialog-effect-wpap').dialog('destroy');
		}
		}
	});
	$('.ui-dialog-titlebar-close').bind('click', function(){
		$('#maincanvas-preview').css('display', 'none');
		destroyResize();
		$('#maincanvas').css('display', 'block');
		$('#dialog-effect-wpap').dialog('destroy');
	});

	$("#slider-segment").slider({
		value:100,
		min:0,
		max:100,
		step:1,
		slide:function(event, ui){
			$("#status-segment").text(ui.value);
			setTimeout(function(){
			previewWPAP(ui.value);
			}, 5);
		}
	});

	$("#status-segment").text($("#slider-segment").slider("value"));
	hideTextEditor();
}

function TBColorBalance()
{
	previewColorBalance(0, 0, 0);
	$('#dialog-effect-color-balance').dialog({
		modal:false,
		width:400,
		height:220,
		buttons:{
		'OK':function(){
			$('#maincanvas-preview').css('display', 'none');
			destroyResize();
			$('#maincanvas').css('display', 'block');
			var imgd =  ppeImageTmp.context.getImageData(0, 0, ppeImage.image_to_edit_width, ppeImage.image_to_edit_height);
			ppeImage.context.putImageData(imgd, 0, 0);	
			addHistory({image:imgd}, ppeImage.image_to_edit_width, ppeImage.image_to_edit_height, 'color-balance');
			$('#dialog-effect-color-balance').dialog('destroy');
		},
		'Reset':function(){
			$("#slider-red").slider("value", 0)
			$("#slider-green").slider("value", 0)
			$("#slider-blue").slider("value", 0)
			previewColorBalance(0, 0, 0);
		},
		'Cancel':function(){
			$('#maincanvas-preview').css('display', 'none');
			destroyResize();
			$('#maincanvas').css('display', 'block');
			$('#dialog-effect-color-balance').dialog('destroy');
		}
		}
	});
	$('.ui-dialog-titlebar-close').bind('click', function(){
		$('#maincanvas-preview').css('display', 'none');
		destroyResize();
		$('#maincanvas').css('display', 'block');
		$('#dialog-effect-brightness-contrast').dialog('destroy');
	});

	$("#slider-red").slider({
		value:0,
		min:-100,
		max:100,
		step:1,
		slide:function(event, ui){
			$("#status-red").text(ui.value);
			setTimeout(function(){
			previewColorBalance(ui.value, $("#slider-green").slider('value'), $("#slider-blue").slider('value'));
			}, 5);
		}
	});

	$("#slider-green").slider({
		value:0,
		min:-100,
		max:100,
		step:1,
		slide:function(event, ui){
			$("#status-green").text(ui.value);
			setTimeout(function(){
			previewColorBalance($("#slider-red").slider('value'), ui.value, $("#slider-blue").slider('value'));
			}, 5);
		}
	});

	$("#slider-blue").slider({
		value:0,
		min:-100,
		max:100,
		step:1,
		slide:function(event, ui){
			$("#status-blue").text(ui.value);
			setTimeout(function(){
			previewColorBalance($("#slider-red").slider('value'), $("#slider-green").slider('value'), ui.value);
			}, 5);
		}
	});

	$("#status-red").text($("#slider-red").slider("value"));
	$("#status-green").text($("#slider-green").slider("value"));
	$("#status-blue").text($("#slider-blue").slider("value"));
	hideTextEditor();
}
function TBTemplate(template)
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
	switch(template)
	{
		case 'jadul':
		effectHSL(0, -28, 0, ppe.canvas_id, ppe.context, 0, 0, ppe.image_to_edit_width, ppe.image_to_edit_height);
		effectRGB(-9, -12, -33, ppe.canvas_id, ppe.context, 0, 0, ppe.image_to_edit_width, ppe.image_to_edit_height);
		effectBrightnessContrast(1, 15, ppe.canvas_id, ppe.context, 0, 0, ppe.image_to_edit_width, ppe.image_to_edit_height);
		var imgd =  ppe.context.getImageData(0, 0, ppe.image_to_edit_width, ppe.image_to_edit_height);
		addHistory({image:imgd}, ppe.image_to_edit_width, ppe.image_to_edit_height, 'Preset Effect: Jadul');
		break;
		
		case 'lighty':
		effectBrightnessContrast(26, 6, ppe.canvas_id, ppe.context, 0, 0, ppe.image_to_edit_width, ppe.image_to_edit_height);
		var imgd =  ppe.context.getImageData(0, 0, ppe.image_to_edit_width, ppe.image_to_edit_height);
		addHistory({image:imgd}, ppe.image_to_edit_width, ppe.image_to_edit_height, 'Preset Effect: Lighty');
		break;
		
		case 'dark':
		effectBrightnessContrast(-26, -6, ppe.canvas_id, ppe.context, 0, 0, ppe.image_to_edit_width, ppe.image_to_edit_height);
		var imgd =  ppe.context.getImageData(0, 0, ppe.image_to_edit_width, ppe.image_to_edit_height);
		addHistory({image:imgd}, ppe.image_to_edit_width, ppe.image_to_edit_height, 'Preset Effect: Dark');
		break;
		
		case 'contrast':
		effectBrightnessContrast(6, 26, ppe.canvas_id, ppe.context, 0, 0, ppe.image_to_edit_width, ppe.image_to_edit_height);
		var imgd =  ppe.context.getImageData(0, 0, ppe.image_to_edit_width, ppe.image_to_edit_height);
		addHistory({image:imgd}, ppe.image_to_edit_width, ppe.image_to_edit_height, 'Preset Effect: Contrast');
		break;
		
		case 'colorfull':
		effectHSL(0, 25, 0, ppe.canvas_id, ppe.context, 0, 0, ppe.image_to_edit_width, ppe.image_to_edit_height);
		var imgd =  ppe.context.getImageData(0, 0, ppe.image_to_edit_width, ppe.image_to_edit_height);
		addHistory({image:imgd}, ppe.image_to_edit_width, ppe.image_to_edit_height, 'Preset Effect: Colorfull');
		break;
		
		case 'red':
		effectRGB(20, 0, 0, ppe.canvas_id, ppe.context, 0, 0, ppe.image_to_edit_width, ppe.image_to_edit_height);
		var imgd =  ppe.context.getImageData(0, 0, ppe.image_to_edit_width, ppe.image_to_edit_height);
		addHistory({image:imgd}, ppe.image_to_edit_width, ppe.image_to_edit_height, 'Preset Effect: Red');
		break;
		
		case 'green':
		effectRGB(0, 20, 0, ppe.canvas_id, ppe.context, 0, 0, ppe.image_to_edit_width, ppe.image_to_edit_height);
		var imgd =  ppe.context.getImageData(0, 0, ppe.image_to_edit_width, ppe.image_to_edit_height);
		addHistory({image:imgd}, ppe.image_to_edit_width, ppe.image_to_edit_height, 'Preset Effect: Green');
		break;
		
		case 'blue':
		effectRGB(0, 0, 20, ppe.canvas_id, ppe.context, 0, 0, ppe.image_to_edit_width, ppe.image_to_edit_height);
		var imgd =  ppe.context.getImageData(0, 0, ppe.image_to_edit_width, ppe.image_to_edit_height);
		addHistory({image:imgd}, ppe.image_to_edit_width, ppe.image_to_edit_height, 'Preset Effect: Blue');
		break;
		
	}
	hideTextEditor();
}
function TBFileSave(filetype)
{
	var filename = '';
	if(filetype == 'jpeg')
	{
	var jpegURL = ppeImage.canvas.toDataURL('image/jpeg');
	filename = "image.jpg";
	}
	else
	{
	var jpegURL = ppeImage.canvas.toDataURL('image/png');
	filename = "image.png";
	}
	window.open(jpegURL);
}

function copyImage(context, image, sx, sy, sw, sh, dx, dy, dw, dh)
{
	context.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
}

function TBUndo()
{
	historyBack();
	hideTextEditor();
}
function TBRedo()
{
	historyForward();
	hideTextEditor();
}
function TBShowControl(obj)
{
	showControl = !showControl;
	if(showControl)
	{
		$(obj).removeClass('menu-unchecked');
		$(obj).addClass('menu-checked');
	}
	else
	{
		$(obj).removeClass('menu-checked');
		$(obj).addClass('menu-unchecked');
	}
	hideTextEditor();
}
function TBAddHistoryEffect(obj)
{
	addHistoryEffect = !addHistoryEffect;
	if(addHistoryEffect)
	{
		$(obj).removeClass('menu-unchecked');
		$(obj).addClass('menu-checked');
	}
	else
	{
		$(obj).removeClass('menu-checked');
		$(obj).addClass('menu-unchecked');
	}
}
function TBShowSidebar(obj)
{
	showSidebar = !showSidebar;
	if(showSidebar)
	{
		$(obj).removeClass('menu-unchecked');
		$(obj).addClass('menu-checked');
		$('.side-bar').css('display', 'block');
		$('.main-bar').addClass('main-bar-indent');
	}
	else
	{
		$(obj).removeClass('menu-checked');
		$(obj).addClass('menu-unchecked');
		$('.side-bar').css('display', 'none');
		$('.main-bar').removeClass('main-bar-indent');
	}
}
function TBResize(ignoreratio)
{
	try{
		$('#maincanvas-preview').resizable('destroy');
	}
	catch(e){}
	if(ignoreratio == undefined)
	{
		ignoreratio = 0;
	}
	if(ignoreratio)
	{
		$('#aspect-ratio').removeAttr('checked');
	}
	else
	{
		$('#aspect-ratio').attr('checked', 'checked');
	}
	
	$('#maincanvas-preview').css({'width':ppeImage.image_to_edit_width+'px', 'height':ppeImage.image_to_edit_height+'px'});
	$('#maincanvas-preview').attr('width', ppeImage.image_to_edit_width)
	$('#maincanvas-preview').attr('height', ppeImage.image_to_edit_height);
	$('#maincanvas').css('display', 'none');
	$('#maincanvas-preview').css('display', 'block');
	
	
	$('#maincanvas-preview').resizable(
	{
		aspectRatio:(ignoreratio)?false:(ppeImage.image_to_edit_width/ppeImage.image_to_edit_height),
		resize:function(){
			updateResizeInformation();
		},
		stop:function(){
			showApplyResizeButton();
	}
	});
	$('#maincanvas-preview').parent('.ui-wrapper').css({'display':'block', 'width':ppeImage.image_to_edit_width+'px', 'height':ppeImage.image_to_edit_height+'px'});
	previewCopy();
	resizeMode = true;
	$('#aspect-ratio').unbind();
	$('#aspect-ratio').bind('change', function(){
	var chk = $(this).attr('checked');
	if(chk == 'checked')
	{
		TBResize(0);
	}
	else
	{
		TBResize(1);
	}
	});
	$('#resize-control').css('display', 'block');
	hideTextEditor();
	updateResizeInformation();
}
function updateResizeInformation()
{
	var width = parseInt($('#maincanvas-preview').width());
	var height = parseInt($('#maincanvas-preview').height());
	$('#resise-x').text(width);
	$('#resise-y').text(height);
}
function TBExportToPB()
{
	if(login_pb_login_data.status)
	{
		showExportDialog();
	}
	else
	{
		showLoginDialog(answer);
	}
	hideTextEditor();
}
var sendButton1;
var sendButton2;
var sendButton3;
function showExportDialog()
{
	$('#dialog-sendto-planetbiru').dialog({
		modal:true,
		width:400,
		height:200,
		buttons:{
		'Send':function(){
			var to = login_pb_login_data.member_id;
			var text = $('#text').val();
			var attachment_id = $('#attachment_id').val();
			
			$.ajax({
				type:'POST',
				dataType:"json",
				url:'../../lib.ajax/ajax-send-post.php', 
				data:{'to':to,'content':text,'attachment_id':attachment_id,'showto':'yes','data_type':'json'}, 
				success: function(data){
					$('#dialog-sendto-planetbiru').dialog('destroy');
					var content = data.attachment+data.content
					jqAlert(content, 'Success', 490, 400);
				}
			});
		},
		'Cancel':function(){
			$('#dialog-sendto-planetbiru').dialog('destroy');
		}
		}
	
	});
	$("#progressbaruploadinner").css({'width':'0'});

	var dialog = $('#dialog-sendto-planetbiru').closest('.ui-dialog');	
	sendButton1 = dialog.find('.ui-dialog-buttonset .ui-button:first-child');
	sendButton2 = dialog.find('.ui-dialog-buttonset .ui-button:nth-child(2)');
	sendButton3 = dialog.find('.ui-dialog-titlebar .ui-button');
	sendButton1.css({'display':'none'});
	//sendButton2.css({'display':'none'});
	sendButton3.css({'display':'none'});
	
	var jpegURL = ppeImage.canvas.toDataURL('image/jpeg');
	var imageData = jpegURL;
	
	if (window.XMLHttpRequest) 
	{
		var xhr = new XMLHttpRequest();
	} 
	else 
	{
		var xhr;
		var versions = [
			"MSXML2.XmlHttp.5.0", 
			"MSXML2.XmlHttp.4.0",
			"MSXML2.XmlHttp.3.0", 
			"MSXML2.XmlHttp.2.0",
			"Microsoft.XmlHttp"
		];
		for(var i = 0, len = versions.length; i < len; i++) 
		{
			try {
				xhr = new ActiveXObject(versions[i]);
				break;
			}
			catch(e){}
		} 
	}		
	var formData = new FormData();
	formData.append('imagedata', imageData);

	xhr.open('POST', '../../lib.ajax/ajax-upload-image.php');
	xhr.onload = function ()
	{
		if(xhr.status === 200)
		{
			sendButton1.css({'display':'inline'});
		} 
	};
	xhr.upload.addEventListener("progress", progressHandler, false);
	xhr.addEventListener("load", completeHandler, false);
	xhr.addEventListener("error", errorHandler, false);
	xhr.addEventListener("abort", abortHandler, false);
	xhr.send(formData);
}
function progressHandler(event){
	var percent = (event.loaded / event.total) * 100;
	$("#progressbaruploadinner").css({'width':percent+'%'})
}
function completeHandler(event){
	var response = event.target.responseText;
	var data = JSON.parse(response);
	$('input#attachment_id').val(data[0]['attachment_id'][0]);

	$("#progressbaruploadinner").css({'width':'100%'});
	sendButton1.css({'display':'inline'});
	sendButton2.css({'display':'inline'});
}
function errorHandler(event){
	jqAlert('Uploading error.', 'Error');
}
function abortHandler(event){
	jqAlert('Process aborted.', 'Aborted');
}
function jqAlert(msg, title, width, height)
{
$('#mb-area').remove();
$('body').append('<div id="mb-area" style="display:none;"><div id="message-box-dialog"><div id="message-box-dialog-inner"></div></div></div>');
if(!title) title = 'Alert';
if(!width) width = 300;
if(!height) height = 165;
try{$('#message-box-dialog').dialog('destroy');} catch(e){}
$('#message-box-dialog-inner').html(msg);
$('#message-box-dialog').dialog({
width:width,
height:height,
modal:true,
title:title,
buttons:{
'Close':function(){
try{$('#message-box-dialog').dialog('destroy');} catch(e){}
}
}
});
}

function showLoginDialog(html)
{
	$('#dialog-register-planetbiru').attr('title', 'Login to Planetbiru and Send Image');
	$('#dialog-register-planetbiru').dialog({
		modal:true,
		width:400,
		height:280,
		buttons:{
		'Login':function(){
			$('#dialog-register-planetbiru').dialog('destroy');
			var jpegURL = ppeImage.canvas.toDataURL('image/jpeg');
			document.getElementById('data2send').value = jpegURL;
			document.planetbiruform.submit();
			$('#data2send').val('');
		},
		'Don Not Have Account':function(){
			$('#dialog-register-planetbiru').dialog('destroy');
			showRegisterDialog(html);
		},
		'Cancel':function(){
			$('#dialog-register-planetbiru').dialog('destroy');
		}
		}
	
	});
	$('#dialog-register-planetbiru-inner').html(html);
	$('#pb-register-form').css({'display':'none'});
	$('#pb-login-form').css({'display':'block'});
}
function showRegisterDialog(html)
{
	$('#dialog-register-planetbiru').attr('title', 'Register to Planetbiru and Send Image');
	$('#dialog-register-planetbiru').dialog({
		modal:true,
		width:400,
		height:280,
		buttons:{
		'Register':function(){
			$('#dialog-register-planetbiru').dialog('destroy');
			var jpegURL = ppeImage.canvas.toDataURL('image/jpeg');
			document.getElementById('data2send').value = jpegURL;
			document.planetbiruform.submit();
			$('#data2send').val('');
		},
		'Have Account':function(){
			$('#dialog-register-planetbiru').dialog('destroy');
			showLoginDialog(html);
		},
		'Cancel':function(){
			$('#dialog-register-planetbiru').dialog('destroy');
		}
		}
	
	});
	$('#dialog-register-planetbiru-inner').html(html);
	$('#pb-login-form').css({'display':'none'});
	$('#pb-register-form').css({'display':'block'});
}
function TBAbout()
{
	$.get('about.php', {'ajax':'yes'}, function(answer){
		$('#dialog-about').html(answer);
	});
	$('#dialog-help-about').dialog({
		modal:false,
		width:400,
		height:200,
		buttons:{
		'Close':function(){
			$('#dialog-help-about').dialog('destroy');
		}
		}
	});
}
function TBShowImageProperties()
{
	$('.ori_w').text(GDHistory[0].width);
	$('.ori_h').text(GDHistory[0].height);
	$('.cur_w').text(GDHistory[historyPos].width);
	$('.cur_h').text(GDHistory[historyPos].height);
	
	$('#dialog-image-properties').dialog({
		modal:false,
		width:400,
		height:230,
		buttons:{
		'Close':function(){
			$('#dialog-image-properties').dialog('destroy');
		}
		}
	});
}
function TBUsing()
{
	$.get('using.php', {'ajax':'yes'}, function(answer){
		$('#dialog-using').html(answer);
	});
	$('#dialog-help-using').dialog({
		modal:false,
		width:800,
		height:500,
		buttons:{
		'Close':function(){
			$('#dialog-help-using').dialog('destroy');
		}
		}
	});
}

function showApplyResizeButton()
{
	$('#apply-resize-buttons').css('display', 'block');					
	hideTextEditor();
}
function hideApplyResizeButton()
{
	$('#apply-resize-buttons').css('display', 'none');
	hideTextEditor();					
}
function applyResize()
{
	var sw = parseInt(ppeImageTmp.image_to_edit_width);
	var sh = parseInt(ppeImageTmp.image_to_edit_height);
	var dw = parseInt($('#maincanvas-preview').width());
	var dh = parseInt($('#maincanvas-preview').height());
	
	
	// prepare new canvas
	$('#maincanvas').attr('width', dw)
	$('#maincanvas').attr('height', dh);
	$('#maincanvas').css({'width': dw, 'height': dh});
	canvas = document.getElementById('maincanvas');
	context = canvas.getContext('2d');
	ppeImage.context = context;
	
	ppeImage.image_to_edit_width = dw;
	ppeImage.image_to_edit_height = dh;
	
	var imageObj = new Image();
	imageObj.onload = function() {
		
		ppeImage.context.drawImage(imageObj, 0, 0, sw, sh, 0, 0, dw, dh);
		ppeImage.image_to_edit_width = dw;
		ppeImage.image_to_edit_height = dh;
		
		hideApplyResizeButton();
		$('#resize-control').fadeOut('fast');
		$('#maincanvas-preview').css('display', 'none');
		destroyResize();
		$('#maincanvas').css('display', 'block');
		resizeMode = false;
		var imgd =  ppeImage.context.getImageData(0, 0, dw, dh);
		addHistory({image:imgd}, ppeImage.image_to_edit_width, ppeImage.image_to_edit_height, 'resize');
	};
	imageObj.src = ppeImageTmp.canvas.toDataURL();;
	hideTextEditor();
	
}

function cancelResize()
{
	hideApplyResizeButton();
	var chk = $('#aspect-ratio').attr('checked');
	if(chk == 'checked')
	{
		TBResize(0);
	}
	else
	{
		TBResize(1);
	}
	hideTextEditor();
}
function destroyResize()
{
	try{
	$('#maincanvas-preview').resizable('destroy');
	}
	catch(e){}
	hideTextEditor();
}

function TBAddText()
{
	var ret = showTextEditor();
	if(!ret)
	{
		$('#dialog-warning-resize-mode').dialog({
			modal:false,
			width:400,
			height:200,
			buttons:{
			'Apply Size':function(){
				applyResize();
				$('#dialog-warning-resize-mode').dialog('destroy');
				setTimeout(function(){
				resizeMode = false;
				showTextEditor();
				}, 200);
			},
			'Close':function(){
				$('#dialog-warning-resize-mode').dialog('destroy');
			}
			}
		});
	}
}
function showTextEditor()
{
	if(resizeMode)
	{
		$('#text-control, #text-editor-area').css('display', 'none');
		return false;
	}
	else
	{
		$('#text-control, #text-editor-area').css('display', 'block');
		$('#text-editor').select();
		return true;
	}
}
function hideTextEditor()
{
	$('#text-control, #text-editor-area').css('display', 'none');
}
function textImageApplyStyle()
{
	var fontFace = $('#fontface').val();
	var fontSize = $('#fontsize').val();
	var textColor = $('#textcolor').val();
	
	if(textColor.charAt(0) != '#')
	textColor = '#'+textColor;
	
	//textColor = '#550044';
	
	// Apply to textarea
	$('#text-editor').css({
	'font-family':fontFace,
	'font-size':fontSize+'px',
	'color':textColor
	});
}
function textImageApply()
{
	var fontFace = $('#fontface').val();
	var fontSize = parseInt($('#fontsize').val());
	var textColor = $('#textcolor').val();
	
	fontSize = fontSize;
	
	var text = $('#text-editor').val();
	var xpos = parseInt($('#text-editor').offset().left);
	var ypos = parseInt($('#text-editor').offset().top);
	
	var cxpos = parseInt($('#maincanvas').offset().left);
	var cypos = parseInt($('#maincanvas').offset().top);
	
	var sxpos = parseInt($('#main-bar').scrollLeft());
	var sypos = parseInt($('#main-bar').scrollTop());
	
	xpos = 2 + xpos - cxpos;// + sxpos;
	ypos = 1 + ypos - cypos;// + sypos;
	
	ypos = ypos + (fontSize*0.85);

	if(textColor.charAt(0) != '#')
	textColor = '#'+textColor;

	ppeImage.context.font = fontSize+'px '+fontFace;
	
	var stroke = $('#textstroke').attr('checked');
	if(stroke)
	{
	ppeImage.context.strokeStyle = textColor;
	ppeImage.context.strokeText(text,xpos,ypos);
	}
	else
	{
	ppeImage.context.fillStyle = textColor;
	ppeImage.context.fillText(text,xpos,ypos);
	}
	var imgd =  ppeImage.context.getImageData(0, 0, ppeImage.image_to_edit_width, ppeImage.image_to_edit_height);
	addHistory({image:imgd}, ppeImage.image_to_edit_width, ppeImage.image_to_edit_height, 'Text: ('+text+')');
	hideTextEditor();
}
function TBImage2Text()
{
	$('#dialog-image-to-text').dialog({
		modal:true,
		width:430,
		height:380,
		buttons:{
			'Close':function(){
				$('#dialog-image-to-text').dialog('destroy');	
			}
		}
	});
	var text = ppeImage.canvas.toDataURL('image/jpeg');
	
	var tcanvas = document.getElementById('cit');
	var tcontext = tcanvas.getContext('2d');
	var timg = new Image();
	
	var itw = 32;
	var ith = ppeImage.image_to_edit_height * 16 / ppeImage.image_to_edit_width;
	
	timg.onload = function() {
		$('#cit').attr('width',itw);
		$('#cit').attr('height',ith);
		$('#cit').css({'width':itw+'px', 'height':ith+'px', 'display':'block'});
		tcontext.drawImage(timg, 0, 0, itw, ith);
		
		var mat = getMatrix('cit', tcontext, 0, 0, itw, ith);
		
		var i, j, itm;
		var res = '';
		var im = '';
		var rgb;
		for(i=0; i<ith; i++)
		{
			for(j=0; j<itw; j++)
			{
				rgb = getColorCode(mat[j][i]);
				res+='[color='+rgb+']#[/color]';
				im += '<span style="color:'+rgb+'">#</span>';
			}
			res+='\n';
			im+='<br />';
		}
		$('#textpixel').val(res);
		$('.imagedata').html(im);
		
	}
	timg.src = text;
}
var localstream = null;
function TBCameraStart()
{
	document.getElementById('maincanvas').style.display = 'none';
	navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;
	 
	if (navigator.getUserMedia) {
		video.style.width = '800px';       
		video.style.height = '600px';       
		video.style.display = 'block';       
		navigator.getUserMedia({video: true}, handleVideo, videoError);
	}
	 
}
function TBCaptureImage()
{
	localstream.stop();
	var thecanvas = document.getElementById('maincanvas-preview');
	thecanvas.setAttribute('width', video.style.width);
	thecanvas.setAttribute('height', video.style.height);
	var context = thecanvas.getContext('2d');
	context.drawImage(video, 0, 0, thecanvas.width, thecanvas.height);
	var dataURL = thecanvas.toDataURL();
	thecanvas.style.display = 'none';
	video.style.display = 'none';
	loadImage(canvasid, dataURL);

}
function handleVideo(stream) {
	localstream = stream;
	video.src = window.URL.createObjectURL(stream);
}
 
function videoError(e) {
	// do something
}
function getColorCode(rgba)
{
	var r = hex(rgba[0]);
	var g = hex(rgba[1]);
	var b = hex(rgba[2]);
	return '#'+r+g+b;
}
function hex(value) {
	value = parseInt(value).toString(16);
	return value.length > 1 ? value : '0' + value; 
};
