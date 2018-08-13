$(document).ready(function () {
    getbackbonePageType();
    getPageType();
    getBackboneId();
});

var BaseUrl = 'http://45.35.4.250/ansiratestapi/api/';
function getbackbonePageType() {
    $.ajax({
        type: "GET",
        url: BaseUrl+"PageType/GetBackbonePage",
        contentType: "application/json;",
        dataType: "json",
        success: function (data) {
            // alert(data);
            var arr = [];
            arr = data;
            $.each(arr, function (i, item) {
                var editbtn = '<p data-placement="top" data-toggle="tooltip" title="Edit"><button class="btn btn-primary" onclick=setPageTypeEdit(' + item.BackbonePageId + ',' + item.PageId + ',"' + item.BackboneId + '") data-title="Edit"  data-toggle="modal" data-target="#edit"><span class="glyphicon glyphicon-pencil"></span></button></p>';
                var deletebtn = '<button class="btn btn-danger" data-title="Delete" onclick=setPageTypeDelete(' + item.BackbonePageId + ') data-toggle="modal" data-target="#delete"><span class="glyphicon glyphicon-trash"></span></button>';
                $('#backbonePageTypeDataTable').dataTable().fnAddData([item.BackboneName,item.PageType, editbtn, deletebtn]);
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

function getPageType() {
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
                var option = '<option value='+item.PageId+'>'+item.PageType+'</option>';
                $('#selectPageType').append(option);
                $('#selectPageTypeedit').append(option);
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

function getBackboneId() {
    $.ajax({
        type: "GET",
        url: BaseUrl + "backbone/GetBackbone",
        contentType: "application/json;",
        dataType: "json",
        success: function (data) {
            // alert(data);
            var arr = [];
            arr = data.BackboneList;
            window.BackboneIdentifierList = arr;
            $.each(arr, function (i, item) {
                var option = '<option value=' + item.BackboneId + '>' + item.BackboneName + '</option>';
                $('#selectBackboneId').append(option);
                $('#selectBackboneIdedit').append(option);
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

function setPageTypeEdit(id,pageid, backboneid)
{
    $('#lblBackbonePageId').html(id);
    $('#selectPageTypeedit').val(pageid);
    $('#selectBackboneIdedit').val(backboneid);
}
function setPageTypeDelete(id)
{
    $('#lblBackbonePageIdDelete').html(id);
}
function createPageType()
{
    var data = {
        PageId: $('#selectPageType').val(),
        BackboneId: $('#selectBackboneId').val()
    };
    $.ajax({
        type: "POST",
        url: BaseUrl + "PageType/CreateBackbonePage",
        contentType: "application/json; charset=UTF-8",
        dataType: "json",
        data: JSON.stringify(data),
        success: function (data) {
                alert('Successfully Enter');
                document.location.reload();
        }, //End of AJAX Success function 
        failure: function (data) {
            //alert("Failure");
            var res = JSON.parse(data.responseText);
            alert(res.ExceptionMessage)
        }, //End of AJAX failure function  
        error: function (data) {
            //alert("Error");
            var res = JSON.parse(data.responseText);
            alert(res.ExceptionMessage)
        } //End of AJAX error function  
    });
}
function UpdatePageType()
{
    var data = {
        PageId:$('#selectPageTypeedit').val(),
        BackboneId: $('#selectBackboneIdedit').val(),
        BackbonePageId: $('#lblBackbonePageId').html(),
        IsActive: true
    };
    $.ajax({
        type: "POST",
        url: BaseUrl + "PageType/UpdateBackbonePage",
        contentType: "application/json; charset=UTF-8",
        dataType: "json",
        data: JSON.stringify(data),
        success: function (data) {
                alert('Successfully Update');
                document.location.reload();
        }, //End of AJAX Success function 
        failure: function (data) {
            //alert("Failure");
            var res = JSON.parse(data);
            alert(res.ErrorMessage)
        }, //End of AJAX failure function  
        error: function (data) {
            //alert("Error");
            var res = JSON.parse(data);
            alert(res.ErrorMessage)
        } //End of AJAX error function  
    });
}
function DeletePageType()
{
    var data = {
        BackbonePageId: $('#lblBackbonePageIdDelete').html()
    };
    $.ajax({
        type: "POST",
        url: BaseUrl + "PageType/DeleteBackbonePage",
        contentType: "application/json; charset=UTF-8",
        dataType: "json",
        data: JSON.stringify(data),
        success: function (data) {
                alert('Successfully Delete');
                document.location.reload();
        }, //End of AJAX Success function 
        failure: function (data) {
            //alert("Failure");
            var res = JSON.parse(data);
            alert(res.ErrorMessage)
        }, //End of AJAX failure function  
        error: function (data) {
            //alert("Error");
            var res = JSON.parse(data);
            alert(res.ErrorMessage)
        } //End of AJAX error function  
    });
}


