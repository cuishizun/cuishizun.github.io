/* START - Window-Widget */
$.widget('custom.window', $.ui.dialog, {
    options: {
        
    },

    _create: function () {
        //console.log('_create');
        var objThis = this;
        this._super();
        console.log(this);

        /* START - set position and containment for draggable by appendTo-option */
        if(this.options.appendTo != '' && this.options.appendTo != 'body' && this.options.appendTo != 'window'){
            //this.uiDialog.draggable('option','containment',this.options.appendTo);

            if(parseInt((this.options.positionX) > 0 || parseInt(this.options.positionX) > 0) && this.options.maximized !== true){
                this.options.position = {
                    my: 'left+'+this.options.positionX+' top+'+this.options.positionY+'',
                    at: 'left top',
                    of: $(this.options.appendTo)
                };
            }else{
                this.options.position = {
                    my: 'center',
                    at: 'center',
                    of: $(this.options.appendTo)
                };
            }

        }else{
            this.uiDialog.draggable('option','containment','window');

            if((parseInt(this.options.positionX) > 0 || parseInt(this.options.positionX) > 0) && this.options.maximized !== true){
                this.options.position = {
                    my: 'left+'+this.options.positionX+' top+'+this.options.positionY+'',
                    at: 'left top',
                    of: window
                };
            }else{
                this.options.position = {
                    my: 'center',
                    at: 'center',
                    of: window
                };
            }
        }
        /* END set position and containment for draggable by appendTo-option */

        /* START - Add Buttons to titlebar */
        $objWindowButtonBar = $('<div class="lwd-window-buttonbar"></div>');

        // Relocate or remove close-button
        if(this.options.closable === true){
            this.uiDialogTitlebar.find('.ui-dialog-titlebar-close').detach().appendTo($objWindowButtonBar);
        }else{
            this.uiDialogTitlebar.find('.ui-dialog-titlebar-close').remove();
        }

        // Add maxmimize-button
        this.options.maximizable = (!(this.options.maxHeight > 0 || this.options.maxWidth > 0 || this.options.draggable === false || this.options.resizable === false || this.options.maximizable !== true));

        if(this.options.maximizable === true){
            var $objMaximizeButton = $('<button class="ui-button ui-widget ui-state-default ui-corner-all ui-button-icon-only ui-dialog-titlebar-close lwd-window-titlebar-maximize" type="button" role="button" title="Maximize"><span class="ui-button-icon-primary ui-icon ui-icon-maximizethick"></span><span class="ui-button-text">Close</span></button>');
            $objWindowButtonBar.append($objMaximizeButton);
        }

        // Add minimize-button
        if(this.options.minimizable === true){
            var $objMinimizableButton = $('<button class="ui-button ui-widget ui-state-default ui-corner-all ui-button-icon-only ui-dialog-titlebar-close lwd-window-titlebar-minimize" type="button" role="button" title="Minimize"><span class="ui-button-icon-primary ui-icon ui-icon-minimizethick"></span><span class="ui-button-text">Close</span></button>');
            $objWindowButtonBar.append($objMinimizableButton);
        }

        this.uiDialogTitlebar.append($objWindowButtonBar);
        /* END - Add Buttons to titlebar */


        /* START - Add button to taskbar */
        var $objTaskbar = $('div#taskbar');
        var $objTaskbarButtonContaier = $('div#lwd-taskbar-button-container');

        if($objTaskbar.is(':visible')){
            var $objTaskbarButton = $('<button class="lwd-taskbar-button" data-ariadescribedby="'+this.uiDialog.attr('aria-describedby')+'">'+this.options.title+'</button>');
            $objTaskbarButtonContaier.append($objTaskbarButton);
        }
        /* END - Add button to taskbar */

        /* START - Events */
        this.uiDialog.find('.lwd-window-buttonbar>button').on({
            mouseenter: function () {
                $(this).addClass('ui-state-focus');
            },

            mouseleave: function () {
                $(this).removeClass('ui-state-focus');
            }
        });

        this.uiDialog.on('windowfocus click dragstart', function(event){
            event.stopPropagation();
            objThis._focus();
        });

        this.uiDialog.on('windowclose', function (event) {
            event.stopPropagation();
            objThis._close();
        });

        this.uiDialogTitlebar.find('button.lwd-window-titlebar-maximize').on('click', function () {
            if(objThis.options.maximized === true){
                objThis._restore();
            }else if(objThis.options.maximizable === true){
                objThis._maximize();
            }
        });

        this.uiDialogTitlebar.on('dblclick', function () {
            if(objThis.options.maximized === true){
                objThis._restore();
            }else if(objThis.options.maximizable === true){
                objThis._maximize();
            }
        });

        this.uiDialogTitlebar.find('button.lwd-window-titlebar-minimize').on('click', function () {
            if(objThis.options.minimized === true){
                objThis._restore();
            }else if(objThis.options.minimizable === true){
                objThis._minimize();
            }
        });

        this.uiDialog.on('windowdragstop', function () {
            objThis._dragStop();
        });

        this.uiDialog.on('windowresizestop', function () {
            objThis._resizeStop();
        });

        this.uiDialog.on('windowresizestart', function () {
            objThis._resizeStart();
        });

        this.uiDialog.on('windowdragstart', function () {
            objThis._dragStart();
        });

        this.uiDialog.on('windowdrag', function () {
            objThis._drag();
        });
        /* END - Events */

        // Maximize if initialized with maximized parameter
        if(this.options.maximized === true){
            this._maximize();
        }

        // minimize if initialized with minimize parameter
        if(this.options.minimized === true){
            this.uiDialog.hide();
            this._focusNextOpenWindow();
        }

        this._adjustWindow();
    },

    /* START - Methods */
    _init: function () {
        if(this.options.autoOpen){
            this._open();
        }
    },

    _open: function () {
        this.open();
    },

    _focus: function () {
        //console.log('_focus');
        //console.log(this.uiDialog);
        var $objTaskbar = $('div#taskbar');

        if(this.uiDialog.is(':visible')){
            //console.log('-- window is visible >');

            if(this.options.minimized === true && $objTaskbar.is(':visible')){
                //console.log('-- window is minimized |');
                this.uiDialog.hide();
                this._focusNextOpenWindow();
            }else{
                var $intMaxUsedZIndex = 10;

                $('.ui-dialog').each(function () {
                    var $intUsedZIndex = parseInt($(this).css('z-index'));

                    $intMaxUsedZIndex = ($intMaxUsedZIndex < $intUsedZIndex)? $intUsedZIndex: $intMaxUsedZIndex;
                    $(this).removeClass('lwd-window-focus');
                });

                this.uiDialog.addClass('lwd-window-focus');
                this.uiDialog.css('z-index',$intMaxUsedZIndex+1);

                if($objTaskbar.is(':visible')){
                    var $objTaskbarButtonContainer = $('div#lwd-taskbar-button-container');

                    $objTaskbarButtonContainer.find('button').removeClass('lwd-taskbar-button-focus');

                    $objTaskbarButtonContainer.find('button[data-ariadescribedby="'+this.uiDialog.attr('aria-describedby')+'"]').addClass('lwd-taskbar-button-focus');
                }
            }

        }else{
            //console.log('-- window is hidden |');
        }
    },

    _close: function () {
        //console.log('_close');
        //console.log(this.uiDialog);
        var $objTaskbar = $('div#taskbar');

        if($objTaskbar.is(':visible')){
            $objTaskbar.find('button[data-ariadescribedby="'+this.uiDialog.attr('aria-describedby')+'"]').remove();
        }

        this._focusNextOpenWindow();
    },

    _maximize: function () {
        console.log('_maximize');
        console.log(this.options.height);

        if(this.options.maximizable === true){
            this.uiDialogTitlebar.find('button.lwd-window-titlebar-maximize>span.ui-icon-maximizethick').removeClass('ui-icon-maximizethick').addClass('ui-icon-restorethick');
            this.uiDialogTitlebar.find('button.lwd-window-titlebar-minimize>span.ui-icon-restorethick').removeClass('ui-icon-restorethick').addClass('ui-icon-minimizethick');

            var $objPosition = this.uiDialog.position();

            this.options.restoreHeight = this.options.height;
            this.options.restoreWidth = this.options.width;
            this.options.restorePositionX = (parseInt(this.options.positionX) != 0)? parseInt(this.options.positionX): Math.round(parseFloat($objPosition.left));
            this.options.restorePositionY = (parseInt(this.options.positionY) != 0)? parseInt(this.options.positionY): Math.round(parseFloat($objPosition.top));

            this._removeBorders();

            var intHeight = Math.round(parseFloat($(window).height()));
            var intWidth = Math.round(parseFloat($(window).width()));
            var intPositionX = 0;
            var intPositionY = 0;

            if(this.options.appendTo != '' && this.options.appendTo != 'body' && this.options.appendTo != 'window'){
                var $objAppendTo = $(this.options.appendTo);

                intHeight = Math.round(parseFloat($objAppendTo.height()));
                intWidth = Math.round(parseFloat($objAppendTo.width()));
                intPositionX = Math.round(parseFloat($objAppendTo.position().left));
                intPositionY = Math.round(parseFloat($objAppendTo.position().top));
            }else{
                this.uiDialog.addClass('topleft');
                intHeight += 1;
            }

            intHeight -= Math.round(parseFloat(this.uiDialog.css('padding-top')));
            intHeight -= Math.round(parseFloat(this.uiDialog.css('padding-bottom')));
            intWidth -= Math.round(parseFloat(this.uiDialog.css('padding-left')));
            intWidth -= Math.round(parseFloat(this.uiDialog.css('padding-right')));

            var $objTaskbar = $('div#taskbar');

            if($objTaskbar.is(':visible')){
                var intTaskbarHeight = Math.round(parseFloat($objTaskbar.height())) + Math.round(parseFloat($objTaskbar.css('border-top-width'))) + Math.round(parseFloat($objTaskbar.css('margin-top'))) + Math.round(parseFloat($objTaskbar.css('margin-bottom')));
                intHeight = intHeight-intTaskbarHeight;
            }

            this.uiDialog.width(intWidth);
            this.uiDialog.height(intHeight);
            this.uiDialog.css('left',intPositionX);
            this.uiDialog.css('top',intPositionY);

            this.uiDialog.draggable({disabled:true});
            this.uiDialog.resizable({disabled:true});

            this.options.width = intWidth;
            this.options.height = intHeight;
            this.options.positionX = intPositionX;
            this.options.positionY = intPositionY;
            this.options.resizable = false;
            this.options.draggable = false;
            this.options.maximized = true;
        }
    },

    _minimize: function () {
        //console.log('_minimize');
        //console.log(this.uiDialog);
        this.options.restoreHeightMinimized = this.uiDialog.height();

        if(!$('div#taskbar').is(':visible')){
            this.uiDialogTitlebar.find('button.lwd-window-titlebar-minimize>span.ui-icon-minimizethick').removeClass('ui-icon-minimizethick').addClass('ui-icon-restorethick');
            this.uiDialogTitlebar.find('button.lwd-window-titlebar-maximize>span.ui-icon-restorethick').removeClass('ui-icon-restorethick').addClass('ui-icon-maximizethick');

            this.uiDialog.height(this.uiDialogTitlebar.height() + parseInt(this.uiDialogTitlebar.css('padding-top')) + parseInt(this.uiDialogTitlebar.css('padding-bottom')));
        }else{
            this.uiDialog.hide();
        }

        this._focusNextOpenWindow();

        this.uiDialog.resizable({disabled:true});

        this.options.resizable = false;
        this.options.minimized = true;
    },

    _restore: function () {
        //console.log('_restore');
        //console.log(this.options);

        if(this.options.minimized === true){
            this.uiDialogTitlebar.find('button.lwd-window-titlebar-minimize>span.ui-icon-restorethick').removeClass('ui-icon-restorethick').addClass('ui-icon-minimizethick');

            this.uiDialog.height(this.options.restoreHeightMinimized);
            this.uiDialog.show();
        }else if(this.options.maximized === true){
            var intRestoreHeight = Math.round(parseFloat(this.options.restoreHeight));
            intRestoreHeight -= (intRestoreHeight+100 >= Math.round(parseFloat(this.uiDialog.height())))? 100: 0;

            var intRestoreWidth = Math.round(parseFloat(this.options.restoreWidth));
            intRestoreWidth -= (intRestoreWidth+100 >= Math.round(parseFloat(this.uiDialog.width())))? 100: 0;

            var intPositionX = Math.round(parseFloat((this.options.restorePositionX)));
            intPositionX = (intRestoreWidth+100 >= Math.round(parseFloat(this.uiDialog.width())))? 50: intPositionX;

            var intPositionY = Math.round(parseFloat((this.options.restorePositionY)));
            intPositionY = (intRestoreHeight+100 >= Math.round(parseFloat(this.uiDialog.height())))? 50: intPositionY;

            this.uiDialog.removeClass('topleft');

            this._restoreBorders();

            this.uiDialogTitlebar.find('button.lwd-window-titlebar-maximize>span.ui-icon-restorethick').removeClass('ui-icon-restorethick').addClass('ui-icon-maximizethick');


            this.uiDialog.css('left',intPositionX);
            this.uiDialog.css('top',intPositionY);
            this.uiDialog.width(intRestoreWidth);
            this.uiDialog.height(intRestoreHeight);

            this.options.maximized = false;
            this.options.height = intRestoreHeight;
            this.options.width = intRestoreWidth;
        }

        this.options.minimized = false;
        this.options.resizable = true;
        this.options.draggable = true;

        this.uiDialog.draggable({disabled:false});
        this.uiDialog.resizable({disabled:false});
    },

    _focusNextOpenWindow: function () {
        //console.log('_focusNextOpenWindow');
        //console.log(this.uiDialog);

        var $objUiDialog = $('.ui-dialog');
        var intMaxUsedZIndex = 1;

        $objUiDialog.each(function () {
            if($(this).is(':visible') === true){
                var intZIndex = parseInt($(this).css('z-index'));
                intMaxUsedZIndex = (intZIndex > intMaxUsedZIndex)? intZIndex: intMaxUsedZIndex;
            }
        });

        $objUiDialog.each(function () {
            if(parseInt($(this).css('z-index')) === intMaxUsedZIndex ){
                var strAriaDescribedBy = $(this).attr('aria-describedby');
                var objWindowToFocusOn = $('#'+strAriaDescribedBy).window('instance');
                objWindowToFocusOn._focus();
            }
        });
    },
    
    _removeBorders : function () {
        this.options.restoreBorderLeftWidth = Math.round(parseFloat(this.uiDialog.css('border-left-width')));
        this.options.restoreBorderRightWidth = Math.round(parseFloat(this.uiDialog.css('border-right-width')));
        this.options.restoreBorderTopWidth = Math.round(parseFloat(this.uiDialog.css('border-top-width')));
        this.options.restoreBorderBottomWidth = Math.round(parseFloat(this.uiDialog.css('border-bottom-width')));

        this.uiDialog.css('border-left-width',0);
        this.uiDialog.css('border-right-width',0);
        this.uiDialog.css('border-top-width',0);
        this.uiDialog.css('border-bottom-width',0);

    },

    _restoreBorders: function () {
        this.uiDialog.css('border-left-width',this.options.restoreBorderLeftWidth);
        this.uiDialog.css('border-right-width',this.options.restoreBorderRightWidth);
        this.uiDialog.css('border-top-width',this.options.restoreBorderTopWidth);
        this.uiDialog.css('border-bottom-width',this.options.restoreBorderBottomWidth);

        this.options.restoreBorderLeftWidth = 0;
        this.options.restoreBorderRightWidth = 0;
        this.options.restoreBorderTopWidth = 0;
        this.options.restoreBorderBottomWidth = 0;
    },

    _dragStop : function () {
        this.options.positionX = this.uiDialog.position().left;
        this.options.positionY = this.uiDialog.position().top;
    },

    _resizeStop : function () {
        this.options.width = this.uiDialog.width();
        this.options.height = this.uiDialog.height();

    },

    _resizeStart : function () {
        this._adjustWindow();
    },

    _dragStart: function () {
        this._adjustWindow();
    },

    _drag: function () {
        console.log('_drag');

        var intLeft = Math.round(parseFloat(this.uiDialog.position().left));
        var intTop = Math.round(parseFloat(this.uiDialog.position().top));
        var intRight = intLeft + Math.round(parseFloat(this.uiDialog.width()));
        var intBottom = intTop + Math.round(parseFloat(this.uiDialog.height()));

        var strRichtung = '';

        if(this.options.dragLeft != '' && this.options.dragLeft !== undefined){
            if(this.options.dragLeft < intLeft){
                //console.log('left+');
                strRichtung = 'rechts';
            }else if(this.options.dragLeft == intLeft){
                //console.log('left=');
                //strRichtung = 'rechts';
            }else{
                //console.log('left-');
                strRichtung = 'links';
            }
        }

        if(this.options.dragTop != '' && this.options.dragTop !== undefined) {
            if (this.options.dragTop < intTop) {
                //onsole.log('top+');
                strRichtung = 'unten';
            } else if (this.options.dragTop == intTop) {
                //console.log('top=');
            } else {
                //console.log('top-');
                strRichtung = 'oben';

            }
        }

        /*
        if(this.options.dragRight != '' && this.options.dragRight !== undefined) {
            if (this.options.dragRight < intRight) {
                console.log('right+');
            } else if (this.options.dragRight == intRight) {
                console.log('right=');
            } else {
                console.log('right-');
            }
        }

        if(this.options.dragBottom != '' && this.options.dragBottom !== undefined) {
            if (this.options.dragBottom < intBottom) {
                console.log('bottom+');
            } else if (this.options.dragBottom == intBottom) {
                console.log('bottom=');
            } else {
                console.log('bottom-');
            }
        }
        */

        console.log(strRichtung);
        console.log('-------------');

        /*console.log(intLeft);
        console.log(intTop);
        console.log(intRight);
        console.log(intBottom);*/

        this.options.dragLeft = intLeft;
        this.options.dragTop = intTop;
        this.options.dragRight = intRight;
        this.options.dragBottom = intBottom;


        //this._adjustWindow();
    },

    _adjustWindow : function () {
        console.log('_adjust');

        if(this.options.appendTo != '' && this.options.appendTo != 'body' && this.options.appendTo != 'window'){
            var intMaxResizeX = Math.round(parseFloat($(this.options.appendTo).width()));
            intMaxResizeX += Math.round(parseFloat($(this.options.appendTo).position().left));
            intMaxResizeX -= Math.round(parseFloat(this.uiDialog.position().left));
            intMaxResizeX -= Math.round(parseFloat(this.uiDialog.css('border-left-width')));
            intMaxResizeX -= Math.round(parseFloat(this.uiDialog.css('border-right-width')));

            var intMaxResizeY = Math.round(parseFloat($(this.options.appendTo).height()));
            intMaxResizeY += Math.round(parseFloat($(this.options.appendTo).position().top));
            intMaxResizeY -= Math.round(parseFloat(this.uiDialog.position().top));
            intMaxResizeY -= Math.round(parseFloat(this.uiDialog.css('border-top-width')));
            intMaxResizeY -= Math.round(parseFloat(this.uiDialog.css('border-bottom-width')));

            var intMaxWidth = Math.round(parseFloat(this.uiDialog.width()))+10;


            var intMaxHeight = Math.round(parseFloat(this.uiDialog.height()))+10;



            /*var intMaxWidthTmp = (intMaxWidth > intMaxResizeX)? intMaxWidth: intMaxResizeX;
            var intMaxHeightTmp = (intMaxHeight > intMaxResizeY)? intMaxHeight: intMaxResizeY;
            intMaxResizeX = (intMaxResizeX > intMaxWidth)? intMaxResizeX: intMaxWidth;
            intMaxResizeY = (intMaxResizeY > intMaxHeight)? intMaxResizeY: intMaxHeight;
            intMaxWidth = intMaxWidthTmp;
            intMaxHeight = intMaxHeightTmp;*/

            console.log('maxW: '+Math.round(parseFloat(this.uiDialog.position().left)));
            console.log('maxH: '+Math.round(parseFloat(this.uiDialog.position().top)));
            console.log('maxW2: '+intMaxResizeX);
            console.log('maxH2: '+intMaxResizeY);

            //this.options.maxWidth = intMaxWidth;
            //this.options.maxHeight = intMaxHeight;


            this.uiDialog.draggable({
                snap: true,
                containment: $(this.options.appendTo)
            }).resizable({
                maxWidth: intMaxResizeX,
                maxHeight: intMaxResizeY
            });
        }




        /*
        this.uiDialog.draggable({
            snap: true,
            containment: this.options.appendTo
        }).resizable({
            maxWidth: intMaxWidth,
            maxHeight: intMaxHeight
        });*/
    }
    /* END - Methods */
});
/* END - Window-Widget */

