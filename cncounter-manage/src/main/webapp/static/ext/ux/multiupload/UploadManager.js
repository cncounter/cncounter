Ext.define('Ext.ux.multiupload.UploadManager', {
    extend: 'Ext.util.MixedCollection',
    singleton: true,
    register: function (item) {
        this.add(item);
    },
    unregister: function (item) {
        this.remove(item);
    },
    getKey: function (o) {
        return o.instanceId;
    },
    uploadCallback: function (id, data) {
        var item = this.get(id);
        if (item) {
            switch (data.event) {
                case 'fileAdded': item.fireEvent('fileadded', item, data); break;
                case 'fileOpen': item.fireEvent('uploadstart', item, data); break;
                case 'uploadProgress': item.fireEvent('uploadprogress', item, data); break;
                case 'uploadComplete': item.fireEvent('uploadcomplete', item, data); break;
                case 'uploadCompleteData': item.fireEvent('uploaddatacomplete', item, data); break;
                case 'queueUploadComplete': item.fireEvent('queuecomplete', item, data); break;
                case 'queueUploadDataComplete': item.fireEvent('queuedatacomplete', item, data); break;
                case 'uploadError': item.fireEvent('uploaderror', item, data); break;
            }
        }
    }
});
