Ext.define('App.view.cpcf.WindowNf', {
    extend: 'Ext.window.Window',
    xtype: 'WindowNf',
    id: 'WindowNf',
    height: 500,
    width: '90%',
    title: 'Notas',
    requires:[
        'App.view.cpcf.NfItensGrid'
    ],
    layout: 'fit',
    // scrollable: true,
    items: {
        xtype: 'panel',
        id: 'WindowNfPanel',
        layout: 'vbox',
        scrollable: true,
        width: '100%',
        items:[
            {
                xtype: 'form',
                height: 60,
                width: '100%',
                layout: {
                    type: 'hbox'
                },
                defaults: {
                    margin: '2 2 2 2',
                    labelAlign: 'top'
                },
                items:[
                    {
                        xtype: 'displayfield',
                        layout: 'ancho',
                        fieldLabel: 'Filial',
                        id: 'filial',
                        labelWidth: 30
                    },
                    {
                        xtype: 'displayfield',
                        layout: 'ancho',
                        fieldLabel: 'Fornecedor',
                        id: 'fornecedor',
                        labelWidth: 60
                    },
                    {
                        xtype: 'displayfield',
                        layout: 'ancho',
                        fieldLabel: 'Total',
                        id: 'total',
                        labelWidth: 32
                    }
                ]
            },
            {
                xtype: 'NfItensGrid'
            }
        ]
    }
});
