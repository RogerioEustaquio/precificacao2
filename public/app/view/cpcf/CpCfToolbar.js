Ext.define('App.view.cpcf.CpCfToolbar', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'CpCfToolbar',
    id: 'CpCfToolbar',
    itemId: 'CpCfToolbar',
    margin: '2 2 2 2',
    requires: [
    ],
    constructor: function() {
        var me = this;


        var btnSearch = Ext.create('Ext.button.Button',{
            
            iconCls: 'fa fa-search',
            tooltip: 'Consultar',
            margin: '1 1 1 1',
            handler: function(form) {

                console.log('Click Consulta');

            }
        });

        var btnClean = Ext.create('Ext.button.Button',{
            
            iconCls: 'fa fa-file',
            tooltip: 'Limpar',
            margin: '1 1 1 4',
            handler: function(form) {

                console.log('Click Limpar');

            }
        });

        Ext.applyIf(me, {

            items: [

                btnSearch,
                btnClean
            ]

        });

        me.callParent(arguments);

    }

});
