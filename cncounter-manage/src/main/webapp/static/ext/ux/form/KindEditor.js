Ext.define('Ext.ux.form.KindEditor', {
    extend: 'Ext.container.Container',
    alias: 'widget.kindeditorfield',
    initComponent: function () {
        var me = this;

        var textarea = Ext.create('Ext.form.field.TextArea', {
            name: this.name,
            anchor: '100%'
        });

        Ext.apply(this, {
            height: me.height || 300,
            items: [textarea],
            listeners: {
                'boxready': function () {
                    me.editor = KindEditor.create('textarea[name="' + this.name + '"]', {
                        width: me.getWidth() - 2,
                        height:me.getHeight() -2,
                        uploadJson: 'Upload.ashx',
                        fileManagerJson: 'FileManager.ashx',
                        allowFileManager: true
                    });
                },
                'resize': function (t, w, h) {
                    me.editor.resize(w - 2, h - 2);
                }
            }
        });

        this.callParent(arguments);
    },
    setValue: function (value) {
        if (this.editor) {
            this.editor.html(value);
            this.sync();
        }
    },
    reset: function () {
        if (this.editor) {
            this.editor.html('');
        }
    },
    setRawValue: function (value) {
        if (this.editor) {
            this.editor.text(value);
        }
    },
    getValue: function () {
        if (this.editor) {
            return this.editor.html();
        } else {
            return '';
        }
    },
    getRawValue: function () {
        if (this.editor) {
            return this.editor.text();
        } else {
            return '';
        }
    },
    sync: function () {
        this.editor.sync();
    }
});