/**
 * ESSM,自定义下拉树组件
 */
Ext.define('ESSM.view.SelectTree', {
    extend: 'Ext.form.field.Picker',
    xtype: 'selecttree',
	
    uses: [
        'Ext.tree.Panel'
    ],
	
	mixins: {
        bindable: 'Ext.util.Bindable'    
    },
    triggerCls: Ext.baseCSSPrefix + 'form-arrow-trigger',

    config: {
        /**
        * @cfg {Ext.data.TreeStore} store
        * A tree store that the tree picker will be bound to
        */
        store: null,

        /**
        * @cfg {String} displayField
        * The field inside the model that will be used as the node's text.
        * Defaults to the default value of {@link Ext.tree.Panel}'s `displayField` configuration.
        */
        displayField: null,
        valueField: null,

        /**
        * @cfg {Array} columns
        * An optional array of columns for multi-column trees
        */
        columns: null,

        /**
        * @cfg {Boolean} selectOnTab
        * Whether the Tab key should select the currently highlighted item. Defaults to `true`.
        */
        selectOnTab: true,

        /**
        * @cfg {Number} maxPickerHeight
        * The maximum height of the tree dropdown. Defaults to 300.
        */
        maxPickerHeight: 200,

        /**
        * @cfg {Number} minPickerHeight
        * The minimum height of the tree dropdown. Defaults to 100.
        */
        minPickerHeight: 100
    },

    editable: false,

    initComponent: function () {
        var me = this;
        if (me.store == null && this.url) {
            me.store = Ext.create('Ext.data.TreeStore', {
                fields: [me.valueField, me.displayField],
                root: {
                    text: ''
                },
                proxy: {
                    type: 'ajax',
                    url: me.url,
                    reader: {
                        type: 'json'
                    }
                }
            });
        } else {
        	me.bindStore(me.store || 'ext-empty-store', true);
        }

        me.callParent(arguments);

        me.addEvents(
        /**
        * @event select
        * Fires when a tree node is selected
        * @param {Ext.ux.TreePicker} picker        This tree picker
        * @param {Ext.data.Model} record           The selected record
        */
            'select'
        );
        // store has already been loaded, setValue
        if (me.store.getCount() > 0) {
            me.setValue(me.value);
            me.store.each(function(record){
            	if(record.get(me.valueField) == me.value) {
            		me.setRawValue(record.get(me.displayField));
            	}
            });
        }
        
        me.mon(me.store, {
            scope: me,
            load: me.onLoad,
            update: me.onUpdate
        });
    },

    /**
    * Creates and returns the tree panel to be used as this field's picker.
    */
   
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
     

    onViewRender: function (view) {
        view.getEl().on('keypress', this.onPickerKeypress, this);
    },

    /**
    * repaints the tree view
    */
    repaintPickerView: function () {
        var style = this.picker.getView().getEl().dom.style;

        // can't use Element.repaint because it contains a setTimeout, which results in a flicker effect
        style.display = style.display;
    },

    /**
    * Aligns the picker to the input element
    */
    alignPicker: function () {
        var me = this,
            picker;

        if (me.isExpanded) {
            picker = me.getPicker();
            if (me.matchFieldWidth) {
                // Auto the height (it will be constrained by max height)
                picker.setWidth(me.bodyEl.getWidth());
            }
            if (picker.isFloating()) {
                me.doAlign();
            }
        }
    },

    /**
    * Handles a click even on a tree node
    * @private
    * @param {Ext.tree.View} view
    * @param {Ext.data.Model} record
    * @param {HTMLElement} node
    * @param {Number} rowIndex
    * @param {Ext.EventObject} e
    */
    onItemClick: function (view, record, node, rowIndex, e) {
        this.selectItem(record);
    },

    /**
    * Handles a keypress event on the picker element
    * @private
    * @param {Ext.EventObject} e
    * @param {HTMLElement} el
    */
    onPickerKeypress: function (e, el) {
        var key = e.getKey();

        if (key === e.ENTER || (key === e.TAB && this.selectOnTab)) {
            this.selectItem(this.picker.getSelectionModel().getSelection()[0]);
        }
    },

    /**
    * Changes the selection to a given record and closes the picker
    * @private
    * @param {Ext.data.Model} record
    */
    selectItem: function (record) {
        var me = this;
        me.setValue(record.get(this.valueField));
        me.setRawValue(record.get(this.displayField));
        if (me.picker) {
            me.picker.hide();
            me.inputEl.focus();
            me.fireEvent('select', me, record);
        }
    },

    /**
    * Runs when the picker is expanded.  Selects the appropriate tree node based on the value of the input element,
    * and focuses the picker so that keyboard navigation will work.
    * @private
    */
    onExpand: function () {
        var me = this,
            picker = me.picker,
            store = picker.store,
            value = me.value,
            node;

		//修改获取node
        if (value) {
            //node = store.getNodeById(value);
            node = store.getRootNode().findChild(me.valueField,value,true);
        }

        if (!node) {
            node = store.getRootNode();
        }

        picker.selectPath(node.getPath());

        Ext.defer(function () {
            picker.getView().focus();
        }, 1);
        //选中设置的value 节点
        //console.log(record);
    },

    /**
    * Sets the specified value into the field
    * @param {Mixed} value
    * @return {Ext.ux.TreePicker} this
    */
    setValue: function (value) {
        var me = this,
            record;

        me.value = value;

        if (me.store.loading) {
            // Called while the Store is loading. Ensure it is processed by the onLoad method.
            return me;
        }

		
        // try to find a record in the store that matches the value
        //record = value ? me.store.getNodeById(value) : me.store.getRootNode();
        // console.log(me.store);
        //record = value ? me.store.findRecord(me.valueField,value) : me.store.getRootNode();
        //issue 修改
        if (value === undefined) {
        	//初始化无值，不显示
            //record = me.store.getRootNode();
            //me.value = record.get(me.valueField);
        } else {
        	//查找子节点
            record = me.store.getRootNode().findChild(me.valueField,value,true);
            me.setRawValue(record ? record.get(me.displayField) : '');
        }
        // set the raw value to the record's display field if a record was found
        return me;
    },

    setFieldValue: function (value,display) {
        this.setValue(value);
        this.setRawValue(display);
    },

    getSubmitValue: function () {
        return this.value;
    },

    /**
    * Returns the current data value of the field (the idProperty of the record)
    * @return {Number}
    */
    getValue: function () {
        return this.value;
    },

    /**
    * Handles the store's load event.
    * @private
    */
    onLoad: function () {
        var value = this.value;

        if (value) {
            this.setValue(value);
        }
    },

    onUpdate: function (store, rec, type, modifiedFieldNames) {
        var display = this.displayField;

        if (type === 'edit' && modifiedFieldNames && Ext.Array.contains(modifiedFieldNames, display) && this.value === rec.getId()) {
            this.setRawValue(rec.get(display));
        }
    }

});

