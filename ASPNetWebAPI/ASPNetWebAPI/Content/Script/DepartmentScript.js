
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
            {
                "render": function (data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                }
            },

            { "data": "Name" },
            {
                "render": function (data, type, row) {
                    return '<button class="btn btn-warning " data-placement="left" data-tooggle="tooltip" data-animation="false" title"Edit" onclick="return GetById(' + row.Id + ') "><i class="fa fa-edit"></i>Edit</button>' + '&nbsp;' +
                        '<button class="btn btn-danger " data-placement="right" data-tooggle="tooltip" data-animation="false" title"Delete" onclick="return Delete(' + row.Id + ') "><i class="fa fa-trash"></i>Delete</button>'
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
