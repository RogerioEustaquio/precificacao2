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
    
    store: Ext.create('Ext.data.Store', {
                model: Ext.create('Ext.data.Model', {
                            fields:[{name:'emp',mapping:'emp'},
                                    {name:'idMarca',mapping:'idMarca'},
                                    {name:'cnpj',mapping:'cnpj'},
                                    {name:'dataInicio',mapping:'dataInicio'},
                                    {name:'dataFim',mapping:'dataFim'},
                                    {name:'dataInicioe',mapping:'dataInicioe'},
                                    {name:'dataFime',mapping:'dataFime'},
                                    {name:'nome',mapping:'nome'},
                                    {name:'anteriorValor',mapping:'anteriorValor', type: 'number'},
                                    {name:'opeValor',mapping:'opeValor', type: 'number'},
                                    {name:'opeXAnteriorValor',mapping:'opeXAnteriorValor', type: 'number'},
                                    {name:'opeXAnteriorIdx',mapping:'opeXAnteriorIdx', type: 'number'}
                                    ]
                }),
                autoLoad: false,
                proxy: {
                    type: 'ajax',
                    method:'POST',
                    url : BASEURL + '/api/CpCf/listaritem',
                    timeout: 240000,
                    reader: {
                        type: 'json',
                        rootProperty: 'data'
                    }
                },
                groupField: 'nome'
    }),
    columns: [
        {
            text: 'Emp',
            dataIndex: 'emp',
            width: 52,
            summaryType: 'count'
        },
        {
            text: 'Nome',
            dataIndex: 'nome',
            minWidth: 60,
            flex: 1
        },
        {
            text: 'Anterior',
            dataIndex: 'anteriorValor',
            width: 100,
            hidden: true,
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
            text: 'Opereção',
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
            text: 'Variação Operação x Anterior',
            dataIndex: 'opeXAnteriorValor',
            width: 220,
            renderer: function (v, metaData, record) {
                var utilFormat = Ext.create('Ext.ux.util.Format');
                var idStatus = record.get('opeXAnteriorValor');

                if (idStatus < 0)
                    metaData.tdCls = 'x-grid-cell-green-border';

                if (idStatus > 0)
                    metaData.tdCls = 'x-grid-cell-red-border';
                
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

                return utilFormat.Value(total);
            }
        },
        {
            text: '% Operação x Anterior',
            dataIndex: 'opeXAnteriorIdx',
            width: 200,
            renderer: function (v, metaData, record) {
                var utilFormat = Ext.create('Ext.ux.util.Format');
                var idStatus = record.get('opeXAnteriorIdx');

                if (idStatus < 0)
                    metaData.tdCls = 'x-grid-cell-green-border';

                if (idStatus > 0)
                    metaData.tdCls = 'x-grid-cell-red-border';
                
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

                return utilFormat.Value(i);
            }
        }
    ],
    features: [
        {
            groupHeaderTpl: "{[values.rows[0].data.cnpj]} - {name} ",
            ftype: 'groupingsummary'
        }
    ]

});
