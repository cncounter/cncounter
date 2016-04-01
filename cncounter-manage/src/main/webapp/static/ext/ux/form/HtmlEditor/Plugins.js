/**
 * @author Shea Frederick - http://www.vinylfox.com
 * @class Ext.ux.form.HtmlEditor.plugins
 * <p>A convenience function that returns a standard set of HtmlEditor buttons.</p>
 * <p>Sample usage:</p>
 * <pre><code>
    new Ext.FormPanel({
        ...
        items : [{
            ...
            xtype           : "htmleditor",
            plugins         : Ext.ux.form.HtmlEditor.plugins()
        }]
    });
 * </code></pre>
 */
Ext.ux.form.HtmlEditor.plugins = function(){
    return [
        Ext.create('Ext.ux.form.HtmlEditor.Link'),
        Ext.create('Ext.ux.form.HtmlEditor.Divider'),
        Ext.create('Ext.ux.form.HtmlEditor.Word'),
        Ext.create('Ext.ux.form.HtmlEditor.FindAndReplace'),
        Ext.create('Ext.ux.form.HtmlEditor.UndoRedo'),
        Ext.create('Ext.ux.form.HtmlEditor.Divider'),
        Ext.create('Ext.ux.form.HtmlEditor.Image'),
        Ext.create('Ext.ux.form.HtmlEditor.Table'),
        Ext.create('Ext.ux.form.HtmlEditor.HR'),
        Ext.create('Ext.ux.form.HtmlEditor.SpecialCharacters'),
        Ext.create('Ext.ux.form.HtmlEditor.IndentOutdent'),
        Ext.create('Ext.ux.form.HtmlEditor.SubSuperScript'),
        Ext.create('Ext.ux.form.HtmlEditor.RemoveFormat')
    ];
};