Ext.define('hawk_common.cmp.CDateInterval', {
			extend : 'Ext.container.Container',
			requires:['hawk_common.sys.Consts'],
			fromLabel : null,
			toLabel : null,
			fromField : null,
			toField : null,
			toLabelWidth : 30,
			toFieldWidth : 135,
			cls:'date_fld',
			layout : {
				type : 'hbox',
				align : 'middle'
			},
			margin : '2 0 5 0',
			label:null,
			name: 'date',
			noInfinity: false,
			allowBlank: true,
			getFromDate : function() {
				var me = this;
				return me.fromField.getValue();
			},
			getFromDateRaw:function(){
				return this.fromField.getRawValue();
			},
			reset : function() {
				var me = this;
				me.fromField.reset();
				me.toField.reset();
			},
			getToDate : function() {
				var me = this;
				return me.toField.getValue();
			},
			getToDateRaw:function(){
				return this.toField.getRawValue();
			},
			/**
			 * Установка значений для компонента
			 * @param {с}
			 *            fromDate
			 * @param {по}
			 *            toDate
			 */
			setValues : function(fromDate, toDate) {
				var me = this;
				//проверки нужны, что бы не устанавливался везде 1970 год
				if (fromDate){
					me.fromField.setValue(new Date(fromDate));
				}
				if (toDate){
					me.toField.setValue(new Date(toDate));
				}
			},
			labelWidth:200,
			initComponent : function() 
			{
				this.setValidation();
				
				var me = this;
				me.label=Ext.create('Ext.form.Label',{
					text:me.fromLabel,
					cls:'label_date_interval',
					width:me.labelWidth
				});
				me.fromField = Ext.create('hawk_common.cmp.DateField', {
							fieldLabel : 'с',
							labelWidth : 10,
							cls : 'date_fld_from',
							format : hawk_common.sys.Consts.defaultDateFormat,
							altFormat:'',
							width : 115,
							labelSeparator:'',
							name: this.name + 'From',
							allowBlank: this.allowBlank,
							validateBlank: true,
							vtype: 'daterange',
							startDay: 1,
							minText: 'Интервал задан некорректно',
							maxText: 'Интервал задан некорректно'
						});
				me.toField = Ext.create('hawk_common.cmp.DateField', {
							fieldLabel : 'по&nbsp;&nbsp;&nbsp;',
							labelWidth : me.toLabelWidth,
							format : hawk_common.sys.Consts.defaultDateFormat,
							width		 : me.toFieldWidth,
							altFormat:'',
							labelAlign : 'right',
							labelSeparator:'',
							name: this.name + 'To',
							validateBlank: true,
							vtype: 'daterange',
							startDay: 1,
							minText: 'Интервал задан некорректно',
							maxText: 'Интервал задан некорректно'
						});
				Ext.applyIf(me, {
							items : [me.label,me.fromField, me.toField]
						});
				me.callParent(arguments);
			},
			setValidation: function()
			{
				Ext.apply(Ext.form.VTypes, {
					daterange : function(val, field) 
					{
						var me = field.up();
						var date = field.parseDate(val);
				 
						if (field == me.toField && 
								(!date && me.dateRangeMax ||
								 date && !me.dateRangeMax || 
								 date && me.dateRangeMax && date.getTime() != me.dateRangeMax.getTime())) 
						{
							me.fromField.setMaxValue(date);
							me.dateRangeMax = date;
							me.fromField.validate();
						} 
						else if (field == me.fromField && 
								(!date && me.dateRangeMin || 
								 date && !me.dateRangeMin ||
								 date && me.dateRangeMin && date.getTime() != me.dateRangeMin.getTime())) 
						{
							me.toField.setMinValue(date);
							me.dateRangeMin = date;
							me.toField.validate();
						}						
						
						if (!date)
						{
							if (field == me.fromField && me.toField.getValue() && me.noInfinity)
							{
								this.daterangeText = 'При задании диапазона начальная дата должна быть указана';
								return false;
							}
							if (field == me.toField && !me.fromField.getValue() && me.noInfinity)
								me.fromField.validate();
						}
						return true;
					}
				});
			}
		});