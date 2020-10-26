
var table = null;
$(document).ready (function(){
    debugger;
    table = $('#myTable').DataTable({
        "processing": true,
        "ajax": {
            url: "/Departments/LoadDepartment",
            type: "GET",
            dataType: "json",
            dataSrc: "",
        },
        "columns": [

            { "data": "Name" },
            {
                "render": function (data, type, row) {
                    return '<button class="btn btn-warning" data-placement="left" data-toggle="tooltip" data-animation="false" title="Edit" onclick="return GetById"(' + row.Id + ')"><button>' + '&nbsp;' +
                        '<button class="btn btn-danger" data-placement="right" data-toggle="tooltip" data-anamation = "false" title="Delete" onclick="return Delete(' + row.Id + ')"></button>'
                }
            }]
    });
}
);


function Save() {
    debugger;
    var Department = new Object();
    Department.Name = $('#Name').val();
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

function GetById(Id) {
    $.ajax({
        url: "Departments/GetById" + Id,
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        async: false,
        success: function (result) {
            const obj = JSON.parse(result);
            $('#Id'), val(obj.Id);
            $('#Name'), val(obj.Name);
            $('#myModal'), modal('show');

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    })
}