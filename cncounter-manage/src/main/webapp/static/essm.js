/**
 * 该文件用于自定义一些简单的组件封装
 */

/**
 * 带清空按钮的文本输入框
 */
Ext.define("ESSM.ux.ClearTextField",{
    extend: "Ext.form.field.Trigger",
    alias : ["widget.cleartext", "widget.cleartextfield", "widget.cleartrigger"],
    emptyText: '请输入...',
    trigger1Cls: 'x-form-clear-trigger',
    onTrigger1Click: function () {
        this.setValue("");
        this.focus();
    }
});


/**
 * 字典下拉输入框. 使用时需要1个必须属性: catagory ;
 * 支持可选属性: addall ;
 */
Ext.define("ESSM.ux.DictCombo",{
    extend: "Ext.form.field.ComboBox",
    alias : ["widget.dictcombo", "widget.dictcombobox"],

    editable: false,
    selectable:false,
    displayField: 'dictName',
    valueField: 'dictValue',
    initComponent : function(){
        //
        var addall = this.addall || 0;
        var catagory = this.catagory || "";
        var url = this.url || "rest/achieve/dict/listBy.json";
        if(!catagory){
            throw new Error("ESSM.ux.DictCombo, [catagory] property id required!");
        }
        //
        this.store =  Ext.create('ESSM.store.achieve.DictStore', {
            proxy : {
                type: 'ajax',
                api : {
                    read : url
                },
                actionMethods: {
                    read   : 'POST'
                },
                reader: {
                    type: 'json',
                    root:'data',
                    totalProperty: 'totalCount',
                    messageProperty:'message'
                },
                extraParams: {
                    addall : addall,
                    catagory : catagory
                }
            }
        });
        //
        this.callParent();
    }
});


/**
 * 简单下拉输入框,兼容 ComboBox
 * 必要配置 url, displayField, valueField
 * 可选配置: fields, extraParams
 */
Ext.define("ESSM.ux.SimpleCombo",{
    extend: "Ext.form.field.ComboBox",
    alias : ["widget.simplecombo", "widget.simplecombobox"],
    // 配置项
    url : "",
    displayField: "",
    valueField: "",
    extraParams : {},
    fields : [],
    editable : false,
    forceSelection : true,
    initComponent : function(){
        //
        var store = this.store;
        var url = this.url;
        var displayField = this.displayField;
        var valueField = this.valueField;
        var extraParams = this.extraParams || {};
        var fields = this.fields || [];
        if(!url){
            noPropertyError("url");
        }
        if(!displayField){
            noPropertyError("displayField");
        }
        if(!valueField){
            noPropertyError("valueField");
        }
        //
        if(fields.indexOf(displayField) < 0){
            fields.push(displayField);
        }
        if(fields.indexOf(valueField) < 0){
            fields.push(valueField);
        }
        //
        if(!fields || !fields.length){
            throw new Error("ESSM.ux.SimpleCombo, [valueField] property id required!");
        }
        //
        this.store =  store  || generateStore();
        //
        this.callParent();

        //
        function noPropertyError(prop){
            // 有 store,则不处理
            if(store){
                return;
            }
            //
            throw new Error("ESSM.ux.SimpleCombo, store is null, so property["+prop+"] id required!");

        };

        // 闭包函数,生成Store
        function generateStore(){
            var _store = Ext.create('Ext.data.Store', {
                fields : fields,
                proxy : {
                    type: 'ajax',
                    api : {
                        read : url
                    },
                    actionMethods: {
                        read   : 'POST'
                    },
                    reader: {
                        type: 'json',
                        root:'data',
                        totalProperty: 'totalCount',
                        messageProperty:'message'
                    },
                    extraParams: extraParams
                }
            });
            return _store;
        };
    }
});

/**
 基于 Ext JS 4.2
 文本操作列组件
 */
