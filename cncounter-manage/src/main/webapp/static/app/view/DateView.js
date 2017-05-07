
/**
 * A date picker. This class is used by the Ext.form.field.SelectDate field to allow browsing and selection of valid
 * dates in a popup next to the field, but may also be used with other components.
 *
 * Typically you will need to implement a handler function to be notified when the user chooses a date from the picker;
 * you can register the handler using the {@link #select} event, or by implementing the {@link #handler} method.
 *
 * By default the user will be allowed to pick any date; this can be changed by using the {@link #minDate},
 * {@link #maxDate}, {@link #disabledDays}, {@link #disabledDatesRE}, and/or {@link #disabledDates} configs.
 *
 * All the string values documented below may be overridden by including an Ext locale file in your page.
 *
 *     @example
 *     Ext.create('Ext.panel.Panel', {
 *         title: 'Choose a future date:',
 *         width: 200,
 *         bodyPadding: 10,
 *         renderTo: Ext.getBody(),
 *         items: [{
 *             xtype: 'dateselectview',
 *             minDate: new Date(),
 *             handler: function(picker, date) {
 *                 // do something with the selected date
 *             }
 *         }]
 *     });
 */
Ext.define('Ext.picker.DateSelectView', {
    extend:  Ext.Component ,

    alias: 'widget.dateselectview',
    alternateClassName: 'Ext.DateSelectView',

    childEls: [
        'innerEl', 'eventEl', 'prevEl', 'nextEl', 'middleBtnEl', 'footerEl'
    ],

    border: true,

    renderTpl: [
        '<div id="{id}-innerEl" role="grid">',
        '<div role="presentation" class="{baseCls}-header">',
        // the href attribute is required for the :hover selector to work in IE6/7/quirks
        '<a id="{id}-prevEl" class="{baseCls}-prev {baseCls}-arrow" href="#" role="button" title="{prevText}" hidefocus="on" ></a>',
        '<div class="{baseCls}-month" id="{id}-middleBtnEl">{%this.renderMonthBtn(values, out)%}</div>',
        // the href attribute is required for the :hover selector to work in IE6/7/quirks
        '<a id="{id}-nextEl" class="{baseCls}-next {baseCls}-arrow" href="#" role="button" title="{nextText}" hidefocus="on" ></a>',
        '</div>',
        '<table id="{id}-eventEl" class="{baseCls}-inner" cellspacing="0" role="grid">',
        '<thead role="presentation"><tr role="row">',
        '<tpl for="dayNames">',
        '<th role="columnheader" class="{parent.baseCls}-column-header" title="{.}">',
        '<div class="{parent.baseCls}-column-header-inner">{.:this.firstInitial}</div>',
        '</th>',
        '</tpl>',
        '</tr></thead>',
        '<tbody role="presentation"><tr role="row">',
        '<tpl for="days">',
        '{#:this.isEndOfWeek}',
        '<td role="gridcell" id="{[Ext.id()]}">',
        // the href attribute is required for the :hover selector to work in IE6/7/quirks
        '<a role="presentation" hidefocus="on" class="{parent.baseCls}-date" href="#"></a>',
        '</td>',
        '</tpl>',
        '</tr></tbody>',
        '</table>',
        '<tpl if="showToday">',
        '<div id="{id}-footerEl" role="presentation" class="{baseCls}-footer">',
        '{%this.renderTodayBtn(values, out)%}',
        '{%this.renderClearBtn(values, out)%}',
        '{%this.renderOKBtn(values, out)%}',
        '</div>',
        '</tpl>',
        '</div>',
        {
            firstInitial: function(value) {
                return Ext.picker.DateSelectView.prototype.getDayInitial(value);
            },
            isEndOfWeek: function(value) {
                // convert from 1 based index to 0 based
                // by decrementing value once.
                value--;
                var end = value % 7 === 0 && value !== 0;
                return end ? '</tr><tr role="row">' : '';
            },
            renderTodayBtn: function(values, out) {
                Ext.DomHelper.generateMarkup(values.$comp.todayBtn.getRenderTree(), out);
            },
            renderClearBtn: function(values, out) {
                Ext.DomHelper.generateMarkup(values.$comp.clearBtn.getRenderTree(), out);
            },
            renderOKBtn: function(values, out) {
                Ext.DomHelper.generateMarkup(values.$comp.OKBtn.getRenderTree(), out);
            },
            renderMonthBtn: function(values, out) {
                Ext.DomHelper.generateMarkup(values.$comp.monthBtn.getRenderTree(), out);
            }
        }
    ],

    //<locale>
    /**
     * @cfg {String} todayText
     * The text to display on the button that selects the current date
     */
    todayText : 'Today',
    //</locale>

    //<locale>
    /**
     * @cfg {String} clearText
     * The text to display on the button that clear date
     */
    clearText : 'Clear',
    //</locale>

    //<locale>
    /**
     * @cfg {String} OKText
     * The text to display on the button that OK
     */
    OKText : 'OK',
    //</locale>

    //<locale>
    /**
     * @cfg {String} ariaTitle
     * The text to display for the aria title
     */
    ariaTitle: 'Date Picker: {0}',
    //</locale>

    //<locale>
    /**
     * @cfg {String} ariaTitleDateFormat
     * The date format to display for the current value in the {@link #ariaTitle}
     */
    ariaTitleDateFormat: 'F d, Y',
    //</locale>

    /**
     * @cfg {Function} handler
     * Optional. A function that will handle the select event of this picker. The handler is passed the following
     * parameters:
     *
     *   - `picker` : Ext.picker.DateSelectView
     *
     * This Date picker.
     *
     *   - `date` : Date
     *
     * The selected date.
     */

    /**
     * @cfg {Object} scope
     * The scope (`this` reference) in which the `{@link #handler}` function will be called.
     *
     * Defaults to this DateSelectView instance.
     */

    //<locale>
    /**
     * @cfg {String} todayTip
     * A string used to format the message for displaying in a tooltip over the button that selects the current date.
     * The `{0}` token in string is replaced by today's date.
     */
    todayTip : '{0} (Spacebar)',
    //</locale>

    //<locale>
    /**
     * @cfg {String} clearTip
     * A string used to format the message for displaying in a tooltip over the button that selects the current date.
     * The `{0}` token in string is replaced by today's date.
     */
    clearTip : 'Clear Value',
    //</locale>

    //<locale>
    /**
     * @cfg {String} OKTip
     * A string used to format the message for displaying in a tooltip over the button that selects the current date.
     * The `{0}` token in string is replaced by today's date.
     */
    OKTip : 'OK Value',
    //</locale>

    //<locale>
    /**
     * @cfg {String} minText
     * The error text to display if the minDate validation fails.
     */
    minText : 'This date is before the minimum date',
    //</locale>

    //<locale>
    /**
     * @cfg {String} maxText
     * The error text to display if the maxDate validation fails.
     */
    maxText : 'This date is after the maximum date',
    //</locale>

    /**
     * @cfg {String} format
     * The default date format string which can be overriden for localization support. The format must be valid
     * according to {@link Ext.Date#parse} (defaults to {@link Ext.Date#defaultFormat}).
     */

    //<locale>
    /**
     * @cfg {String} disabledDaysText
     * The tooltip to display when the date falls on a disabled day.
     */
    disabledDaysText : 'Disabled',
    //</locale>

    //<locale>
    /**
     * @cfg {String} disabledDatesText
     * The tooltip text to display when the date falls on a disabled date.
     */
    disabledDatesText : 'Disabled',
    //</locale>

    /**
     * @cfg {String[]} monthNames
     * An array of textual month names which can be overriden for localization support (defaults to Ext.Date.monthNames)
     * @deprecated This config is deprecated. In future the month names will be retrieved from {@link Ext.Date}
     */

    /**
     * @cfg {String[]} dayNames
     * An array of textual day names which can be overriden for localization support (defaults to Ext.Date.dayNames)
     * @deprecated This config is deprecated. In future the day names will be retrieved from {@link Ext.Date}
     */

    //<locale>
    /**
     * @cfg {String} nextText
     * The next month navigation button tooltip
     */
    nextText : 'Next Month (Control+Right)',
    //</locale>

    //<locale>
    /**
     * @cfg {String} prevText
     * The previous month navigation button tooltip
     */
    prevText : 'Previous Month (Control+Left)',
    //</locale>

    //<locale>
    /**
     * @cfg {String} monthYearText
     * The header month selector tooltip
     */
    monthYearText : 'Choose a month (Control+Up/Down to move years)',
    //</locale>

    //<locale>
    /**
     * @cfg {String} monthYearFormat
     * The date format for the header month
     */
    monthYearFormat: 'F Y',
    //</locale>

    //<locale>
    /**
     * @cfg {Number} [startDay=undefined]
     * Day index at which the week should begin, 0-based.
     *
     * Defaults to `0` (Sunday).
     */
    startDay : 0,
    //</locale>

    //<locale>
    /**
     * @cfg {Boolean} showToday
     * False to hide the footer area containing the Today button and disable the keyboard handler for spacebar that
     * selects the current date.
     */
    showToday : true,
    //</locale>

    /**
     * @cfg {Date} [minDate=null]
     * Minimum allowable date (JavaScript date object)
     */

    /**
     * @cfg {Date} [maxDate=null]
     * Maximum allowable date (JavaScript date object)
     */

    /**
     * @cfg {Number[]} [disabledDays=null]
     * An array of days to disable, 0-based. For example, [0, 6] disables Sunday and Saturday.
     */

    /**
     * @cfg {RegExp} [disabledDatesRE=null]
     * JavaScript regular expression used to disable a pattern of dates. The {@link #disabledDates}
     * config will generate this regex internally, but if you specify disabledDatesRE it will take precedence over the
     * disabledDates value.
     */

    /**
     * @cfg {String[]} disabledDates
     * An array of 'dates' to disable, as strings. These strings will be used to build a dynamic regular expression so
     * they are very powerful. Some examples:
     *
     *   - ['03/08/2003', '09/16/2003'] would disable those exact dates
     *   - ['03/08', '09/16'] would disable those days for every year
     *   - ['^03/08'] would only match the beginning (useful if you are using short years)
     *   - ['03/../2006'] would disable every day in March 2006
     *   - ['^03'] would disable every day in every March
     *
     * Note that the format of the dates included in the array should exactly match the {@link #format} config. In order
     * to support regular expressions, if you are using a date format that has '.' in it, you will have to escape the
     * dot when restricting dates. For example: ['03\\.08\\.03'].
     */

    /**
     * @cfg {Boolean} disableAnim
     * True to disable animations when showing the month picker.
     */
    disableAnim: false,

    /**
     * @cfg {String} [baseCls='x-datepicker']
     * The base CSS class to apply to this components element.
     */
    baseCls: Ext.baseCSSPrefix + 'datepicker',

    /**
     * @cfg {String} [selectedCls='x-datepicker-selected']
     * The class to apply to the selected cell.
     */

    /**
     * @cfg {String} [disabledCellCls='x-datepicker-disabled']
     * The class to apply to disabled cells.
     */

    //<locale>
    /**
     * @cfg {String} longDayFormat
     * The format for displaying a date in a longer format.
     */
    longDayFormat: 'F d, Y',
    //</locale>

    /**
     * @cfg {Object} keyNavConfig
     * Specifies optional custom key event handlers for the {@link Ext.util.KeyNav} attached to this date picker. Must
     * conform to the config format recognized by the {@link Ext.util.KeyNav} constructor. Handlers specified in this
     * object will replace default handlers of the same name.
     */

    /**
     * @cfg {Boolean} focusOnShow
     * True to automatically focus the picker on show.
     */
    focusOnShow: false,

    // @private
    // Set by other components to stop the picker focus being updated when the value changes.
    focusOnSelect: true,

    // Default value used to initialise each date in the DateSelectView.
    // __Note:__ 12 noon was chosen because it steers well clear of all DST timezone changes.
    initHour: 12, // 24-hour format

    numDays: 42,

    // private, inherit docs
    initComponent : function() {
        var me = this,
            clearTime = Ext.Date.clearTime;

        me.selectedCls = me.baseCls + '-selected';
        me.disabledCellCls = me.baseCls + '-disabled';
        me.prevCls = me.baseCls + '-prevday';
        me.activeCls = me.baseCls + '-active';
        me.cellCls = me.baseCls + '-cell';
        me.nextCls = me.baseCls + '-prevday';
        me.todayCls = me.baseCls + '-today';


        if (!me.format) {
            me.format = Ext.Date.defaultFormat;
        }
        if (!me.dayNames) {
            me.dayNames = Ext.Date.dayNames;
        }
        me.dayNames = me.dayNames.slice(me.startDay).concat(me.dayNames.slice(0, me.startDay));

        me.callParent();

        me.value = me.value ?
            clearTime(me.value, true) : clearTime(new Date());

        me.addEvents(
            /**
             * @event select
             * Fires when a date is selected
             * @param {Ext.picker.DateSelectView} this DateSelectView
             * @param {Date} date The selected date
             */
            'select'
        );

        me.initDisabledDays();
    },

    beforeRender: function () {
        /*
         * days array for looping through 6 full weeks (6 weeks * 7 days)
         * Note that we explicitly force the size here so the template creates
         * all the appropriate cells.
         */
        var me = this,
            days = new Array(me.numDays),
            today = Ext.Date.format(new Date(), me.format);

        // If there's a Menu among our ancestors, then add the menu class.
        // This is so that the MenuManager does not see a mousedown in this Component as a document mousedown, outside the Menu
        if (me.up('menu')) {
            me.addCls(Ext.baseCSSPrefix + 'menu');
        }

        me.monthBtn = new Ext.button.Split({
            ownerCt: me,
            ownerLayout: me.getComponentLayout(),
            text: '',
            tooltip: me.monthYearText,
            listeners: {
                click: me.showMonthPicker,
                arrowclick: me.showMonthPicker,
                scope: me
            }
        });

        if (me.showToday) {
            me.todayBtn = new Ext.button.Button({
                ownerCt: me,
                ownerLayout: me.getComponentLayout(),
                text: Ext.String.format(me.todayText, today),
                tooltip: Ext.String.format(me.todayTip, today),
                tooltipType: 'title',
                handler: me.selectToday,
                scope: me
            });
            me.clearBtn = new Ext.button.Button({ // renfufei tag
                ownerCt: me,
                ownerLayout: me.getComponentLayout(),
                style :{
                	marginLeft : '10px'
                },
                text: me.clearText,
                tooltip: me.clearTip,
                tooltipType: 'title',
                handler: me.clearDate,
                scope: me
            });
            me.OKBtn = new Ext.button.Button({ // renfufei tag
                ownerCt: me,
                ownerLayout: me.getComponentLayout(),
                style :{
                    marginLeft : '10px'
                },
                text: me.OKText,
                tooltip: me.OKTip,
                tooltipType: 'title',
                handler: me.OKDate,
                scope: me
            });
        }

        me.callParent();

        Ext.applyIf(me, {
            renderData: {}
        });

        Ext.apply(me.renderData, {
            dayNames: me.dayNames,
            showToday: me.showToday,
            prevText: me.prevText,
            nextText: me.nextText,
            days: days
        });

        me.protoEl.unselectable();
    },

    // Do the job of a container layout at this point even though we are not a Container.
    // TODO: Refactor as a Container.
    finishRenderChildren: function () {
        var me = this;

        me.callParent();
        me.monthBtn.finishRender();
        if (me.showToday) {
            me.todayBtn.finishRender();
            me.clearBtn.finishRender();
            me.OKBtn.finishRender();
        }
    },

    // @private
    // @inheritdoc
    onRender : function(container, position){
        var me = this;

        me.callParent(arguments);

        me.cells = me.eventEl.select('tbody td');
        me.textNodes = me.eventEl.query('tbody td a');

        me.mon(me.eventEl, {
            scope: me,
            mousewheel: me.handleMouseWheel,
            click: {
                fn: me.handleDateClick,
                delegate: 'a.' + me.baseCls + '-date'
            }
        });

    },

    // @private
    // @inheritdoc
    initEvents: function(){
        var me = this,
            eDate = Ext.Date,
            day = eDate.DAY;

        me.callParent();

        me.prevRepeater = new Ext.util.ClickRepeater(me.prevEl, {
            handler: me.showPrevMonth,
            scope: me,
            preventDefault: true,
            stopDefault: true
        });

        me.nextRepeater = new Ext.util.ClickRepeater(me.nextEl, {
            handler: me.showNextMonth,
            scope: me,
            preventDefault:true,
            stopDefault:true
        });

        me.keyNav = new Ext.util.KeyNav(me.eventEl, Ext.apply({
            scope: me,
            left : function(e){
                if(e.ctrlKey){
                    me.showPrevMonth();
                }else{
                    me.update(eDate.add(me.activeDate, day, -1));
                }
            },

            right : function(e){
                if(e.ctrlKey){
                    me.showNextMonth();
                }else{
                    me.update(eDate.add(me.activeDate, day, 1));
                }
            },

            up : function(e){
                if(e.ctrlKey){
                    me.showNextYear();
                }else{
                    me.update(eDate.add(me.activeDate, day, -7));
                }
            },

            down : function(e){
                if(e.ctrlKey){
                    me.showPrevYear();
                }else{
                    me.update(eDate.add(me.activeDate, day, 7));
                }
            },

            pageUp:function (e) {
                if (e.altKey) {
                    me.showPrevYear();
                } else {
                    me.showPrevMonth();
                }
            },

            pageDown:function (e) {
                if (e.altKey) {
                    me.showNextYear();
                } else {
                    me.showNextMonth();
                }
            },

            tab:function (e) {
                me.doCancelFieldFocus = true;
                me.handleTabClick(e);
                delete me.doCancelFieldFocus;
                return true;
            },

            enter : function(e){
                e.stopPropagation();
                return true;
            },

            //space: ???

            home:function (e) {
                me.update(eDate.getFirstDateOfMonth(me.activeDate));
            },

            end:function (e) {
                me.update(eDate.getLastDateOfMonth(me.activeDate));
            }
        }, me.keyNavConfig));

        if (me.showToday) {
            me.todayKeyListener = me.eventEl.addKeyListener(Ext.EventObject.SPACE, me.selectToday,  me);
        }
        me.update(me.value);
    },

    handleTabClick:function (e) {
        var me = this,
            t = me.getSelectedDate(me.activeDate),
            handler = me.handler;

        // The following code is like handleDateClick without the e.stopEvent()
        if (!me.disabled && t.dateValue && !Ext.fly(t.parentNode).hasCls(me.disabledCellCls)) {
            me.doCancelFocus = me.focusOnSelect === false;
            me.setValue(new Date(t.dateValue));
            delete me.doCancelFocus;
            me.fireEvent('select', me, me.value);
            if (handler) {
                handler.call(me.scope || me, me, me.value);
            }
            me.onSelect();
        }
    },

    getSelectedDate:function (date) {
        var me = this,
            t = date.getTime(),
            cells = me.cells,
            cls = me.selectedCls,
            cellItems = cells.elements,
            c,
            cLen = cellItems.length,
            cell;

        cells.removeCls(cls);

        for (c = 0; c < cLen; c++) {
            cell = Ext.fly(cellItems[c]);

            if (cell.dom.firstChild.dateValue == t) {
                return cell.dom.firstChild;
            }
        }
        return null;
    },

    /**
     * Setup the disabled dates regex based on config options
     * @private
     */
    initDisabledDays : function(){
        var me = this,
            dd = me.disabledDates,
            re = '(?:',
            len,
            d, dLen, dI;

        if(!me.disabledDatesRE && dd){
            len = dd.length - 1;

            dLen = dd.length;

            for (d = 0; d < dLen; d++) {
                dI = dd[d];

                re += Ext.isDate(dI) ? '^' + Ext.String.escapeRegex(Ext.Date.dateFormat(dI, me.format)) + '$' : dI;
                if (d != len) {
                    re += '|';
                }
            }

            me.disabledDatesRE = new RegExp(re + ')');
        }
    },

    /**
     * Replaces any existing disabled dates with new values and refreshes the DateSelectView.
     * @param {String[]/RegExp} disabledDates An array of date strings (see the {@link #disabledDates} config for
     * details on supported values), or a JavaScript regular expression used to disable a pattern of dates.
     * @return {Ext.picker.DateSelectView} this
     */
    setDisabledDates : function(dd){
        var me = this;

        if(Ext.isArray(dd)){
            me.disabledDates = dd;
            me.disabledDatesRE = null;
        }else{
            me.disabledDatesRE = dd;
        }
        me.initDisabledDays();
        me.update(me.value, true);
        return me;
    },

    /**
     * Replaces any existing disabled days (by index, 0-6) with new values and refreshes the DateSelectView.
     * @param {Number[]} disabledDays An array of disabled day indexes. See the {@link #disabledDays} config for details
     * on supported values.
     * @return {Ext.picker.DateSelectView} this
     */
    setDisabledDays : function(dd){
        this.disabledDays = dd;
        return this.update(this.value, true);
    },

    /**
     * Replaces any existing {@link #minDate} with the new value and refreshes the DateSelectView.
     * @param {Date} value The minimum date that can be selected
     * @return {Ext.picker.DateSelectView} this
     */
    setMinDate : function(dt){
        this.minDate = dt;
        return this.update(this.value, true);
    },

    /**
     * Replaces any existing {@link #maxDate} with the new value and refreshes the DateSelectView.
     * @param {Date} value The maximum date that can be selected
     * @return {Ext.picker.DateSelectView} this
     */
    setMaxDate : function(dt){
        this.maxDate = dt;
        return this.update(this.value, true);
    },

    /**
     * Sets the value of the date field
     * @param {Date} value The date to set
     * @return {Ext.picker.DateSelectView} this
     */
    setValue : function(value){
        this.value = Ext.Date.clearTime(value, true);
        return this.update(this.value);
    },

    /**
     * Gets the current selected value of the date field
     * @return {Date} The selected date
     */
    getValue : function(){
        return this.value;
    },

    //<locale type="function">
    /**
     * Gets a single character to represent the day of the week
     * @return {String} The character
     */
    getDayInitial: function(value){
        return value.substr(0,1);
    },
    //</locale>

    // @private
    focus : function(){
        this.update(this.activeDate);
    },

    // @private
    // @inheritdoc
    onEnable: function(){
        this.callParent();
        this.setDisabledStatus(false);
        this.update(this.activeDate);

    },

    // @private
    // @inheritdoc
    onDisable : function(){
        this.callParent();
        this.setDisabledStatus(true);
    },

    /**
     * Set the disabled state of various internal components
     * @private
     * @param {Boolean} disabled
     */
    setDisabledStatus : function(disabled){
        var me = this;

        me.keyNav.setDisabled(disabled);
        me.prevRepeater.setDisabled(disabled);
        me.nextRepeater.setDisabled(disabled);
        if (me.showToday) {
            me.todayKeyListener.setDisabled(disabled);
            me.todayBtn.setDisabled(disabled);
            me.clearBtn.setDisabled(disabled);
            me.OKBtn.setDisabled(disabled);
        }
    },

    /**
     * Get the current active date.
     * @private
     * @return {Date} The active date
     */
    getActive: function(){
        return this.activeDate || this.value;
    },

    /**
     * Run any animation required to hide/show the month picker.
     * @private
     * @param {Boolean} isHide True if it's a hide operation
     */
    runAnimation: function(isHide){
        var picker = this.monthPicker,
            options = {
                duration: 200,
                callback: function(){
                    if (isHide) {
                        picker.hide();
                    } else {
                        picker.show();
                    }
                }
            };

        if (isHide) {
            picker.el.slideOut('t', options);
        } else {
            picker.el.slideIn('t', options);
        }
    },

    /**
     * Hides the month picker, if it's visible.
     * @param {Boolean} [animate] Indicates whether to animate this action. If the animate
     * parameter is not specified, the behavior will use {@link #disableAnim} to determine
     * whether to animate or not.
     * @return {Ext.picker.DateSelectView} this
     */
    hideMonthPicker : function(animate){
        var me = this,
            picker = me.monthPicker;

        if (picker) {
            if (me.shouldAnimate(animate)) {
                me.runAnimation(true);
            } else {
                picker.hide();
            }
        }
        return me;
    },

    /**
     * Show the month picker
     * @param {Boolean} [animate] Indicates whether to animate this action. If the animate
     * parameter is not specified, the behavior will use {@link #disableAnim} to determine
     * whether to animate or not.
     * @return {Ext.picker.DateSelectView} this
     */
    showMonthPicker : function(animate){
        var me = this,
            picker;

        if (me.rendered && !me.disabled) {
            picker = me.createMonthPicker();
            picker.setValue(me.getActive());
            picker.setSize(me.getSize());
            picker.setPosition(-1, -1);
            if (me.shouldAnimate(animate)) {
                me.runAnimation(false);
            } else {
                picker.show();
            }
        }
        return me;
    },

    /**
     * Checks whether a hide/show action should animate
     * @private
     * @param {Boolean} [animate] A possible animation value
     * @return {Boolean} Whether to animate the action
     */
    shouldAnimate: function(animate){
        return Ext.isDefined(animate) ? animate : !this.disableAnim;
    },

    /**
     * Create the month picker instance
     * @private
     * @return {Ext.picker.Month} picker
     */
    createMonthPicker: function(){
        var me = this,
            picker = me.monthPicker;

        if (!picker) {
            me.monthPicker = picker = new Ext.picker.Month({
                renderTo: me.el,
                floating: true,
                shadow: false,
                small: me.showToday === false,
                listeners: {
                    scope: me,
                    cancelclick: me.onCancelClick,
                    okclick: me.onOkClick,
                    yeardblclick: me.onOkClick,
                    monthdblclick: me.onOkClick
                }
            });
            if (!me.disableAnim) {
                // hide the element if we're animating to prevent an initial flicker
                picker.el.setStyle('display', 'none');
            }
            me.on('beforehide', Ext.Function.bind(me.hideMonthPicker, me, [false]));
        }
        return picker;
    },

    /**
     * Respond to an ok click on the month picker
     * @private
     */
    onOkClick: function(picker, value){
        var me = this,
            month = value[0],
            year = value[1],
            date = new Date(year, month, me.getActive().getDate());

        if (date.getMonth() !== month) {
            // 'fix' the JS rolling date conversion if needed
            date = Ext.Date.getLastDateOfMonth(new Date(year, month, 1));
        }
        me.setValue(date);
        me.hideMonthPicker();
    },

    /**
     * Respond to a cancel click on the month picker
     * @private
     */
    onCancelClick: function(){
        // update the selected value, also triggers a focus
        this.selectedUpdate(this.activeDate);
        this.hideMonthPicker();
    },

    /**
     * Show the previous month.
     * @param {Object} e
     * @return {Ext.picker.DateSelectView} this
     */
    showPrevMonth : function(e){
        return this.setValue(Ext.Date.add(this.activeDate, Ext.Date.MONTH, -1));
    },

    /**
     * Show the next month.
     * @param {Object} e
     * @return {Ext.picker.DateSelectView} this
     */
    showNextMonth : function(e){
        return this.setValue(Ext.Date.add(this.activeDate, Ext.Date.MONTH, 1));
    },

    /**
     * Show the previous year.
     * @return {Ext.picker.DateSelectView} this
     */
    showPrevYear : function(){
        return this.setValue(Ext.Date.add(this.activeDate, Ext.Date.YEAR, -1));
    },

    /**
     * Show the next year.
     * @return {Ext.picker.DateSelectView} this
     */
    showNextYear : function(){
        return this.setValue(Ext.Date.add(this.activeDate, Ext.Date.YEAR, 1));
    },

    /**
     * Respond to the mouse wheel event
     * @private
     * @param {Ext.EventObject} e
     */
    handleMouseWheel : function(e){
        e.stopEvent();
        if(!this.disabled){
            var delta = e.getWheelDelta();
            if(delta > 0){
                this.showPrevMonth();
            } else if(delta < 0){
                this.showNextMonth();
            }
        }
    },

    /**
     * Respond to a date being clicked in the picker
     * @private
     * @param {Ext.EventObject} e
     * @param {HTMLElement} t
     */
    handleDateClick : function(e, t){
        var me = this,
            handler = me.handler;

        e.stopEvent();
        if(!me.disabled && t.dateValue && !Ext.fly(t.parentNode).hasCls(me.disabledCellCls)){
            me.doCancelFocus = me.focusOnSelect === false;
            me.setValue(new Date(t.dateValue));
            delete me.doCancelFocus;
            me.fireEvent('select', me, me.value);
            if (handler) {
                handler.call(me.scope || me, me, me.value);
            }
            // event handling is turned off on hide
            // when we are using the picker in a field
            // therefore onSelect comes AFTER the select
            // event.
            me.onSelect();
        }
    },

    /**
     * Perform any post-select actions
     * @private
     */
    onSelect: function() {
        if (this.hideOnSelect) {
            this.hide();
        }
    },

    /**
     * Perform any post-clear actions
     * @private
     */
    onClear: function() {
        if (this.hideOnSelect) {
            this.hide();
        }
    },

    /**
     * Perform any post-OK actions
     * @private
     */
    onOK: function() {
        if (this.hideOnSelect) {
            this.hide();
        }
    },

    /**
     * Sets the current value to today.
     * @return {Ext.picker.DateSelectView} this
     */
    selectToday : function(){
        var me = this,
            btn = me.todayBtn,
            handler = me.handler;

        if(btn && !btn.disabled){
            me.setValue(Ext.Date.clearTime(new Date()));
            me.fireEvent('select', me, me.value);
            if (handler) {
                handler.call(me.scope || me, me, me.value);
            }
            me.onSelect();
        }
        return me;
    },

    /**
     * Sets the current value to null.
     * @return {Ext.picker.DateSelectView} this
     */
    clearDate : function(){
        var me = this,
            btn = me.clearBtn,
            handler = me.handler;

        if(btn && !btn.disabled){
            //me.setValue(Ext.Date.clearTime(new Date()));
            //me.fireEvent('select', me, me.value);
            me.fireEvent('clear', me, me.value);
            if (handler) {
                handler.call(me.scope || me, me, me.value);
            }
            me.onClear();
        }
        return me;
    },
    /**
     * Sets the current value to current value.
     * @return {Ext.picker.DateSelectView} this
     */
    OKDate : function(){
        var me = this,
            btn = me.OKBtn,
            handler = me.handler;

        if(btn && !btn.disabled){
            me.fireEvent('select', me, me.value);
            if (handler) {
                handler.call(me.scope || me, me, me.value);
            }
            me.onOK();
        }
        return me;
    },

    /**
     * Update the selected cell
     * @private
     * @param {Date} date The new date
     */
    selectedUpdate: function(date){
        var me        = this,
            t         = date.getTime(),
            cells     = me.cells,
            cls       = me.selectedCls,
            cellItems = cells.elements,
            c,
            cLen      = cellItems.length,
            cell;

        cells.removeCls(cls);

        for (c = 0; c < cLen; c++) {
            cell = Ext.fly(cellItems[c]);

            if (cell.dom.firstChild.dateValue == t) {
                me.fireEvent('highlightitem', me, cell);
                cell.addCls(cls);

                if(me.isVisible() && !me.doCancelFocus){
                    Ext.fly(cell.dom.firstChild).focus(50);
                }

                break;
            }
        }
    },

    /**
     * Update the contents of the picker for a new month
     * @private
     * @param {Date} date The new date
     */
    fullUpdate: function(date){
        var me = this,
            cells = me.cells.elements,
            textNodes = me.textNodes,
            disabledCls = me.disabledCellCls,
            eDate = Ext.Date,
            i = 0,
            extraDays = 0,
            visible = me.isVisible(),
            newDate = +eDate.clearTime(date, true),
            today = +eDate.clearTime(new Date()),
            min = me.minDate ? eDate.clearTime(me.minDate, true) : Number.NEGATIVE_INFINITY,
            max = me.maxDate ? eDate.clearTime(me.maxDate, true) : Number.POSITIVE_INFINITY,
            ddMatch = me.disabledDatesRE,
            ddText = me.disabledDatesText,
            ddays = me.disabledDays ? me.disabledDays.join('') : false,
            ddaysText = me.disabledDaysText,
            format = me.format,
            days = eDate.getDaysInMonth(date),
            firstOfMonth = eDate.getFirstDateOfMonth(date),
            startingPos = firstOfMonth.getDay() - me.startDay,
            previousMonth = eDate.add(date, eDate.MONTH, -1),
            longDayFormat = me.longDayFormat,
            prevStart,
            current,
            disableToday,
            tempDate,
            setCellClass,
            html,
            cls,
            formatValue,
            value;

        if (startingPos < 0) {
            startingPos += 7;
        }

        days += startingPos;
        prevStart = eDate.getDaysInMonth(previousMonth) - startingPos;
        current = new Date(previousMonth.getFullYear(), previousMonth.getMonth(), prevStart, me.initHour);

        if (me.showToday) {
            tempDate = eDate.clearTime(new Date());
            disableToday = (tempDate < min || tempDate > max ||
            (ddMatch && format && ddMatch.test(eDate.dateFormat(tempDate, format))) ||
            (ddays && ddays.indexOf(tempDate.getDay()) != -1));

            if (!me.disabled) {
                me.todayBtn.setDisabled(disableToday);
                me.clearBtn.setDisabled(disableToday);
                me.OKBtn.setDisabled(disableToday);
                me.todayKeyListener.setDisabled(disableToday);
            }
        }

        setCellClass = function(cell, cls){
            value = +eDate.clearTime(current, true);
            cell.title = eDate.format(current, longDayFormat);
            // store dateValue number as an expando
            cell.firstChild.dateValue = value;
            if(value == today){
                cls += ' ' + me.todayCls;
                cell.title = me.todayText;

                // Extra element for ARIA purposes
                me.todayElSpan = Ext.DomHelper.append(cell.firstChild, {
                    tag:'span',
                    cls: Ext.baseCSSPrefix + 'hide-clip',
                    html:me.todayText
                }, true);
            }
            if(value == newDate) {
                cls += ' ' + me.selectedCls;
                me.fireEvent('highlightitem', me, cell);
                if (visible && me.floating) {
                    Ext.fly(cell.firstChild).focus(50);
                }
            }

            if (value < min) {
                cls += ' ' + disabledCls;
                cell.title = me.minText;
            }
            else if (value > max) {
                cls += ' ' + disabledCls;
                cell.title = me.maxText;
            }
            else if (ddays && ddays.indexOf(current.getDay()) !== -1){
                cell.title = ddaysText;
                cls += ' ' + disabledCls;
            }
            else if (ddMatch && format){
                formatValue = eDate.dateFormat(current, format);
                if(ddMatch.test(formatValue)){
                    cell.title = ddText.replace('%0', formatValue);
                    cls += ' ' + disabledCls;
                }
            }
            cell.className = cls + ' ' + me.cellCls;
        };

        for(; i < me.numDays; ++i) {
            if (i < startingPos) {
                html = (++prevStart);
                cls = me.prevCls;
            } else if (i >= days) {
                html = (++extraDays);
                cls = me.nextCls;
            } else {
                html = i - startingPos + 1;
                cls = me.activeCls;
            }
            textNodes[i].innerHTML = html;
            current.setDate(current.getDate() + 1);
            setCellClass(cells[i], cls);
        }

        me.monthBtn.setText(Ext.Date.format(date, me.monthYearFormat));
    },

    /**
     * Update the contents of the picker
     * @private
     * @param {Date} date The new date
     * @param {Boolean} forceRefresh True to force a full refresh
     */
    update : function(date, forceRefresh){
        var me = this,
            active = me.activeDate;

        if (me.rendered) {
            me.activeDate = date;
            if(!forceRefresh && active && me.el && active.getMonth() == date.getMonth() && active.getFullYear() == date.getFullYear()){
                me.selectedUpdate(date, active);
            } else {
                me.fullUpdate(date, active);
            }
        }
        return me;
    },

    // @private
    // @inheritdoc
    beforeDestroy : function() {
        var me = this;

        if (me.rendered) {
            Ext.destroy(
                me.todayKeyListener,
                me.keyNav,
                me.monthPicker,
                me.monthBtn,
                me.nextRepeater,
                me.prevRepeater,
                me.todayBtn,
                me.clearBtn,
                me.OKBtn
            );
            delete me.textNodes;
            delete me.cells.elements;
        }
        me.callParent();
    },

    // @private
    // @inheritdoc
    onShow: function() {
        this.callParent(arguments);
        if (this.focusOnShow) {
            this.focus();
        }
    }
});

