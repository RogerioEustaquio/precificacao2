Ext.define('App.view.cpcf.ItemGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'ItemGridf',
    id: 'ItemGridf',
    margin: '1 1 1 1',
    requires: [
        'Ext.toolbar.Paging',
        'Ext.grid.feature.GroupingSummary',
        'Ext.ux.util.Format'
    ],
    
    bbar: {
        xtype: 'pagingtoolbar',
        displayInfo: true,
        displayMsg: 'Exibindo solicitações {0} - {1} de {2}',
        emptyMsg: "Não há solicitações a serem exibidos"
    },
    store: Ext.create('Ext.data.Store', {
                model: Ext.create('Ext.data.Model', {
                            fields:[{name:'emp',mapping:'emp'},
                                    {name:'operacao',mapping:'operacao'},
                                    {name:'dataEmissao',mapping:'dataEmissao'},
                                    {name:'dataEntrada',mapping:'dataEntrada'},
                                    {name:'cnpj',mapping:'cnpj'},
                                    {name:'nome',mapping:'nome'},
                                    {name:'numeroNota',mapping:'numeroNota'}
                                    ]
                }),
                pageSize: 50,
                autoLoad: false,
                proxy: {
                    type: 'ajax',
                    method:'POST',
                    url : BASEURL + '/api/CpCe/listaritem',
                    timeout: 240000,
                    reader: {
                        type: 'json',
                        rootProperty: 'data',
                        totalProperty: 'total'
                    }
                },
                groupField: 'numeroNota'
    }),
    columns: [
        {
            text: 'Emp',
            dataIndex: 'emp',
            width: 52,
            summaryType: 'count'
        },
        {
            text: 'Operação',
            dataIndex: 'operacao',
            width: 120
            
        },
        {
            text: 'Data <br> Emissão',
            dataIndex: 'dataEmissao',
            width: 100
        },
        {
            text: 'Data <br> Entrada',
            dataIndex: 'dataEntrada',
            width: 110
        },
        {
            text: 'Cnpj',
            dataIndex: 'cnpj',
            width: 130
        },
        {
            text: 'Nome',
            dataIndex: 'nome',
            minWidth: 60,
            flex: 1
        }
    ],
    features: [
        {
            groupHeaderTpl: "{name}",
            ftype: 'groupingsummary'
        }
    ]

});
