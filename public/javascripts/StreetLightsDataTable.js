$(document).ready(function () {

	var oMediaItemTable = $('#mediaitem').dataTable({
			"fnRowCallback" : function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
				$(nRow).on('click', function () {
					var objectId = $(nRow).attr("id");
					var name = $('td:eq(0)', nRow).text();
					var duration = $('td:eq(1)', nRow).text();
					var contentURL = $('td:eq(2)', nRow).text();
					var artist = $('td:eq(3)', nRow).text();

					$('#mediaItemEditId').val(objectId);
					$('#nameEdit').val(name);
					$('#durationEdit').val(duration);
					$('#contentURLEdit').val(contentURL);
					//$('#artistEdit').val(contentURL);

					var oTable = $('#credit').dataTable();

					$.each(oTable.fnGetNodes(), function (index, value) {
						var credit = $('td:eq(0)', value).text();
						var beginningText = "<option value='";
						var endingText = "'>" + credit + "</option>";
						var wholeString = beginningText.concat(credit, endingText)

							$('#artistEdit').append(wholeString);
					});
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
			"aoColumns" : [{
					"mDataProp" : "name"
				}, {
					"mDataProp" : "duration"
				}, {
					"mDataProp" : "contentURL"
				}, {
					"mDataProp" : "artist"
				}

			],
			"iDisplayLength" : 10,
			"iDisplayStart" : 0,
			"sPaginationType" : "full_numbers",
			"bFilter" : false
		}).makeEditable({
			fnOnAdded : function (value, settings) {
				//return (value);
			},
			fnOnDeleted : function (value, settings) {
				//oMediaItemTable.fnDraw();
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
			sAddDeleteEditToolbarSelector : ".dataTables_length"
		});

	var oCredit = $('#credit').dataTable({
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
			"sPaginationType" : "full_numbers",
			"iDisplayLength" : 10,
			"iDisplayStart" : 0,
			"bFilter" : false
		}).makeEditable({
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

	var oMediaGroupTable = $('#mediagroup').dataTable({
			"fnRowCallback" : function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
				$(nRow).on('click', function () {
					var links = $("#main-nav li ul li a");
					links.parent().siblings().find('a').removeClass('current');
					$('#main-nav li ul li a').eq(2).addClass("current")
					$("#mediagroupitemdiv").siblings().hide();
					$("#mediagroupitemdiv").show();
					$('#enginename').val('this works');

					//Put the MediaGroup.ID in a hidden textbox/label and then read it in the fnServerParamers in the table below.


					//refresh the mediagroupitem table based on the group id
					oMediaGroupItemTable.fnDraw(false);
				});
			},
			"bJQueryUI" : true,
			"bProcessing" : true,
			"bServerSide" : true,
			"rowId" : "objectid",
			"sAjaxSource" : "/mediagroup",
			"bPaginate" : true,
			"bSort" : true,
			"aoColumns" : [{
					"mDataProp" : "title"
				}, {
					"mDataProp" : "detail"
				}, {
					"mDataProp" : "imageURL"
				}
			],
			"sPaginationType" : "full_numbers",
			"iDisplayLength" : 10,
			"iDisplayStart" : 0,
			"bFilter" : false
		}).makeEditable({
			sAddNewRowFormId : "formAddEditMediaGroup",
			sAddNewRowButtonId : "btnAddEditMediaGroup",
			sAddNewRowOkButtonId : "btnAddEditMediaGroupOk",
			sAddNewRowCancelButtonId : "btnAddEditMediaGroupCancel",
			sDeleteRowButtonId : "btnDeleteMediaGroup"
		});

	var oMediaGroupItemTable = $('#mediagroupitem').dataTable({
			"fnRowCallback" : function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {},
			"bJQueryUI" : true,
			"bProcessing" : true,
			"bServerSide" : true,
			"rowId" : "objectid",
			"sAjaxSource" : "/mediagroupitem",
			"bPaginate" : true,
			"bSort" : true,
			"aoColumns" : [{
					"mDataProp" : "title"
				}, {
					"mDataProp" : "detail"
				}, {
					"mDataProp" : "imageURL"
				}
			],
			"fnServerParams" : function (aoData) {
				aoData.push({
					"name" : "more_data",
					"value" : $('#enginename').val()
				});
			},
			"sPaginationType" : "full_numbers",
			"iDisplayLength" : 10,
			"iDisplayStart" : 0,
			"bFilter" : false
		});
});
