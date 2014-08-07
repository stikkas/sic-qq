Ext.define('qqext.fix.FixedJsonWriter', {
			override : 'Ext.data.writer.Json',
			getRecordData : function() {
				var data = arguments[0].getData(true);
				//console.log('fixed JsonWriter in action');
				//console.log(Ext.encode(data));
				var me = this;
				Ext.data.writer.Json.dropNullsAndUndefinedFields(data);
				//console.log('data after droping nulls and empty fields: ');
				//console.log(Ext.encode(data));
				return data;
			},
			statics : {
				dropNullsAndUndefinedFields : function(data) {
					var me = this;
					var keys = Object.keys(data);
					for (var t in keys) {
						//console.log('Проверка значения: '
						//		+ Ext.encode(data[keys[t]]) + ' поля '
						//		+ keys[t]);
						var isUndeDefined = !data[keys[t]];
						//console.log('isUndeDefined: ' + isUndeDefined);
						var isZero = data[keys[t]] == 0;
						//console.log('isZero: ' + isZero);
						var isEmptyString = data[keys[t]] == 't';
						//console.log('isEmptyString: ' + isEmptyString);
						if (isUndeDefined || isZero || isEmptyString) {
							//console.log('Удаление поля ' + keys[t]);
							delete data[keys[t]];
						} else {
							var typeOfValue = typeof data[keys[t]];
							//console.log('typeOfValue: ' + typeOfValue);
							var fl = (typeOfValue == 'object')
									&& (!(data[keys[t]] instanceof Date))
									&& (!(data[keys[t]] instanceof String));

							if (fl) {
								//console.log('Рекурсивный вызов для поля: '
								//		+ keys[t] + ' объект :');
								//console.log(Ext.encode(data[keys[t]]));
								me.dropNullsAndUndefinedFields(data[keys[t]]);
								//console.log('После: '+Ext.encode(data[keys[t]]));
								//if all fields of object are nulls or undefined then drops linked object
								if (Object.keys(data[keys[t]]).length==0){
									delete data[keys[t]];
								}
							}
						}
					}
				}

			}
		});