/*
 This file is generated and updated by Sencha Cmd. You can edit this file as
 needed for your application, but these edits will have to be merged by
 Sencha Cmd when upgrading.
 */

Ext.application({
    name: 'ramlogin',
    extend: 'ramlogin.Application',
    autoCreateViewport: false,
    launch: function() {
        var setUser = function(authRes) {
            console.log('start setUser()');
            var user = Ext.create('ramlogin.model.User');
            user.set('id', 'current');
            var userName = authRes.msg;
            user.set('name', userName);
            var acc = authRes.access;
            user.set('access', acc);
            console.log('user name: ' + userName);
            console.log('access: ' + acc);
            var userStore = Ext.create('ramlogin.store.UserLocalStorage');
            userStore.add(user);
            userStore.sync();
        };
        Ext.Ajax.request({
            url: 'Rules',
            success: function(response) {
                var txt = response.responseText;
                console.log('txt: ' + txt);
                setUser(Ext.decode(txt));
            },
            failure: function() {

            }
        });

    }
});
