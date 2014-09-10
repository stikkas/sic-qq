Ext.define("One", {
	config: {
		name: "Hello"
	},
	constructor: function(name) {
		this.initConfig();
		if (name)
			this.name = name;
		console.log(arguments);
	}
});
Ext.define("Two", {
	name: "Hello",
	constructor: function(name) {
		if (name)
			this.name = name;
	}
});

Ext.application({
	name: 'HelloExt',
	launch: function() {
		Ext.create('Ext.container.Viewport', {
			layout: 'fit',
			items: [
				{
					title: 'Приложение на Ext JS 4',
					html: '<h3>Добро пожаловать в мир Ext JS 4!</h3>'
				},
				{
					title: 'Другое элемент',
					html: '<ul><li>Один</li><li>Два</li></ul>'
				}
			]
		});

		var one = Ext.create('One', 'Serge'),
				two = Ext.create('Two', 'Angel');
		console.log(one.getName());
		console.log(one.name);
		console.log(two.name);
		one.name = "Hullo";
		console.log(one.getName());
		console.log(one.name);
	}
});