Ext.define('ESSM.ux.column.TextAction', {
    extend: 'Ext.grid.column.Column',
    alias: ['widget.textactioncolumn'],
    alternateClassName: 'ESSM.ux.TextActionColumn',

    actionIdRe: new RegExp(Ext.baseCSSPrefix + 'action-col-(\\d+)'),

    altText: '',
    separator : ' - ',
    preWrapText : '[ ',
    postWrapText : ' ]',
    cls : 'x-textaction-butt',
    menuText: '操作',
    sortable: false,

    constructor: function(config) {
        var me = this,
            cfg = Ext.apply({}, config),
        // Items may be defined on the prototype
            items = cfg.items || me.items || [me],
            hasGetClass,
            i,
            len;

        me.origRenderer = cfg.renderer || me.renderer;
        me.origScope = cfg.scope || me.scope;

        me.renderer = me.scope = cfg.renderer = cfg.scope = null;

        // This is a Container. Delete the items config to be reinstated after construction.
        cfg.items = null;
        me.callParent([cfg]);

        // Items is an array property of ActionColumns
        me.items = items;

        for (i = 0, len = items.length; i < len; ++i) {
            if (items[i].getClass) {
                hasGetClass = true;
                break;
            }
        }

        // Also need to check for getClass, since it changes how the cell renders
        if (me.origRenderer || hasGetClass) {
            me.hasCustomRenderer = true;
        }
    },
    defaultItemHandler : function(grid, rowIndex, colIndex, item, e) {
        //
        var eventName = item.eventName || "clickaction";
        var record = grid.getStore().getAt(rowIndex);
        this.fireEvent(eventName, record, grid , rowIndex, colIndex, item, e);
        // 停止事件传播
        e.stopPropagation();
    },

    // 渲染并指定 class name x-action-col-{n}
    defaultRenderer: function(v, meta, record, rowIdx, colIdx, store, view){
        var me = this,
            prefix = Ext.baseCSSPrefix,
            scope = me.origScope || me,
            items = me.items,
            len = items.length,
            i = 0,
            item, ret, disabled, tooltip;

        var preWrapText  = me.preWrapText || "";
        var postWrapText = me.postWrapText || "";

        ret = Ext.isFunction(me.origRenderer) ? me.origRenderer.apply(scope, arguments) || '' : '';

        meta.tdCls += ' ' + Ext.baseCSSPrefix + 'action-col-cell';
        for (; i < len; i++) {
            item = items[i];

            disabled = item.disabled || (item.isDisabled ? item.isDisabled.call(item.scope || scope, view, rowIdx, colIdx, item, record) : false);
            tooltip = disabled ? null : (item.tooltip || (item.getTip ? item.getTip.apply(item.scope || scope, arguments) : null));

            // Only process the item action setup once.
            if (!item.hasActionConfiguration) {
                item.stopSelection = me.stopSelection;
                item.hasActionConfiguration = true;
            }
            // 绑定默认处理事件, 有事件处理器
            if(!item.handler && item.eventName){
                item._handler = me.defaultItemHandler;
            }
            // 升级版的renderer,控制按钮对象
            if (item.itemRenderer && Ext.isFunction(item.itemRenderer)) {
                item.itemRenderer.call(item.scope || me, item, v, meta, record, rowIdx, colIdx, store, view);
            }
            // 分隔符
            if (i != 0 && !items[i - 1].hidden) {
                ret += this.separator;
            }
            // 拼接HTML
            ret += preWrapText;
            ret += '<a ' + ' href="javascript:void(0);"' +
                ' class="' + prefix + 'action-col-text '  +  prefix + 'action-col-' + String(i) + ' ' + (disabled ? prefix + 'item-disabled' : ' ') +
                ' ' + (Ext.isFunction(item.getClass) ? item.getClass.apply(item.scope || scope, arguments) : (item.cls || me.cls || '')) + '"' +
                (tooltip ? ' data-qtip="' + tooltip + '"' : '') + ' >' + item.text + '</a>';
            //
            ret += postWrapText;
        }
        return ret;
    },

    destroy: function() {
        delete this.items;
        delete this.renderer;
        return this.callParent(arguments);
    },

    processEvent : function(type, view, cell, recordIndex, cellIndex, e, record, row){
        var me = this,
            target = e.getTarget(),
            match,
            item, fn,
            key = type == 'keydown' && e.getKey(),
            disabled;

        if (key && !Ext.fly(target).findParent(view.getCellSelector())) {
            target = Ext.fly(cell).down('.' + Ext.baseCSSPrefix + 'action-col-text', true);
        }

        if (target && (match = target.className.match(me.actionIdRe))) {
            item = me.items[parseInt(match[1], 10)];
            disabled = item.disabled || (item.isDisabled ? item.isDisabled.call(item.scope || me.origScope || me, view, recordIndex, cellIndex, item, record) : false);
            if (item && !disabled) {
                if (type == 'click' || (key == e.ENTER || key == e.SPACE)) {
                    fn = item.handler || item._handler || me.handler;
                    if (fn) {
                        fn.call(item.scope || me.origScope || me, view, recordIndex, cellIndex, item, e, record, row);
                    }
                } else if (type == 'mousedown' && item.stopSelection !== false) {
                    return false;
                }
            }
        }
        return me.callParent(arguments);
    },

    cascade: function(fn, scope) {
        fn.call(scope||this, this);
    },

    getRefItems: function() {
        return [];
    }
});


