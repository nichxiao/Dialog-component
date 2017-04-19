;(function($){
	var Dialog = function(config){
		var _this = this;
		// 默认参数配置
		this.config = {
			buttons:null,
			type:"warning",
			delay:null,
			message:null,
			width:"auto",
			height:"auto",
			maskOpacity:null
		};
		// 默认参数扩展
		if(config && $.isPlainObject(config)){
			$.extend(this.config, config)
		}else{
			this.isConfig = true;
		}

		//创建dom 
		this.body = $("body");
		this.mask = $('<div class="maskBox">');
		this.win = $('<div class="popBox">');
		this.winHeader = $('<div class="icon"></div>');
		this.winContent = $('<p class="text">');
		this.winFooter = $('<div class="footer">');

		this.creat();
	};

	Dialog.prototype = {
        creat:function(){
        	var _this = this,
        	    config = this.config,
        	    mask = this.mask,
        	    win = this.win,
        	    header = this.winHeader,
        	    content = this.winContent,
        	    footer = this.winFooter,
        	    body = this.body;

        	if(this.isConfig){
        		win.append(header.addClass("warning"));
        		mask.append(win);
        		body.append(mask);
        	}else{
        		header.addClass(config.type);
        		win.append(header);
        		if(config.message){
        			win.append(content.html(config.message));
        		}
        		if(config.buttons){
        			this.creatButtons(footer,config.buttons);
        			win.append(footer);
        		}

        		mask.append(win);
        		body.append(mask);

        		if(config.width != 'auto'){
        			win.width(config.width)
        		}
        		if(config.maskOpacity){
        			mask.css('backgroundColor',"rgba(0,0,0,"+config.maskOpacity+")")
        		}
        		if(config.delay && config.delay !=0){
                    window.setTimeout(function(){
                       _this.close();
                    },config.delay);
        		}
        	}
        },

        close:function(){
        	this.mask.remove();
        },

        creatButtons:function(footer,buttons){
            var _this = this;
            $(buttons).each(function(i){
            	var type =this.type?" class='"+this.type+"'":'';
            	var btnText = this.text?this.text:'按钮'+(++i);
            	var callback = this.callback?this.callback:null;
            	var button = $("<button"+type+">"+btnText+"</button>");
                if(callback){
                    button.click(function(){
                    	var isClose = callback();
                        if(isClose != false){
                        	_this.close();
                        }
                    }) 
                }else{
                	button.click(function(){
                		_this.close();
                	})
                }
                footer.append(button);
            })
        }

	};

	window.Dialog = Dialog;
})(Zepto);