/**
 * @author Shea
 */

Ext.onReady(function(){

    Ext.QuickTips.init();

    new Ext.FormPanel({
        title       : 'HtmlEditor Plugins Form',
        renderTo    : 'test',
        width       : 950,
        height      : 400,
        border      : false,
        frame       : true,
        items       : [{
            hideLabel       : true,
            labelSeparator  : '',
            name            : 'description',
            value           : 'The quick brown fox jumps over the fence<br/><img src="training.jpg" width="300" height="200"/>',
            anchor          : '100% 100%',
            xtype           : "htmleditor",
            plugins         : Ext.ux.form.HtmlEditor.plugins()
        }],
        buttons     : [{
            text            : 'Save'
        }]
    });
    
 });