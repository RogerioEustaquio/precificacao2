Ext.define('App.view.cpce.ItemGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'ItemGrid',
    // columnLines: true,
    // selType: 'checkboxmodel',
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
                                    {name:'numeroNota',mapping:'numeroNota'},
                                    {name:'valorNota',mapping:'valorNota',type:'number'},
                                    {name:'marca',mapping:'marca'},
                                    {name:'codItem',mapping:'codItem'},
                                    {name:'descricao',mapping:'descricao'},
                                    {name:'dataCompraAnterior',mapping:'dataCompraAnterior'},
                                    {name:'custoAnterior',mapping:'custoAnterior', type: 'number'},
                                    {name:'custoOperacao',mapping:'custoOperacao', type: 'number'},
                                    {name:'custoResultante',mapping:'custoResultante', type: 'number'},
                                    {name:'varCustoOperAnterior',mapping:'varCustoOperAnterior', type: 'number'},
                                    {name:'qdteAnterior',mapping:'qtdeAnterior', type: 'number'},
                                    {name:'qdteOperacao',mapping:'qtdeOperacao', type: 'number'},
                                    {name:'qtdeResultante',mapping:'qtdeResultante', type: 'number'}
                                    ]
                }),
                pageSize: 50,
                autoLoad: true,
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
                groupField: 'numeroNota',
                // grouper: {
                //     property: 'numeroNota'
                // }
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
            text: 'Dt. Emissão',
            dataIndex: 'dataEmissao',
            width: 100
        },
        {
            text: 'Dt. Entrada',
            dataIndex: 'dataEntrada',
            width: 110
        },
        {
            text: 'Cnpj',
            dataIndex: 'cnpj',
            width: 110
        },
        {
            text: 'Nome',
            dataIndex: 'nome',
            flex: 1
        },
        {
            text: 'Nota',
            dataIndex: 'numeroNota',
            width: 84
        },
        {
            text: 'Valor Nota',
            dataIndex: 'valorNota',
            width: 100,          
            renderer: function (v) {
                var utilFormat = Ext.create('Ext.ux.util.Format');
                return utilFormat.Value(v);
            },
            summaryType: function(records) {
                var i = 0,
                    length = records.length,
                    total = 0,
                    record;

                for (; i < length; ++i) {
                    record = records[i];
                    total = parseFloat(total) +  parseFloat(record.get('valorNota'));
                }

                var utilFormat = Ext.create('Ext.ux.util.Format');
                return utilFormat.Value(total);
            }
        },
        {
            text: 'Marca',
            dataIndex: 'marca',
            width: 74
        },
        {
            text: 'Código',
            dataIndex: 'cdItem',
            width: 74
        },
        {
            text: 'Descrição',
            dataIndex: 'descricao',
            width: 74
        },
        {
            text: 'Dt. Compra Ant.',
            dataIndex: 'dataCompraAnterior',
            width: 120
        },
        {
            text: 'Custo Anterior',
            dataIndex: 'custoAnterior',
            width: 120
        },
        {
            text: 'Custo Operação',
            dataIndex: 'custoOperacao',
            width: 130
        },
        {
            text: 'Custo Resultante',
            dataIndex: 'custoResultante',
            width: 130
        },
        {
            text: 'Var. Custo Ant.',
            dataIndex: 'varCustoOperAnterior',
            width: 120
        },
        {
            text: 'Qt. Anterior',
            120: 'qtdeAnterior',
            width: 74
        },
        {
            text: 'Qt. Operação',
            dataIndex: 'qtdeOperacao',
            width: 120
        },
        {
            text: 'Qt. Resultante',
            dataIndex: 'qtdeResultante',
            width: 120
        }
    ],
    features: [
        {
            groupHeaderTpl: '{name}',
            ftype: 'groupingsummary'
        }
    ]

});
