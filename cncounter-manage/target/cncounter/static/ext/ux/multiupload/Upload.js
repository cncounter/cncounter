Ext.define('Ext.ux.multiupload.Upload', {
    extend: 'Ext.flash.Component',
    requires: [
        'Ext.ux.multiupload.UploadManager'
    ],
    alias: 'widget.uploader',
    width: 101,
    height: 22,
    wmode: 'transparent',
    url: 'scripts/ext-ux/multiupload/Upload.swf',
    statics: {
        instanceId: 0
    },
    constructor: function (config) {
        config = config || {};
        config.instanceId = Ext.String.format('upload-{0}', ++Ext.ux.multiupload.Upload.instanceId);
        config.flashVars = config.flashVars || {};
        config.flashVars = Ext.apply({
            instanceId: config.instanceId,
            buttonImagePath: 'scripts/ext-ux/multiupload/button.png',
            buttonImageHoverPath: 'scripts/ext-ux/multiupload/button_hover.png',
            fileFilters: 'Images (*.jpg)|*.jpg',
            uploadUrl: 'Upload.ashx',
            maxFileSize: 0,
            maxQueueLength: 0,
            maxQueueSize: 0,
            callback: 'Ext.ux.multiupload.UploadManager.uploadCallback'
        }, config.uploadConfig);

        this.addEvents(
            'fileadded',
            'uploadstart',
            'uploadprogress',
            'uploadcomplete',
            'uploaddatacomplete',
            'queuecomplete',
            'queuedatacomplete',
            'uploaderror'
        );

        this.callParent([config]);
    },
    initComponent: function () {
        Ext.ux.multiupload.UploadManager.register(this);
        this.callParent(arguments);
    },
    onDestroy: function () {
        Ext.ux.multiupload.UploadManager.unregister(this);
        this.callParent(arguments);
    }
});
