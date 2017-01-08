/*
Copyright Planetbiru Studio 2014
All rights reserved
*/
(function($) {
    $.fn.dropDownMenu = function(options){
		this.init = function(selector)
		{
			this.selector = selector;
			this.init = function(){
				var _obj = $(this.selector).find('> li > ul');
				_obj.find('li ul').each(function(){
					$(this).attr('pos', 'right');
				});
				$(this.selector).find('li ul').parent().each(function(){
					var _li = $(this);
					var _ul = $(this).find('> ul');
					var _a = $(this).find('> a');
					_li.addClass('has-children');
					
					if(_ul.attr('pos') == 'right')
					{
						_li.find('> a > .dm-ar').remove();
						_li.find('> a').prepend('<span class="dm-ar"></a>');
					}
					else
					{
						_li.find('> a > .dm-ad').remove();
						_li.find('> a').prepend('<span class="dm-ad"></a>');
					}
					_a.bind('click', function(){
						var __a = $(this);
						_this.hideOther();
						_this.showSubmenu(__a.parent());
						if(_ul.attr('pos') == 'right')
						{
							var _w = parseInt(__a.parent().outerWidth());
							var _h = parseInt(__a.parent().outerHeight());
							var _l = parseInt(__a.parent().offset().left);
							var _t = parseInt(__a.parent().offset().top);
							if(__a.parent().parent().attr('pos') != 'right')
							{
								_h = _h;
							}
							var __l = _l + _w;
							var __t = _t + _h;
							_ul.css({'margin-left':_w+'px', 'margin-top':'-'+_h+'px'});	
						}
						_ul.css({'display':'block'});
						return false;
					});
				});
				$(document).bind('click', function(){
					_this.hideOther();
				});
			};
			this.hideOther = function(){
				$(this.selector).find('li ul').css({'display':'none'});
			};
			this.showSubmenu = function(obj){
				var _obj = obj.parent();
				while(_obj.length)
				{
					_obj.css({'display':'block'});
					_obj = _obj.parent().parent();
				}
			}
			var _this = this;
			this.init();
			return this;
		}
		var thisPlugin = this;
		return this.each(function(index){
			var _thisCtrl = this;
			var dm = new thisPlugin.init(_thisCtrl);
		});
	}
})(jQuery);