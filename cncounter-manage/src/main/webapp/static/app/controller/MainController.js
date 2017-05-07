/**
 *主 controller ，登录界面过后看见的界面
 *
 * 所有逻辑代码都在这里写
 */
Ext.define('ESSM.controller.MainController', {
    extend: 'Ext.app.Controller',
    views: [
        'MainView'
    ],   //声明该控制层要用到的view
    treeStoreArray: [],
    models: ['sys.Resource'], //声明该控制层要用到的model

    //相当于一个映射,这样就可以在控制层方便的通过geter取得相应的对象了
    refs: [{
        ref: 'tabPanel',
        selector: 'tabpanel'
    }
    ],
    init: function () {
        //显示主界面
        var view = this.getView('MainView').create(), self = this;
        //添加加载菜单事件
        view.addEvents({
   
            afterrender: self.loadMenuResources(Ext.getCmp('sysMenu'))
        });
    },

    //根据权限加载菜单
    loadMenuResources: function (view) {
        //从store 里用ajax 获取数据
        var _self = this;
        //
        var last_menu_index = 0;
        //创建树
        var tree = _self.createTree(ESSM.resoures);
        //添加菜单
        var menuArray = [];
        Ext.Array.each(tree, function (root, index) {
            //
            if (root.id) {
                var last_menu_id = getCookie("last_menu_id");
                if (root.id == last_menu_id) {
                    last_menu_index = index;
                }
            }
            //
            menuArray.push({
                title: root['text'],
                xtype: 'panel',
                menulv1: 'true',
                autoScroll: true,
                items: {
                    xtype: 'treepanel',
                    rootVisible: false,
                    lines: false,
                    border: false,
                    autoScroll: 'none',
                    store: _self.createTreeStore(root),
                    listeners: {
                    	
                        itemclick: function (view, record, item, index, e, eOpts) {   //选择菜单事件
                            var uri = root.children[index].uri;
                            //创建 controller 显示当前内容
                            _self.createController(_self, record.get('id'), record.get('text'), record,uri);
                            // 如果不出错,缓存 root.id
                            setCookie("last_menu_id", root.id);
                        }
                    }
                }
            });
        });
        //
        var pView = view;
        // 加上处理方式
        if(this.processMenuTooMany){
            var sysMenuBack = this.processMenuTooMany(view, menuArray);
            if(sysMenuBack){
                view = sysMenuBack;
            }
        }
        //
        this.menuView = view;
        view.add(menuArray);
        //
        expandLastMenu();
        function expandLastMenu() {
            // 展开最后加载的menu
            //var last_menu_id = getCookie("last_menu_id");
            // fireEvent
            // expand
            try {
                (view.items.items[last_menu_index].expand());
            } catch (ex) {
                // 吃掉
            }
        };
    },
    processMenuTooMany: function(view, menuArray){
        // 处理菜单太多的BUG
        // 阀值
        var threshold = 10;
        var perH = 40;//40px就是只看得见标题
        var me = this;
        //
        if(!view || !menuArray){
            return;
        }
        // 需要使用延迟处理
        return setFn();
        //window.setTimeout(setFn, 1 * 100);
        // 闭包函数
        function setFn(){
            // 最小高度
            var minH = (3 + menuArray.length) * perH;
            // 当前高度
            var height = view.getHeight();
            //
            if(height > minH){
                return;
            }
            //
            // 否则就需要切换布局了
            //
            var sysMenuBack = Ext.getCmp('sysMenuBack');
            if(!sysMenuBack){
                return;
            }
            sysMenuBack.setHeight(minH);
            //
            var cardPanel = sysMenuBack.up().up();//up("panel[name=cardPanel]");
            if(cardPanel){
                cardPanel.getLayout().next();
            }
            return sysMenuBack;

            //
            // var parent = view.up("panel");
        };
    },

    /**
     *创建树
     * @param {Object} records  所有记录
     */
    createTree: function (records) {
        var root = [], _self = this, node;
        Ext.Array.each(records, function (item, index) {
            if ((item["parentCode"] == '' || item["parentCode"] == null) && item["code"] != '') {
                node = _self.createNode(item);
                root.push(node);
                //创建子节点
                _self.createChildren(node, records);
            }
        });
        return root;
    },

    /**
     *创建子节点
     * @param {Object} root  父级节点
     * @param {Object} records  所有记录
     */
    createChildren: function (root, records) {
        var _self = this, node;
        Ext.Array.each(records, function (item, index) {
            if (item['parentCode'] == root['code']) {
                node = _self.createNode(item);
                if (!root.children) {
                    root.children = [];
                }
                //加入子节点
                root.children.push(node);
                //递归创建
                _self.createChildren(node, records);
            }
        });
    },

    /**
     *创建node
     * @param {Object} record  记录
     */
    createNode: function (record) {
        return {
            'text': record['name'],
            'name': record['name'],
            'id': record['code'],
            'code': record['code'],
            'iconCls': record['iconCls'],
            'url': record['url'],
            'parentCode': record['parentCode'],
            'hasShow': record['hasShow'],
            'sort': record['sort'],
            'uri':record['uri']
        };
    },

    /**
     *创建  TreeStore
     */
    createTreeStore: function (root) {
        var store = Ext.create('Ext.data.TreeStore', {
            model: this.getModel('sys.ResourceStore'),
            root: {
                expanded: true,
                children: root['children']
            }
        });
        this.treeStoreArray.push(store);
        return store;
    },

    /**
     * 用来打开特写的菜单
     * @param model
     * 调用ESSM.controller.MainController.create().fireMenu("fim:recharge");
     */
    fireMenu: function (model) {
        var _self = ESSM.app.getController('MainController');
        var storeArray = _self.treeStoreArray;
        var len = storeArray.length;
        var cNode = null;
        var index = 0;
        for (var i = 0; i < len; i++) {
            if (cNode != null)break;
            var s = storeArray[i];
            var node = s.getNodeById(model);
            if (node != undefined) {
                cNode = node;
                index = i;
                break;
            }
        }
        if (cNode != null) {
            //var menu = Ext.getCmp('sysMenu');
            var menu = _self.menuView;
            var panel = menu.query('panel[menulv1=true]')[index];
            panel.expand(false);
            panel.down('treepanel').getSelectionModel().select(cNode);
            _self.createController(_self, cNode.get('id'), cNode.get('text'), cNode);
        } else {
            alert('未找到菜单');
        }
    },

    /**
     *创建 controller
     * @param {Object} app  当前app
     * @param {Object} id   controller 标识ID
     */
    createController: function (app, id, modelName, record,uri) {
        if (typeof(id) == 'undefined' || id == null || id == '') {
            return;
        }
        //生成controller 名
        //如 sys:user 变为  sys.UserController
        // manager  变为  ManagerController
        var name = id.replace(':', '.'), packageName;
        var lastIndex = name.lastIndexOf('.');
        if (lastIndex > 0) {
            packageName = name.substr(0, lastIndex);
            name = name.substr(lastIndex + 1);
        }
        //name 首字母大小
        name = name.substr(0, 1).toUpperCase() + (name.length > 1 ? name.substr(1) : '') + 'Controller';
        //生成class 名   如 sys.UserController
        if(uri && uri.length>0){
            name = uri.replace('/','.');
            var lastIndex = name.lastIndexOf('.');
            if (lastIndex > 0) {
                packageName = name.substr(0, lastIndex);
                name = name.substr(lastIndex + 1);
            }
            //name 首字母大小
            name = name.substr(0, 1).toUpperCase() + (name.length > 1 ? name.substr(1) : '') + 'Controller';
        }
        var className = (packageName && packageName != null && packageName != '' ? packageName + '.' : '') + name;
        //加载 controller;
        function loadResourceAsTab(){
            var modelController = app.getController(className),
                tabPanel = Ext.getCmp('mainTabPanel'),
                tabId = id;//id.replace(':','-'),
         
            contentView = Ext.getCmp(tabId);
            if (contentView) {
                tabPanel.setActiveTab(contentView);
                //wr.checkAction(contentView);
            } else {
                if (modelController.getMainView) {
                    var infoMainView = modelController.getMainView.apply(modelController, arguments);
                    if (infoMainView) {
                        contentView = tabPanel.add({
                            id: tabId,
                            title: modelName,
                            closable: true,
                            layout: 'fit',
                            iconCls: record.get('iconCls'),
                            items: infoMainView
                            //,
                            //listeners:{
                            //	beforeRender:function(p,e){
                            //		var _this = this;
                            //		setTimeout(function(){
                            //			var s = _this.items.items[0].getStore();
                            //			//var root = s.getRoot();
                            //			s.load({params:{node:''}});
                            //		},10)
                            //
                            //	}
                            //}
                        });
                        tabPanel.setActiveTab(contentView);
                        //wr.checkAction(contentView);
                    }
                }
            }
        };
        //
        function  errorTip(err){
            Ext.MessageBox.show({
                title: '提示',
                //msg: '未找到【'+modelName+'】文件程序！',
                msg: '网络错误:【' + modelName + '】功能加载失败！',
                icon: Ext.MessageBox.ERROR,
                buttons: Ext.Msg.OK
            });
            debug(err + '  className:' + className);
        };
        try {
            loadResourceAsTab();
        } catch (err) {
            errorTip(err);
        }
    }
});
