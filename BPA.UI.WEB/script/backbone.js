$(document).ready(function () {
    getBackboneData();
});

function getTodaysDate() {
    var currentDate = new Date();
    var day = currentDate.getDate();
    var month = currentDate.getMonth() + 1;
    var year = currentDate.getFullYear();
    return month + '/' + day + '/' + year;
}
var BaseUrl = 'http://45.35.4.250/ansiratestapi/api/';
function getBackboneData() {
    $.ajax({
        type: "GET",
        url: BaseUrl+"Backbone/GetBackboneData",
        contentType: "application/json;",
        dataType: "json",
        success: function (data) {
            // alert(data);
            var arr = [];
            arr = data.BackboneList;
            $.each(arr, function (i, item) {
                //var row = "<tr><td>" + item.OEM_Id + "</td><td>" + item.OEM_Name + "</td></tr>"
                //$('#OEMData tbody').append(row);
                var editbtn = '<p data-placement="top" data-toggle="tooltip" title="Edit"><button class="btn btn-primary" data-title="Edit" onclick=setBackboneData(' + item.BackboneId + ',"' + item.BackboneName + '") data-toggle="modal" data-target="#edit"><span class="glyphicon glyphicon-pencil"></button></p>';
                var deletebtn = '<button class="btn btn-danger" data-title="Delete" onclick=setBackboneDataDelete(' + item.BackboneId + ') data-toggle="modal" data-target="#delete"><span class="glyphicon glyphicon-trash"></button>';
                $('#Backbonedatatable').dataTable().fnAddData([item.BackboneName, editbtn, deletebtn]);
            }); //End of foreach Loop   
        }, //End of AJAX Success function 
        failure: function (data) {
            var res = JSON.parse(data.responseText);
            alert(res.Message + '\n' + res.ExceptionMessage);
            $('#Backbonedatatable').dataTable().fnClearTable();
            //alert("Failure");
        }, //End of AJAX failure function  
        error: function (data) {
            var res = JSON.parse(data.responseText);
            alert(res.Message + '\n' + res.ExceptionMessage);
            $('#Backbonedatatable').dataTable().fnClearTable();
            //alert("Error");
        } //End of AJAX error function 
    });
}

function CreateBackboneData() {
    var reqdata = { BackboneName: $('#txt_Backbone_Name').val(), CreatedBy: '', CreateTs: getTodaysDate() };
    $.ajax({
        type: "POST",
        url: BaseUrl + "Backbone/CreateBackboneData",
        contentType: "application/json; charset=UTF-8",
        dataType: "json",
        data: JSON.stringify(reqdata),
        success: function (data) {
            if (data) {
                alert("Inserted successfully.")
                document.location.reload();
            }
            else {
                alert("Failed to insert..")
            }
        }, //End of AJAX Success function 
        failure: function (data) {
            var res = JSON.parse(data.responseText);
            alert(res.Message + '\n' + res.ExceptionMessage);
            //alert("Failure");
        }, //End of AJAX failure function  
        error: function (data) {
            var res = JSON.parse(data.responseText);
            alert(res.Message + '\n' + res.ExceptionMessage);
            //alert("Error");
        } //End of AJAX error function   
    });
}

function setBackboneData(id, name) {
    $('#label_BackboneID').html(id);
    $('#txt_Backbone_Name_Update').val(name);
}

function setBackboneDataDelete(id) {
    $('#label_BackboneID_Delete').html(id);
}

function UpdateBackboneData() {
    var reqdata = {
        BackboneName: $('#txt_Backbone_Name_Update').val(),
        BackboneId: $('#label_BackboneID').html(),
        UpdatedBy: '',
        UpdateTs: getTodaysDate(),
        IsActive:true
    };

    $.ajax({
        type: "POST",
        url: BaseUrl + "Backbone/UpdateBackboneData",
        contentType: "application/json; charset=UTF-8",
        dataType: "json",
        data: JSON.stringify(reqdata),
        success: function (data) {
                alert("Updated successfully...")
                document.location.reload();
        }, //End of AJAX Success function 
        failure: function (data) {
            var res = JSON.parse(data.responseText);
            alert(res.Message + '\n' + res.ExceptionMessage);
            //alert("Failure");
        }, //End of AJAX failure function  
        error: function (data) {
            var res = JSON.parse(data.responseText);
            alert(res.Message + '\n' + res.ExceptionMessage);
            //alert("Error");
        } //End of AJAX error function 
    });
}


function DeleteBackboneData() {
    var reqdata = { BackboneId : $('#label_BackboneID_Delete').html() };
    $.ajax({
        type: "POST",
        url: BaseUrl + "Backbone/DeleteBackboneData",
        contentType: "application/json; charset=UTF-8",
        dataType: "json",
        data: JSON.stringify(reqdata),
        success: function (data) {
            if (data) {
                alert("Deleted successfully.")
                document.location.reload();
            }
            else {
                alert("Failed to Delete..")
            }
        }, //End of AJAX Success function 
        failure: function (data) {
            var res = JSON.parse(data.responseText);
            alert(res.Message + '\n' + res.ExceptionMessage);
            $('#Backbonedatatable').dataTable().fnClearTable();
            //alert("Failure");
        }, //End of AJAX failure function  
        error: function (data) {
            var res = JSON.parse(data.responseText);
            alert(res.Message + '\n' + res.ExceptionMessage);
            $('#Backbonedatatable').dataTable().fnClearTable();
            //alert("Error");
        } //End of AJAX error function  
    });
}

