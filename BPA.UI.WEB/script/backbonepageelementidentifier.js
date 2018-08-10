$(document).ready(function () {
    getBackbonePageElementIdentifier();
    setPageIdentifierData();
    getPageElementData();
    getDataElementData();
});

var BaseUrl = 'http://45.35.4.250/ansiratestapi/api/';
function getPageElementData() {
    $.ajax({
        type: "GET",
        url: BaseUrl + "PageType/GetPageTypes",
        contentType: "application/json;",
        dataType: "json",
        success: function (data) {
            // alert(data);
            var arr = [];
            arr = data;
            $.each(arr, function (i, item) {
                var options = "<option value=" + item.PageId + ">" + item.PageType + "</option>";
                $('#dropdownBackbonePageElementId').append(options);
                $('#dropdownBackbonePageElementIdEdt').append(options);
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

function getDataElementData() {
    $.ajax({
        type: "GET",
        url: BaseUrl + "DataElement/GetDataElementData",
        contentType: "application/json;",
        dataType: "json",
        success: function (data) {
            // alert(data);
            var arr = [];
            arr = data.DataElementList;
            $.each(arr, function (i, item) {
                var options = "<option value=" + item.DataElementTypeId +">" + item.DataElementName + "</option>";
                $('#dropdownBackbonePageId').append(options);
                $('#dropdownBackbonePageIdEdt').append(options);
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



function getBackbonePageElementIdentifier() {
    $.ajax({
        type: "GET",
        url: BaseUrl+"BackbonePageElementIdentifier/GetBackbonePageElementIdentifier",
        contentType: "application/json;",
        dataType: "json",
        success: function (data) {
            // alert(data);
            var arr = [];
            arr = data.BackbonePageElementIdentifierList;
            window.PageIdentifier = arr;
            $.each(arr, function (i, item) {
                //var row = "<tr><td>" + item.OEM_Id + "</td><td>" + item.OEM_Name + "</td></tr>"
                //$('#OEMData tbody').append(row);
                var editbtn = '<p data-placement="top" data-toggle="tooltip" title="Edit"><button class="btn btn-primary" data-title="Edit" onclick=setPageIdentifierData(' + i + ') data-toggle="modal" data-target="#edit"><span class="glyphicon glyphicon-pencil"></button></p>';
                var deletebtn = '<button class="btn btn-danger" data-title="Delete" onclick=setPageElementIdentifierDataDelete(' + item.BackbonePageElementIdentifierId + ') data-toggle="modal" data-target="#delete"><span class="glyphicon glyphicon-trash"></button>';
                $('#backboneidentifierdatatable').dataTable().fnAddData([item.BackboneName, item.PageType, item.DataElementName, item.Type, item.Identifier, item.SerialNo, editbtn, deletebtn]);
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

function CreateBackbonePageElementIdentifier() {
    var reqdata = {

        BackbonePageElementId: $('#dropdownBackbonePageElementId').val(),
        BackbonePageId: $('#dropdownBackbonePageId').val(),
        Type: $('#txt_Type_Name').val(),
        Identifier: $('#txt_Identifier').val(),
        SerialNo: $('#txt_SerialNo').val(),
        Value: $('#txt_Value').val()
    };
    $.ajax({
        type: "POST",
        url: BaseUrl + "BackbonePageElementIdentifier/CreateBackbonePageElementIdentifier",
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
        $('#label_BackbonePageElementIdentifierID').html(dealer.BackbonePageElementIdentifierId);
        $('#txt_Type_Name_Edt').val(dealer.Type);
        $('#txt_Identifier_Edt').val(dealer.Identifier);
        $('#txt_SerialNo_Edt').val(dealer.SerialNo);
        $('#txt_Value_Edt').val(dealer.Value);
        $('#dropdownBackbonePageElementIdEdt').val(dealer.BackbonePageElementId);
        $('#dropdownBackbonePageIdEdt').val(dealer.BackbonePageId);
    }
}

function UpdateBackbonePageElementIdentifier() {
    var reqdata = {
        BackbonePageElementId: $('#dropdownBackbonePageElementIdEdt').val(),
        BackbonePageId: $('#dropdownBackbonePageIdEdt').val(),
        Type: $('#txt_Type_Name_Edt').val(),
        Identifier: $('#txt_Identifier_Edt').val(),
        SerialNo: $('#txt_SerialNo_Edt').val(),
        Value: $('#txt_Value_Edt').val(),
        BackbonePageElementIdentifierId: $('#label_BackbonePageElementIdentifierID').html()
    };

    $.ajax({
        type: "POST",
        url: BaseUrl + "BackbonePageElementIdentifier/UpdateBackbonePageElementIdentifier",
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

function setPageElementIdentifierDataDelete(id) {
    $('#label_BackbonePageElementIdentifierID').html(id);
}
function DeletePageElementIdentifier() {
    var reqdata = { BackbonePageElementIdentifierId: $('#label_BackbonePageElementIdentifierID').html() };
    $.ajax({
        type: "POST",
        url: BaseUrl + "BackbonePageElementIdentifier/DeleteBackbonePageElementIdentifier",
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
