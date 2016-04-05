/**
 * @author Shea Frederick - http://www.vinylfox.com
 * @class Ext.ux.form.HtmlEditor.RemoveFormat
 * @extends Ext.ux.form.HtmlEditor.MidasCommand
 * <p>A plugin that creates a button on the HtmlEditor that will remove all formatting on selected text.</p>
 */
Ext.define('Ext.ux.form.HtmlEditor.RemoveFormat', {
    mixins: {
        observable: 'Ext.ux.form.HtmlEditor.MidasCommand'
    },
    midasBtns: ['|', {
        enableOnSelection: true,
        cmd: 'removeFormat',
        tooltip: {
            text: 'Remove Formatting'
        },
        overflowText: 'Remove Formatting'
    }]
});
