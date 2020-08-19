Ext.define('App.view.cpcf.Main', {
    extend: 'Ext.container.Container',
    xtype: 'cpcfmain',
    id: 'cpcfmain',
    itemId: 'cpcfmain',
    requires: [
    ],
    title: 'Comparativo custo fábrica',
    layout: 'border',

    constructor: function() {
        var me = this;
        
        Ext.applyIf(me, {
            style: {
                background:'#ffffff !important'
            },
            items: [
                {
                    xtype: 'CpCfToolbar',
                    region: 'north',
                },
                {
                    xtype: 'container',
                    id: 'containergrids2',
                    region: 'center',
                    layout: 'fit'
                }
            ]

        });

        me.callParent(arguments);
    }
    
});
