Ext.define('ESSM.controller.sys.UserLogoffController', {
    extend: 'Ext.app.Controller',
    views: ['sys.UserLogoffView','sys.UserLogoffForm','sys.UserLogoffGrid'],
    stores : ["sys.UserLogoffStore"],
    models : ["sys.ManageUser"],
    refs: [{
        ref : 'userLogoffView',
        selector : 'userLogoffView'
    },{
        ref:'userLogoffForm',
        selector:'userLogoffForm'
    }, {
        ref : 'grid',
        selector : 'userLogoffGrid'
    }],

    getMainView: function () {
        return this.getView('sys.UserLogoffView');
    },


    init : function() {
        this.control({
            'userLogoffForm button[action=query]': {
                click: this.onQuery
            },
            'userLogoffForm button[action=reset]': {
                click: this.onReset
            }
            ,
            'userLogoffGrid button[action=logoff]': {
                click: this.userLogoff
            }


        });
    },


    onReset: function (btn) {
        var me = this;
        btn.up('form').form.reset();
        //查询
        /* me.getStore('crm.ReadlostStore').loadPage(1, {
         });*/
        me.onQuery('1');
    },

    /**
     *查询
     */
    onQuery : function(btn) {
        var me = this;
        var form = this.getUserLogoffForm();
        var store = me.getGrid().getStore();
        var params = me.getQueryParams(form);
        debug(params);

        //
        store.proxy.extraParams = params;
        // 加载1页
        store.loadPage(1);
    },

    userLogoff : function(btn) {
        var me = this;
        var row = me.getGrid().getSelectionModel().getSelection();
        if (row.length == 0) {
            Ext.Msg.alert("提示信息", "请选择用户!");
        }else {
            //
            Ext.MessageBox.confirm('请确认',"确定要注销此用户吗?",
                cfmCallback);

            function cfmCallback(optional){
                if("yes" != optional){
                    return;
                }
                var loadMask = new Ext.LoadMask(me.getGrid(), {msg : '正在处理...'});
                loadMask.show();

                var id = me.getGrid().getSelectionModel().getLastSelected().data.id;
                //
                Ext.Ajax.request({
                    url : 'rest/manager/user/userLogoff.json',  //地址
                    method : 'POST',
                    params : {
                        id:id
                    },
                    success : function(response) {
                        var result = ESSM.processResultData(response);
                        if(result) {
                            //
                            var message = result.message;
                            var success = result.success;
                            //
                            if(success){
                                //
                                var meta = result.meta || {};
                                //
                                var count = meta.count || 0;
                                //
                                Ext.Msg.alert("提示", message);
                                me.onQuery();
                            } else {
                                Ext.Msg.alert("提示", message);
                            }
                        }
                        loadMask.hide();
                    },
                    callback :  function() {
                        loadMask.hide();
                    }
                });
            };
        }

    },
    /**
     * 获取查询参数
     * @returns {{startTime: string, endTime: string, status: string, sid: string}}
     */
    getQueryParams : function(form){
        var me = this;
        //
        var empCode = "";
        //
        var empCode_text = form.query("textfield[name=empCode]")[0];

        if(empCode_text){
            empCode = empCode_text.getValue();
        }
        //
        var params = {
            'status' : 1,
            'empCode' : empCode
        };
        //
        return params;
    }


});

