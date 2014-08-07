/*
    This file is generated and updated by Sencha Cmd. You can edit this file as
    needed for your application, but these edits will have to be merged by
    Sencha Cmd when upgrading.
*/

Ext.Loader.setPath('qqext','qqext');
Ext.application({
    name: 'qqext',
    appFolder:'qqext',
    extend: 'qqext.Application',
    autoCreateViewport: false,
    launch:function(){
    	console.log('application launch');
    	var v = Ext.create('qqext.view.Viewport',{
    		
    	});
    }
});
