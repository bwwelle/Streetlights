$(document).ready(function() {
	var table = $('#example').DataTable( {
    serverSide: true,
    ajax: {
        url: '/anything',
        type: 'POST',
        dataSrc: ''
    },
    columns: [
                { data: "title" },
                { data: "artist" },
                { data: "producer" }
            ]   
    });
        
    $('#example tbody').on( 'click', 'tr', function () {
        if ( $(this).hasClass('selected') ) {
            $(this).removeClass('selected');
        }
        else {
            table.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    } );
} );