/**
 * @docauthor Jason Johnston <jason@sencha.com>
 *
 * Provides a date input field with a {@link Ext.picker.DateSelectView date picker} dropdown and automatic date
 * validation.
 *
 * This field recognizes and uses the JavaScript Date object as its main {@link #value} type. In addition,
 * it recognizes string values which are parsed according to the {@link #format} and/or {@link #altFormats}
 * configs. These may be reconfigured to use date formats appropriate for the user's locale.
 *
 * The field may be limited to a certain range of dates by using the {@link #minValue}, {@link #maxValue},
 * {@link #disabledDays}, and {@link #disabledDates} config parameters. These configurations will be used both
 * in the field's validation, and in the date picker dropdown by preventing invalid dates from being selected.
 *
 * # Example usage
 *
 *     @example
 *     Ext.create('Ext.form.Panel', {
 *         renderTo: Ext.getBody(),
 *         width: 300,
 *         bodyPadding: 10,
 *         title: 'Dates',
 *         items: [{
 *             xtype: 'selectdate',
 *             anchor: '100%',
 *             fieldLabel: 'From',
 *             name: 'from_date',
 *             maxValue: new Date()  // limited to the current date or prior
 *         }, {
 *             xtype: 'selectdate',
 *             anchor: '100%',
 *             fieldLabel: 'To',
 *             name: 'to_date',
 *             value: new Date()  // defaults to today
 *         }]
 *     });
 *
 * # Date Formats Examples
 *
 * This example shows a couple of different date format parsing scenarios. Both use custom date format
 * configurations; the first one matches the configured `format` while the second matches the `altFormats`.
 *
 *     @example
 *     Ext.create('Ext.form.Panel', {
 *         renderTo: Ext.getBody(),
 *         width: 300,
 *         bodyPadding: 10,
 *         title: 'Dates',
 *         items: [{
 *             xtype: 'selectdate',
 *             anchor: '100%',
 *             fieldLabel: 'Date',
 *             name: 'date',
 *             // The value matches the format; will be parsed and displayed using that format.
 *             format: 'm d Y',
 *             value: '2 4 1978'
 *         }, {
 *             xtype: 'selectdate',
 *             anchor: '100%',
 *             fieldLabel: 'Date',
 *             name: 'date',
 *             // The value does not match the format, but does match an altFormat; will be parsed
 *             // using the altFormat and displayed using the format.
 *             format: 'm d Y',
 *             altFormats: 'm,d,Y|m.d.Y',
 *             value: '2.4.1978'
 *         }]
 *     });
 */
