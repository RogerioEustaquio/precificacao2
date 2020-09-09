Ext.define('App.view.cpcf.WindowNf', {
    extend: 'Ext.window.Window',
    xtype: 'WindowNf',
    id: 'WindowNf',
    // closeAction: 'method-hide',
    height: 600,
    width: '90%',
    maximizable: true,
    title: 'Notas',
    requires:[
        'App.view.cpcf.NfItensGrid'
    ],
    layout: 'auto',
    items: {
        xtype: 'panel',
        id: 'WindowNfPanel',
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        height: '100%',
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
