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

        var empbx = Ext.create('Ext.form.field.ComboBox',{
            width: 70,
            id: 'cbxempf',
            itemId: 'cbxempf',
            store: Ext.data.Store({
                fields: [{ name: 'idEmpresa' }, { name: 'apelido' }],
                proxy: {
                    type: 'ajax',
                    url: BASEURL + '/api/CpCf/listarempresas',
                    timeout: 120000,
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
            }
        });

        empbx.store.load(function(r){
            empbx.enable();
            empbx.select(USUARIO.empresa);
        });

        var btdtinicio = Ext.create('Ext.form.field.Date',{
            name: 'dtiniciof',
            id: 'dtiniciof',
            fieldLabel: 'Emissão de',
            margin: '2 2 2 12',
            width: 180,
            labelWidth: 72,
            format: 'd/m/Y',
            altFormats: 'dmY',
            emptyText: '__/__/____'
        });

        var btdtfim = Ext.create('Ext.form.field.Date',{
            name: 'dtfimf',
            id: 'dtfimf',
            fieldLabel: 'até',
            margin: '2 2 2 2',
            width: 132,
            labelWidth: 20,
            format: 'd/m/Y',
            altFormats: 'dmY',
            emptyText: '__/__/____'
        });

        var btdtinicioe = Ext.create('Ext.form.field.Date',{
            name: 'dtinicioef',
            id: 'dtinicioef',
            fieldLabel: 'Entrada de',
            margin: '2 2 2 12',
            width: 180,
            labelWidth: 68,
            format: 'd/m/Y',
            altFormats: 'dmY',
            emptyText: '__/__/____'
        });

        var btdtfime = Ext.create('Ext.form.field.Date',{
            name: 'dtfimef',
            id: 'dtfimef',
            fieldLabel: 'até',
            margin: '2 2 2 2',
            width: 132,
            labelWidth: 20,
            format: 'd/m/Y',
            altFormats: 'dmY',
            emptyText: '__/__/____'
        });

        var btnSearch = Ext.create('Ext.button.Button',{
            
            iconCls: 'fa fa-search',
            tooltip: 'Consultar',
            margin: '1 1 1 10',
            handler: function(form) {

                var emp = me.down('#cbxempf').getRawValue();
                var dtinicio = me.down('#dtiniciof').getRawValue();
                var dtfim = me.down('#dtfimf').getRawValue();
                var dtinicioe = me.down('#dtinicioef').getRawValue();
                var dtfime = me.down('#dtfimef').getRawValue();
                var nrnota = me.down('#nrnotaf').getRawValue();

                var pfiltro = me.up('container').down('#filtroPanelf');
                var gridmarca = pfiltro.down('#pmarcagrid').down('grid');

                var arraySession = gridmarca.getSelection();

                stringMarca ='';
                for (let index = 0; index < arraySession.length; index++) {
                    var element = arraySession[index];

                    if(stringMarca){
                        stringMarca += ','+element.data.idMarca;
                    }else{
                        stringMarca = element.data.idMarca;
                    }
                }

                var itemgrid = me.up('container').down('#container1f').down('#pprincipalf').down('#itemgridpanelf').down('grid');

                var params = {
                    emp: emp,
                    dtinicio: dtinicio,
                    dtfim:  dtfim,
                    dtinicioe: dtinicioe,
                    dtfime:  dtfime,
                    nrnota: nrnota,
                    marca: stringMarca
                };

                itemgrid.getStore().getProxy().setExtraParams(params);
                itemgrid.getStore().load();

            }
        });

        var btnnota = Ext.create('Ext.form.field.Text',{
            name: 'nrnotaf',
            id: 'nrnotaf',
            emptyText: 'Número Nota',
            width: 120
        });

        var btnfilter = Ext.create('Ext.button.Button',{
            
            iconCls: 'fa fa-filter',
            tooltip: 'Filtro',
            margin: '1 1 1 10',
            handler: function(form) {

                var panelFilter = Ext.getCmp('filtroPanelf');
                if(panelFilter.hidden == true){
                    panelFilter.setHidden(false);
                }else{
                    panelFilter.setHidden(true);
                }
            }
        });

        Ext.applyIf(me, {

            items: [
                empbx,
                btdtinicio,
                btdtfim,
                btdtinicioe,
                btdtfime,
                btnnota,
                btnfilter,
                btnSearch
            ]

        });

        me.callParent(arguments);

    }

});