Ext.define('Ext.form.field.SelectDate', {
    extend: 'Ext.form.field.Date',//Ext.form.field.Picker ,
    alias: 'widget.selectdate',

    alternateClassName: ['Ext.form.SelectDate'],

    //<locale>
    /**
     * @cfg {String} format
     * The default date format string which can be overriden for localization support. The format must be valid
     * according to {@link Ext.Date#parse}.
     */
    format : "m/d/Y",
    //</locale>
    //<locale>
    /**
     * @cfg {String} altFormats
     * Multiple date formats separated by "|" to try when parsing a user input value and it does not match the defined
     * format.
     */
    altFormats : "m/d/Y|n/j/Y|n/j/y|m/j/y|n/d/y|m/j/Y|n/d/Y|m-d-y|m-d-Y|m/d|m-d|md|mdy|mdY|d|Y-m-d|n-j|n/j",
    //</locale>
    //<locale>
    /**
     * @cfg {String} disabledDaysText
     * The tooltip to display when the date falls on a disabled day.
     */
    disabledDaysText : "Disabled",
    //</locale>
    //<locale>
    /**
     * @cfg {String} disabledDatesText
     * The tooltip text to display when the date falls on a disabled date.
     */
    disabledDatesText : "Disabled",
    //</locale>
    //<locale>
    /**
     * @cfg {String} minText
     * The error text to display when the date in the cell is before {@link #minValue}.
     */
    minText : "The date in this field must be equal to or after {0}",
    //</locale>
    //<locale>
    /**
     * @cfg {String} maxText
     * The error text to display when the date in the cell is after {@link #maxValue}.
     */
    maxText : "The date in this field must be equal to or before {0}",
    //</locale>
    //<locale>
    /**
     * @cfg {String} invalidText
     * The error text to display when the date in the field is invalid.
     */
    invalidText : "{0} is not a valid date - it must be in the format {1}",
    //</locale>
    /**
     * @cfg {String} [triggerCls='x-form-date-trigger']
     * An additional CSS class used to style the trigger button. The trigger will always get the class 'x-form-trigger'
     * and triggerCls will be **appended** if specified (default class displays a calendar icon).
     */
    triggerCls : Ext.baseCSSPrefix + 'form-date-trigger',
    /**
     * @cfg {Boolean} showToday
     * false to hide the footer area of the Date picker containing the Today button and disable the keyboard handler for
     * spacebar that selects the current date.
     */
    showToday : true,
    /**
     * @cfg {Date/String} minValue
     * The minimum allowed date. Can be either a Javascript date object or a string date in a valid format.
     */
    /**
     * @cfg {Date/String} maxValue
     * The maximum allowed date. Can be either a Javascript date object or a string date in a valid format.
     */
    /**
     * @cfg {Number[]} disabledDays
     * An array of days to disable, 0 based. Some examples:
     *
     *     // disable Sunday and Saturday:
     *     disabledDays:  [0, 6]
     *     // disable weekdays:
     *     disabledDays: [1,2,3,4,5]
     */
    /**
     * @cfg {String[]} disabledDates
     * An array of "dates" to disable, as strings. These strings will be used to build a dynamic regular expression so
     * they are very powerful. Some examples:
     *
     *     // disable these exact dates:
     *     disabledDates: ["03/08/2003", "09/16/2003"]
     *     // disable these days for every year:
     *     disabledDates: ["03/08", "09/16"]
     *     // only match the beginning (useful if you are using short years):
     *     disabledDates: ["^03/08"]
     *     // disable every day in March 2006:
     *     disabledDates: ["03/../2006"]
     *     // disable every day in every March:
     *     disabledDates: ["^03"]
     *
     * Note that the format of the dates included in the array should exactly match the {@link #format} config. In order
     * to support regular expressions, if you are using a {@link #format date format} that has "." in it, you will have
     * to escape the dot when restricting dates. For example: `["03\\.08\\.03"]`.
     */

    /**
     * @cfg {String} submitFormat
     * The date format string which will be submitted to the server. The format must be valid according to
     * {@link Ext.Date#parse}.
     *
     * Defaults to {@link #format}.
     */

    /**
     * @cfg {Boolean} useStrict
     * True to enforce strict date parsing to prevent the default Javascript "date rollover".
     * Defaults to the useStrict parameter set on Ext.Date
     * See {@link Ext.Date#parse}.
     */
    useStrict: undefined,

    // in the absence of a time value, a default value of 12 noon will be used
    // (note: 12 noon was chosen because it steers well clear of all DST timezone changes)
    initTime: '12', // 24 hour format

    initTimeFormat: 'H',

    matchFieldWidth: false,
    //<locale>
    /**
     * @cfg {Number} [startDay=undefined]
     * Day index at which the week should begin, 0-based.
     *
     * Defaults to `0` (Sunday).
     */
    startDay: 0,
    //</locale>

    initComponent : function(){
        var me = this,
            isString = Ext.isString,
            min, max;

        min = me.minValue;
        max = me.maxValue;
        if(isString(min)){
            me.minValue = me.parseDate(min);
        }
        if(isString(max)){
            me.maxValue = me.parseDate(max);
        }
        me.disabledDatesRE = null;
        me.initDisabledDays();

        me.callParent();
    },

    initValue: function() {
        var me = this,
            value = me.value;

        // If a String value was supplied, try to convert it to a proper Date
        if (Ext.isString(value)) {
            me.value = me.rawToValue(value);
        }

        me.callParent();
    },

    // private
    initDisabledDays : function(){
        if(this.disabledDates){
            var dd   = this.disabledDates,
                len  = dd.length - 1,
                re   = "(?:",
                d,
                dLen = dd.length,
                date;

            for (d = 0; d < dLen; d++) {
                date = dd[d];

                re += Ext.isDate(date) ? '^' + Ext.String.escapeRegex(date.dateFormat(this.format)) + '$' : date;
                if (d !== len) {
                    re += '|';
                }
            }

            this.disabledDatesRE = new RegExp(re + ')');
        }
    },

    /**
     * Replaces any existing disabled dates with new values and refreshes the Date picker.
     * @param {String[]} disabledDates An array of date strings (see the {@link #disabledDates} config for details on
     * supported values) used to disable a pattern of dates.
     */
    setDisabledDates : function(dd){
        var me = this,
            picker = me.picker;

        me.disabledDates = dd;
        me.initDisabledDays();
        if (picker) {
            picker.setDisabledDates(me.disabledDatesRE);
        }
    },

    /**
     * Replaces any existing disabled days (by index, 0-6) with new values and refreshes the Date picker.
     * @param {Number[]} disabledDays An array of disabled day indexes. See the {@link #disabledDays} config for details on
     * supported values.
     */
    setDisabledDays : function(dd){
        var picker = this.picker;

        this.disabledDays = dd;
        if (picker) {
            picker.setDisabledDays(dd);
        }
    },

    /**
     * Replaces any existing {@link #minValue} with the new value and refreshes the Date picker.
     * @param {Date} value The minimum date that can be selected
     */
    setMinValue : function(dt){
        var me = this,
            picker = me.picker,
            minValue = (Ext.isString(dt) ? me.parseDate(dt) : dt);

        me.minValue = minValue;
        if (picker) {
            picker.minText = Ext.String.format(me.minText, me.formatDate(me.minValue));
            picker.setMinDate(minValue);
        }
    },

    /**
     * Replaces any existing {@link #maxValue} with the new value and refreshes the Date picker.
     * @param {Date} value The maximum date that can be selected
     */
    setMaxValue : function(dt){
        var me = this,
            picker = me.picker,
            maxValue = (Ext.isString(dt) ? me.parseDate(dt) : dt);

        me.maxValue = maxValue;
        if (picker) {
            picker.maxText = Ext.String.format(me.maxText, me.formatDate(me.maxValue));
            picker.setMaxDate(maxValue);
        }
    },

    /**
     * Runs all of Date's validations and returns an array of any errors. Note that this first runs Text's validations,
     * so the returned array is an amalgamation of all field errors. The additional validation checks are testing that
     * the date format is valid, that the chosen date is within the min and max date constraints set, that the date
     * chosen is not in the disabledDates regex and that the day chosed is not one of the disabledDays.
     * @param {Object} [value] The value to get errors for (defaults to the current field value)
     * @return {String[]} All validation errors for this field
     */
    getErrors: function(value) {
        var me = this,
            format = Ext.String.format,
            clearTime = Ext.Date.clearTime,
            errors = me.callParent(arguments),
            disabledDays = me.disabledDays,
            disabledDatesRE = me.disabledDatesRE,
            minValue = me.minValue,
            maxValue = me.maxValue,
            len = disabledDays ? disabledDays.length : 0,
            i = 0,
            svalue,
            fvalue,
            day,
            time;

        value = me.formatDate(value || me.processRawValue(me.getRawValue()));

        if (value === null || value.length < 1) { // if it's blank and textfield didn't flag it then it's valid
            return errors;
        }

        svalue = value;
        value = me.parseDate(value);
        if (!value) {
            errors.push(format(me.invalidText, svalue, Ext.Date.unescapeFormat(me.format)));
            return errors;
        }

        time = value.getTime();
        if (minValue && time < clearTime(minValue).getTime()) {
            errors.push(format(me.minText, me.formatDate(minValue)));
        }

        if (maxValue && time > clearTime(maxValue).getTime()) {
            errors.push(format(me.maxText, me.formatDate(maxValue)));
        }

        if (disabledDays) {
            day = value.getDay();

            for(; i < len; i++) {
                if (day === disabledDays[i]) {
                    errors.push(me.disabledDaysText);
                    break;
                }
            }
        }

        fvalue = me.formatDate(value);
        if (disabledDatesRE && disabledDatesRE.test(fvalue)) {
            errors.push(format(me.disabledDatesText, fvalue));
        }

        return errors;
    },

    rawToValue: function(rawValue) {
        return this.parseDate(rawValue) || rawValue || null;
    },

    valueToRaw: function(value) {
        return this.formatDate(this.parseDate(value));
    },

    /**
     * @method setValue
     * Sets the value of the date field. You can pass a date object or any string that can be parsed into a valid date,
     * using {@link #format} as the date format, according to the same rules as {@link Ext.Date#parse} (the default
     * format used is "m/d/Y").
     *
     * Usage:
     *
     *     //All of these calls set the same date value (May 4, 2006)
     *
     *     //Pass a date object:
     *     var dt = new Date('5/4/2006');
     *     dateField.setValue(dt);
     *
     *     //Pass a date string (default format):
     *     dateField.setValue('05/04/2006');
     *
     *     //Pass a date string (custom format):
     *     dateField.format = 'Y-m-d';
     *     dateField.setValue('2006-05-04');
     *
     * @param {String/Date} date The date or valid date string
     * @return {Ext.form.field.SelectDate} this
     */

    /**
     * Attempts to parse a given string value using a given {@link Ext.Date#parse date format}.
     * @param {String} value The value to attempt to parse
     * @param {String} format A valid date format (see {@link Ext.Date#parse})
     * @return {Date} The parsed Date object, or null if the value could not be successfully parsed.
     */
    safeParse : function(value, format) {
        var me = this,
            utilDate = Ext.Date,
            result = null,
            strict = me.useStrict,
            parsedDate;

        if (utilDate.formatContainsHourInfo(format)) {
            // if parse format contains hour information, no DST adjustment is necessary
            result = utilDate.parse(value, format, strict);
        } else {
            // set time to 12 noon, then clear the time
            parsedDate = utilDate.parse(value + ' ' + me.initTime, format + ' ' + me.initTimeFormat, strict);
            if (parsedDate) {
                result = utilDate.clearTime(parsedDate);
            }
        }
        return result;
    },

    // @private
    getSubmitValue: function() {
        var format = this.submitFormat || this.format,
            value = this.getValue();

        return value ? Ext.Date.format(value, format) : '';
    },

    /**
     * @private
     */
    parseDate : function(value) {
        if(!value || Ext.isDate(value)){
            return value;
        }

        var me = this,
            val = me.safeParse(value, me.format),
            altFormats = me.altFormats,
            altFormatsArray = me.altFormatsArray,
            i = 0,
            len;

        if (!val && altFormats) {
            altFormatsArray = altFormatsArray || altFormats.split('|');
            len = altFormatsArray.length;
            for (; i < len && !val; ++i) {
                val = me.safeParse(value, altFormatsArray[i]);
            }
        }
        return val;
    },

    // private
    formatDate : function(date){
        return Ext.isDate(date) ? Ext.Date.dateFormat(date, this.format) : date;
    },

    createPicker: function() {
        var me = this,
            format = Ext.String.format;

        return new Ext.picker.DateSelectView({
            pickerField: me,
            ownerCt: me.ownerCt,
            renderTo: document.body,
            floating: true,
            hidden: true,
            focusOnShow: true,
            minDate: me.minValue,
            maxDate: me.maxValue,
            disabledDatesRE: me.disabledDatesRE,
            disabledDatesText: me.disabledDatesText,
            disabledDays: me.disabledDays,
            disabledDaysText: me.disabledDaysText,
            format: me.format,
            showToday: me.showToday,
            startDay: me.startDay,
            minText: format(me.minText, me.formatDate(me.minValue)),
            maxText: format(me.maxText, me.formatDate(me.maxValue)),
            listeners: {
                scope: me,
                select: me.onSelect,
                clear: me.onClear
            },
            keyNavConfig: {
                esc: function() {
                    me.collapse();
                }
            }
        });
    },

    onDownArrow: function(e) {
        this.callParent(arguments);
        if (this.isExpanded) {
            this.getPicker().focus();
        }
    },

    onSelect: function(m, d) {
        var me = this;

        me.setValue(d);
        me.fireEvent('select', me, d);
        me.collapse();
    },

    onClear: function(m, d) {
        var me = this;

        me.setValue('');
        me.fireEvent('clear', me, d);
        me.collapse();
    },

    /**
     * @private
     * Sets the Date picker's value to match the current field value when expanding.
     */
    onExpand: function() {
        var value = this.getValue();
        this.picker.setValue(Ext.isDate(value) ? value : new Date());
    },

    /**
     * @private
     * Focuses the field when collapsing the Date picker.
     */
    onCollapse: function() {
        this.focus(false, 60);
    },

    // private
    beforeBlur : function(){
        var me = this,
            v = me.parseDate(me.getRawValue()),
            focusTask = me.focusTask;

        if (focusTask) {
            focusTask.cancel();
        }

        if (v) {
            me.setValue(v);
        }
    }

    /**
     * @cfg {Boolean} grow
     * @private
     */
    /**
     * @cfg {Number} growMin
     * @private
     */
    /**
     * @cfg {Number} growMax
     * @private
     */
    /**
     * @method autoSize
     * @private
     */
});