/**
 * 对手机号进行屏蔽的列
 */
Ext.define('ESSM.ux.column.MobileColumn', {
    extend: 'Ext.grid.column.Column',
    alias: ['widget.mobilecolumn'],
    renderer : function(value, row, record) {
        if(!value) {
            return "";
        }
        value = value + "";
        if(value.length != 11) {
            return value;
        }
        //
        var len = value.length;
        var nmobile = value.substr(0,4) + "****" + value.substr(7,11);
        //
        return nmobile;
    }
});


/**
 * 对身份证号码进行屏蔽的列
 */
Ext.define('ESSM.ux.column.SIDColumn', {
    extend: 'Ext.grid.column.Column',
    alias: ['widget.sidcolumn'],
    renderer : function(value, row, record) {
        if(!value) {
            return "";
        }
        value = value + "";
        var len = 18;
        if(value.length != len) {
            return value;
        }
        //
        var len = value.length;
        var nsid = value.substr(0,4) + "****" + value.substr(len-4,len);
        //
        return nsid;
    }
});

Ext.define('ESSM.ux.column.DateTimeColumn', {
    extend: 'Ext.grid.column.Column',
    alias: ['widget.datetimecolumn'],
    renderer : function(value, row, record) {
        if(!value) {
            return "";
        }
       return Ext.Date.format(new Date(value), "Y-m-d");
    }
});
//新增时间类型 格式化成 yyyy-MM-dd hh:mm:ss
Ext.define('ESSM.ux.column.TimeStampColumn', {
    extend: 'Ext.grid.column.Column',
    alias: ['widget.timestampcolumn'],
    renderer : function(value, row, record) {
        if(!value) {
            return "";
        }
        return Ext.Date.format(new Date(value), "Y-m-d h:i:s");
    }
});
Ext.define('ESSM.ux.column.DictColumn', {
    extend: 'Ext.grid.column.Column',
    alias: ['widget.dictcolumn'],
    initComponent:function(v){
        var dictCatagoryCode=this.dictCatagoryCode;
        if(wr.isEmpty(wr.dict[dictCatagoryCode])) {
            Ext.Ajax.request({
                async: false,
                url: 'rest/achieve/dict/list.json',
                method: 'post',
                params: {'bParam.dictCatagoryCode': dictCatagoryCode, addall: 'all'},
                success: function (resp, opts) {
                    var datas = Ext.JSON.decode(resp.responseText);
                    wr.dict[dictCatagoryCode] = datas.data;
                }
            });
        }
        this.callParent();
    },
    renderer : function(value, row, record) {
        var dictCatagoryCode= row.column.dictCatagoryCode;
        var dictName="";
        if(!wr.isEmpty(wr.dict[dictCatagoryCode])){
            var data=wr.dict[dictCatagoryCode];
            Ext.Array.each(data,  function(item){
                if(item['dictValue']==value){
                    dictName=item['dictName'];
                }

            });
        }
        return dictName
    }
});

//////////////////////////////////////////////////////////////////////////////////////
///////// 工具函数
//////////////////////////////////////////////////////////////////////////////////////

// 调试
function debug(obj) {
	try{
		// 只适用于具有console的浏览器
		if(!window["console"] || !window["console"]["dir"] || !window["console"]["info"]){  return;	}
		var params = Array.prototype.slice.call(arguments, 0);
		for(var i=0; i < params.length; i++){
			if ("object" === typeof params[i] ) {
				window["console"]["dir"](params[i]);
			} else {
				window["console"]["info"](params[i]);
			}
		}
	} catch (ex){
		// 吃掉异常
	}
};

/****************************************************
 *
 *			cookie相关的函数
 *
 ****************************************************/

