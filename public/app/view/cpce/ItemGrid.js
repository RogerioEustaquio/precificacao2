Ext.define('App.view.cpce.ItemGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'ItemGrid',
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
                                    {name:'qdteAnterior',mapping:'qtdeAnterior', type: 'number'},
                                    {name:'qdteOperacao',mapping:'qtdeOperacao', type: 'number'},
                                    {name:'qtdeResultante',mapping:'qtdeResultante', type: 'number'},
                                    {name:'custoUltAnoAnterior',mapping:'custoUltAnoAnterior', type: 'number'},
                                    {name:'custoMedAnoAnterior',mapping:'custoMedAnoAnterior', type: 'number'},
                                    {name:'custoMedEAnoAnterior',mapping:'custoMedEAnoAnterior', type: 'number'},
                                    {name:'custoMedE_12mAnterior',mapping:'custoMedE_12mAnterior', type: 'number'},
                                    {name:'custoMedE_6mAnterior',mapping:'custoMedE_6mAnterior', type: 'number'},
                                    {name:'custoMedE_3mAnterior',mapping:'custoMedE_3mAnterior', type: 'number'},

                                    {name:'vOpeAnterior',mapping:'vOpeAnterior', type: 'number'},
                                    {name:'vOpeUltAnoAnterior',mapping:'vOpeUltAnoAnterior', type: 'number'},
                                    {name:'vOpeMedAnoAnterior',mapping:'vOpeMedAnoAnterior', type: 'number'},
                                    {name:'vOpeMedEAnoAnterior',mapping:'vOpeMedEAnoAnterior', type: 'number'},
                                    {name:'vOpeMedE_12mAnterior',mapping:'vOpeMedE_12mAnterior', type: 'number'},
                                    {name:'vOpeMedE_6mAnterior',mapping:'vOpeMedE_6mAnterior', type: 'number'},
                                    {name:'vOpeMedE_3mAnterior',mapping:'vOpeMedE_3mAnterior', type: 'number'}
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
            width: 130
        },
        {
            text: 'Nome',
            dataIndex: 'nome',
            minWidth: 60,
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
            summaryType: 'min'
        },
        {
            text: 'Marca',
            dataIndex: 'marca',
            width: 74
        },
        {
            text: 'Código',
            dataIndex: 'codItem',
            width: 110
        },
        {
            text: 'Descrição',
            dataIndex: 'descricao',
            minWidth: 86,
            flex:1
        },
        {
            text: 'Dt. Compra Ant.',
            dataIndex: 'dataCompraAnterior',
            width: 120
        },
        {
            text: 'Custo',
            columns:[
                {
                    text: 'Anterior',
                    dataIndex: 'custoAnterior',
                    width: 80,
                    renderer: function (v) {
                        var utilFormat = Ext.create('Ext.ux.util.Format');
                        v = (v ? utilFormat.Value(v) : null);
                        return v;
                    }
                },
                {
                    text: 'Operação',
                    dataIndex: 'custoOperacao',
                    width: 82,
                    renderer: function (v) {
                        var utilFormat = Ext.create('Ext.ux.util.Format');
                        v = (v ? utilFormat.Value(v) : null);
                        return v;
                    }
                },
                {
                    text: 'Resultante',
                    dataIndex: 'custoResultante',
                    width: 90,
                    renderer: function (v) {
                        var utilFormat = Ext.create('Ext.ux.util.Format');
                        v = (v ? utilFormat.Value(v) : null);
                        return v;
                    }
                },
                {
                    text: 'Ano Ant.',
                    dataIndex: 'custoUltAnoAnterior',
                    width: 80,
                    renderer: function (v) {
                        var utilFormat = Ext.create('Ext.ux.util.Format');
                        v = (v ? utilFormat.Value(v) : null);
                        return v;
                    }
                },
                {
                    text: 'Med. Ano Ant.',
                    dataIndex: 'custoMedanoAnterior',
                    width: 120,
                    renderer: function (v) {
                        var utilFormat = Ext.create('Ext.ux.util.Format');
                        v = (v ? utilFormat.Value(v) : null);
                        return v;
                    }
                },
                {
                    text: 'Med. Emerg. Ano Ant.',
                    dataIndex: 'custoMedEAnoAnterior',
                    width: 156,
                    renderer: function (v) {
                        var utilFormat = Ext.create('Ext.ux.util.Format');
                        v = (v ? utilFormat.Value(v) : null);
                        return v;
                    }
                },
                {
                    text: 'Med. 12 Mes. Ano Ant.',
                    dataIndex: 'custoMedE_12mAnterior',
                    width: 158,
                    renderer: function (v) {
                        var utilFormat = Ext.create('Ext.ux.util.Format');
                        v = (v ? utilFormat.Value(v) : null);
                        return v;
                    }
                },
                {
                    text: 'Med. 6 Mes. Ano Ant.',
                    dataIndex: 'custoMedE_6mAnterior',
                    width: 156,
                    renderer: function (v) {
                        var utilFormat = Ext.create('Ext.ux.util.Format');
                        v = (v ? utilFormat.Value(v) : null);
                        return v;
                    }
                },
                {
                    text: 'Med. 3 Mes. Ano Ant.',
                    dataIndex: 'custoMedE_3mAnterior',
                    width: 156,
                    renderer: function (v) {
                        var utilFormat = Ext.create('Ext.ux.util.Format');
                        v = (v ? utilFormat.Value(v) : null);
                        return v;
                    }
                }
            ]
        },
        {
            text: 'Variação',
            columns:[
                {
                    text: 'Anterior',
                    dataIndex: 'vOpeAnterior',
                    width: 80,
                    renderer: function (v, metaData, record) {

                        var idStatus = record.get('vOpeAnterior');
                        if (idStatus < 0)
                            metaData.tdCls = 'x-grid-cell-green-border';

                        if (idStatus > 0)
                            metaData.tdCls = 'x-grid-cell-red-border'; 

                        var utilFormat = Ext.create('Ext.ux.util.Format');
                        v = (idStatus < 0 || idStatus > 0 ? utilFormat.Value(v) : null);
                        return v;
                    }
                },
                {
                    text: 'Ano Ant.',
                    dataIndex: 'vOpeUltAnoAnterior',
                    width: 80,
                    renderer: function (v, metaData, record) {
                        var idStatus = record.get('vOpeUltAnoAnterior');
                        if (idStatus < 0)
                            metaData.tdCls = 'x-grid-cell-green-border';

                        if (idStatus > 0)
                            metaData.tdCls = 'x-grid-cell-red-border';

                        var utilFormat = Ext.create('Ext.ux.util.Format');
                        v = (idStatus < 0 || idStatus > 0 ? utilFormat.Value(v) : null);
                        return v;
                    }
                },
                {
                    text: 'Med. Ano Ant.',
                    dataIndex: 'vOpeMedAnoAnterior',
                    width: 120,
                    renderer: function (v, metaData, record) {
                        var idStatus = record.get('vOpeMedAnoAnterior');
                        if (idStatus < 0)
                            metaData.tdCls = 'x-grid-cell-green-border';

                        if (idStatus > 0)
                            metaData.tdCls = 'x-grid-cell-red-border';
                            
                        var utilFormat = Ext.create('Ext.ux.util.Format');
                        v = (idStatus < 0 || idStatus > 0 ? utilFormat.Value(v) : null);
                        return v;
                    }
                },
                {
                    text: 'Med. Emerg. Ano Ant.',
                    dataIndex: 'vOpeMedEAnoAnterior',
                    width: 156,
                    renderer: function (v, metaData, record) {
                        var idStatus = record.get('vOpeMedEAnoAnterior');
                        if (idStatus < 0)
                            metaData.tdCls = 'x-grid-cell-green-border';

                        if (idStatus > 0)
                            metaData.tdCls = 'x-grid-cell-red-border';
                            
                        var utilFormat = Ext.create('Ext.ux.util.Format');
                        v = (idStatus < 0 || idStatus > 0 ? utilFormat.Value(v) : null);
                        return v;
                    }
                },
                {
                    text: 'Med. 12 Mes. Ano Ant.',
                    dataIndex: 'vOpeMedE_12mAnterior',
                    width: 158,
                    renderer: function (v, metaData, record) {
                        var idStatus = record.get('vOpeMedE_12mAnterior');
                        if (idStatus < 0)
                            metaData.tdCls = 'x-grid-cell-green-border';

                        if (idStatus > 0)
                            metaData.tdCls = 'x-grid-cell-red-border';
                            
                        var utilFormat = Ext.create('Ext.ux.util.Format');
                        v = (idStatus < 0 || idStatus > 0 ? utilFormat.Value(v) : null);
                        return v;
                    }
                },
                {
                    text: 'Med. 6 Mes. Ano Ant.',
                    dataIndex: 'vOpeMedE_6mAnterior',
                    width: 156,
                    renderer: function (v, metaData, record) {
                        var idStatus = record.get('vOpeMedE_6mAnterior');
                        if (idStatus < 0)
                            metaData.tdCls = 'x-grid-cell-green-border';

                        if (idStatus > 0)
                            metaData.tdCls = 'x-grid-cell-red-border';
                            
                        var utilFormat = Ext.create('Ext.ux.util.Format');
                        v = (idStatus < 0 || idStatus > 0 ? utilFormat.Value(v) : null);
                        return v;
                    }
                },
                {
                    text: 'Med. 3 Mes. Ano Ant.',
                    dataIndex: 'vOpeMedE_3mAnterior',
                    width: 156,
                    renderer: function (v, metaData, record) {
                        var idStatus = record.get('vOpeMedE_3mAnterior');
                        if (idStatus < 0)
                            metaData.tdCls = 'x-grid-cell-green-border';

                        if (idStatus > 0)
                            metaData.tdCls = 'x-grid-cell-red-border';
                            
                        var utilFormat = Ext.create('Ext.ux.util.Format');
                        v = (idStatus < 0 || idStatus > 0 ? utilFormat.Value(v) : null);
                        return v;
                    }
                }
            ]
        }
        ,
        {
            text: 'Qt. Anterior',
            dataIndex: 'qtdeAnterior',
            width: 100
        },
        {
            text: 'Qt. Operação',
            dataIndex: 'qtdeOperacao',
            width: 110
        },
        {
            text: 'Qt. Resultante',
            dataIndex: 'qtdeResultante',
            width: 110
        }
    ],
    features: [
        {
            groupHeaderTpl: '{name}',
            ftype: 'groupingsummary'
        }
    ]

});
