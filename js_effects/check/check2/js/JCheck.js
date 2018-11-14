
;(function ($) {
    'use strict';
    /**
     * 单选按钮 以data-name来标识分组
     *
     *
     * @param settings 用户设置参数
     */
    $.fn.jRadio = function (settings) {
        /* 默认参数 */
        var _defaults = {
            checkedClass: "z-checked", // 选中状态类名
            onChange: function (element) {} // onchange回调，返回当前选中项DOM元素
        };

        var options = $.extend(_defaults, settings || {});
        var radios = this;

        radios.each(function () {
            var $radio = $(this);
            var _name = $(this).data("name");   // 组name值
            /*---- 初始化 ----*/
            // 是否选中以input:radio的选中状态为准,多个选中的话以最后一个为准
            if($radio.find('input[type="radio"]').is(':checked')) {
                var $otherRadios = radios.filter("[data-name='" + _name + "']").not($radio);

                $radio.addClass(options.checkedClass);
                $otherRadios.removeClass(options.checkedClass);
                $otherRadios.find('input[type="radio"]').prop('checked', false);
            }

            /*---- 添加事件 ----*/
            $radio.on("change", function () {
                if (!$(this).hasClass(options.checkedClass)) {
                    $(this).addClass(options.checkedClass);
                    radios.filter("[data-name='" + _name + "']").not($(this)).removeClass(options.checkedClass); // 切换状态

                    options.onChange($(this));  // 回调
                }
            });
        });
    };

    /**
     * 复选框
     *
     * @param settings 用户设置参数
     */
    $.fn.jCheckbox = function (settings) {
        /* 默认参数 */
        var _defaults = {
            checkedClass: "z-checked", // 选中状态类名
            onChange: function (element) {} // onchange回调，返回当前选中项DOM元素组
        };

        var options = $.extend(_defaults, settings || {});
        var checkboxes = this;

        checkboxes.each(function () {
            var $checkbox = $(this);

            /*---- 初始化 ----*/
            // 是否选中以input:checkbox的选中状态为准
            if($checkbox.find('input[type="checkbox"]').is(':checked')) {
                $checkbox.addClass(options.checkedClass);
            } else {
                $checkbox.removeClass(options.checkedClass);
            }

            /*---- 添加事件 ----*/
            $checkbox.on("change", function () {
                $(this).toggleClass(options.checkedClass);
                options.onChange($(this));
            });
        });
    };
})(jQuery);