// 获取cookie值(key)
function getCookie(cookieName){
	//获取cookie字符串
	var strCookie=document.cookie;
	//将多cookie切割为多个名/值对
	var arrCookie=strCookie.split("; ");
	var cookieValue = null;
	//遍历cookie数组,处理每个cookie对
	for(var i=0;i<arrCookie.length;i++){
		var arr=arrCookie[i].split("=");
		//找到cookie,并返回它的值
		if(cookieName==arr[0]){
			cookieValue=unescape(arr[1]);
			break;
		}
	}
	//
	if(!cookieValue){
		cookieValue = "";
	}
	cookieValue = decodeURIComponent(cookieValue);
	//
	return cookieValue;
};

// 设置cookie值(key,value,过期天数,域名)
function setCookie(cookieName, cookieValue, expiredays, domain){
	// 0 比较特殊
	if(0 === cookieValue){
		cookieValue = 0;
	} else if(!cookieValue){
		cookieValue = "";
	}
	// 编码
	cookieValue = encodeURIComponent(cookieValue);
	//获取cookie字符串
	var cookieStr= cookieName + "=" + cookieValue;

    // 过期时间
    if(expiredays && !isNaN(expiredays)){
        var exdate=new Date();
        exdate.setDate(exdate.getDate()+expiredays);
        cookieStr += "; expires="+exdate.toGMTString();
    }
    // 域名
    //domain = domain || document.domain;
    if(domain){
        cookieStr += "; path=" + "/";
        cookieStr += "; domain="+domain;
    }

	// 保存本地 cookie
	document.cookie = cookieStr;

	// 返回设置后的值
	return cookieValue;
};

/****************************************************
 *
 *			Date 相关的函数
 *
 ****************************************************/

/**
 * 获取当前月的月初
 */
function currentMonthBegin(){
	//
	var d = new Date();
	d.setDate(1); //  设置为1号
	return d;
};

/**
 *  如出现问题请联系  cyb
 */
Ext.apply(Ext.form.VTypes, {
	daterange : function(val, field) {
		var date = field.parseDate(val);
		if (!date) {
			return;
		}
		if (field.startDateField
			&& (!this.dateRangeMax || (date.getTime() != this.dateRangeMax
				.getTime()))) {
			var start = Ext.getCmp(field.startDateField);
			start.setMaxValue(date);
			start.validate();
			this.dateRangeMax = date;
		} else if (field.endDateField
			&& (!this.dateRangeMin || (date.getTime() != this.dateRangeMin
				.getTime()))) {
			var end = Ext.getCmp(field.endDateField);
			end.setMinValue(date);
			end.validate();
			this.dateRangeMin = date;
		}
		return true;
	},
    mobileField:function(value,field){
        if(!value){
            return ;
        }
       var pat = new RegExp(/^(1[0-9][0-9]|14[0-9]|15[0-9]|18[0-9])\d{8}$/);
        return  pat.test(value);
    },
    mobileFieldText: '请输入正确的手机号',
    mobileFieldMask: /[\d\.]/i
});

ESSM.passwordLevel = function(password) {
    var securityLevelFlag = 0;
    if (!password) {
        return 0;
    } else if (password.length < 6) {
        return 0;
    } else {
        var securityLevelFlagArray = new Array(0, 0, 0, 0);
        for (var i = 0; i < password.length; i++) {
            var asciiNumber = password.substr(i, 1).charCodeAt();
            if (asciiNumber >= 48 && asciiNumber <= 57) {
                securityLevelFlagArray[0] = 1;  //digital
            }
            else if (asciiNumber >= 97 && asciiNumber <= 122) {
                securityLevelFlagArray[1] = 1;  //lowercase
            }
            else if (asciiNumber >= 65 && asciiNumber <= 90) {
                securityLevelFlagArray[2] = 1;  //uppercase
            }
            else {
                securityLevelFlagArray[3] = 1;  //specialcase
            }
        }

        for (var i = 0; i < securityLevelFlagArray.length; i++) {
            if (securityLevelFlagArray[i] == 1) {
                securityLevelFlag++;
            }
        }
        return securityLevelFlag;
    }
};



