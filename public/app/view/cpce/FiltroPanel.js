Ext.define('App.view.cpce.FiltroPanel', {
    extend: 'Ext.tab.Panel',
    xtype: 'filtroPanel',
    id: 'filtroPanel',
    width: 220,
    region: 'lest',
    layout: 'fit',
    constructor: function() {
        var me = this;

        Ext.applyIf(me, {

            items:[
                {
                    xtype: 'panel',
                    title: 'Fornecedor',
                    scrollable: true,
                    items: [
                        {
                            xtype: 'form',
                            items: [
                                {
                                    xtype: 'fieldset',
                                    title: 'Fornecedor',
                                    layout: {
                                        type: 'hbox',
                                        align: 'middle'
                                    },
                                    defaults: {
                                        margin: '6 2 2 2'
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            name: 'fornecedor',
                                            emptyText: 'Fornecedor',
                                            width: 140
                                        },
                                        {
                                            xtype: 'button',
                                            iconCls: 'fa fa-file',
                                            tooltip: 'Limpar',
                                            handler: function(form) {
        
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldset',
                                    title: 'Produto',
                                    layout: {
                                        type: 'hbox',
                                        align: 'middle'
                                    },
                                    defaults: {
                                        margin: '6 2 2 2'
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            name: 'produto',
                                            emptyText: 'Produto',
                                            width: 140
                                        },
                                        {
                                            xtype: 'button',
                                            iconCls: 'fa fa-file',
                                            tooltip: 'Limpar',
                                            handler: function(form) {
        
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldset',
                                    title: 'Curva',
                                    layout: {
                                        type: 'hbox',
                                        align: 'middle'
                                    },
                                    items: [
                                        {
                                            xtype: 'combobox',
                                            name: 'curva',
                                            emptyText: 'Curva',
                                            width: 100,
                                            margin: '6 2 2 2',
                                            store: Ext.create('Ext.data.Store', {
                                                        fields: ['curva', 'name'],
                                                        data : [
                                                            {"curva":"A", "name":"A"},
                                                            {"curva":"B", "name":"B"},
                                                            {"curva":"C", "name":"C"}
                                                        ]
                                            }),
                                            queryMode: 'local',
                                            displayField: 'name',
                                            valueField: 'curva'
                                        },
                                        {
                                            xtype: 'button',
                                            iconCls: 'fa fa-file',
                                            tooltip: 'Limpar',
                                            margin: '6 2 2 42',
                                            handler: function(form) {
        
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldset',
                                    title: 'Faixa de Clientes',
                                    layout: {
                                        type: 'hbox',
                                        align: 'middle'
                                    },
                                    items: [
                                        {
                                            xtype: 'combobox',
                                            name: 'faixacli',
                                            emptyText: 'Faixa',
                                            width: 100,
                                            margin: '6 2 2 2',
                                            store: Ext.create('Ext.data.Store', {
                                                        fields: ['faixacli', 'name'],
                                                        data : [
                                                            {"faixacli":"1000", "name":"1000"},
                                                            {"faixacli":"2000", "name":"2000"},
                                                            {"faixacli":"500", "name":"500"},
                                                            {"faixacli":"100", "name":"100"},
                                                            {"faixacli":"50", "name":"6-50"}
                                                        ]
                                            }),
                                            queryMode: 'local',
                                            displayField: 'name',
                                            valueField: 'faixacli'
                                        },
                                        {
                                            xtype: 'button',
                                            iconCls: 'fa fa-file',
                                            tooltip: 'Limpar',
                                            margin: '6 2 2 42',
                                            handler: function(form) {
        
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldset',
                                    title: 'Data última Entrada',
                                    layout: {
                                        type: 'hbox',
                                        align: 'middle'
                                    },
                                    items: [
                                        {
                                            xtype: 'datefield',
                                            name: 'dtultima',
                                            id: 'dtultima',
                                            margin: '2 2 2 2',
                                            width: 132,
                                            labelWidth: 20,
                                            format: 'd/m/Y',
                                            altFormats: 'dmY',
                                            emptyText: '__/__/____'
                                        },
                                        {
                                            xtype: 'button',
                                            iconCls: 'fa fa-file',
                                            tooltip: 'Limpar',
                                            margin: '6 2 2 10',
                                            handler: function(form) {
        
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldset',
                                    title: '% Variação x ùltima entrada',
                                    layout: {
                                        type: 'hbox',
                                        align: 'middle'
                                    },
                                    defaults: {
                                        margin: '6 2 2 2'
                                    },
                                    items: [
                                        {
                                            xtype: 'numberfield',
                                            name: 'variaUltentrada',
                                            width: 140
                                        },
                                        {
                                            xtype: 'button',
                                            iconCls: 'fa fa-file',
                                            tooltip: 'Limpar',
                                            handler: function(form) {
        
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldset',
                                    title: '% Variação x último custo do ano anterior',
                                    layout: {
                                        type: 'hbox',
                                        align: 'middle'
                                    },
                                    defaults: {
                                        margin: '6 2 2 2'
                                    },
                                    items: [
                                        {
                                            xtype: 'numberfield',
                                            name: 'variaUltcusto',
                                            width: 140
                                        },
                                        {
                                            xtype: 'button',
                                            iconCls: 'fa fa-file',
                                            tooltip: 'Limpar',
                                            handler: function(form) {
        
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldset',
                                    title: '% Variação x custo médio ano anterior',
                                    layout: {
                                        type: 'hbox',
                                        align: 'middle'
                                    },
                                    defaults: {
                                        margin: '6 2 2 2'
                                    },
                                    items: [
                                        {
                                            xtype: 'numberfield',
                                            name: 'variaCustomedio',
                                            width: 140
                                        },
                                        {
                                            xtype: 'button',
                                            iconCls: 'fa fa-file',
                                            tooltip: 'Limpar',
                                            handler: function(form) {
        
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldset',
                                    title: '% Variação x emergencial médio ano anterior',
                                    layout: {
                                        type: 'hbox',
                                        align: 'middle'
                                    },
                                    defaults: {
                                        margin: '6 2 2 2'
                                    },
                                    items: [
                                        {
                                            xtype: 'numberfield',
                                            name: 'variaEmergmedio',
                                            width: 140
                                        },
                                        {
                                            xtype: 'button',
                                            iconCls: 'fa fa-file',
                                            tooltip: 'Limpar',
                                            handler: function(form) {
        
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldset',
                                    title: '% Variação x emergencial últimos 3 meses ',
                                    layout: {
                                        type: 'hbox',
                                        align: 'middle'
                                    },
                                    defaults: {
                                        margin: '6 2 2 2'
                                    },
                                    items: [
                                        {
                                            xtype: 'numberfield',
                                            name: 'varia3mes',
                                            width: 140
                                        },
                                        {
                                            xtype: 'button',
                                            iconCls: 'fa fa-file',
                                            tooltip: 'Limpar',
                                            handler: function(form) {
        
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldset',
                                    title: '% Variação x emergencial últimos 6 meses ',
                                    layout: {
                                        type: 'hbox',
                                        align: 'middle'
                                    },
                                    defaults: {
                                        margin: '6 2 2 2'
                                    },
                                    items: [
                                        {
                                            xtype: 'numberfield',
                                            name: 'varia6mes',
                                            width: 140
                                        },
                                        {
                                            xtype: 'button',
                                            iconCls: 'fa fa-file',
                                            tooltip: 'Limpar',
                                            handler: function(form) {
        
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldset',
                                    title: '% Variação x emergencial últimos 12 meses ',
                                    layout: {
                                        type: 'hbox',
                                        align: 'middle'
                                    },
                                    defaults: {
                                        margin: '6 2 2 2'
                                    },
                                    items: [
                                        {
                                            xtype: 'numberfield',
                                            name: 'varia12mes',
                                            width: 140
                                        },
                                        {
                                            xtype: 'button',
                                            iconCls: 'fa fa-file',
                                            tooltip: 'Limpar',
                                            handler: function(form) {
        
                                            }
                                        }
                                    ]
                                }
        
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    title: 'Informações'
                }
            ]
            

        });

        me.callParent(arguments);
    }

});
