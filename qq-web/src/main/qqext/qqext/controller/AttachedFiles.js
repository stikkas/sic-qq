/**
 * Контроллер для прикрепленных файлов
 */
Ext.define('qqext.controller.AttachedFiles', {
	extend: 'Ext.app.Controller',
	views: ['reg.VRegForm', 'exec.VExecForm'],
	refs: [{
			ref: 'appl',
			selector: 'vregform attachedfiles'
		},
		{
			ref: 'answ',
			selector: 'vexecform attachedfiles'
		}
	],
	init: function () {
		this.control({
			'vregform attachedfiles filesList button[action=removeExisting]': {
				click: function (btn) {
					this.getAppl().deletedFiles.push(btn.fileId);
					btn.up('filesList').remove(btn.up());
				}
			},
			'vexecform attachedfiles filesList button[action=removeExisting]': {
				click: function (btn) {
					this.getAnsw().deletedFiles.push(btn.fileId);
					btn.up('filesList').remove(btn.up());
				}
			}
		});
	}
});
