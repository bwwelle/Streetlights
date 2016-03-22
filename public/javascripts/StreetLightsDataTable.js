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
					$('#mediaitemartist').val(artist);

					var oTable = $('#credit').dataTable();
					var endingText = "";

					$.each(oTable.fnGetNodes(), function (index, value) {
						var credit = $('td:eq(0)', value).text();
						var creditId = $(value).attr("id");
						var beginningText = "<option value='" + creditId + "'";

						if (credit == artist)
							endingText = " selected>" + credit + "</option>";
						else
							endingText = ">" + credit + "</option>";

						var wholeString = beginningText.concat(endingText);

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

	var oMediaGroupTable = $('#mediagroup')
		.dataTable({
			"fnRowCallback" : function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
				$(nRow).on('click', function () {
					var objectId = $(nRow).attr("id");
					var title = $('td:eq(0)', nRow).text();
					var detail = $('td:eq(1)', nRow).text();
					var imageURL = $('td:eq(2)', nRow).text();
					var artist = $('td:eq(3)', nRow).text();

					$('#mediaGroupId').val(objectId);
					$('#mediaGroupTitleEdit').val(title);
					$('#mediaGroupDetailEdit').val(detail);
					$('#mediaGroupImageURLEdit').val(imageURL);

					var oTable = $('#credit').dataTable();
					var endingText = "";

					$.each(oTable.fnGetNodes(), function (index, value) {
						var credit = $('td:eq(0)', value).text();
						var creditId = $(value).attr("id");
						var beginningText = "<option value='" + creditId + "'";

						if (credit == artist)
							endingText = " selected>" + credit + "</option>";
						else
							endingText = ">" + credit + "</option>";

						var wholeString = beginningText.concat(endingText);

						$('#mediaGroupArtistEdit').append(wholeString);
					});

					oMediaGroupItemTable.fnDraw(false);

					var oTable = $('#mediaitem').dataTable();
					var endingText = "";

					$.each(oTable.fnGetNodes(), function (index, value) {
						var objectId = $(value).attr("id");
						var name = $('td:eq(0)', value).text();
						var duration = $('td:eq(1)', nRow).text();
						var contentURL = $('td:eq(2)', nRow).text();
						var artist = $('td:eq(3)', nRow).text();
						var beginningText = "<option value='" + objectId + "'";

						if (index == 0) {
							endingText = " selected>" + name + "</option>";

							$('#mediaGroupItemId').val(objectId);
							$('#mediaGroupItemDurationAdd').val(duration);
							$('#mediaGroupItemContentURLAdd').val(contentURL);
							$('#mediaGroupItemArtistAdd').val(artist);
						} else
							endingText = ">" + name + "</option>";

						var wholeString = beginningText.concat(endingText);

						$('#mediaGroupItemNameAdd').append(wholeString);
					});
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
				}, {
					"mDataProp" : "artist"
				}
			],
			"sPaginationType" : "full_numbers",
			"iDisplayLength" : 10,
			"iDisplayStart" : 0,
			"bFilter" : false
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
			sAddDeleteEditToolbarSelector : ".dataTables_length"
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
			"aoColumnDefs" : [{
					"aTargets" : ["0"],
					"data": null,
                    "sDefaultContent": ""                    
				}
			],
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
			"fnServerParams" : function (aoData) {
				aoData.push({
					"name" : "mediaGroupId",
					"value" : $('#mediaGroupId').val()
				});
			},
			"sPaginationType" : "full_numbers",
			"iDisplayLength" : 10,
			"iDisplayStart" : 0,
			"bFilter" : false
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
			fnOnAdded : function (value, settings) {
				oMediaGroupItemTable.fnDraw();
			},
			sAddURL : "/mediagroupitem/add",
			sAddHttpMethod : "POST",
			sDeleteHttpMethod : "POST",
			sDeleteURL : "/mediagroupitem/delete",
			sAddNewRowFormId : "formAddMediaGroupItem",
			sAddNewRowButtonId : "btnAddMediaGroupItem",
			sAddNewRowOkButtonId : "btnAddMediaGroupItemOk",
			sDeleteRowButtonId : "btnDeleteMediaGroupItem",
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
			sAddDeleteEditToolbarSelector : ".dataTables_length"
		});

	$("#btnEditMediaGroup").on("click", function (e) {
		/* 		var links = $("#main-nav li ul li a");
		links.parent().siblings().find('a').removeClass('current');
		$('#main-nav li ul li a').eq(2).addClass("current")
		$("#mediagroupitemdiv").siblings().hide(); */

		$("#mediagroupdiv").hide();
		$("#mediagroupeditadddiv").show();
		$("#formAddMediaGroup").hide();
		$("#formEditMediaGroup").show();
	});

	$("#btnAddMediaGroup").on("click", function (e) {
		var oCreditTable = $('#credit').dataTable();
		var endingText = "";

		$.each(oCreditTable.fnGetNodes(), function (index, value) {
			var credit = $('td:eq(0)', value).text();
			var creditId = $(value).attr("id");
			var beginningText = "<option value='" + creditId + "'";

			endingText = ">" + credit + "</option>";

			var wholeString = beginningText.concat(endingText);

			$('#mediaGroupArtistAdd').append(wholeString);
		});

		var oMediaItemTable = $('#mediaitem').dataTable();
		var endingText = "";

		$.each(oMediaItemTable.fnGetNodes(), function (index, value) {
			var objectId = $(value).attr("id");
			var name = $('td:eq(0)', value).text();
			var duration = $('td:eq(1)', value).text();
			var contentURL = $('td:eq(2)', value).text();
			var artist = $('td:eq(3)', value).text();
			var beginningText = "<option value='" + objectId + "'";

			if (index == 0) {
				endingText = " selected>" + name + "</option>";

				$('#mediaGroupItemId').val(objectId);
				$('#mediaGroupItemDurationAdd').val(duration);
				$('#mediaGroupItemContentURLAdd').val(contentURL);
				$('#mediaGroupItemArtistAdd').val(artist);
			} else
				endingText = ">" + name + "</option>";

			var wholeString = beginningText.concat(endingText);

			$('#mediaGroupItemNameAdd').append(wholeString);
		});

		$("#mediagroupdiv").hide();
		$("#mediagroupeditadddiv").show();
		$("#formEditMediaGroup").hide();

		$("#mediGroupButtons").show();
		$("#formAddMediaGroup").show();
	});

	$("#btnAddMediaItem").on("click", function (e) {
		var oTable = $('#credit').dataTable();
		var endingText = "";

		$.each(oTable.fnGetNodes(), function (index, value) {
			var credit = $('td:eq(0)', value).text();
			var creditId = $(value).attr("id");
			var beginningText = "<option value='" + creditId + "'";

			endingText = ">" + credit + "</option>";

			var wholeString = beginningText.concat(endingText);

			$('#mediaitemartist').append(wholeString);
		});
	});

	$("#saveMediaGroup").on("click", function (e) {
		var mediaGroupTitle = $('#mediaGroupTitleAdd').val();
		var mediaGroupDetail = $('#mediaGroupDetailAdd').val();
		var mediaGroupImageURL = $('#mediaGroupImageURLAdd').val();
		var mediaGroupArtist = $('#mediaGroupArtistAdd').val();

		var data = [];
		data = {
			title : mediaGroupTitle,
			detail : mediaGroupDetail,
			imageURL : mediaGroupImageURL,
			artist : mediaGroupArtist
		};

		mediaGroupAddAjaxCall(data);
	});

	$("#viewMediaGroup").on("click", function (e) {
		$("#mediGroupButtons").hide();
	});

	$("#viewCredit").on("click", function (e) {
		$("#mediGroupButtons").hide();
	});

	$("#viewMediaItem").on("click", function (e) {
		$("#mediGroupButtons").hide();
	});

	function mediaGroupAddAjaxCall(opts) {
		$.ajax({
			type : "POST",
			data : {
				"title" : opts.title,
				"detail" : opts.detail,
				"imageURL" : opts.imageURL,
				"artist" : opts.artist
			},
			url : "/mediagroup/add",
			success : function (res) {
				oMediaGroupTable.fnDraw();

				$("#mediaItemTableDiv").show();
				$("#formEditMediaGroup").show();

				$('#mediaGroupTitleEdit').val(opts.title);
				$('#mediaGroupDetailEdit').val(opts.detail);
				$('#mediaGroupImageURLEdit').val(opts.imageURL);

				//$('#mediaGroupArtistAdd').val(opts.artist);
                $("#formAddMediaGroupItem input[name=mediaGroupId]").val(res);  
                $("#formEditMediaGroup input[name=mediaGroupId]").val(res);  

				$("#formAddMediaGroup").hide();
                
				alert("Successfully Saved Media Group");
			}
		});
	};

	$("#cancelMediaGroup").on("click", function (e) {
		$("#mediagroupeditadddiv").hide();
		$("#formEditMediaGroup").hide();
		$("#formAddMediaGroup").hide();
		$("#mediagroupitem").hide();
		$("#btnAddMediaGroupItem").hide();
		$("#btnDeleteMediaGroupItem").hide();
		$("#mediagroupdiv").show();
	});

	$("#mediaGroupItemNameAdd").on("change", function () {
		var selected = $(this).val();
		mediaGroupItemNameAddAjaxCall(selected);
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
				var artist = res.mediaGroupItemArtistAdd;

				$('#mediaGroupItemId').val(objectId);
				$('#mediaGroupItemDurationAdd').val(duration);
				$('#mediaGroupItemContentURLAdd').val(contentURL);
				$('#mediaGroupItemArtistAdd').val(artist);
			}
		});
	};

});
