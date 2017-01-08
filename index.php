<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Planetbiru Photo Editor</title>
<meta name="description" content="Planetbiru Photo Editor is a web-based photo editor software." />
<link rel="stylesheet" type="text/css" href="script/jquery/custom-theme/jquery-ui-custom.min.css" />
<link rel="stylesheet" type="text/css" href="style.css" />


<link rel="stylesheet" href="script/jquery/jquery-ui.min.css">
<script type="text/javascript" src="script/jquery/jquery.min.js"></script>
<script type="text/javascript" src="script/jquery/jquery-ui.min.js"></script>

<script language="javascript" src="script/menu.js"></script>
<script language="javascript" src="script/script.js"></script>
<script language="javascript" src="script/toolbar.js"></script>
<script language="javascript" src="script/preview.js"></script>
<script language="javascript" src="script/sobel.js"></script>
<script language="javascript" src="script/wpap.js"></script>
<script type="text/javascript">
var login_pb_login_cookie;
function callback_pb_login(data)
{
	login_pb_login_data = data;
	
}
</script>
<script language="javascript" src="../../lib.api/login/check/?callback=callback_pb_login"></script>
</head>

<body data-id="1">
<div class="all">
<div class="header">
	<div class="toolbar">
    <div class="main-menu">
    <div class="main-menu-inner">
    
    <div class="menu drop-down-menu" id="menu1">
    <ul>
        <li><a href="#">File</a>
            <ul>
                <li><a class="file-open" href="javascript:TBFileOpen();">Open</a></li>
                <li><a class="file-import" href="javascript:TBFileImport();">Import</a></li>
            </ul>
        </li>
        <li><a href="#">Camera</a>
            <ul>
                <li><a class="camera-start" href="javascript:TBCameraStart();">Start Camera</a></li>
                <li><a class="camera-capture" href="javascript:TBCaptureImage();">Capture Image</a></li>
            </ul>
        </li>
        <li><a href="#">View</a>
            <ul>
                <li><a class="view-sidebar menu-checked" href="javascript:TBShowSidebar($('.view-sidebar'));">Show Sidebar</a></li>
                <li><a class="view-transfer-effect menu-unchecked" href="javascript:TBAddHistoryEffect($('.view-transfer-effect'));">Transfer Effect</a></li>
            </ul>
        </li>
        <li><a href="#">Help</a>
            <ul>
                <li><a class="help-about" href="javascript:TBAbout();">About</a></li>
                <li><a class="help-using" href="javascript:TBUsing();">Using Program</a></li>
            </ul>
        </li>
    </ul>
    </div>
    
    
    
    <div class="menu drop-down-menu" id="menu2">
    <ul>
        <li><a href="#">File</a>
            <ul>
                <li><a class="file-open" href="javascript:TBFileOpen();">Open</a></li>
                <li><a class="file-save" href="javascript:TBFileSave();">Save</a>
                	<ul>
                    <li><a class="file-image" href="javascript:TBFileSave('png')">Save as PNG File</a></li>
                    <li><a class="file-image" href="javascript:TBFileSave('jpeg')">Save as JPEG File</a></li>
                    </ul>
                </li>
                <li><a class="file-import" href="javascript:TBFileImport();">Import</a></li>
                <li><a class="file-import" href="javascript:TBImage2Text();">Image to Text</a></li>
                <li><a class="file-export file-export-pb" href="javascript:TBExportToPB();">Send to Planetbiru</a></li>
            </ul>
        </li>
        <li><a href="#">Camera</a>
            <ul>
                <li><a class="camera-start" href="javascript:TBCameraStart();">Start Camera</a></li>
                <li><a class="camera-capture" href="javascript:TBCaptureImage();">Capture Image</a></li>
            </ul>
        </li>
        <li><a href="#">Edit</a>
            <ul>
                <li><a class="edit-undo" href="javascript:TBUndo();">Undo</a></li>
                <li><a class="edit-redo" href="javascript:TBRedo();">Redo</a></li>
            </ul>
        </li>
        <li><a href="#">Image</a>
            <ul>
                <li><a class="image-brightness-contrast" href="javascript:TBBrightnessContrast();">Brightness and Contrast</a></li>
                <li><a class="image-adjust-color" href="javascript:TBAdjustColor();">Adjust Color</a></li>
                <li><a class="image-color-balance" href="javascript:TBColorBalance();">Color Balance</a></li>
                <li><a class="image-invert-color" href="javascript:TBInvertColor();">Invert Color</a></li>
                <li><a class="image-gray-scale" href="javascript:TBGrayScale();">Gray Scale</a></li>
                <li><a class="image-sepia" href="javascript:TBSepia();">Sepia</a></li>
                <li><a class="image-opacity" href="javascript:TBOpacity();">Opacity</a></li>
            </ul>
        </li>
        <li><a href="#">Transform</a>
            <ul>
                <li><a class="image-flip-h" href="javascript:TBFlipHorizontal();">Flip Horizontal</a></li>
                <li><a class="image-flip-v" href="javascript:TBFlipVertical();">Flip Vertical</a></li>
                <li><a class="image-rotate-cw" href="javascript:TBRotateClockwise();">Rotate Clockwise</a></li>
                <li><a class="image-rotate-ccw" href="javascript:TBRotateCounterclockwise();">Rotate Counterclockwise</a></li>
                <li><a class="image-resize" href="javascript:TBResize();">Resize</a></li>
            </ul>
        <li><a href="#">Text</a>        
          <ul>
            <li><a class="image-text" href="javascript:TBAddText()">Add Text</a> </li>
          </ul>        
        <li><a href="#">Effects</a>
          <ul>
            <li><a class="image-vectorize" href="javascript:TBVectorize();">Vectorize</a></li>
            <li><a class="image-template" href="#">Preset Effects</a><ul>
              <li><a class="image-template" href="javascript:TBTemplate('jadul');">Jadul</a></li>
              <li><a class="image-template" href="javascript:TBTemplate('lighty');">Lighty</a></li>
              <li><a class="image-template" href="javascript:TBTemplate('dark');">Dark</a></li>
              <li><a class="image-template" href="javascript:TBTemplate('contrast');">Contrast</a></li>
              <li><a class="image-template" href="javascript:TBTemplate('colorfull');">Colorfull</a></li>
              <li><a class="image-template" href="javascript:TBTemplate('red');">Red</a></li>
              <li><a class="image-template" href="javascript:TBTemplate('green');">Green</a></li>
              <li><a class="image-template" href="javascript:TBTemplate('blue');">Blue</a></li>
              </ul>
              </li>
            </ul>
        <li><a href="#">View</a>
            <ul>
                <li><a class="view-sidebar menu-checked" href="javascript:TBShowSidebar($('.view-sidebar'));">Show Sidebar</a></li>
                <li><a class="view-transfer-effect menu-unchecked" href="javascript:TBAddHistoryEffect($('.view-transfer-effect'));">Transfer Effect</a></li>
                <li><a class="display-properties" href="javascript:TBShowImageProperties();">Show Image Properties</a></li>
            </ul>
        </li>
        <li><a href="#">Help</a>
            <ul>
                <li><a class="help-about" href="javascript:TBAbout();">About</a></li>
                <li><a class="help-using" href="javascript:TBUsing();">Using Program</a></li>
            </ul>
        </li>
    </ul>
    </div>
    
        
    </div>
    </div>
    </div>
    