Ext.define("ESSM.ux.DeptTreePicker",{
    extend: "Ext.ux.TreePicker",
    alias : "widget.deptTreePicker",
    createPicker: function () {
        var me = this,
            picker = new Ext.tree.Panel({
                shrinkWrapDock: 2,
                store: me.store,
                floating: true,
                displayField: me.displayField,
                columns: me.columns,
                //minHeight: me.minPickerHeight,
                maxHeight: me.maxPickerHeight,
                manageHeight: false,
                shadow: false,
                rootVisible: false,
                autoScroll: true,
                listeners: {
                    scope: me,
                    itemclick: me.onItemClick
                },
                viewConfig: {
                    listeners: {
                        scope: me,
                        render: me.onViewRender
                    }
                }
            }),
            view = picker.getView();

        if (Ext.isIE9 && Ext.isStrict) {
            // In IE9 strict mode, the tree view grows by the height of the horizontal scroll bar when the items are highlighted or unhighlighted.
            // Also when items are collapsed or expanded the height of the view is off. Forcing a repaint fixes the problem.
            view.on({
                scope: me,
                highlightitem: me.repaintPickerView,
                unhighlightitem: me.repaintPickerView,
                afteritemexpand: me.repaintPickerView,
                afteritemcollapse: me.repaintPickerView
            });
        }
        return picker;
    },
    onItemClick: function (view, record, node, rowIndex, e) {
         if(record.data.dtype=="1"){
             //集团
             return ;
         }
        if(record.data.dtype=="2"){
            //公司
            return;
        }
        this.selectItem(record);
    },
    selectItem: function (record) {
        var me = this;
        me.setValue(record.get(this.valueField));
        me.setRawValue(record.get(this.displayField));
        if (me.picker) {
            me.picker.hide();
            me.inputEl.focus();
            me.fireEvent('select', me, record);
        }
    }
});

/**
 *  通过产品列表选择产品的组件
 *  返回值是产品名称
 *  示例：
 *  {
        xtype: 'projecttext',
        width : 325,
        fieldLabel: "产品列表"
    }
 */
Ext.define("ESSM.ux.ProjectText",{
    extend: "Ext.form.field.ComboBox",
    alias : ["widget.projecttext","widget.projectinput"],
    editable:false,
    queryMode: 'local',
    displayField: 'projectName',
    valueField: 'projectCode',
    initComponent : function(){
        var url = 'rest/crm/projects/queryBy.json';
        this.store =  Ext.create('ESSM.store.base.ProjectListStore', {
            fields: ['projectCode', 'projectName'],
            autoLoad : true,
            remoteSort : true,
            proxy : {
                type: 'ajax',
                api : {
                    read : url
                },
                actionMethods: {
                    read   : 'POST'
                },
                reader: {
                    type: 'json',
                    root:'data',
                    totalProperty: 'totalCount',
                    messageProperty:'message'
                },
                limitParam : '1000000',
                pageParam :'0'
            }
        });
        //
        this.addListener("focus", this.onFocus, this);
        //
        this.callParent();
    },
    onFocus : function(){
        //
        var that = this;
        showProjectSelectWindow(onselected);
        function onselected(data){
            var projectCodes = "";
            for(var i = 0; i < data.length; i ++) {
                var projectCode = "";
                if(i == (data.length - 1)) {
                    projectCode = data[i].data.projectCode;
                }else {
                    projectCode = data[i].data.projectCode + ",";
                }
                projectCodes += projectCode;
            }
            that.setValue(projectCodes);
        };
    }

});

/**
 * 产品列表的弹出框
 * @param onselectedFn
 */
function showProjectSelectWindow(onselectedFn){
//    var grid = Ext.create("ESSM.view.base.ProjectListGrid",{multiple: multiple});
    var grid = Ext.create("ESSM.view.base.ProjectListGrid");
    var win = new Ext.Window({
        title : '产品列表',
        width : 1200,
        height :800,
        resizable : true,
        closable : true,
        draggable : true,
        layout : 'fit',
        modal : false,
        plain : true, // 表示为渲染window body的背景为透明的背景
        bodyStyle : 'padding:5px;',
        items : [
            grid
        ],
        buttonAlign : 'center',
        buttons : [{
            text : '确定',
            type : 'button',
            handler : function() {
                if(grid.getSelectionModel().getLastSelected()){
                    var data = grid.getSelectionModel().getSelection();
                    onselectedFn && onselectedFn(data);
                }
                win .close();
            }
        },{
            text : '取消',
            type : 'button',
            handler : function() {
                win .close();
            }
        }]
    });
    win.show();
};

