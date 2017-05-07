Ext.define('Ext.ux.multiupload.Panel', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.ux.multiupload.Upload'
    ],
    viewConfig: {
        markDirty: false
    },
    store: {
        fields: ['id', 'name', 'size', 'status', 'progress']
    },
    initComponent: function () {
        var me = this;

        me.addEvents('fileuploadcomplete');

        me.tbar = [{
            xtype: 'uploader',
            uploadConfig: this.uploadConfig,
            listeners:
            {
                'fileadded': function (source, file) {
                    this.up('grid').store.add({
                        id: file.fileIndex,
                        name: file.fileName,
                        size: file.fileSize,
                        status: 'waiting...',
                        progress: 0
                    });
                },
                'uploadstart': function (source, file) {
                    var grid = this.up('grid');
                    var record = grid.store.getById(file.fileIndex);

                    if (record) {
                        record.set('status', 'uploading...');
                    }
                },
                'uploadprogress': function (source, file) {
                    var grid = this.up('grid');
                    var record = grid.store.getById(file.fileIndex);
                    if (record) {
                        var p = Math.round(file.fileProgress / file.fileSize * 100);
                        record.set('progress', p);
                    }
                },
                'uploaddatacomplete': function (source, file) {
                    var grid = this.up('grid');
                    var record = grid.store.getById(file.fileIndex);
                    if (record) {
                        record.set('status', 'completed');
                    }
                    me.fireEvent('fileuploadcomplete', file.data);
                },
                'queuedatacomplete': function (source, data) {
                    Ext.Msg.show({
                        title: 'Info',
                        msg: 'Queue upload end. ' + data.files + ' file(s) uploaded.',
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.INFO
                    });
                },
                'uploaderror': function (src, data) {
                    var msg = 'ErrorType: ' + data.errorType;

                    switch (data.errorType) {
                        case 'FileSize':
                            msg = 'This file is too big: ' + Ext.util.Format.fileSize(data.fileSize) +
                            '. The maximum upload size is ' + Ext.util.Format.fileSize(data.maxFileSize) + '.';
                            break;

                        case 'QueueLength':
                            msg = 'Queue length is too long: ' + data.queueLength +
                            '. The maximum queue length is ' + data.maxQueueLength + '.';
                            break;
                    }

                    Ext.Msg.show({
                        title: 'Upload Error',
                        msg: msg,
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.ERROR
                    });
                }
            }
        }, {
            xtype:'button',
            text:'从服务器上选择...'
        }];

        me.columns = [
            {
                header: 'Id',
                dataIndex: 'id',
                width: 75,
                renderer: function (v) { return v + 1; }
            },
            { header: 'Name', dataIndex: 'name', width: 150 },
            { header: 'Size', dataIndex: 'size', renderer: Ext.util.Format.fileSize },
            { header: 'Status', dataIndex: 'status' },
            {
                header: 'Progress',
                dataIndex: 'progress',
                renderer: function (v) { return v + '%'; }
            }
        ];

        me.callParent(arguments);
    }
});
