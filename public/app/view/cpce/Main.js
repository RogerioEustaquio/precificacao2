Ext.define('App.view.cpce.Main', {
    extend: 'Ext.container.Container',
    xtype: 'cpcemain',
    id: 'cpcemain',
    itemId: 'cpcemain',
    requires: [
    ],
    title: 'Comparativo custo compra emergencial',
    layout: 'border',

    constructor: function() {
        var me = this;
        
        Ext.applyIf(me, {
            style: {
                background:'#ffffff !important'
            },
            items: [
                { 
                    xtype: 'CpCeToolbar',
                    region: 'north',
                },
                {
                    xtype: 'container',
                    id: 'container1',
                    idItem: 'container1',
                    region: 'center',
                    layout: {
                        type: 'hbox'
                    },
                    defaults:{
                        border: false,
                        margin: '1 1 1 1',
                        height : '100%',
                    },
                    items:[
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            defaults:{
                                border: true,
                                margin: '1 1 1 1',
                                height : '100%',
                            },
                            items:[
                                {
                                    xtype: 'filtroPanel',
                                    hidden: true
                                },
                                {
                                    xtype: 'cpcegrid',
                                    flex: 1
                                }
                            ]
                        }
                    ]
                }
            ]

        });

        me.callParent(arguments);
    }
    
});