Ext.define("Ext.locale.zh_CN.picker.DateSelectView", {
    override: "Ext.picker.DateSelectView",
    todayText: "今天",
    clearText: "清空",
    OKText: "确定",
    minText: "日期必须大于最小允许日期",
    //update
    maxText: "日期必须小于最大允许日期",
    //update
    disabledDaysText: "",
    disabledDatesText: "",
    nextText: '下个月 (Ctrl+Right)',
    prevText: '上个月 (Ctrl+Left)',
    monthYearText: '选择一个月 (Control+Up/Down 来改变年份)',
    //update
    todayTip: "{0} (空格键选择)",
    clearTip: "清空日期",
    OKTip: "单击关闭",
    format: "y年m月d日",
    ariaTitle: '{0}',
    ariaTitleDateFormat: 'Y\u5e74m\u6708d\u65e5',
    longDayFormat: 'Y\u5e74m\u6708d\u65e5',
    monthYearFormat: 'Y\u5e74m\u6708',
    getDayInitial: function (value) {
        // Grab the last character
        return value.substr(value.length - 1);
    }
});


Ext.define("Ext.locale.zh_CN.form.field.SelectDate", {
    override: "Ext.form.field.SelectDate",
    disabledDaysText: "禁用",
    disabledDatesText: "禁用",
    minText: "该输入项的日期必须在 {0} 之后",
    maxText: "该输入项的日期必须在 {0} 之前",
    invalidText: "{0} 是无效的日期 - 必须符合格式： {1}",
    format: "y年m月d日"
});

//
Ext.define("ESSM.view.DateView",{
    extend: "Ext.form.field.SelectDate",
    alias : "widget.dateview",
    format: 'Y-m-d',
    initComponent : function() {
        this.callParent();
    }
});

// 时间日期
Ext.define("ESSM.view.DateTimeView",{
    extend: "Ext.form.field.SelectDate",
    alias : "widget.datetimeview",
    format: 'Y-m-d H:i:s',
    initComponent : function() {
        this.callParent();
    }
});


/**

类似于 datefield, 基本上完全兼容.

组件使用方式:

{
	xtype: 'dateview',
	editable: false,
	style: {
		marginLeft : '160px'
	},
	width : 220,
	labelWidth: 100,
	fieldLabel: '选择时间',
	name: 'from_date',
	format: 'Y-m-d',
	value: new Date(),  // defaults to today
	maxValue: new Date()  // limited to the current date or prior
}


// Contoller 使用方式, 类似下面这样:
//
var startTime = "";
var from_date = me.getGrid().query('dateview[name=from_date]')[0];
if(from_date){
	startTime = from_date.getRawValue();
}


*/