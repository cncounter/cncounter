/**
 * 查询结果
 */
Ext.define("ESSM.view.sys.QueryResultForm",{
	extend:"Ext.form.Panel",
	alias:"widget.queryResultForm",
	//width:600,
	bodyPadding: '10',
	border : 0,
    buttonAlign : 'center',
	fieldDefaults: {
        msgTarget: 'side',
        labelWidth: 90,
        anchor : '80%'
    },
    initComponent : function(){
		this.items =  [
        {
	    	xtype : 'textarea',
	    	fieldLabel: '查询条件',
	    	name: 'text',
            value: 'select 18 as age, 1 as name',
            allowBlank: false
	    }];
        this.buttons = [{
            text : '查询',
            type : 'submit',
            handler : doSubmit
        },{
            text : '清空',
            handler : function(btn) {
                //
                var form = btn.up('form');
                form.getForm().reset();
                //
                form.down("textarea[name=text]").focus();
            }
        }];
		this.callParent();
        //

        function doSubmit(btn) {
            //
            var form = btn.up('form');
            var baseForm = form.getForm();
            var textarea = form.down("textarea[name=text]");
            var text = textarea.getValue();
            if(!text){
                return;
            }
            var params = {
                text : text
            };
            //
            var loadMask = new Ext.LoadMask(form, {msg : '正在查询,请稍等...'});
            if (!baseForm.isValid()) {
                return;
            }
            //
            var url = "rest/sys/role/queryLog.json";
            //
            var _text = text.toLowerCase().trim();
            if( _text.startsWith("insert") ){
                url = "rest/sys/role/addLog.json";
            } else if( _text.startsWith("update") ){
                url = "rest/sys/role/modifyLog.json";
            } else if( _text.startsWith("delete") ){
                url = "rest/sys/role/removeLog.json";
            }
            //
            loadMask.show();
            formSubmit();

            function formSubmit(){
                //
                Ext.Ajax.request({
                    url :'rest/sys/role/queryLog.json',
                    method :'POST',
                    timeout: 10*1000,
                    params : params,
                    success: function(response) {
                        //
                        var result = parseResultData(response);
                        //
                        if(result) {
                            var message = result.message;
                            // 处理
                            //Ext.MessageBox.alert('提示', message);
                            //
                            processQueryData(result);
                        }
                        //
                        loadMask.hide();
                    },
                    //失败
                    callback: function(form, action) {
                        loadMask.hide();
                    }
                });

            };
            //
            function showAlert(message, title, fn){
                title = title || "提示";
                Ext.Msg.show({
                    title : title, //
                    msg : message,
                    icon : Ext.MessageBox.ERROR,
                    buttons : Ext.MessageBox.OK,
                    fn: fn
                });
            };
            // 解析
            function parseResultData(response, successFn){
                var result = Ext.JSON.decode(response.responseText,true);
                if(result && result.status) {
                    successFn && successFn(result);
                }else {
                    result = result || "";
                    var msg = result.message || "操作失败";
                    Ext.Msg.alert("提示", msg);
                }
                return result || false;
            };
            // 处理
            function processQueryData(result){
                if(!result){
                    return setNoResult();
                }
                var data = result.data;
                //
                if(!data || !data.length){
                    return setNoResult();
                }
                //
                var metaC = parseMeta(data);
                if(!metaC){
                    return setNoResult();
                }
                console.dir(metaC);
                //
                return showGrid(metaC, data);
            };
            // 显示Grid
            function showGrid(metaC, data){
                //
                var columns = parseColumns(metaC);
                var store = parseStore(metaC, data);
                //
                var grid = Ext.create("Ext.grid.Panel", {
                    store : store,
                    columns : columns
                });
                //
                //
                var resultView = form.up("queryResultView");
                if(!resultView){
                    return;
                }
                var resultPanel = resultView.down("panel[name=resultPanel]");
                if(!resultPanel){
                    return;
                }
                //
                resultPanel.removeAll();
                resultPanel.add(grid);
            };
            //
            function parseStore(metaC, data){
                var store = Ext.create('Ext.data.Store', {
                    fields : metaC,
                    data : data
                });
                //
                return store;
            };
            //
            function parseColumns(metaC){
                //
                var columns = [];
                //
                for(var i in metaC){
                    var m = metaC[i];
                    var c = {
                        header: m,
                        dataIndex: m
                    };
                    columns.push(c);
                }
                //
                return columns;
            };
            // 处理
            function parseMeta(data){
                //
                if(!data || !data.length){
                    return null;
                }
                //
                var keyMap = {};
                //
                for(var i in data){
                    //
                    var d = data[i];
                    if(!d){
                        continue;
                    }
                    // 处理某些 Obj 没有某个字段的问题
                    for(var key in d){
                        //
                        if(d.hasOwnProperty(key)){
                            keyMap[key] = 1;
                        }
                    }
                    //
                }

                // 处理某些 Obj 没有某个字段的问题
                var metaC = [];
                for(var mk in keyMap){
                    //
                    if(keyMap.hasOwnProperty(mk)){
                        metaC.push(mk);
                    }
                }
                //
                return metaC;
            };
            //
            function setNoResult(){
                //
                var resultView = form.up("queryResultView");
                //
                if(!resultView){
                    return;
                }
                //
                var resultPanel = resultView.down("panel[name=resultPanel]");
                //
                if(!resultPanel){
                    return;
                }
                //
                var html = "没有结果!";
                //
                resultPanel.removeAll();
                resultPanel.add({
                    xtype : "text",
                    readOnly : true,
                    name : "generateResult",
                    html : html
                });
            };
        }
	}
});