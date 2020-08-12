Ext.define('App.view.cpce.CpCeToolbar', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'CpCeToolbar',
    id: 'CpCeToolbar',
    itemId: 'CpCeToolbar',
    margin: '2 2 2 2',
    requires: [
    ],
    constructor: function() {
        var me = this;

        var empbx = Ext.create('Ext.form.field.ComboBox',{
            width: 70,
            id: 'cbxempgrupo',
            itemId: 'cbxempgrupo',
            store: Ext.data.Store({
                fields: [{ name: 'idEmpresa' }, { name: 'apelido' }],
                proxy: {
                    type: 'ajax',
                    url: BASEURL + '/api/CpCe/listarempresas',
                    reader: {
                        type: 'json',
                        root: 'data'
                    }
                }
            }),
            queryParam: 'codigo',
            queryMode: 'local',
            displayField: 'nome',
            valueField: 'nome',
            emptyText: 'Emp',
            forceSelection: true,
            disabled: true,
            margin: '1 1 1 1',
            listeners: {
                select: function (form){
        
                    var valor = form.getRawValue();

                }
            }
        });

        empbx.store.load(function(r){
            empbx.enable();
            empbx.select(USUARIO.empresa);
        });

        var btnSearch = Ext.create('Ext.button.Button',{
            
            iconCls: 'fa fa-search',
            tooltip: 'Consultar',
            margin: '1 1 1 10',
            handler: function(form) {

                console.log('Click Consulta');

            }
        });

        var btnfilter = Ext.create('Ext.button.Button',{
            
            iconCls: 'fa fa-filter',
            tooltip: 'Filtro',
            margin: '1 1 1 10',
            handler: function(form) {

                var panelFilter = Ext.getCmp('filtroPanel');
                if(panelFilter.hidden == true){
                    panelFilter.setHidden(false);
                }else{
                    panelFilter.setHidden(true);
                }
                console.log('Click Consulta');

            }
        });

        Ext.applyIf(me, {

            items: [
                empbx,
                btnfilter,
                btnSearch
            ]

        });

        me.callParent(arguments);

    }

});