/* START - Taskbar-Widget */
$.widget('custom.taskbar', {
    _create: function(){
        var $objTaskbar = $('#taskbar');

        if(this.options.startbutton != '' && this.options.startbutton != undefined){
            var $objStartButton = $('<button id="#startmenu">'+this.options.startbutton+'</button><div id="startbutton-spacer">&nbsp;</div>');
            $objTaskbar.append($objStartButton);
        }

        var $objTaskbarButtonContainer = $('<div id="lwd-taskbar-button-container"></div>')

        if(this.options.clock === true){
            $objClock = $('<div id="lwd-taskbar-clock"><span id="lwd-taskbar-clock-time">00:00</span></div>');
            $objTaskbar.append($objClock);

            var objDate = new Date();
            $('#lwd-taskbar-clock-time').html(objDate.getHours()+':'+objDate.getMinutes());
        }

        $objTaskbar.append($objTaskbarButtonContainer);


    }
});
/* END - Taskbar-Widget */


$(document).ready(function () {
    $('div#taskbar').each(function () {
        if($(this).attr('data-clock') == 'true'){
            setInterval(function () {
                var objDate = new Date();
                $('#lwd-taskbar-clock-time').html(objDate.getHours()+':'+objDate.getMinutes());
            },60000);
        }

        var options = {
            clock: ($(this).attr('data-clock') != "false"),
            startbutton: $(this).attr('data-startbutton')
        };

        $(this).taskbar(options);

    });

    $('div.window').each(function () {
        var options = {
            appendTo: $(this).attr('data-appendTo'),
            autoOpen: ($(this).attr('data-autoOpen') != "false"),
            closable: ($(this).attr('data-closable') != "false"),
            closeOnEscape: ($(this).attr('data-closeOnEscape') != "false"),
            closeText: $(this).attr('data-closeText'),
            dialogClass: $(this).attr('data-dialogClass'),
            draggable: ($(this).attr('data-draggable') != "false"),
            height: parseInt($(this).attr('data-height')),
            hide: ($(this).attr('data-hide') == "true"),
            maxHeight: $(this).attr('data-maxHeight'),
            maximizable: ($(this).attr('data-maximizable') == "true"),
            maximized: ($(this).attr('data-maximized') == "true"),
            maxWidth: $(this).attr('data-maxWidth'),
            minHeight: $(this).attr('data-minHeight'),
            minimizable: ($(this).attr('data-minimizable') == "true"),
            minimized: ($(this).attr('data-minimized') == "true"),
            minWidth: $(this).attr('data-minWidth'),
            modal: ($(this).attr('data-modal') == "true"),
            positionX : parseInt($(this).attr('data-positionX')),
            positionY : parseInt($(this).attr('data-positionY')),
            resizable: ($(this).attr('data-resizable') != "false"),
            show: ($(this).attr('data-show') != "false"),
            width: parseInt($(this).attr('data-width')),
            title: $(this).attr('data-title')
        };

        $(this).window(options);
    });

    $('.lwd-taskbar-button').on('click', function () {
        var strAriaDescribedBy = $(this).attr('data-ariadescribedby');
        var $objWindow = $('#'+strAriaDescribedBy).window('instance');

        if($objWindow.options.minimized){
            $objWindow._restore();
        }

        $objWindow._focus();
    });


});
