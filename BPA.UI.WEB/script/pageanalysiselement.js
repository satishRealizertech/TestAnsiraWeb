$(document).ready(function () {
    getPageType();
    getDealerData();
});
var BaseURL = 'http://45.35.4.250/ansiratestapi/api/';
function getPageType() {
    $.ajax({
        type: "GET",
        url: BaseURL + "PageAnalysis/GetPageTypesList",
        contentType: "application/json;",
        dataType: "json",
        success: function (data) {
            // alert(data);
            var arr = [];
            arr = data;
            $.each(arr, function (i, item) {
                var option = '<option value=' + item.PageId + '>' + item.PageName + '</option>';
                $('#selectPageType').append(option);
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
function getDealerData() {
    $.ajax({
        type: "GET",
        url: BaseURL + "PageAnalysis/GetAllDealersList",
        contentType: "application/json;",
        dataType: "json",
        success: function (data) {
            // alert(data);
            var arr = [];
            arr = data;
            window.dealerData = arr;
            $.each(arr, function (i, item) {
                var option = '<option value=' + i + '>' + item.DealerName + '</option>';
                $('#selectDealer').append(option);
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


function getPageAnalysisData()
{
    if ($('#selectDealer').val() == '') {
        alert('Please select dealer');
    }
    else if ($('#selectPageType').val() != '') {
            if (window.dealerData) {
                var key = $('#selectDealer').val();
                var data = { dealer: window.dealerData[key], PageId: $('#selectPageType').val() };
                $("#backbonePageTypeDataTable").loading('start');
                $.ajax({
                    type: "POST",
                    url: BaseURL + "PageAnalysis/PageAnalysisPageElement",
                    contentType: "application/json; charset=UTF-8",
                    dataType: "json",
                    data: JSON.stringify(data),
                    success: function (data) {
                        // alert(data);
                        var arr = [];
                        arr = data;
                        $('#backbonePageTypeDataTable').dataTable().fnClearTable();
                        $.each(arr, function (i, item) {
                            $('#backbonePageTypeDataTable').dataTable().fnAddData([item.DataElementName, item.Value]);
                        }); //End of foreach Loop  
                        $("#backbonePageTypeDataTable").loading('stop');
                    }, //End of AJAX Success function 
                    failure: function (data) {
                        $("#backbonePageTypeDataTable").loading('stop');
                        //var res = JSON.parse(data.responseText);
                        //alert(res.Message + '\n' + res.ExceptionMessage);
                        $('#backbonePageTypeDataTable').dataTable().fnClearTable();
                    }, //End of AJAX failure function  
                    error: function (data) {
                        $("#backbonePageTypeDataTable").loading('stop');
                        $('#backbonePageTypeDataTable').dataTable().fnClearTable();
                        //var res = JSON.parse(data.responseText);
                        //alert(res.Message + '\n' + res.ExceptionMessage);
                    } //End of AJAX error function  
                });
            }
        }
        else {
            alert('Please select Page Type');
        }
    
}