</div>

<div class="dialogs">
	<div id="dialog-file-open" title="Open File">
    	<div id="dialog-file-open-inner">
            <form name="openfilefrm">
            	<div class="block-label">Select Image File</div>
	            <input type="file" name="imagesource" id="imagesource" />
            </form>
        </div>
    </div>
    
	<div id="dialog-import-image" title="Import Image">
    	<div id="dialog-import-image-inner">
            <form name="import-image-form" onSubmit="return importFile()">
            	<div class="block-label">Image URL</div>
	            <input type="text" name="url" id="url" class="input-text input-text-long" />
            </form>
        </div>
    </div>
    
	<div id="dialog-effect-brightness-contrast" title="Brightness and Contrast">
    	<div id="dialog-brightness-contrast">
            <form name="effect-brightness-contrast-form">
            <div class="item-effect">
            	<div class="block-label">Brightness (<span id="status-brightness"></span>)</div>
            	<div id="slider-brightness" class="slider-bc"></div>
            </div>
            <div class="item-effect">
            	<div class="block-label">Contrast (<span id="status-contrast"></span>)</div>
            	<div id="slider-contrast" class="slider-bc"></div>
            </div>
            </form>
        </div>
    </div>
    
	<div id="dialog-effect-hsl" title="Adjust Color">
    	<div id="dialog-hsl">
            <form name="effect-hsl-form">
            <div class="item-effect">
            	<div class="block-label">Hue (<span id="status-hue"></span>)</div>
            	<div id="slider-hue" class="slider-hsl"></div>
            </div>
            <div class="item-effect">
            	<div class="block-label">Saturation (<span id="status-saturation"></span>)</div>
            	<div id="slider-saturation" class="slider-hsl"></div>
            </div>
            <div class="item-effect">
            	<div class="block-label">Luminance (<span id="status-luminance"></span>)</div>
            	<div id="slider-luminance" class="slider-hsl"></div>
            </div>
            </form>
        </div>
    </div>
    
	<div id="dialog-effect-opacity" title="Opacity">
    	<div id="dialog-opacity">
            <form name="effect-opacity-form">
            <div class="item-effect">
            	<div class="block-label">Opacity (<span id="status-opacity"></span>)</div>
            	<div id="slider-opacity" class="slider-opacity"></div>
            </div>
            </form>
        </div>
    </div>
    
	<div id="dialog-effect-edge-detection" title="Edge Detection">
    	<div id="dialog-edge-detection">
            <form name="effect-edge-detection-form" onSubmit="return false;">
            <div class="item-effect">
            	<div class="block-label">Threshold (<span id="status-threshold"></span>)</div>
            	<div id="slider-threshold" class="slider-threshold"></div>
            	<div class="block-label">Color <input type="text" name="rgbforsobel" id="rgbforsobel" class="input-text input-text-short" value="#000000" /> <span>
                <input type="button" name="applysobel" id="applysobel" class="com-button" value="Preview" /></span>
                </div>
            </div>
            </form>
        </div>
    </div>
    
	<div id="dialog-effect-wpap" title="WPAP">
    	<div id="dialog-wpap">
            <form name="effect-wpap-form" onSubmit="return false;">
            <div class="item-effect">
            	<div class="block-label">Segment (<span id="status-segment"></span>)</div>
            	<div id="slider-segment" class="slider-segment"></div>
            </div>
            </form>
        </div>
    </div>
    
	<div id="dialog-effect-color-balance" title="Color Balance">
    	<div id="dialog-color-balance">
            <form name="effect-color-balance-form">
            <div class="item-effect">
            	<div class="block-label">Red (<span id="status-red"></span>)</div>
            	<div id="slider-red" class="slider-red"></div>
            </div>
            <div class="item-effect">
            	<div class="block-label">Green (<span id="status-green"></span>)</div>
            	<div id="slider-green" class="slider-green"></div>
            </div>
            <div class="item-effect">
            	<div class="block-label">Blue (<span id="status-blue"></span>)</div>
            	<div id="slider-blue" class="slider-blue"></div>
            </div>
            </form>
        </div>
    </div>
    
    <div id="dialog-image-to-text">
    	<canvas id="cit">Not supported</canvas>
        <div class="image2text">
            <div class="textdata">
                <textarea id="textpixel" name="textpixel"></textarea>
            </div>
            <div class="imagedata">
            </div>
        </div>    	
    </div>

	<div id="dialog-help-about" title="About Planetbiru Image Editor">
    	<div id="dialog-about">
		</div>
    </div>

	<div id="dialog-help-using" title="Using Planetbiru Image Editor">
    	<div id="dialog-using">
		</div>
    </div>

	<div id="dialog-warning-resize-mode" title="Resize Mode">
    	<div id="warning-resize-mode">
        	Please apply the size you have make change before adding text to the image.
		</div>
    </div>


	<div id="dialog-sendto-planetbiru" title="Send To Planetbiru">
    	<div id="dialog-sendto-planetbiru-inner">
        	<form id="planetbiruform" action="http://planetbiru.com/lib.ajax/ajax-upload-image.php">
            	<div id="progressbarupload"><div id="progressbaruploadinner"></div></div>
                <textarea name="text" id="text"></textarea>
                <input type="hidden" id="attachment_id" name="attachment_id" value="">
            </form>
        </div>
    </div>
	<div id="dialog-register-planetbiru" title="Register to Planetbiru and Send Image">
    	<div id="dialog-register-planetbiru-inner">
        </div>
    </div>
	<div id="dialog-image-properties" title="Image Properties">
    	<div id="image-properties">
            <table width="100%" border="0" cellspacing="0" cellpadding="0" class="dialog-table">
              <tr>
                <td colspan="2"><strong>Original Image</strong></td>
              </tr>
              <tr>
                <td width="30%">Width</td>
                <td><span class="ori_w"></span>px</td>
              </tr>
              <tr>
                <td>Height</td>
                <td><span class="ori_h"></span>px</td>
              </tr>
              <tr>
                <td colspan="2"><strong>Current Image</strong></td>
              </tr>
              <tr>
                <td>Width</td>
                <td><span class="cur_w"></span>px</td>
              </tr>
              <tr>
                <td>Height</td>
                <td><span class="cur_h"></span>px</td>
              </tr>
            </table>
                    
        
		</div>
    </div>

    
