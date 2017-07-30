$(document).ready(function () {    
	var oCreditTable = $('#credit').dataTable({
			"fnRowCallback" : function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
				$(nRow).on('click', function () {
					var objectId = $(nRow).attr("id");
					var name = $('td:eq(0)', nRow).text();

					$('#creditEditId').val(objectId);
					$('#creditNameEdit').val(name);
				});
			},
			"bJQueryUI" : true,
			"bProcessing" : true,
			"bServerSide" : true,
			"rowId" : "objectid",
			"sAjaxSource" : "/credit",
			"bPaginate" : true,
			"bSort" : true,
			"aoColumns" : [{
					"mDataProp" : "name"
				}
			],
			"aoColumnDefs" : [{
					"mDataProp" : null,
					"sDefaultContent" : "&nbsp",
					"aTargets" : ['_all']
				}
			],
			"sPaginationType" : "full_numbers",
			"iDisplayLength" : 10,
			"iDisplayStart" : 0,
			"bFilter" : false,
			"fnDrawCallback" : function (oSettings) {
				IntializeCreditDropDownBoxes();
			}
		}).makeEditable({
			fnOnDeleted : function (value, settings) {
				oMediaItemTable.fnDraw();
				oMediaGroupTable.fnDraw();
				oMediaGroupItemTable.fnDraw();
			},
			fnOnEdited : function (value, settings) {
				oMediaItemTable.fnDraw();
				oMediaGroupTable.fnDraw();
				oMediaGroupItemTable.fnDraw();
			},
			sEditURL : "/credit/edit",
			sAddURL : "/credit/add",
			sEditHttpMethod : "GET",
			sAddHttpMethod : "POST",
			sDeleteHttpMethod : "POST",
			sDeleteURL : "/credit/delete",
			sAddNewRowFormId : "formAddCredit",
			sAddNewRowButtonId : "btnAddCredit",
			sAddNewRowOkButtonId : "btnAddCreditOk",
			sEditRowFormId : "formEditCredit",
			sEditRowButtonId : "btnEditCredit",
			sEditOkButtonId : "btnEditCreditOk",
			sEditRowCancelButtonId : "btnEditCreditCancel",
			sDeleteRowButtonId : "btnDeleteCredit",
			oAddNewRowButtonOptions : {
				label : "Add",
				icons : {
					primary : 'ui-icon-plus'
				}
			},
			oEditRowButtonOptions : {
				label : "Edit",
				icons : {
					primary : 'ui-icon-pencil'
				}
			},
			oDeleteRowButtonOptions : {
				label : "Remove",
				icons : {
					primary : 'ui-icon-trash'
				}
			},
			oAddNewRowFormOptions : {
				title : 'Add a new credit',
				show : "blind",
				hide : "explode",
				modal : true
			},
			oEditRowFormOptions : {
				title : 'Edit a credit',
				show : "blind",
				hide : "explode",
				modal : true
			},
			sAddDeleteEditToolbarSelector : ".dataTables_length"
		});
        
    var oUserTable = $('#user').dataTable({
			"fnRowCallback" : function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
				$(nRow).on('click', function () {
					var objectId = $(nRow).attr("id");
					var userName = $('td:eq(0)', nRow).text();
					var email = $('td:eq(1)', nRow).text();
					var password = $('td:eq(2)', nRow).text();

					//todo: add logic for btnEditLogin
					$('#userEditId').val(objectId);
				});
			},
			"bJQueryUI" : true,
			"bScrollCollapse" : true,
			"bProcessing" : true,
			"bServerSide" : true,
			"rowId" : "objectid",
			"sAjaxSource" : "/user",
			"bPaginate" : true,
			"bSort" : true,
			"aoColumnDefs" : [{
					"mDataProp" : null,
					"sDefaultContent" : "&nbsp",
					"aTargets" : ['_all']
				}
			],
			"aoColumns" : [{
					"mDataProp" : "userName"
				}, {
					"mDataProp" : "email"
				}
			],
			"iDisplayLength" : 10,
			"iDisplayStart" : 0,
			"sPaginationType" : "full_numbers",
			"bFilter" : false,
			"deferLoading" : 10
		}).makeEditable({
			fnOnDeleted : function (value, settings) {
				oUserTable.fnDraw();
			},
			fnOnEdited : function (value, settings) {
				oUserTable.fnDraw();
			},
			sAddURL : "/user/add",
			sAddHttpMethod : "POST",
			sEditHttpMethod : "GET",
			sDeleteHttpMethod : "POST",
			sEditURL : "/user/edit",
			sDeleteURL : "/user/delete",
			sAddNewRowFormId : "formAddUser",
			sAddNewRowButtonId : "btnAddUser",
			sAddNewRowOkButtonId : "btnAddUserOk",
			sAddNewRowCancelButtonId : "btnAddUserCancel",
			sEditRowFormId : "formEditUser",
			sEditRowButtonId : "btnEditUser",
			sEditRowOkButtonId : "btnEditUserOk",
			sEditRowCancelButtonId : "btnEditUserCancel",
			sDeleteRowButtonId : "btnDeleteUser",
			oAddNewRowButtonOptions : {
				label : "Add",
				icons : {
					primary : 'ui-icon-plus'
				}
			},
			oEditRowButtonOptions : {
				label : "Edit",
				icons : {
					primary : 'ui-icon-pencil'
				}
			},
			oDeleteRowButtonOptions : {
				label : "Remove",
				icons : {
					primary : 'ui-icon-trash'
				}
			},
			oAddNewRowFormOptions : {
				title : 'Add a user',
				show : "blind",
				hide : "explode",
				modal : true
			},
			oEditRowFormOptions : {
				title : 'Edit a user',
				show : "blind",
				hide : "explode",
				modal : true
			},
			sAddDeleteEditToolbarSelector : ".dataTables_length"
		});

	var oMediaItemTable = $('#mediaitem').dataTable({
			"fnRowCallback" : function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
				$(nRow).on('click', function () {
					var objectId = $(nRow).attr("id");
					var name = $('td:eq(0)', nRow).text();
					var type = $('td:eq(1)', nRow).text();
					var text = $('td:eq(2)', nRow).text();
					var duration = $('td:eq(3)', nRow).text();
					var contentURL = $('td:eq(4)', nRow).text();
                    var imageURL = $('td:eq(5)', nRow).text();
					var producer = $('td:eq(6)', nRow).text();
					var artist = $('td:eq(7)', nRow).text();

					$('#mediaItemEditId').val(objectId);
					$('#nameEdit').val(name);
					$('#textEdit').val(text);
					$('#durationEdit').val(duration);
					$('#contentURLEdit').val(contentURL);
                    $('#imageURLEdit').val(imageURL);
					$('#typeEdit').val(type);
                    
                    $("#imageURLEdit").removeClass('required').attr('readonly', true).addClass('input-disabled');
                    $("#contentURLEdit").removeClass('required').attr('readonly', true).addClass('input-disabled');
                    $("#durationEdit").removeClass('required').attr('readonly', true).addClass('input-disabled');
                    $("#textEdit").removeClass('required').attr('readonly', true).addClass('input-disabled');
                    $("#producerEdit").removeClass('required').addClass('input-disabled').prop('disabled', true);
                    $("#artistEdit").removeClass('required').addClass('input-disabled').prop('disabled', true);
                    
                    switch (type){
                        case "lessonText":
                             $("#textEdit").addClass('required').attr('readonly', false).removeClass('input-disabled');
                            break;
                        case "lessonAudio":
                            $("#contentURLEdit").addClass('required').attr('readonly', false).removeClass('input-disabled');
                            $("#durationEdit").addClass('required').attr('readonly', false).removeClass('input-disabled');
                            break;
                        case "lessonVideo":
                            $("#imageURLEdit").addClass('required').attr('readonly', false).removeClass('input-disabled');
                            $("#contentURLEdit").addClass('required').attr('readonly', false).removeClass('input-disabled');
                            $("#durationEdit").addClass('required').attr('readonly', false).removeClass('input-disabled');
                            break;
                        case "lessonImage":
                            $("#imageURLEdit").addClass('required').attr('readonly', false).removeClass('input-disabled');
                            break;
                        case "song":
                            $("#contentURLEdit").addClass('required').attr('readonly', false).removeClass('input-disabled');
                            $("#durationEdit").addClass('required').attr('readonly', false).removeClass('input-disabled');
                            $("#producerEdit").addClass('required').removeClass('input-disabled').prop('disabled', false);
                            $("#artistEdit").addClass('required').removeClass('input-disabled').prop('disabled', false);
                            break;
                        case "experience":
                            $("#contentURLEdit").addClass('required').attr('readonly', false).removeClass('input-disabled');
                            $("#durationEdit").addClass('required').attr('readonly', false).removeClass('input-disabled');
                            $("#imageURLEdit").addClass('required').attr('readonly', false).removeClass('input-disabled');
                            $("#producerEdit").addClass('required').removeClass('input-disabled').prop('disabled', false);
                            $("#artistEdit").addClass('required').removeClass('input-disabled').prop('disabled', false);
                            break;
                    }
                    
					$('#durationEdit').mask("00:00:00", {
						placeholder : "__:__:__"
					});
					
					$("#formEditMediaItem select[name=typeEdit] option").filter(function () {
						return $(this).text() == type;
					}).prop('selected', true);

					$("#formEditMediaItem select[name=producerEdit] option").filter(function () {
						return $(this).text() == producer;
					}).prop('selected', true);

					$("#formEditMediaItem select[name=artistEdit] option").filter(function () {
						return $(this).text() == artist;
					}).prop('selected', true);
				});
			},
			"bJQueryUI" : true,
			"bScrollCollapse" : true,
			"bProcessing" : true,
			"bServerSide" : true,
			"rowId" : "objectid",
			"sAjaxSource" : "/mediaitem",
			"bPaginate" : true,
			"bSort" : true,
			"aoColumnDefs" : [{
					"mDataProp" : null,
					"sDefaultContent" : "&nbsp",
					"aTargets" : ['_all']
				}
			],
			"aoColumns" : [{
					"mDataProp" : "name"
				}, {
					"mDataProp" : "type"
				}, {
					"mDataProp" : "text"
				}, {
					"mDataProp" : "duration"
				}, {
					"mDataProp" : "contentURL"
				}, {
					"mDataProp" : "imageURL"
				}, {
					"mDataProp" : "producer"
				}, {
					"mDataProp" : "artist"
				}
			],
			"iDisplayLength" : 10,
			"iDisplayStart" : 0,
			"sPaginationType" : "full_numbers",
			"bFilter" : false,
			"deferLoading" : 10,
            "fnDrawCallback" : function (oSettings) {
                IntializeLessonPageItemDropDownBoxes();
			}
		}).makeEditable({
			fnOnDeleted : function (value, settings) {
				oMediaItemTable.fnDraw();
				oMediaGroupTable.fnDraw();
				oMediaGroupItemTable.fnDraw();
			},
			fnOnEdited : function (value, settings) {
				oMediaItemTable.fnDraw();
				oMediaGroupTable.fnDraw();
				oMediaGroupItemTable.fnDraw();
			},
			sAddURL : "/mediaitem/add",
			sAddHttpMethod : "POST",
			sEditHttpMethod : "GET",
			sDeleteHttpMethod : "POST",
			sEditURL : "/mediaitem/edit",
			sDeleteURL : "/mediaitem/delete",
			sAddNewRowFormId : "formAddMediaItem",
			sAddNewRowButtonId : "btnAddMediaItem",
			sAddNewRowOkButtonId : "btnAddMediaItemOk",
			sAddNewRowCancelButtonId : "btnAddMediaItemCancel",
			sEditRowFormId : "formEditMediaItem",
			sEditRowButtonId : "btnEditMediaItem",
			sEditRowOkButtonId : "btnEditMediaItemOk",
			sEditRowCancelButtonId : "btnEditMediaItemCancel",
			sDeleteRowButtonId : "btnDeleteMediaItem",
			oAddNewRowButtonOptions : {
				label : "Add",
				icons : {
					primary : 'ui-icon-plus'
				}
			},
			oEditRowButtonOptions : {
				label : "Edit",
				icons : {
					primary : 'ui-icon-pencil'
				}
			},
			oDeleteRowButtonOptions : {
				label : "Remove",
				icons : {
					primary : 'ui-icon-trash'
				}
			},
			oAddNewRowFormOptions : {
				title : 'Add a new media item',
				show : "blind",
				hide : "explode",
				modal : true
			},
			oEditRowFormOptions : {
				title : 'Edit a media item',
				show : "blind",
				hide : "explode",
				modal : true
			},
			sAddDeleteEditToolbarSelector : ".dataTables_length",
            aoColumns: [
                {
                    placeholder : ""
                },
                {
                    placeholder : ""
                },
                {
                    placeholder : ""
                },
                {
                    placeholder : ""
                },
                {
                    placeholder : ""
                },
                {
                    placeholder : ""
                },
                {
                    placeholder : ""
                }
            ]
		});
        
    var oLessonTable = $('#lesson')
        .dataTable({
			"fnRowCallback" : function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
				if(selectedRowId == aData['DT_RowId']){
					$(nRow).addClass('row_selected');   
				}   
				
				$(nRow).on('click', function () {
					selectedRowId = $(nRow).attr("id");
					var objectId = $(nRow).attr("id");
					var title = $('td:eq(0)', nRow).text();
					var imageURL = $('td:eq(1)', nRow).text();

					$('#formEditLesson input[name=lessonId]').val(objectId);
					$('#formAddLesson input[name=lessonId]').val(objectId);
					$('#lessonTitleEdit').val(title);
					$('#lessonImageURLEdit').val(imageURL);
                    
					oLessonPageTable.fnDraw();
				});
			},			
            "fnDrawCallback" : function (oSettings) {
				IntializeLessonGroupLessonsDropDownBoxes();
			},
			"bJQueryUI" : true,
			"bProcessing" : true,
			"bServerSide" : true,
			"rowId" : "objectid",
			"sAjaxSource" : "/lesson",
			"bPaginate" : true,
			"bSort" : true,
			"aoColumnDefs" : [{
					"mDataProp" : null,
					"sDefaultContent" : "&nbsp",
					"aTargets" : ['_all']
				}
			],
			"aoColumns" : [{
					"mDataProp" : "title"
				}, {
					"mDataProp" : "imageURL"
				}
			],
			"sPaginationType" : "full_numbers",
			"iDisplayLength" : 10,
			"bFilter" : false,
			"bStateSave": true
		}).makeEditable({
			fnOnDeleted : function (value, settings) {
				oMediaItemTable.fnDraw();
				oLessonTable.fnDraw();
				oLessonPageTable.fnDraw();
			},
			fnOnEdited : function (value, settings) {
				oMediaItemTable.fnDraw();
				oLessonTable.fnDraw();
				oLessonPageTable.fnDraw();
			},
			sDeleteHttpMethod : "POST",
			sDeleteURL : "/lesson/delete",
			sAddNewRowButtonId : "btnAddLesson",
			sEditRowButtonId : "btnEditLesson",
			sDeleteRowButtonId : "btnDeleteLesson",	
			oAddNewRowButtonOptions : {
				label : "Add",
				icons : {
					primary : 'ui-icon-plus'
				}
			},
			oEditRowButtonOptions : {
				label : "Edit",
				icons : {
					primary : 'ui-icon-pencil'
				}
			},
			oDeleteRowButtonOptions : {
				label : "Remove",
				icons : {
					primary : 'ui-icon-trash'
				}
			},
			sAddDeleteEditToolbarSelector : ".dataTables_length",
            aoColumns: [
                {
                    placeholder : ""
                },
                {
                    placeholder : ""
                }
            ]
		});
    
    var oLessonPageTable = $('#lessonpage').dataTable({
			"fnRowCallback" : function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
				if(selectedRowId == aData['DT_RowId']){
					$(nRow).addClass('row_selected');   
				} 
				
				$(nRow).on('click', function () {
					selectedRowId = $(nRow).attr("id");                   
                    $("#formEditLessonPage input[name=lessonPageEditId]").val(selectedRowId);
				});
			},
			"bJQueryUI" : true,
			"bScrollCollapse" : true,
			"bProcessing" : true,
			"bServerSide" : true,
			"rowId" : "objectid",
			"sAjaxSource" : "/lessonpage",
			"bPaginate" : true,
			"bSort" : true,
			"aoColumnDefs" : [{
					"mDataProp" : null,
					"sDefaultContent" : "&nbsp",
					"aTargets" : ['_all']
				}
			],
			"aoColumns" : [{
					"mDataProp" : "lessonPageId"
				}, {
					"mDataProp" : "mediaItems"
				}
			],
			"iDisplayLength" : 10,
			"iDisplayStart" : 0,
			"sPaginationType" : "full_numbers",
            "fnServerParams" : function (aoData) {
				aoData.push({
					"name" : "lessonId",
					"value" : $('#lessonId').val()
				});
			},
			"bFilter" : false,
			"deferLoading" : 10
		}).makeEditable({
			fnOnDeleted : function (value, settings) {
				oMediaItemTable.fnDraw();
				oLessonTable.fnDraw();
				oLessonPageTable.fnDraw();
			},
			fnOnEdited : function (value, settings) {
				oMediaItemTable.fnDraw();
				oLessonPageTable.fnDraw();
			},
			sAddURL : "/lessonpage/add",
			sAddHttpMethod : "POST",
			sDeleteHttpMethod : "POST",
			sDeleteURL : "/lessonpage/delete",
			sAddNewRowFormId : "formAddLessonPage",
			sAddNewRowButtonId : "btnAddLessonPage",
			sAddNewRowOkButtonId : "btnAddLessonPageOk",
			sAddNewRowCancelButtonId : "btnAddLessonPageCancel",
			sEditRowFormId : "formEditLessonPage",
			sEditRowButtonId : "btnEditLessonPage", 
			sEditRowOkButtonId : "btnEditLessonPageOk",
			sEditRowCancelButtonId : "btnEditLessonPageCancel",
			sDeleteRowButtonId : "btnDeleteLessonPage",
			oAddNewRowButtonOptions : {
				label : "Add",
				icons : {
					primary : 'ui-icon-plus'
				}
			},
			oEditRowButtonOptions : {
				label : "Edit",
				icons : {
					primary : 'ui-icon-pencil'
				}
			},
			oDeleteRowButtonOptions : {
				label : "Remove",
				icons : {
					primary : 'ui-icon-trash'
				}
			},
			oAddNewRowFormOptions : {
				title : 'Add a new lesson page',
				show : "blind",
				hide : "explode",
				modal : true
			},
			oEditRowFormOptions : {
				title : 'Edit a lesson page',
				show : "blind",
				hide : "explode",
				modal : true
			},
			sAddDeleteEditToolbarSelector : ".dataTables_length",
            aoColumns: [
                {
                    placeholder : ""
                },
                {
                    placeholder : ""
                }
            ]
		});

	var oMediaGroupTable = $('#mediagroup')
		.dataTable({
			"fnRowCallback" : function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
				if(selectedRowId == aData['DT_RowId']){
					$(nRow).addClass('row_selected');   
				}   
				
				$(nRow).on('click', function () {
					selectedRowId = $(nRow).attr("id");
					var objectId = $(nRow).attr("id");
					var index = $('td:eq(0)', nRow).text();
					var title = $('td:eq(1)', nRow).text();
					var type = $('td:eq(2)', nRow).text();
					var detail = $('td:eq(3)', nRow).text();
					var imageURL = $('td:eq(4)', nRow).text();
					var producer = $('td:eq(5)', nRow).text();
					var artist = $('td:eq(6)', nRow).text();

					$('#formEditMediaGroup input[name=mediaGroupId]').val(objectId);
					$('#formAddMediaGroup input[name=mediaGroupId]').val(objectId);
					$('#mediaGroupTitleEdit').val(title);
					$('#mediaGroupIndexEdit').val(index);
					$('#mediaGroupDetailEdit').val(detail);
					$('#mediaGroupImageURLEdit').val(imageURL);
					
					$("#formEditMediaGroup select[name=mediaGroupTypeEdit] option").filter(function () {
						return $(this).text() == type;
					}).prop('selected', true);

					$("#formEditMediaGroup select[name=mediaGroupProducerEdit] option").filter(function () {
						return $(this).text() == producer;
					}).prop('selected', true);

					$("#formEditMediaGroup select[name=mediaGroupArtistEdit] option").filter(function () {
						return $(this).text() == artist;
					}).prop('selected', true);

					oMediaGroupItemTable.fnDraw();
				});
			},			
			"bJQueryUI" : true,
			"bProcessing" : true,
			"bServerSide" : true,
			"rowId" : "objectid",
			"sAjaxSource" : "/mediagroup",
			"bPaginate" : true,
			"bSort" : true,
			"aoColumnDefs" : [{
					"mDataProp" : null,
					"sDefaultContent" : "&nbsp",
					"aTargets" : ['_all']
				}
			],
			"aoColumns" : [{
					"mDataProp" : "index"
				}, {
					"mDataProp" : "title"
				}, {
					"mDataProp" : "type"
				}, {
					"mDataProp" : "detail"
				}, {
					"mDataProp" : "imageURL"
				}, {
					"mDataProp" : "producer"
				}, {
					"mDataProp" : "artist"
				}
			],
			"sPaginationType" : "full_numbers",
			"iDisplayLength" : 10,
			"bFilter" : false,
			"bStateSave": true
		}).makeEditable({
			fnOnDeleted : function (value, settings) {
				oMediaItemTable.fnDraw();
				oMediaGroupTable.fnDraw();
				oMediaGroupItemTable.fnDraw();
			},
			fnOnEdited : function (value, settings) {
				oMediaItemTable.fnDraw();
				oMediaGroupTable.fnDraw();
				oMediaGroupItemTable.fnDraw();
			},
			sDeleteHttpMethod : "POST",
			sDeleteURL : "/mediagroup/delete",
			sAddNewRowButtonId : "btnAddMediaGroup",
			sEditRowButtonId : "btnEditMediaGroup",
			sDeleteRowButtonId : "btnDeleteMediaGroup",			
			sMoveRowUpButtonId : "btnMoveAlbumUp",
			sMoveRowDownButtonId : "btnMoveAlbumDown",
			oMoveRowUpButtonOptions : {
				label : "Move Album Up",
				icons : {
					primary : 'ui-icon-arrowthick-1-n'
				}
			},
			oMoveRowDownButtonOptions : {
				label : "Move Album Down",
				icons : {
					primary : 'ui-icon-arrowthick-1-s'
				}
			},
			oAddNewRowButtonOptions : {
				label : "Add",
				icons : {
					primary : 'ui-icon-plus'
				}
			},
			oEditRowButtonOptions : {
				label : "Edit",
				icons : {
					primary : 'ui-icon-pencil'
				}
			},
			oDeleteRowButtonOptions : {
				label : "Remove",
				icons : {
					primary : 'ui-icon-trash'
				}
			},
			sAddDeleteEditToolbarSelector : ".dataTables_length",
            aoColumns: [
                {
                    placeholder : ""
                },
                {
                    placeholder : ""
                },
                {
                    placeholder : ""
                },
                {
                    placeholder : ""
                },
                {
                    placeholder : ""
                },
                {
                    placeholder : ""
                },
                {
                    placeholder : ""
                }
            ]
		});
    
    var oLessonGroupTable = $('#lessongroup')
		.dataTable({
			"fnRowCallback" : function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
				if(selectedRowId == aData['DT_RowId']){
					$(nRow).addClass('row_selected');   
				}   
				
				$(nRow).on('click', function () {
					selectedRowId = $(nRow).attr("id");
					var objectId = $(nRow).attr("id");
					var title = $('td:eq(0)', nRow).text();
					var lessons = $('td:eq(1)', nRow).text();

					$('#formEditLessonGroup input[name=lessonGroupEditId]').val(objectId);
					$('#formAddLessonGroup input[name=lessonGroupId]').val(objectId);
					$('#lessonGroupTitleEdit').val(title);
					$('#lessonGroupLessonsEdit').val(lessons);
				});
			},			
			"bJQueryUI" : true,
			"bProcessing" : true,
			"bServerSide" : true,
			"rowId" : "objectid",
			"sAjaxSource" : "/lessongroup",
			"bPaginate" : true,
			"bSort" : true,
			"aoColumnDefs" : [{
					"mDataProp" : null,
					"sDefaultContent" : "&nbsp",
					"aTargets" : ['_all']
				}
			],
			"aoColumns" : [{
					"mDataProp" : "lessonGroupTitle"
				}, {
					"mDataProp" : "lessons"
				}
			],
            "fnDrawCallback" : function (oSettings) {
                IntializeTeachingLessonGroupsDropDownBoxes();
			},
			"sPaginationType" : "full_numbers",
			"iDisplayLength" : 10,
			"bFilter" : false,
			"bStateSave": true
		}).makeEditable({
			fnOnDeleted : function (value, settings) {
				oLessonGroupTable.fnDraw();
			},
			fnOnEdited : function (value, settings) {
				oLessonGroupTable.fnDraw();
			},
			sAddURL : "/lessongroup/add",
			sAddHttpMethod : "POST",
			sEditHttpMethod : "GET",
			sDeleteHttpMethod : "POST",
			sEditURL : "/lessongroup/edit",
			sDeleteURL : "/lessongroup/delete",
			sAddNewRowFormId : "formAddLessonGroup",
			sAddNewRowButtonId : "btnAddLessonGroup",
			sAddNewRowOkButtonId : "btnAddLessonGroupOk",
			sAddNewRowCancelButtonId : "btnAddLessonGroupCancel",
			sEditRowFormId : "formEditLessonGroup",
			sEditRowButtonId : "btnEditLessonGroup",
			sEditRowOkButtonId : "btnEditLessonGroupOk",
			sEditRowCancelButtonId : "btnEditLessonGroupCancel",
			sDeleteRowButtonId : "btnDeleteLessonGroup",
			oAddNewRowButtonOptions : {
				label : "Add",
				icons : {
					primary : 'ui-icon-plus'
				}
			},
			oEditRowButtonOptions : {
				label : "Edit",
				icons : {
					primary : 'ui-icon-pencil'
				}
			},
			oDeleteRowButtonOptions : {
				label : "Remove",
				icons : {
					primary : 'ui-icon-trash'
				}
			},
			sAddDeleteEditToolbarSelector : ".dataTables_length",
            aoColumns: [
                {
                    placeholder : ""
                },
                {
                    placeholder : ""
                }
            ]
		});

    var oTeachingTable = $('#teaching')
		.dataTable({
			"fnRowCallback" : function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
				if(selectedRowId == aData['DT_RowId']){
					$(nRow).addClass('row_selected');   
				}   
				
				$(nRow).on('click', function () {
					selectedRowId = $(nRow).attr("id");
					var objectId = $(nRow).attr("id");
					var title = $('td:eq(0)', nRow).text();
					var teachingGroups = $('td:eq(1)', nRow).text();

					$('#formEditTeaching input[name=teachingEditId]').val(objectId);
					$('#teachingTitleEdit').val(title);
				});
			},			
			"bJQueryUI" : true,
			"bProcessing" : true,
			"bServerSide" : true,
			"rowId" : "objectid",
			"sAjaxSource" : "/teaching",
			"bPaginate" : true,
			"bSort" : true,
			"aoColumnDefs" : [{
					"mDataProp" : null,
					"sDefaultContent" : "&nbsp",
					"aTargets" : ['_all']
				}
			],
			"aoColumns" : [{
					"mDataProp" : "title"
				}, {
					"mDataProp" : "lessongroups"
				}
			],
			"sPaginationType" : "full_numbers",
			"iDisplayLength" : 10,
			"bFilter" : false,
			"bStateSave": true
		}).makeEditable({
			fnOnDeleted : function (value, settings) {
				oTeachingTable.fnDraw();
			},
			fnOnEdited : function (value, settings) {
				oTeachingTable.fnDraw();
			},
			sAddURL : "/teaching/add",
			sAddHttpMethod : "POST",
			sEditHttpMethod : "GET",
			sDeleteHttpMethod : "POST",
			sEditURL : "/teaching/edit",
			sDeleteURL : "/teaching/delete",
			sAddNewRowFormId : "formAddTeaching",
			sAddNewRowButtonId : "btnAddTeaching",
			sAddNewRowOkButtonId : "btnAddTeachingOk",
			sAddNewRowCancelButtonId : "btnAddTeachingCancel",
			sEditRowFormId : "formEditTeaching",
			sEditRowButtonId : "btnEditTeaching",
			sEditRowOkButtonId : "btnEditTeachingOk",
			sEditRowCancelButtonId : "btnEditTeachingCancel",
			sDeleteRowButtonId : "btnDeleteTeaching",
			oAddNewRowButtonOptions : {
				label : "Add",
				icons : {
					primary : 'ui-icon-plus'
				}
			},
			oEditRowButtonOptions : {
				label : "Edit",
				icons : {
					primary : 'ui-icon-pencil'
				}
			},
			oDeleteRowButtonOptions : {
				label : "Remove",
				icons : {
					primary : 'ui-icon-trash'
				}
			},
			sAddDeleteEditToolbarSelector : ".dataTables_length",
            aoColumns: [
                {
                    placeholder : ""
                },
                {
                    placeholder : ""
                }
            ]
		});
        
	var oMediaGroupItemTable = $('#mediagroupitem').dataTable({
			"fnRowCallback" : function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
				if(selectedRowId == aData['DT_RowId']){
					$(nRow).addClass('row_selected');   
				} 
				
				$(nRow).on('click', function () {
					selectedRowId = $(nRow).attr("id");
					$("#formAddMediaGroupItem input[name=mediaGroupItemId]").val($(nRow).attr("id"));
				});
			},
			"bJQueryUI" : true,
			"bProcessing" : true,
			"bServerSide" : true,
			"rowId" : "objectid",
			"sAjaxSource" : "/mediagroupitem",
			"bPaginate" : true,
			"bSort" : true,
			"aoColumnDefs" : [{
					"mDataProp" : null,
					"sDefaultContent" : "&nbsp",
					"aTargets" : ['_all']
				}
			],
			"aoColumns" : [{
					"mDataProp" : "name"
				}, {
					"mDataProp" : "type"
				}, {
					"mDataProp" : "duration"
				}, {
					"mDataProp" : "contentURL"
				}, {
					"mDataProp" : "imageURL"
				}, {
					"mDataProp" : "producer"
				}, {
					"mDataProp" : "artist"
				}

			],
			"fnServerParams" : function (aoData) {
				aoData.push({
					"name" : "mediaGroupId",
					"value" : $('#mediaGroupId').val()
				});
			},
			"sPaginationType" : "full_numbers",
			"iDisplayLength" : 10,
			"iDisplayStart" : 0,
			"bFilter" : false,
			"oLanguage" : {
				"sEmptyTable" : "No media items(tracks) added to media group(album)",
				"sZeroRecords" : "No media items(tracks) added to media group(album)"
			}
		}).makeEditable({
			fnOnDeleted : function (value, settings) {
				oMediaItemTable.fnDraw();
				oMediaGroupItemTable.fnDraw();
			},
			fnOnEdited : function (value, settings) {
				oMediaItemTable.fnDraw();
				oMediaGroupTable.fnDraw();
				oMediaGroupItemTable.fnDraw();
			},
			fnOnAdded : function (value, settings) {
				oMediaGroupItemTable.fnDraw();
			},
			sAddNewRowFormId : "formAddMediaGroupItem",
			sAddNewRowButtonId : "btnAddMediaGroupItem",
			sAddNewRowOkButtonId : "btnAddMediaGroupItemOk",
			sDeleteRowButtonId : "btnDeleteMediaGroupItem",
			sSelectedRowClass : "row_selected",
			oAddNewRowButtonOptions : {
				label : "Add",
				icons : {
					primary : 'ui-icon-plus'
				}
			},
			oDeleteRowButtonOptions : {
				label : "Remove",
				icons : {
					primary : 'ui-icon-trash'
				}
			},
			oAddNewRowFormOptions : {
				title : 'Add a new media group item',
				hide : "explode",
				modal : true
			},
			sAddDeleteEditToolbarSelector : ".dataTables_length",
            aoColumns: [
                {
                    placeholder : ""
                },
                {
                    placeholder : ""
                },
                {
                    placeholder : ""
                },
                {
                    placeholder : ""
                },
                {
                    placeholder : ""
                },
                {
                    placeholder : ""
                },
                {
                    placeholder : ""
                }
            ]
		});

	oMediaGroupItemTable.fnDraw();
	oCreditTable.fnDraw();
	oMediaGroupTable.fnDraw();
	
	oMediaItemTable.fnDraw();
    
    oLessonPageTable.fnDraw();
    oLessonTable.fnDraw();
    oLessonGroupTable.fnDraw();

	$("#btnEditMediaGroup").on("click", function (e) {
		$("#mediagroupdiv").hide();
		$("#mediaGroupButtons").show();
		$("#mediagroupeditadddiv").show();
		$("#formAddMediaGroup").hide();
		$("#formEditMediaGroup").show();
		$("#mediaGroupItemTableDiv").show();
		$("#mediagroupitem").show();
		$("#btnAddMediaGroupItem").show();
		$("#btnDeleteMediaGroupItem").show();
		$("#mediaGroupItemContentHeader").show();
	});

	$("#btnAddMediaGroup").on("click", function (e) {
		FillIndexTextBox();
		
		$("#formAddMediaGroup input[name=mediaGroupId]").val("");
		$("#formAddMediaGroup input[name=mediaGroupTitleAdd]").val("");
		
		$("#formAddMediaGroup input[name=mediaGroupDetailAdd]").val("");
		$("#formAddMediaGroup input[name=mediaGroupImageURLAdd]").val("");
		$("#formAddMediaGroup select[name=mediaGroupTypeAdd]").selectedIndex = 0;
		$("#formAddMediaGroup select[name=mediaGroupProducerAdd]").selectedIndex = 0;
		$("#formAddMediaGroup select[name=mediaGroupArtistAdd]").selectedIndex = 0;

		$("#mediagroupdiv").hide();
		$("#mediagroupeditadddiv").show();
		$("#formEditMediaGroup").hide();
		$("#mediaGroupItemContentHeader").hide();

		$("#mediaGroupButtons").show();
		$("#formAddMediaGroup").show();
	});
    
    $("#btnEditLesson").on("click", function (e) {
		$("#lessondiv").hide();
		$("#lessonButtons").show();
		$("#lessoneditadddiv").show();
		$("#formAddLesson").hide();
		$("#formEditLesson").show();
		$("#lessonPageTableDiv").show();
		$("#lessonpage").show();
		$("#btnAddLessonPage").show();
		$("#btnDeleteLessonPage").show();
		$("#lessonPageContentHeader").show();
	});
    
	$("#btnAddLesson").on("click", function (e) {
		FillIndexTextBox();
		
		$("#formAddLesson input[name=lessonId]").val("");
		$("#formAddLesson input[name=lessonTitleAdd]").val("");
		$("#formAddLesson input[name=lessonImageURLAdd]").val("");

		$("#lessondiv").hide();
		$("#lessoneditadddiv").show();
		$("#formEditLesson").hide();
		$("#lessonPageContentHeader").hide();

		$("#lessonButtons").show();
		$("#formAddLesson").show();
	});
	
	function FillIndexTextBox()
	{
		$.ajax({
			url : "/mediagroup/lastindex"
		}).done(function (data) {
			var lastIndex = parseInt(data) + 1;
			
			$("#formAddMediaGroup input[name=mediaGroupIndexAdd]").val(lastIndex);		
		});
	} 

	function IntializeCreditDropDownBoxes() {
		$.ajax({
			url : "/credit/dropdown"
		}).done(function (data) {
			var creditData = data.aaData;
			
			$('#formEditMediaItem select[name=producerEdit').empty();
			$('#formAddMediaItem select[name=mediaitemproducer').empty();
			$('#formEditMediaGroup select[name=mediaGroupProducerEdit]').empty();
			$('#formAddMediaGroup select[name=mediaGroupProducerAdd]').empty();

			$('#formEditMediaItem select[name=artistEdit').empty();
			$('#formAddMediaItem select[name=mediaitemartist').empty();
			$('#formEditMediaGroup select[name=mediaGroupArtistEdit]').empty();
			$('#formAddMediaGroup select[name=mediaGroupArtistAdd]').empty();

			for (var i = 0; i < creditData.length; i++) {
				var credit = creditData[i].name;
				var creditId = creditData[i].DT_RowId;
				var optionText = "<option value='" + creditId + "'>" + credit + "</option>";

				$('#formEditMediaItem select[name=producerEdit').append(optionText);
				$('#formAddMediaItem select[name=mediaitemproducer').append(optionText);
				$('#formEditMediaGroup select[name=mediaGroupProducerEdit]').append(optionText);
				$('#formAddMediaGroup select[name=mediaGroupProducerAdd]').append(optionText);

				$('#formEditMediaItem select[name=artistEdit').append(optionText);
				$('#formAddMediaItem select[name=mediaitemartist').append(optionText);
				$('#formEditMediaGroup select[name=mediaGroupArtistEdit]').append(optionText);
				$('#formAddMediaGroup select[name=mediaGroupArtistAdd]').append(optionText);
			}
		});
	}

	$("#btnAddMediaGroupItem").on("click", function (e) {
		IntializeMediaGroupItemDropDownBoxes();
	});
    
	function IntializeMediaGroupItemDropDownBoxes() {
        $.ajax({
			type : "GET",
			data : {
				"type" : "mediaGroupItem"
			},
			url : "/mediaitem/dropdown",
			success : function (data) {
				var mediaItemData = data.aaData;
                $('#mediaGroupItemNameAdd').empty();

                for (var i = 0; i < mediaItemData.length; i++) {
                    var mediaItemName = mediaItemData[i].name;
                    var mediaItemId = mediaItemData[i].DT_RowId;
                    var optionText = "<option value='" + mediaItemId + "'>" + mediaItemName + "</option>"; ;

                    $('#mediaGroupItemNameAdd').append(optionText);
                }
			}
		});
	}   
    
    $("#btnAddLessonPage").on("click", function (e) {
		$("#formAddLessonPage").parent().height(300);
        $("#formAddLessonPage").height(200);
	});

    $("#btnEditLessonPage").on("click", function (e) {
        $("#formEditLessonPage").parent().height(300);
        $("#formEditLessonPage").height(200);
        
        InitializeLessonPageEditItems();
    });
    
    function IntializeLessonPageItemDropDownBoxes() {
        $.ajax({
			type : "GET",
			data : {
				"type" : "lessonPageItem"
			},
			url : "/mediaitem/dropdown",
			success : function (data) {
				var mediaItemData = data.aaData;
                $('#lessonPageItemsEdit').empty();
                $("#lessonPageItemsEdit").multiple = true;
                $("#lessonPageItemsEdit").chosen({ width: '100%' });      

                $('#lessonPageItemsAdd').empty();
                $("#lessonPageItemsAdd").multiple = true;
                $("#lessonPageItemsAdd").chosen({ width: '100%' });                  
                
                for (var i = 0; i < mediaItemData.length; i++) {
                    var mediaItemName = mediaItemData[i].name;
                    var mediaItemId = mediaItemData[i].DT_RowId;
                    var optionText = "<option value='" + mediaItemId + "'>" + mediaItemName + "</option>"; ;

                    $("#lessonPageItemsEdit").append(optionText);       
                    $("#lessonPageItemsAdd").append(optionText);                        
                }               
                
                $("#lessonPageItemsEdit").trigger("chosen:updated");
                $("#lessonPageItemsAdd").trigger("chosen:updated");
			}
		});
	}
    
    function InitializeLessonPageEditItems(){
        $.ajax({
			type : "GET",
			data : {
				"lessonPageId" : $('#formEditLessonPage input[name=lessonPageEditId]').val()
			},
			url : "/lessonpage",
			success : function (res) {
                for (var i = 0; i < res.lessonPageMediaItems.length; i++) {                
                    $('#lessonPageItemsEdit').find('option[value=' + res.lessonPageMediaItems[i] + ']').attr('selected', 'selected');
                }
                
                $('#lessonPageItemsEdit').trigger('chosen:updated');
            }
		});
    }       
    
    $("#btnEditTeaching").on("click", function (e) {
		$("#formEditTeaching").parent().height(300);
        $("#formEditTeaching").height(200);
        
        InitializeTeachingEditLessonGroups();
	});
    
    $("#btnAddTeaching").on("click", function (e) {
		$("#formAddTeaching").parent().height(300);
        $("#formAddTeaching").height(200);
	});
    
    function IntializeTeachingLessonGroupsDropDownBoxes() {
        $.ajax({
			type : "GET",
			url : "/lessonGroup/dropdown",
			success : function (data) {
				var lessonGroupData = data.aaData;
                $("#teachingLessonGroupsEdit").empty();
                $("#teachingLessonGroupsEdit").multiple = true;
                $("#teachingLessonGroupsEdit").chosen({ width: '100%' });                
                
                $("#teachingLessonGroupsAdd").empty();
                $("#teachingLessonGroupsAdd").multiple = true;
                $("#teachingLessonGroupsAdd").chosen({ width: '100%' });    
                
                for (var i = 0; i < lessonGroupData.length; i++) {
                    var title = lessonGroupData[i].title;
                    var teachingId = lessonGroupData[i].DT_RowId;
                    var optionText = "<option value='" + teachingId + "'>" + title + "</option>"; ;

                    $("#teachingLessonGroupsEdit").append(optionText);  
                    $("#teachingLessonGroupsAdd").append(optionText);                    
                }               
                
                $("#teachingLessonGroupsEdit").trigger("chosen:updated");
                $("#teachingLessonGroupsAdd").trigger("chosen:updated");
			}
		});
	}
    
    function InitializeTeachingEditLessonGroups(){
        $.ajax({
			type : "GET",
			data : {
				"teachingId" : $('#formEditTeaching input[name=teachingEditId]').val()
			},
			url : "/teaching",
			success : function (res) {
                for (var i = 0; i < res.teachingLessonGroups.length; i++) {                
                    $('#teachingLessonGroupsEdit').find('option[value=' + res.teachingLessonGroups[i] + ']').attr('selected', 'selected');
                }
                
                $('#teachingLessonGroupsEdit').trigger('chosen:updated');
            }
		});
    }
    
    $("#btnEditLessonGroup").on("click", function (e) {
		$("#formEditLessonGroup").parent().height(300);
        $("#formEditLessonGroup").height(200);
        
        InitializeLessonGroupEditLessons();
	});
    
    $("#btnAddLessonGroup").on("click", function (e) {
		$("#formAddLessonGroup").parent().height(300);
        $("#formAddLessonGroup").height(200);
	});
    
    function IntializeLessonGroupLessonsDropDownBoxes() {
        $.ajax({
			type : "GET",
			url : "/lesson/dropdown",
			success : function (data) {
				var lessonData = data.aaData;
                $("#lessonGroupLessonsEdit").empty();
                $("#lessonGroupLessonsEdit").multiple = true;                
                $("#lessonGroupLessonsEdit").chosen({ width: '100%' });     

                $("#lessonGroupLessonsAdd").empty();
                $("#lessonGroupLessonsAdd").multiple = true;
                $("#lessonGroupLessonsAdd").chosen({ width: '100%' });                   
                
                for (var i = 0; i < lessonData.length; i++) {
                    var title = lessonData[i].title;
                    var lessonId = lessonData[i].DT_RowId;
                    var optionText = "<option value='" + lessonId + "'>" + title + "</option>";

                    $("#lessonGroupLessonsEdit").append(optionText);    
                    $("#lessonGroupLessonsAdd").append(optionText);                        
                }               
                
                $("#lessonGroupLessonsEdit").trigger("chosen:updated");
                $("#lessonGroupLessonsAdd").trigger("chosen:updated");                
			}
		});
	}
    
    function InitializeLessonGroupEditLessons(){
        $.ajax({
			type : "GET",
			data : {
				"lessonGroupId" : $('#formEditLessonGroup input[name=lessonGroupEditId]').val()
			},
			url : "/lessongroup",
			success : function (res) {
                for (var i = 0; i < res.lessonGroupLessons.length; i++) {                
                    $('#lessonGroupLessonsEdit').find('option[value=' + res.lessonGroupLessons[i] + ']').attr('selected', 'selected');
                }
                
                $('#lessonGroupLessonsEdit').trigger('chosen:updated');
            }
		});
    }

	$("#saveMediaGroup").on("click", function (e) {
		var data = [];

		if ($("#formEditMediaGroup input[name=mediaGroupId]").val() == "" || $("#formEditMediaGroup input[name=mediaGroupId]").val() == null) {
			data = {
				title : $('#mediaGroupTitleAdd').val(),
				type : $('#mediaGroupTypeAdd').val(),
				index : $('#mediaGroupIndexAdd').val(),
				detail : $('#mediaGroupDetailAdd').val(),
				imageURL : $('#mediaGroupImageURLAdd').val(),
				producer : $('#mediaGroupProducerAdd').val(),
				artist : $('#mediaGroupArtistAdd').val()
			};

			mediaGroupAddAjaxCall(data);
		} else {
			data = {
				title : $('#mediaGroupTitleEdit').val(),
				type : $('#mediaGroupTypeEdit').val(),
				index : $('#mediaGroupIndexEdit').val(),
				detail : $('#mediaGroupDetailEdit').val(),
				imageURL : $('#mediaGroupImageURLEdit').val(),
				producer : $('#mediaGroupProducerEdit').val(),
				artist : $('#mediaGroupArtistEdit').val()
			};

			mediaGroupUpdateAjaxCall(data);
		}
	});
    
    $("#saveLesson").on("click", function (e) {
		var data = [];

		if ($("#formEditLesson input[name=lessonId]").val() == "" || $("#formEditLesson input[name=lessonId]").val() == null) {
			data = {
				title : $('#lessonTitleAdd').val(),
				imageURL : $('#lessonImageURLAdd').val()
			};

			lessonAddAjaxCall(data);
		} else {
			data = {
				title : $('#lessonTitleEdit').val(),
				imageURL : $('#lessonImageURLEdit').val()
			};

			lessonUpdateAjaxCall(data);
		}
	});
    
    function lessonAddAjaxCall(opts) {
		$.ajax({
			type : "POST",
			data : {
				"title" : opts.title,
                "imageURL" : opts.imageURL
            },
			url : "/lesson/add",
			success : function (res) {
				oLessonTable.fnDraw();
                oLessonPageTable.fnDraw();

				$("#lessonPageTableDiv").show();
				$("#lessonPageContentHeader").show();
				$("#formEditLesson").show();

				$('#lessonTitleEdit').val(opts.title);
				$('#lessonImageURLEdit').val(opts.imageURL);

				$("#formAddLessonPage input[name=lessonId]").val("");
				$("#formEditLesson input[name=lessonId]").val(res);

				$("#formAddLesson").hide();

				alert("Successfully Saved Lesson");
			}
		});
	};
	
	function lessonUpdateAjaxCall(opts) {
		$.ajax({
			type : "POST",
			data : {
				"lessonId" : $("#formEditLesson input[name=lessonId]").val(),
				"title" : opts.title,
				"imageURL" : opts.imageURL
			},
			url : "/lesson/edit",
			success : function (res) {
				oLessonTable.fnDraw();

				alert("Successfully Saved Lesson");
			}
		});
	};
    
    $("#viewLesson").on("click", function (e) {
		$("#lessonButtons").hide();
		$("#lessonPageContentHeader").hide();
		$("#adminButtons").hide();
        $("#mediaGroupButtons").hide();
		$("#mediaGroupItemContentHeader").hide();
	});

	$("#viewMediaGroup").on("click", function (e) {
		$("#mediaGroupButtons").hide();
		$("#mediaGroupItemContentHeader").hide();
		$("#adminButtons").hide();
        $("#lessonButtons").hide();
        $("#lessonPageContentHeader").hide();
	});

	$("#viewCredit").on("click", function (e) {
		$("#mediaGroupButtons").hide();
		$("#mediaGroupItemContentHeader").hide();
		$("#adminButtons").hide();
        $("#lessonButtons").hide();
        $("#lessonPageContentHeader").hide();
	});

	$("#viewMediaItem").on("click", function (e) {
		$("#mediaGroupButtons").hide();
		$("#adminButtons").hide();
        $("#lessonButtons").hide();
        $("#lessonPageContentHeader").hide();
	});
	
	$("#viewUser").on("click", function (e) {
		$("#adminButtons").show();
		$("#mediaGroupButtons").hide();
        $("#mediaGroupItemContentHeader").hide();
        $("#lessonButtons").hide();
        $("#lessonPageContentHeader").hide();
	});

	function mediaGroupAddAjaxCall(opts) {
		$.ajax({
			type : "POST",
			data : {
				"title" : opts.title,
				"type" : opts.type,
				"index" : opts.index,
				"detail" : opts.detail,
				"imageURL" : opts.imageURL,
				"producer" : opts.producer,
				"artist" : opts.artist
			},
			url : "/mediagroup/add",
			success : function (res) {
				oMediaGroupTable.fnDraw();

				oMediaGroupItemTable.fnDraw();

				$("#mediaGroupItemTableDiv").show();
				$("#mediaGroupItemContentHeader").show();
				$("#formEditMediaGroup").show();

				$('#mediaGroupTitleEdit').val(opts.title);
				$('#mediaGroupTypeEdit').val(opts.type);
				$('#mediaGroupIndexEdit').val(opts.index);
				$('#mediaGroupDetailEdit').val(opts.detail);
				$('#mediaGroupImageURLEdit').val(opts.imageURL);

				$("#formAddMediaGroupItem input[name=mediaGroupId]").val("");
				$("#formEditMediaGroup input[name=mediaGroupId]").val(res);

				$("#formAddMediaGroup").hide();

				alert("Successfully Saved Media Group");
			}
		});
	};
	
	function mediaGroupUpdateAjaxCall(opts) {
		$.ajax({
			type : "POST",
			data : {
				"mediaGroupId" : $("#formEditMediaGroup input[name=mediaGroupId]").val(),
				"title" : opts.title,
				"type" : opts.type,
				"index" : opts.index,
				"detail" : opts.detail,
				"imageURL" : opts.imageURL,
				"producer" : opts.producer,
				"artist" : opts.artist
			},
			url : "/mediagroup/update",
			success : function (res) {
				oMediaGroupTable.fnDraw();

				//bDestroy for mediagroupitem table?
				alert("Successfully Saved Media Group");
			}
		});
	};

	function ConfirmDelete() {
		return confirm("Are you sure that you want to delete this record?");
	}

	$("#btnDeleteLessonPage").on("click", function (e) {
		if (ConfirmDelete) {
			$.ajax({
				type : "POST",
				data : {
					"lessonId" : $('#formEditLesson input[name=lessonId]').val(),
					"lessonPageId" : $("#formAddLessonPage input[name=lessonPageId]").val()
				},
				url : "/lessonPage/delete",
				success : function () {
					oLessonPageTable.fnDraw();
				}
			});
		}
	});

	$("#btnDeleteMediaGroupItem").on("click", function (e) {
		if (ConfirmDelete) {
			$.ajax({
				type : "POST",
				data : {
					"mediaGroupId" : $('#formEditMediaGroup input[name=mediaGroupId]').val(),
					"mediaGroupItemId" : $("#formAddMediaGroupItem input[name=mediaGroupItemId]").val()
				},
				url : "/mediagroupitem/delete",
				success : function () {
					oMediaGroupItemTable.fnDraw();
				}
			});
		}
	});

	$("#btnAddMediaGroupItemOk").on("click", function (e) {
		$.ajax({
			type : "POST",
			data : {
				"mediaGroupId" : $('#formEditMediaGroup input[name=mediaGroupId]').val(),
				"mediaGroupItemId" : $("#formAddMediaGroupItem input[name=mediaGroupItemId]").val()
			},
			url : "/mediagroupitem/add",
			success : function () {
				$("#formAddMediaGroupItem").dialog('close');

				oMediaGroupItemTable.fnDraw();
			}
		});
	});
    
    $("#btnAddLessonPageOk").on("click", function (e) {
		$.ajax({
			type : "POST",
			data : {
				"lessonId" : $('#formEditLesson input[name=lessonId]').val(),
				"lessonPageId" : $("#formAddLessonPage input[name=lessonPageId]").val(),
                "lessonPageItems": $("#formAddLessonPage select[name=lessonPageItems]").val()
			},
			url : "/lessonPage/add",
			success : function () {
				$("#formAddLessonPage").dialog('close');

				oLessonPageTable.fnDraw();
			}
		});
	});

     $("#btnEditLessonPageOk").on("click", function (e) {
		$.ajax({
			type : "POST",
			data : {
                "lessonPageId": $("#formEditLessonPage input[name=lessonPageEditId]").val(),
                "lessonPageItems": $("#lessonPageItemsEdit").val()
			},
			url : "/lessonpage/edit",
			success : function (res) {
				$("#formEditLessonPage").dialog('close');

				oLessonPageTable.fnDraw();
			}
		});
	});
	$("#btnAddMediaItem").on("click", function (e) {
		$('#duration').mask("00:00:00", {
			placeholder : "__:__:__"
		});
        
        $('#imageURL').removeClass('required');
	});

	$("#btnEditUser").on("click", function (e) {
		$.ajax({
			type : "GET",
			data : {
				"userId" : $('#userEditId').val()
			},
			url : "/user",
			success : function (res) {
				var objectId = res.userId;
				var userName = res.userName;
				var email = res.email;

				$('#userEditId').val(objectId);
				$('#userNameEdit').val(userName);
				$('#emailEdit').val(email);
			}
		});
	});

	$("#cancelMediaGroup").on("click", function (e) {
		$("#formAddMediaGroupItem input[name=mediaGroupId]").val("");
		$("#formEditMediaGroup input[name=mediaGroupId]").val("");
		$("#mediagroupeditadddiv").hide();
		$("#formEditMediaGroup").hide();
		$("#formAddMediaGroup").hide();
		$("#mediagroupitem").hide();
		$("#btnAddMediaGroupItem").hide();
		$("#btnDeleteMediaGroupItem").hide();
		$("#mediagroupdiv").show();
		$("#mediaGroupButtons").hide();
		$("#mediaGroupItemContentHeader").hide();
	});
    
    $("#cancelLesson").on("click", function (e) {
		$("#formAddLessonPage input[name=lessonId]").val("");
		$("#formEditLesson input[name=lessonId]").val("");
		$("#lessoneditadddiv").hide();
		$("#formEditLesson").hide();
		$("#formAddLesson").hide();
		$("#lessonPage").hide();
		$("#btnAddLessonPage").hide();
		$("#btnDeleteLessonPage").hide();
		$("#lessondiv").show();
		$("#lessonButtons").hide();
		$("#lessonPageContentHeader").hide();
	});

	$("#mediaGroupItemNameAdd").on("change", function () {
		var selected = $(this).val();
		mediaGroupItemNameAddAjaxCall(selected);
	});
    
    $("#mediaitemtype").on("change", function () {
		var selected = $(this).val();
        
        $("#imageURL").removeClass('required').attr('readonly', true).addClass('input-disabled');
        $("#contentURL").removeClass('required').attr('readonly', true).addClass('input-disabled');
        $("#duration").removeClass('required').attr('readonly', true).addClass('input-disabled');
        $("#text").removeClass('required').attr('readonly', true).addClass('input-disabled');
        $("#mediaitemproducer").removeClass('required').addClass('input-disabled').prop('disabled', true);
        $("#mediaitemartist").removeClass('required').addClass('input-disabled').prop('disabled', true);
        
		switch (selected){
            case "lessonText":
                 $("#text").addClass('required').attr('readonly', false).removeClass('input-disabled');
                break;
            case "lessonAudio":
                $("#contentURL").addClass('required').attr('readonly', false).removeClass('input-disabled');
                $("#duration").addClass('required').attr('readonly', false).removeClass('input-disabled');
                break;
            case "lessonVideo":
                $("#imageURL").addClass('required').attr('readonly', false).removeClass('input-disabled');
                $("#contentURL").addClass('required').attr('readonly', false).removeClass('input-disabled');
                $("#duration").addClass('required').attr('readonly', false).removeClass('input-disabled');
                break;
            case "lessonImage":
                $("#imageURL").addClass('required').attr('readonly', false).removeClass('input-disabled');
                break;
            case "song":
                $("#contentURL").addClass('required').attr('readonly', false).removeClass('input-disabled');
                $("#duration").addClass('required').attr('readonly', false).removeClass('input-disabled');
                $("#mediaitemproducer").addClass('required').removeClass('input-disabled').prop('disabled', false);
                $("#mediaitemartist").addClass('required').removeClass('input-disabled').prop('disabled', false);
                break;
            case "experience":
                $("#contentURL").addClass('required').attr('readonly', false).removeClass('input-disabled');
                $("#duration").addClass('required').attr('readonly', false).removeClass('input-disabled');
                $("#imageURL").addClass('required').attr('readonly', false).removeClass('input-disabled');
                $("#mediaitemproducer").addClass('required').removeClass('input-disabled').prop('disabled', false);
                $("#mediaitemartist").addClass('required').removeClass('input-disabled').prop('disabled', false);
                break;
        }
	});

	function mediaGroupItemNameAddAjaxCall(opts) {
		$.ajax({
			type : "GET",
			data : {
				"mediaItemId" : opts
			},
			url : "/mediagroupitem",
			success : function (res) {
				var objectId = res.mediaGroupItemId;
				var duration = res.mediaGroupItemDurationAdd;
				var contentURL = res.mediaGroupItemContentURLAdd;
                var imageURL = res.mediaGroupItemImageURLAdd;
				var producer = res.mediaGroupItemProducerAdd;
				var artist = res.mediaGroupItemArtistAdd;
				var type = res.mediaGroupItemTypeAdd;

				$('#mediaGroupItemId').val(objectId);
				$('#mediaGroupItemTypeAdd').val(type);
				$('#mediaGroupItemDurationAdd').val(duration);
				$('#mediaGroupItemContentURLAdd').val(contentURL);
                $('#mediaGroupItemImageURLAdd').val(imageURL);
				$('#mediaGroupItemProducerAdd').val(producer);
				$('#mediaGroupItemArtistAdd').val(artist);
			}
		});
	};
	
	$("#mediaGroupTypeAdd").on("change", function () {
		var selected = $(this).val();
		mediaGroupTypeAddAjaxCall(selected);
	});

	function mediaGroupTypeAddAjaxCall(opts) {
		$.ajax({
			type : "POST",
			data : {
				"type" : opts
			},
			url : "/mediagroup/lastindexpertype",
			success : function (res) {
				var lastIndex = parseInt(res.lastIndex) + 1;
			
				$("#formAddMediaGroup input[name=mediaGroupIndexAdd]").val(lastIndex);
			}
		});
	};

	$("#btnMoveAlbumUp").on("click", function (e) {
		$.ajax({
			type : "POST",
			data : {
				"mediaGroupId" : $("#formEditMediaGroup input[name=mediaGroupId]").val()
			},
			url : "/mediagroup/moveup",
			success : function () {
				var oSettings = oMediaGroupTable.fnSettings();				
				oMediaGroupTable.fnDraw(oSettings);
				
				$("#btnMoveAlbumUp").removeClass('ui-state-focus');
			}
		});
	});
	var selectedRowId = "";
	$("#btnMoveAlbumDown").on("click", function (e) {
		$.ajax({
			type : "POST",
			data : {
				"mediaGroupId" : $("#formEditMediaGroup input[name=mediaGroupId]").val()
			},
			url : "/mediagroup/movedown",
			success : function () {
				var oSettings = oMediaGroupTable.fnSettings();				
				oMediaGroupTable.fnDraw(oSettings);
				
				$("#btnMoveAlbumDown").removeClass('ui-state-focus');
			}
		});
	});	
});
