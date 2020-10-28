
var table = null;
$(document).ready(function () {
    table = $('#myTable').DataTable({
        "oLanguage": {
            "sSearch": "Filter Data"
        },
        "iDisplayLength": -1,
        "sPaginationType": "full_numbers",
        "processing": true,
        "ajax": {
            url: "/Departments/LoadDepartment",
            type: "GET",
            dataType: "json",
            dataSrc: "",
        },
        "columns": [
            {
                "render": function (data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                }
            },

            { "data": "Name" },
            {
                "data": "Tanggal",
                "render": function (data) {
                    return getDateString(data);
                }
            },

            {
                "render": function (data, type, row) {
                    return '<button class="btn btn-warning " data-placement="left" data-tooggle="tooltip" data-animation="false" title"Edit" onclick="return GetById(' + row.Id + ') "><i class="fa fa-edit"></i>Edit</button>' + '&nbsp;' +
                        '<button class="btn btn-danger " data-placement="right" data-tooggle="tooltip" data-animation="false" title"Delete" onclick="return Delete(' + row.Id + ') "><i class="fa fa-trash"></i>Delete</button>'
                }
            }]
    });
    //teste
    $.fn.dataTable.ext.search.push(
        function (settings, data, dataIndex) {
            var min = $('#min').datepicker("getDate");
            var max = $('#max').datepicker("getDate");
            var startDate = new Date(data[2]);
            if (min == null && max == null) { return true; }
            if (min == null && startDate <= max) { return true; }
            if (max == null && startDate >= min) { return true; }
            if (startDate <= max && startDate >= min) { return true; }
            return false;
        }
    );


    $("#min").datepicker({ onSelect: function () { table.draw(); }, changeMonth: true, changeYear: true });
    $("#max").datepicker({ onSelect: function () { table.draw(); }, changeMonth: true, changeYear: true });
    //var table = $('#example').DataTable();

    // Event listener to the two range filtering inputs to redraw on input
    $('#min, #max').change(function () {
        table.draw();
    });
});
//    $("#datepicker_from").datepicker({
//        showOn: "button",
//        buttonImage: "images/calendar.gif",
//        buttonImageOnly: false,
//        "onSelect": function (date) {
//            minDateFilter = new Date(date).getTime();
//            table.fnDraw();
//        }
//    }).keyup(function () {
//        minDateFilter = new Date(this.value).getTime();
//        table.fnDraw();
//    });

//    $("#datepicker_to").datepicker({
//        showOn: "button",
//        buttonImage: "images/calendar.gif",
//        buttonImageOnly: false,
//        "onSelect": function (date) {
//            maxDateFilter = new Date(date).getTime();
//            table.fnDraw();
//        }
//    }).keyup(function () {
//        maxDateFilter = new Date(this.value).getTime();
//        table.fnDraw();
//    });
//});


//// Date range filter
//minDateFilter = "";
//maxDateFilter = "";

//$.fn.dataTableExt.afnFiltering.push(
//    function (oSettings, aData, iDataIndex) {
//        if (typeof aData._date == 'undefined') {
//            aData._date = new Date(aData[0]).getTime();
//        }

//        if (minDateFilter && !isNaN(minDateFilter)) {
//            if (aData._date < minDateFilter) {
//                return false;
//            }
//        }

//        if (maxDateFilter && !isNaN(maxDateFilter)) {
//            if (aData._date > maxDateFilter) {
//                return false;
//            }
//        }

//        return true;
//    }
//);


function Save() {
    debugger;
    var Department = new Object();
    Department.Name = $('#Name').val();
    Department.Tanggal = $('#Tanggal').val();

    $.ajax({
        type: 'POST',
        url: '/Departments/Insert/',
        data: Department
    }).then((result) => {
        debugger;
        if (result.StatusCode == 200) {
            Swal.fire({
                position: 'center',
                type: 'Success',
                title: 'Department added Succesfully'
            });
            table.ajax.reload();

        }
        else {
            Swal.fire('Error', 'Failed to input ', 'error');
            ClearScreen();
        }
    })
}

function getDateString(date) {
    var dateObj = new Date(parseInt(date.substr(6)));
    return dateObj.toDateString();
}

function GetById(Id) {
    //debugger;
    $.ajax({
        url: "/Departments/GetById/" + Id,
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        async: false,
        success: function (result) {
            const obj = JSON.parse(result);
            $('#Id').val(obj.Id);
            $('#Name').val(obj.Name);
            $('#myModal').modal('show');
            $('#Update').show();

        },
        //table.ajax.reload();
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function Update() {
    //debagger;
    var Department = new Object();
    Department.Id = $('#Id').val();
    Department.Name = $('#Name').val();
    Department.Tanggal = $('#Tanggal').val();
    $.ajax({
        type: "POST",
        url: '/Departments/Update/',
        data: Department
    }).then((result) => {
        debugger;
        if (result.StatusCode == 200) {
            Swal.fire({
                position: 'center',
                type: 'success',
                title: 'Department Update Successfully'
            });
        } else {
            Swal.fire('Error', 'Failed to Update', 'error');
            ClearScreen();
        }
    })
}

function ClearScreen() {
    $('#Id').val('');
    $('#Name').val('');
    $('#Tanggal').val('');
    $('#Update').hide();
    $('#Save').show();
}

function Delete(Id) {
    Swal.fire({
        title: 'Are You Sure?',
        text: "You Won't be able to revert this!",
        showCancelButton: true,
        confirmButtonText: '#3085d6',
        cancelButtonColor: 'd33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.value) {
            debugger;
            $.ajax({
                url: "/Departments/Delete/",
                data: { Id: Id }
            }).then((result) => {
                debugger;
                if (result.StatusCode == 200) {
                    Swal.fire({
                        position: 'center',
                        type: 'success',
                        title : 'Delete Successfully'
                    });
                    table.ajax.reload();
                }
                else {
                    Swal.fire('Error', 'failed to Delete', 'error');
                    ClearScreen();
                }


            })
        };
    });
}



function getDateString(date) {
    var pattern = /Date\(([^)]+)\)/;
    var results = pattern.exec(date);
    var dt = new Date(parseFloat(results[1]));
    return (dt.getMonth() + 1) + "/" + dt.getDate() + "/" + dt.getFullYear();
    //return (dt.getFullYear() + "/" + dt.getMonth() + 1) + "/" + dt.getDate();
}

$(function () {
    $(".datepicker").datepicker({
        format: 'yyyy-mm-dd',
        autoclose: true,
        todayHighlight: true,
    });
});


//test
