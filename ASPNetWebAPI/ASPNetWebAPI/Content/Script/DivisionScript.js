var table = null;
$(document).ready(function () {
    debugger;
    table = $('#myTable').DataTable({
        "processing": true,
        "ajax": {
            url: "/Divisions/LoadDivision",
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
            { "data": "Dept_name" },
            {
                "render": function (data, type, row) {
                    return '<button class="btn btn-warning " data-placement="left" data-tooggle="tooltip" data-animation="false" title"Edit" onclick="return GetById(' + row.Id + ') "><i class="fa fa-edit"></i>Edit</button>' + '&nbsp;' +
                        '<button class="btn btn-danger " data-placement="right" data-tooggle="tooltip" data-animation="false" title"Delete" onclick="return Delete(' + row.Id + ') "><i class="fa fa-trash"></i>Delete</button>'
                }
            }
            
        ]
    });
}
);


var Departments = []
function LoadDepartment(element) {
    if (Departments.length == 0) {
        $.ajax({
            type: "Get",
            url: "/Departments/LoadDepartment",
            success: function (data) {
                Departments = data;
                renderDepartment(element);
            }
        })
    }
}

function renderDepartment(element) {
    debugger;
    var $ele = $(element);
    $ele.empty();
    $ele.append($('<option/>').val('0').text('Select Department').hide());
    $.each(Departments, function (i, val) {
        debugger;
        $ele.append($('<option/>').val(val.Id).text(val.Name));
    })
}
LoadDepartment($('#Department'));

function Save() {
    debugger;
    var Division = new Object();
    Division.Name = $('#Name').val();
    Division.Dept_id = $('#Department').val();

    $("#Update").hide();
    $("#Save").show();

    var iddept = $('#Department');
    var nama = $('#Name');

    if (!nama.val() || !iddept.val()) {
        Swal.fire('Error', 'Masukkan Data Terlebih Dahulu', 'Error');
    } else {
        $.ajax({
            type: 'POST',
            url: '/Divisions/InsertOrUpdate/',
            data: Division
        }).then((result) => {
            debugger;
            if (result.StatusCode == 200) {
                Swal.fire({
                    position: 'center',
                    type: 'success',
                    title: 'Division Added Successfully'
                });
                table.ajax.reload();
            } else {
                Swal.fire('Error', 'Failed To Input', 'Error');
                ClearScreen();
            }
        });
    }
}

function GetById(Id) {
    $.ajax({
        url: "/Divisions/GetById/" + Id,
        type: "GET",
        contentType: "application/json;charset-utf-8",
        dataType: "json",
        async: false,
        success: function (result) {
            const obj = JSON.parse(result);
            $('#Id').val(obj.Id);
            $('#Name').val(obj.Nama);
            $('#Department').val(obj.Dept_Id);

            $('#myModal').modal('show');

            $("#Update").show();
            $("#Save").hide();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function ClearScreen() {
    $("#Id").val('');
    $("#Name").val('');
    $("#Update").hide();
    $("#Save").show();
}

function Update() {
    debugger;
    var Division = new Object();
    Division.Id = $('#Id').val();
    Division.Name = $('#Name').val();
    Division.Dept_id = $('#Department').val();


    var nama = $('#Name');

    if (!nama.val()) {
        Swal.fire('Error', 'Masukkan Nama Terlebih Dahulu', 'Error');
    }
    else {
        $.ajax({
            type: 'POST',
            url: '/Divisions/InsertOrUpdate/',
            data: Division
        }).then((result) => {
            debugger;
            if (result.StatusCode == 200) {
                Swal.fire({
                    position: 'center',
                    type: 'success',
                    title: 'Divisions Update Successfully'
                });
                table.ajax.reload();
            } else {
                Swal.fire('Error', 'Failed To Update', 'Error');
                ClearScreen();
            }
        })
    }
}

function Delete(Id) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.value) {
            debugger;
            $.ajax({
                url: "/Divisions/Delete/",
                data: { Id: Id },
            }).then((result) => {
                debugger;
                if (result.StatusCode == 200) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        type: 'success',
                        title: 'Delete Successfully'
                    });
                    table.ajax.reload();
                }
                else {
                    Swal.fire('Error', 'Failed to Delete', 'error');
                    ClearScreen();
                }
            })
        };
    });
}