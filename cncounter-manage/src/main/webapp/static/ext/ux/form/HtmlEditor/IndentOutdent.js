/**
 * @author Shea Frederick - http://www.vinylfox.com
 * @class Ext.ux.form.HtmlEditor.IndentOutdent
 * @extends Ext.ux.form.HtmlEditor.MidasCommand
 * <p>A plugin that creates two buttons on the HtmlEditor for indenting and outdenting of selected text.</p>
 */
Ext.define('Ext.ux.form.HtmlEditor.IndentOutdent', {
    mixins: {
        observable: 'Ext.ux.form.HtmlEditor.MidasCommand'
    },
    // private
    midasBtns: ['|', {
        cmd: 'indent',
        tooltip: {
            text: 'Indent Text'
        },
        overflowText: 'Indent Text'
    }, {
        cmd: 'outdent',
        tooltip: {
            text: 'Outdent Text'
        },
        overflowText: 'Outdent Text'
    }]
});
