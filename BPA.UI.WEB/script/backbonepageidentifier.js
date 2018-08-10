$(document).ready(function () {
    getPageIdentifierData();
    getDataElementData();
    setPageIdentifierData();
    getBackbonePageData();
});

var BaseUrl = 'http://45.35.4.250/ansiratestapi/api/';
function getDataElementData() {
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
                var options = "<option value=" + item.BackboneId + ">" + item.BackboneName + "</option>";
                $('#dropdownBackboneIdList').append(options);
                $('#dropdownBackboneIdListEdt').append(options);
            }); //End of foreach Loop   
        }, //End of AJAX Success function 
        failure: function (data) {
            //alert("Failure");
        }, //End of AJAX failure function  
        error: function (data) {
            //alert("Error");
        } //End of AJAX error function  
    });
}
function getBackbonePageData() {
    $.ajax({
        type: "GET",
        url: BaseUrl + "pagetype/GetPageTypes",
        contentType: "application/json;",
        dataType: "json",
        success: function (data) {
            // alert(data);
            var arr = [];
            arr = data;
            $.each(arr, function (i, item) {
                var options = "<option value=" + item.PageId + ">" + item.PageType + "</option>";
                $('#dropdownBackbonePageIdList').append(options);
                $('#dropdownBackbonePageIdListEdt').append(options);
            }); //End of foreach Loop   
        }, //End of AJAX Success function 
        failure: function (data) {
            //alert("Failure");
        }, //End of AJAX failure function  
        error: function (data) {
            //alert("Error");
        } //End of AJAX error function  
    });
}



function getPageIdentifierData() {
    $.ajax({
        type: "GET",
        url: BaseUrl + "BackbonePageIdentifier/GetBackbonePageIdentifierData",
        contentType: "application/json;",
        dataType: "json",
        success: function (data) {
            // alert(data);
            var arr = [];
            arr = data.BackbonePageIdentifierList;
            window.PageIdentifier = arr;
            $.each(arr, function (i, item) {
                //var row = "<tr><td>" + item.OEM_Id + "</td><td>" + item.OEM_Name + "</td></tr>"
                //$('#OEMData tbody').append(row);
                var editbtn = '<p data-placement="top" data-toggle="tooltip" title="Edit"><button class="btn btn-primary" data-title="Edit" onclick=setPageIdentifierData(' + i + ') data-toggle="modal" data-target="#edit"><span class="glyphicon glyphicon-pencil"></button></p>';
                var deletebtn = '<button class="btn btn-danger" data-title="Delete" onclick=setPageIdentifierDataDelete(' + item.BackbonePageIdentifierId + ') data-toggle="modal" data-target="#delete"><span class="glyphicon glyphicon-trash"></button>';
                $('#backboneidentifierdatatable').dataTable().fnAddData([item.BackboneName,item.PageType,item.Type,item.Identifier,item.SerialNo, editbtn, deletebtn]);
            }); //End of foreach Loop   
        }, //End of AJAX Success function 
        failure: function (data) {
            //alert("Failure");
        }, //End of AJAX failure function  
        error: function (data) {
            //alert("Error");
        } //End of AJAX error function  
    });
}

function CreateBackbonePageElementData() {
    var reqdata = {
        
        BackboneId: $('#dropdownBackboneIdList').val(),
        BackbonePageId: $('#dropdownBackbonePageIdList').val(),
        Type: $('#txt_PageIdentifier_Type').val(),
        Identifier: $('#txt_PageIdentifier').val(),
        SerialNo: $('#txt_PageIdentifier_SerialNo').val(),
        Value: $('#txt_PageIdentifier_Value').val()
    };
    $.ajax({
        type: "POST",
        url: BaseUrl + "BackbonePageIdentifier/CreateBackbonePageIdentifierData",
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
            //alert("Failure");
        }, //End of AJAX failure function  
        error: function (data) {
            //alert("Error");
        } //End of AJAX error function  
    });
}
function setPageIdentifierData(key) {
    if (window.PageIdentifier) {
        var dealer = window.PageIdentifier[key]
        $('#label_BackbonePageIdentifierID').html(dealer.BackbonePageIdentifierId);
        $('#txt_PageIdentifier_Type_edt').val(dealer.Type);
        $('#txt_PageIdentifier_edt').val(dealer.Identifier);
        $('#txt_PageIdentifier_SerialNo_edt').val(dealer.SerialNo);
        $('#txt_PageIdentifier_Value_edt').val(dealer.Value);
        $('#dropdownBackboneIdListEdt').val(dealer.BackboneId);
        $('#dropdownBackbonePageIdListEdt').val(dealer.BackbonePageId);
    }
}

function UpdateBackbonePageIdentifierData() {
    var reqdata = {
        BackboneId: $('#dropdownBackboneIdListEdt').val(),
        BackbonePageId: $('#dropdownBackbonePageIdListEdt').val(),
        Type: $('#txt_PageIdentifier_Type_edt').val(),
        Identifier: $('#txt_PageIdentifier_edt').val(),
        SerialNo: $('#txt_PageIdentifier_SerialNo_edt').val(),
        Value: $('#txt_PageIdentifier_Value_edt').val(),
        BackbonePageIdentifierId: $('#label_BackbonePageIdentifierID').html()
    };

    $.ajax({
        type: "POST",
        url: BaseUrl + "BackbonePageIdentifier/UpdateBackbonePageIdentifierData",
        contentType: "application/json; charset=UTF-8",
        dataType: "json",
        data: JSON.stringify(reqdata),
        success: function (data) {
            if (data) {
                alert("Updated successfully...")
                document.location.reload();
            }
            else {
                alert("Failed to Update...")
            }
        }, //End of AJAX Success function 
        failure: function (data) {
            //alert("Failure");
        }, //End of AJAX failure function  
        error: function (data) {
            //alert("Error");
        } //End of AJAX error function  
    });
}


function setPageIdentifierDataDelete(id) {
    $('#label_BackbonePageIdentifierID_Delete').html(id);
}
function DeletePageIdentifierData() {
    var reqdata = { BackbonePageIdentifierId: $('#label_BackbonePageIdentifierID_Delete').html() };
    $.ajax({
        type: "POST",
        url: BaseUrl + "BackbonePageIdentifier/DeleteBackbonePageIdentifierData",
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
            //alert("Failure");
        }, //End of AJAX failure function  
        error: function (data) {
            //alert("Error");
        } //End of AJAX error function  
    });
}