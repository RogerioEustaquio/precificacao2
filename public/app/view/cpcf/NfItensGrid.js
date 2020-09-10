Ext.define('App.view.cpcf.NfItensGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'NfItensGrid',
    id: 'NfItensGrid',
    margin: '1 1 1 1',
    width: '100%',
    // scrollable: true,
    requires: [
        'Ext.grid.feature.GroupingSummary',
        'Ext.ux.util.Format'
    ],
    constructor: function() {
        var me = this;
        var utilFormat = Ext.create('Ext.ux.util.Format');

        Ext.applyIf(me, {

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
                                            {name:'opeValor',mapping:'opeValor', type: 'number'},
                                            {name:'opeQtde',mapping:'opeQtde', type: 'number'},
                                            {name:'opeXAnteriorValor',mapping:'opeXAnteriorValor', type: 'number'},
                                            {name:'opeXAnteriorIdx',mapping:'opeXAnteriorIdx', type: 'number'}
                                            ]
                        }),
                        autoLoad: false,
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
                    width: 100,
                    hidden: true
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
                    hidden: false
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
                    renderer: function (v, metaData, record) {
                        var idStatus = record.get('anteriorValor');
                            
                        v = (idStatus < 0 || idStatus > 0 ? utilFormat.Value(v) : null);
                        return v;
                    },
                    summaryType: function(records, values) {

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
                    renderer: function (v, metaData, record, store) {
        
                        return utilFormat.Value(v);
                    },
                    summaryType: function(records, values) {

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
                    renderer: function (v, metaData, record) {
                        var idStatus = record.get('opeXAnteriorValor');
                        if (idStatus < 0)
                            metaData.tdCls = 'x-grid-cell-green-border';

                        if (idStatus > 0)
                            metaData.tdCls = 'x-grid-cell-red-border';
                            
                        var utilFormat = Ext.create('Ext.ux.util.Format');
                        v = (idStatus < 0 || idStatus > 0 ? utilFormat.Value(v) : null);
                        return v;
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

                        total = (total < 0 || total > 0 ? utilFormat.Value(total) : null);

                        return total;
                    }
                },
                {
                    text: '% Operação x Anterior',
                    dataIndex: 'opeXAnteriorIdx',
                    width: 200,
                    renderer: function (v, metaData, record) {
                        var idStatus = record.get('opeXAnteriorIdx');
                        if (idStatus < 0)
                            metaData.tdCls = 'x-grid-cell-green-border';

                        if (idStatus > 0)
                            metaData.tdCls = 'x-grid-cell-red-border';
                            
                        var utilFormat = Ext.create('Ext.ux.util.Format');
                        v = (idStatus < 0 || idStatus > 0 ? utilFormat.Value(v) : null);
                        return v;
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
                            if(record.get('opeValor'))
                                totalOpe += parseFloat(record.get('opeValor'));
                            if(record.get('anteriorValor'))
                                totalAnt += parseFloat(record.get('anteriorValor'));
                        }

                        i = (totalOpe/totalAnt-1)*100;
                        i = (i <= -0.01 || i >= 0.01 ? utilFormat.Value(i) : null);

                        return i;
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

        me.callParent(arguments);

    }

});