</div>

<div class="controls">
</div>


<div class="wrapper">
	<div class="side-bar">
    	<div class="layers">
          <div id="history-list" class="widget-item">
                <div class="widget-item-title">
                    <h3>Editing History</h3>
                </div>
                <div class="widget-item-body">
                    <ul id="history-list-item">
                    </ul>
                </div>
            </div>
            
          <div id="resize-control" class="widget-item">
                <div class="widget-item-title">
                    <h3>Resize Image</h3>
                </div>
                <div class="widget-item-body">
                <div class="cb-area">
                	<label><input type="checkbox" name="aspect-ratio" id="aspect-ratio" value="1" checked="checked"> Keep Aspect Ratio</label>
                    <table width="100%" border="0" cellpadding="0" cellspacing="0">
                    	<tr><td width="50%">Width: <span id="resise-x"></span></td><td>Height: <span id="resise-y"></span></td></tr>
                    </table>
                </div>
                <div id="apply-resize-buttons">
                <input type="button" name="apply-resize" id="apply-resize" class="com-button" value="Apply" onClick="applyResize(1)" />
                <input type="button" name="cancel-resize" id="cancel-resize" class="com-button" value="Cancel" onClick="cancelResize()" />
                </div>
                </div>
            </div>
 
 
           <div id="text-control" class="widget-item" style="position:absolute;">
                <div class="widget-item-title">
                    <h3>Text Properties</h3>
                </div>
                <div class="widget-item-body">
                <link rel="stylesheet" type="text/css" href="script/jquery/jPicker.css" />
                <link rel="stylesheet" type="text/css" href="script/jquery/jPicker.min.css" />
                <script language="javascript" src="script/jquery/jpicker.js"></script>
               <form action="" method="get" name="textform" onSubmit="return false;">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td>Font Face</td>
                        <td><select name="fontface" id="fontface">
                          <option value="Arial">Arial</option>
                          <option value="Arial Black">Arial Black</option>
                          <option value="Comic Sans MS">Comic Sans MS</option>
                          <option value="Courier New">Courier New</option>
                          <option value="Geneva">Geneva</option>
                          <option value="Helvetica">Helvetica</option>
                          <option value="Impact">Impact</option>
                          <option value="Lucida Console">Lucida Console</option>
                          <option value="Lucida Grande">Lucida Grande</option>
                          <option value="Lucida Sans Unicode">Lucida Sans Unicode</option>
                          <option value="sans-serif">sans-serif</option>
                          <option value="Tahoma">Tahoma</option>
                          <option value="Times New Roman">Times New Roman</option>
                          <option value="Trebuchet MS">Trebuchet MS</option>
                          <option value="Verdana">Verdana</option>
                        </select></td>
                      </tr>
                      <tr>
                        <td>Font Size</td>
                        <td><input name="fontsize" type="text" id="fontsize" value="16" /></td>
                      </tr>
                      <tr>
                        <td>Color</td>
                        <td><input name="textcolor" type="text" id="textcolor" value="#026EDB" /></td>
                      </tr>
                      <tr>
                        <td>Method</td>
                        <td><label>
                          <input name="textstroke" type="checkbox" id="textstroke" value="1" />
                        Stroke</label></td>
                      </tr>
                    </table>
                    <div class="button-area">
                    <input type="button" name="applytext" id="applytext" class="com-button" value="Apply">
                    <input type="button" name="closetextcontrol" id="closetextcontrol" class="com-button" value="Cancel">
                    </div>
                    </form>
				</div>
           </div>
 
            <div class="ads180x150">
           </div>
            
            
        </div>
    </div>
    
    <div class="main-bar main-bar-indent">
    	<div class="main-canvas-area">
 

         
               
            <div id="text-editor-area" style="position:absolute; margin-left:20px; margin-top:20px; height:0px;">   
            <div class="text-editor-all">
            <div class="text-editor-container"><textarea name="text-editor" class="text-editor" id="text-editor" spellcheck="false">Planetbiru</textarea>
            <div class="text-editor-handler">
                <input type="button" id="text-editor-button" class="text-editor-button" value="Apply" />
            </div>
            </div>
            </div>
            </div>   
               
        	<canvas id="maincanvas">Your browser does not support canvas</canvas>
        	<canvas id="maincanvas-preview">Your browser does not support canvas</canvas>
            <video autoplay="true" id="videoelement">Your browser does not support video</video>  
                              
             
             
             
        </div>
    </div>
</div>
</div>
</body>
</html>