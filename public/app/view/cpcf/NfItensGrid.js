Ext.define('App.view.cpcf.NfItensGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'NfItensGrid',
    id: 'NfItensGrid',
    margin: '1 1 1 1',
    width: '100%',
    scrollable: true,
    requires: [
        'Ext.grid.feature.GroupingSummary',
        'Ext.ux.util.Format'
    ],
    store: Ext.create('Ext.data.Store', {
                model: Ext.create('Ext.data.Model', {
                            fields:[{name:'emp',mapping:'emp'},
                                    {name:'numeroNota',mapping:'numeroNota'},
                                    {name:'dataEmissao',mapping:'dataEmissao'},
                                    {name:'dataEntrada',mapping:'dataEntrada'},
                                    {name:'nome',mapping:'nome'},
                                    {name:'codItem',mapping:'codItem'},
                                    {name:'descricao',mapping:'descricao'},
                                    {name:'marca',mapping:'marca'},
                                    {name:'anteriorValor',mapping:'anteriorValor', type: 'number'},
                                    {name:'opeValor',mapping:'opeValor', type: 'number'},,
                                    {name:'opeQtde',mapping:'opeQtde', type: 'number'},
                                    {name:'opeXAnteriorValor',mapping:'opeXAnteriorValor', type: 'number'},
                                    {name:'opeXAnteriorIdx',mapping:'opeXAnteriorIdx', type: 'number'}
                                    ]
                }),
                autoLoad: true,
                proxy: {
                    type: 'ajax',
                    method:'POST',
                    url : BASEURL + '/api/CpCf/listarnfitens',
                    timeout: 240000,
                    reader: {
                        type: 'json',
                        rootProperty: 'data'
                    }
                },
                groupField: 'numeroNota'
    }),
    columns: [
        {
            text: 'Emp',
            dataIndex: 'emp',
            width: 52,
            summaryType: 'count',
            hidden: true
        },
        {
            text: 'Nota',
            dataIndex: 'numeroNota',
            width: 100
        },
        {
            text: 'Emissão',
            dataIndex: 'dataEmissao',
            width: 80,
            hidden: true
        },
        {
            text: 'Entrada',
            dataIndex: 'dataEntrada',
            width: 80,
            hidden: true
        },
        {
            text: 'Nome',
            dataIndex: 'nome',
            minWidth: 60,
            flex: 1,
            hidden: true
        },
        {
            text: 'Item',
            dataIndex: 'codItem',
            width: 100
        },
        {
            text: 'Descrição',
            dataIndex: 'descricao',
            minWidth: 60,
            flex: 1
        },
        {
            text: 'Marca',
            dataIndex: 'marca',
            width: 80
        },
        {
            text: 'Anterior',
            dataIndex: 'anteriorValor',
            width: 100,
            renderer: function (v) {
                var utilFormat = Ext.create('Ext.ux.util.Format');
                return utilFormat.Value(v);
            },
            summaryType: function(records, values) {
                var utilFormat = Ext.create('Ext.ux.util.Format');
                var i = 0,
                    length = records.length,
                    total = 0,
                    record;

                for (; i < length; ++i) {
                    record = records[i];
                    total += parseFloat(record.get('anteriorValor'));
                }

                return utilFormat.Value(total);
            }
        },
        {
            text: 'Operação',
            dataIndex: 'opeValor',
            width: 100,
            renderer: function (v) {
                var utilFormat = Ext.create('Ext.ux.util.Format');
                return utilFormat.Value(v);
            },
            summaryType: function(records, values) {
                var utilFormat = Ext.create('Ext.ux.util.Format');
                var i = 0,
                    length = records.length,
                    total = 0,
                    record;

                for (; i < length; ++i) {
                    record = records[i];
                    total += parseFloat(record.get('opeValor'));
                }

                return utilFormat.Value(total);
            }
        },
        {
            text: 'Quantidade',
            dataIndex: 'opeQtde',
            width: 100
        },
        {
            text: 'Operação x Anterior',
            dataIndex: 'opeXAnteriorValor',
            width: 200,
            renderer: function (v) {
                var utilFormat = Ext.create('Ext.ux.util.Format');
                return utilFormat.Value(v);
            },
            summaryType: function(records, values) {
                var utilFormat = Ext.create('Ext.ux.util.Format');
                var i = 0,
                    length = records.length,
                    total = 0,
                    record;

                for (; i < length; ++i) {
                    record = records[i];
                    total += parseFloat(record.get('opeXAnteriorValor'));
                }

                return utilFormat.Value(total);
            }
        },
        {
            text: '% Operação x Anterior',
            dataIndex: 'opeXAnteriorIdx',
            width: 200,
            renderer: function (v) {
                var utilFormat = Ext.create('Ext.ux.util.Format');
                return utilFormat.Value(v);
            },
            summaryType: function(records, values) {
                var utilFormat = Ext.create('Ext.ux.util.Format');
                var i = 0,
                    length = records.length,
                    totalOpe = 0,
                    totalAnt = 0,
                    record;

                for (; i < length; ++i) {
                    record = records[i];
                    totalOpe += parseFloat(record.get('opeValor'));
                    totalAnt += parseFloat(record.get('opeXAnteriorValor'));
                }

                i = (totalAnt/totalOpe)*100 ;

                return utilFormat.Value(i);
            }
        }
    ],
    features: [
        {
            groupHeaderTpl: "{[values.rows[0].data.cnpj]} {name} ",
            ftype: 'groupingsummary'
        }
    ]

});
