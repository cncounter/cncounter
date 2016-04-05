/**
 * @author Shea Frederick - http://www.vinylfox.com
 * @class Ext.ux.form.HtmlEditor.Image
 * @extends Ext.util.Observable
 * <p>A plugin that creates an image button in the HtmlEditor toolbar for inserting an image. The method to select an image must be defined by overriding the selectImage method. Supports resizing of the image after insertion.</p>
 * <p>The selectImage implementation must call insertImage after the user has selected an image, passing it a simple image object like the one below.</p>
 * <pre>
 *      var img = {
 *         Width: 100,
 *         Height: 100,
 *         ID: 123,
 *         Title: 'My Image'
 *      };
 * </pre>
 */
Ext.define('Ext.ux.form.HtmlEditor.Image', {
    mixins: {
        observable: 'Ext.util.Observable'
    },
    // Image language text
    langTitle: 'Insert Image',
    urlSizeVars: ['width', 'height'],
    basePath: 'image.php',
    init: function (cmp) {
        this.cmp = cmp;
        this.cmp.on('render', this.onRender, this);
        this.cmp.on('initialize', this.onInit, this, { delay: 100, single: true });
    },
    onEditorMouseUp: function (e) {
        Ext.get(e.getTarget()).select('img').each(function (el) {
            var w = el.getAttribute('width'), h = el.getAttribute('height'), src = el.getAttribute('src') + ' ';
            src = src.replace(new RegExp(this.urlSizeVars[0] + '=[0-9]{1,5}([&| ])'), this.urlSizeVars[0] + '=' + w + '$1');
            src = src.replace(new RegExp(this.urlSizeVars[1] + '=[0-9]{1,5}([&| ])'), this.urlSizeVars[1] + '=' + h + '$1');
            el.set({ src: src.replace(/\s+$/, "") });
        }, this);

    },
    onInit: function () {
        Ext.EventManager.on(this.cmp.getDoc(), {
            'mouseup': this.onEditorMouseUp,
            buffer: 100,
            scope: this
        });
    },
    onRender: function () {
        var btn = this.cmp.getToolbar().add({
            iconCls: 'x-edit-image',
            handler: this.selectImage,
            scope: this,
            tooltip: this.langTitle,
            overflowText: this.langTitle
        });
    },
    selectImage: function () {
        var me = this;
        var upload = Ext.create('Ext.ux.multiupload.Panel', {
            width: 600,
            height: 300,
            border: false,
            frame: false,
            uploadConfig: {
                uploadUrl: '/admin/Upload.ashx',
                maxFileSize: 4 * 1024 * 1024,
                maxQueueLength: 5
            }
        });
        upload.on('fileuploadcomplete', function (id) {
            me.insertImage(id);
        });

        Ext.create('Ext.window.Window', {
            autoShow: true,
            modal: true,
            title: '插入图片',
            items: upload
        });
    },
    insertImage: function (img) {
        this.cmp.insertAtCursor('<img src="' + img + '" alt="' + img + '">');
    }
});